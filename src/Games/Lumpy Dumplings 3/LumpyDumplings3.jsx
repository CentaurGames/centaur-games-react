import * as React from "react";
import audioURL from "../Lumpy Dumplings/audio.mp3";
import {
  startGlobalLoadingIndicator,
  stopGlobalLoadingIndicator,
} from "../../Components/GlobalLoadingIndicator";
import { maxCanvasScale } from "../../Util/MaxCanvasScale";

var scrollPreventCanvas,
  imageCanvas,
  backgroundCanvas,
  dumplingCanvas,
  scoreCanvas;

var imageContext, backgroundContext, dumplingContext, scoreContext;

var audioContext,
  audioVolume,
  audioBuffer,
  lastAudioSource,
  isIOS = 0,
  isMobile = 0;

var canvasWidth = 1136;
var canvasHeight = 640;

var replayButtonImage = new Image(80, 69);
var dumplingFaceImage = new Image(40, 40);
var dumplingImage = new Image(40, 40);
var bowlDesignImage = new Image(200, 90);
var temporaryBowlImage = new Image(200, 90);
var chopstickImage = new Image(10, 200);
var bowlImage = new Image(250, 155);
var backgroundImage = new Image(canvasWidth, canvasHeight);
var numberOfDumplings = 4;

var playerX,
  playerVX = 15,
  dumplingX = new Array(numberOfDumplings),
  dumplingY = new Array(numberOfDumplings),
  dumplingVY = 3,
  playerWidth = temporaryBowlImage.width;

var dumplingTimer,
  dumplingTimerIsRunning = 0,
  keyTimer,
  keyTimerIsRunning = 0,
  endZone = canvasHeight - temporaryBowlImage.height;

var SCORE = 0,
  gameOver = 0,
  isLandscapeModeOn = 0,
  isReplayOn = 0,
  isAudioLoaded = 0,
  isAudioLoading = 0;

function playBackgroundAudio() {
  if (lastAudioSource) {
    lastAudioSource.loop = false;
    lastAudioSource.stop();
  }
  var audioSource = audioContext.createBufferSource();
  audioVolume.gain.value = 1;
  audioSource.connect(audioVolume);
  audioSource.buffer = audioBuffer;
  audioSource.loop = true;
  if (audioSource.start) {
    audioSource.start(0);
  } else if (audioSource.play) {
    audioSource.play(0);
  } else if (audioSource.noteOn) {
    audioSource.noteOn(0);
  }
  lastAudioSource = audioSource;
}

function loadAudio() {
  if (isAudioLoading) return;
  isAudioLoading = 1;
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  audioVolume = audioContext.createGain();
  audioVolume.connect(audioContext.destination);
  var request = new XMLHttpRequest();
  request.open("GET", audioURL, true);
  request.responseType = "arraybuffer";
  request.onload = function () {
    audioContext.decodeAudioData(request.response, function (buffer) {
      audioBuffer = buffer;
      isAudioLoaded = 1;
      playBackgroundAudio();
    });
  };
  request.send();
}

function centerCanvas(canvas) {
  canvas.style.left = "0px";
  canvas.style.top = "0px";
  var rect = canvas.getBoundingClientRect();
  var leftPosition = Math.floor((window.innerWidth - canvas.width) / 2);
  leftPosition -= rect.left;
  var topPosition = Math.floor((window.innerHeight - canvas.height) / 2);
  topPosition -= rect.top;
  canvas.style.left = leftPosition + "px";
  canvas.style.top = topPosition + "px";
}

function centerAllCanvases() {
  centerCanvas(imageCanvas);
  centerCanvas(backgroundCanvas);
  centerCanvas(dumplingCanvas);
  centerCanvas(scoreCanvas);
}

function rescaleCanvas(canvas, context, scale) {
  canvas.width = Math.floor(canvasWidth * scale);
  canvas.height = Math.floor(canvasHeight * scale);
  canvas.style.left = "0px";
  canvas.style.top = "0px";
  context.scale(scale, scale);
}

