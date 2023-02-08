import * as React from "react";
import { slide as Menu } from "react-burger-menu";
import { IS_ANDROID_SUNSET, LIST_PAGE_META_INFO } from "../Util/SiteUtil";
import { BASE_URL } from "../Util/UrlHelper";

export function MenuHamburger() {
  return (
    <div>
      <div className="menu-hamburger-placeholder" />
      <div className="menu-hamburger">
        <Menu>
          {Object.keys(LIST_PAGE_META_INFO).filter((key) => !IS_ANDROID_SUNSET || key !== "Android").map((listPageName) => (
            <a
              href={BASE_URL + "?pageType=list&pageName=" + listPageName}
              key={listPageName}
              className="menu-bar-text"
            >
              {listPageName}
            </a>
          ))}
        </Menu>
      </div>
    </div>
  );
}
