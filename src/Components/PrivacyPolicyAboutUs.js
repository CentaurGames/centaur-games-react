import { BASE_URL } from "../Util/UrlHelper";
import * as React from "react";
import "./PrivacyPolicyAboutUs.css";

export class PrivacyPolicyAboutUs extends React.Component {
  render() {
    return (
      <div className="privacy-policy">
        <div className="privacy-policy-about-us">
          {/*Privacy Policy*/}
          <div>
            <a
              href={BASE_URL + "?pageType=privacy"}
              className="privacy-policy-link"
              target="_blank"
            >
              PRIVACY POLICY
            </a>
          </div>
          {/*About Us*/}
          <div>
            <a
              href={BASE_URL + "?pageType=about"}
              className="privacy-policy-link"
              target="_blank"
            >
              ABOUT US
            </a>
          </div>
        </div>
        {/*Sub Text*/}
        <div className="tech-support">
          Questions? Contact us at tech.support@centaurgamesonline.com.
          Copyright © 2022 Centaur Games.
        </div>
      </div>
    );
  }
}
