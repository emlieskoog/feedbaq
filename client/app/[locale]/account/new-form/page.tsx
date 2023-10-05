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
  FormControl,
  Snackbar,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "../../../styles/form.css"
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { API_BASE_URL, appRoutes, formInputType } from "../../../constants";
import { useTranslations } from "next-intl";

export default function FormGrid() {

  const t = useTranslations('QualityForm');
  const [activeStep, setActiveStep] = useState(0);
  const [inputValues, setInputValues] = useState(Array(formInputType.length).fill(null));

  const [consultants, setConsultants] = useState([]);
  const [consultantId, setConsultantId] = useState("");


  const [sales, setSales] = useState([]);
  const [salesId, setSalesId] = useState("");

  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState("");

  const [generatedLink, setGeneratedLink] = useState<any>("");
  const [copySuccess, setCopySuccess] = useState<any>("");

  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const isFormValid = consultantId && salesId && customerId;

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

  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(generatedLink)
      .then(() => {
        setCopySuccess(true); // Set copy success to true to display the success message
        setTimeout(() => {
          setCopySuccess(false); // Reset success message after a few seconds
        }, 3000);
      })
      .catch((err) => console.error("Failed to copy: ", err));
  };

  const handleInputChange = (event: any) => {
    const newInputValues = [...inputValues];
    const inputValue = event.target.value;

    console.log("inputValues:", inputValues);
    console.log("formInputType:", formInputType);

    if (formInputType[activeStep] === "rating") {
      newInputValues[activeStep] = parseFloat(inputValue);
    } else {
      newInputValues[activeStep] = inputValue;
    }

    setInputValues(newInputValues);
  };

  const handleConsultantChange = (event: any) => {
    setConsultantId(event.target.value);
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
      credentials: "include",
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
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
      })
      .catch((error) => {
        console.error("Error fetching consultants:", error);
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
      })
      .catch((error) => {
        console.error("Error fetching sales:", error);
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
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  }, []);

  return (
    <Grid container spacing={2} className="outerGrid">

      <Grid
        item
        xs={false}
        sm={3}
        md={3}
        sx={{ flexDirection: "column" }}
        className="middleRow"
      >
        <Typography variant="h6">{t('chapter')}</Typography>
        {formInputType.map((q, index) => {
          return (
            <div
              key={index}
              className="formChapterList"
              onClick={() => (isFormValid ? setActiveStep(index) : setOpenSnackbar(true))}
            >
              {index === activeStep ? (
                <Typography
                  variant="overline"
                  sx={{
                    color: "#ff329f",
                  }}
                >
                  {t(`q${index}`)}
                </Typography>
              ) : (
                <Typography variant="overline">{t(`q${index}`)}</Typography>
              )}
            </div>
          );
        })}
      </Grid>
      <Grid
        item
        xs={12}
        sm={9}
        md={6}
        sx={{ flexDirection: "column", overflowY: "auto" }}
        className="middleRow"
      >
        {activeStep < formInputType.length ? (
          <>
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              {t(`q${activeStep}`)}
            </Typography>
            <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
              {t(`d${activeStep}`)}
            </Typography>
            <Box className="centerContent">
              {formInputType[activeStep] === "text" && (
                <TextField
                  value={inputValues[activeStep]}
                  onChange={handleInputChange}
                  placeholder={t('inputPlaceholder')}
                  multiline
                  fullWidth
                  rows={4}
                  variant="outlined"
                />
              )}
              {formInputType[activeStep] === "rating" && (
                <Rating
                  value={inputValues[activeStep]}
                  onChange={handleInputChange}
                  max={10}
                  size="large"
                />
              )}

              {formInputType[activeStep] === "info" && (
                <Box>
                  <div
                    style={{
                      width: "55vh",
                      margin: "10px",
                    }}
                  >

                    <FormControl required fullWidth margin="normal">
                      <InputLabel id="select-label-consultant">
                        {t('consultant')}
                      </InputLabel>

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
                    </FormControl>

                    <FormControl required fullWidth margin="normal">
                      <InputLabel id="select-label-sales">
                        {t('salesperson')}
                      </InputLabel>
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
                    </FormControl>

                    <FormControl required fullWidth margin="normal">
                      <InputLabel id="select-label-customer">
                        {t('customer')}
                      </InputLabel>
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
                    </FormControl>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <FormControl required fullWidth margin="normal">
                        <DatePicker
                          label="Datum"
                          value={createdDate}
                          format="YYYY-MM-DD"
                          onChange={handleDateChange}
                        />
                      </FormControl>
                    </LocalizationProvider>

                  </div>
                </Box>

              )
              }
            </Box >
          </>
        ) : (
          <>
            <h2>{t('summary')}</h2>
            {formInputType.map((q, index) => {
              return (
                <>
                  <h4>{t(`q${index}`)}</h4>
                  <Box sx={{ marginBottom: "10px" }}>
                    {inputValues[index] ? (
                      <p>{inputValues[index]}</p>
                    ) : (
                      <p>{t('noAnswer')}</p>
                    )}
                  </Box>
                </>
              );
            })}
          </>
        )
        }
      </Grid >

      <Grid
        item
        xs={false}
        sm={false}
        md={3}
        className="middleRow centerContent"
      >
        <Grid container spacing={2} sx={{ flexDirection: "column" }}>
          <Grid item xs={10} className="centerContent">

            <Alert severity='info'>
              Om du istället önskar generera en länk till en kund, klickar du här:
              <Button
                variant="contained"
                onClick={isFormValid ? sendJsonCustomerForm : () => setOpenSnackbar(true)}
                sx={{ width: "90%", height: "30%", mt: "2px" }}
              >
                {t('generateLinkButton')}
              </Button>
            </Alert>

          </Grid >
          <Grid item xs={14}>
            <Collapse in={open}>
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                severity="info"
                sx={{ cursor: "pointer" }}
              >
                <p onClick={handleCopyToClipboard}> {generatedLink}</p>
              </Alert>
            </Collapse>
            {copySuccess && <Alert severity="success">{t('copyLinkAlert')}!</Alert>}{" "}
          </Grid>
        </Grid >
      </Grid >

      {/* Third row */}

      < Grid item xs={4} className="bottomRow centerContent" >
        {activeStep != 0 && (
          <Button variant="contained" onClick={handleBack}>
            {t('goBackButton')}
          </Button>
        )
        }
      </Grid >
      <Grid item xs={4} className="bottomRow centerContent">
        <Box sx={{ width: "100%" }}>
          <LinearProgressWithLabel
            value={(activeStep / formInputType.length) * 100}
          />
        </Box>
      </Grid>
      <Grid item xs={4} className="bottomRow centerContent">

        {
          activeStep == 0 && (
            <Button
              variant="contained"
              onClick={isFormValid ? handleNext : () => setOpenSnackbar(true)}
            >
              Starta
            </Button>
          )
        }


        {
          (activeStep > 0) && (activeStep < formInputType.length - 1) && (

            <Button variant="contained" onClick={handleNext}>
              {t('nextButton')}
            </Button>
          )
        }
        {
          activeStep == formInputType.length - 1 && (
            <Button variant="contained" onClick={handleNext}>
              {t('doneButton')}
            </Button>
          )
        }
        {
          activeStep == formInputType.length && (
            <Link href={appRoutes.ACCOUNT_PAGE}>
              <Button variant="contained" onClick={sendJsonForm}>
                {t('sendButton')}
              </Button>
            </Link>
          )
        }
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
          <Alert severity='error'>
            Fyll i alla obligatoriska fält innan du fortsätter!
          </Alert>
        </Snackbar>
      </Grid >
    </Grid >
  );
}
