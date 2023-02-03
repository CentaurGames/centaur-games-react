import * as React from "react";
import "./Blog.css";
import YouTube from "react-youtube";

export function WrappingImagesAroundASphereInTHREE() {
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
      <div className="sub-paragraph">
        <p>
          When creating <em>Eight Ball Pool</em>, it was clear that a 2D canvas
          context wouldn't work well with making the numbered balls roll around
          the canvas. Instead, we opted to use THREE.js to create the effect,
          simply by wrapping images around a three-dimensional sphere. This
          produced the graphics showcased in the following video:
        </p>
        {/*YouTube*/}
        <div className="youtube-blog-vid">
          <YouTube videoId="aQIitNAlMSc" onReady={onReady} opts={opts} />
        </div>
        <p>
          Any game using THREE.js requires three basic elements: a{" "}
          <a href="https://threejs.org/docs/#api/en/renderers/WebGLRenderer">
            renderer
          </a>
          , a <a href="https://threejs.org/docs/#api/en/scenes/Scene">scene</a>,
          and a{" "}
          <a href="https://threejs.org/docs/#api/en/cameras/OrthographicCamera">
            camera
          </a>
          . For those games (like our pool game) utilizing a birds-eye view,
          where the sizes should not vary with distance from the camera, an
          orthographic camera should be used. The renderer must be told the
          canvas you choose to display on, and the scene often requires no
          arguments to initialize - however, you should add the camera to the
          scene once the camera is created.
        </p>
        <p>
          Once your setup is complete, simply create a new{" "}
          <a href="https://threejs.org/docs/#api/en/geometries/SphereGeometry">
            SphereGeometry
          </a>
           with which to wrap your image. You now need to load the image as a
          texture using a{" "}
          <a href="https://threejs.org/docs/#api/en/loaders/TextureLoader">
            TextureLoader
          </a>
          , whose inputs should be the image's source attribute and a function
          to execute once the texture is done loading. This function should
          create a new{" "}
          <a href="https://threejs.org/docs/#api/en/materials/MeshBasicMaterial">
            material
          </a>{" "}
          from the texture and attach it to the SphereGeometry you created
          before.
        </p>
        <p>
          One thing that we noticed which was not mentioned anywhere in the
          documentation was the fact that the images you choose to wrap can't
          just be any size. In particular, there are two rules you need to
          follow:
        </p>
        <ol className="bulleted-list">
          <li>The image width must be twice the image height.</li>
          <li>
            The image width and image height must both be powers of two (when
            measured in pixels).
          </li>
        </ol>
      </div>
    </div>
  );
}
