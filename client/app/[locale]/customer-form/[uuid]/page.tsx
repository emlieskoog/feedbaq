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
  Drawer,
  IconButton,
} from "@mui/material";
import "../../../styles/form.css";
import { API_BASE_URL, customerFormInput } from "../../../constants";
import { useParams } from "next/navigation";
import DialogBox from "./dialogbox";
import HeaderCustomerForm from "@/app/components/headercustomerform";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next-intl/client";
import { useTranslations } from "next-intl";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

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

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

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

  const chapter = () => (
    <>
      {customerFormInput.map((q, index) => {
        return (
          <div
            key={index}
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
                {t(`q${index}`)}
              </Typography>
            ) : (
              <Typography variant="overline">{t(`q${index}`)}</Typography>
            )}
          </div>
        );
      })}
    </>
  );

  const buttons = (divType: string) => (
    <ToggleButtonGroup
      onChange={(event, newAlignment) =>
        handleButtonChange(event, newAlignment, activeStep)
      }
      exclusive
      value={buttonValues[activeStep]}
      className={divType}
    >
      <div className="boxPadding">
        <ToggleButton
          className="toggleButtonStyle"
          value={t(`doNotAgreeAtAll`)}
        >
          {t(`doNotAgreeAtAll`)}
        </ToggleButton>
        <ToggleButton className="toggleButtonStyle" value={t(`doNotAgree`)}>
          {t(`doNotAgree`)}
        </ToggleButton>
        <ToggleButton className="toggleButtonStyle" value={t(`doAgree`)}>
          {t(`doAgree`)}
        </ToggleButton>
        <ToggleButton
          className="toggleButtonStyle"
          value={t(`doAgreeCompletely`)}
        >
          {t(`doAgreeCompletely`)}
        </ToggleButton>
      </div>
    </ToggleButtonGroup>
  );

  return (
    <>
      <HeaderCustomerForm
        router={router}
        currentPathname={currentPathname}
        locale={locale}
      />
      <Grid container className="outerGrid">
        {/* Info boxes / First row */}

        <Grid container>
          <Grid item xs={10} md={2}>
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
          </Grid>
        </Grid>
        {/* Second row */}
        <Grid container>
          {/* Question/answer column */}
          <Grid
            item
            xs={false}
            sm={3}
            md={3}
            sx={{
              display: { xs: "none", sm: "block" },
            }}
          >
            <div className="boxPadding">{chapter()}</div>
          </Grid>
          {/* Question/answer column */}

          <Grid item md={8} className="middleRow">
            {activeStep < customerFormInput.length ? (
              <>
                <Typography variant="h5" sx={{ textAlign: "center" }}>
                  {t(`d${activeStep}`)}
                </Typography>
                {/* Buttons */}
                {customerFormInput[activeStep] === "rating" && (
                  <div className="centerContent">
                    <Grid
                      item
                      xs={false}
                      sm={12}
                      md={12}
                      sx={{
                        flexDirection: "column",
                        overflowY: "auto",
                        display: { xs: "none", sm: "block" },
                      }}
                    >
                      {buttons("toggleButtonGroupRow")}
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={false}
                      md={false}
                      sx={{
                        overflowY: "auto",
                        display: { xs: "block", sm: "none" },
                      }}
                    >
                      {buttons("toggleButtonGroupColumn")}
                    </Grid>
                  </div>
                )}
                {customerFormInput[activeStep] === "text" && (
                  <div className="centerContent">
                    <TextField
                      value={inputValues[activeStep]}
                      onChange={handleInputChange}
                      placeholder="Kommentar"
                      multiline
                      fullWidth
                      rows={4}
                      variant="outlined"
                    />
                  </div>
                )}
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

        <Grid item xs={3} className="bottomRow centerContent">
          {activeStep != 0 && (
            <Button variant="contained" onClick={handleBack}>
              {t("goBackButton")}
            </Button>
          )}
        </Grid>
        <Grid item xs={6} className="bottomRow centerContent">
          <Box sx={{ width: "100%" }}>
            <LinearProgressWithLabel
              value={(activeStep / customerFormInput.length) * 100}
            />
          </Box>
        </Grid>
        <Grid item xs={3} className="bottomRow centerContent">
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
        {/* Chapter Drawer shown on small screens/mobile and on all pages not info*/}
        <Grid
          item
          xs={12}
          sx={{
            display: { xs: "block", sm: "none" },
          }}
        >
          {!(customerFormInput[activeStep] === "info") && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                onClick={toggleDrawer}
                style={{ cursor: "pointer", color: "#ff329f" }}
              >
                {t("chapterBottomToggler")}
                <IconButton size="small">
                  <ArrowDropUpIcon />
                </IconButton>
              </Typography>
              <Drawer
                anchor="bottom"
                open={drawerOpen}
                onClose={toggleDrawer}
                sx={{ display: { xs: "block", sm: "none" } }}
              >
                <div className="boxPadding">{chapter()}</div>
              </Drawer>
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  );
}
