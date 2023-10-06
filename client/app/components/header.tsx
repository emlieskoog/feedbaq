import * as React from "react";
import { AppBar, Grid, Toolbar, Typography } from "@mui/material";

import TemporaryDrawer from "./drawer";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./localeswitcher";

export default function Header(props: any) {
  const { router, currentPathname, locale, query } = props;
  const t = useTranslations("Account");

  return (
    <AppBar
      position="relative"
      elevation={10}
      style={{
        background: "rgba(220, 220, 220, 0.7)",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar>
        <Grid container sx={{ mt: 1 }} >

          {/* Temporary drawer Large screen */}
          <Grid item xs={false} sm={false} sx={{
            display: { xs: 'none', sm: 'none', md: 'block' },
          }}>
            <TemporaryDrawer />
          </Grid>
          {/* Temporary drawer for Small screens */}
          <Grid item xs={1} sm={1} md={false} lg={false} sx={{
            display: { xs: 'block', sm: 'block', md: 'none' }
          }}  >
            <div style={{ justifyContent: 'flex-end', display: 'flex', alignItems: 'center' }}>
              <TemporaryDrawer />
            </div>
          </Grid>

          {/* HiQ Logo for Large screen */}
          <Grid item xs={false} sm={false} sx={{
            display: { xs: 'none', sm: 'none', md: 'block' },
          }}>
            <img
              src="/HiQ_logo_white.png"
              alt="HiQ Logo"
              style={{
                height: "30px",
                maxWidth: "100%",
                filter: "brightness(1) invert(1)", justifyContent: 'flex-end', display: 'flex', alignItems: 'center'
              }}
            />
          </Grid>
          {/* HiQ Logo for Small screens */}
          <Grid item xs={2} sm={2} md={false} lg={false} sx={{
            display: { xs: 'block', sm: 'block', md: 'none' }
          }}  >
            <div style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
              <img
                src="/HiQ_logo_white.png"
                alt="HiQ Logo"
                style={{
                  height: "30px",
                  maxWidth: "100%",
                  filter: "brightness(1) invert(1)", justifyContent: 'flex-end', display: 'flex', alignItems: 'center'
                }}
              />
            </div>
          </Grid>

          {/* Header for Large screen */}
          <Grid item xs={false} sm={false} md={8} lg={10} sx={{
            display: { xs: 'none', sm: 'none', md: 'block' },
          }}>
            <Typography variant="h5" component="div" sx={{ color: "#353435", ml: 2 }}>
              {t("qualityHeader")}
            </Typography>
          </Grid>
          {/* Header for small screen */}
          <Grid item xs={7} sm={7} md={false} lg={false} sx={{
            display: { xs: 'block', sm: 'block', md: 'none' }
          }}  >
            <Typography variant="h5" component="div" sx={{ color: "#353435", justifyContent: 'flex-start', display: 'flex', alignItems: 'center' }}>
              {t("qualityHeader")}
            </Typography>
          </Grid>


          {/* <Grid item xs={false} sm={false} md={6} lg={8} sx={{
            display: { xs: 'none', sm: 'none', md: 'block' },
          }}></Grid>
 */}

          {/* LocaleSwitcher for Large/Small screens */}
          <Grid item xs={false} sm={false} sx={{
            display: { xs: 'none', sm: 'none', md: 'block' },
          }}>
            <div style={{ justifyContent: 'flex-end', display: 'flex' }}>
              <LocaleSwitcher
                router={router}
                currentPathname={currentPathname}
                locale={locale}
                query={query}
              />
            </div>
          </Grid>
          <Grid item xs={2} sm={2} md={false} lg={false} sx={{
            display: { xs: 'block', sm: 'block', md: 'none' }
          }}  >
            <div style={{ justifyContent: 'flex-end', display: 'flex' }}>
              <LocaleSwitcher
                router={router}
                currentPathname={currentPathname}
                locale={locale}
                query={query}
                smallScreen
              />
            </div>
          </Grid>
        </Grid>

      </Toolbar>
    </AppBar >
  );
}