function rescaleAllCanvases() {
  window.scrollTo(0, 0);
  dumplingCanvas.style.left = "0px";
  dumplingCanvas.style.top = "0px";
  scrollPreventCanvas.style.left = "0px";
  scrollPreventCanvas.style.top = "0px";
  scrollPreventCanvas.width = window.innerWidth;
  scrollPreventCanvas.height = window.innerHeight;
  var rect = dumplingCanvas.getBoundingClientRect();
  var scaleX = window.innerWidth / 1136;
  var scaleY = window.innerHeight / 640;
  var scale = scaleX < scaleY ? scaleX : scaleY;
  scale = scale >= maxCanvasScale ? maxCanvasScale : scale;
  imageCanvas.width = 0;
  imageCanvas.height = 0;
  //rescaleCanvas(imageCanvas,imageContext,scale);
  rescaleCanvas(backgroundCanvas, backgroundContext, scale);
  rescaleCanvas(dumplingCanvas, dumplingContext, scale);
  rescaleCanvas(scoreCanvas, scoreContext, scale);
  if (isMobile) {
    setTimeout(function () {
      window.scrollTo(0, rect.top);
      centerAllCanvases();
    }, 500);
  } else {
    window.scrollTo(0, rect.top);
    centerAllCanvases();
  }
  drawScore();
  backgroundContext.clearRect(0, 0, canvasWidth, canvasHeight);
  dumplingContext.clearRect(0, 0, canvasWidth, canvasHeight);
  backgroundContext.drawImage(backgroundImage, 0, 0);
  dumplingContext.drawImage(
    bowlImage,
    playerX - playerWidth / 2,
    canvasHeight - bowlImage.height
  );
  if (dumplingY < canvasHeight) {
    dumplingContext.drawImage(dumplingImage, dumplingX - 20, dumplingY - 40);
  } else {
    dumplingContext.drawImage(
      dumplingImage,
      0,
      0,
      40,
      40,
      dumplingX - 20,
      dumplingY - 40,
      40,
      canvasHeight - dumplingY + 40
    );
  }
  if (gameOver) {
    gameOverSequence();
  }
}

function drawScore() {
  scoreContext.clearRect(0, 0, canvasWidth, canvasHeight);
  scoreContext.drawImage(dumplingImage, 0, 0, 40, 40, 10, 10, 20, 20);
  scoreContext.fillStyle = "white";
  scoreContext.font = "20px helvetica";
  scoreContext.textAlign = "center";
  scoreContext.textBaseline = "middle";
  scoreContext.fillText(SCORE + "", 40, 20);
  if (isReplayOn) {
    scoreContext.drawImage(
      replayButtonImage,
      (canvasWidth - replayButtonImage.width) / 2,
      (canvasHeight - replayButtonImage.height) / 2
    );
  }
}

function render() {
  for (var i = 0; i < numberOfDumplings; i++) {
    if (dumplingY[i] - 40 >= canvasHeight) {
      gameOverSequence();
      return;
    }
  }
  drawScore();
  backgroundContext.clearRect(0, 0, canvasWidth, canvasHeight);
  dumplingContext.clearRect(0, 0, canvasWidth, canvasHeight);
  backgroundContext.drawImage(backgroundImage, 0, 0);
  dumplingContext.drawImage(
    bowlImage,
    playerX - playerWidth / 2,
    canvasHeight - bowlImage.height
  );
  for (var i = 0; i < numberOfDumplings; i++) {
    if (dumplingY[i] < canvasHeight) {
      dumplingContext.drawImage(
        dumplingImage,
        dumplingX[i] - 20,
        dumplingY[i] - 40
      );
    } else {
      dumplingContext.drawImage(
        dumplingImage,
        0,
        0,
        40,
        40,
        dumplingX[i] - 20,
        dumplingY[i] - 40,
        40,
        canvasHeight - dumplingY[i] + 40
      );
    }
  }
}

