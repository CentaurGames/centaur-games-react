import * as React from "react";
import "./Blog.css";
import ScrollingWater from "./ScrollingWater.gif";

export function CreatingAScrollingEffect() {
  return (
    <div className="blog-text">
      <div className="sub-paragraph">
        <p style={{ marginBottom: "40px" }}>
          In this post we will create an effect which mimics flowing water as
          follows:
        </p>
        <img src={ScrollingWater} width="150" height="150" />
        <p style={{ marginTop: "40px" }}>
          Note that this effect can also be used to create the appearance of a
          background scrolling past such as the tree in <em>Chicken Wings</em>,
          and is used to create both the water in <em>Entombed</em> and the lava
          in 
          <em>Brimstone</em>.
        </p>
        <p>
          The concept is simple: take an image, double it in the vertical
          direction, and use
          <span className="code-snippet">context.drawImage</span> to pull
          snapshots from it. The steps are as follows:
        </p>
        <ol className="bulleted-list">
          <li>
            Create an image called the <em>basis image</em>. Its width 
            <em>w</em> and its height <em>h </em>should be the width and height
            of the desired canvas.
          </li>
          <li>
            Create a second image{" "}
            <span className="code-snippet">scrollImage</span> of width 
            <em>w</em> and height 2<em>h</em>. The upper half of this image is a
            duplicate of the basis image, and the lower half of this image is
            also a duplicate of the basis image.
          </li>
          <li>
            Declare a variable <em>y</em> which keeps track of the scrolling.
            Initialize it to 0.
          </li>
          <li>
            Create a function <span className="code-snippet">scroll()</span>{" "}
            which does the following:
          </li>
        </ol>
        <ul className="bulleted-list">
          <li>Clears the canvas.</li>
          <li>
            Clips a canvas-sized rectangle out of the scrollImage at location
            (0,<em>y</em>):
            <div className="code-block">
              context.drawImage(scrollImage,0,y,canvas.width,canvas.height,0,0,canvas.width,canvas.height);
            </div>
          </li>
          <li>
            Increments <em>y</em> and uses modulus to ensure it is bound between
            0 and the canvas height:
            <div className="code-block">
              <div>y++;</div>
              <div>y %= canvas.height;</div>
            </div>
          </li>
        </ul>
        Once the <em>scroll</em> function is created, call it periodically
        within a <span className="code-snippet">setInterval</span> event.
      </div>
    </div>
  );
}
