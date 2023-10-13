"use client";

import { useState } from "react";
import {
  Grid,
  Button,
  TextField,
  LinearProgress,
  LinearProgressProps,
  Box,
  Rating,
  Typography,
  Alert,
  IconButton,
  Snackbar,
  Drawer,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import "../../../styles/form.css";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Link from "next/link";
import { API_BASE_URL, appRoutes, formInputType } from "../../../constants";
import { useTranslations } from "next-intl";
import InfoPageComponent from "./InfoPageComponent";

export default function FormGrid() {
  const dayjs = require("dayjs");
  const t = useTranslations("QualityForm");

  const [formValues, setFormValues] = useState({
    consultantId: "",
    salesId: "",
    customerId: "",
    createdDate: dayjs(),
  });

  const onFormChange = (field: any, value: any) => {
    setFormValues({ ...formValues, [field]: value });
  };

  const validateForm = (formValues: any) => {
    const { consultantId, salesId, customerId } = formValues;
    return consultantId && salesId && customerId;
  };

  const [activeStep, setActiveStep] = useState(0);
  const [inputValues, setInputValues] = useState(
    Array(formInputType.length).fill("")
  );

  const [generatedLink, setGeneratedLink] = useState<any>("");
  const [copySuccess, setCopySuccess] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

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
    setDialogOpen(false);
  };

  const handleInputChange = (event: any) => {
    const newInputValues = [...inputValues];
    const inputValue = event.target.value;

    if (formInputType[activeStep] === "rating") {
      newInputValues[activeStep] = parseFloat(inputValue);
    } else {
      newInputValues[activeStep] = inputValue;
    }

    setInputValues(newInputValues);
  };

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const sendJsonCustomerForm = () => {
    const requestBody = {
      consultantId: formValues.consultantId,
      customerId: formValues.customerId,
      salesId: formValues.salesId,
      date: formValues.createdDate.format("YYYY-MM-DD"),
    };
    console.log(requestBody);

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
        setDialogOpen(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const sendJsonForm = () => {
    const requestBody = {
      consultantId: formValues.consultantId,
      customerId: formValues.customerId,
      salesId: formValues.salesId,
      date: formValues.createdDate.format("YYYY-MM-DD"),
      formResponseValues: inputValues,
    };

    console.log(requestBody);

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

  const chapter = () => (
    <>
      <Typography variant="h6">{t("chapter")}</Typography>
      {formInputType.map((q, index) => {
        return (
          <div
            key={index}
            className="formChapterList"
            onClick={() =>
              validateForm(formValues)
                ? setActiveStep(index)
                : setOpenSnackbar(true)
            }
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

  const generateLink = () => (
    <>
      <Alert
        icon={false}
        sx={{ flexDirection: "column", alignItems: "center" }}
      >
        <Typography>{t("generateLink")}</Typography>
        <Button
          variant="contained"
          onClick={
            validateForm(formValues)
              ? sendJsonCustomerForm
              : () => setOpenSnackbar(true)
          }
          sx={{ width: "90%", height: "20%", m: "10px" }}
        >
          {t("generateLinkButton")}
        </Button>
      </Alert>
      <>
        <Dialog
          open={dialogOpen}
          onClose={() => {
            setDialogOpen(false);
          }}
        >
          <DialogTitle>{t("linkDialogText")}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Alert severity="info" sx={{ cursor: "pointer" }}>
                <Typography onClick={handleCopyToClipboard}>
                  {" "}
                  {generatedLink}
                </Typography>
              </Alert>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </>
    </>
  );

  return (
    <Grid container className="outerGrid">
      {/* Generate link item, only visible on info page and small screens */}
      <Grid
        item
        xs={12}
        sx={{
          display: { xs: "block", sm: "none" },
        }}
      >
        {formInputType[activeStep] === "info" && <div>{generateLink()}</div>}
      </Grid>

      {/* First row */}
      <Grid container>
        {/* Chapter column, only visible on large screen */}
        <Grid
          item
          xs={false}
          sm={3}
          md={3}
          sx={{
            display: { xs: "none", sm: "block" },
          }}
          className="middleRow"
        >
          <div className="boxPadding">{chapter()}</div>
        </Grid>

        {/* Question/answer column */}
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          sx={{ flexDirection: "column", overflowY: "auto" }}
          className="middleRow"
        >
          <div className="boxPadding">
            {activeStep < formInputType.length ? (
              <>
                <Typography
                  variant="h5"
                  sx={{ textAlign: "center", mb: "10px" }}
                >
                  {t(`q${activeStep}`)}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ textAlign: "center", mb: "30px" }}
                >
                  {t(`d${activeStep}`)}
                </Typography>
                <Box className="centerContent">
                  {formInputType[activeStep] === "text" && (
                    <TextField
                      value={inputValues[activeStep]}
                      onChange={handleInputChange}
                      placeholder={t("inputPlaceholder")}
                      multiline
                      fullWidth
                      rows={8}
                      variant="outlined"
                    />
                  )}
                  {formInputType[activeStep] === "rating" && (
                    <Rating
                      value={
                        inputValues[activeStep] === ""
                          ? 0
                          : inputValues[activeStep]
                      }
                      onChange={handleInputChange}
                      max={10}
                      size="large"
                    />
                  )}

                  {formInputType[activeStep] === "info" && (
                    <InfoPageComponent
                      formValues={formValues}
                      onFormChange={onFormChange}
                      t={t}
                    />
                  )}
                </Box>
              </>
            ) : (
              <>
                <h2>{t("summary")}</h2>
                {formInputType.map((q, index) => {
                  return (
                    <div key={index}>
                      <h4>{t(`q${index}`)}</h4>
                      <Box sx={{ marginBottom: "10px" }}>
                        {inputValues[index] ? (
                          <p>{inputValues[index]}</p>
                        ) : (
                          <p>{t("noAnswer")}</p>
                        )}
                      </Box>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </Grid>

        {/* Generate link column, only visible on info page and large screens */}
        <Grid
          item
          xs={false}
          sm={3}
          md={3}
          sx={{
            mt: "10px",
            display: { xs: "none", sm: "block" },
          }}
          className="middleRow"
        >
          {formInputType[activeStep] === "info" && (
            <div className="linkBox">{generateLink()}</div>
          )}
        </Grid>
      </Grid>

      <Grid container>
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
              value={(activeStep / formInputType.length) * 100}
            />
          </Box>
        </Grid>
        <Grid item xs={3} className="bottomRow centerContent">
          {activeStep == 0 && (
            <Button
              variant="contained"
              onClick={
                validateForm(formValues)
                  ? handleNext
                  : () => setOpenSnackbar(true)
              }
            >
              {t("startButton")}
            </Button>
          )}

          {activeStep > 0 && activeStep < formInputType.length - 1 && (
            <Button variant="contained" onClick={handleNext}>
              {t("nextButton")}
            </Button>
          )}
          {activeStep == formInputType.length - 1 && (
            <Button variant="contained" onClick={handleNext}>
              {t("doneButton")}
            </Button>
          )}
          {activeStep == formInputType.length && (
            <Link href={appRoutes.ACCOUNT_PAGE}>
              <Button variant="contained" onClick={sendJsonForm}>
                {t("sendButton")}
              </Button>
            </Link>
          )}
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={() => setOpenSnackbar(false)}
          >
            <Alert severity="error">{t("requiredMessage")}</Alert>
          </Snackbar>

          <Snackbar
            open={copySuccess}
            autoHideDuration={6000}
            onClose={() => setCopySuccess(false)}
          >
            <Alert severity="success">{t("copyLinkAlert")}</Alert>
          </Snackbar>
        </Grid>
      </Grid>

      {/* Chapter Drawer shown on small screens/mobile and on all pages not info*/}
      <Grid
        item
        xs={12}
        sx={{
          display: { xs: "block", sm: "none" },
        }}
      >
        {!(formInputType[activeStep] === "info") && (
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
  );
}
