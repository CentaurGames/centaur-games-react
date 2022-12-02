import { getBlogUrl } from "../Util/UrlHelper";
import * as React from "react";
import "./Blog.css";
import LavaImage from "./LavaImage.png";
import JuliaSet from "./JuliaSet.png";
import TreeScreenshot from "./TreeScreenshot.png";

export class CreatingRealisticLookingLava extends React.Component {
  render() {
    return (
      <div className="blog-text">
        <div className="sub-paragraph">
          <p>
            In this post we will be discussing creating a realistic-looking lava
            effect, as seen in 
            <em>Brimstone</em> and displayed below:
          </p>
          <p>
            <img src={LavaImage} width="300" height="268" />
          </p>
          <p>
            In order to create this we start with a basic fractal pattern: that
            of a 
            <a href="https://en.wikipedia.org/wiki/Julia_set">Julia set</a>
             whose complex parameter is <em>c</em> = 0 + <em>i</em>. This
            fractal looks as follows when displayed in red:
          </p>

          <img src={JuliaSet} width="120" height="118" />

          <p>
            This gives us a great image of a "crack" to base all the rest of our
            image on. Now we simply create a canvas of whatever size we want,
            give it a black background, and draw this image thousands of times
            at random locations on the canvas and rotated at random angles. (See{" "}
            <a href={getBlogUrl("TakingAdvantageOfCanvasRotations")}>
              this post
            </a>
             to find out more about drawing images at different angles on the
            canvas.) That's all there is to it! A surprisingly simple yet
            effective way to create a realistic-looking lava effect.
          </p>

          <p>
            This same method can be applied to create other effects which rely
            heavily on tendrils or cracks; for example, simply making the Julia
            set green instead of red gave us a great moss-like texture for the
            tree in the 
            <em>Chicken Wings</em> games:
          </p>

          <img src={TreeScreenshot} width="235" height="260" />
        </div>
      </div>
    );
  }
}
