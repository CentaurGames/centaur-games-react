import { BASE_URL } from "../Util/UrlHelper";
import { GAME_META_INFO } from "../Util/SiteUtil";
import * as React from "react";
import "./IconLandingPage.css";

//props:
//game: string
export function IconLandingPage(props) {
  return (
    <a
      href={BASE_URL + "?pageType=landing&pageName=" + props.game}
      target="_blank"
      className="icon-link-landing-page"
      data-testid="icon-landing-page"
    >
      <img
        src={GAME_META_INFO[props.game].iconImageURL}
        className="icon-landing-page"
      />
    </a>
  );
}
