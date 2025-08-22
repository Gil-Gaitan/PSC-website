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
    LinearProgress,
    Avatar,
} from '@mui/material';
import {
    Code,
    Storage,
    Cloud,
    GitHub,
    Launch,
    Build,
    TrendingUp,
    Psychology,
} from '@mui/icons-material';

const Projects = () => {
    const currentProjects = [
        {
            title: 'Plant Seeds Cook Website',
            description: 'This full-stack React application with Node.js backend and MongoDB database. Features real-time updates, analytics, and contributor support.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Material-UI', 'Socket.IO'],
            status: 'In Progress',
            progress: 75,
            icon: <Code />,
            githubUrl: 'https://github.com/Gil-Gaitan/PSC-website',
            liveUrl: null,
            category: 'Full Stack'
        },
        {
            title: 'Data Engineering Pipeline',
            description: 'Building scalable data pipelines for processing and analyzing large datasets. Learning ETL processes and data warehousing.',
            technologies: ['Python', 'Apache Airflow', 'PostgreSQL', 'Docker'],
            status: 'Planning',
            progress: 25,
            icon: <Storage />,
            githubUrl: null,
            liveUrl: null,
            category: 'Data Engineering'
        },
        {
            title: 'Backend API Development',
            description: 'Creating RESTful APIs and microservices architecture. Learning best practices for scalable backend systems.',
            technologies: ['Node.js', 'Express', 'MongoDB', 'Redis', 'Docker'],
            status: 'Learning',
            progress: 40,
            icon: <Build />,
            githubUrl: null,
            liveUrl: null,
            category: 'Backend'
        }
    ];

    const plannedProjects = [
        {
            title: 'Cloud Infrastructure Setup',
            description: 'Deploying applications to cloud platforms and learning infrastructure as code.',
            technologies: ['AWS', 'Terraform', 'Docker', 'Kubernetes'],
            status: 'Planned',
            progress: 0,
            icon: <Cloud />,
            category: 'DevOps'
        },
        {
            title: 'Machine Learning Pipeline',
            description: 'Building ML models and deploying them in production environments.',
            technologies: ['Python', 'TensorFlow', 'Scikit-learn', 'FastAPI'],
            status: 'Planned',
            progress: 0,
            icon: <TrendingUp />,
            category: 'Machine Learning'
        },
        {
            title: 'Real-time Analytics Dashboard',
            description: 'Creating dashboards for real-time data visualization and monitoring.',
            technologies: ['React', 'D3.js', 'WebSocket', 'InfluxDB'],
            status: 'Planned',
            progress: 0,
            icon: <Psychology />,
            category: 'Frontend'
        }
    ];

    const skills = [
        {
            category: 'Web Development',
            skills: ['HTML & CSS', 'JavaScript', 'React', 'Git & GitHub'],
            level: 'Intermediate'
        },
        {
            category: 'Backend Development',
            skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs'],
            level: 'Learning'
        },
        {
            category: 'Data Engineering',
            skills: ['Python', 'SQL', 'ETL Processes', 'Data Modeling'],
            level: 'Learning'
        },
        {
            category: 'DevOps & Cloud',
            skills: ['Docker', 'Git', 'AWS (Learning)', 'CI/CD'],
            level: 'Learning'
        },
        {
            category: 'Tools & Technologies',
            skills: ['VS Code', 'Postman', 'MongoDB Compass', 'Docker Desktop'],
            level: 'Intermediate'
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'In Progress': return 'primary';
            case 'Completed': return 'success';
            case 'Planning': return 'warning';
            case 'Learning': return 'info';
            case 'Planned': return 'default';
            default: return 'default';
        }
    };

    const getCategoryColor = (category) => {
        switch (category) {
            case 'Full Stack': return 'primary';
            case 'Backend': return 'secondary';
            case 'Data Engineering': return 'success';
            case 'DevOps': return 'warning';
            case 'Machine Learning': return 'error';
            case 'Frontend': return 'info';
            default: return 'default';
        }
    };

    return (
        <Box>
            {/* Hero Section */}
            <Paper
                elevation={0}
                sx={{
                    background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
                    color: 'white',
                    p: 6,
                    mb: 4,
                    borderRadius: 3,
                    textAlign: 'center',
                }}
            >
                <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Projects & Skills
                </Typography>
                <Typography variant="h5" paragraph sx={{ mb: 3, opacity: 0.9 }}>
                    Building the foundation for scalable, data-driven solutions
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.8, maxWidth: 600, mx: 'auto' }}>
                    From learning the basics to building complex systems, each project is a step toward
                    mastering backend development and data engineering.
                </Typography>
            </Paper>

            {/* Current Projects */}
            <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
                Current Projects
            </Typography>
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {currentProjects.map((project, index) => (
                    <Grid item xs={12} md={6} lg={4} key={index}>
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
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                                        {project.icon}
                                    </Avatar>
                                    <Box>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                            {project.title}
                                        </Typography>
                                        <Chip
                                            label={project.category}
                                            size="small"
                                            color={getCategoryColor(project.category)}
                                            sx={{ mt: 0.5 }}
                                        />
                                    </Box>
                                </Box>

                                <Typography variant="body2" paragraph color="text.secondary">
                                    {project.description}
                                </Typography>

                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        Progress: {project.progress}%
                                    </Typography>
                                    <LinearProgress
                                        variant="determinate"
                                        value={project.progress}
                                        sx={{ height: 6, borderRadius: 3 }}
                                    />
                                </Box>

                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                                    {project.technologies.map((tech, techIndex) => (
                                        <Chip
                                            key={techIndex}
                                            label={tech}
                                            size="small"
                                            variant="outlined"
                                        />
                                    ))}
                                </Box>

                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Chip
                                        label={project.status}
                                        color={getStatusColor(project.status)}
                                        size="small"
                                    />
                                    {project.githubUrl && (
                                        <Button
                                            component="a"
                                            href={project.githubUrl}
                                            target="_blank"
                                            size="small"
                                            startIcon={<GitHub />}
                                            sx={{ ml: 'auto' }}
                                        >
                                            Code
                                        </Button>
                                    )}
                                    {project.liveUrl && (
                                        <Button
                                            component="a"
                                            href={project.liveUrl}
                                            target="_blank"
                                            size="small"
                                            startIcon={<Launch />}
                                        >
                                            Live
                                        </Button>
                                    )}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Planned Projects */}
            <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
                Planned Projects
            </Typography>
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {plannedProjects.map((project, index) => (
                    <Grid item xs={12} md={6} lg={4} key={index}>
                        <Card
                            elevation={1}
                            sx={{
                                height: '100%',
                                opacity: 0.7,
                                transition: 'all 0.2s ease-in-out',
                                '&:hover': {
                                    opacity: 1,
                                    transform: 'translateY(-2px)',
                                }
                            }}
                        >
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Avatar sx={{ bgcolor: 'grey.400', mr: 2 }}>
                                        {project.icon}
                                    </Avatar>
                                    <Box>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                            {project.title}
                                        </Typography>
                                        <Chip
                                            label={project.category}
                                            size="small"
                                            color={getCategoryColor(project.category)}
                                            sx={{ mt: 0.5 }}
                                        />
                                    </Box>
                                </Box>

                                <Typography variant="body2" paragraph color="text.secondary">
                                    {project.description}
                                </Typography>

                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {project.technologies.map((tech, techIndex) => (
                                        <Chip
                                            key={techIndex}
                                            label={tech}
                                            size="small"
                                            variant="outlined"
                                            sx={{ opacity: 0.6 }}
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
                Skills & Technologies
            </Typography>
            <Grid container spacing={3}>
                {skills.map((skillGroup, index) => (
                    <Grid item xs={12} md={6} lg={4} key={index}>
                        <Card elevation={2}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                                    {skillGroup.category}
                                </Typography>
                                <Chip
                                    label={skillGroup.level}
                                    color={skillGroup.level === 'Expert' ? 'success' :
                                        skillGroup.level === 'Intermediate' ? 'primary' : 'default'}
                                    size="small"
                                    sx={{ mb: 2 }}
                                />
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {skillGroup.skills.map((skill, skillIndex) => (
                                        <Chip
                                            key={skillIndex}
                                            label={skill}
                                            size="small"
                                            variant="outlined"
                                        />
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Projects;
