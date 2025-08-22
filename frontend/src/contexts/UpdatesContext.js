import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UpdatesContext = createContext();

export const useUpdates = () => {
    const context = useContext(UpdatesContext);
    if (!context) {
        throw new Error('useUpdates must be used within an UpdatesProvider');
    }
    return context;
};

export const UpdatesProvider = ({ children }) => {
    const [updates, setUpdates] = useState([]);
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    // Fetch updates from API
    const fetchUpdates = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/api/updates`);
            setUpdates(response.data);
        } catch (err) {
            console.error('Error fetching updates:', err);
            setError('Failed to load updates');
            // Fallback to mock data
            setUpdates([
                {
                    id: 1,
                    title: 'Welcome to the New Site!',
                    content: 'Welcome to the new Plant Seeds Cook website! This is a complete rebuild using React and modern web technologies. We\'re excited to share our journey in backend development and data engineering.',
                    publishDate: new Date().toISOString(),
                    author: 'Gil Gaitan',
                    featured: true
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    // Fetch links from API
    const fetchLinks = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/links`);
            setLinks(response.data);
        } catch (err) {
            console.error('Error fetching links:', err);
            // Fallback to mock data
            setLinks([
                {
                    id: 1,
                    title: 'The Odin Project',
                    url: 'https://www.theodinproject.com',
                    description: 'Learn web development for free',
                    category: 'Learning'
                },
                {
                    id: 2,
                    title: 'GitHub',
                    url: 'https://github.com',
                    description: 'Where the world builds software',
                    category: 'Development'
                }
            ]);
        }
    };

    // Add new update
    const addUpdate = async (updateData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/updates`, updateData);
            setUpdates(prev => [response.data, ...prev]);
            return response.data;
        } catch (err) {
            console.error('Error adding update:', err);
            throw err;
        }
    };

    // Add new link
    const addLink = async (linkData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/links`, linkData);
            setLinks(prev => [...prev, response.data]);
            return response.data;
        } catch (err) {
            console.error('Error adding link:', err);
            throw err;
        }
    };

    useEffect(() => {
        fetchUpdates();
        fetchLinks();
    }, []);

    const value = {
        updates,
        links,
        loading,
        error,
        fetchUpdates,
        fetchLinks,
        addUpdate,
        addLink,
    };

    return (
        <UpdatesContext.Provider value={value}>
            {children}
        </UpdatesContext.Provider>
    );
};
