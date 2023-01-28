import * as React from "react";
import { cleanup, render } from "@testing-library/react";
import { LIST_PAGE_META_INFO } from "../Util/SiteUtil";
import { ListPage } from "./ListPage";
import { BASE_URL } from "../Util/UrlHelper";

describe("ListPage component", () => {
  afterEach(() => {
    cleanup();
  });

  it.each(
    Object.keys(LIST_PAGE_META_INFO).filter(
      pageName => !["iOS", "Android", "Blog"].includes(pageName)
    )
  )("displays %s correctly", pageName => {
    const { getAllByTestId } = render(<ListPage name={pageName} />);

    const { games } = LIST_PAGE_META_INFO[pageName];

    const iconUrls = getAllByTestId("icon").map(icon =>
      icon.getAttribute("href")
    );

    expect(games.length).toEqual(iconUrls.length);

    for (let i = 0; i < games.length; i++) {
      const url = BASE_URL + "?pageType=landing&pageName=" + games[i];
      expect(iconUrls.includes(url)).toBe(true);
    }
  });
});
