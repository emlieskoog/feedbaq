"use client";
import { useEffect, useState } from "react";
import {
  Grid,
  Button,
  TextField,
  LinearProgress,
  LinearProgressProps,
  Box,
  Rating,
  Typography,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "../styles/form.css";
import Link from "next/link";
import { API_BASE_URL, appRoutes } from "../constants";

export default function FormGrid() {
  const questions = [
    {
      id: "0",
      question: "Info",
      description: "",
      inputType: "info",
    },
    {
      id: "7",
      question: "Nöjdhet (konsult)",
      description: "Hur nöjd är kunden med konsulten på en skala 1-10?",
      inputType: "rating",
    },
    {
      id: "8",
      question: "Nöjdhet (HiQ)",
      description: "Hur nöjd är kunden med HiQ på en skala 1-10?",
      inputType: "rating",
    },
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [inputValues, setInputValues] = useState(
    Array(questions.length).fill("")
  );

  const [consultants, setConsultants] = useState([]);
  const [consultantId, setConsulantId] = useState("");

  const [sales, setSales] = useState([]);
  const [salesId, setSalesId] = useState("");

  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState("");

  // Day.js is a minimalist JavaScript library that parses, validates, manipulates, and displays dates and times for modern browsers with a largely Moment.js-compatible API.
  const dayjs = require("dayjs");

  const [createdDate, setCreatedDate] = useState(dayjs()); // dayjs() = get the current time and date. Could be changed using .format("YYYY-MM-DD") if we need date to be string

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

    if (questions[activeStep].inputType === "rating") {
      newInputValues[activeStep] = parseFloat(inputValue);
    } else {
      newInputValues[activeStep] = inputValue;
    }

    setInputValues(newInputValues);
  };

  const handleConsultantChange = (event: any) => {
    setConsulantId(event.target.value);
  };

  const handleSalesChange = (event: any) => {
    setSalesId(event.target.value);
  };

  const handleCustomerChange = (event: any) => {
    setCustomerId(event.target.value);
  };

  const handleDateChange = (event: any) => {
    setCreatedDate(event);
  };

  const sendJsonCustomerForm = () => {
    const requestBody = {
      consultantId: consultantId,
      customerId: customerId,
      salesId: salesId,
      date: createdDate.format("YYYY-MM-DD"),
    };

    fetch(`${API_BASE_URL}/customer-form`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        const generatedHash = response.headers.get("X-Generated-Hash");
        console.log("Generated Hash from Header:", generatedHash);
        return response.text();
      })
      .then((data) => {
        console.log("Response from server:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/consultants`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setConsultants(data);
        console.log("Data received", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/sales`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSales(data);
        console.log("Data received", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/customers`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data);
        console.log("Data received", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <Grid container spacing={4} sx={{ marginTop: "1em" }}>
      <Grid item xs={false} sm={3} md={3} sx={{ flexDirection: "column" }}>
        {/* <Typography variant="h6">Kapitel</Typography> */}
        {questions.map((q, index) => {
          return (
            <div
              style={{
                padding: "0.1em",
                marginLeft: "9em",
              }}
            >
              <div
                key={q.id}
                className="formChapterList"
                onClick={() => setActiveStep(index)}
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
            </div>
          );
        })}
      </Grid>
      <Grid item xs={12} sm={9} md={6} sx={{ flexDirection: "column" }}>
        <Typography variant="h3" className="centerContent">
          Kvalitetsuppföljning
        </Typography>
        {activeStep < questions.length ? (
          <>
            <Typography
              variant="h5"
              sx={{ textAlign: "center", margin: "1em" }}
            >
              {questions[activeStep].question}
            </Typography>
            <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
              {questions[activeStep].description}
            </Typography>
            <Box className="centerContent">
              {questions[activeStep].inputType === "text" && (
                <TextField
                  value={inputValues[activeStep]}
                  onChange={handleInputChange}
                  placeholder="Skriv ditt svar här ..."
                  multiline
                  fullWidth
                  rows={4}
                  variant="outlined"
                />
              )}
              {questions[activeStep].inputType === "rating" && (
                <Rating
                  value={inputValues[activeStep]}
                  onChange={handleInputChange}
                  max={10}
                  size="large"
                />
              )}
              {questions[activeStep].inputType === "info" && (
                <Box>
                  <div
                    style={{
                      width: "45vh",
                      margin: "20px",
                    }}
                  >
                    <InputLabel id="select-label-consultant">
                      Konsult
                    </InputLabel>
                    <Box>
                      <Select
                        labelId="select-label-consultant"
                        fullWidth
                        value={consultantId}
                        onChange={handleConsultantChange}
                      >
                        {consultants.map((consultant: any) => (
                          <MenuItem value={consultant.id} key={consultant.id}>
                            {consultant.name}
                          </MenuItem>
                        ))}
                      </Select>

                      <InputLabel id="select-label-sales">Säljare</InputLabel>
                      <Select
                        labelId="select-label-sales"
                        fullWidth
                        value={salesId}
                        onChange={handleSalesChange}
                      >
                        {sales.map((salesperson: any) => (
                          <MenuItem value={salesperson.id} key={salesperson.id}>
                            {salesperson.name}
                          </MenuItem>
                        ))}
                      </Select>

                      <InputLabel id="select-label-customer">Kund</InputLabel>
                      <Select
                        labelId="select-label-customer"
                        fullWidth
                        value={customerId}
                        onChange={handleCustomerChange}
                      >
                        {customers.map((customer: any) => (
                          <MenuItem value={customer.id} key={customer.id}>
                            {customer.customer_name}
                          </MenuItem>
                        ))}
                      </Select>

                      <InputLabel id="select-date">Datum</InputLabel>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                          <DatePicker
                            value={createdDate}
                            format="YYYY-MM-DD"
                            onChange={handleDateChange}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    </Box>
                  </div>
                </Box>
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
                  <Box sx={{ marginBottom: "10px" }}>
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
        <Grid container spacing={4} className=" centerContent">
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
          <Grid item xs={2} className=" centerContent">
            {activeStep < questions.length - 1 && (
              <Button variant="contained" onClick={handleNext}>
                Nästa
              </Button>
            )}
            {activeStep == questions.length - 1 && (
              <Button variant="contained" onClick={handleNext}>
                Klar
              </Button>
            )}
            {activeStep == questions.length && (
              <Button variant="contained" onClick={sendJsonCustomerForm}>
                Skicka
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        md={2}
        sx={{ flexDirection: "column" }}
        className="centerContent"
      ></Grid>
    </Grid>
  );
}
