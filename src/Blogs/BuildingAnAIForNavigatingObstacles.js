import * as React from "react";
import "./Blog.css";
import YouTube from "react-youtube";

export class BuildingAnAIForNavigatingObstacles extends React.Component {
  render() {
    const opts = {
      height: "550",
      width: "800",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    };
    return (
      <div className="blog-text">
        <p className="sub-paragraph">
          While creating <i>Brimstone</i> as a sequel to <i>Entombed</i>, our
          development team decided to make some modifications to the AI that
          makes the game work. Specifically, we wanted to improve the
          target-tracking capabilities of the game - essentially the ability of
          the character to navigate the maze in search of a target that the user
          has clicked on. This allows our users on touchscreen devices to easily
          tell the character where they want him to go, rather than being forced
          to micromanage his every move (which can be quite cumbersome on a
          small screen). This target-tracking system is showcased in the
          following video:
        </p>
        {/*YouTube*/}
        <div className="youtube-blog-vid">
          <YouTube videoId="XVAl59LLJtk" onReady={this._onReady} opts={opts} />
        </div>
        <p className="sub-paragraph">
          We first designed this system for <i>Entombed</i>, but encountered
          some basic flaws with its implementation: first, the character could
          not plan very far ahead and was easily confused by obstacles in his
          path; second, the character tended to get stuck in "oscillations" in
          which he would pace back and forth between two squares. Needless to
          say, we hoped to jettison both of these traits when creating the AI
          for the new game.
        </p>
        <p className="sub-paragraph">
          For the purpose of these algorithms, we assume that your game is
          divided (as ours were) into squares on a grid, some of which had
          obstacles and some of which did not. Squares off the grid are here
          considered to be obstacles for the sake of brevity.
        </p>
        <p className="sub-paragraph">
          <b>
            <big>How</big>
          </b>{" "}
          <b>
            <big>the</big>
          </b>{" "}
          <b>
            <i>
              <big>Entombed</big>
            </i>
          </b>{" "}
          <b>
            <big>AI</big>
          </b>{" "}
          <b>
            <big>Worked</big>
          </b>
        </p>
        <p className="sub-paragraph">
          To make the <i>Entombed</i> AI follow targets, it would simply look at
          the four squares immediately adjacent to the player (above, below, to
          the left, and to the right) and for each would find a "proxy distance"
          from that square to the target. Whichever square had the minimum proxy
          distance would be the next square the character would move to. Of
          course, once the character actually $\it \small reaches$ the target
          its AI needs to be turned off so it will stop pacing around the
          target. There are other ways to prevent this behavior, but this is the
          easiest way to accomplish it.
        </p>
        <p className="sub-paragraph">
          To make the character avoid obstacles, we chose the following as our
          proxy distance between square A and a target:
        </p>
        <ol className="sub-paragraph bulleted-list">
          <li>
            If square A is not an obstacle, the proxy distance is simply the
            distance from A to the target.
          </li>
          <li>
            If square A is an obstacle, the proxy distance is some arbitrarily
            large number (larger, though, than any actual distance in the maze -
            for our case we chose 100 tile widths, which is much larger than the
            59 tile width diagonal of our 42x42 tile maze).
          </li>
        </ol>
        <p className="sub-paragraph">
          As a first approximation, this doesn't perform that badly: the
          character will make a beeline for the target until it reaches an
          obstacle, at which point it will do its best to get around the
          obstacle. It has no real problem with one or two obstacles in its
          path, and can get around them with ease.
        </p>
        <p className="sub-paragraph">
          However, there are significant drawbacks to this method as well: too
          many obstacles clustered together will become an impenetrable barrier
          to the character's path; in addition, there are many scenarios where
          the character will get stuck oscillating between two squares that each
          have the same proxy distance.
        </p>
        <p className="sub-paragraph">
          <b>
            <big>Some</big>
          </b>{" "}
          <b>
            <big>Modifications</big>
          </b>{" "}
          <b>
            <big>to</big>
          </b>{" "}
          <b>
            <big>Improve</big>
          </b>{" "}
          <b>
            <big>the</big>
          </b>{" "}
          <b>
            <big>Algorithm</big>
          </b>
        </p>
        <p className="sub-paragraph">
          The central problem with our previous algorithm is that the AI only
          plans out one step at a time. A much better AI would plan several
          steps ahead and take note of which paths terminate in obstacles.
          Luckily, the scheme we developed above needs only some slight
          modifications to do this.
        </p>
        <p className="sub-paragraph">
          Rather than using a single proxy, let's recursively define the 
          <i>n</i>-proxy of a square as follows (here <i>n</i> is an integer):
        </p>
        <ol className="sub-paragraph bulleted-list">
          <li>
            If the square contains an obstacle, the <i>n</i>-proxy is defined as
            some number much larger than any distance in the maze.
          </li>
          <li>
            If square A is an obstacle, the proxy distance is some arbitrarily
            large number (larger, though, than any actual distance in the maze -
            for our case we chose 100 tile widths, which is much larger than the
            59 tile width diagonal of our 42x42 tile maze).
          </li>
          <li>
            If the square doesn't contain an obstacle and <i>n</i> > 0, the 
            <i>n</i>-proxy is defined by finding the (<i>n</i>-1)-proxy of each
            of the adjacent squares (top, bottom, left, right) and finding the
            minimum of their values. The <i>n</i>-proxy is then the lesser of
            this value and the square's own 0-proxy.
          </li>
        </ol>
        <p className="sub-paragraph">
          Although this is a complicated definition, it follows a very simple
          heuristic idea: the <i>n</i>-proxy of a square is the closest distance
          you can get to the target, given that you can walk <i>n</i> steps from
          that square. Note also that the proxy we were using before is the same
          as our new 0-proxy.
        </p>
        <p className="sub-paragraph">
          Armed with this recursive definition, we can create a much more
          sophisticated algorithm: at each step, the AI looks at each of the
          four adjacent squares (top, bottom, left, right) and moves to the one
          which has a minimum <i>P</i>-proxy (where <i>P</i> is a value of your
          choosing - note though that it must be the same for all four squares).
          For our game, we found that <i>P</i>-values around 3 were not good
          enough at navigating large clusters of obstacles, while <i>P</i>
          -values close to 10 slowed even desktop computers down with large
          amounts of recursion. We chose a <i>P</i>-value of 7 as this enabled
          sophisticated navigation while still running quickly even on an
          iPhone. If you are designing a game with high graphics overhead, or if
          quite a few characters in your game are using this algorithm
          simultaneously, we would suggest using a lower <i>P</i>-value.
        </p>
        <p className="sub-paragraph">
          There's still a huge problem with this algorithm, which is not obvious
          until you code it up and try it out: the character will stop precisely{" "}
          <em>P</em> steps before the target and begin oscillating! Remember
          that the <em>n</em>-proxy of a square is the closest distance you can
          get to the target, given that you can walk <em>n</em> steps from that
          square. But if my current square is <em>P</em> steps away from the
          target, and all the surrounding squares are <em>P</em> steps away from
          the target, then all of these squares will return a <em>P-</em>proxy
          of zero! This is when our algorithm breaks down, as it is incapable of
          distinguishing between these squares. This gets represented physically
          by the character oscillating back and forth between two squares of
          equal <em>P</em>-proxy.
        </p>
        <p className="sub-paragraph">
          Rather than freak out, we should recognize that this is a signal that
          we are within&nbsp;<em>P</em> steps of the target square and we can
          easily pick out a path that minimizes the number of&nbsp;
          <em>steps</em> to the target rather than minimizing some proxy. This
          can be accomplished rather similar to before, by defining the&nbsp;
          <em>n</em>-step of a square as follows:
        </p>
        <ol className="sub-paragraph bulleted-list">
          <li>
            If the square has an obstacle or <em>n</em>&nbsp;&lt; 0, the&nbsp;
            <em>n</em>-step is defined as some prohibitively huge number.
          </li>
          <li>
            If the square is the target square, the&nbsp;<em>n</em>-step is
            defined as (<em>P - n).</em>
          </li>
          <li>
            If none of these conditions hold true, find the minimum&nbsp;(
            <em>n</em>-1)-step of the adjacent squares (top, bottom, left,
            right) and return the lesser of this value and the current
            square's&nbsp;<em>n</em>-step.
          </li>
        </ol>
        <p className="sub-paragraph">
          Notice the <i>P</i>-step of a square gives the minimum number of steps
          taken to get to the target, provided that you are within&nbsp;
          <em>P</em> steps of the target.&nbsp;Now our algorithm looks as
          follows:
        </p>
        <ol className="sub-paragraph bulleted-list">
          <li>
            For each square, rank the&nbsp;<em>P</em>-proxy of each adjacent
            square.
          </li>
          <li>
            If the minimum two&nbsp;<em>P</em>-proxies are equal, rank the&nbsp;
            <em>P</em>-step of each adjacent square instead.
          </li>
          <li>
            Move to the square with the minimum&nbsp;<em>P</em>-proxy, or&nbsp;
            <em>P</em>-step, depending on which is appropriate.
          </li>
          <li>
            Repeat from step 1. End the algorithm when the target is reached.
          </li>
        </ol>
        <p className="sub-paragraph">
          Finally, all that remains to do is to remove the oscillations that
          occur when the character gets stuck between two squares of equal&nbsp;
          <em>P</em>-proxy. (With the modified program intact, these
          oscillations should only occur if the obstacle requires more than{" "}
          <em>P</em> steps to get around.) The fix couldn't be simpler: if the
          character's next square is the same as its previous square, end the
          algorithm.
        </p>
        <h5 className="sub-paragraph">
          <b>
            <big>Closing Remarks</big>
          </b>
        </h5>
        <p className="sub-paragraph">
          We hope you find this algorithm useful. Extensions of it can be used
          to create AI beyond the context of games - for example, a little
          roomba robot that whizzes about a room and avoids obstacles - provided
          that the AI has some means of mapping out its environment. Enjoy!
        </p>
      </div>
    );
  }
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}
