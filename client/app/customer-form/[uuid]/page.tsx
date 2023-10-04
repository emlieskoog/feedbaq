"use client";

import { useEffect, useState } from "react";
import {
  Grid,
  Button,
  TextField,
  LinearProgress,
  LinearProgressProps,
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Toolbar,
  AppBar,
} from "@mui/material";
import "../../styles/form.css";
import { API_BASE_URL } from "../../constants";
import { useParams } from "next/navigation";
import SuccessDialog from "./successdialog";

export default function CustomerFormGrid() {
  const questions = [
    {
      id: "1",
      question: "Uppstart",
      description: "Jag anser att konsulten haft bra förståelse för uppdraget",
      inputType: "rating",
    },
    {
      id: "2",
      question: "Resultat",
      description:
        "Jag anser att konsulten haft god kompetens och levererat goda resultat",
      inputType: "rating",
    },
    {
      id: "3",
      question: "Ansvar",
      description:
        "Jag anser att konsulten varit kommunikativ och samarbetsvillig",
      inputType: "rating",
    },
    {
      id: "4",
      question: "Enkelhet",
      description: "Jag anser att konsulten har kunnat göra det svåra enklare",
      inputType: "rating",
    },
    {
      id: "5",
      question: "Nöjdhet (Konsult)",
      description: "Jag är mycket nöjd med konsulten",
      inputType: "rating",
    },
    {
      id: "6",
      question: "Nöjdhet (HiQ)",
      description: "Jag är mycket nöjd med HiQ",
      inputType: "rating",
    },
    {
      id: "7",
      question: "Förbättringar (Konsult)",
      description: "Vad är några saker som konsulten kan förbättra?",
      inputType: "text",
    },
    {
      id: "8",
      question: "Förbättringar (HiQ)",
      description: "Vad är några saker som HiQ kan förbättra?",
      inputType: "text",
    },
    {
      id: "9",
      question: "Övrigt",
      description: "Är det något övrigt som du vill anmärka?",
      inputType: "text",
    },
  ];

  const params = useParams();

  const [activeStep, setActiveStep] = useState(0);
  const [inputValues, setInputValues] = useState(
    Array(questions.length).fill("")
  );

  const [buttonValues, setButtonValues] = useState(
    Array(questions.length).fill("")
  );

  const [consultantName, setConsulantName] = useState(" ");

  const [salesName, setSalesName] = useState(" ");

  const [customerName, setCustomerName] = useState(" ");

  const [createdDate, setCreatedDate] = useState(" ");

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  function LinearProgressWithLabel(
    props: LinearProgressProps & { value: number }
  ) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>{`${Math.round(props.value)}%`}</Box>
      </Box>
    );
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleInputChange = (event: any) => {
    const newInputValues = [...inputValues];
    const inputValue = event.target.value;

    newInputValues[activeStep] = inputValue;

    setInputValues(newInputValues);
  };

  const handleButtonChange = (event: any, newAlignment: any, index: any) => {
    const newButtonValues = [...buttonValues];
    newButtonValues[index] = newAlignment;
    setButtonValues(newButtonValues);

    handleInputChange(event);
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/customer-form/${params.uuid}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setConsulantName(data.consultant_name);
        setSalesName(data.sales_name);
        setCustomerName(data.customer_name);
        setCreatedDate(data.date);

        console.log("Data received", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const sendJsonCustomerFormResponses = () => {
    const requestBody = {
      uuid: params.uuid,
      formResponseValues: inputValues,
    };
    console.log(JSON.stringify(requestBody));

    fetch(`${API_BASE_URL}/save-customer-form`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log("Response from server:", data);
        if (data === "Data saved successfully!") {
          setDialogOpen(true);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <img
            src="/HiQ_logo_white.png"
            alt="HiQ Logo"
            style={{ height: "35px", marginLeft: "15px", marginRight: "15px" }}
          ></img>
          <Typography variant="h5">Kvalitetsuppföljning</Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={4} sx={{}}>
        <Grid item xs={6} md={10} sx={{ margin: "0.5em" }}>
          <div
            style={{
              margin: "10px",
            }}
          >
            <TextField
              id="outlined-disabled"
              label="Konsult"
              defaultValue={consultantName}
              InputProps={{
                readOnly: true,
              }}
              margin="normal"
              variant="filled"
            />
            <TextField
              id="outlined-disabled"
              label="Säljare"
              defaultValue={salesName}
              InputProps={{
                readOnly: true,
              }}
              margin="normal"
              variant="filled"
            />
            <TextField
              id="outlined-disabled"
              label="Kund"
              defaultValue={customerName}
              InputProps={{
                readOnly: true,
              }}
              margin="normal"
              variant="filled"
            />
            <TextField
              id="outlined-disabled"
              label="Datum"
              defaultValue={createdDate}
              InputProps={{
                readOnly: true,
              }}
              margin="normal"
              variant="filled"
            />
          </div>
        </Grid>
        <Grid item xs={false} sm={3} md={2} sx={{ flexDirection: "column" }}>
          {questions.map((q, index) => {
            return (
              <div
                key={q.id}
                className="formChapterList"
                onClick={() => setActiveStep(index)}
                style={{
                  padding: "0.1em",
                  marginLeft: "5em",
                }}
              >
                {index === activeStep ? (
                  <Typography
                    variant="overline"
                    sx={{
                      color: "#ff329f",
                    }}
                  >
                    {q.question}
                  </Typography>
                ) : (
                  <Typography variant="overline">{q.question}</Typography>
                )}
              </div>
            );
          })}
        </Grid>

        <Grid item xs={12} sm={9} md={8} sx={{ flexDirection: "column" }}>
          {activeStep < questions.length ? (
            <>
              <Typography variant="h6" sx={{ textAlign: "center" }}>
                {questions[activeStep].description}
              </Typography>
              <Box className="centerContent">
                {questions[activeStep].inputType === "rating" && (
                  <Box sx={{ "& button": { m: 4, marginTop: "4em" } }}>
                    <ToggleButtonGroup
                      onChange={(event, newAlignment) =>
                        handleButtonChange(event, newAlignment, activeStep)
                      }
                      exclusive
                      value={buttonValues[activeStep]}
                    >
                      <ToggleButton value="Jag håller inte med alls">
                        Jag håller inte med alls
                      </ToggleButton>
                      <ToggleButton value="Jag håller inte med">
                        Jag håller inte med
                      </ToggleButton>
                      <ToggleButton value="Jag håller med">
                        Jag håller med
                      </ToggleButton>
                      <ToggleButton value="Jag håller med helt och hållet">
                        Jag håller med helt och hållet
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Box>
                )}
                {questions[activeStep].inputType === "text" && (
                  <TextField
                    value={inputValues[activeStep]}
                    onChange={handleInputChange}
                    placeholder="Kommentar"
                    multiline
                    fullWidth
                    rows={4}
                    variant="outlined"
                  />
                )}
              </Box>
            </>
          ) : (
            <>
              <h2>Sammanfattning</h2>
              {questions.map((q, index) => {
                return (
                  <>
                    <h4>{q.question}</h4>
                    <Box sx={{ marginBottom: "2px" }}>
                      {inputValues[index] ? (
                        <p>{inputValues[index]}</p>
                      ) : (
                        <p>Inget svar...</p>
                      )}
                    </Box>
                  </>
                );
              })}
            </>
          )}
          <Grid container spacing={8} className=" centerContent">
            <Grid
              item
              md={10}
              sx={{ margin: "0", padding: "0", marginTop: "10em" }}
              className=" centerContent"
            >
              <Grid item xs={2} className=" centerContent">
                {activeStep != 0 && (
                  <Button variant="contained" onClick={handleBack}>
                    Tillbaka
                  </Button>
                )}
              </Grid>
              <Grid item xs={6} className=" centerContent">
                <Box sx={{ width: "100%" }}>
                  <LinearProgressWithLabel
                    value={(activeStep / questions.length) * 100}
                  />
                </Box>
              </Grid>
              {activeStep < questions.length - 1 && (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ margin: "1em" }}
                >
                  Nästa
                </Button>
              )}
              {activeStep == questions.length - 1 && (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ margin: "1em" }}
                >
                  Klar
                </Button>
              )}
              {activeStep == questions.length && (
                <Button
                  variant="contained"
                  onClick={sendJsonCustomerFormResponses}
                  sx={{ margin: "1em" }}
                >
                  Skicka
                </Button>
              )}
              <SuccessDialog
                open={dialogOpen}
                handleClose={handleCloseDialog}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
