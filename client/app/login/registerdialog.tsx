import * as React from 'react';
import { Grid, Typography, Avatar, Button, Box, Dialog, TextField, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { API_BASE_URL } from '../constants';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';


export default function RegisterDialog(props: any) {
    const { isOpen, onClose } = props;
    const [role, setRole] = React.useState('SALES');

    const handleRoleChange = (event: any) => {
        setRole(event.target.value as string);
    };

    const handleRegister = async (event: any) => {
        event.preventDefault();
        const { email, password, role } = Object.fromEntries(new FormData(event.target).entries());

        const requestBody = { email, password, role };
        console.log(requestBody);

        fetch(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        })
            .then(async (response) => {
                if (response.status === 400)
                    console.error('Det finns redan en användare med den emailen :-( ');
                else if (!response.ok)
                    console.error('HTTP error! Status:', response.status);
                else
                    console.log('Woho du är nu registrerad :-D');
            });
    }

    return (
        <Dialog open={isOpen}
            onClose={onClose}
            maxWidth="sm"
            fullWidth>
            <form onSubmit={handleRegister}>
                <DialogContent>
                    <Grid container spacing={3} alignItems="center" sx={{ mt: 1, mb: 2 }}>
                        <Grid item>
                            <Avatar sx={{ bgcolor: 'secondary.main' }}>
                                <PersonAddIcon />
                            </Avatar>
                        </Grid>
                        <Grid item xs>
                            <Typography variant="h5">Registrera ny användare</Typography>
                        </Grid>
                    </Grid>
                    <TextField
                        autoFocus
                        required
                        autoComplete="email"
                        margin="dense"
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                    />
                    <TextField
                        required
                        autoComplete="current-password"
                        margin="dense"
                        id="password"
                        name="password"
                        label="Lösenord"
                        type="password"
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <FormControl fullWidth>
                        <InputLabel >Roll</InputLabel>
                        <Select
                            labelId="role-select"
                            id="role"
                            name="role"
                            label="Roll"
                            value={role}
                            onChange={handleRoleChange}
                            sx={{ mb: 2 }}
                        >
                            <MenuItem value="SALES">Säljare</MenuItem>
                            <MenuItem value="MANAGER">Konsultchef</MenuItem>
                            <MenuItem value="CONSULTANT">Konsult</MenuItem>
                        </Select>
                    </FormControl>
                    <DialogActions>
                        <Button onClick={onClose} variant="outlined" color="primary">Avbryt</Button>
                        <Button type="submit" variant="contained" endIcon={<SendIcon />}>Registrera</Button>
                    </DialogActions>
                </DialogContent>
            </form>
        </Dialog >
    );
}
