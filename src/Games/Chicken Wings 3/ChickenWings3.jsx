import * as React from "react";
import {
  treeDataURL,
  mushroomDataURL,
  eggDataURL,
  replayDataURL,
  scoreDataURL,
} from "./ChickenWings3ImageSources";
import backgroundAudioURL from "../Chicken Wings/backgroundAudio.mp3";
import {
  startGlobalLoadingIndicator,
  stopGlobalLoadingIndicator,
} from "../../Components/GlobalLoadingIndicator";
import { maxCanvasScale } from "../../Util/MaxCanvasScale";
import { clearInterval, setInterval } from "worker-timers";

var scrollPreventCanvas, treeCanvas, mushroomCanvas, eggCanvas, replayCanvas;

var treeContext, mushroomContext, eggContext, replayContext;

var canvasWidth = 640,
  canvasHeight = 1136;

var mushroomWidth = 40,
  mushroomHeight = 20; //Width and height of the mushroom image. These are placeholder values.
var mushroomRadius = 75;
var eggWidth = 20,
  eggHeight = 20; //Width and height of the egg image. These are placeholder values.

var numberOfMushroomsPerScreen = 10;

var eggX;
var mushroomXs = new Array(numberOfMushroomsPerScreen),
  mushroomYs = new Array(numberOfMushroomsPerScreen);
var mushroomScale = new Array(numberOfMushroomsPerScreen);
var mushroomDirection = new Array(numberOfMushroomsPerScreen);

var scrollSpeed = 15,
  treeScrollY = 0,
  scrollInterval,
  isScrollIntervalRunning = 0;

var treeImage, mushroomImage, eggImage, replayImage, scoreImage;
var areImagesLoaded = 0;

var isReplayButtonOn = 1;
var score = 0,
  bestScore = 0;
var backgroundAudioContext,
  backgroundBuffer,
  backgroundAudioVolume,
  isAudioLoaded = 0,
  isAudioLoading = 0,
  isIOS = 0,
  isMobile = 0;

function loadBackgroundAudio() {
  if (isAudioLoading) {
    return;
  }
  isAudioLoading = 1;
  backgroundAudioContext = new (window.AudioContext ||
    window.webkitAudioContext)();
  backgroundAudioVolume = backgroundAudioContext.createGain();
  backgroundAudioVolume.connect(backgroundAudioContext.destination);
  var request = new XMLHttpRequest();
  request.open("GET", backgroundAudioURL, true);
  request.responseType = "arraybuffer";
  request.onload = function () {
    backgroundAudioContext.decodeAudioData(request.response, function (buffer) {
      backgroundBuffer = buffer;
      isAudioLoaded = 1;
      playBackgroundSound();
    });
  };
  request.send();
}

function playBackgroundSound() {
  if (!isAudioLoaded) {
    return;
  }
  //backgroundIsPlaying = 1;
  backgroundAudioVolume.gain.value = 0.2;
  var audioSource = backgroundAudioContext.createBufferSource();
  audioSource.connect(backgroundAudioVolume);
  audioSource.buffer = backgroundBuffer;
  audioSource.loop = true;
  if (audioSource.start) {
    audioSource.start(0);
  } else if (audioSource.play) {
    audioSource.play(0);
  } else if (audioSource.noteOn) {
    audioSource.noteOn(0);
  }
}

function resetMushroom(i) {
  //Purpose:
  //This function creates a new mushroom at the bottom of the screen at a random x position.
  //Description:
  //Set the mushroom's y value to the bottom of the screen and give it a new random x value.
  //Inputs:
  //i is the index of the mushroom within the arrays mushroomXs and mushroomYs, which hold its x and y values.
  //Outputs:
  //This function is void.
  mushroomXs[i] = Math.floor(Math.random() * canvasWidth);
  mushroomDirection[i] = Math.random() < 0.5 ? -1 : 1;
  mushroomYs[i] = canvasHeight;
  mushroomScale[i] = Math.random() * 0.75 + 0.25;
  score++;
  scrollSpeed = Math.floor(score / 5) + 15;
}

