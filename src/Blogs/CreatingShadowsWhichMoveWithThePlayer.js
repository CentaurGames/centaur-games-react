import * as React from "react";
import "./Blog.css";
import MovingShadows from "./MovingShadows.gif";

export class CreatingShadowsWhichMoveWithThePlayer extends React.Component {
  render() {
    return (
      <div className="blog-text">
        <div className="sub-paragraph">
          <p style={{ marginBottom: "40px" }}>
            In this post we will be simulating the following effect, in which
            our pillars cast shadows that move as the player moves. This
            technique is one we used when creating the games <em>Entombed</em>{" "}
            and <em>Brimstone</em>.
          </p>
          <img src={MovingShadows} width="200" height="200" />
          <p style={{ marginTop: "40px" }}>
            In order to create this effect, it is enough to know how to create a
            single shadow from a single pillar. We will represent the pillar by
            (<em>x</em>,<em>y</em>) coordinates for each of its four corners,
            which we will assume is information that is available to the
            algorithm; we also presume that the algorithm is aware of the
            coordinates of the light source. To implement the algorithm, first
            we set up the points (<em>x1</em>,<em>y1</em>), (<em>x2</em>,
            <em>y2</em>), (<em>x3</em>,<em>y3</em>) and (<em>x4</em>,<em>y4</em>
            ), which obey the following rules:
          </p>
          <ol className="bulleted-list">
            <li>
              (<em>x2</em>,<em>y2</em>) is the pillar corner which is furthest
              from the light source.
            </li>
            <li>
              If two of the corners are equidistant from the light source, then
              (<em>x4</em>,<em>y4</em>) is the pillar corner which is (tied to
              be) closest to the light source. Otherwise, (<em>x4</em>,
              <em>y4</em>) are both -1.
            </li>
            <li>
              (<em>x1</em>,<em>y1</em>) is the pillar corner which is
              second-closest to the light source.
            </li>
            <li>
              (<em>x3</em>,<em>y3</em>) is the pillar corner which is
              second-furthest from the light source.
            </li>
          </ol>
          <p>
            Before proceeding, we should address our seemingly odd choice of
            numbering for these coordinates: the answer is that the numbering on
            these coordinates tells the order required to draw the shape of our
            shadow. When filling shapes in Javascript, you cannot simply pass
            coordinates in any random order: you must be sure to pass them in
            the order which you really intend.
          </p>
          <p>
            We have successfully found the coordinates which determine the 
            <em>inner boundary</em> of the shadow; now we need to find the
            coordinates which determine the <em>outer boundary</em> of the
            shadow. These points we will call (<em>u1</em>,<em>v1</em>), (
            <em>u2</em>,<em>v2</em>), (<em>u3</em>,<em>v3</em>) and (<em>u4</em>
            ,<em>v4</em>). To find them, we define a global scale factor 
            <em>f </em>which is the same for all pillars and determines how long
            the shadows are (a value of 0 gives no shadows, while a value of 1
            gives infinitely long shadows). With <em>f</em> defined, we can find
            our boundary points as follows:
          </p>
          <ol className="bulleted-list">
            <li>
              Find the vector extending from the light source to the point (
              <em>u</em>
              <em>1</em>,<em>v1</em>).
            </li>
            <li>
              Find <em>r</em>
              <em>1</em> and <em>θ1</em>, the radius and angle of this vector.
            </li>
            <li>
              Define <em>u1</em> = <em>x1</em> + <em>f</em> <em>r1</em> cos(
              <em>θ1</em>)
            </li>
            <li>
              Let <em>v1</em> = <em>y1</em> + <em>f r1 </em>sin(<em>θ1</em>)
            </li>
            <li>
              Do the same for all of our (<em>u</em>,<em>v</em>) pairs.
            </li>
          </ol>
          <p>
            With these pairs defined, we can draw our shadow by filling in the
            region described by the following path:
          </p>
          <p>
            (<em>x1</em>,<em>y1</em>) -&gt; (<em>u1</em>,<em>v1</em>) -&gt; (
            <em>u2</em>,<em>v2</em>) -&gt; (<em>u3</em>,<em>v3</em>) -&gt; (
            <em>u4</em>,<em>v4</em>) -&gt; (<em>x4</em>,<em>y4</em>) -&gt; (
            <em>x3</em>,<em>y3</em>) -&gt; (<em>x2</em>,<em>y2</em>) -&gt; (
            <em>x1</em>,<em>y1</em>)
          </p>
          <p>
            Note that if <em>x4</em> and <em>y4</em> is negative, exclude both (
            <em>x4</em>,<em>y4</em>) and (<em>u4</em>,<em>v4</em>) from the path
            above.
          </p>
          <p>
            There is one further caveat to be noted. Usually when drawing a
            shadow you want it to be semitransparent, but the HTML5 canvas
            causes unrealistic-looking shadows when it layers one over another.
            This is because semitransparent textures add up to make a 
            <em>less</em> transparent texture, rather than all the shadows being
            the same transparency like would be physical. To fix this, we drew
            our shadows on a separate canvas (hidden from view) in full black
            and then drew the results of this canvas onto the desired one using
            the <span style={{ color: "#00ccff" }}>drawImage</span> property
            (which can except canvases as an argument) with a globalAlpha of our
            desired transparency. We found this technique to be quite effective.
          </p>
        </div>
      </div>
    );
  }
}
