'use client';
import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Avatar,
    Button,
    AvatarGroup,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress
} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AvatarDialog from "./avatardialog";
import { API_BASE_URL, appRoutes } from "../../../constants";
import { useTranslations } from 'next-intl';


const initialFormData = {
    name: "John Doe",
    role: "SALES",
    password: "*********",
    passwordConfirm: "*********",
};

export default function Settings() {

    const t = useTranslations('Settings');

    const [isDialogOpen, setOpenDialog] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [isPasswordChanged, setIsPasswordChanged] = useState(false);

    const handleEditPictureClick = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleRoleChange = (event) => {
        setFormData({
            ...formData,
            role: event.target.value
        });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (name === "password") {
            setIsPasswordChanged(true);
        } else if (name === "passwordConfirm" && value === formData.password) {
            setIsPasswordChanged(false);
        }
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
    };

    const [profileName, setProfileName] = useState("");
    const [role, setRole] = useState("");
    const [userId, setUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load form data for different roles
    useEffect(() => {

        fetch(`${API_BASE_URL}/profile`, {
            method: 'GET',
            credentials: 'include'
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setProfileName(data.name);
                setRole(data.role);
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
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
                <Grid item xs={3} sm={3} md={3} sx={{ flexDirection: "column", position: 'relative' }}>
                    <AvatarGroup max={1} sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <Avatar src={"/consultant_avatar.png"} sx={{ width: 90, height: 90 }} />
                        <IconButton sx={{ position: 'absolute', top: 0, right: 0 }} onClick={handleEditPictureClick}>
                            <EditRoundedIcon />
                        </IconButton>
                    </AvatarGroup>
                    {isDialogOpen && <AvatarDialog isOpen={isDialogOpen} onClose={handleCloseDialog} />}
                </Grid>
                <Grid item xs={6} sm={6} md={6} sx={{ flexDirection: "column" }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h3" variant="h4">
                            {t('settingsHeading')}
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                margin="normal"
                                variant="standard"
                                fullWidth
                                id="name"
                                label={t('nameField')}
                                name="name"
                                autoFocus
                                value={profileName}
                                onChange={handleInputChange}
                                sx={{ mb: 2 }}
                            />
                            <InputLabel shrink>{t('roleInput')}</InputLabel>
                            <FormControl fullWidth variant="standard" >
                                <Select
                                    labelId="role-select"
                                    id="role"
                                    name="role"
                                    value={role}
                                    onChange={handleRoleChange}
                                >
                                    <MenuItem value="SALES">{t('salesSelect')}</MenuItem>
                                    <MenuItem value="MANAGER">{t('managerSelect')}</MenuItem>
                                    <MenuItem value="CONSULTANT">{t('consultantSelect')}</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                margin="normal"
                                variant="standard"
                                fullWidth
                                id="password"
                                label={t('passwordField')}
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="normal"
                                variant="standard"
                                fullWidth
                                id="passwordConfirm"
                                label={t('passwordConfirmField')}
                                name="passwordConfirm"
                                type="password"
                                value={formData.passwordConfirm}
                                onChange={handleInputChange}
                                disabled={!isPasswordChanged}
                                sx={{ mb: 2 }}
                            />
                            <Button variant="outlined" color="primary" sx={{ marginRight: 2 }}>{t('regretButton')}</Button>
                            <Button type="submit" variant="contained">{t('saveButton')}</Button>
                        </form>
                    </Box>
                </Grid>
            </Grid>
        );
    }
}