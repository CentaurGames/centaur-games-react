import { BASE_URL } from "../Util/UrlHelper";
import * as React from "react";
import "./MenuBar.css";
import { IS_ANDROID_SUNSET, LIST_PAGE_META_INFO } from "../Util/SiteUtil";
import { MenuHamburger } from "./MenuHamburger";

export function MenuBar() {
  return (
    <div>
      <MenuHamburger />
      <div className="menu-bar">
        {Object.keys(LIST_PAGE_META_INFO).filter((key) => !IS_ANDROID_SUNSET || key !== "Android").map((listPageName) => (
          <a
            href={BASE_URL + "?pageType=list&pageName=" + listPageName}
            key={listPageName}
            className="menu-bar-text"
          >
            {listPageName}
          </a>
        ))}
      </div>
    </div>
  );
}
