import { getBlogUrl } from "../Util/UrlHelper";
import * as React from "react";
import { BuildingAnAIForNavigatingObstacles } from "../Blogs/BuildingAnAIForNavigatingObstacles";
import { MenuBar } from "./MenuBar";
import { BLOG_META_INFO } from "../Util/SiteUtil";
import { SocialMediaIcons } from "./SocialMediaIcons";
import { PrivacyPolicyAboutUs } from "./PrivacyPolicyAboutUs";
import { IconLandingPage } from "./IconLandingPage";
import { AnimatingFirePart1TwoDimensionalFlames } from "../Blogs/AnimatingFirePart1TwoDimensionalFlames";
import { TipsForCrossPlatformCompatibilityInJavascript } from "../Blogs/TipsForCrossPlatformCompatibilityInJavascript";
import { DynamicResizingOfTheWindow } from "../Blogs/DynamicResizingOfTheWindow";
import { TakingAdvantageOfCanvasRotations } from "../Blogs/TakingAdvantageOfCanvasRotations";
import { Creating3DRotationsWithTheCanvasTransformationProperty } from "../Blogs/Creating3DRotationsWithTheCanvasTransformationProperty";
import { CreatingAScrollingEffect } from "../Blogs/CreatingAScrollingEffect";
import { MechanicsOfBilliards } from "../Blogs/MechanicsOfBilliards";
import { CreatingAnAIWhichPlaysPool } from "../Blogs/CreatingAnAIWhichPlaysPool";
import { CreatingShadowsWhichMoveWithThePlayer } from "../Blogs/CreatingShadowsWhichMoveWithThePlayer";
import { StructureOfAnyGame } from "../Blogs/StructureOfAnyGame";
import { CreatingRealisticLookingLava } from "../Blogs/CreatingRealisticLookingLava";
import { AnimatingFirePart2ThreeDimensionalFlames } from "../Blogs/AnimatingFirePart2ThreeDimensionalFlames";
import { WrappingImagesAroundASphereInTHREE } from "../Blogs/WrappingImagesAroundASphereInTHREE";

/**
 * props:
 *      blogName: string representing the keys of the BLOG_META_INFO dictionary
 *
 */
export class BlogComponent extends React.Component {
  generateBlog() {
    switch (this.props.blogName) {
      case "BuildingAnAIForNavigatingObstacles":
        return <BuildingAnAIForNavigatingObstacles />;
      case "TipsForCrossPlatformCompatibilityInJavascript":
        return <TipsForCrossPlatformCompatibilityInJavascript />;
      case "DynamicResizingOfTheWindow":
        return <DynamicResizingOfTheWindow />;
      case "TakingAdvantageOfCanvasRotations":
        return <TakingAdvantageOfCanvasRotations />;
      case "Creating3DRotationsWithTheCanvasTransformationProperty":
        return <Creating3DRotationsWithTheCanvasTransformationProperty />;
      case "CreatingAScrollingEffect":
        return <CreatingAScrollingEffect />;
      case "MechanicsOfBilliards":
        return <MechanicsOfBilliards />;
      case "CreatingAnAIWhichPlaysPool":
        return <CreatingAnAIWhichPlaysPool />;
      case "CreatingShadowsWhichMoveWithThePlayer":
        return <CreatingShadowsWhichMoveWithThePlayer />;
      case "StructureOfAnyGame":
        return <StructureOfAnyGame />;
      case "CreatingRealisticLookingLava":
        return <CreatingRealisticLookingLava />;
      case "AnimatingFirePart1TwoDimensionalFlames":
        return <AnimatingFirePart1TwoDimensionalFlames />;
      case "AnimatingFirePart2ThreeDimensionalFlames":
        return <AnimatingFirePart2ThreeDimensionalFlames />;
      case "WrappingImagesAroundASphereInTHREE":
        return <WrappingImagesAroundASphereInTHREE />;
    }
  }

  render() {
    const blogNameArray = Object.keys(BLOG_META_INFO);
    const index = blogNameArray.indexOf(this.props.blogName);
    const nextBlogName =
      index === blogNameArray.length - 1 ? null : blogNameArray[index + 1];
    const previousBlogName = index === 0 ? null : blogNameArray[index - 1];
    return (
      <div>
        <MenuBar />
        <div className="blog-title">
          {BLOG_META_INFO[this.props.blogName].title}
        </div>
        {this.generateBlog()}
        {BLOG_META_INFO[this.props.blogName].gamesMentioned.length > 0 && (
          <div>
            <div className="recommended-games-text">
              Games Mentioned in This Post:
            </div>
            <div className="recommended-games">
              {BLOG_META_INFO[this.props.blogName].gamesMentioned.map(
                gameName => (
                  <IconLandingPage key={gameName} game={gameName} />
                )
              )}
            </div>
          </div>
        )}
        <div className="sub-paragraph">
          {nextBlogName && (
            <a className="next-blog" href={getBlogUrl(nextBlogName)}>
              Next Blog >>
            </a>
          )}
          {previousBlogName && (
            <a className="previous-blog" href={getBlogUrl(previousBlogName)}>
              {"<< Previous Blog"}
            </a>
          )}
        </div>
        <SocialMediaIcons />
        <PrivacyPolicyAboutUs />
      </div>
    );
  }
}
