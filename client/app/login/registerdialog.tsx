import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SendIcon from '@mui/icons-material/Send';

export default function RegisterDialog(props: any) {
    const { isOpen, onClose } = props;

    const handleRegister = async (event: any) => {
        event.preventDefault();
        const registerFormData = new FormData(event.target);
        const registerEmailValue = registerFormData.get('newEmail');
        const registerPasswordValue = registerFormData.get('newPsw');

        console.log({ message: 'Registrerad som:', email: registerEmailValue, password: registerPasswordValue });
    }

    return (

        <Dialog open={isOpen}
            onClose={onClose}
            maxWidth="md"
            fullWidth>
            <form onSubmit={handleRegister}>
                <DialogTitle>Registrera ny användare</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Kul att du vill bli en del av FeedbaQ gänget ;-D
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        autoComplete="email"
                        margin="dense"
                        id="newEmail"
                        label="Email"
                        type="email"
                        fullWidth
                    />
                    <TextField
                        required
                        autoComplete="current-password"
                        margin="dense"
                        id="newPsw"
                        label="Lösenord"
                        type="password"
                        fullWidth
                    />
                    <DialogActions>
                        <Button onClick={onClose} variant="outlined" color="primary">Avbryt</Button>
                        <Button type="submit" variant="contained" endIcon={<SendIcon />}>Registrera</Button>
                    </DialogActions>
                </DialogContent>
            </form>
        </Dialog>

    );
}
