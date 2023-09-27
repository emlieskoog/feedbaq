"use client";

import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Grid,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { FormControl, MenuItem, Select } from "@mui/material";
import GenericAccordion from "../components/genericaccordion";
import GenericTable from "../components/generictable";
import "../styles/landingpage.css";
import { API_BASE_URL, appRoutes } from "../constants";
import "../styles/form.css";
export default function LandingPage() {
  // Get local storage data
  const myDataString = localStorage.getItem("myData");
  const myData = myDataString ? JSON.parse(myDataString) : null;

  // Check if myData exists and contains an email and role
  const email = myData?.email || "Email not found";
  const userId = myData?.id || "Id not found";
  const role = myData?.role || "No role";
  const userName = email
    .split("@")[0]
    .split(".")
    .map((part: string) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

  // Define the role mapping
  const roleMapping: Record<string, string> = {
    SALES: "Säljare",
    MANAGER: "Konsultchef",
    CONSULTANT: "Konsult",
  };

  //Profile picture for different type of users
  const profilePicture: Record<string, string> = {
    SALES: "sales_avatar.png",
    MANAGER: "manager_avatar.png",
    CONSULTANT: "consultant_avatar.png",
  };

  // Load data to form
  const [sortingIndex, setSortingIndex] = useState(0);
  const [formData, setFormData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Sort by company or consultant
  const sortingOptions = [
    {
      type: "business",
      menuItem: "Företag",
      accordianType: "customer_name",
      accordianRole: "SALES",
    },
    {
      type: "consultant",
      menuItem: "Konsult",
      accordianType: "consultant_name",
      accordianRole: "MANAGER",
    },
  ];

  const handleSortingIndexChange = (event: any) => {
    setSortingIndex(event.target.value);
  };

  // Load form data for different roles
  useEffect(() => {
    setIsLoading(true);

    let endpoint = "";

    // Anväder 1 nu för att ladda så många forms som möjligt för en säljare
    if (role === "SALES") {
      endpoint = `${API_BASE_URL}/forms/sales/1`;
    } else if (role === "MANAGER") {
      endpoint = `${API_BASE_URL}/forms/managers/${userId}`;
    } else if (role === "CONSULTANT") {
      endpoint = `${API_BASE_URL}/forms/consultants/${userId}`;
    }

    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        setFormData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(
          `An error occurred when trying to retrieve forms for ${role}.`,
          error
        );
        setIsLoading(false);
      });

  }, [role, userId]);

  return (
    <Grid container component="main" sx={{ overflowX: 'auto ' }}>
      {/* Profile section */}
      <Grid container sx={{ height: '30vh', mt: '40px' }}>
        {/* First column (left) */}
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          lg={6}
          sx={{
            display: 'flex',
            justifyContent: 'flex',
            alignItems: 'center',
          }}
        >
          <Avatar
            src={profilePicture[role]}
            sx={{ width: 90, height: 90 }}
          />
          <Box
            sx={{
              mx: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'left',
            }}
          >
            <Typography variant="h5" component="div">
              {userName}
            </Typography>
            <Typography variant="caption" component="div">
              {roleMapping[role]}
            </Typography>
          </Box>
        </Grid>
        {/* Second column (right) */}
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          lg={6}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end', // Align content to the right
            alignItems: 'center', // Center content vertically
          }}
        >
          {(role === "SALES" || role === "MANAGER") && (
            <Button href={appRoutes.NEW_FORM} variant="contained" className="qualityButton">
              Skapa ny kvalitetsuppföljning
            </Button>
          )}
        </Grid>
      </Grid>

      {/* Form section */}
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} >
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              {role === "SALES" && (
                <div>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Sortera på:
                  </Typography>
                  <FormControl sx={{ minWidth: 200, mb: 2 }} size="medium">
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
    </Grid>

  );
}
