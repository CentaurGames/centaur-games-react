import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { IS_ANDROID_SUNSET, LIST_PAGE_META_INFO } from "../Util/SiteUtil";
import { BASE_URL } from "../Util/UrlHelper";
import "./Menu.css";

export default function MenuButton() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MenuIcon className="menu-icon" />
      </IconButton>
      <Menu
        className="menu-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {Object.keys(LIST_PAGE_META_INFO)
          .filter((key) => !IS_ANDROID_SUNSET || key !== "Android")
          .map((listPageName) => (
            <MenuItem>
              <a
                href={BASE_URL + "?pageType=list&pageName=" + listPageName}
                key={listPageName}
                className="menu-bar-text"
              >
                {listPageName}
              </a>
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
}
