"use client";

import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import "../../../styles/form.css";

export default function FormDetails() {
  const [formData, setFormData] = useState<any>([]);
  const [detailedFormData, setDetailedFormData] = useState<any>([]);

  const [namesData, setNamesData] = useState<any>([]);

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
        "http://localhost:8080/api/forms/" + id
      );
      const data = await responseFormData.json();
      setFormData(data);
      setIsLoading(false);

      /*
      const responseDetailedFormData = await fetch(
        "http://localhost:8080/api/form_responses/" + id
      );
      const detailedFormData = await responseDetailedFormData.json();
      setDetailedFormData(detailedFormData);

      const responseNamesData = await fetch(
        "http://localhost:8080/api/names/" +
          formData.consultant_id +
          "/" +
          formData.sales_id +
          "/" +
          formData.customer_id
      );
      const namesData = await responseNamesData.json();
      console.log(namesData);
      setNamesData(namesData);
      */
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
                <h3> Kund </h3>
                <p className="separator"> {formData.customer_name} </p>
                <h3> Konsult </h3>
                <p className="separator"> {formData.consultant_name} </p>
                <h3> Säljare </h3>
                <p className="separator"> {formData.sales_name} </p>
                <h3> Datum </h3>
                <p className="separator"> {formData.form_data.date} </p>
                <h3> Uppstart? </h3>
                <p className="separator"> {formData.form_data.q1} </p>
                <h3> Resultat? </h3>
                <p className="separator"> {formData.form_data.q2}</p>
                <h3> Ansvar? </h3>
                <p className="separator"> {formData.form_data.q3} </p>
                <h3> Enkelhet? </h3>
                <p className="separator"> {formData.form_data.q4}</p>
                <h3> Glädje? </h3>
                <p className="separator"> {formData.form_data.q5}</p>
                <h3> Innovation? </h3>
                <p className="separator"> {formData.form_data.q6}</p>
                <h3> Nöjdhet konsult? </h3>
                <p className="separator"> {formData.form_data.q7}</p>
                <h3> Nöjdhet HiQ? </h3>
                <p className="separator"> {formData.form_data.q8}</p>
                <h3> Förbättringar? </h3>
                <p className="separator"> {formData.form_data.q9}</p>
                <h3> Värdeomdömen? </h3>
                <p> </p>
              </div>
            </Box>
          </div>
        </>
      )}
    </Box>
  );
}
