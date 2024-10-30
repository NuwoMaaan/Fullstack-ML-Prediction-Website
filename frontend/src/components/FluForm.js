// DemandForm.js
import React from 'react';
import { TextField, Button, Grid, CircularProgress } from '@mui/material';

const CasesForm = ({ season, setSeason, year, setYear, month, setMonth, loading, onSubmit }) => {
    return (
        <form onSubmit={onSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={2}>
                    <TextField
                        fullWidth
                        type="text"
                        label="Season"
                        variant="outlined"
                        value={season}
                        onChange={(e) => setSeason(e.target.value)}
                        required
                    />
                </Grid>
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
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Predict Demand'}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default CasesForm;
