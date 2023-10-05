"use client";

import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Grid,
  Typography,
  CircularProgress,
  Box,
  InputLabel,
} from "@mui/material";
import { FormControl, MenuItem, Select } from "@mui/material";
import GenericAccordion from "../../components/genericaccordion";
import GenericTable from "../../components/generictable";
import "../../styles/form.css"
import "../../styles/landingpage.css"
import { API_BASE_URL, appRoutes } from "../../constants";
import { useTranslations } from 'next-intl';

export default function LandingPage() {

  const t = useTranslations('Account');

  // Define the role mapping
  const roleMapping: Record<string, string> = {
    SALES: t('sales'),
    MANAGER: t('manager'),
    CONSULTANT: t('consultant'),
  };

  //Profile picture for different type of users
  const profilePicture: Record<string, string> = {
    SALES: "/sales_avatar.png",
    MANAGER: "/manager_avatar.png",
    CONSULTANT: "/consultant_avatar.png",
  };

  // Load data to form
  const [sortingIndex, setSortingIndex] = useState(0);
  const [formData, setFormData] = useState([]);
  const [profileName, setProfileName] = useState("");
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Sort by company or consultant
  const sortingOptions = [
    {
      type: "business",
      menuItem: t('business'),
      accordianType: "customer_name",
      accordianRole: "SALES",
    },
    {
      type: "consultant",
      menuItem: t('consultant'),
      accordianType: "name",
      accordianRole: "MANAGER",
    },
  ];

  const handleSortingIndexChange = (event: any) => {
    setSortingIndex(event.target.value);
  };

  // Load form data for different roles
  useEffect(() => {

    fetch(`${API_BASE_URL}/profile`, {
      method: 'GET',
      credentials: 'include'
    })
      .then((response) => response.json())
      .then((data) => {
        setProfileName(data.name);
        setRole(data.role);
        setFormData(data.forms);
        setUserId(data.id);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log('ERROR!', error);
        setIsLoading(false);
      })

  }, []);

  if (isLoading) {
    return (
      <Box sx={{ height: '100vh', minWidth: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  } else {
    return (
      <Grid container component="main" sx={{ overflowX: 'auto', padding: '0% 15%' }}> {/* Overflow X? */}
        {/* Profile section */}
        <Grid container sx={{ height: '30vh', m: '10px' }}>
          {/* First column (left) */}
          <Grid
            item
            xs={6}
            sm={6}
            md={6}
            lg={6}
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Avatar
              src={profilePicture[role]}
              sx={{ width: 100, height: 100 }}
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
                {profileName}
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
              justifyContent: 'right',
              alignItems: 'center',
            }}
          >
            {(role === "SALES" || role === "MANAGER") && (
              <Button href={appRoutes.NEW_FORM} variant="contained" className="qualityButton">
                {t('newQualityForm')}
              </Button>
            )}
          </Grid>
        </Grid>

        {/* Form section */}
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <>
              {role === "SALES" && (
                <div>
                  <FormControl sx={{ minWidth: 200, mb: 2 }} size="medium">
                    <InputLabel>{t('sortControl')}</InputLabel>
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
                    {t('myConsultants')}
                  </Typography>
                  <GenericAccordion
                    formData={formData}
                    accordionType={"name"}
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
          </Grid>
        </Grid>
      </Grid>
    );
  }


}
