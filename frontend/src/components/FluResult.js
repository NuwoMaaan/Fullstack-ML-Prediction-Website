// CasesResult.js
import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import { Pie } from 'react-chartjs-2';

const CasesResult = ({ predictedCases, chartData }) => {
    return (
        <Paper elevation={3} sx={{ p: 3 }}>  
            <Typography variant="h5" gutterBottom>
                Predicted Flu Cases for each month    
            </Typography>
            {chartData && (
                <Box sx={{ mt: 3 }}>
                    <Pie
                        data={chartData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top',
                                    labels: {
                                        boxWidth: 20,
                                        padding: 15,
                                    }
                                },
                                title: {
                                    display: true,
                                    text: 'Flu Cases Predictions'
                                },
                                tooltip: {
                                    callbacks: {
                                        label: function(tooltipItem) {
                                            return `${tooltipItem.label}: ${tooltipItem.raw}`;
                                        }
                                    }
                                }
                            },
                            hover: {
                                onHover: (event, chartElement) => {
                                    const canvas = event.native.target;
                                    canvas.style.cursor = chartElement.length ? 'pointer' : 'default';
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
