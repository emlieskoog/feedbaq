'use client'

import React, { useState } from "react";
import { Avatar, Button, Grid, Typography } from '@mui/material';
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
          name: "Arbete It",
          profilePicture: "consultant_avatar.png",
        },
      ];
      
    
    const qualityFollowUps = [
        {
            customer: "Ica",
            consultant: "Agnes",
            date: "2023-08-13"
        },
        {
            customer: "Systembolaget",
            consultant: "Agnes",
            date: "2023-09-13"
        },
        {
            customer: "Systembolaget",
            consultant: "Wilma",
            date: "2023-08-14"
        },
        {
            customer: "Barebelle",
            consultant: "Wilma",
            date: "2023-09-14"
        },
        {
            customer: "Nocco",
            consultant: "Emelie",
            date: "2023-08-15"
        },
        {
            customer: "Barebelle",
            consultant: "Emelie",
            date: "2023-09-15"
        },
        {
            customer: "Coca-Cola",
            consultant: "Lucas",
            date: "2023-09-13"
        },
        {
            customer: "Nocco",
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
                    sx={{width: 90, height: 90, marginRight: '20px', objectFit: 'contain'}}
                    src={selectedRole?.profilePicture}  
                    />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {selectedRole?.name}                
                </Typography>
            </Grid>
            <Grid item xs={8} className="topRow centerContent">
                <Button href="/new-form" variant="contained"> Skapa ny kvalitetsuppföljning </Button>
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
                {selectedOption === 'salesperson' && (
                    <div>
                        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        Mina Företag
                        </Typography>
                        <GenericAccordion qualityFollowUps={qualityFollowUps} accordionType={'customer'} selectedOption={selectedOption}  />
                    </div>
                )}
                {selectedOption === 'manager' && (
                    <div>
                        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        Mina Konsulter
                        </Typography>
                        <GenericAccordion qualityFollowUps={qualityFollowUps} accordionType={'consultant'} selectedOption={selectedOption}  />
                    </div>
                )}
                {selectedOption === 'consultant' && (
                    <GenericTable data={qualityFollowUps} selectedOption={selectedOption} />
                )}
            </Grid>
        </Grid>
    );
}
