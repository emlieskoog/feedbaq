'use client';
import { useState } from 'react';
import { Grid, Stepper, Step, StepLabel, Button } from '@mui/material'; 
import QuestionTemplate from './questiontemplate.tsx';
import '../styles/form.css';

export default function FormGrid() {
    
    const [activeStep, setActiveStep] = useState(0);

    const questions = [
        {
            question: 'Fråga 1',
            description: 'Beskrivning 1',
            inputType: '...'
        },
        {
            question: 'Fråga 2',
            description: 'Beskrivning 2',
            inputType: '...'
        },
        {
            question: 'Fråga 3',
            description: 'Beskrivning 3',
            inputType: '...'
        },
        {
            question: 'Fråga 4',
            description: 'Beskrivning 4',
            inputType: '...'
        },
        {
            question: 'Fråga 5',
            description: 'Beskrivning 5',
            inputType: '...'
        }
    ];
    
    
    
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
    
    
    return (
        <Grid container spacing={2} className="outerGrid">
            {/* First row */}
            <Grid item xs={12} className="topRow centerContent">
                <h1>Kvalitetsuppföljning</h1>
            </Grid>
            
            {/* Second row */}
            <Grid item xs={3} sx={{flexDirection: 'column'}} className="middleRow centerContent">
                {questions.map((q, index) => {
                    return (
                        <div key={index}>
                          {index === activeStep ? (
                            <h5>{q.question}</h5>
                          ) : (
                            <h6>{q.question}</h6>
                          )}
                        </div>
                    );
                })}
            </Grid>
            <Grid item xs={6} className="middleRow centerContent">
                <h1>{questions[activeStep].question}</h1>
            </Grid>
            <Grid item xs={3} className="middleRow centerContent">
                <h3>{questions[activeStep].description}</h3>
            </Grid>
            
            {/* Third row */}
            <Grid item xs={4} className="bottomRow centerContent">
                <Button variant="contained" onClick={handleBack}>Back</Button>
            </Grid>
            <Grid item xs={4} className="bottomRow centerContent">
                <Stepper activeStep={activeStep}>
                    {questions.map((label, index) => {
                        return (
                            <Step key={index}>
                                <StepLabel>{index + 1}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            </Grid>
            <Grid item xs={4} className="bottomRow centerContent">
                <Button variant="contained" onClick={handleNext}>Next</Button>
            </Grid>
        </Grid>
    );
}