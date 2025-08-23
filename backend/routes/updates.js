const express = require('express');
const router = express.Router();
const Update = require('../models/Update');
const { authenticateAdmin } = require('../middleware/auth');

// Get all updates
router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 10, featured, status = 'published' } = req.query;

        const query = { status };
        if (featured === 'true') {
            query.featured = true;
        }

        const updates = await Update.find(query)
            .sort({ publishDate: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Update.countDocuments(query);

        res.json({
            updates,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            totalUpdates: count
        });
    } catch (error) {
        console.error('Error fetching updates:', error);
        res.status(500).json({ error: 'Failed to fetch updates' });
    }
});

// Get featured update
router.get('/featured', async (req, res) => {
    try {
        const featuredUpdate = await Update.findOne({
            featured: true,
            status: 'published'
        }).sort({ publishDate: -1 });

        res.json(featuredUpdate);
    } catch (error) {
        console.error('Error fetching featured update:', error);
        res.status(500).json({ error: 'Failed to fetch featured update' });
    }
});

// Get single update by ID
router.get('/:id', async (req, res) => {
    try {
        const update = await Update.findById(req.params.id);

        if (!update) {
            return res.status(404).json({ error: 'Update not found' });
        }

        // Increment views
        update.views += 1;
        await update.save();

        res.json(update);
    } catch (error) {
        console.error('Error fetching update:', error);
        res.status(500).json({ error: 'Failed to fetch update' });
    }
});

// Create new update (Admin only)
router.post('/', authenticateAdmin, async (req, res) => {
    try {
        const { title, content, author, featured, tags } = req.body;

        // Validate required fields
        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required' });
        }

        const update = new Update({
            title,
            content,
            author: author || 'Gil Gaitan',
            featured: featured || false,
            tags: tags || [],
            publishDate: new Date()
        });

        const savedUpdate = await update.save();

        // Emit real-time update to connected clients
        const io = req.app.get('io');
        if (io) {
            io.emit('update-created', savedUpdate);
        }

        res.status(201).json(savedUpdate);
    } catch (error) {
        console.error('Error creating update:', error);
        res.status(500).json({ error: 'Failed to create update' });
    }
});

// Update existing update (Admin only)
router.put('/:id', authenticateAdmin, async (req, res) => {
    try {
        const { title, content, author, featured, tags, status } = req.body;

        const update = await Update.findById(req.params.id);

        if (!update) {
            return res.status(404).json({ error: 'Update not found' });
        }

        // Update fields
        if (title) update.title = title;
        if (content) update.content = content;
        if (author) update.author = author;
        if (featured !== undefined) update.featured = featured;
        if (tags) update.tags = tags;
        if (status) update.status = status;

        const updatedUpdate = await update.save();

        // Emit real-time update to connected clients
        const io = req.app.get('io');
        if (io) {
            io.emit('update-updated', updatedUpdate);
        }

        res.json(updatedUpdate);
    } catch (error) {
        console.error('Error updating update:', error);
        res.status(500).json({ error: 'Failed to update update' });
    }
});

// Delete update (Admin only)
router.delete('/:id', authenticateAdmin, async (req, res) => {
    try {
        const update = await Update.findByIdAndDelete(req.params.id);

        if (!update) {
            return res.status(404).json({ error: 'Update not found' });
        }

        // Emit real-time update to connected clients
        const io = req.app.get('io');
        if (io) {
            io.emit('update-deleted', req.params.id);
        }

        res.json({ message: 'Update deleted successfully' });
    } catch (error) {
        console.error('Error deleting update:', error);
        res.status(500).json({ error: 'Failed to delete update' });
    }
});

// Like an update
router.post('/:id/like', async (req, res) => {
    try {
        const update = await Update.findById(req.params.id);

        if (!update) {
            return res.status(404).json({ error: 'Update not found' });
        }

        update.likes += 1;
        await update.save();

        res.json({ likes: update.likes });
    } catch (error) {
        console.error('Error liking update:', error);
        res.status(500).json({ error: 'Failed to like update' });
    }
});

module.exports = router;
