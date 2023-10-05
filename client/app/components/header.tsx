import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TemporaryDrawer from "./drawer";
import { useTranslations } from 'next-intl';
import LocaleSwitcher from "./localeswitcher";

export default function Header(props: any) {
  const { router, currentPathname, locale } = props;

  const t = useTranslations('Account');

  return (
    <AppBar position="relative" elevation={10} style={{ background: 'rgba(220, 220, 220, 0.7)', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <Toolbar>
        <TemporaryDrawer />
        <img
          src="/HiQ_logo_white.png"
          alt="HiQ Logo"
          style={{
            height: "35px", marginLeft: "15px", marginRight: "15px",
            filter: "brightness(1) invert(1)",
          }}
        />
        <Typography variant="h5" component="div" sx={{ flexGrow: 1, color: '#353435' }}>
          {t('qualityHeader')}
        </Typography>
        <LocaleSwitcher router={router} currentPathname={currentPathname} locale={locale} />
      </Toolbar>
    </AppBar >
  );
}