function keyDownEvent(evt) {
  if (gameOver) return;
  switch (evt.keyCode) {
    case 37: //left
      playerX -= playerVX;
      break;
    case 39: //right
      playerX += playerVX;
      break;
    default:
      return;
  }
  playerX = playerX < playerWidth / 2 ? playerWidth / 2 : playerX;
  playerX =
    playerX > canvasWidth - playerWidth / 2 - 1
      ? canvasWidth - playerWidth / 2 - 1
      : playerX;
  if (keyTimerIsRunning) {
    clearTimeout(keyTimer);
    keyTimerIsRunning = 0;
  }
  keyTimer = setTimeout(function () {
    keyDownEvent(evt);
  }, 10);
  keyTimerIsRunning = 1;
  render();
}

function keyUpEvent(evt) {
  if (keyTimerIsRunning) {
    clearTimeout(keyTimer);
    keyTimerIsRunning = 0;
  }
}

function mouseMoveEvent(evt) {
  evt.preventDefault();
  if (gameOver) return;
  playerX = evt.clientX || evt.targetTouches[0].clientX;
  playerX -= scoreCanvas.getBoundingClientRect().left;
  playerX *= 1136 / scoreCanvas.width;
  playerX = playerX < playerWidth / 2 ? playerWidth / 2 : playerX;
  playerX =
    playerX > canvasWidth - playerWidth / 2 - 1
      ? canvasWidth - playerWidth / 2 - 1
      : playerX;
  render();
}

function touchEndEvent(evt) {
  if (isIOS && !isAudioLoaded) loadAudio();
  evt.preventDefault();
  if (!gameOver) return;
  gameOver = 0;
  isReplayOn = 0;
  initializeGame();
}

function setEventListeners() {
  document.addEventListener("keydown", keyDownEvent);
  document.addEventListener("keyup", keyUpEvent);
  document.addEventListener("mousemove", mouseMoveEvent);
  scoreCanvas.addEventListener("touchstart", mouseMoveEvent);
  scoreCanvas.addEventListener("touchmove", mouseMoveEvent);
  scoreCanvas.addEventListener("touchend", touchEndEvent);
  document.addEventListener("mouseup", touchEndEvent);
  window.addEventListener("resize", rescaleAllCanvases);
  scrollPreventCanvas.addEventListener("touchmove", function (evt) {
    evt.preventDefault();
  });
}

function gameOverSequence() {
  gameOver = 1;
  isReplayOn = 1;
  if (dumplingTimerIsRunning) {
    clearInterval(dumplingTimer);
    dumplingTimerIsRunning = 0;
  }
  scoreContext.drawImage(
    replayButtonImage,
    (canvasWidth - replayButtonImage.width) / 2,
    (canvasHeight - replayButtonImage.height) / 2
  );
}

function moveDumpling() {
  for (var i = 0; i < numberOfDumplings; i++) {
    dumplingY[i] += dumplingVY;
    if (dumplingY[i] >= endZone) {
      if (Math.abs(dumplingX[i] - playerX) < playerWidth / 2) {
        SCORE++;
        dumplingY[i] = 0;
        dumplingX[i] = Math.floor(Math.random() * canvasWidth);
      } else {
        //gameOverSequence();
        gameOver = 1;
      }
    }
  }
  render();
}

function setTimingEvents() {
  if (!dumplingTimerIsRunning) {
    dumplingTimer = setInterval(moveDumpling, 10);
    dumplingTimerIsRunning = 1;
  }
}

function initializeGame() {
  var spacing = endZone / numberOfDumplings;
  imageCanvas.width = 0;
  imageCanvas.height = 0;
  playerX = canvasWidth / 2;
  for (var i = 0; i < dumplingX.length; i++) {
    dumplingX[i] = Math.floor(Math.random() * canvasWidth);
    dumplingY[i] = -i * spacing;
  }
  SCORE = 0;
  setTimeout(setTimingEvents, 500);
}

