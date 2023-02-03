import * as React from "react";
import "./Blog.css";
import MovingShadows from "./MovingShadows.gif";

export function CreatingShadowsWhichMoveWithThePlayer() {
  return (
    <div className="blog-text">
      <div className="sub-paragraph">
        <p style={{ marginBottom: "40px" }}>
          In this post we will be simulating the following effect, in which our
          pillars cast shadows that move as the player moves. This technique is
          one we used when creating the games <em>Entombed</em> and 
          <em>Brimstone</em>.
        </p>
        <img src={MovingShadows} width="200" height="200" />
        <p style={{ marginTop: "40px" }}>
          In order to create this effect, it is enough to know how to create a
          single shadow from a single pillar. We will represent the pillar by (
          <span className="math">x</span>,<span className="math">y</span>)
          coordinates for each of its four corners, which we will assume is
          information that is available to the algorithm; we also presume that
          the algorithm is aware of the coordinates of the light source. To
          implement the algorithm, first we set up the points (
          <span className="math">
            x<sub>1</sub>
          </span>
          ,
          <span className="math">
            y<sub>1</sub>
          </span>
          ), (
          <span className="math">
            x<sub>2</sub>
          </span>
          ,
          <span className="math">
            y<sub>2</sub>
          </span>
          ), (
          <span className="math">
            x<sub>3</sub>
          </span>
          ,
          <span className="math">
            y<sub>3</sub>
          </span>
          ) and (
          <span className="math">
            x<sub>4</sub>
          </span>
          ,
          <span className="math">
            y<sub>4</sub>
          </span>
          ), which obey the following rules:
        </p>
        <ol className="bulleted-list">
          <li>
            (
            <span className="math">
              x<sub>2</sub>
            </span>
            ,
            <span className="math">
              y<sub>2</sub>
            </span>
            ) is the pillar corner which is furthest from the light source.
          </li>
          <li>
            If two of the corners are equidistant from the light source, then (
            <span className="math">
              x<sub>4</sub>
            </span>
            ,
            <span className="math">
              y<sub>4</sub>
            </span>
            ) is the pillar corner which is (tied to be) closest to the light
            source. Otherwise, (
            <span className="math">
              x<sub>4</sub>
            </span>
            ,
            <span className="math">
              y<sub>4</sub>
            </span>
            ) are both -1.
          </li>
          <li>
            (
            <span className="math">
              x<sub>1</sub>
            </span>
            ,
            <span className="math">
              y<sub>1</sub>
            </span>
            ) is the pillar corner which is second-closest to the light source.
          </li>
          <li>
            (
            <span className="math">
              x<sub>3</sub>
            </span>
            ,
            <span className="math">
              y<sub>3</sub>
            </span>
            ) is the pillar corner which is second-furthest from the light
            source.
          </li>
        </ol>
        <p>
          Before proceeding, we should address our seemingly odd choice of
          numbering for these coordinates: the answer is that the numbering on
          these coordinates tells the order required to draw the shape of our
          shadow. When filling shapes in canvas, you cannot simply pass
          coordinates in any random order: you must be sure to pass them in the
          order which you really intend.
        </p>
        <p>
          We have successfully found the coordinates which determine the 
          <em>inner boundary</em> of the shadow; now we need to find the
          coordinates which determine the 
          <em>outer boundary</em> of the shadow. These points we will call (
          <span className="math">
            u<sub>1</sub>
          </span>
          ,
          <span className="math">
            v<sub>1</sub>
          </span>
          ), (
          <span className="math">
            u<sub>2</sub>
          </span>
          ,
          <span className="math">
            v<sub>2</sub>
          </span>
          ), (
          <span className="math">
            u<sub>3</sub>
          </span>
          ,
          <span className="math">
            v<sub>3</sub>
          </span>
          ) and (
          <span className="math">
            u<sub>4</sub>
          </span>
          ,
          <span className="math">
            v<sub>4</sub>
          </span>
          ). To find them, we define a global scale factor{" "}
          <span className="math">f</span> which is the same for all pillars and
          determines how long the shadows are (a value of 0 gives no shadows,
          while a value of 1 gives infinitely long shadows). With{" "}
          <span className="math">f</span> defined, we can find our boundary
          points as follows:
        </p>
        <ol className="bulleted-list">
          <li>
            Find the vector extending from the light source to the point (
            <span className="math">
              u<sub className="non-numeric">i</sub>
            </span>
            ,
            <span className="math">
              v<sub className="non-numeric">i</sub>
            </span>
            ).
          </li>
          <li>
            Find{" "}
            <span className="math">
              r<sub className="non-numeric">i</sub>
            </span>{" "}
            and{" "}
            <span className="math">
              θ<sub className="non-numeric">i</sub>
            </span>
            , the radius and angle of this vector.
          </li>
          <li>
            Define{" "}
            <span className="math-equation">
              <span className="math">
                u<sub className="non-numeric">i</sub>
              </span>{" "}
              <span className="math-symbol">=</span>{" "}
              <span className="math">
                x<sub className="non-numeric">i</sub>
              </span>{" "}
              <span className="math-symbol">+</span>{" "}
              <span className="math">f</span>
              <span className="math">
                r<sub className="non-numeric">i</sub>
              </span>{" "}
              cos(
              <span className="math">
                θ<sub className="non-numeric">i</sub>
              </span>
              )
            </span>
          </li>
          <li>
            Let{" "}
            <span className="math-equation">
              <span className="math">
                v<sub className="non-numeric">i</sub>
              </span>{" "}
              <span className="math-symbol">=</span>{" "}
              <span className="math">
                y<sub className="non-numeric">i</sub>
              </span>{" "}
              <span className="math-symbol">+</span>{" "}
              <span className="math">f</span>
              <span className="math">
                r<sub className="non-numeric">i</sub>
              </span>{" "}
              sin(
              <span className="math">
                θ<sub className="non-numeric">i</sub>
              </span>
              )
            </span>
          </li>
          <li>
            Do the same for all of our (<span className="math">u</span>,
            <span className="math">v</span>) pairs.
          </li>
        </ol>
        <p>
          With these pairs defined, we can draw our shadow by filling in the
          region described by the following path:
        </p>
        <p>
          <span className="equation">
            (
            <span className="math">
              x<sub>1</sub>
            </span>
            ,
            <span className="math">
              y<sub>1</sub>
            </span>
            ) <span className="math-symbol">&rarr;</span> (
            <span className="math">
              u<sub>1</sub>
            </span>
            ,
            <span className="math">
              v<sub>1</sub>
            </span>
            ) <span className="math-symbol">&rarr;</span> (
            <span className="math">
              u<sub>2</sub>
            </span>
            ,
            <span className="math">
              v<sub>2</sub>
            </span>
            ) <span className="math-symbol">&rarr;</span> (
            <span className="math">
              u<sub>3</sub>
            </span>
            ,
            <span className="math">
              v<sub>3</sub>
            </span>
            ) <span className="math-symbol">&rarr;</span> (
            <span className="math">
              u<sub>4</sub>
            </span>
            ,
            <span className="math">
              v<sub>4</sub>
            </span>
            ) <span className="math-symbol">&rarr;</span> (
            <span className="math">
              x<sub>4</sub>
            </span>
            ,
            <span className="math">
              y<sub>4</sub>
            </span>
            ) <span className="math-symbol">&rarr;</span> (
            <span className="math">
              x<sub>3</sub>
            </span>
            ,
            <span className="math">
              y<sub>3</sub>
            </span>
            ) <span className="math-symbol">&rarr;</span> (
            <span className="math">
              x<sub>2</sub>
            </span>
            ,
            <span className="math">
              y<sub>2</sub>
            </span>
            ) <span className="math-symbol">&rarr;</span> (
            <span className="math">
              x<sub>1</sub>
            </span>
            ,
            <span className="math">
              y<sub>1</sub>
            </span>
            )
          </span>
        </p>
        <p>
          Note that if{" "}
          <span className="math">
            x<sub>4</sub>
          </span>{" "}
          and{" "}
          <span className="math">
            y<sub>4</sub>
          </span>{" "}
          are negative, exclude both (
          <span className="math">
            x<sub>4</sub>
          </span>
          ,
          <span className="math">
            y<sub>4</sub>
          </span>
          ) and (
          <span className="math">
            u<sub>4</sub>
          </span>
          ,
          <span className="math">
            v<sub>4</sub>
          </span>
          ) from the pathabove.
        </p>
        <p>
          There is one further caveat to be noted. Usually when drawing a shadow
          you want it to be semitransparent, but the HTML5 canvas causes
          unrealistic-looking shadows when it layers one over another. This is
          because semitransparent textures add up to make a 
          <em>less</em> transparent texture, rather than all the shadows being
          the same transparency like would be physical. To fix this, we drew our
          shadows on a separate canvas (hidden from view) in full black and then
          drew the results of this canvas onto the desired one using the{" "}
          <span className="code-snippet">drawImage</span> property (which can
          accept canvases as an argument) with a{" "}
          <span className="code-snippet">globalAlpha</span> of our desired
          transparency. We found this technique to be quite effective.
        </p>
      </div>
    </div>
  );
}
