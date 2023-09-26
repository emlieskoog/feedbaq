"use client";
import * as React from 'react';
import { Button, Avatar, TextField, Link, Paper, Box, Grid, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import RegisterDialog from './registerdialog';

export default function LoginPage() {

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleLogin = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const emailValue = formData.get('email');
    const passwordValue = formData.get('password');

    console.log({ message: 'Inloggad som:', email: emailValue, password: passwordValue });

    const requestBody = {
      email: emailValue,
      password: passwordValue,
    };

    fetch("http://localhost:8080/api/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.status === 404) {
          console.error('Det finns ingen användare med den emailen :-( ');
        } else if (response.status === 401) {
          console.error('Lösenordet som du angav är fel :-( ');
        } else if (!response.ok) {
          console.error('HTTP error! Status:', response.status);
        } else {
          console.error('Woho du angav rätt mail och lösenord :-D');
        }
      });

  };

  return (

    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={5}
        sx={{
          backgroundImage: 'url(feedbaqlogin.png)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'white',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 3, bgcolor: 'secondary.main' }}>
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
              name="psw"
              label="Lösenord"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
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
