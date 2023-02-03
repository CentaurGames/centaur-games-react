import { GAME_META_INFO, LIST_PAGE_META_INFO } from "../Util/SiteUtil";
import * as React from "react";
import { SocialMediaIcons } from "./SocialMediaIcons";
import { PrivacyPolicyAboutUs } from "./PrivacyPolicyAboutUs";
import "./MobileGamesListPage.css";
import { MenuBar } from "./MenuBar";

/**
 * props:
 *    name: string
 */
export class MobileGamesListPage extends React.Component {
  render() {
    const mobileUrl = this.props.name === "Android" ? "androidURL" : "iosURL";
    return (
      <div>
        {/*Menu Bar*/}
        <div>
          <MenuBar />
        </div>
        <div className="mobile-games">
          {LIST_PAGE_META_INFO[this.props.name].games.map((gameName) => (
            <a
              href={GAME_META_INFO[gameName][mobileUrl]}
              key={gameName}
              target="_blank"
              className="mobile-games__link"
              data-testid="mobile-games-icon"
            >
              <img
                src={GAME_META_INFO[gameName].appImageURL}
                className="mobile-games__image"
              />
            </a>
          ))}
        </div>
        {/*Social Media Icons*/}
        <div>
          <SocialMediaIcons />
        </div>
        {/*Privacy Policy About Us*/}
        <div>
          <PrivacyPolicyAboutUs />
        </div>
      </div>
    );
  }
}
