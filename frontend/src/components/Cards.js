// PredictionCards.js
import React from 'react';
import { Grid, Card, CardContent, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import FlashOnIcon from '@mui/icons-material/FlashOn'; // Electricity icon
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'; // Influenza icon

const PredictionCards = () => {
    return (
        <Grid container spacing={4} sx={{ mt: 4 }}>
            {/* Temperature Prediction Card */}
            <Grid item xs={12} sm={6} md={4}>
                <Link to="/predictTemp" style={{ textDecoration: 'none' }}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography gutterBottom variant="h5" component="h2">
                                Temperature Prediction Model
                            </Typography>
                            <Typography>
                                Click to predict temperatures for a given date.
                            </Typography>
                            <ThermostatIcon sx={{ fontSize: 40, mt: 2 }} />
                        </CardContent>
                        <Box sx={{ p: 2 }}>
                            <Button size="small" variant="contained" component={Link} to="/predictTemp">
                                Learn More
                            </Button>
                        </Box>
                    </Card>
                </Link>
            </Grid>

            {/* Electricity Prediction Card */}
            <Grid item xs={12} sm={6} md={4}>
                <Link to="/predictDemand" style={{ textDecoration: 'none' }}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography gutterBottom variant="h5" component="h2">
                                Electricity Prediction Model
                            </Typography>
                            <Typography>
                                Click to predict electricity consumption for the upcoming month.
                            </Typography>
                            <FlashOnIcon sx={{ fontSize: 40, mt: 2 }} />
                        </CardContent>
                        <Box sx={{ p: 2 }}>
                            <Button size="small" variant="contained" component={Link} to="/predictDemand">
                                Learn More
                            </Button>
                        </Box>
                    </Card>
                </Link>
            </Grid>

            {/* Influenza Prediction Card */}
            <Grid item xs={12} sm={6} md={4}>
                <Link to="/predictInfluenza" style={{ textDecoration: 'none' }}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography gutterBottom variant="h5" component="h2">
                                Influenza Prediction Model
                            </Typography>
                            <Typography>
                                Click to predict influenza outbreaks for the season.
                            </Typography>
                            <LocalHospitalIcon sx={{ fontSize: 40, mt: 2 }} />
                        </CardContent>
                        <Box sx={{ p: 2 }}>
                            <Button size="small" variant="contained" component={Link} to="/predictInfluenza">
                                Learn More
                            </Button>
                        </Box>
                    </Card>
                </Link>
            </Grid>
        </Grid>
    );
};

export default PredictionCards;
