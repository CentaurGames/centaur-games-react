import * as React from "react";
import "./SocialMediaIcons.css";
import appStoreIcon from "./appStoreIcon.png";
import twitterIcon from "./twitterIcon.png";
import youtubeIcon from "./youtubeIcon.png";
import playStoreIcon from "./playStoreIcon.png";

export function SocialMediaIcons() {
  return (
    <div>
      {/*Social Media Icons*/}
      <div className="social-media-app-icons">
        <a
          href="https://apps.apple.com/us/developer/centaur-games/id1447989301#see-all"
          className="social-media-icon__link"
          target="_blank"
        >
          <img src={appStoreIcon} className="social-media-icon__image" />
        </a>
        <a
          href="https://twitter.com/Centaur_Games"
          className="social-media-icon__link"
          target="_blank"
        >
          <img src={twitterIcon} className="social-media-icon__image" />
        </a>
        <a
          href="https://www.youtube.com/channel/UCFCI2bWotysXTIiYqowlOpA"
          className="social-media-icon__link"
          target="_blank"
        >
          <img src={youtubeIcon} className="social-media-icon__image" />
        </a>
        <a
          href="https://play.google.com/store/apps/dev?id=6265548927972932169"
          className="social-media-icon__link"
          target="_blank"
        >
          <img src={playStoreIcon} className="social-media-icon__image" />
        </a>
      </div>
    </div>
  );
}
