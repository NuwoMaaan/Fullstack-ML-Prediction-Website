// PredictionPageDemand.js
import React, { useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  Container,
  Typography,
  Paper,
  Box,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import DemandForm from "./DemandForm"; // Update the form component for electricity demand
import DemandResult from "./DemandResult"; // Update the result component for electricity demand

// Registering Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#dc004e" },
  },
});

const PredictionPageDemand = () => {
  const [min_temp, setminTemp] = useState('')
  const [max_temp, setmaxTemp] = useState('')
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [predictedDemand, setPredictedDemand] = useState(null); 
  const [error, setError] = useState('');
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
      const yearNum = parseInt(year);
      const monthNum = parseInt(month);
      const dayNum = parseInt(day);

      if (!year || !month || !day) {
          setError('All inputs must be provided.');
          return false;
      }
      if (yearNum < 1900 || yearNum > 2099) {
          setError('Year must be between 1900 and 2099.');
          return false;
      }
      if (monthNum < 1 || monthNum > 12) {
          setError('Month must be between 1 and 12.');
          return false;
      }
      if (dayNum < 1 || dayNum > 31) {
          setError('Day must be between 1 and 31.');
          return false;
      }

      // Check for valid days in each month
      const daysInMonth = new Date(yearNum, monthNum, 0).getDate();
      if (dayNum > daysInMonth) {
          setError(`Month ${monthNum} does not have ${dayNum} days.`);
          return false;
      }

      setError('');
      return true;
  };



  const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validateInputs()) 
          return;
      setPredictedDemand(null);
      setLoading(true);
      
      try {
          const response = await axios.get(`http://localhost:8000/predict/demand/${min_temp}/${max_temp}/${year}/${month}/${day}`); 
          const { demand } = response.data; 
          setPredictedDemand(demand);

          const noOfDaysToPredict = 14;
          const startDate = new Date(year, month - 1, day);
          const days = [...Array(noOfDaysToPredict).keys()].map(i => {
              const nextDate = new Date(startDate);
              nextDate.setDate(startDate.getDate() + i);
              return nextDate.getDate();
          });


          const predictions = await Promise.all(
              days.map(day =>
                  axios.get(`http://localhost:8000/predict/demand/${min_temp}/${max_temp}/${year}/${month}/${day}`) 
                      .then(res => res.data.demand) 
              )
          );

      const newChartData = {
                labels: days,
                datasets: [
                    {
                        label: 'Electricity Demand',
                        data: predictions,
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.3)',
                        borderWidth: 3, 
                        pointRadius: 5,
                        pointHoverRadius: 8,
                        tension: 0.3,
                    },
                    {
                        label: 'Prediction',
                        data: [{ x: parseInt(day), y: demand }],
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        pointRadius: 8,
                        pointHoverRadius: 12,
                        showLine: false,
                        borderWidth: 2,
                    }
                ]
            };

      setChartData(newChartData);
    } catch (err) {
      if (err.response) {
        setError(`Error: ${err.response.data.detail}`);
        console.error(err.response.data.detail);
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Box
          sx={{
            my: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
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
              textAlign: "center",
            }}
          >
            ELECTRICITY CONSUMPTION PREDICTOR
          </Typography>
          <Paper elevation={3} sx={{ p: 3, mb: 3, width: "100%" }}>
            <DemandForm
              min_temp={min_temp}
              setminTemp={setminTemp}
              max_temp={max_temp}
              setmaxTemp={setmaxTemp}
              year={year}
              setYear={setYear}
              month={month}
              setMonth={setMonth}
              day={day}
              setDay={setDay}
              loading={loading}
              onSubmit={handleSubmit}
            />
          </Paper>
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          {predictedDemand !== null && (
            <DemandResult
              predictedDemand={predictedDemand}
              chartData={chartData}
            />
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default PredictionPageDemand;
