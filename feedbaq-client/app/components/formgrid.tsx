'use client';
import { useState } from 'react';
import { Grid, Stepper, Step, StepLabel, Button, TextField } from '@mui/material'; 
import QuestionTemplate from './questiontemplate.tsx';
import '../styles/form.css';

import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import { styled } from '@mui/material/styles';
import Check from '@mui/icons-material/Check';


export default function FormGrid() {
    
    const QontoConnector = styled(StepConnector)(({ theme }) => ({
      [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
      },
      [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
          borderColor: '#784af4',
        },
      },
      [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
          borderColor: '#784af4',
        },
      },
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
      },
    }));
    
    const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
      ({ theme, ownerState }) => ({
        color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
        ...(ownerState.active && {
          color: '#784af4',
        }),
        '& .QontoStepIcon-completedIcon': {
          color: '#784af4',
          zIndex: 1,
          fontSize: 18,
        },
        '& .QontoStepIcon-circle': {
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: 'currentColor',
        },
      }),
    );
    
    function QontoStepIcon(props: StepIconProps) {
      const { active, completed, className } = props;
    
      return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
          {completed ? (
            <Check className="QontoStepIcon-completedIcon" />
          ) : (
            <div className="QontoStepIcon-circle" />
          )}
        </QontoStepIconRoot>
      );
    }
    
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
    
    const [inputValues, setInputValues] = useState(Array(questions.length).fill(''));
    
    
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
    
    const handleInputChange = (event: any) => {
        const newInputValues = [...inputValues];
        newInputValues[activeStep] = event.target.value;
        setInputValues(newInputValues);
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
            <Grid item xs={6} sx={{flexDirection: 'column'}} className="middleRow centerContent">
                <h1>{questions[activeStep].question}</h1>
                <TextField
                  value={inputValues[activeStep]}
                  onChange={handleInputChange}
                  placeholder="Skriv ditt svar här ..."
                  multiline
                  fullWidth
                  rows={4}
                  variant="outlined"
                />
            </Grid>
            <Grid item xs={3} className="middleRow centerContent">
                <h3>{questions[activeStep].description}</h3>
            </Grid>
            
            {/* Third row */}
            <Grid item xs={4} className="bottomRow centerContent">
                <Button variant="contained" onClick={handleBack}>Back</Button>
            </Grid>
            <Grid item xs={4} className="bottomRow centerContent">
                <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector/>}>
                    {questions.map((label, index) => {
                        return (
                            <Step key={index}>
                                <StepLabel StepIconComponent={QontoStepIcon}/>
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