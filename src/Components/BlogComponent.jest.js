import * as React from "react";
import {cleanup, render} from "@testing-library/react";
import { BLOG_META_INFO, GAME_META_INFO } from "../Util/SiteUtil";
import { BlogComponent } from "./BlogComponent";
import { getBlogUrl } from "../Util/UrlHelper";

const blogNames = Object.keys(BLOG_META_INFO);

describe("BlogComponent component", () => {
    afterEach(() => {
        cleanup();
    });

    it.each(blogNames.map((blogName, index) => ({blogName, index})))("renders appropriate information for %s", ({blogName, index}) => {
        const {getByText, queryByText} = render(
            <BlogComponent blogName={blogName} />
        );

        const {title, gamesMentioned} = BLOG_META_INFO[blogName];
        const nextBlogName = blogNames[index + 1];
        const previousBlogName = blogNames[index - 1];

        const blogTitle = getByText(title);

        expect(blogTitle).not.toBeNull();
        
        if (nextBlogName) {
            const nextBlog = getByText("Next Blog >>");
            expect(nextBlog).not.toBeNull();
            expect(nextBlog.getAttribute("href")).toEqual(getBlogUrl(nextBlogName));
        }

        if (previousBlogName) {
            const previousBlog = getByText("<< Previous Blog");
            expect(previousBlog).not.toBeNull();
            expect(previousBlog.getAttribute("href")).toEqual(getBlogUrl(previousBlogName));
        }

        if (gamesMentioned.length) {
            const gamesMentionedInThisPost = getByText("Games Mentioned in This Post:");
            expect(gamesMentionedInThisPost).not.toBeNull();
        } else {
            const gamesMentionedInThisPost = queryByText("Games Mentioned in This Post:");
            expect(gamesMentionedInThisPost).toBeNull();
        }

        for (let i = 0; i < gamesMentioned.length; i++) {
            const game = gamesMentioned[i];
            const gameTitle = GAME_META_INFO[game].title;
            expect(gameTitle).not.toBeNull();
        }
    });
});