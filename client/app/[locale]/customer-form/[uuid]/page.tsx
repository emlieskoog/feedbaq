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
import { API_BASE_URL, customerFormInput } from "../../../constants";
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

  const t = useTranslations("CustomerForm");

  const dt = useTranslations("DialogBoxCForm");

  const params = useParams();

  const [activeStep, setActiveStep] = useState(0);
  const [inputValues, setInputValues] = useState(
    Array(customerFormInput.length).fill("")
  );

  const [buttonValues, setButtonValues] = useState(
    Array(customerFormInput.length).fill("")
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
    fetchUniqueLinkData();
  }, []);

  async function fetchUniqueLinkData() {
    try {
      await fetch(`${API_BASE_URL}/customer-form/${params.uuid}`, {
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
        });
    } catch (error) {
      console.error("Error:", error);
    }
  }

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
          setDialogMessage(dt("sucessMessage"));
          setDialogTitle(dt("successTitle"));
        } else {
          setDialogOpen(true);
          setDialogMessage(dt("failMessage"));
          setDialogTitle(dt("failTitle"));
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <HeaderCustomerForm
        router={router}
        currentPathname={currentPathname}
        locale={locale}
      />
      <Grid container spacing={4} className="outerGrid">
        {/* First row */}
        <Grid item xs={10} md={10} className="topRow">
          <Box sx={{ flexDirection: "row", display: "flex" }}>
            <Box className="infoBoxes">
              {t("consultant")}: {consultantName}
            </Box>
            <Box className="infoBoxes">
              {t("salesperson")}: {salesName}
            </Box>
            <Box className="infoBoxes">
              {t("customer")}: {customerName}
            </Box>
            <Box className="infoBoxes">
              {t("date")}: {createdDate}
            </Box>
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
            {customerFormInput.map((q, index) => {
              return (
                <div
                  key={index}
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
                      {t(`q${index}`)}
                    </Typography>
                  ) : (
                    <Typography variant="overline" fontSize={14}>
                      {t(`q${index}`)}
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
            md={7}
            sx={{ flexDirection: "column", overflowY: "auto" }}
            className="middleRow"
          >
            {activeStep < customerFormInput.length ? (
              <>
                <Typography variant="h5" sx={{ textAlign: "center" }}>
                  {t(`d${activeStep}`)}
                </Typography>
                <Box className="centerContent">
                  {customerFormInput[activeStep] === "rating" && (
                    <Box sx={{ "& button": { m: 3, marginTop: "4em" } }}>
                      <ToggleButtonGroup
                        onChange={(event, newAlignment) =>
                          handleButtonChange(event, newAlignment, activeStep)
                        }
                        exclusive
                        value={buttonValues[activeStep]}
                      >
                        <ToggleButton value={t(`doNotAgreeAtAll`)}>
                          {t(`doNotAgreeAtAll`)}
                        </ToggleButton>
                        <ToggleButton value={t(`doNotAgree`)}>
                          {t(`doNotAgree`)}
                        </ToggleButton>
                        <ToggleButton value={t(`doAgree`)}>
                          {t(`doAgree`)}
                        </ToggleButton>
                        <ToggleButton value={t(`doAgreeCompletely`)}>
                          {t(`doAgreeCompletely`)}
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </Box>
                  )}
                  {customerFormInput[activeStep] === "text" && (
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
                {customerFormInput.map((q, index) => {
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
              {t("goBackButton")}
            </Button>
          )}
        </Grid>
        <Grid item xs={4} className="bottomRow centerContent">
          <Box sx={{ width: "100%" }}>
            <LinearProgressWithLabel
              value={(activeStep / customerFormInput.length) * 100}
            />
          </Box>
        </Grid>
        <Grid item xs={4} className="bottomRow centerContent">
          {activeStep < customerFormInput.length - 1 && (
            <Button variant="contained" onClick={handleNext}>
              {t("nextButton")}
            </Button>
          )}
          {activeStep == customerFormInput.length - 1 && (
            <Button variant="contained" onClick={handleNext}>
              {t("doneButton")}
            </Button>
          )}
          {activeStep == customerFormInput.length && (
            <Button variant="contained" onClick={sendJsonCustomerFormResponses}>
              {t("sendButton")}
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
