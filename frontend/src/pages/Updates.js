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
    Avatar,
    IconButton,
    Divider,
    Pagination,
} from '@mui/material';
import {
    CalendarToday,
    Person,
    Favorite,
    Share,
    Bookmark,
    Add,
    TrendingUp,
} from '@mui/icons-material';
import { useUpdates } from '../contexts/UpdatesContext';

const Updates = () => {
    const { updates, loading } = useUpdates();
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState('recent');
    const itemsPerPage = 6;

    const sortedUpdates = [...updates].sort((a, b) => {
        if (sortBy === 'recent') {
            return new Date(b.publishDate) - new Date(a.publishDate);
        } else if (sortBy === 'popular') {
            return (b.views || 0) - (a.views || 0);
        } else if (sortBy === 'likes') {
            return (b.likes || 0) - (a.likes || 0);
        }
        return 0;
    });

    const paginatedUpdates = sortedUpdates.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    const totalPages = Math.ceil(sortedUpdates.length / itemsPerPage);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleLike = async (updateId) => {
        try {
            const response = await fetch(`/api/updates/${updateId}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                // Refresh updates to show new like count
                window.location.reload();
            }
        } catch (error) {
            console.error('Error liking update:', error);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <Typography>Loading updates...</Typography>
            </Box>
        );
    }

    return (
        <Box>
            {/* Hero Section */}
            <Paper
                elevation={0}
                sx={{
                    background: 'linear-gradient(135deg, #00bcd4 0%, #009688 100%)',
                    color: 'white',
                    p: 6,
                    mb: 4,
                    borderRadius: 3,
                    textAlign: 'center',
                }}
            >
                <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Latest Updates
                </Typography>
                <Typography variant="h5" paragraph sx={{ mb: 3, opacity: 0.9 }}>
                    Stay connected with our journey and discoveries
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.8, maxWidth: 600, mx: 'auto' }}>
                    From technical insights to project milestones, here's what we're working on
                    and learning in the world of backend development and data engineering.
                </Typography>
            </Paper>

            {/* Sort Options */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">
                    All Updates ({sortedUpdates.length})
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
                        variant={sortBy === 'popular' ? 'contained' : 'outlined'}
                        onClick={() => setSortBy('popular')}
                    >
                        Popular
                    </Button>
                    <Button
                        size="small"
                        variant={sortBy === 'likes' ? 'contained' : 'outlined'}
                        onClick={() => setSortBy('likes')}
                    >
                        Most Liked
                    </Button>
                </Box>
            </Box>

            {/* Updates Grid */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {paginatedUpdates.map((update, index) => (
                    <Grid item xs={12} md={6} lg={4} key={update.id || index}>
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
                                {/* Header */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                                            {update.author?.charAt(0) || 'G'}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                                {update.author}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {formatDate(update.publishDate)}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                                        {update.featured && (
                                            <Chip
                                                label="Featured"
                                                size="small"
                                                color="primary"
                                                icon={<TrendingUp />}
                                            />
                                        )}
                                        <IconButton size="small">
                                            <Bookmark />
                                        </IconButton>
                                    </Box>
                                </Box>

                                {/* Content */}
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                                    {update.title}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    paragraph
                                    color="text.secondary"
                                    sx={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical',
                                    }}
                                >
                                    {update.content}
                                </Typography>

                                {/* Tags */}
                                {update.tags && update.tags.length > 0 && (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                                        {update.tags.slice(0, 3).map((tag, tagIndex) => (
                                            <Chip
                                                key={tagIndex}
                                                label={tag}
                                                size="small"
                                                variant="outlined"
                                            />
                                        ))}
                                        {update.tags.length > 3 && (
                                            <Chip
                                                label={`+${update.tags.length - 3} more`}
                                                size="small"
                                                variant="outlined"
                                            />
                                        )}
                                    </Box>
                                )}

                                <Divider sx={{ my: 2 }} />

                                {/* Footer */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                        <Button
                                            size="small"
                                            startIcon={<Favorite />}
                                            onClick={() => handleLike(update.id)}
                                            sx={{ minWidth: 'auto' }}
                                        >
                                            {update.likes || 0}
                                        </Button>
                                        <Button
                                            size="small"
                                            startIcon={<Share />}
                                            sx={{ minWidth: 'auto' }}
                                        >
                                            Share
                                        </Button>
                                    </Box>

                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Chip
                                            label={`${update.views || 0} views`}
                                            size="small"
                                            variant="outlined"
                                        />
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Pagination */}
            {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                        size="large"
                    />
                </Box>
            )}

            {/* Empty State */}
            {sortedUpdates.length === 0 && (
                <Paper elevation={1} sx={{ p: 6, textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>
                        No updates yet
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Be the first to share an update about your latest project or discovery!
                    </Typography>
                </Paper>
            )}

            {/* Add Update Section */}
            <Paper elevation={2} sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                    Have something to share?
                </Typography>
                <Typography variant="body2" paragraph color="text.secondary">
                    Share your latest project updates, discoveries, or insights with the community.
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    size="large"
                    sx={{ mt: 2 }}
                >
                    Create Update
                </Button>
            </Paper>
        </Box>
    );
};

export default Updates;
