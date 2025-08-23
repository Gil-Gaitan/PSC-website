import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Container, IconButton, Tooltip } from '@mui/material';
import { AdminPanelSettings } from '@mui/icons-material';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Links from './pages/Links';
import Updates from './pages/Updates';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
import { TimeProvider } from './contexts/TimeContext';
import { UpdatesProvider } from './contexts/UpdatesContext';
import { AdminProvider, useAdmin } from './contexts/AdminContext';

function AppContent() {
    const [isLoading, setIsLoading] = useState(true);
    const [showAdminLogin, setShowAdminLogin] = useState(false);
    const [showAdminPanel, setShowAdminPanel] = useState(false);
    const { isAuthenticated, login, logout } = useAdmin();

    useEffect(() => {
        // Simulate initial loading
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
                bgcolor="background.default"
            >
                <div>Loading Plant Seeds Cook...</div>
            </Box>
        );
    }

    return (
        <>
            <TimeProvider>
                <UpdatesProvider>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            minHeight: '100vh',
                            bgcolor: 'background.default',
                        }}
                    >
                        <Header />
                        <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
                            <Container maxWidth="lg">
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/about" element={<About />} />
                                    <Route path="/projects" element={<Projects />} />
                                    <Route path="/links" element={<Links />} />
                                    <Route path="/updates" element={<Updates />} />
                                </Routes>
                            </Container>
                        </Box>
                        <Footer />

                        {/* Admin Button */}
                        <Box
                            sx={{
                                position: 'fixed',
                                bottom: 20,
                                right: 20,
                                zIndex: 1000,
                            }}
                        >
                            <Tooltip title={isAuthenticated ? "Admin Panel" : "Admin Login"}>
                                <IconButton
                                    onClick={() => isAuthenticated ? setShowAdminPanel(true) : setShowAdminLogin(true)}
                                    sx={{
                                        bgcolor: isAuthenticated ? 'success.main' : 'primary.main',
                                        color: 'white',
                                        '&:hover': {
                                            bgcolor: isAuthenticated ? 'success.dark' : 'primary.dark',
                                        },
                                    }}
                                >
                                    <AdminPanelSettings />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                </UpdatesProvider>
            </TimeProvider>

            <AdminLogin
                open={showAdminLogin}
                onClose={() => setShowAdminLogin(false)}
                onLogin={login}
            />

            <AdminPanel
                open={showAdminPanel}
                onClose={() => setShowAdminPanel(false)}
            />
        </>
    );
}

function App() {
    return (
        <AdminProvider>
            <AppContent />
        </AdminProvider>
    );
}

export default App;
