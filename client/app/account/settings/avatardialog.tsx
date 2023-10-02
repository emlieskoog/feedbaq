import * as React from 'react';
import { Grid, Typography, Avatar, Dialog, DialogContent } from "@mui/material";

const avatarOptions = [
    'consultant_avatar.png',
    'manager_avatar.png',
    "sales_avatar.png",
    'consultant_avatar.png',
    'manager_avatar.png',
    'sales_avatar.png',
    'consultant_avatar.png',
    'manager_avatar.png',
    'sales_avatar.png',
];

export default function AvatarDialog(props: any) {
    const { isOpen, onClose } = props;
    const [selectedAvatar, setSelectedAvatar] = React.useState(avatarOptions[0]);

    const handleAvatarChange = (avatar: string) => {
        setSelectedAvatar(avatar);
    };

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogContent>
                <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ minHeight: 300 }}>
                    <Grid item xs={9}>
                        <Typography variant="h5" align="center">Välj din nya avatar :D</Typography>
                    </Grid>
                    {[...Array(3)].map((_, rowIndex) => (
                        <Grid container item xs={9} alignItems="center" justifyContent="center" key={rowIndex}>
                            {[...Array(3)].map((_, colIndex) => {
                                const index = rowIndex * 3 + colIndex;
                                if (index < avatarOptions.length) {
                                    const avatar = avatarOptions[index];
                                    return (
                                        <Grid item xs={3} sm={3} md={3} key={colIndex}>
                                            <Avatar
                                                src={avatar}
                                                sx={{ width: 80, height: 80, cursor: 'pointer' }}
                                                onClick={() => handleAvatarChange(avatar)}
                                            />
                                        </Grid>
                                    );
                                } else {
                                    return null;
                                }
                            })}
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>
        </Dialog>
    );
}













