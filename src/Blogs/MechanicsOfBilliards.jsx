import { getBlogUrl } from "../Util/UrlHelper";
import * as React from "react";
const Latex = require("react-latex");
import "./Blog.css";
import YouTube from "react-youtube";

export function MechanicsOfBilliards() {
  const onReady = React.useCallback((event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }, []);

  const opts = React.useMemo(
    () => ({
      height: "550",
      width: "800",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
      },
    }),
    []
  );

  return (
    <div className="blog-text">
      <p className="sub-paragraph">
        In the&nbsp;
        <a href={getBlogUrl("CreatingAnAIWhichPlaysPool")}>next post</a> we are
        going to develop an AI which can play pool against an opponent; in order
        to do that, we first need to establish the mathematics of pool. This
        post will lay out the physics of billiard balls in as simple of a way as
        possible. There will be no code in this post. For simplicity, we will
        focus only on two pool balls colliding elastically without the presence
        of friction - a realistic enough scenario for any game. The techniques
        presented in this blog are showcased in the video below:
      </p>
      {/*YouTube*/}
      <div className="youtube-blog-vid">
        <YouTube videoId="aQIitNAlMSc" onReady={onReady} opts={opts} />
      </div>
      <p className="sub-paragraph">
        <Latex>
          Since our pool balls are confined to move along the plane of the table
          (i.e. they aren't floating through the air), they have freedom to move
          in two dimensions. In addition, we have the good fortune that the
          balls are the same mass, which simplifies some calculations.
        </Latex>
      </p>
      <p className="sub-paragraph">
        <Latex>
          Let's say that before the collision Ball 1 is moving with some
          velocity $\vec \mathit v_1$, while Ball 2 is moving with some velocity
          $\vec \mathit v_2$. These velocities can point anywhere in the plane
          of the table. In addition, immediately before the collision let's
          label a vector $\vec \mathit d$ which points from the center of Ball 1
          to the center of Ball 2.&nbsp;
        </Latex>
      </p>
      <p className="sub-paragraph">
        <Latex>
          After the collision, Ball 1 has velocity $\vec \mathit u_1$ and Ball 2
          has velocity $\vec \mathit u_2$. Since the balls have not yet moved
          immediately after the collision, the same vector $\vec \mathit d$
          points from the center of Ball 1 to the center of Ball 2.&nbsp;
        </Latex>
      </p>
      <p className="sub-paragraph">
        <Latex>
          The first thing we will do, to simplify our equations, is move to a
          special reference frame where one of the balls (we will pick Ball 2)
          is initially at rest. This means that we are pretending that we are
          moving alongside Ball 2 so that it appears at rest with respect to us;
          in practice, this is equivalent to making the following substitution
          for the velocities:&nbsp;
        </Latex>
      </p>
      <p className="sub-paragraph latex-block">
        <Latex>
          $$\vec \mathit w_1 = \vec \mathit v_1 - \vec \mathit v_2$$
        </Latex>
      </p>
      <p className="sub-paragraph latex-block">
        <Latex>$$\vec \mathit w_2 = 0$$</Latex>
      </p>
      <p className="sub-paragraph latex-block">
        <Latex>
          $$\vec \mathit s_1 = \vec \mathit u_1 - \vec \mathit v_2$$
        </Latex>
      </p>
      <p className="sub-paragraph latex-block">
        <Latex>
          $$\vec \mathit s_2 = \vec \mathit u_2 - \vec \mathit v_2 $$
        </Latex>
      </p>
      <p className="sub-paragraph">
        <Latex>
          Here the $\vec \mathit w$ vectors represent the balls before the
          collision, and the $\vec \mathit s$ vectors represent the balls after
          the collision. Note that all of the laws of physics we are used to are
          still upheld in this frame of reference, and we can switch back to our
          $\vec \mathit v$ and $\vec \mathit u$ values after the dust settles.
        </Latex>
      </p>
      <p className="sub-paragraph">From conservation of momentum we have</p>
      <p className="sub-paragraph latex-block">
        <Latex>
          $$\mathit m \vec \mathit w_1 + 0 = m \vec \mathit s_1 + \mathit m \vec
          \mathit s_2$$
        </Latex>
      </p>
      <p className="sub-paragraph">which can be rearranged as</p>
      <p className="sub-paragraph latex-block">
        <Latex>
          $$\vec \mathit s_1 = \vec \mathit w_1 - \vec \mathit s_2$$
        </Latex>
      </p>
      <p className="sub-paragraph">
        Next we apply conservation of kinetic energy (we are presuming an
        elastic collision) to get
      </p>
      <p className="sub-paragraph latex-block">
        <Latex>
          $$\frac 1 2 \mathit m \mathit w_1^2 + 0 = \frac 1 2 \mathit m \mathit
          s_1^2 + \frac 1 2 \mathit m \mathit s_2^2$$
        </Latex>
      </p>
      <p className="sub-paragraph">which can be rearranged to get</p>
      <p className="sub-paragraph latex-block">
        <Latex>$$\mathit s_1^2 = \mathit w_1^2 - \mathit s_2^2$$</Latex>
      </p>
      <p className="sub-paragraph latex-block">
        <Latex>
          $$\vec \mathit s_1 \cdot \vec \mathit s_1 = \vec \mathit w_1 \cdot
          \vec \mathit w_1 - \vec \mathit s_2 \cdot \vec \mathit s_2$$
        </Latex>
      </p>
      <p className="sub-paragraph">
        <Latex>
          Substituting our previous expression for $\vec \mathit s_1$, we have
        </Latex>
      </p>
      <p className="sub-paragraph latex-block">
        <Latex>
          $$(\vec \mathit w_1 - \vec \mathit s_2) \cdot (\vec \mathit w_1 - \vec
          \mathit s_2) = \vec \mathit w_1 \cdot \vec \mathit w_1 - \vec \mathit
          s_2 \cdot \vec \mathit s_2$$
        </Latex>
      </p>
      <p className="sub-paragraph latex-block">
        <Latex>
          $$\vec \mathit w_1 \cdot \vec \mathit w_1 - 2 \vec \mathit w_1
          \cdot \vec \mathit s_2 + \vec \mathit s_2 \cdot \vec \mathit s_2
          = \vec \mathit w_1 \cdot \vec \mathit w_1 - \vec \mathit s_2 \cdot
          \vec \mathit s_2$$
        </Latex>
      </p>
      <p className="sub-paragraph latex-block">
        <Latex>
          $$\vec \mathit w_1 \cdot \vec \mathit s_2 - \vec \mathit s_2 \cdot
          \vec \mathit s_2 = 0$$
        </Latex>
      </p>
      <p className="sub-paragraph latex-block">
        <Latex>
          $$\vec \mathit s_2 \cdot \left( \vec \mathit w_1 - \vec \mathit s_2
          \right) = 0 $$
        </Latex>
      </p>
      <p className="sub-paragraph">
        <Latex>
          Hence $\vec \mathit w_1 - \vec \mathit s_2 $ is perpendicular to
          $ \vec \mathit s_2$. So far we have used three conservation equations
          (two components of momentum and one component of kinetic energy), but
          we have four components to solve for. Thus to uniquely solve for them,
          we need a fourth conservation equation. For this we will use
          conservation of angular momentum.&nbsp;
        </Latex>
      </p>
      <p className="sub-paragraph">
        <Latex>
          To simplify as much as possible, we will choose our axis of rotation
          to be perpendicular to the plane of the table and passing through the
          center of Ball 1. We will ignore the spin of the ball and will instead
          represent angular momentum by the expression $m \vec \mathit v \times
          \vec \mathit r$, where $\vec \mathit v$ is the velocity of the ball in
          question and $\vec \mathit r$ is the displacement vector from the ball
          to the axis of rotation. Since Ball 1 is located on the axis of
          rotation, $\vec \mathit r$ is zero for Ball 1 both before and after
          the collision; hence its angular momentum is zero in both cases.
          Likewise, in our reference frame Ball 2 is initially at rest - hence
          its angular momentum is also zero before the collision. Thus there is
          only one angular momentum term, which is from Ball 2 after the
          collision:&nbsp;
        </Latex>
      </p>
      <p className="sub-paragraph latex-block">
        <Latex>$$0 + 0 = 0 + m \vec \mathit s_2 \times \vec \mathit d$$</Latex>
      </p>
      <p className="sub-paragraph latex-block">
        <Latex>$$\vec \mathit s_2 \times \vec \mathit d = 0 $$</Latex>
      </p>
      <p className="sub-paragraph">
        <Latex>
          This implies that $\vec \mathit s_2$ is parallel to the vector $\vec
          \mathit d$ which points from the center of Ball 1 to the center of
          Ball 2. (It could also be antiparallel mathematically, but this would
          be an unphysical solution in which Ball 2 would pass through Ball 1.
          This sort of solution occurs due to the quadratic terms in the kinetic
          energy, which have two roots.)&nbsp;
        </Latex>
      </p>
      <p className="sub-paragraph">
        <Latex>
          Before we continue, we should make an important note that will be of
          great use when making our AI in the next post: if Ball 2 is initially
          at rest (which is the reference frame we are dealing with here), then
          after the collision Ball 2 will move in the direction of the
          displacement vector $\vec \mathit d$ which points from the center of
          Ball 1 to the center of Ball 2.&nbsp;
        </Latex>
      </p>
      <p className="sub-paragraph">
        <Latex>
          Earlier, we proved that $\vec \mathit w_1 - \vec \mathit s_2$ is
          perpendicular to $\vec \mathit s_2$. Since we have now proved
          that $\vec \mathit s_2$ is parallel with $\vec \mathit d$, it follows
          that $\vec \mathit w_1 - \vec \mathit s_2$ is perpendicular to $\vec
          \mathit d$. Hence their dot product must be zero:&nbsp;
        </Latex>
      </p>
      <p className="sub-paragraph latex-block">
        <Latex>
          $$\vec \mathit d \cdot ( \vec \mathit w_1 - \vec \mathit s_2) = 0$$
        </Latex>
      </p>
      <p className="sub-paragraph latex-block">
        <Latex>
          $$\vec \mathit s_2 \cdot \vec \mathit d = \vec \mathit w_1 \cdot \vec
          \mathit d$$
        </Latex>
      </p>
      <p className="sub-paragraph latex-block">
        <Latex>
          Since $\vec \mathit s_2$ is parallel with $\vec \mathit d$, it follows
          that $\vec \mathit s_2 \cdot \vec \mathit d = \mathit s_2 \mathit
          d$:&nbsp;
        </Latex>
      </p>
      <p className="sub-paragraph latex-block">
        <Latex>
          $$\mathit s_2 \mathit d = \vec \mathit w_1 \cdot \vec \mathit d$$
        </Latex>
      </p>
      <p className="sub-paragraph latex-block">
        <Latex>
          {
            "$$\\mathit s_2 = \\frac {1} {\\mathit d} \\vec \\mathit w_1 \\cdot \\vec \\mathit d$$"
          }
        </Latex>
      </p>
      <p className="sub-paragraph">
        <Latex>
          {
            "We also can easily see that $$\\vec \\mathit s_2 = \\frac {\\mathit s_2} {\\mathit d} \\vec \\mathit d$$ Summing all of our results, the following equations completely determine the velocities of the balls after the collision:"
          }
        </Latex>
      </p>
      <p className="sub-paragraph  latex-block">
        <Latex>
          $$\vec \mathit w_1 = \vec \mathit v_1 - \vec \mathit v_2$$
        </Latex>
      </p>
      <p className="sub-paragraph latex-block">
        <Latex>
          {
            "$$\\mathit s_2 = \\frac {1} {\\mathit d} \\vec \\mathit w_1 \\cdot \\vec \\mathit d$$"
          }
        </Latex>
      </p>
      <p className="sub-paragraph latex-block">
        <Latex>
          {
            "$$\\vec \\mathit s_2 = \\frac {\\mathit s_2} {\\mathit d} \\vec \\mathit d$$"
          }
        </Latex>
      </p>
      <p className="sub-paragraph latex-block">
        <Latex>
          &nbsp; $$\vec \mathit s_1 = \vec \mathit w_1 - \vec \mathit s_2$$
        </Latex>
      </p>
      <p className="sub-paragraph latex-block">
        <Latex>
          &nbsp; $$\vec \mathit u_1 = \vec \mathit s_1 + \vec \mathit v_2$$
        </Latex>
      </p>
      <p className="sub-paragraph latex-block">
        <Latex>
          &nbsp; $$\vec \mathit u_2 = \vec \mathit s_2 + \vec \mathit v_2$$
        </Latex>
      </p>
      <p className="sub-paragraph">
        <Latex>
          In case you have forgotten our conventions, the $\vec \mathit v$
          vectors are the velocities of the balls before the collisions, the
          $\vec \mathit u$ vectors are the velocities of the balls after the
          collisions, and $\vec \mathit d$ is the displacement vector which
          separates their centers before the collision.
        </Latex>
      </p>
    </div>
  );
}
