'use client';
import { useState, useEffect } from 'react';
import { Grid, Button, TextField, LinearProgress, LinearProgressProps, Box, Rating } from '@mui/material'; 
import '../styles/form.css';


export default function FormGrid() {

  const questions = [
    {
      question: 'Uppstart',
      description: 'Förståelse, startsträcka, rätt förutsättningar för att klara uppdraget, dator och miljöer...',
      inputType: 'text'
    },
    {
      question: 'Resultat',
      description: 'Kompetens, levererar, kvalitet, tid...',
      inputType: 'text'
    },
    {
      question: 'Ansvar',
      description: 'Samarbete, hjälper & frågar, står för åtaganden, flaggar...',
      inputType: 'text'
    },
    {
      question: 'Enkelhet',
      description: 'Göra det svåra enkelt, enkel kommunikation...',
      inputType: 'text'
    },
    {
      question: 'Glädje',
      description: 'Tillför energi, kul att jobba med...',
      inputType: 'text'
    },
    {
      question: 'Innovation',
      description: 'Kreativ, kommer med förslag och idéer, kliver fram...',
      inputType: 'text'
    },
    {
      question: 'Nöjdhet (konsult)',
      description: 'Hur nöjd är kunden med konsulten på en skala 1-10?',
      inputType: 'rating'
    },
    {
      question: 'Nöjdhet (HiQ)',
      description: 'Hur nöjd är kunden med HiQ på en skala 1-10?',
      inputType: 'rating'
    },
    {
      question: 'Förbättringar',
      description: 'Vad kan förbättras?',
      inputType: 'text'
    },
    {
      question: 'Värdeomdömen (positivt)',
      description: 'Positiv feedback och beröm från kunder eller användare...',
      inputType: 'text'
    },
    {
      question: 'Värdeomdömen (negativt)',
      description: 'Negativ feedback och kritik från kunder eller användare...',
      inputType: 'text'
    },
    {
      question: 'Övrigt',
      description: 'Allmänt utrymme för ytterligare kommentarer eller ämnen som inte täcks av andra frågor...',
      inputType: 'text'
    },
    {
      question: 'Nästa uppföljning',
      description: 'Planerad tidpunkt eller åtgärder för den nästa uppföljningen...',
      inputType: 'text'
    }
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [inputValues, setInputValues] = useState(Array(questions.length).fill(''));

  function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          {`${Math.round(props.value)}%`}
        </Box>
      </Box>
    );
  }
  
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

  const sendForm = () => {
    inputValues.forEach((value, index) => {
      console.log(`Answer for subject ${questions[index].question.toUpperCase()}: ${value}, with type "${typeof(value)}"`);
    });
  }
  
  
  return (
      <Grid container spacing={2} className="outerGrid">
          {/* First row */}
          <Grid item xs={12} className="topRow centerContent">
              <h1>Kvalitetsuppföljning</h1>
          </Grid>
          
          {/* Second row */}
          <Grid item xs={3} sx={{flexDirection: 'column'}} className="middleRow">
              <h3>Kapitel</h3>
              {questions.map((q, index) => {
                  return (
                      <div key={index} className='formChapterList' onClick={() => setActiveStep(index)}>
                        {index === activeStep ? (
                          <p className='selectedChapter'>{q.question}</p>
                        ) : (
                          <p>{q.question}</p>
                        )}
                      </div>
                  );
              })}
          </Grid>
          <Grid item xs={6} sx={{flexDirection: 'column', overflowY: 'auto'}} className="middleRow">
            {
              activeStep < questions.length ?
              <>
                <h2 className='questionTitle'>{questions[activeStep].question}</h2>
                <p className='questionDescription'>{questions[activeStep].description}</p>
                <Box className='centerContent'>
                  {questions[activeStep].inputType === 'text' && 
                    <TextField
                      value={inputValues[activeStep]}
                      onChange={handleInputChange}
                      placeholder="Skriv ditt svar här ..."
                      multiline
                      fullWidth
                      rows={4}
                      variant="outlined"
                    />
                  }
                  {questions[activeStep].inputType === 'rating' && <Rating value={inputValues[activeStep]} onChange={handleInputChange} max={10} size='large'/>}
                </Box>
              </>
              :
              <>
                <h2>Sammanfattning</h2>
                {
                  questions.map((q, index) => {
                    return (
                      <>
                        <h4>{q.question}</h4>
                        <Box sx={{marginBottom: '10px'}}>
                          { inputValues[index] ? <p>{inputValues[index]}</p> : <p>Inget svar...</p> }
                        </Box>
                      </>
                    );
                  })
                }
              </>
            }
            
          </Grid>
          <Grid item xs={3} className="middleRow centerContent">
            
          </Grid>
          
          {/* Third row */}
          <Grid item xs={4} className="bottomRow centerContent">
            { activeStep != 0 && <Button variant="contained" onClick={handleBack}>Tillbaka</Button> }
          </Grid>
          <Grid item xs={4} className="bottomRow centerContent">
            <Box sx={{width: '100%'}}>
              <LinearProgressWithLabel value={(activeStep / questions.length) * 100} />
            </Box>
          </Grid>
          <Grid item xs={4} className="bottomRow centerContent">
            { activeStep < questions.length-1 && <Button variant="contained" onClick={handleNext}>Nästa</Button> }
            { activeStep == questions.length-1 && <Button variant='contained' onClick={handleNext}>Klar</Button> }
            { activeStep == questions.length && <Button variant='contained' onClick={sendForm}>Skicka</Button> }
          </Grid>
      </Grid>
  );
}