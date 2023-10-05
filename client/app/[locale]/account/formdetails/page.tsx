"use client";

import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
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
        "http://localhost:8080/api/forms/" + id, { credentials: "include" }
      );
      const data = await responseFormData.json();
      setFormData(data);
      setIsLoading(false);

    } catch (error) {
      console.log("An error occured when trying to retrieve form data.", error);
    }
  }

  return (
    <Box sx={{ marginTop: "5em" }}>
      {isLoading ? (
        <div className="centerCircularProgress">
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <Box
            sx={{
              flexDirection: "row",
              display: "flex",
              margin: "15px 300px",
              justifyContent: "space-evenly",
            }}
          >
            <h2> {formData.customer_name} </h2>
            <h2> {formData.consultant_name} </h2>
            <h2> {formData.form_data.date} </h2>
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
                width: "70%",
              }}
            >
              <div>
                <h3>{t('customer')}</h3>
                <p className="separator"> {formData.customer_name} </p>
                <h3> {t('consultant')} </h3>
                <p className="separator"> {formData.consultant_name} </p>
                <h3> {t('manager')} </h3>
                <p className="separator"> {formData.manager_name} </p>
                <h3> {t('salesperson')} </h3>
                <p className="separator"> {formData.sales_name} </p>
                <h3> {t('date')} </h3>
                <p className="separator"> {formData.form_data.date} </p>
                {formInputType.slice(1).map((question, index) => (
                  <div key={index}>
                    <h3>{t(`q${index + 1}`)}</h3>
                    <p className="separator">{formData.form_data[`q${index + 2}`]}</p>
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
