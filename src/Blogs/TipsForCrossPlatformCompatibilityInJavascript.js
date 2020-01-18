import { getBlogUrl } from "../Util/UrlHelper";
import * as React from "react";
import "./Blog.css";

export class TipsForCrossPlatformCompatibilityInJavascript extends React.Component {
  render() {
    return (
      <div className="blog-text">
        <p className="sub-paragraph">
          It's a great feeling when you finish designing a Javascript game for desktop and see how smoothly your vision was executed. It's also a terrible feeling when you test out your game on a mobile device and realize that the performance is slow or glitchy, or that the game controls suffer from a lack of fluidity.  This post won't run the full gamut of issues that a mobile device might encounter; however, it will cover many of the issues that we found when designing <em>our</em> games.
        </p>
        <p className="sub-paragraph">
          <h3>Sound Issues on iOS</h3>
            Apple's iOS software has certain policies in place that make it so you can only load audio once a user clicks on something, so you the developer need to keep that in mind if you want to have sound in your game. Here are a few tips that might help with this process:
        </p>
        <p>
        <ul className="sub-paragraph bulleted-list">
          <li>Each audio file needs its own loading function, which should be called directly by the touchstart event handler.</li>
          <li>Each audio file should also have its own global variable, which tells whether its loading function has already been called. A well-placed if statement can prevent the loading function from being unnecessarily called multiple times, which both wastes computing resources and can cause audio files to play in glitchy ways (if the audio files start playing as soon as loading is complete).</li>
          <li>Additionally, each audio file should have another global variable which tells whether the file has finished loading. This prevents the sound effect from being played if it is not done loading yet.</li>
          <li>If your game doesn't use touchstart events - for example, if it uses gyroscope events to make objects move around - you will need to concoct a reason for the user to touch the screen. We suggest adding a "play" button at the beginning of the game.</li>
        </ul>
        </p>
        <p className="sub-paragraph">
          <h3>Problems Resizing Windows</h3>
            Every time the window gets resized, our games automatically detect the new size of the window and adjust the canvases appropriately. We then center the canvas with respect to the screen. While the first step works fine on all systems, the centering step does not - we have found that mobile devices of all kinds have a problem finding where to put the canvas. It seems there is a slight delay in which the mobile device has not yet changed some internal variables, and we need to wait for it to do so. We have found that a timeout of 500 milliseconds (half a second) before centering the canvas fixes the problem.
        </p>
        <p className="sub-paragraph">
          <h3>Slow Performance</h3>
            If your game is playing slowly on a mobile device, the first thing you should check is that it's actually your code slowing down the device. Make sure to disable low battery mode, and if on an iOS device go to Settings &gt; General &gt; Accessibility &gt; Reduce Motion &gt; Off.
        </p>
        <p className="sub-paragraph">
          If the slow performance still persists, your game is taxing too much of the device's CPU. There is no quick-and-easy way to fix this problem, but you might want to <a href="https://blog.pocketcitygame.com/optimizations-for-html-and-js-game-development/">check out this blog</a> (the section on culling out-of-bounds entities is particularly useful if you have a lot of AIs simultaneously running in a game).
        </p>
        <p className="sub-paragraph">
          <h3>Designing Games with Mobile Devices in Mind</h3>
            Many of these problems can be avoided if you design a game <em>specifically</em> for mobile devices. Take as an example <em>Entombed</em>, which we designed initially for desktop, as compared to its mobile-inspired sequel <em>Brimstone</em>.
        </p>
        <p className="sub-paragraph">
          When creating the mobile version of <em>Entombed</em>, we found that some of its intrinsic features made gameplay more difficult for a mobile system. Each level had dozens of monsters whose AIs slowed down performance, and navigating a maze turned out to be far too cumbersome when the character had to be told each individual step. Without a keyboard, the character's movements were initially controlled by swipes - but swiping hundreds of times for a single level can quickly get irritating for a user.
        </p>
        <p className="sub-paragraph">
          To fix the latter problem, we implemented a simple target-tracking system whereby the user would click on a tile, and the character would walk towards it. Since performance was already slowed down by the monsters, we couldn't make the AI a superb navigator of the maze - but even being able to avoid traps, and walk around obstacles, turned out to be enough to make the game fun to play on mobile.
        </p>
        <p className="sub-paragraph">
          With <em>Brimstone</em>, every aspect of the game was designed from the ground up with mobile in mind. To boost performance we removed the monsters entirely, replacing them with a more existential threat that didn't slow down performance. This enabled us to create a much more sophisticated AI for our character, which could now plan seven steps ahead and navigate the maze with ease. It was no longer difficult for the user to control the character, as the character did most of the work. (Read more about our obstacle-avoiding AI <a href={getBlogUrl("BuildingAnAIForNavigatingObstacles")}> here</a>.)
        </p>
        <p className="sub-paragraph">
          Since we dismissed swipe-based controls when discussing <em>Entombed</em>, it should be mentioned in their defense that we have encountered several situations where they do the job better than any other. In particular, our <em>Volcano Frenzy</em> games use a swiping action to tell the cart to switch from one track to another. Crucial to this is the fact that the cart knows what to do <em>in between</em> swipes - that is, it simply follows the tracks to the next crossroads - rather than having the user swipe over and over again to make the cart move a very small distance.
        </p>
        <p className="sub-paragraph">
          If your game is designed with arrow keys in mind, and you have a hard time finding a natural alternative to the keyboard on mobile, you might want to consider the following: with touchscreen games, often the user doesn't want to have <em>complete</em> control over the character's actions. A sophisticated AI that requires a little guidance from the user is much better than a puppet whose every move must be micromanaged.
        </p>
      </div>
    );
  }
}
