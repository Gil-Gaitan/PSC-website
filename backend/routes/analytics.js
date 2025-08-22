const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Simple analytics model for visitor tracking
const Analytics = mongoose.model('Analytics', new mongoose.Schema({
    type: {
        type: String,
        enum: ['pageview', 'click', 'api_call'],
        required: true
    },
    path: String,
    userAgent: String,
    ip: String,
    timestamp: {
        type: Date,
        default: Date.now
    },
    data: mongoose.Schema.Types.Mixed
}, { timestamps: true }));

// Track page view
router.post('/pageview', async (req, res) => {
    try {
        const { path, userAgent } = req.body;
        const ip = req.ip || req.connection.remoteAddress;

        const analytics = new Analytics({
            type: 'pageview',
            path,
            userAgent,
            ip,
            timestamp: new Date()
        });

        await analytics.save();

        res.json({ success: true });
    } catch (error) {
        console.error('Error tracking pageview:', error);
        res.status(500).json({ error: 'Failed to track pageview' });
    }
});

// Track link click
router.post('/click', async (req, res) => {
    try {
        const { linkId, linkTitle, userAgent } = req.body;
        const ip = req.ip || req.connection.remoteAddress;

        const analytics = new Analytics({
            type: 'click',
            path: `/links/${linkId}`,
            userAgent,
            ip,
            data: {
                linkId,
                linkTitle
            },
            timestamp: new Date()
        });

        await analytics.save();

        res.json({ success: true });
    } catch (error) {
        console.error('Error tracking click:', error);
        res.status(500).json({ error: 'Failed to track click' });
    }
});

// Get analytics summary
router.get('/summary', async (req, res) => {
    try {
        const { days = 7 } = req.query;
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - parseInt(days));

        const [pageviews, clicks, uniqueVisitors] = await Promise.all([
            Analytics.countDocuments({
                type: 'pageview',
                timestamp: { $gte: startDate }
            }),
            Analytics.countDocuments({
                type: 'click',
                timestamp: { $gte: startDate }
            }),
            Analytics.distinct('ip', {
                timestamp: { $gte: startDate }
            })
        ]);

        res.json({
            pageviews,
            clicks,
            uniqueVisitors: uniqueVisitors.length,
            period: `${days} days`
        });
    } catch (error) {
        console.error('Error fetching analytics summary:', error);
        res.status(500).json({ error: 'Failed to fetch analytics summary' });
    }
});

// Get popular pages
router.get('/popular-pages', async (req, res) => {
    try {
        const { days = 7 } = req.query;
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - parseInt(days));

        const popularPages = await Analytics.aggregate([
            {
                $match: {
                    type: 'pageview',
                    timestamp: { $gte: startDate }
                }
            },
            {
                $group: {
                    _id: '$path',
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            },
            {
                $limit: 10
            }
        ]);

        res.json(popularPages);
    } catch (error) {
        console.error('Error fetching popular pages:', error);
        res.status(500).json({ error: 'Failed to fetch popular pages' });
    }
});

// Get visitor count (simplified version)
router.get('/visitor-count', async (req, res) => {
    try {
        const totalVisitors = await Analytics.distinct('ip').count();
        res.json({ visitorCount: totalVisitors });
    } catch (error) {
        console.error('Error fetching visitor count:', error);
        res.status(500).json({ error: 'Failed to fetch visitor count' });
    }
});

module.exports = router;
