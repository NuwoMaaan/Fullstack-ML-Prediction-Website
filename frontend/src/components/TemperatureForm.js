// TemperatureForm.js
import React from "react";
import { TextField, Button, Grid, CircularProgress } from "@mui/material";

const TemperatureForm = ({
  year,
  setYear,
  month,
  setMonth,
  day,
  setDay,
  loading,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={2}>
          <TextField
            fullWidth
            type="number"
            label="Year"
            variant="outlined"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            fullWidth
            type="number"
            label="Month"
            variant="outlined"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            fullWidth
            type="number"
            label="Day"
            variant="outlined"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{
              bgcolor: "#293241",
              "&:hover": { bgcolor: "#98c1d9" },
            }}
          >
            {loading ? (
              <CircularProgress
                size={24}
                sx={{
                  color: "#293241",
                }}
              />
            ) : (
              "Predict"
            )}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default TemperatureForm;
