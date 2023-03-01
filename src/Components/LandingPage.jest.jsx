import * as React from "react";
import { cleanup, render } from "@testing-library/react";
import { GAME_META_INFO, IS_ANDROID_SUNSET } from "../Util/SiteUtil";
import { LandingPage } from "./LandingPage";
import { BASE_URL } from "../Util/UrlHelper";

describe("LandingPage component", () => {
  afterEach(() => {
    cleanup();
  });

  it.each(Object.keys(GAME_META_INFO))("displays %s correctly", (gameName) => {
    const { getByText, getByTestId, queryByText, queryAllByTestId } = render(
      <LandingPage game={gameName} />
    );

    const { iosURL, androidURL, recommendedGames, screenshotImages } =
      GAME_META_INFO[gameName];

    const playGame = getByText("Play Game");
    expect(playGame.parentElement.getAttribute("href")).toEqual(
      BASE_URL + "?pageType=game&pageName=" + gameName
    );

    if (iosURL) {
      const iosIcon = getByTestId("ios-app-icon");
      expect(iosIcon.getAttribute("href")).toEqual(iosURL);
    }

    if (androidURL && !IS_ANDROID_SUNSET) {
      const androidIcon = getByTestId("android-app-icon");
      expect(androidIcon.getAttribute("href")).toEqual(androidURL);
    }

    if (recommendedGames.length) {
      const otherGames = getByText("Other Games You May Like");
      expect(otherGames).not.toBeNull();
    } else {
      const otherGames = queryByText("Other Games You May Like");
      expect(otherGames).toBeNull();
    }

    const recommendedGameUrls = queryAllByTestId("icon-landing-page").map(
      (icon) => icon.getAttribute("href")
    );
    expect(recommendedGameUrls.length).toEqual(recommendedGames.length);

    for (let i = 0; i < recommendedGames.length; i++) {
      const url =
        BASE_URL + "?pageType=landing&pageName=" + recommendedGames[i];
      expect(recommendedGameUrls.includes(url)).toBe(true);
    }

    if (screenshotImages) {
      const screenshotsFromApp = getByText("Screenshots From App");
      expect(screenshotsFromApp).not.toBeNull();
    }
  });
});
