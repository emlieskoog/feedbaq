'use client'

import React, { useState } from "react";
import { Avatar, Button, Grid } from '@mui/material';
import { FormControl, MenuItem, Select } from '@mui/material';
import '../styles/landingpage.css';
import GenericAccordion from "./genericaccordion";
import GenericTable from "./generictable";

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
          name: "Leap Is",
          profilePicture: "consultant_avatar.png",
        },
      ];
      
    
    const qualityFollowUps = [
        {
            customer: "Ica",
            consultant: "Agnes",
            date: "2023-09-13"
        },
        {
            customer: "Systembolaget",
            consultant: "Wilma",
            date: "2023-09-13"
        },
        {
            customer: "Lunds uni",
            consultant: "Emelie",
            date: "2023-09-13"
        },
        {
            customer: "Lucas",
            consultant: "Lucas",
            date: "2023-09-13"
        }
    ];

    const [selectedOption, setSelectedOption] = useState('salesperson');

    const handleOptionChange = (event: any) => {
        setSelectedOption(event.target.value);
    };

    const selectedRole = roleOptions.find((option) => option.role === selectedOption);
    
    return (
        <Grid container spacing={2} className="outerGrid">
            {/* First row */}
            <Grid item xs={4} className="topRow centerContent">
                <Avatar 
                    sx={{width: 90, height: 90, marginRight: '10px'}}
                    src={selectedRole?.profilePicture}  
                    />
                <h4>{selectedRole?.name}</h4>
            </Grid>
            <Grid item xs={8} className="topRow centerContent">
                <Button href="/new-form" variant="contained"> Skapa ny kvalitetsuppföljning </Button>
                <FormControl>
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
                {selectedOption === 'salesperson' && (
                    <div>
                        <h3 className="heading">Mina Företag</h3>
                        <GenericAccordion qualityFollowUps={qualityFollowUps} accordionType={'customer'} selectedOption={selectedOption}  />
                    </div>
                )}
                {selectedOption === 'manager' && (
                    <div>
                        <h3 className="heading">Mina Konsulter</h3>
                        <GenericAccordion qualityFollowUps={qualityFollowUps} accordionType={'consultant'} selectedOption={selectedOption}  />
                    </div>
                )}
                {selectedOption === 'consultant' && (
                    <GenericTable data={qualityFollowUps} selectedOption={selectedOption} />
                )}
            </Grid>
            {/* Second row */}
            <Grid item xs={12} className="bottomRow">
                <Button variant="contained" href="/">
                    Logga ut
                </Button>
            </Grid>
        </Grid>
    );
}
