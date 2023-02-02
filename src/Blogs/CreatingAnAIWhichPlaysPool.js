import { getBlogUrl } from "../Util/UrlHelper";
import * as React from "react";
import "./Blog.css";
import YouTube from "react-youtube";
import BlogAIPic3 from "./BlogAIPic3.png";

export class CreatingAnAIWhichPlaysPool extends React.Component {
  render() {
    const opts = {
      height: "550",
      width: "800",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
      },
    };
    return (
      <div className="blog-text">
        {/*YouTube*/}
        <div className="youtube-blog-vid">
          <YouTube videoId="aQIitNAlMSc" onReady={this._onReady} opts={opts} />
        </div>
        <div className="sub-paragraph">
          <p>
            In this blog post we will discuss how to develop an AI which can
            play pool against an opponent. For simplicity we will start with a
            simple AI and then modify it into a more sophisticated AI.
          </p>
          <div>
            To create a simple AI the steps are as follows:
            <ul>
              <li>
                Find the distance between each ball and its closest pocket.
              </li>
              <li>Find the ball that lies closest to a pocket.</li>
              <li>
                Point the cue straight towards the center of the ball and hit
                it.
              </li>
            </ul>
          </div>
          <p>
            As we can see, the above AI has a big disadvantage and is not very
            optimal, in that it cannot aim the ball towards the pocket - it can
            only hit the ball straight-on. To make this AI more sophisticated,
            we need it to aim at a pocket.
          </p>
        </div>
        <p className="sub-paragraph">
          In the 
          <a href={getBlogUrl("MechanicsOfBilliards")}>previous post</a>
           we found that when the cue ball hits a ball at rest, the second ball
          will move in the direction which separates their centers. Thus if we
          want the ball to move towards the pocket, we need the centers to align
          with the displacement vector which points to the pocket. This can be
          accomplished by finding the displacement vector from the pocket to the
          ball in question, and aiming for a spot along that vector. Note that
          when the cue ball and the ball are colliding, they will be exactly one
          ball diameter apart, so the point we want to aim for is along the
          ball-to-pocket displacement vector, and separated from the ball by a
          full diameter.
        </p>
        <div className="sub-paragraph">
          <div>
            To create a more sophisticated AI the steps are as follows:
            <ul>
              <li>
                Proceed the same as before by creating a function that finds the
                ball that is closest to a pocket.
              </li>
              <li>Find the closest pocket.</li>
              <li>
                Find the displacement vector from the center of the pocket to
                the center of the ball and extend it by one ball diameter.
              </li>
              <li>
                Aim the center of the cue ball at the point found in 3. (See
                picture below.)
              </li>
            </ul>
            &nbsp;
          </div>
          <img className="blog-image" src={BlogAIPic3} />
        </div>
      </div>
    );
  }
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}
