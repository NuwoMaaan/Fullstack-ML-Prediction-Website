import React, { useState } from "react";
import axios from "axios";
import PredictionPageTemp from "./components/PredictionPageTemp";
import PredictionPageDemand from "./components/PredictionPageDemand";
import PredictionPageCases from "./components/PredictionPageFlu";
import PredictionCards from "./components/Cards";
import AboutCards from "./components/AboutCards";
import ThermostatIcon from "@mui/icons-material/Thermostat"; // Temperature Icon
import FlashOnIcon from "@mui/icons-material/FlashOn"; // Electricity icon
import LocalHospitalIcon from "@mui/icons-material/LocalHospital"; // Influenza icon
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Mail,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Snackbar,
  Alert,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  LinearProgress,
  Chip,
  TextField,
  Avatar,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  Mail as MailIcon,
  Add as AddIcon,
} from "@mui/icons-material";

function About() {
  return (
    <Container component="main" sx={{ mt: 8, mb: 2, flex: 1 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          Height: "100vh",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "2rem", sm: "2rem", md: "3rem" },
            whiteSpace: "normal",
            wordWrap: "break-word",
          }}
        >
          ABOUT GROUP 33 - BACK AGAIN
        </Typography>
      </Box>

      <Routes>
        {/* CARDS*/}
        <Route path="/" element={<AboutCards />} />
      </Routes>
    </Container>
  );
}

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
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
    <Box
      sx={{ width: 300 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            primary="Home"
            sx={{
              color: "#293241",
              "&:hover": { color: "#3d5a80" },
            }}
          />
        </ListItem>
        <ListItem button component={Link} to="/temperatureprediction">
          <ListItemIcon>
            <ThermostatIcon />
          </ListItemIcon>
          <ListItemText
            primary="Temperature Prediction"
            sx={{
              color: "#293241",
              "&:hover": { color: "#3d5a80" },
            }}
          />
        </ListItem>
        <ListItem button component={Link} to="/electricityprediction">
          <ListItemIcon>
            <FlashOnIcon />
          </ListItemIcon>
          <ListItemText
            primary="Electricity Prediction"
            sx={{
              color: "#293241",
              "&:hover": { color: "#3d5a80" },
            }}
          />
        </ListItem>
        <ListItem button component={Link} to="/influenzaprediction">
          <ListItemIcon>
            <LocalHospitalIcon />
          </ListItemIcon>
          <ListItemText
            primary="Influenza Prediction"
            sx={{
              color: "#293241",
              "&:hover": { color: "#3d5a80" },
            }}
          />
        </ListItem>
        <ListItem button component={Link} to="/about">
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText
            primary="About Us"
            sx={{
              color: "#293241",
              "&:hover": { color: "#3d5a80" },
            }}
          />
        </ListItem>
        <ListItem button onClick={handleDialogOpen}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Contact"
            sx={{
              color: "#293241",
              "&:hover": { color: "#3d5a80" },
            }} 
          />
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <AppBar position="static" sx={{ bgcolor: "#293241" }}>
        <Toolbar sx={{ py: 1 }}>
          {/* Title on the left */}
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            weatherml
          </Typography>

          {/* Navigation buttons - visible on medium screens and up */}
          <Box sx={{ display: { xs: "none", lg: "flex" }, gap: 2 }}>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/temperatureprediction"
            >
              Weather Prediction
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/electricityprediction"
            >
              Electricity Prediction
            </Button>
            <Button color="inherit" component={Link} to="/influenzaprediction">
              Influenza Prediction
            </Button>
            <Button color="inherit" component={Link} to="/about">
              About Us
            </Button>
            <Button color="inherit" onClick={handleDialogOpen}>Contact</Button>

          </Box>

          {/* Menu button only visible upon page resizing */}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: "flex", lg: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
      <Routes>
        <Route
          path="/"
          element={
            <Container component="main" sx={{ mt: 8, mb: 2, flex: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  Height: "100vh",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h2"
                  component="h1"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                  }}
                >
                  THE MOST ACCURATE WEATHER PREDICTION AI
                </Typography>
              </Box>

              <Routes>
                {/* CARDS*/}
                <Route path="/" element={<PredictionCards />} />
                <Route
                  path="/temperatureprediction"
                  element={<div>Temperature Prediction Page</div>}
                />
                <Route
                  path="/electricityprediction"
                  element={<div>Electricity Prediction Page</div>}
                />
                <Route
                  path="/influenzaprediction"
                  element={<div>Influenza Prediction Page</div>}
                />
              </Routes>
            </Container>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/temperatureprediction" element={<PredictionPageTemp />} />
        <Route
          path="/electricityprediction"
          element={<PredictionPageDemand />}
        />
        <Route path="/influenzaprediction" element={<PredictionPageCases />} />
      </Routes>

      <Box
        component="footer"
        sx={{
          bgcolor: "background.paper",
          py: 6,
          mt: "auto",
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body1">weatherml</Typography>
          <Typography variant="body2">
            {"Copyright © "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Container>
      </Box>
  
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
