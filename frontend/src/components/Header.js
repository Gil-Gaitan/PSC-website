import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useTheme,
    useMediaQuery,
    Chip,
} from '@mui/material';
import { Menu as MenuIcon, AccessTime } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useTime } from '../contexts/TimeContext';

const Header = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const location = useLocation();
    const { formatTime, currentTime } = useTime();

    const navItems = [
        { text: 'Home', path: '/' },
        { text: 'About', path: '/about' },
        { text: 'Projects', path: '/projects' },
        { text: 'Links', path: '/links' },
        { text: 'Updates', path: '/updates' },
    ];

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                Plant Seeds Cook
            </Typography>
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.text} component={Link} to={item.path}>
                        <ListItemText
                            primary={item.text}
                            sx={{
                                color: isActive(item.path) ? 'primary.main' : 'text.primary',
                                fontWeight: isActive(item.path) ? 'bold' : 'normal',
                            }}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            <AppBar
                position="sticky"
                elevation={1}
                sx={{
                    backgroundColor: 'background.paper',
                    color: 'text.primary',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Toolbar>
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}

                    <Typography
                        variant="h5"
                        component={Link}
                        to="/"
                        sx={{
                            flexGrow: 1,
                            textDecoration: 'none',
                            color: 'inherit',
                            fontWeight: 'bold',
                            '&:hover': {
                                color: 'primary.main',
                            },
                        }}
                    >
                        Plant Seeds Cook
                    </Typography>

                    {/* Real-time clock */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                        <AccessTime sx={{ mr: 1, fontSize: '1.2rem' }} />
                        <Chip
                            label={formatTime(currentTime)}
                            size="small"
                            variant="outlined"
                            sx={{
                                fontFamily: 'monospace',
                                fontSize: '0.875rem',
                            }}
                        />
                    </Box>

                    {/* Desktop Navigation */}
                    {!isMobile && (
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {navItems.map((item) => (
                                <Button
                                    key={item.text}
                                    component={Link}
                                    to={item.path}
                                    sx={{
                                        color: isActive(item.path) ? 'primary.main' : 'text.primary',
                                        fontWeight: isActive(item.path) ? 'bold' : 'normal',
                                        '&:hover': {
                                            backgroundColor: 'action.hover',
                                        },
                                    }}
                                >
                                    {item.text}
                                </Button>
                            ))}
                        </Box>
                    )}
                </Toolbar>
            </AppBar>

            {/* Mobile Navigation Drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: 240,
                    },
                }}
            >
                {drawer}
            </Drawer>
        </>
    );
};

export default Header;
