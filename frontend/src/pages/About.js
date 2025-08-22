import React from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    Avatar,
    Chip,
    Paper,
    Divider,
} from '@mui/material';
import {
    Business,
    School,
    Code,
    TrendingUp,
    Psychology,
    Group,
} from '@mui/icons-material';

const About = () => {
    const skills = [
        { name: 'Backend Development', level: 'Learning', icon: <Code /> },
        { name: 'Data Engineering', level: 'Learning', icon: <TrendingUp /> },
        { name: 'Business Management', level: 'Expert', icon: <Business /> },
        { name: 'Problem Solving', level: 'Advanced', icon: <Psychology /> },
        { name: 'Team Leadership', level: 'Advanced', icon: <Group /> },
        { name: 'Computer Science', level: 'Learning', icon: <School /> },
    ];

    const journey = [
        {
            year: '2014-2023',
            title: 'Food Truck Entrepreneur',
            description: 'Owned and operated a successful food truck business for nearly a decade, managing all aspects from operations to customer service.',
            skills: ['Business Management', 'Operations', 'Customer Service']
        },
        {
            year: '2023-Present',
            title: 'Computer Science Student',
            description: 'Pursuing a Computer Science degree to transition into the tech industry and build a foundation in software development.',
            skills: ['Programming', 'Algorithms', 'Data Structures']
        },
        {
            year: '2024-Present',
            title: 'Backend Development Focus',
            description: 'Laser-focused on backend systems, low-level programming, and data engineering to position for long-term success in tech.',
            skills: ['Backend Development', 'Data Engineering', 'System Design']
        }
    ];

    return (
        <Box>
            {/* Hero Section */}
            <Paper
                elevation={0}
                sx={{
                    background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                    color: 'white',
                    p: 6,
                    mb: 4,
                    borderRadius: 3,
                    textAlign: 'center',
                }}
            >
                <Avatar
                    sx={{
                        width: 120,
                        height: 120,
                        mx: 'auto',
                        mb: 3,
                        bgcolor: 'rgba(255,255,255,0.2)',
                        fontSize: '3rem',
                    }}
                >
                    GG
                </Avatar>
                <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Gil Gaitan
                </Typography>
                <Typography variant="h6" paragraph sx={{ mb: 3, opacity: 0.9 }}>
                    From Food Truck to Tech: Building the Future of Backend Development
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.8, maxWidth: 800, mx: 'auto' }}>
                    A decade of entrepreneurial experience meets a passion for technology and innovation.
                    Currently transitioning into the tech world with a focus on backend development and data engineering.
                </Typography>
            </Paper>

            {/* Journey Timeline */}
            <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
                My Journey
            </Typography>
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {journey.map((step, index) => (
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
                            <CardContent>
                                <Typography variant="h6" color="primary" gutterBottom>
                                    {step.year}
                                </Typography>
                                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                                    {step.title}
                                </Typography>
                                <Typography variant="body2" paragraph color="text.secondary">
                                    {step.description}
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {step.skills.map((skill, skillIndex) => (
                                        <Chip
                                            key={skillIndex}
                                            label={skill}
                                            size="small"
                                            variant="outlined"
                                            color="primary"
                                        />
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Skills Section */}
            <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
                Skills & Expertise
            </Typography>
            <Grid container spacing={2} sx={{ mb: 4 }}>
                {skills.map((skill, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card elevation={1}>
                            <CardContent sx={{ textAlign: 'center', p: 3 }}>
                                <Box sx={{ mb: 2 }}>
                                    <Avatar
                                        sx={{
                                            bgcolor: 'primary.main',
                                            width: 48,
                                            height: 48,
                                            mx: 'auto',
                                        }}
                                    >
                                        {skill.icon}
                                    </Avatar>
                                </Box>
                                <Typography variant="h6" gutterBottom>
                                    {skill.name}
                                </Typography>
                                <Chip
                                    label={skill.level}
                                    color={skill.level === 'Expert' ? 'success' :
                                        skill.level === 'Advanced' ? 'primary' : 'default'}
                                    size="small"
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Mission Statement */}
            <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Mission & Vision
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Typography variant="body1" paragraph>
                    My mission is to leverage my entrepreneurial background and problem-solving skills to create
                    robust, scalable backend systems that drive innovation and efficiency. I believe in the power
                    of technology to solve real-world problems and am committed to continuous learning and growth.
                </Typography>
                <Typography variant="body1" paragraph>
                    I'm actively seeking opportunities to collaborate with forward-thinking companies where I can
                    contribute to meaningful projects, develop my technical skills, and help build solutions that
                    have a lasting impact on users and businesses.
                </Typography>
                <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'primary.main' }}>
                    "Always be planting." - Every line of code, every system design, every solution is a seed
                    that grows into something greater.
                </Typography>
            </Paper>

            {/* Current Focus */}
            <Card elevation={2}>
                <CardContent>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Current Focus Areas
                    </Typography>
                    <Grid container spacing={3} sx={{ mt: 2 }}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" gutterBottom color="primary">
                                Backend Development
                            </Typography>
                            <Typography variant="body2" paragraph>
                                Building robust APIs, server-side applications, and microservices architecture.
                                Focusing on Node.js, Python, and cloud-native development.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" gutterBottom color="primary">
                                Data Engineering
                            </Typography>
                            <Typography variant="body2" paragraph>
                                Designing and implementing data pipelines, ETL processes, and data warehousing solutions.
                                Working with big data technologies and analytics platforms.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" gutterBottom color="primary">
                                System Architecture
                            </Typography>
                            <Typography variant="body2" paragraph>
                                Learning distributed systems, scalability patterns, and infrastructure design.
                                Understanding how to build systems that can handle growth and complexity.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" gutterBottom color="primary">
                                Continuous Learning
                            </Typography>
                            <Typography variant="body2" paragraph>
                                Staying current with industry trends, best practices, and emerging technologies.
                                Contributing to open source and building a strong professional network.
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};

export default About;
