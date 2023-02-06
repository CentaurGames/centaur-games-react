import { BASE_URL } from "../Util/UrlHelper";
import { GAME_META_INFO, IS_ANDROID_SUNSET } from "../Util/SiteUtil";
import { IconLandingPage } from "./IconLandingPage";
import * as React from "react";
import YouTube from "react-youtube";
import Carousel from "react-bootstrap/Carousel";
import "./LandingPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SocialMediaIcons } from "./SocialMediaIcons";
import { PrivacyPolicyAboutUs } from "./PrivacyPolicyAboutUs";
import { MenuBar } from "./MenuBar";
import AppStoreImage from "./AppStoreImage.png";
import googlePlayImage from "./googlePlayImage.png";

//props:
//game: string
export function LandingPage(props) {
  const onReady = React.useCallback((event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }, []);

  const opts = React.useMemo(
    () => ({
      height: "650",
      width: "900",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
      },
    }),
    []
  );

  return (
    <div>
      {/*Menu Bars*/}
      <div>
        <MenuBar />
      </div>

      {/*Big icon*/}
      <a
        href={BASE_URL + "?pageType=game&pageName=" + props.game}
        target="_blank"
      >
        <img
          src={GAME_META_INFO[props.game].largeImageURL}
          className="large-icon"
        />
        <div className="play-game">Play Game</div>
      </a>

      {/*App Icons*/}
      <div className="app-icon">
        <a
          href={GAME_META_INFO[props.game].iosURL}
          className="ios-app-link"
          target="_blank"
          data-testid="ios-app-icon"
        >
          <img src={AppStoreImage} className="ios-app-icon" />
        </a>
        {!IS_ANDROID_SUNSET && (
          <a
            href={GAME_META_INFO[props.game].androidURL}
            className="android-app-link"
            target="_blank"
            data-testid="android-app-icon"
          >
            <img src={googlePlayImage} className="android-app-icon" />
          </a>
        )}
      </div>

      {/*Description*/}
      <div className="description-text">
        {GAME_META_INFO[props.game].description}
      </div>

      {/*YouTube*/}
      {GAME_META_INFO[props.game].youtubeLink && (
        <div className="youtube-vid">
          <YouTube
            videoId={GAME_META_INFO[props.game].youtubeLink}
            onReady={onReady}
            opts={opts}
          />
        </div>
      )}

      {/*Recommended Games Text*/}
      <div className="recommended-games-text">Other Games You May Like</div>

      {/*Recommended Games*/}
      <div className="recommended-games">
        {GAME_META_INFO[props.game].recommendedGames.map((recommendGame) => (
          <IconLandingPage key={recommendGame} game={recommendGame} />
        ))}
      </div>

      {/*Screenshot Text & Screenshot slider*/}
      {GAME_META_INFO[props.game].screenshotImages && (
        <div className="landing-page__screenshot-slider">
          <div className="screenshot-text">Screenshots From App</div>
          <Carousel indicators={false} controls={false}>
            {GAME_META_INFO[props.game].screenshotImages.map(
              (screenshotImage) => (
                <Carousel.Item key={screenshotImage}>
                  <img
                    width={450}
                    height={450}
                    src={screenshotImage}
                    className="rounded mx-auto d-block img-fluid"
                  />
                </Carousel.Item>
              )
            )}
          </Carousel>
        </div>
      )}

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
