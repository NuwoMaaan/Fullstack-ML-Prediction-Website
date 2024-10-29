// DemandResult.js
import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import { Line } from 'react-chartjs-2';

const DemandResult = ({ predictedDemand, chartData }) => {
    return (
        <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Predicted Electricity Demand: {predictedDemand.toFixed(1)} kWh
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
                                    text: 'Electricity Demand Predictions'
                                }
                            },
                            scales: {
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Day of Month'
                                    }
                                },
                                y: {
                                    title: {
                                        display: true,
                                        text: 'Predicted Demand (kWh)'
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

export default DemandResult;
