// PredictionPageElec.js
import React, { useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Container, Typography, Paper, Box, ThemeProvider, createTheme } from '@mui/material';
import TemperatureForm from './ElectricityForm';
import TemperatureResult from './ElectricityResult';

// Registering Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const theme = createTheme({
    palette: {
        primary: { main: '#1976d2' },
        secondary: { main: '#dc004e' },
    },
});

const PredictionPage = () => {
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [predictedTemp, setPredictedTemp] = useState({ min: null, max: null });
    const [error, setError] = useState('');
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setPredictedTemp({ min: null, max: null });
        setLoading(true);
        
        try {
            const response = await axios.get(`http://localhost:8000/predict/${year}/${month}/${day}`);
            const { min_temp, max_temp } = response.data;
            setPredictedTemp({ min: min_temp, max: max_temp });

            const daysInMonth = new Date(year, month, 0).getDate();
            const days = [...Array(daysInMonth).keys()].map(i => i + 1);

            const predictions = await Promise.all(
                days.map(day =>
                    axios.get(`http://localhost:8000/predict/${year}/${month}/${day}`)
                        .then(res => ({ min: res.data.min_temp, max: res.data.max_temp }))
                )
            );

            const newChartData = {
                labels: days,
                datasets: [
                    {
                        label: 'Min Temperatures',
                        data: predictions.map(p => p.min),
                        borderColor: 'rgb(75, 192, 192)',
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                        tension: 0.1
                    },
                    {
                        label: 'Max Temperatures',
                        data: predictions.map(p => p.max),
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        tension: 0.1
                    },
                    {
                        label: 'Prediction Min',
                        data: [{ x: parseInt(day), y: min_temp }],
                        borderColor: 'rgb(0, 255, 0)',
                        backgroundColor: 'rgba(0, 255, 255, 0.5)',
                        pointRadius: 8,
                        pointHoverRadius: 12,
                        showLine: false
                    },
                    {
                        label: 'Prediction Max',
                        data: [{ x: parseInt(day), y: max_temp }],
                        borderColor: 'rgb(255, 255, 0)',
                        backgroundColor: 'rgba(255, 255, 0, 0.5)',
                        pointRadius: 8,
                        pointHoverRadius: 12,
                        showLine: false
                    }
                ]
            };

            setChartData(newChartData);
        } catch (err) {
            setError('Error predicting temperature. Please try again.');
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
                        Weather Temperature Predictor
                    </Typography>
                    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                        <TemperatureForm 
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
                    {predictedTemp.min !== null && predictedTemp.max !== null && (
                        <TemperatureResult 
                            predictedTemp={predictedTemp} 
                            chartData={chartData} 
                        />
                    )}
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default PredictionPage;
