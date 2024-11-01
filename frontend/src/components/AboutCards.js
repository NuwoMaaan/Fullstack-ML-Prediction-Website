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
import ManIcon from "@mui/icons-material/Man";

const AboutCards = () => {
  return (
    <Grid container spacing={4} sx={{ mt: 4 }}>
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <CardContent
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography gutterBottom variant="h5" component="h2">
              Jackson Webb
            </Typography>
            <Typography>Student ID: 103572997</Typography>
            <ManIcon sx={{ fontSize: 40, mt: 2 }} />
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
              href="mailto:103572997@student.swin.edu.au?subject=Prediction Model Inquiry&body=Hello, I would like to inquire about your prediction models."
              sx={{
                bgcolor: "#293241",
                "&:hover": { bgcolor: "#98c1d9" },
              }}
            >
              Contact
            </Button>
          </Box>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <CardContent
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography gutterBottom variant="h5" component="h2">
              Leo Holden
            </Typography>
            <Typography>Student ID: 103996982</Typography>
            <ManIcon sx={{ fontSize: 40, mt: 2 }} />
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
              href="mailto:103996982@student.swin.edu.au?subject=Prediction Model Inquiry&body=Hello, I would like to inquire about your prediction models."
              sx={{
                bgcolor: "#293241",
                "&:hover": { bgcolor: "#98c1d9" },
              }}
            >
              Contact
            </Button>
          </Box>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <CardContent
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography gutterBottom variant="h5" component="h2">
              Declan Hargreaves
            </Typography>
            <Typography>Student ID: 104300584</Typography>
            <ManIcon sx={{ fontSize: 40, mt: 2 }} />
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
              href="mailto:104300584@student.swin.edu.au?subject=Prediction Model Inquiry&body=Hello, I would like to inquire about your prediction models."
              sx={{
                bgcolor: "#293241",
                "&:hover": { bgcolor: "#98c1d9" },
              }}
            >
              Contact
            </Button>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AboutCards;
