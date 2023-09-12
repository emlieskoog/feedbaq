import { Grid } from '@mui/material'; 
import QuestionTemplate from './questiontemplate.tsx';
import '../styles/form.css';

export default function FormGrid() {
    
    return (
        <Grid container spacing={2} className="outerGrid">
            {/* First row */}
            <Grid item xs={4} className="topRow centerContent">
                <h1>Test</h1>
            </Grid>
            <Grid item xs={4} className="topRow centerContent">
                <h1>Test 2</h1>
            </Grid>
            <Grid item xs={4} className="topRow centerContent">
                <h1>Test 3</h1>
            </Grid>
            
            {/* Second row */}
            <Grid item xs={3} className="middleRow centerContent">
                <h1>Test 4</h1>
            </Grid>
            <Grid item xs={6} className="middleRow centerContent">
                <QuestionTemplate/>
            </Grid>
            <Grid item xs={3} className="middleRow centerContent">
                <h1>Test 6</h1>
            </Grid>
            
            {/* Third row */}
            <Grid item xs={4} className="bottomRow centerContent">
                <h1>Test 7</h1>
            </Grid>
            <Grid item xs={4} className="bottomRow centerContent">
                <h1>Test 8</h1>
            </Grid>
            <Grid item xs={4} className="bottomRow centerContent">
                <h1>Test 9</h1>
            </Grid>
        </Grid>
    );
}