import { BASE_URL } from "../Util/UrlHelper";
import { GAME_META_INFO } from "../Util/SiteUtil";
import * as React from "react";
import "./Icon.css";

/**
 * props:
 *    game: string
 */
export function Icon(props) {
  return (
    <a
      href={BASE_URL + "?pageType=landing&pageName=" + props.game}
      target="_blank"
      className="icon-link"
      data-testid="icon"
    >
      <img src={GAME_META_INFO[props.game].iconImageURL} className="icon" />
    </a>
  );
}
