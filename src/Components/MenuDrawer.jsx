import React from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { IS_ANDROID_SUNSET, LIST_PAGE_META_INFO } from "../Util/SiteUtil";
import { BASE_URL } from "../Util/UrlHelper";
import "./MenuButton.css";

export default function MenuDrawer() {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = React.useCallback(() => setIsOpen(!isOpen), [isOpen]);

  return (
    <div>
      <IconButton onClick={toggle}>
        <MenuIcon className="menu-icon" />
      </IconButton>
      <Drawer
        className="menu-button"
        anchor="left"
        open={isOpen}
        onClose={toggle}
      >
        {Object.keys(LIST_PAGE_META_INFO)
          .filter((key) => !IS_ANDROID_SUNSET || key !== "Android")
          .map((listPageName) => (
            <a
              href={BASE_URL + "?pageType=list&pageName=" + listPageName}
              key={listPageName}
              className="menu-bar-text"
            >
              {listPageName}
            </a>
          ))}
      </Drawer>
    </div>
  );
}
