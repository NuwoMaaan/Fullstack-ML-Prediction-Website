// TemperatureResult.js
import React from "react";
import { Typography, Paper, Box } from "@mui/material";
import { Line } from "react-chartjs-2";

const TemperatureResult = ({ predictedTemp, chartData }) => {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Predicted Max Temperature: {predictedTemp.max.toFixed(1)} °C
      </Typography>
      <Typography variant="h5" gutterBottom>
        Predicted Min Temperature: {predictedTemp.min.toFixed(1)} °C
      </Typography>
      {chartData && (
        <Box sx={{ mt: 3 }}>
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Temperature Predictions",
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Day of Month",
                  },
                  stacked: true,
                },
                y: {
                  title: {
                    display: true,
                    text: "Predicted Temperature (°C)",
                  },
                },
              },
            }}
          />
          {chartData.demandData && (
            <Box sx={{ mt: 3 }}>
              <h2>
                Predicted Electricity Demand Based On Predicted Temperatures
              </h2>
              <Line
                data={chartData.demandData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                    title: {
                      display: true,
                      text: "Electricity Demand Predictions",
                    },
                  },
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: "Day of Month",
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: "Predicted Demand (kW)",
                      },
                    },
                  },
                }}
              />
            </Box>
          )}
        </Box>
      )}
    </Paper>
  );
};

export default TemperatureResult;
