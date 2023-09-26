"use client";

import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import { FormControl, MenuItem, Select } from "@mui/material";
import GenericAccordion from "../components/genericaccordion";
import GenericTable from "../components/generictable";
import "../styles/landingpage.css";
import { API_BASE_URL, appRoutes } from '../constants';

export default function LandingPage() {

  // Get local storage data
  const myDataString = localStorage.getItem('myData');
  const myData = myDataString ? JSON.parse(myDataString) : null;

  // Check if myData exists and contains an email and role
  const email = myData?.email || 'Email not found';
  const userId = myData?.id || 'Id not found';
  const role = myData?.role || 'No role';
  const userName = email
    .split('@')[0]
    .split('.')
    .map((part: string) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');


  //Profile picture for different type of users
  const profilePicture = {
    SALES: "sales_avatar.png",
    MANAGER: "manager_avatar.png",
    CONSULTANT: "consultant_avatar.png",
  };

  // Sort by company or consultant
  const sortingOptions = [
    { type: "business", menuItem: "Företag", accordianType: 'customer_name', accordianRole: 'SALES' },
    { type: "consultant", menuItem: "Konsult", accordianType: 'consultant_name', accordianRole: 'MANAGER' },
  ];

  const [sortingIndex, setSortingIndex] = useState(0);

  const handleSortingIndexChange = (event: any) => {
    setSortingIndex(event.target.value);
  };

  // Load data to form
  const [formData, setFormData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    setIsLoading(true);

    if (role === "SALES") {
      fetch(`${API_BASE_URL}/forms/sales/1`)
        .then((response) => response.json())
        .then((data) => {
          setFormData(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(
            "An error occured when trying to retrieve forms for sales.",
            error
          );
          setIsLoading(false);
        });
    }

    if (role === "MANAGER") {
      fetch(`${API_BASE_URL}/forms/managers/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setFormData(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(
            "An error occured when trying to retrieve forms for manager.",
            error
          );
          setIsLoading(false);
        });
    }

    if (role === "CONSULTANT") {
      fetch(`${API_BASE_URL}/forms/consultants/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setFormData(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(
            "An error occured when trying to retrieve forms for consultant.",
            error
          );
          setIsLoading(false);
        });
    }
  }, [role]);

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  return (
    <Grid container spacing={2} className="outerGrid">
      {/* First row */}
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        lg={6}
        className="centerContent"
        style={{ justifyContent: "flex" }}
      >
        <div style={{ width: "100px", marginRight: "10px" }}>
          <Avatar
            sx={{
              width: 90,
              height: 90,
              objectFit: "contain",
            }}
            src={profilePicture[role as keyof typeof profilePicture]}
          />
        </div>
        <div>
          <Typography variant="h5" component="div">
            {userName}
          </Typography>
          <Typography variant="caption" component="div">
            {role}
          </Typography>
        </div>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        lg={6}
        className="centerContent"
        style={{ justifyContent: "flex-end" }}
      >
        {(role === "SALES" || role === "MANAGER") && (
          <Button href={appRoutes.NEW_FORM} variant="contained">
            Skapa ny kvalitetsuppföljning
          </Button>
        )}
      </Grid>
      {/* Second row */}
      <Grid item xs={12} className="tableRow">
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            {role === "SALES" && (
              <div>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Sortera på:
                </Typography>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <Select
                    value={sortingIndex}
                    onChange={handleSortingIndexChange}
                  >
                    {sortingOptions.map((option, index) => (
                      <MenuItem key={index} value={index}>
                        {option.menuItem}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <GenericAccordion
                  formData={formData}
                  accordionType={sortingOptions[sortingIndex].accordianType}
                  selectedOption={sortingOptions[sortingIndex].accordianRole}
                />
              </div>
            )}
            {role === "MANAGER" && (
              <div>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                  Mina Konsulter
                </Typography>
                <GenericAccordion
                  formData={formData}
                  accordionType={"consultant_name"}
                  selectedOption={role}
                />
              </div>
            )}
            {role === "CONSULTANT" && (
              <GenericTable
                formData={formData}
                selectedOption={role}
              />
            )}
          </>
        )}
      </Grid>
    </Grid>
  );
}