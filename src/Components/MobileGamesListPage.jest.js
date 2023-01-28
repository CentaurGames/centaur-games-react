import * as React from "react";
import {cleanup, render} from "@testing-library/react";
import { GAME_META_INFO, LIST_PAGE_META_INFO } from "../Util/SiteUtil";
import { MobileGamesListPage } from "./MobileGamesListPage";

describe("MobileGamesListPage component", () => {
    afterEach(() => {
        cleanup();
    });

    it("displays Android correctly", () => {
        const {getAllByTestId} = render(
            <MobileGamesListPage name="Android" />
        );

        const {games} = LIST_PAGE_META_INFO.Android;

        const iconUrls = getAllByTestId("mobile-games-icon").map(icon => icon.getAttribute("href"));

        expect(games.length).toEqual(iconUrls.length);

        for (let i = 0; i < games.length; i++) {
            const url = GAME_META_INFO[games[i]].androidURL;
            expect(iconUrls.includes(url)).toBe(true);
        }
    });

    it("displays iOS correctly", () => {
        const {getAllByTestId} = render(
            <MobileGamesListPage name="iOS" />
        );

        const {games} = LIST_PAGE_META_INFO.iOS;

        const iconUrls = getAllByTestId("mobile-games-icon").map(icon => icon.getAttribute("href"));

        expect(games.length).toEqual(iconUrls.length);

        for (let i = 0; i < games.length; i++) {
            const url = GAME_META_INFO[games[i]].iosURL;
            expect(iconUrls.includes(url)).toBe(true);
        }
    });
});