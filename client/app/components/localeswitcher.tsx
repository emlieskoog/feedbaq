import { Switch } from "@mui/material";
import * as React from "react";
import "../styles/localeswitcher.css";

export default function LocaleSwitcher(props: any) {
  const { router, currentPathname, locale, query } = props;
  const isSwedish = locale === "sv";

  const handleToggleChange = () => {
    console.log(isSwedish);

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

  return (
    <div className="switchContainer">
      <img src={"/eng-flag.png"} alt="Flag 1" className="flagIcon" />
      <Switch
        color="default"
        checked={isSwedish}
        onChange={handleToggleChange}
      />
      <img src={"/swe-flag.png"} alt="Flag 2" className="flagIcon" />
    </div>
  );
}
