import { getBlogUrl } from "../Util/UrlHelper";
import * as React from "react";
import "./Blog.css";

export function StructureOfAnyGame() {
  return (
    <div className="blog-text">
      <div className="sub-paragraph">
        <p>
          In this blog post we will discuss the basic structure of any game. Any
          game can be broken down into six simple steps: image loading,
          rendering, setting event listeners, setting timing intervals, resizing
          the canvas, and loading the audio files.
        </p>
        <p>Here are some simple rules you can follow to structure your game:</p>
        <ol className="bulleted-list">
          <li>
            <em>Load Images</em>: You should have URLs (or Data URLs) with which
            to load your images. Each image should be given two properties: an 
            <a href="https://www.w3schools.com/jsref/prop_img_src.asp">
              src
            </a>{" "}
            ("source") which is the URL to load it from, and an{" "}
            <a href="https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XUL/Attribute/image.onload">
              onload
            </a>
             which is the name of the function that should be called once the
            image is done loading. Each image's{" "}
            <a href="https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XUL/Attribute/image.onload">
              onload
            </a>{" "}
            property should call the loader function of the next image in the
            sequence, and only when all images are done loading should any
            rendering take place. This is to prevent errors caused by using{" "}
            <a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage">
              drawImage
            </a>{" "}
            with an image that doesn't yet exist.
          </li>
          <li>
            <em>Render Images</em>: Create a function that renders everything
            you want to display on the Canvas. Generally, this function will
            have no inputs and no return type.
          </li>
          <li>
            <em>Set Event Listeners</em>: Any events that are controlled by the
            user should be declared in this function. For those if you who are
            not familiar with{" "}
            <a href="https://www.w3schools.com/jsref/met_element_addeventlistener.asp">
              event listeners
            </a>
            , they are extremely useful when developing games. An event listener
            calls a function whenever some event occurs - e.g. when the user
            clicks the mouse or presses a key.
          </li>
          <li>
            <em>Set Timing Intervals</em>: Any dynamic event that is not
            controlled by the user needs to be called by{" "}
            <a href="https://www.w3schools.com/jsref/met_win_setinterval.asp">
              setInterval
            </a>
            . It executes a function at specified time intervals (in
            milliseconds). Make sure you set all the timing intervals for the
            game before you proceed any further.
          </li>
          <li>
            <em>Rescale and Center Canvas</em>: See our{" "}
            <a href={getBlogUrl("DynamicResizingOfTheWindow")}>previous post</a>
             for more detail regarding this topic.
          </li>
          <li>
            <em>Audio</em>: It's best to load your{" "}
            <a href="https://developer.mozilla.org/en-US/docs/Web/API/AudioContext">
              audio
            </a>
             at the start of the game unless the user is on an iOS device. For
            iOS devices, please see our 
            <a
              href={getBlogUrl("TipsForCrossPlatformCompatibilityInJavascript")}
            >
              previous post
            </a>
             for more details. In all cases, you should keep track of global
            variables which tell whether or not your audio is loaded, in order
            to avoid playing audio that does not yet exist.
          </li>
        </ol>
      </div>
    </div>
  );
}