function drawBackgroundImage() {
  //These dimensions are designed for an iPhone 5 screen.
  imageCanvas.width = canvasWidth;
  imageCanvas.height = canvasHeight;
  imageContext.fillStyle = "maroon";
  imageContext.fillRect(0, 0, imageCanvas.width, imageCanvas.height);
  imageContext.strokeStyle = "red";
  var x,
    y,
    r0 = 8,
    r1 = 16,
    r2 = 24,
    r3 = 32;
  for (var j = 0; j < 42; j++) {
    for (var i = j % 2; i < 42; i += 2) {
      x = (i * canvasWidth) / 40;
      y = (j * canvasHeight) / 40;
      imageContext.beginPath();
      imageContext.moveTo(x + r3, y);
      imageContext.arc(x, y, r3, 0, 2 * Math.PI);
      imageContext.closePath();
      imageContext.fill();
      imageContext.beginPath();
      imageContext.moveTo(x + r0, y);
      imageContext.arc(x, y, r0, 0, 2 * Math.PI);
      imageContext.closePath();
      imageContext.stroke();
      imageContext.beginPath();
      imageContext.moveTo(x + r1, y);
      imageContext.arc(x, y, r1, 0, 2 * Math.PI);
      imageContext.closePath();
      imageContext.stroke();
      imageContext.beginPath();
      imageContext.moveTo(x + r2, y);
      imageContext.arc(x, y, r2, 0, 2 * Math.PI);
      imageContext.closePath();
      imageContext.stroke();
      imageContext.beginPath();
      imageContext.moveTo(x + r3, y);
      imageContext.arc(x, y, r3, 0, 2 * Math.PI);
      imageContext.closePath();
      imageContext.stroke();
    }
  }
  var grad = imageContext.createRadialGradient(
    canvasWidth / 2,
    canvasHeight / 2,
    0,
    canvasWidth / 2,
    canvasHeight / 2,
    Math.sqrt(canvasWidth * canvasWidth + canvasHeight * canvasHeight) / 2
  );
  grad.addColorStop(0, "rgba(255,255,0,0.2)");
  grad.addColorStop(1, "rgba(255,255,0,0)");
  imageContext.fillStyle = grad;
  imageContext.fillRect(0, 0, canvasWidth, canvasHeight);
  backgroundImage.src = imageCanvas.toDataURL("image/png");
  backgroundImage.onload = function () {
    isReplayOn = 1;
    gameOver = 1;
    playerX = canvasWidth / 2;
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
      loadAudio();
    }
    setEventListeners();
    rescaleAllCanvases();
    stopGlobalLoadingIndicator();
  };
  //initializeGame;
}

function drawBowlAndChopsticks() {
  imageCanvas.width = 250;
  imageCanvas.height = 155;
  imageContext.translate(0, -95);
  imageContext.save();
  imageContext.translate(100, 250);
  imageContext.rotate((39 * Math.PI) / 180);
  imageContext.translate(-100, -250);
  imageContext.drawImage(chopstickImage, 100, 50);
  imageContext.restore();
  imageContext.save();
  imageContext.translate(100, 250);
  imageContext.rotate((43 * Math.PI) / 180);
  imageContext.translate(-100, -250);
  imageContext.drawImage(chopstickImage, 100, 40);
  imageContext.restore();
  imageContext.drawImage(temporaryBowlImage, 0, 160);
  bowlImage.src = imageCanvas.toDataURL("image/png");
  bowlImage.onload = drawBackgroundImage;
}

function drawChopsticks() {
  imageCanvas.width = 10;
  imageCanvas.height = 200;
  imageContext.save();
  imageContext.translate(5, 100);
  imageContext.rotate(Math.PI);
  imageContext.translate(-5, -100);
  var grad = imageContext.createLinearGradient(5, 0, 5, 200);
  grad.addColorStop(0.5, "darkblue");
  grad.addColorStop(1, "black");
  imageContext.fillStyle = grad;
  imageContext.strokeStyle = "indigo";
  imageContext.lineWidth = 1;
  imageContext.beginPath();
  imageContext.moveTo(0, 195);
  imageContext.lineTo(4, 0);
  imageContext.lineTo(6, 0);
  imageContext.lineTo(10, 195);
  imageContext.bezierCurveTo(5, 197, 5, 197, 0, 195);
  imageContext.closePath();
  imageContext.stroke();
  imageContext.fill();
  imageContext.globalCompositeOperation = "source-atop";
  imageContext.fillStyle = "gold";
  imageContext.fillRect(0, 170, 10, 2);
  imageContext.fillRect(0, 175, 10, 2);
  imageContext.fillRect(0, 180, 10, 2);
  imageContext.restore();
  chopstickImage.src = imageCanvas.toDataURL("image/png");
  chopstickImage.onload = drawBowlAndChopsticks;
}

