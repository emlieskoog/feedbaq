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
  Collapse,
  Alert,
  IconButton,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CloseIcon from "@mui/icons-material/Close";
import "../../styles/form.css";
import Link from "next/link";
import { API_BASE_URL, appRoutes } from "../../constants";

export default function FormGrid() {
  const questions = [
    {
      id: "0",
      question: "Info",
      description: "",
      inputType: "info",
    },
    {
      id: "1",
      question: "Uppstart",
      description:
        "Förståelse, startsträcka, rätt förutsättningar för att klara uppdraget, dator och miljöer...",
      inputType: "text",
    },
    {
      id: "2",
      question: "Resultat",
      description: "Kompetens, levererar, kvalitet, tid...",
      inputType: "text",
    },
    {
      id: "3",
      question: "Ansvar",
      description:
        "Samarbete, hjälper & frågar, står för åtaganden, flaggar...",
      inputType: "text",
    },
    {
      id: "4",
      question: "Enkelhet",
      description: "Göra det svåra enkelt, enkel kommunikation...",
      inputType: "text",
    },
    {
      id: "5",
      question: "Glädje",
      description: "Tillför energi, kul att jobba med...",
      inputType: "text",
    },
    {
      id: "6",
      question: "Innovation",
      description: "Kreativ, kommer med förslag och idéer, kliver fram...",
      inputType: "text",
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
    {
      id: "9",
      question: "Förbättringar",
      description: "Vad kan förbättras?",
      inputType: "text",
    },
    {
      id: "10",
      question: "Värdeomdömen (positivt)",
      description: "Positiv feedback och beröm från kunder eller användare...",
      inputType: "text",
    },
    {
      id: "11",
      question: "Värdeomdömen (negativt)",
      description: "Negativ feedback och kritik från kunder eller användare...",
      inputType: "text",
    },
    {
      id: "12",
      question: "Övrigt",
      description:
        "Allmänt utrymme för ytterligare kommentarer eller ämnen som inte täcks av andra frågor...",
      inputType: "text",
    },
    {
      id: "13",
      question: "Nästa uppföljning",
      description:
        "Planerad tidpunkt eller åtgärder för den nästa uppföljningen...",
      inputType: "text",
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

  const [generatedLink, setGeneratedLink] = useState<any>("");

  const [open, setOpen] = useState(false);

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

        return response.json();
      })
      .then((data) => {
        console.log("Response from server:", data);

        const link = "http://localhost:3000/customer-form/" + data.uuid;
        setGeneratedLink(link);

        setOpen(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const sendJsonForm = () => {
    const requestBody = {
      consultantId: consultantId,
      customerId: customerId,
      salesId: salesId,
      date: createdDate.format("YYYY-MM-DD"),
      formResponseValues: inputValues,
    };
    console.log(JSON.stringify(requestBody));

    fetch(`${API_BASE_URL}/save-form`, {
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
              <Link href={appRoutes.ACCOUNT_PAGE}>
                <Button variant="contained" onClick={sendJsonForm}>
                  Skicka
                </Button>
              </Link>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        md={4}
        sx={{ flexDirection: "column" }}
        className="centerContent"
      >
        <Collapse in={open}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="medium"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {generatedLink}
          </Alert>
        </Collapse>
        <Button variant="contained" onClick={sendJsonCustomerForm}>
          Generera länk
        </Button>
      </Grid>
    </Grid>
  );
}
