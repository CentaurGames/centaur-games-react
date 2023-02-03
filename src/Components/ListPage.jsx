import { BASE_URL } from "../Util/UrlHelper";
import { GAME_META_INFO, LIST_PAGE_META_INFO } from "../Util/SiteUtil";
import { Icon } from "./Icon";
import "./ListPage.css";
import * as React from "react";
import YouTube from "react-youtube";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import { SocialMediaIcons } from "./SocialMediaIcons";
import { PrivacyPolicyAboutUs } from "./PrivacyPolicyAboutUs";
import { MobileGamesListPage } from "./MobileGamesListPage";
import { MenuBar } from "./MenuBar";
import { BlogListPage } from "./BlogListPage";

export function ListPage(props) {
  const onReady = React.useCallback((event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }, []);

  if (props.name === "iOS" || props.name === "Android") {
    return <MobileGamesListPage name={props.name} />;
  }

  if (props.name === "Blog") {
    return <BlogListPage />;
  }

  const opts = React.useMemo(
    () => ({
      height: "700",
      width: "990",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
      },
    }),
    []
  );

  return (
    <div className="list-page-scroll-wrapper">
      {/*Menu Bar*/}
      <div>
        <MenuBar />
      </div>
      <div className="list-page">
        <div className="wrap-div">
          <Carousel indicators={false} controls={false}>
            <Carousel.Item>
              <img
                src={LIST_PAGE_META_INFO[props.name].sliderImageURL}
                className="carousel-icon mx-auto d-block img-fluid"
              />
            </Carousel.Item>
            {LIST_PAGE_META_INFO[props.name].games.map((gameName) => (
              <Carousel.Item key={gameName}>
                <a
                  href={BASE_URL + "?pageType=landing&pageName=" + gameName}
                  target="_blank"
                  className="icon-link"
                >
                  <img
                    src={GAME_META_INFO[gameName].iconImageURL}
                    className="carousel-icon mx-auto d-block img-fluid"
                  />
                </a>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        {LIST_PAGE_META_INFO[props.name].games.map((gameName) => (
          <Icon game={gameName} key={gameName} />
        ))}
      </div>
      {/*YouTube*/}
      <div className="youtube-vid">
        <YouTube
          videoId={LIST_PAGE_META_INFO[props.name].youtubeLink}
          onReady={onReady}
          opts={opts}
        />
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
