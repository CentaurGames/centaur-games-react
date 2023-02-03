import * as React from "react";
import { cleanup, render } from "@testing-library/react";
import { BlogListPage } from "./BlogListPage";
import { BLOG_META_INFO } from "../Util/SiteUtil";

describe("BlogListPage component", () => {
  afterEach(() => {
    cleanup();
  });

  it("displays correctly", () => {
    const { getByText } = render(<BlogListPage />);

    for (const blogName in BLOG_META_INFO) {
      const { title } = BLOG_META_INFO[blogName];
      const blogTitle = getByText(title);
      expect(blogTitle).not.toBeNull();
    }
  });
});
