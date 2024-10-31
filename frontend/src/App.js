import React, { useState } from 'react';
import axios from 'axios';
import PredictionPageTemp from './components/PredictionPageTemp';
import PredictionPageDemand from './components/PredictionPageDemand';
import PredictionPageCases from './components/PredictionPageFlu';
import PredictionCards from './components/Cards';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, Container, Drawer, List, ListItem, ListItemIcon,
  ListItemText, IconButton, TextField, Switch, Snackbar, Alert, Fab, Dialog,
  DialogTitle, DialogContent, DialogContentText, DialogActions, CircularProgress,
  Chip, Avatar, Divider, Box, Button
} from '@mui/material';
import {
  Menu as MenuIcon, Home as HomeIcon, Info as InfoIcon, Mail as MailIcon,
  Add as AddIcon,
} from '@mui/icons-material';

function About() {
  return (
    <Container>
      <Typography variant="h2" component="h1" gutterBottom>
        About Us
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        This is the About page. Here, you can add more information about the project or your team.
      </Typography>
    </Container>
  );
}

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleDarkModeToggle = () => {
    setDarkMode((prevMode) => {
      return !prevMode; 
    });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
    setName('');
    setEmail('');
    setErrorMessage('');
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSubmit = async () => {
    if (!name || !email) {
      setErrorMessage('Both fields are required.');
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
  
    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:8000/contact_us_emails/${name}/${email}`);
      console.log(response.data); 
      setSnackbarOpen(true); 
      handleDialogClose();
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to send your message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const drawerContent = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/about">
          <ListItemIcon><InfoIcon /></ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><MailIcon /></ListItemIcon>
          <ListItemText primary="Contact" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <ListItemText primary="Dark Mode" />
          <Switch checked={darkMode} onChange={handleDarkModeToggle} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh',
      bgcolor: darkMode ? 'grey.900' : 'background.default', color: darkMode ?
      'common.white' : 'common.black' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Enhanced MUI React Page
          </Typography>
          <Button color="inherit" component={Link} to="/about">About</Button>
          <Button color="inherit" onClick={handleDialogOpen}>Contact</Button>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
      <Routes>
        <Route path="/" element={
          <Container component="main" sx={{ mt: 8, mb: 2, flex: 1 }}>
            <Typography variant="h2" component="h1" gutterBottom>
              COS30049 - ReactJS website with Machine learning models!
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
              This page showcases various Material-UI components.
            </Typography>
            <PredictionCards />
            <Box sx={{ mt: 4 }}>
              <TextField fullWidth label="Subscribe to our newsletter" variant="outlined" />
              <Button variant="contained" sx={{ mt: 2 }}>Subscribe</Button>
            </Box>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Chip label="Leo Holden – 103996982 " color="primary" />
              <Chip label="Jackson Webb – 103572997 " color="secondary" />
              <Chip label="Declan Hargreaves - 104300584 " color="success" />
              <Chip avatar={<Avatar>JS</Avatar>} label="Assignment 3 - Full-Stack Web Development for AI Application" variant="outlined" />
            </Box>
          </Container>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/predictTemp" element={<PredictionPageTemp />} />
        <Route path="/predictDemand" element={<PredictionPageDemand />} />
        <Route path="/predictInfluenza" element={<PredictionPageCases />} />
      </Routes>
      <Box component="footer" sx={{ bgcolor: darkMode ? 'grey.800' : 'background.paper', py: 6, mt: 'auto' }}>
        <Container maxWidth="lg">
          <Typography variant="body1">
            Enhanced MUI React Page Footer
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {'Copyright © '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Container>
      </Box>
      <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 16, right: 16 }}>
        <AddIcon />
      </Fab>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Your message has been sent!
        </Alert>
      </Snackbar>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Contact Us</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill out this form to get in touch with us.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Your Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!errorMessage}
            helperText={errorMessage}
          />
          <TextField
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errorMessage}
            helperText={errorMessage}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default App;
