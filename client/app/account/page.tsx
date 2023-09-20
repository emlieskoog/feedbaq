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
import GenericAccordion from "./components/genericaccordion";
import GenericTable from "./components/generictable";
import "../styles/landingpage.css";

export default function LandingPage() {
  const roleOptions = [
    {
      role: "salesperson",
      menuItem: "Säljare",
      name: "Prispress Pelle",
      profilePicture: "sales_avatar.png",
    },
    {
      role: "manager",
      menuItem: "Konsultchef",
      name: "Boss Bosson",
      profilePicture: "manager_avatar.png",
    },
    {
      role: "consultant",
      menuItem: "Konsult",
      name: "Arbete It",
      profilePicture: "consultant_avatar.png",
    },
  ];

  const sortingOptions = [
    { role: "business", menuItem: "Företag" },
    { role: "consultant", menuItem: "Konsult" },
  ];

  const [selectedOption, setSelectedOption] = useState("salesperson");
  const [sortingOption, setSortingOption] = useState("business");

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const handleSortingChange = (event: any) => {
    setSortingOption(event.target.value);
  };

  const selectedRole = roleOptions.find(
    (option) => option.role === selectedOption
  );

  const [formData, setFormData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [consultantData, setConsultantData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/forms")
      .then((response) => response.json())
      .then((data) => {
        setFormData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(
          "An error occured when trying to retrieve form data.",
          error
        );
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/1/forms")
      .then((response) => response.json())
      .then((data) => {
        setConsultantData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(
          "An error occured when trying to retrieve consultant data.",
          error
        );
        setIsLoading(false);
      });
  }, []);

  return (
    <Grid container spacing={2} className="outerGrid">
      {/* First row */}
      <Grid item xs={4} className="topRow centerContent">
        <Avatar
          sx={{
            width: 90,
            height: 90,
            marginRight: "20px",
            objectFit: "contain",
          }}
          src={selectedRole?.profilePicture}
        />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {selectedRole?.name}
        </Typography>
      </Grid>
      <Grid item xs={8} className="topRow centerContent">
        <Button href="/account/new-form" variant="contained">
          {" "}
          Skapa ny kvalitetsuppföljning{" "}
        </Button>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <Select value={selectedOption} onChange={handleOptionChange}>
            {roleOptions.map((option) => (
              <MenuItem key={option.role} value={option.role}>
                {option.menuItem}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      {/* Second row */}
      <Grid item xs={12} className="tableRow">
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            {selectedOption === "salesperson" && (
              <div>
                {/* <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                  Mina Företag
                </Typography> */}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Sortera på:
                </Typography>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <Select value={sortingOption} onChange={handleSortingChange}>
                    {sortingOptions.map((option) => (
                      <MenuItem key={option.role} value={option.role}>
                        {option.menuItem}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <GenericAccordion
                  formData={formData}
                  accordionType={"customer"}
                  selectedOption={selectedOption}
                />
              </div>
            )}
            {selectedOption === "manager" && (
              <div>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                  Mina Konsulter
                </Typography>
                <GenericAccordion
                  formData={formData}
                  accordionType={"consultant_name"}
                  selectedOption={selectedOption}
                />
              </div>
            )}
            {selectedOption === "consultant" && (
              <GenericTable
                formData={consultantData}
                selectedOption={selectedOption}
              />
            )}
          </>
        )}
      </Grid>
    </Grid>
  );
}
