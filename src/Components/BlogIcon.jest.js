import * as React from "react";
import {cleanup, render} from "@testing-library/react";
import { BlogIcon } from "./BlogIcon";
import { BLOG_META_INFO } from "../Util/SiteUtil";
import { getBlogUrl } from "../Util/UrlHelper";

describe("BlogIcon component", () => {
    afterEach(() => {
        cleanup();
    });

    it.each(Object.keys(BLOG_META_INFO))("displays %s correctly", (blogName) => {
        const {getByText} = render(
            <BlogIcon blogName={blogName} />
        );

        const {title} = BLOG_META_INFO[blogName];
        const iconTitle = getByText(title);
        const link = iconTitle.parentElement.parentElement;
        
        expect(iconTitle).not.toBeNull();
        expect(link.getAttribute("href")).toEqual(getBlogUrl(blogName));
    });
});