function scrollMushroom(i) {
  //Purpose:
  //This function scrolls the i-th mushroom along the screen.
  //Description:
  //If the mushroom has scrolled beyond the top of the screen, call resetMushroom.
  //Otherwise, subtract scrollSpeed from its y value.
  //Inputs:
  //i is the index of the mushroom within the arrays mushroomXs and mushroomYs, which hold its x and y values.
  //Outputs:
  //This function is void.
  if (mushroomYs[i] < 0) {
    resetMushroom(i);
  } else {
    mushroomYs[i] -= scrollSpeed;
  }
  if (mushroomXs[i] <= 0 || mushroomXs[i] >= canvasWidth) {
    mushroomDirection[i] *= -1;
  }
  mushroomXs[i] += 3 * mushroomDirection[i];
}

function scrollTree() {
  //Purpose:
  //This function scrolls the tree along the screen.
  //Description:
  //Add scrollSpeed from treeScrollY.
  //Use the modulo function to keep treeScrollY constrained between 0 and canvasHeight.
  //Inputs:
  //There are no inputs to this function.
  //Outputs:
  //This function is void.
  treeScrollY += scrollSpeed;
  treeScrollY %= canvasHeight;
}

function scrollAll() {
  //Purpose:
  //This function scrolls the tree and all the mushrooms along the screen, then displays them.
  //Description:
  //Call scrollTree, then call scrollMushroom for each mushroom. Use render to draw the scene. Call checkForGameOver at the end.
  //Inputs:
  //There are no inputs to this function.
  //Outputs:
  //This function is void.
  if (isReplayButtonOn) return;
  scrollTree();
  for (var i = 0; i < numberOfMushroomsPerScreen; i++) {
    scrollMushroom(i);
  }
  render();
  checkForGameOver();
}

function renderScore() {
  if (isReplayButtonOn === 0) {
    return;
  }
  var scale = 1.3;
  replayContext.drawImage(
    scoreImage,
    (canvasWidth - scale * scoreImage.width) / 2,
    (canvasHeight - scale * scoreImage.height) / 2,
    scale * scoreImage.width,
    scale * scoreImage.height
  );
  replayContext.font = "30px helvetica";
  replayContext.lineWidth = 1;
  replayContext.textAlign = "center";
  replayContext.textBaseline = "middle";
  replayContext.strokeStyle = "black";
  replayContext.fillStyle = "black";
  replayContext.strokeText(
    "CURRENT SCORE: " + score,
    canvasWidth / 2,
    canvasHeight / 2 - 20
  );
  replayContext.fillText(
    "CURRENT SCORE: " + score,
    canvasWidth / 2,
    canvasHeight / 2 - 20
  );
  replayContext.strokeText(
    "BEST SCORE: " + bestScore,
    canvasWidth / 2,
    canvasHeight / 2 + 20
  );
  replayContext.fillText(
    "BEST SCORE: " + bestScore,
    canvasWidth / 2,
    canvasHeight / 2 + 20
  );
  replayContext.font = "20px helvetica";
  replayContext.fillText(
    "CLICK TO PLAY",
    canvasWidth / 2,
    canvasHeight / 2 + 60
  );
}

function renderTree() {
  //Purpose:
  //This function draws the tree scrolling past the screen.
  //Description:
  //You will need drawImage, with all NINE arguments, for this one. Draw the treeImage, cropping as follows:
  //The top-left corner of the treeImage should be your current scrolling position, i.e. (0,treeScrollY).
  //The width and height of the treeImage should be canvasWidth and canvasHeight.
  //The top-left corner of the canvas should be (0,0) as usual.
  //The widht and heigh of the canvas should be canvasWidth and canvasHeight as usual.
  //Inputs:
  //There are no inputs to this function.
  //Outputs:
  //This function is void.
  treeContext.fillStyle = "lightblue";
  treeContext.fillRect(0, 0, canvasWidth, canvasHeight);
  treeContext.drawImage(
    treeImage,
    0,
    treeScrollY,
    canvasWidth,
    canvasHeight,
    0,
    0,
    canvasWidth,
    canvasHeight
  );
}

