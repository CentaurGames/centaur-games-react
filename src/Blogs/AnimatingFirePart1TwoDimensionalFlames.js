import { getBlogUrl } from "../Util/UrlHelper";
import * as React from "react";
import "./Blog.css";
import Flames2D from "./Flames2D.gif";

export class AnimatingFirePart1TwoDimensionalFlames extends React.Component {
  render() {
    return (
      <div className="blog-text">
         <div className="sub-paragraph">
            <p style={{marginBottom: "40px"}}>In this post we will create two-dimensional flames like the one below:</p>
            <img src={Flames2D} width="40" height="40" />
            <p style={{marginTop: "40px"}}>Before we can create a roaring fire, we first need to define how a single <em>flame </em>behaves. For our purposes, a single flame is defined uniquely by four properties: <em>x0</em>, <em>y0</em>, <em>v0</em> and <em>θ</em>. From these four defining properties, in addition to a globally-defined angular dispersion <em>φ</em> and flame height <em>h</em> both of which are the same for all flames, we can define some other useful variables as follows:</p>                 
            <ol className="bulleted-list">
                <li>Each flame has four points, consisting of (<em>x</em>,<em>y</em>) coordinate pairs, which will change over the course of the animation. These points will be called Left, Right, Top and Bottom.</li>
                <li>The Bottom point is initially set to (<em>x0</em>,<em>y0</em>).</li>
                <li>The Left point is initially set to (<em>x0 + </em>0.5 <em>h</em> cos (<em>θ</em> - φ) , <em>y</em><em>0 + </em>0.5 <em>h</em> sin (<em>θ</em> - φ)).</li>
                <li>The Right point is initially set to (<em>x0 + </em>0.5 <em>h</em> cos (<em>θ</em> + φ) , <em>y</em><em>0 + </em>0.5 <em>h</em> sin (<em>θ</em> + φ)).</li>
                <li>The Top point is initially set to (<em>x0</em> + <em>h</em> cos<em>θ</em> , <em>y0</em> + <em>h</em> sinθ).</li>
                <li>All four points have an associated velocity, which is initially set to (<em>v0</em> cos<em>θ</em> , <em>v0</em> sin<em>θ</em>) for all four.</li>
            </ol>
            <p>In addition, we define  an attraction force <em>A</em> which has constant magnitude but points left everywhere to the right of <em>x0</em>, and points right everywhere to the left of <em>x0</em>. We used a value of 2 for the magnitude of <em>A</em>, for a 20x20 canvas. We also used <em>h</em> = 5 and <em>φ</em> = 30°.</p>
            <p>We <em>step forward</em> a single point on the flame by performing the following actions:</p>
            <ol className="bulleted-list">
                <li>Add the attraction force <em>A</em> to the point's velocity.</li>
                <li>Add the velocity to the position of the point.</li>
            </ol>
            <p>We step forward the <em>entire </em>flame by doing the following:</p>
            <ol className="bulleted-list">
                <li>If the Top point is not in the bottom quarter of the canvas, we step forward the Left, Right, and Bottom points.</li>
                <li>If the Top point is in the top half of the canvas, we step it forward with a 50% probability and we <em>pin</em> it with a 50% probability. Pinning the Top point means that it will no longer be available for stepping forward.</li>
            </ol>
            <p>Every time we step forward the flame, we render it by doing the following:</p>
            <ol className="bulleted-list">
                <li>Create a <a href="https://www.w3schools.com/tags/canvas_createradialgradient.asp">radial gradient</a> centered at the Bottom point, with inner radius 0 and outer radius 2 <em>h</em>.</li>
                <li>Color stop 0 should be yellow and color stop 1 should be red.</li>
                <li>Set the <a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle">fill style</a> to the gradient you just created.</li>
                <li>Create a path and move to the Bottom point.</li>
                <li>Use a <a href="https://www.w3schools.com/tags/canvas_beziercurveto.asp">Bezier curve</a> to move to the Top point, using the Left point for both of the control points.</li>
                <li>Use a Bezier curve to  move back to the Bottom point, using the Right point for both of the control points.</li>
                <li>Close the path and fill it.</li>
            </ol>
            <h5><b><big>Creating the Fire</big></b></h5>
            <p>Now that we have successfully created a single flame from the variables (<em>x0</em>,<em>y0</em>,<em>v0</em>,<em>θ</em>), we can move on to creating an entire fire. To do so, we will need three new variables: (<em>u</em>,<em>η,N</em>). Note that <em>u</em> represents the maximum speed of flames coming out of it, <em>η</em> is the average angular dispersion of the flames, and <em>N</em> is the number of flames that are added per step. To generate the above animation, we used values of <em>u</em> = 5, <em>η</em> = 30°, and <em>N</em> = 10. With these new values, we do the following for each new flame added to the fire:</p>
            <ol className="bulleted-list">
                <li>Set <em>x0</em> to half the canvas width and set <em>y0</em> to the canvas height.</li>
                <li>Set <em>v0</em> to a random value between 0 and <em>u</em>.</li>
                <li>Generate a random number <em>r</em> between 0 and 1, and let <em>θ</em> = <em>r η +</em> (<em>π - η</em>)/2</li>
            </ol>
            <p>To step forward the fire a single time, create <em>N</em> flames of these specifications and add them to the current list of flames. Then step forward all of the flames in the list.</p>
            <p>It should be noted that the fire will start small and will quickly grow large, so if you want to store a few images of the flame and cycle through them for an animation (as we did) you will notice that the flame will keep changing size every time it cycles. We recommend running the fire through a few paces, allowing it grow to its full size, before storing its images. This will give a flame of constant size.</p>
            <p>This technique will create a realistic-looking fire in two dimensions. In the <a href={getBlogUrl("AnimatingFirePart2ThreeDimensionalFlames")}>next post</a> we will use canvas transformations to make the fire look three-dimensional, a technique that was used to great effect in  the game <em>Brimstone</em>.</p>
        </div>
      </div>
    );
  }
}
