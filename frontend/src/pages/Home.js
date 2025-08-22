import React from 'react';
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
    Divider,
} from '@mui/material';
import {
    TrendingUp,
    Code,
    Storage,
    Cloud,
    AccessTime,
    CalendarToday,
    Person,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTime } from '../contexts/TimeContext';
import { useUpdates } from '../contexts/UpdatesContext';

const Home = () => {
    const { formatTime, formatDate, currentTime, currentDate } = useTime();
    const { updates, loading } = useUpdates();

    const featuredUpdate = updates.find(update => update.featured) || updates[0];

    const skills = [
        { icon: <Code />, title: 'Backend Development', description: 'Building robust APIs and server-side applications' },
        { icon: <Storage />, title: 'Data Engineering', description: 'Designing and implementing data pipelines' },
        { icon: <Cloud />, title: 'Cloud Infrastructure', description: 'Deploying and managing cloud-based solutions' },
    ];

    return (
        <Box>
            {/* Hero Section */}
            <Paper
                elevation={0}
                sx={{
                    background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
                    color: 'white',
                    p: 6,
                    mb: 4,
                    borderRadius: 3,
                    textAlign: 'center',
                }}
            >
                <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Plant Seeds Cook
                </Typography>
                <Typography variant="h5" paragraph sx={{ mb: 3, opacity: 0.9 }}>
                    Creating backend systems for useful tools. Always be planting.
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, opacity: 0.8, maxWidth: 600, mx: 'auto' }}>
                    From food truck entrepreneur to tech enthusiast, I'm building the foundation for scalable,
                    data-driven solutions. Join me on this journey of innovation and growth.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Button
                        component={Link}
                        to="/about"
                        variant="contained"
                        size="large"
                        sx={{
                            bgcolor: 'white',
                            color: 'primary.main',
                            '&:hover': { bgcolor: 'grey.100' }
                        }}
                    >
                        Learn More
                    </Button>
                    <Button
                        component={Link}
                        to="/projects"
                        variant="outlined"
                        size="large"
                        sx={{
                            borderColor: 'white',
                            color: 'white',
                            '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
                        }}
                    >
                        View Projects
                    </Button>
                </Box>
            </Paper>

            {/* Real-time Info Section */}
            <Grid container spacing={4} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                    <Card elevation={2}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <AccessTime sx={{ mr: 1, color: 'primary.main' }} />
                                <Typography variant="h6">Current Time</Typography>
                            </Box>
                            <Typography variant="h4" sx={{ fontFamily: 'monospace', mb: 1 }}>
                                {formatTime(currentTime)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {formatDate(currentDate)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card elevation={2}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <TrendingUp sx={{ mr: 1, color: 'primary.main' }} />
                                <Typography variant="h6">Latest Activity</Typography>
                            </Box>
                            <Typography variant="h6" gutterBottom>
                                Awesome Data Pipeline
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Latest repository update
                            </Typography>
                            <Chip
                                label="Active"
                                color="success"
                                size="small"
                                sx={{ mt: 1 }}
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Featured Update Section */}
            {featuredUpdate && (
                <Card elevation={2} sx={{ mb: 4 }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <CalendarToday sx={{ mr: 1, color: 'primary.main' }} />
                            <Typography variant="h6">Latest Update</Typography>
                            <Chip
                                label="Featured"
                                color="primary"
                                size="small"
                                sx={{ ml: 'auto' }}
                            />
                        </Box>
                        <Typography variant="h5" gutterBottom>
                            {featuredUpdate.title}
                        </Typography>
                        <Typography variant="body1" paragraph color="text.secondary">
                            {featuredUpdate.content}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Person sx={{ mr: 0.5, fontSize: '1rem' }} />
                                <Typography variant="body2" color="text.secondary">
                                    {featuredUpdate.author}
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                {new Date(featuredUpdate.publishDate).toLocaleDateString()}
                            </Typography>
                        </Box>
                        <Button
                            component={Link}
                            to="/updates"
                            variant="text"
                            sx={{ mt: 2 }}
                        >
                            View All Updates →
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* Skills Section */}
            <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
                What I'm Building
            </Typography>
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {skills.map((skill, index) => (
                    <Grid item xs={12} md={4} key={index}>
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
                            <CardContent sx={{ textAlign: 'center', p: 3 }}>
                                <Box sx={{ mb: 2 }}>
                                    <Avatar
                                        sx={{
                                            bgcolor: 'primary.main',
                                            width: 56,
                                            height: 56,
                                            mx: 'auto',
                                        }}
                                    >
                                        {skill.icon}
                                    </Avatar>
                                </Box>
                                <Typography variant="h6" gutterBottom>
                                    {skill.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {skill.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Call to Action */}
            <Paper
                elevation={1}
                sx={{
                    p: 4,
                    textAlign: 'center',
                    bgcolor: 'grey.50',
                    borderRadius: 3,
                }}
            >
                <Typography variant="h5" gutterBottom>
                    Ready to Collaborate?
                </Typography>
                <Typography variant="body1" paragraph color="text.secondary">
                    I'm always looking for opportunities to work with talented developers and contribute to meaningful projects.
                </Typography>
                <Button
                    component={Link}
                    to="/about"
                    variant="contained"
                    size="large"
                    sx={{ mr: 2 }}
                >
                    Get in Touch
                </Button>
                <Button
                    component={Link}
                    to="/links"
                    variant="outlined"
                    size="large"
                >
                    Explore Resources
                </Button>
            </Paper>
        </Box>
    );
};

export default Home;