function renderMushroom(i) {
  //Purpose:
  //This function draws the i-th mushroom scrolling past the screen.
  //Description:
  //The arrays mushroomXs and mushroomYs give the coordinates of the mushroom's CENTER. Use mushroomWidth and mushroomHeight, along with
  //these coordinates, to find the top-left corner of the mushroom and draw its image there.
  //Inputs:
  //i is an integer representing the index of the mushroom within mushroomXs and mushroomYs.
  //Outputs:
  //This function is void.
  mushroomContext.drawImage(
    mushroomImage,
    0,
    0,
    mushroomWidth,
    mushroomHeight,
    mushroomXs[i] - Math.round((mushroomWidth * mushroomScale[i]) / 2),
    mushroomYs[i] - Math.round((mushroomHeight * mushroomScale[i]) / 2),
    Math.round(mushroomWidth * mushroomScale[i]),
    Math.round(mushroomHeight * mushroomScale[i])
  );
}

function renderEgg() {
  //Purpose:
  //Draw the egg vertically centered.
  //Description:
  //Draw the egg such that its center is at (eggX,canvasHeight/2).
  //Inputs:
  //There are no inputs for this function.
  //Outputs:
  //This function is void.
  if (isReplayButtonOn) {
    return;
  }
  var width = 1.3 * eggImage.width;
  var height = 1.3 * eggImage.height;
  eggContext.drawImage(
    eggImage,
    0,
    0,
    eggImage.width,
    eggImage.height,
    eggX - width / 2,
    canvasHeight / 2 - height / 2,
    width,
    height
  );
}

function renderReplayButton() {
  //Purpose:
  //Draw the replay button if needed.
  //Description:
  //If isReplayButtonOn is 0, return.
  //Otherwise, draw the replayImage.
  //Inputs:
  //There are no inputs for this function.
  //Outputs:
  //This function is void.
  if (isReplayButtonOn == 0) {
    return;
  }
  replayContext.drawImage(
    replayImage,
    (canvasWidth - replayImage.width) / 2,
    (canvasHeight - replayImage.height) / 2
  );
}

function render() {
  //Purpose:
  //Draw everything on the screen.
  //Description:
  //Clear all canvases and call all the rendering functions.
  //Inputs:
  //There are no inputs for this function.
  //Outputs:
  //This function is void.
  treeContext.clearRect(0, 0, 640, 1136);
  mushroomContext.clearRect(0, 0, 640, 1136);
  eggContext.clearRect(0, 0, 640, 1136);
  replayContext.clearRect(0, 0, 640, 1136);
  //renderReplayButton();
  renderScore();
  renderEgg();
  for (var i = 0; i < numberOfMushroomsPerScreen; i++) {
    renderMushroom(i);
  }
  renderTree();
}

function setTimingEvents() {
  //Purpose:
  //Sets all the intervals for the game.
  //Description:
  //If the scroll interval is already running, return. The global boolean isScrollIntervalRunning should help here.
  //Set an interval that calls scrollAll every 30 ms (or however long you want).
  //The name of this interval should be the global variable scrollInterval. (I have already declared this global variable above for you.)
  //Make sure to set isScrollIntervalRunning to 1 afterwards.
  //Inputs:
  //This function requires no inputs.
  //Outputs:
  //This function is void.
  if (isScrollIntervalRunning) {
    return;
  }
  scrollInterval = setInterval(function () {
    scrollAll();
  }, 30);
  isScrollIntervalRunning = 1;
}

function clearTimingEvents() {
  //Purpose:
  //Clears all the intervals for the game.
  //Description:
  //If the scroll interval is not running, return. The global boolean isScrollIntervalRunning should help here.
  //Clear the interval located within the global variable scrollInterval.
  //Make sure to set isScrollIntervalRunning to 0 afterwards.
  //Inputs:
  //This function requires no inputs.
  //Outputs:
  //This function is void.
  if (!isScrollIntervalRunning) {
    return;
  }
  clearInterval(scrollInterval);
  isScrollIntervalRunning = 0;
}

