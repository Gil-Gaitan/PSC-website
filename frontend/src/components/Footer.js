import React from 'react';
import {
    Box,
    Container,
    Typography,
    Link,
    IconButton,
    Divider,
    Grid,
} from '@mui/material';
import {
    GitHub,
    LinkedIn,
    Email,
    Description,
} from '@mui/icons-material';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        {
            icon: <GitHub />,
            url: 'https://github.com/Gil-Gaitan',
            label: 'GitHub',
        },
        {
            icon: <LinkedIn />,
            url: 'https://www.linkedin.com/in/gil-gaitan-86094894/',
            label: 'LinkedIn',
        },
        {
            icon: <Email />,
            url: 'mailto:Gil@plantseedscook.com',
            label: 'Email',
        },
        {
            icon: <Description />,
            url: '/resume.pdf',
            label: 'Resume',
        },
    ];

    return (
        <Box
            component="footer"
            sx={{
                bgcolor: 'background.paper',
                borderTop: '1px solid',
                borderColor: 'divider',
                mt: 'auto',
                py: 4,
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    {/* Social Links */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                            Connect
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                            {socialLinks.map((social) => (
                                <IconButton
                                    key={social.label}
                                    component={Link}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    sx={{
                                        color: 'text.secondary',
                                        '&:hover': {
                                            color: 'primary.main',
                                            transform: 'translateY(-2px)',
                                        },
                                        transition: 'all 0.2s ease-in-out',
                                    }}
                                >
                                    {social.icon}
                                </IconButton>
                            ))}
                        </Box>
                    </Grid>

                    {/* Contact Info */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                            Contact
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                            Email: <Link href="mailto:Gil@plantseedscook.com" color="primary">
                                Gil@plantseedscook.com
                            </Link>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Always be planting. 🌱
                        </Typography>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                {/* Copyright */}
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                        © {currentYear} Plant Seeds Cook. All rights reserved.
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                        Built with React, Material-UI, and a passion for backend development.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
