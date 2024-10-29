// CasesResult.js
import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import { Line } from 'react-chartjs-2';

const CasesResult = ({ predictedCases, chartData }) => {
    return (
        <Paper elevation={3} sx={{ p: 3 }}>  
            <Typography variant="h5" gutterBottom>
                Predicted Flu Cases for each month    
            </Typography>
            {chartData && (
                <Box sx={{ mt: 3 }}>
                    <Line
                        data={chartData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top',
                                },
                                title: {
                                    display: true,
                                    text: 'Flu Cases Predictions'
                                }
                            },
                            scales: {
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Month'
                                    }
                                },
                                y: {
                                    title: {
                                        display: true,
                                        text: 'Predicted Cases'
                                    }
                                }
                            }
                        }}
                    />
                </Box>
            )}
        </Paper>
    );
};

export default CasesResult;