function gameOverSequence() {
  //Purpose:
  //End the game.
  //Description:
  //Set isReplayButtonOn to 1.
  //Call render to draw the replay button.
  //Call clearTimingEvents.
  //Inputs:
  //This function requires no inputs.
  //Outputs:
  //This function is void.
  isReplayButtonOn = 1;
  render();
  clearTimingEvents();
  if (score > bestScore) {
    bestScore = score;
  }
}

function checkForCollision(i) {
  var x, y;
  x = eggX - mushroomXs[i];
  y = canvasHeight / 2 - mushroomYs[i];
  var radius = Math.sqrt(x * x + y * y);
  return radius <= mushroomRadius * mushroomScale[i];
}

function checkForGameOver() {
  //Purpose:
  //Call game over if the egg hits a mushroom.
  //Description:
  //Check each mushroom to see if it has hit the egg. If so, call gameOverSequence.
  //Inputs:
  //This function requires no inputs.
  //Outputs:
  //This function is void.
  for (var i = 0; i < numberOfMushroomsPerScreen; i++) {
    if (checkForCollision(i)) {
      gameOverSequence();
      return;
    }
  }
}

function centerCanvas(canvas) {
  // calibrate the origin
  canvas.style.left = "0px";
  canvas.style.top = "0px";
  var rect = canvas.getBoundingClientRect();
  var x0 = rect.left,
    y0 = rect.top;
  var x1 = (window.innerWidth - canvas.width) / 2;
  x1 -= x0;
  var y1 = (window.innerHeight - canvas.height) / 2;
  y1 -= y0;
  canvas.style.left = x1 + "px";
  canvas.style.top = y1 + "px";
}

function centerAllCanvases() {
  centerCanvas(treeCanvas);
  centerCanvas(mushroomCanvas);
  centerCanvas(eggCanvas);
  centerCanvas(replayCanvas);
}

function rescaleCanvases() {
  //You know what to do here.
  window.scrollTo(0, 0);
  scrollPreventCanvas.style.left = "0px";
  scrollPreventCanvas.style.top = "0px";
  scrollPreventCanvas.width = window.innerWidth;
  scrollPreventCanvas.height = window.innerHeight;
  treeCanvas.style.left = "0px";
  treeCanvas.style.top = "0px";
  mushroomCanvas.style.left = "0px";
  mushroomCanvas.style.top = "0px";
  eggCanvas.style.left = "0px";
  eggCanvas.style.top = "0px";
  replayCanvas.style.left = "0px";
  replayCanvas.style.top = "0px";
  var rect = treeCanvas.getBoundingClientRect();
  var x0 = rect.left;
  var neededWidth = window.innerWidth;
  var y0 = rect.top;
  var neededHeight = window.innerHeight;
  var scaleX = neededWidth / 640;
  var scaleY = neededHeight / 1136;
  var scale = scaleX < scaleY ? scaleX : scaleY;
  if (scale >= maxCanvasScale) {
    scale = maxCanvasScale;
  }
  treeCanvas.width = Math.round(640 * scale);
  treeCanvas.height = Math.round(1136 * scale);
  treeContext.scale(scale, scale);
  mushroomCanvas.width = Math.round(640 * scale);
  mushroomCanvas.height = Math.round(1136 * scale);
  mushroomContext.scale(scale, scale);
  eggCanvas.width = Math.round(640 * scale);
  eggCanvas.height = Math.round(1136 * scale);
  eggContext.scale(scale, scale);
  replayCanvas.width = Math.round(640 * scale);
  replayCanvas.height = Math.round(1136 * scale);
  replayContext.scale(scale, scale);
  if (isMobile) {
    setTimeout(function () {
      window.scrollTo(0, y0);
      centerAllCanvases();
    }, 500);
  } else {
    window.scrollTo(0, y0);
    centerAllCanvases();
  }
  render();
}

