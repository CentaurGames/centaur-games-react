import * as React from "react";
import { SocialMediaIcons } from "./SocialMediaIcons";
import { PrivacyPolicyAboutUs } from "./PrivacyPolicyAboutUs";
import { MenuBar } from "./MenuBar";
import "./AboutUsPage.css";

export class PrivacyPolicyPage extends React.Component {
  render() {
    return (
      <div>
        {/*Menu Bar*/}
        <div>
          <MenuBar />
        </div>
        <div> 
        <p className="about-us__intro-text">We at Centaur Games never use your personal information for anything - ever! In fact, none of our games gather any information from your device at all. There is one small caveat: since we have enabled Google Analytics on our website, every time you visit our page we are informed by Google that we received a visitor from your local area; it also tells us how long you stayed on our website. At the end of each month, we receive a bundle of information from Google telling us that we received x number of visitors and they were located in A, B, and C cities. None of that information is sold to outside companies, nor is it used to advertise to you (we don't advertise products). Instead, all of that information is used to determine what types of games are popular and which ones we should produce next.</p>
        <p className="about-us__intro-text">If you are using our apps, whether iOS or Android, it should be noted that the bit about Google Analytics doesn't apply to you. None of our apps collect information of any kind.</p>
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