function sketchBowl() {
  imageCanvas.width = 200;
  imageCanvas.height = 90;
  imageContext.fillStyle = "black";
  imageContext.beginPath();
  imageContext.moveTo(0, 0);
  imageContext.bezierCurveTo(30, 60, 30, 60, 60, 80);
  imageContext.bezierCurveTo(70, 90, 70, 90, 100, 90);
  imageContext.lineTo(100, 0);
  imageContext.lineTo(0, 0);
  imageContext.closePath();
  imageContext.fill();
  imageContext.beginPath();
  imageContext.moveTo(200, 0);
  imageContext.bezierCurveTo(170, 60, 170, 60, 140, 80);
  imageContext.bezierCurveTo(130, 90, 130, 90, 100, 90);
  imageContext.lineTo(100, 0);
  imageContext.lineTo(200, 0);
  imageContext.closePath();
  imageContext.fill();
  imageContext.save();
  imageContext.globalCompositeOperation = "source-atop";
  imageContext.drawImage(bowlDesignImage, 0, 0);
  imageContext.restore();
  imageContext.strokeStyle = "black";
  imageContext.beginPath();
  imageContext.moveTo(0, 0);
  imageContext.bezierCurveTo(30, 60, 30, 60, 60, 80);
  imageContext.bezierCurveTo(70, 90, 70, 90, 100, 90);
  imageContext.bezierCurveTo(130, 90, 130, 90, 140, 80);
  imageContext.bezierCurveTo(170, 60, 170, 60, 200, 0);
  imageContext.lineTo(0, 0);
  imageContext.closePath();
  imageContext.stroke();
  temporaryBowlImage.src = imageCanvas.toDataURL("image/png");
  temporaryBowlImage.onload = drawChopsticks;
}

function sketchBowlDesign() {
  imageCanvas.width = 200;
  imageCanvas.height = 90;
  imageContext.fillStyle = "rgb(204,0,0)";
  imageContext.fillRect(0, 0, 200, 90);
  imageContext.fillStyle = "white";
  imageContext.fillRect(0, 2, 200, 14);
  imageContext.beginPath();
  imageContext.moveTo(100, 50);
  imageContext.arc(100, 50, 25, 0, 2 * Math.PI);
  imageContext.closePath();
  imageContext.fill();
  imageContext.font = "30px helvetica";
  imageContext.fillStyle = "black";
  imageContext.textAlign = "center";
  imageContext.textBaseline = "middle";
  imageContext.fillText("\u2EDD", 100, 50);

  //lip overlay
  imageContext.strokeStyle = "rgb(204,0,0)";
  imageContext.lineWidth = 1;
  for (var x = 100 % 28; x < imageCanvas.width; x += 28) {
    imageContext.beginPath();
    imageContext.moveTo(x, 9);
    imageContext.lineTo(x, 5);
    imageContext.lineTo(x - 12, 5);
    imageContext.lineTo(x - 12, 13);
    imageContext.lineTo(x - 4, 13);
    imageContext.lineTo(x - 4, 9);
    imageContext.lineTo(x - 8, 9);
    imageContext.stroke();
    imageContext.beginPath();
    imageContext.moveTo(x, 9);
    imageContext.lineTo(x, 13);
    imageContext.lineTo(x + 12, 13);
    imageContext.lineTo(x + 12, 5);
    imageContext.lineTo(x + 4, 5);
    imageContext.lineTo(x + 4, 9);
    imageContext.lineTo(x + 8, 9);
    imageContext.stroke();
  }

  var grad = imageContext.createRadialGradient(100, 0, 0, 100, 0, 90);
  grad.addColorStop(0, "rgba(0,0,0,0)");
  grad.addColorStop(1, "rgba(0,0,0,0.8)");
  imageContext.fillStyle = grad;
  imageContext.fillRect(0, 0, 200, 90);
  bowlDesignImage.src = imageCanvas.toDataURL("image/png");
  bowlDesignImage.onload = sketchBowl;
}

