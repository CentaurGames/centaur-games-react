import * as React from "react";
import { cleanup, render } from "@testing-library/react";
import { GAME_META_INFO } from "../Util/SiteUtil";
import { Icon } from "./Icon";
import { BASE_URL } from "../Util/UrlHelper";

describe("Icon component", () => {
  afterEach(() => {
    cleanup();
  });

  it.each(Object.keys(GAME_META_INFO))("displays %s properly", (gameName) => {
    const { getByTestId } = render(<Icon game={gameName} />);

    const icon = getByTestId("icon");

    expect(icon.getAttribute("href")).toEqual(
      BASE_URL + "?pageType=landing&pageName=" + gameName
    );
  });
});
