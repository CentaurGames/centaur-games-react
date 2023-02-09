import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { GAME_META_INFO } from "../Util/SiteUtil";
import "./SearchBar.css";
import { BASE_URL } from "../Util/UrlHelper";

export function SearchBar() {
  return (
    <Autocomplete
      className="search-bar"
      disablePortal
      id="combo-box-demo"
      options={Object.keys(GAME_META_INFO)}
      sx={{ width: 300, color: "white" }}
      renderInput={(params) => <TextField {...params} label="Search" />}
      renderOption={(props, game) => (
        <li {...props} onClick={() => {}}>
          <a href={BASE_URL + "?pageType=landing&pageName=" + game}>
            <img
              className={"search-bar-image"}
              width={50}
              height={50}
              src={GAME_META_INFO[game].iconImageURL}
            />
            {GAME_META_INFO[game].name}
          </a>
        </li>
      )}
    />
  );
}