function sketchDumpling() {
  imageCanvas.width = 40;
  imageCanvas.height = 40;
  //main body
  var grad = imageContext.createRadialGradient(20, 5, 0, 20, 5, 40);
  grad.addColorStop(0, "rgb(255, 230, 230)");
  grad.addColorStop(0.6, "rgb(255, 204, 153)");
  grad.addColorStop(1, "rgb(153, 102, 51)");
  imageContext.fillStyle = grad;
  imageContext.strokeStyle = "brown";
  imageContext.beginPath();
  imageContext.moveTo(20, 0);
  imageContext.bezierCurveTo(12, 13, 13, 3, 5, 16);
  imageContext.bezierCurveTo(1, 25, 1, 26, 5, 35);
  imageContext.bezierCurveTo(10, 39, 10, 39, 20, 39);
  imageContext.bezierCurveTo(30, 39, 30, 39, 35, 35);
  imageContext.bezierCurveTo(39, 26, 39, 25, 35, 16);
  imageContext.bezierCurveTo(27, 3, 28, 13, 20, 0);
  imageContext.closePath();
  imageContext.stroke();
  imageContext.fill();
  //creases
  imageContext.fillStyle = "rgb(153, 102, 51)";
  imageContext.beginPath();
  imageContext.moveTo(20, 5);
  imageContext.bezierCurveTo(17, 12, 17, 13, 18, 20);
  imageContext.bezierCurveTo(21, 12, 21, 13, 20, 5);
  imageContext.closePath();
  imageContext.fill();
  imageContext.beginPath();
  imageContext.moveTo(18, 5);
  imageContext.bezierCurveTo(13, 14, 13, 14, 10, 20);
  imageContext.bezierCurveTo(9, 14, 9, 14, 18, 5);
  imageContext.closePath();
  imageContext.fill();
  imageContext.beginPath();
  imageContext.moveTo(22, 5);
  imageContext.bezierCurveTo(27, 12, 27, 13, 28, 20);
  imageContext.lineTo(24, 12, 24, 13, 22, 5);
  imageContext.closePath();
  imageContext.fill();
  imageContext.beginPath();
  imageContext.moveTo(24, 5);
  imageContext.bezierCurveTo(30, 10, 30, 11, 34, 20);
  imageContext.lineTo(28, 11, 28, 10, 24, 5);
  imageContext.closePath();
  imageContext.fill();
  imageContext.save();
  imageContext.globalCompositeOperation = "source-atop";
  imageContext.drawImage(dumplingFaceImage, 0, 0);
  imageContext.restore();
  dumplingImage.src = imageCanvas.toDataURL("image/png");
  dumplingImage.onload = sketchBowlDesign;
}

