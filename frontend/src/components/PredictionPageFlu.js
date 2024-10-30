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

const getSeason = (month) => {
    if (month === 12 || month <= 2) {
        return 'summer';
    } else if (month >= 3 && month <= 5) {
        return 'autumn';
    } else if (month >= 6 && month <= 8) {
        return 'winter';
    } else {
        return 'spring';
    }
};

const PredictionPageCases = () => {
    //const [season, setSeason] = useState('');
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
            const noOfMonthsToPredict = 5;
            const startDate = new Date(year, month, 0);
            const months = [...Array(noOfMonthsToPredict).keys()].map(i => {
                const nextDate = new Date(startDate);
                nextDate.setMonth(startDate.getMonth() + i);
                return nextDate.getMonth();
            });

            const predictions = await Promise.all(
                months.map(month => {
                    const season = getSeason(month);
                    return axios.get(`http://localhost:8000/predict/cases/${season}/${year}/${month}`)
                    .then(res => {
                        console.log(`Data for ${month}: `, res.data);
                        return res.data.cases;
                    });
                })
            );
            
            console.log(predictions);
            const monthNames = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];

            const predictedMonthNames = months.map(index => monthNames[index]);
    
            const newChartData = {
                labels: predictedMonthNames, 
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
            if (err.response)
                {
                    setError(`Error: ${err.response.data.detail}`)
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
                        Flu Cases Predictor
                    </Typography>
                    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                        <CasesForm 
                            //season={season}
                            //setSeason={setSeason}
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
