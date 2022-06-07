import * as React from "react";
import { SocialMediaIcons } from "./SocialMediaIcons";
import { PrivacyPolicyAboutUs } from "./PrivacyPolicyAboutUs";
import { MenuBar } from "./MenuBar";
import "./AboutUsPage.css";

export class AboutUsPage extends React.Component {
  render() {
    return (
      <div>
        {/*Menu Bar*/}
        <div>
          <MenuBar />
        </div>
        <div className="about-us__intro-text">
          <p>Centaur Games is dedicated to providing an ad-free experience for those who are passionate about gaming. We strive to provide top quality games on all of the industry-leading platforms including iOS and Android, and take pride in the trust that our customers place in us knowing that we will never violate their privacy or collect their data.</p>
        </div>
        <div className="about-us__intro-text">
          <p>We also provide services for businesses who are seeking to expand their online presence, as well as individuals who would like to see their ideas come to fruition in a game, app, or website. If you think our style is a good fit for your idea, please contact us to have one of our development experts help you cultivate your game, app, or website into a profitable customer-driven venture.</p>
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
}
