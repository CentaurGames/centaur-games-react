import { getBlogUrl } from "../Util/UrlHelper";
import * as React from "react";
import "./Blog.css";
import Flames2D from "./Flames2D.gif";
import Flames3D from "./Flames3D.gif";
import RotatingCoin from "./RotatingCoin.gif";

export function AnimatingFirePart2ThreeDimensionalFlames() {
  return (
    <div className="blog-text">
      <div className="sub-paragraph">
        <p style={{ marginBottom: "40px" }}>
          In the{" "}
          <a href={getBlogUrl("AnimatingFirePart1TwoDimensionalFlames")}>
            previous post
          </a>{" "}
          we covered how to create a two-dimensional flame such as the one
          below:
        </p>
        <img src={Flames2D} width="40" height="40" />
        <p style={{ marginTop: "40px", marginBottom: "40px" }}>
          Note that the flame is seen from a side-on view, and any game
          requiring a different viewing angle will not be able to get one using
          this method alone. In this post we will expand upon our technique to
          create a three-dimensional flame like the one below:
        </p>
        <img src={Flames3D} width="40" height="40" />
        <p style={{ marginTop: "40px" }}>
          This effect is used in <em>Brimstone</em> to make the flames appear to
          come out of the page, and may be used in any birds-eye platformer
          where the objects are seen from an angle.
        </p>
        <p style={{ marginBottom: "40px" }}>
          Recall that in{" "}
          <a
            href={getBlogUrl(
              "Creating3DRotationsWithTheCanvasTransformationProperty"
            )}
          >
            this post
          </a>
           we were able to make a two-dimensional image appear to rotate in
          three dimensions, see for example the coin below:
        </p>
        <img src={RotatingCoin} width="40" height="40" />
        <p style={{ marginTop: "40px" }}>
          Note that this technique was used to make objects rotate 
          <em>over time</em>, but there is no reason that we can't perform
          several such rotations <em>all at once</em>. This is essentially the
          idea we will use to create our three-dimensional flame.
        </p>
        <p>
          With the coin, we had a constant <em>ω </em>set to 2π/
          <em>T</em>, where <em>T</em> is how long it takes the coin to rotate
          back to the same state. Here, we will create <em>N </em>fires with 
          <em>M</em> animation frames each and will set <em>ω</em> equal to 2π/
          <em>N</em>. Each <em>step</em> of the animation, we will perform 
          <em>N</em> transformations of the canvas in the same manner that we
          did the coin. Each transformation we will draw a different fire. For
          example, during the 
          <em>j</em>-th transformation of the <em>k</em>
          -th step we will draw the <em>k</em>-th animation frame of the 
          <em>j</em>-th fire. This will ensure that each fire will be animated
          at a different rotation angle, and we will essentially have rotated
          our two-dimensional fire into a three-dimensional one.
        </p>
      </div>
    </div>
  );
}
