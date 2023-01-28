import * as React from "react";
import { cleanup, render } from "@testing-library/react";
import { GAME_META_INFO } from "../Util/SiteUtil";
import { IconLandingPage } from "./IconLandingPage";
import { BASE_URL } from "../Util/UrlHelper";

describe("IconLandingPage component", () => {
  afterEach(() => {
    cleanup();
  });

  it.each(Object.keys(GAME_META_INFO))("displays %s correctly", gameName => {
    const { getByTestId } = render(<IconLandingPage game={gameName} />);

    const icon = getByTestId("icon-landing-page");

    expect(icon.getAttribute("href")).toEqual(
      BASE_URL + "?pageType=landing&pageName=" + gameName
    );
  });
});
