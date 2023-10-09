"use client";

import React, { useState } from "react";
import {
  Button,
  Avatar,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import RegisterDialog from "../components/registerdialog";
import { API_BASE_URL } from "../constants";
import { useTranslations, useLocale } from "next-intl";
import LocaleSwitcher from "../components/localeswitcher";
import { usePathname, useRouter } from "next-intl/client";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const t = useTranslations("Login");
  const router = useRouter();
  const currentPathname = usePathname();
  const locale = useLocale();
  const query = useSearchParams();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openRegisterSuccessSnackbar, setOpenRegisterSuccessSnackbar] = React.useState(false);


  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleLogin = async (event: any) => {
    event.preventDefault();
    const { email, password } = Object.fromEntries(
      new FormData(event.target).entries()
    );

    const requestBody = { email, password };

    fetch(`${API_BASE_URL}/auth/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
      credentials: "include",
    }).then(async (response) => {
      if (response.status === 401) {
        console.error("Error authenticating user!");
        setOpenSnackbar(true);
      } else if (!response.ok) {
        console.error("HTTP error! Status:", response.status);
      } else {
        console.log("Woho du angav rätt mail och lösenord :-D");

        router.push("/account");
      }
    });
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={false}
        md={5}
        sx={{
          backgroundImage: "url(/feedbaqlogin-vertical.png)",
          backgroundRepeat: "no-repeat",
          backgroundColor: "white",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={12} md={7} component={Paper} elevation={10} square>
        <Box
          sx={{
            mx: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
              label={t("email")}
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t("password")}
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
              {t("login")}
            </Button>
          </form>

          <Link href="#" onClick={handleOpenDialog} sx={{ mb: "20px" }}>
            {t("registerNewButton")}
          </Link>
          <LocaleSwitcher
            router={router}
            currentPathname={currentPathname}
            locale={locale}
            query={query}
          />

          <Typography variant="body2" sx={{ color: "#ff329f", mt: "30px" }}>
            Powered by WALE &trade;
          </Typography>
          {isDialogOpen && (
            <RegisterDialog
              isOpen={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
              setOpenRegisterSuccessSnackbar={setOpenRegisterSuccessSnackbar}
            />
          )}
        </Box>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="info">
          {t("wrongPasswordOrEmail")}
        </Alert>
      </Snackbar>
      <Snackbar open={openRegisterSuccessSnackbar} autoHideDuration={6000} onClose={() => setOpenRegisterSuccessSnackbar(false)}>
        <Alert >
          {t('registerSuccessfull')}
        </Alert>
      </Snackbar>
    </Grid>
  );
}
