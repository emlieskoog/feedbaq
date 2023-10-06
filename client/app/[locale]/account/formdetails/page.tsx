"use client";

import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import "../../../styles/form.css";
import { formInputType } from "../../../constants";
import { useTranslations } from "next-intl";

export default function FormDetails() {
  const t = useTranslations("QualityForm");
  const [formData, setFormData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchFormData();
  }, []);

  async function fetchFormData() {
    try {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const id = urlParams.get("id");

      const responseFormData = await fetch(
        "http://localhost:8080/api/forms/" + id,
        { credentials: "include" }
      );
      const data = await responseFormData.json();
      setFormData(data);
      setIsLoading(false);
    } catch (error) {
      console.log("An error occurred when trying to retrieve form data.", error);
    }
  }

  return (
    <Box sx={{ marginTop: "1em" }}>
      {isLoading ? (
        <div className="centerCircularProgress">
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <Box
            sx={{
              flexDirection: "column",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center"
            }}
          >
            <Typography variant="h4">{formData.customer_name}</Typography>
            <Typography variant="h7">{formData.consultant_name}</Typography>
            <Typography variant="h7">{formData.form_data.date}</Typography>
          </Box>
          <div className="centerContent">
            <Box
              sx={{
                display: "block",
                backgroundColor: "white",
                border: 1,
                borderRadius: 2,
                borderColor: "lightgrey",
                m: 1,
                p: 2,
                width: "90%"
              }}
            >
              <div>
                <Typography variant="h6">{t('customer')}</Typography>
                <Typography variant="body2" className="separator">
                  {formData.customer_name}
                </Typography>
                <Typography variant="h6">{t('consultant')}</Typography>
                <Typography variant="body2" className="separator">
                  {formData.consultant_name}
                </Typography>
                <Typography variant="h6">{t('manager')}</Typography>
                <Typography variant="body2" className="separator">
                  {formData.manager_name}
                </Typography>
                <Typography variant="h6">{t('salesperson')}</Typography>
                <Typography variant="body2" className="separator">
                  {formData.sales_name}
                </Typography>
                <Typography variant="h6">{t('date')}</Typography>
                <Typography variant="body2" className="separator">
                  {formData.form_data.date}
                </Typography>
                {formInputType.slice(1).map((question, index) => (
                  <div key={index}>
                    <Typography variant="h6">{t(`q${index + 1}`)}</Typography>
                    <Typography variant="body2" className="separator">
                      {formData.form_data[`q${index + 2}`]}
                    </Typography>
                  </div>
                ))}
              </div>
            </Box>
          </div>
        </>
      )}
    </Box>
  );
}
