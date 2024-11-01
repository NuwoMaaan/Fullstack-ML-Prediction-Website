// PredictionCards.js
import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import FlashOnIcon from "@mui/icons-material/FlashOn"; // Electricity icon
import LocalHospitalIcon from "@mui/icons-material/LocalHospital"; // Influenza icon

const PredictionCards = () => {
  return (
    <Grid container spacing={4} sx={{ mt: 4 }}>
      {/* Temperature Prediction Card */}
      <Grid item xs={12} sm={6} md={4}>
        <Link to="/temperatureprediction" style={{ textDecoration: "none" }}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardContent
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography gutterBottom variant="h5" component="h2">
                Temperature Prediction Model
              </Typography>
              <Typography>
                Predict temperatures for a specified date.
              </Typography>
              <ThermostatIcon sx={{ fontSize: 40, mt: 2 }} />
            </CardContent>
            <Box
              sx={{
                p: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                size="small"
                variant="contained"
                component={Link}
                to="/temperatureprediction"
                sx={{
                  bgcolor: "#293241",
                  "&:hover": { bgcolor: "#98c1d9" },
                }}
              >
                Temperature Prediction
              </Button>
            </Box>
          </Card>
        </Link>
      </Grid>

      {/* Electricity Prediction Card */}
      <Grid item xs={12} sm={6} md={4}>
        <Link to="/electricityprediction" style={{ textDecoration: "none" }}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardContent
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography gutterBottom variant="h5" component="h2">
                Electricity Prediction Model
              </Typography>
              <Typography>Predict your electricity consumption.</Typography>
              <FlashOnIcon sx={{ fontSize: 40, mt: 2 }} />
            </CardContent>
            <Box
              sx={{
                p: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                size="small"
                variant="contained"
                component={Link}
                to="/electricityprediction"
                sx={{
                  bgcolor: "#293241",
                  "&:hover": { bgcolor: "#98c1d9" },
                }}
              >
                Electricity Consumption
              </Button>
            </Box>
          </Card>
        </Link>
      </Grid>

      {/* Influenza Prediction Card */}
      <Grid item xs={12} sm={6} md={4}>
        <Link to="/influenzaprediction" style={{ textDecoration: "none" }}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardContent
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography gutterBottom variant="h5" component="h2">
                Influenza Prediction Model
              </Typography>
              <Typography>
                Predict influenza cases for a select month.
              </Typography>
              <LocalHospitalIcon sx={{ fontSize: 40, mt: 2 }} />
            </CardContent>
            <Box
              sx={{
                p: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                size="small"
                variant="contained"
                component={Link}
                to="/influenzaprediction"
                sx={{
                  bgcolor: "#293241",
                  "&:hover": { bgcolor: "#98c1d9" },
                }}
              >
                Influenza Prediction
              </Button>
            </Box>
          </Card>
        </Link>
      </Grid>
    </Grid>
  );
};

export default PredictionCards;
