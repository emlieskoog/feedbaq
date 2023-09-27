"use client";

import React, { useState } from "react";
import { Button, Avatar, TextField, Link, Paper, Box, Grid, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import RegisterDialog from './registerdialog';
import { API_BASE_URL } from '../constants';
import { useRouter } from 'next/navigation';

export default function LoginPage() {

  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleLogin = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { email, password } = Object.fromEntries(formData.entries());

    const requestBody = { email, password };
    console.log(requestBody);


    fetch(`${API_BASE_URL}/auth/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then(async (response) => {
        if (response.status === 404)
          console.error('Det finns ingen användare med den emailen :-( ');
        else if (response.status === 401)
          console.error('Lösenordet som du angav är fel :-( ');
        else if (!response.ok)
          console.error('HTTP error! Status:', response.status);
        else
          console.log('Woho du angav rätt mail och lösenord :-D');

        // Parse the response data (assuming it's in JSON format)
        const responseData = await response.json();

        // Store the data in sessionStorage
        sessionStorage.setItem('sessionData', JSON.stringify(responseData));
        const sessionData = sessionStorage.getItem('sessionData');

        if (sessionData !== null) {
          const { id, email, role } = JSON.parse(sessionData);
          localStorage.setItem('myData', JSON.stringify({ id, email, role }));
          router.push('/account');

        } else {
          console.error('Session data is null.');
        }
      });
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={false}
        md={7}
        sx={{
          backgroundImage: 'url(feedbaqlogin-vertical.png)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'white',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={12} md={5} component={Paper} elevation={6}>
        <Box
          sx={{
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 5 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h3" variant="h4">
            FeedbaQ
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Lösenord"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 5, mb: 2 }}
            >
              Logga in
            </Button>
          </form>
          <Grid item>
            <Link href="#" variant="body2" onClick={handleOpenDialog}>
              {"Registrera dig här"}
            </Link>
          </Grid>
          {isDialogOpen && <RegisterDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />}
        </Box>
      </Grid >
    </Grid >
  );
}
