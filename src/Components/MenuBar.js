import { BASE_URL } from "../Util/UrlHelper";
import * as React from "react";
import "./MenuBar.css";
import { LIST_PAGE_META_INFO } from "../Util/SiteUtil";
import { MenuHamburger } from "./MenuHamburger";

export class MenuBar extends React.Component {
  render() {
    return (
      <div>
        <MenuHamburger />
        <div className="menu-bar">
            {Object.keys(LIST_PAGE_META_INFO).map(listPageName => (
                <a href={BASE_URL + "?pageType=list&pageName=" + listPageName} key={listPageName} className="menu-bar-text">
                    {listPageName}
                </a>
            ))}
        </div>
      </div>
    );
  }
}

