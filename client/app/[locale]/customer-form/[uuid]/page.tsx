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
} from "@mui/material";
import "../../../styles/form.css";
import { API_BASE_URL } from "../../../constants";
import { useParams } from "next/navigation";
import DialogBox from "./dialogbox";
import HeaderCustomerForm from "@/app/components/headercustomerform";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next-intl/client";
import { useTranslations } from "next-intl";

export default function CustomerFormGrid() {
  const router = useRouter();
  const currentPathname = usePathname();
  const locale = useLocale();

  const t = useTranslations("QualityForm");

  console.log(locale);

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

  const [consultantName, setConsulantName] = useState("");

  const [salesName, setSalesName] = useState("");

  const [customerName, setCustomerName] = useState("");

  const [createdDate, setCreatedDate] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);

  const [dialogMessage, setDialogMessage] = useState("");

  const [dialogTitle, setDialogTitle] = useState("");

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
          setDialogMessage(
            "Tack! Kvalitetsuppföljningen har skickats in till HiQ."
          );
          setDialogTitle("Kvalitetsuppföljning är inskickad!");
        } else if (
          data ===
          "Customer form with uuid " +
            params.uuid +
            " does not exist or is not valid."
        ) {
          setDialogOpen(true);
          setDialogMessage(
            "Tyvärr är länken till detta formulär inte giltig längre. \nDet kan vara på grund av att ett svar redan skickats in. \n\nDu kan alltid kontakta HiQ för att få en ny länk."
          );
          setDialogTitle("Något gick fel!");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      {/* <AppBar position="relative">
        <Toolbar>
          <img
            src="/HiQ_logo_white.png"
            alt="HiQ Logo"
            style={{ height: "35px", marginLeft: "15px", marginRight: "15px" }}
          ></img>
          <Typography variant="h5">Kvalitetsuppföljning</Typography>
          <LocaleSwitcher
            router={router}
            currentPathname={currentPathname}
            locale={locale}
          />
        </Toolbar>
      </AppBar> */}

      <HeaderCustomerForm
        router={router}
        currentPathname={currentPathname}
        locale={locale}
      />
      <Grid container spacing={4} className="outerGrid">
        {/* First row */}
        <Grid item xs={10} md={10} className="topRow">
          <Box sx={{ flexDirection: "row", display: "flex" }}>
            <Box className="infoBoxes">Konsult: {consultantName}</Box>
            <Box className="infoBoxes">Säljare: {salesName}</Box>
            <Box className="infoBoxes">Kund: {customerName}</Box>
            <Box className="infoBoxes">Datum: {createdDate}</Box>
          </Box>
        </Grid>
        {/* Second row */}
        <Grid container spacing={4}>
          <Grid
            item
            xs={false}
            sm={3}
            md={3}
            sx={{ flexDirection: "column" }}
            className="middleRow"
          >
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
                      fontSize={14}
                      sx={{
                        color: "#ff329f",
                      }}
                    >
                      {q.question}
                    </Typography>
                  ) : (
                    <Typography variant="overline" fontSize={14}>
                      {q.question}
                    </Typography>
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
            {activeStep < questions.length ? (
              <>
                <Typography variant="h5" sx={{ textAlign: "center" }}>
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
                <h2>{t("summary")}</h2>
                {questions.map((q, index) => {
                  return (
                    <>
                      <h4>{t(`q${index}`)}</h4>
                      <Box sx={{ marginBottom: "10px" }}>
                        {inputValues[index] ? (
                          <p>{inputValues[index]}</p>
                        ) : (
                          <p>{t("noAnswer")}</p>
                        )}
                      </Box>
                    </>
                  );
                })}
              </>
            )}
          </Grid>
        </Grid>
        {/* Third row */}

        <Grid item xs={4} className="bottomRow centerContent">
          {activeStep != 0 && (
            <Button variant="contained" onClick={handleBack}>
              Tillbaka
            </Button>
          )}
        </Grid>
        <Grid item xs={4} className="bottomRow centerContent">
          <Box sx={{ width: "100%" }}>
            <LinearProgressWithLabel
              value={(activeStep / questions.length) * 100}
            />
          </Box>
        </Grid>
        <Grid item xs={4} className="bottomRow centerContent">
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
            <Button variant="contained" onClick={sendJsonCustomerFormResponses}>
              Skicka
            </Button>
          )}
          <DialogBox
            open={dialogOpen}
            handleClose={handleCloseDialog}
            dialogMessage={dialogMessage}
            dialogTitle={dialogTitle}
          />
        </Grid>
      </Grid>
    </>
  );
}
