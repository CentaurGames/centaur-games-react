import { getBlogUrl } from "../Util/UrlHelper";
import * as React from "react";
import "./Blog.css";
import RotatingCoin from "./RotatingCoin.gif";

export function Creating3DRotationsWithTheCanvasTransformationProperty() {
  return (
    <div className="blog-text">
      <div className="sub-paragraph">
        <p>
          In our 
          <a href={getBlogUrl("TakingAdvantageOfCanvasRotations")}>last post</a>
           we discussed how you can use the canvas rotation property to create
          interesting effects in your Javascript games; today we will be
          extending this a bit to create realistic rotations in 3D. Examples of
          this effect include the rotating coins in <em>Entombed</em>, 
          <em>Brimstone</em>, <em>Rocket Racers 2</em> and 
          <em>Volcano Frenzy</em>, the rotating heiroglyph at the end of each
          level in <em>Entombed</em>, and the tumbling tracks that fall into the
          cavern in 
          <em>Volcano Frenzy</em>. In addition to making objects rotate, it can
          be used to give 3D depth to 2D objects such as the flames in 
          <em>Brimstone</em> (we will talk more about this in a{" "}
          <a href={getBlogUrl("AnimatingFirePart2ThreeDimensionalFlames")}>
            later post
          </a>
          ).
        </p>
        <p>
          Before we begin, we should make it clear that this method is not a
          full substitute for 3D graphics; rather, it is a neat little hack
          which can trick your 2D context into rendering 3D effects.
        </p>
        <h5>
          <b>
            <big>Rotation Matrices</big>
          </b>
        </h5>
        <p>
          Once you start mucking about with three-dimensional rotations, you
          need to start using rotation matrices or your graphics will start to
          pick up some unphysical traits (this is technically called torqueless
          precession, and it looks super weird).
        </p>
        <p>
          There are three basic rotation matrices, found 
          <a href="https://en.wikipedia.org/wiki/Rotation_matrix#Basic_rotations">
            here
          </a>
          , and each one represents rotation in a different direction. Rather
          than keeping track of an angle for our object, we will be keeping
          track of an entire rotation matrix. Initially that matrix will be set
          to the 3x3 identity, but every time it rotates we will multiply it by
          the appropriate matrix. For example: if our object rotates by
          angles <span className="math">η</span>, <span className="math">θ</span>, and <span className="math">φ</span> in the <span className="math">x</span>, 
          <span className="math">y</span> and <span className="math">z</span> directions respectively, then its rotation
          matrix should be multiplied by the corresponding elemental rotation
          matrix for each of these directions: <span className="math">R</span> = <span className="math">Z</span>(<span className="math">φ</span>)
          <span className="math">Y</span>
          (<span className="math">θ</span>)
          <span className="math">X</span>(<span className="math">η</span>)<span className="math">R</span>
          . Note that the elemental rotation matrices should always be
          multiplied in the same order every time, and they should always be
          multiplied to the left of the rotation matrix <span className="math">R</span>.
        </p>
        <p>
          The beauty of this is that once we have a rotation matrix <span className="math">R</span>,
          we can input it directly into the canvas using the{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/transform">
            transform
          </a>{" "}
          property as follows:
        </p>
        <div className="code-block">
          context.transform(R[0][0],R[1][0],R[0][1],R[1][1],R[0][2],R[1][2]);
        </div>
        <p>
          Just as with rotations, we first need to transform to an axis of
          rotation.
        </p>
        <h5>
          <b>
            <big>Causing an Image to Rotate out of the Page</big>
          </b>
        </h5>
        <p style={{ marginBottom: "60px" }}>
          The effect we are going to create here is the one depicted with the
          rotating coin below:
        </p>
        <img src={RotatingCoin} width="40" height="40" />
        <p style={{ marginTop: "60px" }}>
          To create this effect, we did the following simple steps:
        </p>
        <ul className="bulleted-list">
          <li>
            We gave the coin a rotation matrix initialized to the identity.
          </li>
          <li>
            With each step we multiplied the rotation matrix by three elemental
            rotations.
          </li>
          <li>
            To render each step, we translated to the center of the canvas,
            passed the rotation matrix to the{" "}
            <span className="code-snippet">context.transform</span>{" "}
            property, and transformed back.
          </li>
        </ul>
        <p>
          Note that aside from the transformation step, everything else is quite
          similar to the rotations we did in our 
          <a href={getBlogUrl("TakingAdvantageOfCanvasRotations")}>
            previous post
          </a>
          .
        </p>
        <p>
          How did we know what rotations to pass the coin in order to make it
          spin in that exact fashion? That required a small amount of vector
          math.
        </p>
        <p>
          If the coin were pointing <em>straight</em> out of the page, its
          angular velocity would point completely in the negative <span className="math">y</span>{" "}
          direction. If we rotate this vector by <span className="math">θ</span> in the <span className="math">x</span> and <span className="math">φ</span> in
          the <span className="math">y</span>, such that it points slightly out of the page but we
          can still view its side, the components of its angular velocity will
          be:
        </p>
        <p className="math-equation"><span className="math">ω<sub>x</sub></span> <span className="math-symbol">=</span> <span className="math-symbol">&minus;</span><span className="math">ω</span> <span className="math-symbol">&times;</span> sin(<span className="math">θ</span>) <span className="math-symbol">&times;</span> sin(<span className="math">φ</span>)</p>
        <p className="math-equation"><span className="math">ω<sub>y</sub></span> <span className="math-symbol">=</span> <span className="math-symbol">&minus;</span><span className="math">ω</span> <span className="math-symbol">&times;</span> cos(<span className="math">θ</span>)</p>
        <p className="math-equation"><span className="math">ω<sub>z</sub></span> <span className="math-symbol">=</span> <span className="math-symbol">&minus;</span><span className="math">ω</span> <span className="math-symbol">&times;</span> sin(<span className="math">θ</span>) <span className="math-symbol">&times;</span> cos(<span className="math">φ</span>)</p>
        <p>
          With each step we then rotate the coin by the angles (<span className="math">ω<sub>x</sub></span>,<span className="math">ω<sub>y</sub></span>,<span className="math">ω<sub>z</sub></span>). The
          angular speed <span className="math">ω</span> determines how fast the coin rotates (we used 5
          degrees per 30 milliseconds), and the angles <span className="math">θ</span> and <span className="math">φ</span> determine where
          its axis points (we used -50 and -20 degrees, respectively).
        </p>
      </div>
    </div>
  );
}
