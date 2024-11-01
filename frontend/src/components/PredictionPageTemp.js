// PredictionPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ScatterController, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Container, Typography, Paper, Box, ThemeProvider, createTheme } from '@mui/material';
import TemperatureForm from './TemperatureForm';
import TemperatureResult from './TemperatureResult';

ChartJS.register(CategoryScale, LinearScale, BarElement, ScatterController, PointElement, LineElement, Title, Tooltip, Legend);

const theme = createTheme({
    palette: {
        primary: { main: '#1976d2' },
        secondary: { main: '#dc004e' },
    },
});

const PredictionPageTemp = () => {
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [predictedTemp, setPredictedTemp] = useState({ min: null, max: null });
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
            return; // Validate inputs before proceeding

        setPredictedTemp({ min: null, max: null });
        setLoading(true);
        
        try {
    
            const response = await axios.get(`http://localhost:8000/predict/temp/${year}/${month}/${day}`);
            const { min_temp, max_temp } = response.data;
            setPredictedTemp({ min: min_temp, max: max_temp });

            const noOfDaysToPredict = 14;
            const startDate = new Date(year, month - 1, day);
            const days = [...Array(noOfDaysToPredict).keys()].map(i => {
                const nextDate = new Date(startDate);
                nextDate.setDate(startDate.getDate() + i);
                return nextDate.getDate();
            });

        
            const demandPredictions = await Promise.all(
                days.map(day =>
                    axios.get(`http://localhost:8000/predict/demand/${min_temp}/${max_temp}/${year}/${month}/${day}`)
                        .then(res => res.data.demand)
                )
            );
    
            const predictions = await Promise.all(
                days.map(day =>
                    axios.get(`http://localhost:8000/predict/temp/${year}/${month}/${day}`)
                        .then(res => ({ min: res.data.min_temp, max: res.data.max_temp }))
                )
            );
            
            const newCharData = {
                labels: days,
                datasets: [
                    {
                        type: 'bar',
                        label: 'Min Temperatures',
                        data: predictions.map(p => p.min),
                        borderColor: 'rgb(75, 192, 192)',
                        backgroundColor: 'rgba(54, 162, 235, 0.7)',
                        tension: 0.1,
                        order: 2
                    },
                    {
                        type: 'bar',
                        label: 'Max Temperatures',
                        data: predictions.map(p => p.max),
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 159, 64, 0.7)',
                        tension: 0.1,
                        order: 2
                    },
                    {
                        type: 'bar',
                        label: 'Prediction Min',
                        data: [{ x: parseInt(day), y: min_temp }],
                        borderColor: 'rgb(0, 255, 0)',
                        backgroundColor: 'rgba(75, 192, 192, 0.7)',
                        pointRadius: 8,
                        pointHoverRadius: 12,
                        showLine: false,
                        order: 1
                    },
                    {
                        type: 'bar',
                        label: 'Prediction Max',
                        data: [{ x: parseInt(day), y: max_temp }],
                        borderColor: 'rgb(255, 255, 0)',
                        backgroundColor: 'rgba(255, 99, 132, 0.7)',
                        pointRadius: 8,
                        pointHoverRadius: 12,
                        showLine: false,
                        order: 1
                    }
                ]
            };
            setChartData(newCharData);
            const demandChartData = {
                labels: days,
                datasets: [
                    {
                        label: 'Electricity Demand',
                        data: demandPredictions, 
                        borderColor: 'rgb(100, 100, 250)',
                        backgroundColor: 'rgba(100, 100, 250, 0.5)',
                        tension: 0.1
                    },
                ]
            };

            setChartData(prevData => ({
                ...prevData,
                demandData: demandChartData
            }));
            
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

export default PredictionPageTemp;
