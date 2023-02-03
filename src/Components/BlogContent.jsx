import React from "react";
import { BuildingAnAIForNavigatingObstacles } from "../Blogs/BuildingAnAIForNavigatingObstacles";
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

export function BlogContent(props) {
  switch (props.blogName) {
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
  return <></>;
}