function mouseMoveEvent(evt) {
  //Purpose:
  //This is called when the mouse is moved.
  //Description:
  //Set eggX to the x position of the mouse and scale its. Make sure to round it and render afterwards.
  //Inputs:
  //evt is the mouse motion event.
  //Outputs:
  //This function is void.
  evt.preventDefault();
  if (isReplayButtonOn) {
    return;
  }
  var rect = treeCanvas.getBoundingClientRect();
  var scale = canvasWidth / treeCanvas.width;
  eggX = Math.round(
    ((evt.clientX || evt.targetTouches[0].clientX) - rect.left) * scale
  );
  if (eggX < 0) eggX = 0;
  if (eggX >= canvasWidth) eggX = CanvasWidth - 1;
  render();
}

function mouseClickEvent(evt) {
  //Purpose:
  //Used only to click the replay button.
  //Description:
  //If isReplayButtonOn is 1, call initializeGame.
  //Inputs:
  //evt is the mouse click event.
  //Outputs:
  //This function is void.
  evt.preventDefault();
  if (isIOS && !isAudioLoaded) {
    loadBackgroundAudio();
  }
  if (isReplayButtonOn === 1) {
    initializeGame();
  }
}

function setEventListeners() {
  //Purpose:
  //Set all the event listeners for the game.
  //Description:
  //Have the window call rescaleCanvases when "resize" event is triggered.
  //Have the replayCanvas call mouseMoveEvent when "mousemove" event is triggered.
  //Have the replayCanvas call mouseClickEvent when "mousedown" event is triggered.
  //Inputs:
  //There are no inputs for this function.
  //Outputs:
  //This function is void.
  window.addEventListener("resize", rescaleCanvases);
  replayCanvas.addEventListener("mousemove", mouseMoveEvent);
  replayCanvas.addEventListener("mousedown", mouseClickEvent);
  replayCanvas.addEventListener("touchmove", mouseMoveEvent);
  scrollPreventCanvas.addEventListener("touchmove", function (evt) {
    evt.preventDefault();
  });
}

function generateMushrooms() {
  //Purpose:
  //Randomly distribute the mushrooms over the screen, to be called at the start of the game.
  //Description:
  //Generate random x values for each mushroom.
  //Give the mushrooms y values that evenly distribute the height of the screen.
  //Inputs:
  //There are no inputs for this function.
  //Outputs:
  //This function is void.
  for (var i = 0; i < numberOfMushroomsPerScreen; i++) {
    mushroomXs[i] = Math.floor(Math.random() * canvasWidth);
    mushroomDirection[i] = Math.random() < 0.5 ? -1 : 1;
    mushroomYs[i] =
      (i * canvasHeight) / numberOfMushroomsPerScreen + canvasHeight;
    mushroomScale[i] = Math.random() * 0.75 + 0.25;
  }
}

function initializeGame() {
  //Purpose:
  //Start the game.
  //Description:
  //Set isReplayButtonOn to 0.
  //Place the egg at the center (set eggX to canvasWidth/2).
  //Call generateMushrooms.
  //If areImagesLoaded is 0, call loadTreeImage.
  //Otherwise, call setEventListeners and setTimingEvents.
  //Inputs:
  //This function requires no inputs.
  //Outputs:
  //This function is void.
  if (
    /iPhone|iPad|iPod|Android|webOS|Blackberry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    isMobile = 1;
  }
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent) || true) {
    isIOS = 1;
  } else {
    loadBackgroundAudio();
  }
  scrollSpeed = 15;
  isReplayButtonOn = 0;
  score = 0;
  eggX = canvasWidth / 2;
  generateMushrooms();
  if (!areImagesLoaded) {
    loadTreeImage();
  } else {
    setEventListeners();
    setTimingEvents();
  }
}