function drawDumplingFaceImage() {
  imageCanvas.width = 40;
  imageCanvas.height = 40;
  //cheeks
  var grad = imageContext.createRadialGradient(5, 30, 0, 5, 30, 5);
  grad.addColorStop(0, "rgba(255,0,0,0.3)");
  grad.addColorStop(1, "rgba(255,0,0,0)");
  imageContext.fillStyle = grad;
  imageContext.beginPath();
  imageContext.moveTo(5, 30);
  imageContext.arc(5, 30, 5, 0, 2 * Math.PI);
  imageContext.closePath();
  imageContext.fill();
  grad = imageContext.createRadialGradient(35, 30, 0, 35, 30, 5);
  grad.addColorStop(0, "rgba(255,0,0,0.3)");
  grad.addColorStop(1, "rgba(255,0,0,0)");
  imageContext.fillStyle = grad;
  imageContext.beginPath();
  imageContext.moveTo(35, 30);
  imageContext.arc(35, 30, 5, 0, 2 * Math.PI);
  imageContext.closePath();
  imageContext.fill();
  //eyes
  grad = imageContext.createRadialGradient(9, 24, 0, 10, 25, 3);
  grad.addColorStop(0, "white");
  grad.addColorStop(0.6, "black");
  imageContext.fillStyle = grad;
  imageContext.beginPath();
  imageContext.moveTo(10, 25);
  imageContext.arc(10, 25, 3, 0, 2 * Math.PI);
  imageContext.closePath();
  imageContext.fill();
  grad = imageContext.createRadialGradient(29, 24, 0, 30, 25, 3);
  grad.addColorStop(0, "white");
  grad.addColorStop(0.6, "black");
  imageContext.fillStyle = grad;
  imageContext.beginPath();
  imageContext.moveTo(30, 25);
  imageContext.arc(30, 25, 3, 0, 2 * Math.PI);
  imageContext.closePath();
  imageContext.fill();
  //mouth
  imageContext.fillStyle = "black";
  imageContext.beginPath();
  imageContext.moveTo(10, 30);
  imageContext.lineTo(30, 30);
  imageContext.bezierCurveTo(20, 35, 20, 35, 10, 30);
  imageContext.closePath();
  imageContext.fill();
  dumplingFaceImage.src = imageCanvas.toDataURL("image/png");
  dumplingFaceImage.onload = sketchDumpling;
}

function drawReplayButtonImage() {
  imageCanvas.width = replayButtonImage.width;
  imageCanvas.height = replayButtonImage.height;
  imageContext.fillStyle = "black";
  imageContext.beginPath();
  imageContext.moveTo(0, 0);
  imageContext.lineTo(imageCanvas.width, imageCanvas.height / 2);
  imageContext.lineTo(0, imageCanvas.height);
  imageContext.lineTo(0, 0);
  imageContext.closePath();
  imageContext.fill();
  replayButtonImage.src = imageCanvas.toDataURL("image/png");
  replayButtonImage.onload = drawDumplingFaceImage;
}

function run() {
  scoreContext.fillStyle = "black";
  scoreContext.fillRect(0, 0, scoreCanvas.width, scoreCanvas.height);
  drawReplayButtonImage();
}

export function LumpyDumplings3() {
  React.useEffect(() => {
    startGlobalLoadingIndicator();
    scrollPreventCanvas = document.getElementById("scrollPreventCanvas");
    imageCanvas = document.getElementById("imgCanvas");
    imageContext = imageCanvas.getContext("2d");
    backgroundCanvas = document.getElementById("bkgrndCanvas");
    backgroundContext = backgroundCanvas.getContext("2d");
    dumplingCanvas = document.getElementById("dumplingCanvas");
    dumplingContext = dumplingCanvas.getContext("2d");
    scoreCanvas = document.getElementById("scrCanvas");
    scoreContext = scoreCanvas.getContext("2d");
    document.documentElement.style.overflow = "hidden";
    document.body.scroll = "no";

    run();
  }, []);

  return (
    <div>
      <canvas
        id="scrollPreventCanvas"
        width="1136"
        height="640"
        style={{
          position: "absolute",
          top: "10",
          left: "10",
          zIndex: 0,
          border: "0px solid black",
        }}
      />
      <canvas
        id="imgCanvas"
        width="40"
        height="40"
        style={{
          position: "absolute",
          top: "10",
          left: "10",
          zIndex: 1,
          border: "0px solid black",
        }}
      />
      <canvas
        id="bkgrndCanvas"
        width="1136"
        height="640"
        style={{
          position: "absolute",
          top: "10",
          left: "10",
          zIndex: 2,
          border: "0px solid black",
        }}
      />
      <canvas
        id="dumplingCanvas"
        width="1136"
        height="640"
        style={{
          position: "absolute",
          top: "10",
          left: "10",
          zIndex: 3,
          border: "0px solid black",
        }}
      />
      <canvas
        id="scrCanvas"
        width="1136"
        height="640"
        style={{
          position: "absolute",
          top: "10",
          left: "10",
          zIndex: 4,
          border: "0px solid black",
        }}
      />
    </div>
  );
}

export { LumpyDumplings3 as default };
