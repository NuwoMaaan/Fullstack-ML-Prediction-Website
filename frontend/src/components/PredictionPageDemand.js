// PredictionPageDemand.js
import React, { useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Container, Typography, Paper, Box, ThemeProvider, createTheme } from '@mui/material';
import DemandForm from './DemandForm';  // Update the form component for electricity demand
import DemandResult from './DemandResult';  // Update the result component for electricity demand

// Registering Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const theme = createTheme({
    palette: {
        primary: { main: '#1976d2' },
        secondary: { main: '#dc004e' },
    },
});

const PredictionPageDemand = () => {
    const [min_temp, setminTemp] = useState('')
    const [max_temp, setmaxTemp] = useState('')
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [predictedDemand, setPredictedDemand] = useState(null); // Changed to hold demand
    const [error, setError] = useState('');
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setPredictedDemand(null);
        setLoading(true);
        
        try {
            const response = await axios.get(`http://localhost:8000/predict/${min_temp}/${max_temp}/${year}/${month}/${day}`); // Endpoint updated
            const { demand } = response.data; // Assuming the response contains demand data
            setPredictedDemand(demand);

            const daysInMonth = new Date(year, month, 0).getDate();
            const days = [...Array(daysInMonth).keys()].map(i => i + 1);

            const predictions = await Promise.all(
                days.map(day =>
                    axios.get(`http://localhost:8000/predict/${min_temp}/${max_temp}/${year}/${month}/${day}`) // Endpoint updated
                        .then(res => res.data.demand) // Assuming the response contains demand data
                )
            );

            const newChartData = {
                labels: days,
                datasets: [
                    {
                        label: 'Electricity Demand',
                        data: predictions,
                        borderColor: 'rgb(75, 192, 192)',
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                        tension: 0.1
                    },
                    {
                        label: 'Prediction',
                        data: [{ x: parseInt(day), y: demand }],
                        borderColor: 'rgb(0, 255, 0)',
                        backgroundColor: 'rgba(0, 255, 255, 0.5)',
                        pointRadius: 8,
                        pointHoverRadius: 12,
                        showLine: false
                    }
                ]
            };

            setChartData(newChartData);
        } catch (err) {
            setError('Error predicting electricity demand. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="md">
                <Box sx={{ my: 4 }}>
                    <Typography variant="h3" component="h1" gutterBottom>
                        Electricity Demand Predictor
                    </Typography>
                    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
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