function afterImagesAreLoaded() {
  //Purpose:
  //This function wraps up some stuff after the images are loaded.
  //Description:
  //This function needs to do all of the following things:
  //0. Set isReplayButtonOn to 1.
  //1. Call setEventListeners.
  //2. Call setTimingEvents.
  //3. Call rescaleCanvases.
  //4. Set areImagesLoaded to 1.
  //5. Set the mushroomWidth and mushroomHeight global values to the width and height of mushroomImage.
  //6. Set the eggWidth and eggHeight global values to the width and height of eggImage.
  //Inputs:
  //This function requires no inputs.
  //Outputs:
  //This function is void.
  isReplayButtonOn = 1;
  areImagesLoaded = 1;
  mushroomWidth = mushroomImage.width;
  mushroomHeight = mushroomImage.height;
  eggWidth = eggImage.width;
  eggHeight = eggImage.height;
  setEventListeners();
  setTimingEvents();
  rescaleCanvases();
  stopGlobalLoadingIndicator();
}

function loadScoreImage() {
  scoreImage = new Image();
  scoreImage.src = scoreDataURL;
  scoreImage.onload = afterImagesAreLoaded;
}

function loadReplayImage() {
  //Purpose:
  //Load the replay image.
  //Description:
  //Load replayImage and call afterImagesAreLoaded when it is done loading.
  //Inputs:
  //This function requires no inputs.
  //Outputs:
  //This function is void.
  replayImage = new Image();
  replayImage.src = replayDataURL;
  replayImage.onload = loadScoreImage;
}

function loadEggImage() {
  //Purpose:
  //Load the egg image.
  //Description:
  //Load eggImage and call loadReplayImage when it is done loading.
  //Inputs:
  //This function requires no inputs.
  //Outputs:
  //This function is void.
  eggImage = new Image();
  eggImage.src = eggDataURL;
  eggImage.onload = loadReplayImage;
}

function loadMushroomImage() {
  //Purpose:
  //Load the mushroom image.
  //Description:
  //Load mushroomImage and call loadEggImage when it is done loading.
  //Inputs:
  //This function requires no inputs.
  //Outputs:
  //This function is void.
  mushroomImage = new Image();
  mushroomImage.src = mushroomDataURL;
  mushroomImage.onload = loadEggImage;
}

function loadTreeImage() {
  //Purpose:
  //Load the tree image.
  //Description:
  //Load treeImage and call loadMushroomImage when it is done loading.
  //Inputs:
  //This function requires no inputs.
  //Outputs:
  //This function is void.
  treeImage = new Image();
  treeImage.src = treeDataURL;
  treeImage.onload = loadMushroomImage;
}

export function ChickenWings3() {
  React.useEffect(() => {
    startGlobalLoadingIndicator();
    scrollPreventCanvas = document.getElementById("scrollPreventCanvas");
    treeCanvas = document.getElementById("treeCanvas");
    treeContext = treeCanvas.getContext("2d");
    mushroomCanvas = document.getElementById("mushroomCanvas");
    mushroomContext = mushroomCanvas.getContext("2d");
    eggCanvas = document.getElementById("eggCanvas");
    eggContext = eggCanvas.getContext("2d");
    replayCanvas = document.getElementById("replayCanvas");
    replayContext = replayCanvas.getContext("2d");
    document.documentElement.style.overflow = "hidden";
    document.body.scroll = "no";

    initializeGame();
  }, []);

  return (
    <div>
      <canvas
        id="scrollPreventCanvas"
        width="640"
        height="1136"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          zIndex: 0,
          border: "0px solid black",
        }}
      />
      <canvas
        id="treeCanvas"
        width="640"
        height="1136"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          zIndex: 1,
          border: "0px solid black",
        }}
      />
      <canvas
        id="mushroomCanvas"
        width="640"
        height="1136"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          zIndex: 2,
          border: "0px solid black",
        }}
      />
      <canvas
        id="eggCanvas"
        width="640"
        height="1136"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          zIndex: 3,
          border: "0px solid black",
        }}
      />
      <canvas
        id="replayCanvas"
        width="640"
        height="1136"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          zIndex: 4,
          border: "0px solid black",
        }}
      />
    </div>
  );
}

export { ChickenWings3 as default };
