import { Switch, FormControlLabel, Box, CircularProgress } from "@mui/material";
import * as React from "react";
import "../styles/localeswitcher.css";

export default function LocaleSwitcher(props: any) {
  const { router, currentPathname, locale, query, smallScreen } = props;
  const isSwedish = locale === "sv";

  const handleToggleChange = () => {

    const newLocale = !isSwedish ? "sv" : "en";

    const urlParams = new URLSearchParams(query);

    if (urlParams.has("id")) {
      router.replace(`/account/formdetails?id=${urlParams.get("id")}`, {
        locale: newLocale,
      });
    } else {
      // If idForm is null, update the locale and navigate to the current pathname
      router.push(currentPathname, { locale: newLocale });
    }


  };

  const getFlagImage = () => {
    return isSwedish ? "/eng-flag.png" : "/swe-flag.png";
  };
  return (
    smallScreen ? (
      <FormControlLabel
        control={
          <Switch
            color="default"
            checked={!isSwedish}
            onChange={handleToggleChange}
            inputProps={{ 'aria-label': 'language switch' }}
            icon={<img src={getFlagImage()} alt="Flag" className="flagIcon" />}
            checkedIcon={<img src={getFlagImage()} alt="Flag" className="flagIcon" />}
          />
        }
        label=""
        labelPlacement="start"
      />) : (
      <div className="switchContainer">
        <img src={"/eng-flag.png"} alt="Flag 1" className="flagIcon" />
        <Switch
          color="default"
          checked={isSwedish}
          onChange={handleToggleChange}
        />
        <img src={"/swe-flag.png"} alt="Flag 2" className="flagIcon" />
      </div>)
  );

}
