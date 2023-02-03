import { getBlogUrl } from "../Util/UrlHelper";
import * as React from "react";
import "./Blog.css";

export function DynamicResizingOfTheWindow() {
  return (
    <div className="blog-text">
      <p className="sub-paragraph">
        Depending on your preferences, you  may wish to have your games
        automatically fit the screen whenever the window is resized. There is a
        school of thought in web development that the user should have ultimate
        control over every aspect of a webpage - including its size - but that
        school of thought largely flies out the window when discussing a game,
        for the very practical reason that it confuses game controls with web
        page controls. For example, a swipe in a game is most likely intended to
        move the character, as opposed to causing the web page to scroll past
        the game. (This is especially true if your game is the only element on
        the page, as is the case with our games.) Likewise, some games require
        two fingers moving in unison to operate the controls: one which tells
        the character what direction to move, and one which tells the character
        what direction to shoot. Clearly these games do not want the web page
        interpreting "two fingers dragging" as zooming/shrinking the window.
      </p>
      <p className="sub-paragraph">
        For these reasons, we think it wisest to retain complete control over
        the game's size and its position on the page. Because of this, all of
        our games remain constantly centered with respect to the screen, and are
        always scaled such that they most closely fit the screen at its current
        orientation. (The user can of course change the size by rotating the
        screen 90 degrees, if on a mobile device, but any game using gyroscope
        properties should disable this feature as well. We won't cover that in
        this post as none of our games use the gyroscope events.)
      </p>
      <p className="sub-paragraph">
        This really requires two features that we must add to the game: the
        ability to resize to fit the window, and the ability to stay centered
        with respect to the screen.
      </p>
      <p className="sub-paragraph">
        <h3>Resizing to Fit the Window</h3>
        The window's width and height can be obtained (in Javascript) through{" "}
        <span style={{ color: "#00ffff" }}>window.innerWidth</span> and{" "}
        <span style={{ color: "#00ffff" }}>window.innerHeight</span>, but
        there's a catch: first you need to disable the scrollbar. Once again, we
        are assuming that the user has no use for it - after all, the game will
        appear exactly centered no matter how much they scroll it, so it is a
        useless feature to have at this point. You can enable the scrollbar, but
        your window width and height will be slightly incorrect on some devices
        and you will wind up with a scrollbar covering part of your game. Trust
        us: your users will thank you to get rid of it.
      </p>
      <p className="sub-paragraph">
        Disabling the scrollbar is accomplished through different means on
        different devices, but these three bits of code should do the trick on
        all devices:
      </p>
      <p className="sub-paragraph">
        <span style={{ color: "#00ffff" }}>
          &lt;meta name="viewport" content="width=device-width,
          user-scalable=no, minimum-scale=1.0, maximum-scale=1.0"&gt;
        </span>{" "}
        <span style={{ color: "#00ff00" }}>//above the script tag</span>
      </p>
      <p className="sub-paragraph">
        <span style={{ color: "#00ffff" }}>
          document.documentElement.style.overflow = "hidden";
        </span>{" "}
        <span style={{ color: "#00ff00" }}>//below the script tag</span>
      </p>
      <p className="sub-paragraph">
        <span style={{ color: "#00ffff" }}>document.body.scroll = "no";</span>{" "}
        <span style={{ color: "#00ff00" }}>//below the script tag</span>
      </p>
      <p className="sub-paragraph">
        Once you've gotten rid of the scrollbar, 
        <span style={{ color: "#00ffff" }}>window.innerWidth</span> and{" "}
        <span style={{ color: "#00ffff" }}>window.innerHeight </span>
        should give you the correct width and height of your screen. But be
        careful! Setting your canvases' width and height to the screen's width
        and height will typically mess up the aspect ratio of the game and will
        make it look skewed or stretched. Instead, we want to scale our canvases
        while keeping a constant aspect ratio. We will presume that you want the
        canvases to be as large as they can be while fitting inside the screen.
      </p>
      <p className="sub-paragraph">
        To accomplish this, let's first see how much we'd have to scale the
        canvas in <em>each direction </em>and compare them. We will use the
        largest canvas in our game to do so, since it is the limiting factor. 
        The <em>x</em>-scale is the screen width divided by the canvas' original
        width; the 
        <em>y</em>-scale is the screen height divided by the canvas' original
        height. The desired scale will be the 
        <em>smaller</em> of the <em>x</em>-scale and the <em>y</em>
        -scale. Why? Because any scale larger than this will cause the canvas to
        flow past the screen edge in one of the directions.
      </p>
      <p className="sub-paragraph">
        Once we have obtained the scale <em>s</em>, we simply multiply all of
        the canvases' widths and heights by this amount and round the result.
        (Remember that the widths and heights of a canvas must be integers.)
      </p>
      <p className="sub-paragraph">
        The final step we must take is to use
        <span style={{ color: "#00ffff" }}>
          {" "}
          context.scale(<em>s</em>,<em>s</em>)
        </span>{" "}
        to rescale the context (here <em>s</em> is the scale factor that we
        multiplied the canvas by). However, here you should be aware that the
        context will reset its scale every time you reset the canvas width.{" "}
        <em>
          <strong>
            Thus game developers using this method should be wary of using the
            traditional{" "}
            <span style={{ color: "#00ffff" }}>
              canvas.width = canvas.width 
            </span>
            method of clearing a canvas, and should always use{" "}
            <span style={{ color: "#00ffff" }}>clearRect</span> instead.
          </strong>
        </em>
      </p>
      <p className="sub-paragraph">
        <h3>Centering the Canvas</h3>
        Before you center your canvases, you need to do two things: use{" "}
        <span style={{ color: "#00ffff" }}>window.scrollTo(0,0)</span> to scroll
        to the top of the page, and set each canvas's top left corner to (0,0).
        Each time you center the canvas, it gets pushed down the page a little
        bit. If you do not recalibrate its top-left corner each time you center
        it, the canvas will eventually get pushed beyond the edge of the page's
        limits and you won't be able to see it.
      </p>
      <p className="sub-paragraph">
        Once you have calibrated the top-left corner of the canvas, you need to
        find the position that this top-left corner actually occupies on your
        web page. Even though you have set it to (0,0), your web page may have
        an internal lower limit that gets in the way of this. For example,
        WordPress does not allow us to put our canvases at the very top because
        that space is occupied by our menu. Thus even when we have specified
        (0,0) as the top left corner, a closer examination will reveal that our
        canvas is located somewhere else. To find its actual location, we need
        to use 
        <span style={{ color: "#00ffff" }}>getBoundingClientRect</span> and ask
        for the top left corner. The values this returns will represent the
        shift that we need to correct for later.
      </p>
      <p className="sub-paragraph">
        Upon centering our canvas, there should be just as much space above its
        top side as below its bottom side. This means that the top is located{" "}
        <span style={{ color: "#00ffff" }}>
          (window.innerHeight-canvas.height)/2
        </span>{" "}
        pixels away from the top of the page. Likewise, the left side is located{" "}
        <span style={{ color: "#00ffff" }}>
          (window.innerWidth-canvas.width)/2
        </span>{" "}
        pixels away from the left of the page. Note that both of these values
        need to be corrected by the shift we obtained previously.
      </p>
      <p className="sub-paragraph">
        The following function can be used to center a single canvas:
      </p>
      <p className="sub-paragraph">
        <div style={{ color: "#808080" }}>
          <strong>
            <em>function</em>
          </strong>{" "}
          {"centerCanvas(canvas) {"}
        </div>
        <div style={{ color: "#808080" }}>
          &nbsp;&nbsp;&nbsp;canvas.style.left = "0px";
        </div>
        <div style={{ color: "#808080" }}>
          &nbsp;&nbsp;&nbsp;canvas.style.top = "0px";
        </div>
        <div style={{ color: "#808080" }}>
          &nbsp;&nbsp;&nbsp;var rect = canvas.getBoundingClientRect();
        </div>
        <div style={{ color: "#808080" }}>
          &nbsp;&nbsp;&nbsp;var x = (window.innerWidth - canvas.width)/2;
        </div>
        <div style={{ color: "#808080" }}>
          &nbsp;&nbsp;&nbsp;x -= rect.left;
        </div>
        <div style={{ color: "#808080" }}>
          &nbsp;&nbsp;&nbsp;var y = (window.innerHeight - canvas.height)/2;
        </div>
        <div style={{ color: "#808080" }}>&nbsp;&nbsp;&nbsp;y -= rect.top;</div>
        <div style={{ color: "#808080" }}>
          &nbsp;&nbsp;&nbsp;canvas.style.left = x + "px";
        </div>
        <div style={{ color: "#808080" }}>
          &nbsp;&nbsp;&nbsp;canvas.style.top = y + "px";
        </div>
        <div style={{ color: "#808080" }}>{"}"}</div>
      </p>
      <p className="sub-paragraph">
        Note that on a mobile device, you should set a 500 ms timeout before
        centering the canvas after a resize event; failing to do so will place
        the canvas in the wrong position. Read 
        <a href={getBlogUrl("TipsForCrossPlatformCompatibilityInJavascript")}>
          here
        </a>
         for more information.
      </p>
    </div>
  );
}
