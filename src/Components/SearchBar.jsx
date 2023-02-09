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
      options={Object.keys(GAME_META_INFO)}
      getOptionLabel={(game) => GAME_META_INFO[game]?.name}
      renderInput={(params) => <TextField {...params} label="Search" />}
      renderOption={(props, game) => (
        <li {...props} onClick={() => {}}>
          <a href={BASE_URL + "?pageType=landing&pageName=" + game}>
            <img
              className={"search-bar-image"}
              width={50}
              height={50}
              src={GAME_META_INFO[game]?.iconImageURL}
            />
            {GAME_META_INFO[game]?.name}
          </a>
        </li>
      )}
    />
  );
}
