import * as React from "react";
import {cleanup, render} from "@testing-library/react";
import { AboutUsPage } from "./AboutUsPage";

describe("AboutUsPage component", () => {
    afterEach(() => {
        cleanup();
    });

    it("displays default text", () => {
        const {getByText} = render(
            <AboutUsPage />
        );

        const firstParagraph = getByText("Centaur Games is dedicated to providing an ad-free experience", {exact: false});
        const secondParagraph = getByText("We also provide services for businesses who are seeking to expand", {exact: false});

        expect(firstParagraph).not.toBeNull();
        expect(secondParagraph).not.toBeNull();
    });
});