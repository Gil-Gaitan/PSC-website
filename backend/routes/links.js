const express = require('express');
const router = express.Router();
const Link = require('../models/Link');
const { authenticateAdmin } = require('../middleware/auth');

// Get all links
router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 20, category, featured, status = 'active' } = req.query;

        const query = { status };
        if (category) query.category = category;
        if (featured === 'true') query.featured = true;

        const links = await Link.find(query)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Link.countDocuments(query);

        res.json({
            links,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            totalLinks: count
        });
    } catch (error) {
        console.error('Error fetching links:', error);
        res.status(500).json({ error: 'Failed to fetch links' });
    }
});

// Get links by category
router.get('/category/:category', async (req, res) => {
    try {
        const links = await Link.getByCategory(req.params.category);
        res.json(links);
    } catch (error) {
        console.error('Error fetching links by category:', error);
        res.status(500).json({ error: 'Failed to fetch links by category' });
    }
});

// Get featured links
router.get('/featured', async (req, res) => {
    try {
        const links = await Link.getFeatured();
        res.json(links);
    } catch (error) {
        console.error('Error fetching featured links:', error);
        res.status(500).json({ error: 'Failed to fetch featured links' });
    }
});

// Get categories
router.get('/categories', async (req, res) => {
    try {
        const categories = await Link.distinct('category');
        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

// Get single link by ID
router.get('/:id', async (req, res) => {
    try {
        const link = await Link.findById(req.params.id);

        if (!link) {
            return res.status(404).json({ error: 'Link not found' });
        }

        res.json(link);
    } catch (error) {
        console.error('Error fetching link:', error);
        res.status(500).json({ error: 'Failed to fetch link' });
    }
});

// Create new link (Admin only)
router.post('/', authenticateAdmin, async (req, res) => {
    try {
        const { title, url, description, category, tags, author, featured } = req.body;

        // Validate required fields
        if (!title || !url || !description || !category) {
            return res.status(400).json({
                error: 'Title, URL, description, and category are required'
            });
        }

        const link = new Link({
            title,
            url,
            description,
            category,
            tags: tags || [],
            author: author || 'Gil Gaitan',
            featured: featured || false
        });

        const savedLink = await link.save();

        // Emit real-time update to connected clients
        const io = req.app.get('io');
        if (io) {
            io.emit('link-created', savedLink);
        }

        res.status(201).json(savedLink);
    } catch (error) {
        console.error('Error creating link:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Failed to create link' });
    }
});

// Update existing link (Admin only)
router.put('/:id', authenticateAdmin, async (req, res) => {
    try {
        const { title, url, description, category, tags, author, featured, status } = req.body;

        const link = await Link.findById(req.params.id);

        if (!link) {
            return res.status(404).json({ error: 'Link not found' });
        }

        // Update fields
        if (title) link.title = title;
        if (url) link.url = url;
        if (description) link.description = description;
        if (category) link.category = category;
        if (tags) link.tags = tags;
        if (author) link.author = author;
        if (featured !== undefined) link.featured = featured;
        if (status) link.status = status;

        const updatedLink = await link.save();

        // Emit real-time update to connected clients
        const io = req.app.get('io');
        if (io) {
            io.emit('link-updated', updatedLink);
        }

        res.json(updatedLink);
    } catch (error) {
        console.error('Error updating link:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Failed to update link' });
    }
});

// Delete link (Admin only)
router.delete('/:id', authenticateAdmin, async (req, res) => {
    try {
        const link = await Link.findByIdAndDelete(req.params.id);

        if (!link) {
            return res.status(404).json({ error: 'Link not found' });
        }

        // Emit real-time update to connected clients
        const io = req.app.get('io');
        if (io) {
            io.emit('link-deleted', req.params.id);
        }

        res.json({ message: 'Link deleted successfully' });
    } catch (error) {
        console.error('Error deleting link:', error);
        res.status(500).json({ error: 'Failed to delete link' });
    }
});

// Track link click
router.post('/:id/click', async (req, res) => {
    try {
        const link = await Link.findById(req.params.id);

        if (!link) {
            return res.status(404).json({ error: 'Link not found' });
        }

        await link.incrementClicks();
        res.json({ clicks: link.clicks });
    } catch (error) {
        console.error('Error tracking link click:', error);
        res.status(500).json({ error: 'Failed to track link click' });
    }
});

module.exports = router;
