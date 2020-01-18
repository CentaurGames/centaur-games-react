import * as React from "react";
import { SocialMediaIcons } from "./SocialMediaIcons";
import { PrivacyPolicyAboutUs } from "./PrivacyPolicyAboutUs";
import { MenuBar } from "./MenuBar";
import "./AboutUsPage.css";
import chrisImage from "./chrisImage.png";
import priyaImage from "./priyaImage.png";

export class AboutUsPage extends React.Component {
  render() {
    return (
      <div>
        {/*Menu Bar*/}
        <div>
          <MenuBar />
        </div>
        <div>
            <div className="about-us__intro-text">
                <p> The idea for Centaur Games was first formed seven years ago, when Christopher Brown and Priyanjoli Mukherjee met in grad school. Unable to make the company a reality at the time, the idea largely lay dormant until January 2017 when they formed a general partnership and came up with a simple mission statement: free games with no ads and no data tracking. Over the next year and a half they secured funds for the company and created enough games to establish a "proof of concept", before officially rolling out the website in June of 2018. Since then they have added dozens of games to the website and have branched out into both iOS apps and Android apps.</p>
            </div>
            <div className="about-us__head-shot">
                <img src={chrisImage} className="about-us__image" />
                <p className="about-us__text" >Christopher Ryan Brown’s first venture into making games started in the seventh grade, with a terrible PONG game developed for a TI-83 graphing calculator. Despite its awful graphics, he soon developed a love for programming and spent nearly two decades as an amateur hobbyist before deciding to form a company with Priyanjoli Mukherjee and pursue his passion on a professional level. Although he has helped in the design of every game at Centaur Games, he is most proud of his work creating the moving shadows and target-tracking AI in the Entombed and Brimstone games.</p>
            </div>
            <div className="about-us__head-shot">
                <img src={priyaImage} className="about-us__image" />
                <p className="about-us__text" >Priyanjoli Mukherjee’s passion for programming was first ignited by a research project in astrophysics while pursuing a graduate degree in Physics. After spending several years creating passion projects in various forms of software development, she discovered she had a knack for creating apps on several platforms. While she has made great contributions to all of our games, we found her physics background particularly helpful when creating hyper-realistic ball collisions and 3D vector rotations in Pool Champions.</p>
            </div>
            <div className="about-us__bottom-text">
                <p>The headshot graphics for this page were created by Pranjoli Das-Mukherjee.</p>
            </div>
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
