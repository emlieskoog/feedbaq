import {Button, Grid, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material'; 

export default function LandingPage() {
    return(
        <Grid container spacing={2}>
            {/* First row */}
            <Grid item xs={6}>
                <h3> namn </h3>
            </Grid>
            <Grid item >
                <Button variant="contained"> Skapa ny form </Button>
            </Grid>
            <Grid item >
                <Button variant="contained"> Skapa ny form </Button>
            </Grid>
            <Grid item >
                <Button variant="contained"> Skapa ny form </Button>
            </Grid>
            {/* Second row */}
            <Grid item>
                <Accordion> 
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}> konslut </AccordionSummary>
                    <AccordionDetails> info </AccordionDetails>
                </Accordion>
            </Grid>
            
        </Grid>
    );
}