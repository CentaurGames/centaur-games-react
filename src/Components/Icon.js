import { BASE_URL } from "../Util/UrlHelper";
import { GAME_META_INFO } from "../Util/SiteUtil";
import * as React from "react";
import "./Icon.css";

/**
 * props:
 *    game: string
 */
export class Icon extends React.Component {
  render() {
    return (
      <a
        href={BASE_URL + "?pageType=landing&pageName=" + this.props.game}
        target="_blank"
        className="icon-link"
      >
        <img
          src={GAME_META_INFO[this.props.game].iconImageURL}
          className="icon"
        />
      </a>
    );
  }
}
