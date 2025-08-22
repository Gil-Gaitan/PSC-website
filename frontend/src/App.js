import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Links from './pages/Links';
import Updates from './pages/Updates';
import { TimeProvider } from './contexts/TimeContext';
import { UpdatesProvider } from './contexts/UpdatesContext';

function App() {
    const [isLoading, setIsLoading] = useState(true);

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
                </Box>
            </UpdatesProvider>
        </TimeProvider>
    );
}

export default App;
