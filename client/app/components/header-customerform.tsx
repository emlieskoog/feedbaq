import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./localeswitcher";

export default function HeaderCustomerForm(props: any) {
  const { router, currentPathname, locale } = props;

  const t = useTranslations("Account");

  return (
    <AppBar position="relative">
      <Toolbar>
        <img
          src="/HiQ_logo_white.png"
          alt="HiQ Logo"
          style={{ height: "35px", marginLeft: "15px", marginRight: "15px" }}
        ></img>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          {t("qualityHeader")}
        </Typography>
        <LocaleSwitcher
          router={router}
          currentPathname={currentPathname}
          locale={locale}
        />
      </Toolbar>
    </AppBar>
  );
}
