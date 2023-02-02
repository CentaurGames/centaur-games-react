import * as React from "react";
import "./Blog.css";
import YouTube from "react-youtube";

export class TakingAdvantageOfCanvasRotations extends React.Component {
  render() {
    const opts = {
      height: "350",
      width: "700",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
      },
    };
    return (
      <div className="blog-text">
        <p className="sub-paragraph">
          Properly applied, canvas rotations can help simplify code and make
          your game run much more smoothly. Take as an example our 
          <em>Rocket Racers</em> game, in which two cars race around a circular
          racetrack. Rather than draw the cars at each location, which we deemed
          to be too cumbersome, we decided to rotate the <em>canvas</em> and
          simply draw the car at the same location relative to the canvas. This
          technique is showcased in the following video:
        </p>
        {/*YouTube*/}
        <div className="youtube-blog-vid">
          <YouTube videoId="2m4nYnKI96s" onReady={this._onReady} opts={opts} />
        </div>
        <p className="sub-paragraph">
          The process for this simple technique was as follows:
          <ul>
            <li>Translate the context to the center of the canvas.</li>
            <li>
              Rotate the context by the car's current angle around the track.
            </li>
            <li>
              Translate the context back to the top left corner of the canvas.
            </li>
          </ul>
        </p>
        <div className="sub-paragraph">
          <p>
            Note that since the car was moving in a circle around the center of
            the canvas, the center of the canvas marks the <em>axis</em> of our
            rotation, i.e. the point that we are rotating about. Whenever
            rotating the context, we should always first translate to the axis
            of rotation; after rotating, we should always translate to the
            top-left corner of the object image.
          </p>

          <p>
            As an example, let's say that we wish to draw an object whose center
            is located at point (<em>x</em>,<em>y</em>
            ), rotated by angle θ about the axis point (<em>u</em>,<em>v</em>).
            The object we wish to draw is an image of width <em>w</em> and
            height <em>h</em>.
          </p>

          <p>
            First we find the distance from the object's center to the axis of
            rotation, which we will call <em>r</em>:
          </p>

          <div style={{ color: "#808080" }}>
            <em>
              <strong>var</strong>
            </em>{" "}
            r = Math.sqrt((u-x)*(u-x) + (v-y)*(v-y));
          </div>

          <p>
            Next we translate to the axis of rotation, rotate by θ and translate
            back to the center of the object (which is a distance <em>r</em>{" "}
            above the axis of rotation in our new coordinate system).
          </p>

          <div style={{ color: "#808080" }}>context.translate(u,v);</div>
          <div style={{ color: "#808080" }}>context.rotate(θ);</div>
          <div style={{ color: "#808080" }}>context.translate(0,-r);</div>

          <p>
            Remember that we have only translated to the 
            <em>center</em> of the image, so we need to translate again to the
            top-left corner. We then draw the image at this location.
          </p>

          <div style={{ color: "#808080" }}>context.translate(-w/2.-h/2);</div>
          <div style={{ color: "#808080" }}>
            context.drawImage(objectImage,0,0);
          </div>

          <p>
            Remember that you still need to use your context for drawing other
            things, so it is smart to save and restore your context. Combining
            some steps, altogether this looks as follows:
          </p>
          <div style={{ color: "#808080" }}>context.save();</div>
          <div style={{ color: "#808080" }}>context.translate(u,v);</div>
          <div style={{ color: "#808080" }}>context.rotate(θ);</div>
          <div style={{ color: "#808080" }}>
            context.drawImage(objectImage,-w/2,-h/2-r);
          </div>
          <div style={{ color: "#808080" }}>context.restore();</div>

          <p>
            In addition to <em>Rocket Racers</em>, we have also used this
            technique to make the cue follow the mouse around in our pool games,
            and we similarly used it to make the bubble canon follow the cursor
            in 
            <em>Bubble Shooter</em>. In pool, the axis of rotation was simply
            the tip of the cue and in 
            <em>Bubble Shooter</em> it was the center of the canon. In both
            cases the angle was determined by the angle from the cursor's
            location to the axis of rotation.
          </p>
        </div>
      </div>
    );
  }
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}
