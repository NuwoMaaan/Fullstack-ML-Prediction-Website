import React, { useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Container, Typography, Paper, Box, ThemeProvider, createTheme } from '@mui/material';
import CasesForm from './FluForm';  // Form component for flu cases
import CasesResult from './FluResult';  // Result component for flu cases

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const theme = createTheme({
    palette: {
        primary: { main: '#1976d2' },
        secondary: { main: '#dc004e' },
    },
});

const PredictionPageCases = () => {
    const [season, setSeason] = useState('');
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [predictedCases, setPredictedCases] = useState(null);
    const [error, setError] = useState('');
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setPredictedCases(null);
        setLoading(true);
        
        try {
            // Get the total cases predicted for each month
            const monthsInYear = [...Array(12).keys()].map(i => i + 1);
            const predictions = await Promise.all(
                monthsInYear.map(month =>
                    axios.get(`http://localhost:8000/predict/cases/${season}/${year}/${month}`)
                        .then(res => res.data.cases) // Assuming the response contains monthly total case data
                        .catch(err => {
                            console.error(`Error fetching cases for month ${month}:`, err);
                            return 0; 
                        })
                )
            );
    
            const monthNames = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];
    
            const newChartData = {
                labels: monthNames, 
                datasets: [
                    {
                        label: 'Predicted Flu Cases',
                        data: predictions,
                        borderColor: 'rgb(75, 192, 192)',
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                        tension: 0.1
                    }
                ]
            };
    
            setPredictedCases(predictions); 
            setChartData(newChartData); 
        } catch (err) {
            setError('Error predicting Flu Cases. Please try again.');
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
                        Flu Cases Predictor
                    </Typography>
                    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                        <CasesForm 
                            season={season}
                            setSeason={setSeason}
                            year={year} 
                            setYear={setYear} 
                            month={month} 
                            setMonth={setMonth}
                            loading={loading} 
                            onSubmit={handleSubmit} 
                        />
                    </Paper>
                    {error && (
                        <Typography color="error" sx={{ mb: 2 }}>
                            {error}
                        </Typography>
                    )}
                    {predictedCases !== null && (
                        <CasesResult 
                            predictedCases={predictedCases} 
                            chartData={chartData} 
                        />
                    )}
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default PredictionPageCases;
