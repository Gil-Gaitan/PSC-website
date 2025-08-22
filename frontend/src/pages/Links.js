import React, { useState } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    Chip,
    Button,
    Paper,
    Tabs,
    Tab,
    Link as MuiLink,
    IconButton,
    Tooltip,
} from '@mui/material';
import {
    OpenInNew,
    Bookmark,
    School,
    Build,
    Lightbulb,
    Article,
    MoreVert,
    Add,
} from '@mui/icons-material';
import { useUpdates } from '../contexts/UpdatesContext';

const Links = () => {
    const { links, loading } = useUpdates();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('recent');

    const categories = ['All', 'Learning', 'Development', 'Tools', 'Inspiration', 'News', 'Other'];

    const handleCategoryChange = (event, newValue) => {
        setSelectedCategory(newValue);
    };

    const filteredLinks = links.filter(link =>
        selectedCategory === 'All' || link.category === selectedCategory
    );

    const sortedLinks = [...filteredLinks].sort((a, b) => {
        if (sortBy === 'recent') {
            return new Date(b.createdAt) - new Date(a.createdAt);
        } else if (sortBy === 'clicks') {
            return b.clicks - a.clicks;
        }
        return 0;
    });

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'Learning': return <School />;
            case 'Development': return <Build />;
            case 'Tools': return <Build />;
            case 'Inspiration': return <Lightbulb />;
            case 'News': return <Article />;
            default: return <Bookmark />;
        }
    };

    const getCategoryColor = (category) => {
        switch (category) {
            case 'Learning': return 'primary';
            case 'Development': return 'secondary';
            case 'Tools': return 'success';
            case 'Inspiration': return 'warning';
            case 'News': return 'info';
            case 'Other': return 'default';
            default: return 'default';
        }
    };

    const handleLinkClick = async (link) => {
        try {
            // Track the click
            const response = await fetch(`/api/analytics/click`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    linkId: link.id,
                    linkTitle: link.title,
                    userAgent: navigator.userAgent,
                }),
            });
        } catch (error) {
            console.error('Error tracking link click:', error);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <Typography>Loading links...</Typography>
            </Box>
        );
    }

    return (
        <Box>
            {/* Hero Section */}
            <Paper
                elevation={0}
                sx={{
                    background: 'linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)',
                    color: 'white',
                    p: 6,
                    mb: 4,
                    borderRadius: 3,
                    textAlign: 'center',
                }}
            >
                <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Curated Resources
                </Typography>
                <Typography variant="h5" paragraph sx={{ mb: 3, opacity: 0.9 }}>
                    A collection of useful links and resources for developers
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.8, maxWidth: 600, mx: 'auto' }}>
                    Discover tools, tutorials, and inspiration for your development journey.
                    These resources are carefully curated and organized by category.
                </Typography>
            </Paper>

            {/* Category Tabs */}
            <Paper elevation={1} sx={{ mb: 4 }}>
                <Tabs
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{ px: 2 }}
                >
                    {categories.map((category) => (
                        <Tab
                            key={category}
                            label={category}
                            value={category}
                            icon={category !== 'All' ? getCategoryIcon(category) : null}
                            iconPosition="start"
                        />
                    ))}
                </Tabs>
            </Paper>

            {/* Sort Options */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">
                    {selectedCategory === 'All' ? 'All Resources' : `${selectedCategory} Resources`}
                    ({sortedLinks.length})
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                        size="small"
                        variant={sortBy === 'recent' ? 'contained' : 'outlined'}
                        onClick={() => setSortBy('recent')}
                    >
                        Recent
                    </Button>
                    <Button
                        size="small"
                        variant={sortBy === 'clicks' ? 'contained' : 'outlined'}
                        onClick={() => setSortBy('clicks')}
                    >
                        Popular
                    </Button>
                </Box>
            </Box>

            {/* Links Grid */}
            <Grid container spacing={3}>
                {sortedLinks.map((link, index) => (
                    <Grid item xs={12} md={6} lg={4} key={link.id || index}>
                        <Card
                            elevation={2}
                            sx={{
                                height: '100%',
                                transition: 'transform 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                }
                            }}
                        >
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        {getCategoryIcon(link.category)}
                                        <Chip
                                            label={link.category}
                                            size="small"
                                            color={getCategoryColor(link.category)}
                                        />
                                    </Box>
                                    <Tooltip title="More options">
                                        <IconButton size="small">
                                            <MoreVert />
                                        </IconButton>
                                    </Tooltip>
                                </Box>

                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                                    {link.title}
                                </Typography>

                                <Typography variant="body2" paragraph color="text.secondary" sx={{ mb: 2 }}>
                                    {link.description}
                                </Typography>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Chip
                                            label={`${link.clicks || 0} clicks`}
                                            size="small"
                                            variant="outlined"
                                        />
                                        {link.featured && (
                                            <Chip
                                                label="Featured"
                                                size="small"
                                                color="primary"
                                            />
                                        )}
                                    </Box>

                                    <Button
                                        component={MuiLink}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => handleLinkClick(link)}
                                        startIcon={<OpenInNew />}
                                        size="small"
                                        variant="contained"
                                    >
                                        Visit
                                    </Button>
                                </Box>

                                {link.author && (
                                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                                        Added by {link.author}
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Empty State */}
            {sortedLinks.length === 0 && (
                <Paper elevation={1} sx={{ p: 6, textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>
                        No links found
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {selectedCategory === 'All'
                            ? 'No links have been added yet.'
                            : `No links found in the ${selectedCategory} category.`
                        }
                    </Typography>
                </Paper>
            )}

            {/* Add Link Section */}
            <Paper elevation={2} sx={{ p: 4, mt: 4, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                    Have a great resource to share?
                </Typography>
                <Typography variant="body2" paragraph color="text.secondary">
                    Help grow this collection by suggesting useful links and resources for the community.
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    size="large"
                    sx={{ mt: 2 }}
                >
                    Suggest a Link
                </Button>
            </Paper>
        </Box>
    );
};

export default Links;
