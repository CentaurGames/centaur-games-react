import { BASE_URL } from "../Util/UrlHelper";
import { GAME_META_INFO } from "../Util/SiteUtil";
import * as React from "react";
import "./IconLandingPage.css";

//props:
//game: string
export class IconLandingPage extends React.Component {
  render() {
    return (
      <a
        href={BASE_URL + "?pageType=landing&pageName=" + this.props.game}
        target="_blank"
        className="icon-link-landing-page"
      >
        <img
          src={GAME_META_INFO[this.props.game].iconImageURL}
          className="icon-landing-page"
        />
      </a>
    );
  }
}
