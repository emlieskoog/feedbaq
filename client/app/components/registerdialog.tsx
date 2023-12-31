'use client'

import * as React from 'react';
import { Grid, Typography, Avatar, Button, Dialog, TextField, DialogActions, DialogContent, Snackbar, Alert } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { API_BASE_URL } from '../constants';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useTranslations } from 'next-intl';

export default function RegisterDialog(props: any) {
    const { isOpen, onClose, setOpenRegisterSuccessSnackbar } = props;

    const t = useTranslations('Login');

    const [role, setRole] = React.useState('SALES');
    const [openErrorSnackbar, setOpenErrorSnackbar] = React.useState(false);


    const handleRoleChange = (event: any) => {
        setRole(event.target.value as string);
    };

    const handleRegister = async (event: any) => {
        event.preventDefault();
        const { email, password, name, role } = Object.fromEntries(new FormData(event.target).entries());

        const requestBody = { email, password, name, role };
        console.log(requestBody);

        fetch(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        })
            .then(async (response) => {
                if (response.status === 400) {
                    console.error('Email is already in use.');
                    setOpenErrorSnackbar(true);
                } else if (!response.ok) {
                    console.error('HTTP error! Status:', response.status);
                }
                else {
                    setOpenRegisterSuccessSnackbar(true);
                    onClose();
                }
            });
    }

    return (
        <Dialog open={isOpen}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            data-cy="registerDialog"
        >
            <form onSubmit={handleRegister}>
                <DialogContent>
                    <Grid container spacing={3} alignItems="center" sx={{ mt: 1, mb: 2 }}>
                        <Grid item>
                            <Avatar sx={{ bgcolor: 'secondary.main' }}>
                                <PersonAddIcon />
                            </Avatar>
                        </Grid>
                        <Grid item xs>
                            <Typography variant="h5">
                                {t('registerTitle')}
                            </Typography>
                        </Grid>
                    </Grid>
                    <TextField
                        autoFocus
                        required
                        autoComplete="email"
                        margin="dense"
                        id="email"
                        data-testid="email"
                        data-id="registerEmail"
                        name="email"
                        label={t('email')}
                        type="email"
                        fullWidth
                        data-cy="registerEmail"
                    />
                    <TextField
                        required
                        autoComplete="current-password"
                        margin="dense"
                        id="password"
                        data-testid="password"
                        name="password"
                        label={t('password')}
                        type="password"
                        fullWidth
                        sx={{ mb: 2 }}
                        data-cy="registerPassword"
                    />
                    <TextField
                        required
                        autoComplete="name"
                        margin="dense"
                        id="name"
                        data-testid="name"
                        name="name"
                        label={t('name')}
                        type="text"
                        fullWidth
                        sx={{ mb: 2 }}
                        data-cy="registerName"
                    />
                    <FormControl fullWidth>
                        <InputLabel>{t('role')}</InputLabel>
                        <Select
                            labelId="role-select"
                            id="role"
                            name="role"
                            label={t('role')}
                            value={role}
                            onChange={handleRoleChange}
                            sx={{ mb: 2 }}
                        >
                            <MenuItem value="SALES">{t('sales')}</MenuItem>
                            <MenuItem value="MANAGER">{t('manager')}</MenuItem>
                            <MenuItem value="CONSULTANT">{t('consultant')}</MenuItem>
                        </Select>
                    </FormControl>
                    <DialogActions>
                        <Button onClick={onClose} variant="outlined" color="primary">{t('cancelButton')}</Button>
                        <Button data-cy="registerSubmit" type="submit" variant="contained" endIcon={<SendIcon />} data-cy="registerSubmit">{t('registerButton')}</Button>
                    </DialogActions>
                </DialogContent>
            </form>
            <Snackbar data-cy="registerErrorSnackbar"
                open={openErrorSnackbar} autoHideDuration={6000} onClose={() => setOpenErrorSnackbar(false)}>
                <Alert severity='info'>
                    {t('emailAlreadyExist')}
                </Alert>
            </Snackbar>

        </Dialog >
    );
}
