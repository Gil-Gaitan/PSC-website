import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Alert,
    Box,
    Typography,
    Tabs,
    Tab,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Switch,
    FormControlLabel,
    Chip,
    Stack
} from '@mui/material';
import { Add, Edit, Delete, Save, Cancel } from '@mui/icons-material';
import { useAdmin } from '../contexts/AdminContext';

const AdminPanel = ({ open, onClose }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [updates, setUpdates] = useState([]);
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { makeAuthenticatedRequest } = useAdmin();

    // Form states
    const [updateForm, setUpdateForm] = useState({
        title: '',
        content: '',
        featured: false,
        tags: ''
    });

    const [linkForm, setLinkForm] = useState({
        title: '',
        url: '',
        description: '',
        category: 'general',
        featured: false,
        tags: ''
    });

    useEffect(() => {
        if (open) {
            fetchData();
        }
    }, [open]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [updatesRes, linksRes] = await Promise.all([
                fetch('/api/updates'),
                fetch('/api/links')
            ]);

            const updatesData = await updatesRes.json();
            const linksData = await linksRes.json();

            setUpdates(updatesData.updates || []);
            setLinks(linksData.links || []);
        } catch (err) {
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await makeAuthenticatedRequest('/api/updates', {
                method: 'POST',
                body: JSON.stringify({
                    ...updateForm,
                    tags: updateForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
                })
            });

            if (response.ok) {
                setSuccess('Update created successfully!');
                setUpdateForm({ title: '', content: '', featured: false, tags: '' });
                fetchData();
            } else {
                const data = await response.json();
                setError(data.error || 'Failed to create update');
            }
        } catch (err) {
            setError('Failed to create update');
        } finally {
            setLoading(false);
        }
    };

    const handleLinkSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await makeAuthenticatedRequest('/api/links', {
                method: 'POST',
                body: JSON.stringify({
                    ...linkForm,
                    tags: linkForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
                })
            });

            if (response.ok) {
                setSuccess('Link created successfully!');
                setLinkForm({ title: '', url: '', description: '', category: 'general', featured: false, tags: '' });
                fetchData();
            } else {
                const data = await response.json();
                setError(data.error || 'Failed to create link');
            }
        } catch (err) {
            setError('Failed to create link');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (type, id) => {
        if (!window.confirm(`Are you sure you want to delete this ${type}?`)) {
            return;
        }

        setLoading(true);
        try {
            const response = await makeAuthenticatedRequest(`/api/${type}/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setSuccess(`${type.slice(0, -1)} deleted successfully!`);
                fetchData();
            } else {
                setError(`Failed to delete ${type.slice(0, -1)}`);
            }
        } catch (err) {
            setError(`Failed to delete ${type.slice(0, -1)}`);
        } finally {
            setLoading(false);
        }
    };

    const clearMessages = () => {
        setError('');
        setSuccess('');
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogTitle>
                <Typography variant="h5">Admin Panel</Typography>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                    <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
                        <Tab label="Updates" />
                        <Tab label="Links" />
                    </Tabs>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }} onClose={clearMessages}>
                        {error}
                    </Alert>
                )}

                {success && (
                    <Alert severity="success" sx={{ mb: 2 }} onClose={clearMessages}>
                        {success}
                    </Alert>
                )}

                {activeTab === 0 && (
                    <Box>
                        <Typography variant="h6" sx={{ mb: 2 }}>Create New Update</Typography>
                        <form onSubmit={handleUpdateSubmit}>
                            <Stack spacing={2}>
                                <TextField
                                    label="Title"
                                    fullWidth
                                    value={updateForm.title}
                                    onChange={(e) => setUpdateForm({ ...updateForm, title: e.target.value })}
                                    required
                                />
                                <TextField
                                    label="Content"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    value={updateForm.content}
                                    onChange={(e) => setUpdateForm({ ...updateForm, content: e.target.value })}
                                    required
                                />
                                <TextField
                                    label="Tags (comma-separated)"
                                    fullWidth
                                    value={updateForm.tags}
                                    onChange={(e) => setUpdateForm({ ...updateForm, tags: e.target.value })}
                                    placeholder="project, launch, update"
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={updateForm.featured}
                                            onChange={(e) => setUpdateForm({ ...updateForm, featured: e.target.checked })}
                                        />
                                    }
                                    label="Featured Update"
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    startIcon={<Add />}
                                    disabled={loading}
                                >
                                    Create Update
                                </Button>
                            </Stack>
                        </form>

                        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Existing Updates</Typography>
                        {updates.map((update) => (
                            <Box key={update._id} sx={{ p: 2, border: 1, borderColor: 'divider', mb: 1, borderRadius: 1 }}>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Box>
                                        <Typography variant="subtitle1">{update.title}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {new Date(update.publishDate).toLocaleDateString()}
                                        </Typography>
                                        {update.featured && <Chip label="Featured" size="small" color="primary" />}
                                    </Box>
                                    <Button
                                        size="small"
                                        color="error"
                                        onClick={() => handleDelete('updates', update._id)}
                                        disabled={loading}
                                    >
                                        <Delete />
                                    </Button>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                )}

                {activeTab === 1 && (
                    <Box>
                        <Typography variant="h6" sx={{ mb: 2 }}>Create New Link</Typography>
                        <form onSubmit={handleLinkSubmit}>
                            <Stack spacing={2}>
                                <TextField
                                    label="Title"
                                    fullWidth
                                    value={linkForm.title}
                                    onChange={(e) => setLinkForm({ ...linkForm, title: e.target.value })}
                                    required
                                />
                                <TextField
                                    label="URL"
                                    fullWidth
                                    type="url"
                                    value={linkForm.url}
                                    onChange={(e) => setLinkForm({ ...linkForm, url: e.target.value })}
                                    required
                                />
                                <TextField
                                    label="Description"
                                    fullWidth
                                    multiline
                                    rows={2}
                                    value={linkForm.description}
                                    onChange={(e) => setLinkForm({ ...linkForm, description: e.target.value })}
                                />
                                <FormControl fullWidth>
                                    <InputLabel>Category</InputLabel>
                                    <Select
                                        value={linkForm.category}
                                        onChange={(e) => setLinkForm({ ...linkForm, category: e.target.value })}
                                    >
                                        <MenuItem value="general">General</MenuItem>
                                        <MenuItem value="development">Development</MenuItem>
                                        <MenuItem value="design">Design</MenuItem>
                                        <MenuItem value="tools">Tools</MenuItem>
                                        <MenuItem value="resources">Resources</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    label="Tags (comma-separated)"
                                    fullWidth
                                    value={linkForm.tags}
                                    onChange={(e) => setLinkForm({ ...linkForm, tags: e.target.value })}
                                    placeholder="react, tutorial, free"
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={linkForm.featured}
                                            onChange={(e) => setLinkForm({ ...linkForm, featured: e.target.checked })}
                                        />
                                    }
                                    label="Featured Link"
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    startIcon={<Add />}
                                    disabled={loading}
                                >
                                    Create Link
                                </Button>
                            </Stack>
                        </form>

                        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Existing Links</Typography>
                        {links.map((link) => (
                            <Box key={link._id} sx={{ p: 2, border: 1, borderColor: 'divider', mb: 1, borderRadius: 1 }}>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Box>
                                        <Typography variant="subtitle1">{link.title}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {link.url}
                                        </Typography>
                                        <Box sx={{ mt: 1 }}>
                                            <Chip label={link.category} size="small" sx={{ mr: 1 }} />
                                            {link.featured && <Chip label="Featured" size="small" color="primary" />}
                                        </Box>
                                    </Box>
                                    <Button
                                        size="small"
                                        color="error"
                                        onClick={() => handleDelete('links', link._id)}
                                        disabled={loading}
                                    >
                                        <Delete />
                                    </Button>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AdminPanel;
