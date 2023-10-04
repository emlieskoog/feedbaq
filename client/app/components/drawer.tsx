import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton'; // Import IconButton
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import {
    Link,
    Typography,
} from "@mui/material";
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useTranslations } from 'next-intl';


type Anchor = 'left';

export default function TemporaryDrawer() {

    const t = useTranslations('Account');

    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };

    const list = (anchor: Anchor) => (
        <Box
            sx={{ width: 300 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <img
                    src="/HiQ_logo_white.png"
                    alt="HiQ Logo"
                    style={{
                        height: "50px",
                        marginTop: "35px",
                        marginBottom: "35px",
                        marginLeft: "90px",
                        filter: "brightness(1) invert(1)",
                    }}
                ></img>
                <Link href="/account" variant="body2" style={{ textDecoration: "none" }}>
                    <ListItem >
                        <ListItemIcon>
                            <AccountCircleIcon fontSize="medium" style={{ color: '#ff329f' }} />
                        </ListItemIcon>
                        <ListItemText><Typography variant="h5">{t('profileDrawer')}</Typography></ListItemText>
                    </ListItem>
                </Link>
                <Link href="/account/settings" variant="body2" style={{ textDecoration: "none" }}>
                    <ListItem>
                        <ListItemIcon>
                            <Settings fontSize="medium" />
                        </ListItemIcon>
                        <ListItemText><Typography variant="h5">{t('settingsDrawer')}</Typography></ListItemText>
                    </ListItem>
                </Link>
                <Divider />
                <Link href="/" variant="body2" style={{ textDecoration: "none" }}>
                    <ListItem>
                        <ListItemIcon>
                            <Logout fontSize="medium" />
                        </ListItemIcon>
                        <ListItemText><Typography variant="h5">{t('signOutDrawer')}</Typography></ListItemText>
                    </ListItem>
                </Link>
            </List>
        </Box>
    );

    const anchor = 'left';
    return (
        <div>
            <IconButton onClick={toggleDrawer(anchor, true)}>
                <MenuIcon style={{ color: '#ff329f' }} />
            </IconButton>
            <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
            >
                {list(anchor)}
            </Drawer>
        </div>
    );
}
