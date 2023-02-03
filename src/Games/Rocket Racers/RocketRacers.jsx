import * as React from "react";
import pingURL from "./ping.wav";
import explosionURL from "./explosion.mp3";
import {
  startGlobalLoadingIndicator,
  stopGlobalLoadingIndicator,
} from "../../Components/GlobalLoadingIndicator";
import { maxCanvasScale } from "../../Util/MaxCanvasScale";

var audioContext, pingBuffer, explosionBuffer, audioVolume, lastAudioSource;

var scrollPreventCanvas, trackCanvas, carCanvas, imageCanvas, screenCanvas;

var trackContext, carContext, imageContext, screenContext;

var r1 = 260;
var r2 = 330;
var r4 = 190;
var r5 = 180;
var r6 = 150;

var alpha = (45 * Math.PI) / 180;
var explosiveImages = new Array(22);
var explosiveTimer, explosiveIndex;

var carImage1, carImage2, replayImage;
var raceTrackImage;

var omega, theta1, theta2;
var R1, R2;
var carTimer, AITimer;
var innerRad = 225;
var outerRad = 295;
var phi = (5 * Math.PI) / 180;
var gameOver = 0;
var isCarTimerRunning = 0;
var isAITimerRunning = 0;
var isExplosiveTimerRunning = 0;
var ignoreClicks = 0;
var score = 0;
var isPingAudioLoaded = 0,
  isPingAudioLoading = 0,
  isExplosionAudioLoaded = 0,
  isExplosionAudioLoading = 0,
  isIOS,
  isMobile;

function loadExplosionAudio() {
  if (isExplosionAudioLoading) return;
  isExplosionAudioLoading = 1;
  var request = new XMLHttpRequest();
  request.open("GET", explosionURL, true);
  request.responseType = "arraybuffer";
  request.onload = function () {
    audioContext.decodeAudioData(request.response, function (buffer) {
      explosionBuffer = buffer;
      isExplosionAudioLoaded = 1;
      if (isIOS) initializeGame();
    });
  };
  request.send();
}

function loadPingAudio() {
  if (isPingAudioLoading) return;
  isPingAudioLoading = 1;
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  audioVolume = audioContext.createGain();
  audioVolume.connect(audioContext.destination);
  var request = new XMLHttpRequest();
  request.open("GET", pingURL, true);
  request.responseType = "arraybuffer";
  request.onload = function () {
    audioContext.decodeAudioData(request.response, function (buffer) {
      pingBuffer = buffer;
      isPingAudioLoaded = 1;
    });
  };
  request.send();
}

function playPingSound() {
  if (!isPingAudioLoaded) return;
  if (lastAudioSource) {
    lastAudioSource.stop();
  }
  var audioSource = audioContext.createBufferSource();
  audioSource.connect(audioVolume);
  audioSource.buffer = pingBuffer;
  if (audioSource.start) {
    audioSource.start(0);
  } else if (audioSource.play) {
    audioSource.play(0);
  } else if (audioSource.noteOn) {
    audioSource.noteOn(0);
  }
  lastAudioSource = audioSource;
}

function playExplosionSound() {
  if (!isExplosionAudioLoaded) return;
  if (lastAudioSource) {
    lastAudioSource.stop();
  }
  var audioSource = audioContext.createBufferSource();
  audioSource.connect(audioVolume);
  audioSource.buffer = explosionBuffer;
  if (audioSource.start) {
    audioSource.start(0);
  } else if (audioSource.play) {
    audioSource.play(0);
  } else if (audioSource.noteOn) {
    audioSource.noteOn(0);
  }
  lastAudioSource = audioSource;
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
  centerCanvas(scrollPreventCanvas);
  centerCanvas(trackCanvas);
  centerCanvas(carCanvas);
  centerCanvas(imageCanvas);
  centerCanvas(screenCanvas);
}

function rescaleCanvases() {
  window.scrollTo(0, 0);
  scrollPreventCanvas.style.left = "0px";
  scrollPreventCanvas.style.top = "0px";
  scrollPreventCanvas.width = window.innerWidth;
  scrollPreventCanvas.height = window.innerHeight;
  screenCanvas.style.left = "0px";
  screenCanvas.style.top = "0px";
  trackCanvas.style.left = "0px";
  trackCanvas.style.top = "0px";
  carCanvas.style.left = "0px";
  carCanvas.style.top = "0px";
  imageCanvas.style.left = "0px";
  imageCanvas.style.top = "0px";
  var rect = screenCanvas.getBoundingClientRect();
  var x0 = rect.left;
  var neededWidth = window.innerWidth;
  var y0 = rect.top;
  var neededHeight = window.innerHeight;
  var scaleX = neededWidth / 700;
  var scaleY = neededHeight / 700;
  var scale = scaleX < scaleY ? scaleX : scaleY;
  if (scale >= maxCanvasScale) {
    scale = maxCanvasScale;
  }
  trackCanvas.width = Math.round(700 * scale);
  trackCanvas.height = Math.round(700 * scale);
  trackContext.scale(scale, scale);
  carCanvas.width = Math.round(700 * scale);
  carCanvas.height = Math.round(700 * scale);
  carContext.scale(scale, scale);
  screenCanvas.width = Math.round(700 * scale);
  screenCanvas.height = Math.round(700 * scale);
  screenContext.scale(scale, scale);
  imageCanvas.width = 0;
  imageCanvas.height = 0;
  if (isMobile) {
    setTimeout(function () {
      window.scrollTo(0, y0);
      centerAllCanvases();
    }, 500);
  } else {
    window.scrollTo(0, y0);
    centerAllCanvases();
  }
  drawScore();
  drawCars();
  trackContext.drawImage(raceTrackImage, 0, 0);
  if (gameOver) {
    screenContext.drawImage(replayImage, 300, 300);
  }
}

function drawScore() {
  screenContext.clearRect(0, 0, 700, 700);
  screenContext.strokeStyle = "black";
  screenContext.fillStyle = "white";
  screenContext.lineWidth = 3;
  screenContext.font = "36px helvetica";
  screenContext.textAlign = "center";
  screenContext.textBaseline = "middle";
  screenContext.strokeText(score + "", 650, 50);
  screenContext.fillText(score + "", 650, 50);
}

function detectCollision() {
  if (theta1 + phi >= theta2 && theta1 - phi <= theta2 && R1 == R2) {
    if (isCarTimerRunning) {
      clearInterval(carTimer);
      isCarTimerRunning = 0;
    }
    if (isAITimerRunning) {
      clearInterval(AITimer);
      isAITimerRunning = 0;
    }
    animateCollision();
  }
  if (theta1 >= 2 * Math.PI - 2 * phi && R1 == R2) {
    if (isCarTimerRunning) {
      clearInterval(carTimer);
      isCarTimerRunning = 0;
    }
    if (isAITimerRunning) {
      clearInterval(AITimer);
      isAITimerRunning = 0;
    }
    animateCollision();
  }
}

function carAI() {
  if (Math.random() < 0.4) {
    return;
  }
  if (R2 === innerRad) {
    R2 = outerRad;
  } else {
    R2 = innerRad;
  }
}

function userClick(evt) {
  evt.preventDefault();
  if (isIOS && !isPingAudioLoaded) {
    loadPingAudio();
  }
  if (isIOS && !isExplosionAudioLoaded) {
    loadExplosionAudio();
    return;
  }
  if (ignoreClicks) {
    return;
  }
  if (gameOver) {
    initializeGame();
    return;
  }
  if (R1 === innerRad) {
    R1 = outerRad;
  } else {
    R1 = innerRad;
  }
}

function drawCars() {
  carContext.clearRect(0, 0, 700, 700);
  carContext.save();
  carContext.translate(350, 350);
  carContext.rotate(theta1);
  carContext.drawImage(carImage1, -55, -R1 - 50);
  carContext.restore();
  carContext.save();
  carContext.translate(350, 350);
  carContext.rotate(theta2);
  carContext.drawImage(carImage2, -55, -R2 - 50);
  carContext.restore();
}

function moveCars() {
  theta1 += omega;
  theta2 -= omega;
  if (theta2 < 0) {
    theta2 += 2 * Math.PI;
    carAI();
  }
  if (theta1 >= 2 * Math.PI) {
    score++;
    playPingSound();
    drawScore();
    theta1 -= 2 * Math.PI;
  }
  detectCollision();
  drawCars();
}

function initializeGame() {
  playPingSound();
  score = 0;
  ignoreClicks = 0;
  gameOver = 0;
  screenContext.clearRect(0, 0, 700, 700);
  drawScore();
  R1 = 295;
  R2 = 225;
  omega = (2.5 * Math.PI) / 180;
  var period = (20 * Math.PI) / omega;
  theta1 = 0;
  theta2 = 0;
  if (!isCarTimerRunning) {
    carTimer = setInterval(moveCars, 10);
    isCarTimerRunning = 1;
  }
}

function startGame() {
  score = 0;
  ignoreClicks = 0;
  R1 = 295;
  R2 = 225;
  omega = (2.5 * Math.PI) / 180;
  var period = (20 * Math.PI) / omega;
  theta1 = 0;
  theta2 = 0;
  gameOver = 1;
  rescaleCanvases();
  window.addEventListener("resize", rescaleCanvases);
  stopGlobalLoadingIndicator();
  screenCanvas.addEventListener("mousedown", userClick);
  screenCanvas.addEventListener("touchstart", userClick);
  screenCanvas.addEventListener("touchmove", function (evt) {
    evt.preventDefault();
  });
  scrollPreventCanvas.addEventListener("touchmove", function (evt) {
    evt.preventDefault();
  });
}

function createReplayButton() {
  imageContext.clearRect(0, 0, 100, 100);
  imageContext.fillStyle = "black";
  imageContext.beginPath();
  imageContext.moveTo(imageCanvas.width / 2, imageCanvas.height / 2);
  imageContext.arc(
    imageCanvas.width / 2,
    imageCanvas.height / 2,
    42,
    0,
    2 * Math.PI
  );
  imageContext.closePath();
  imageContext.fill();
  var grad = imageContext.createLinearGradient(0, 0, 100, 0);
  grad.addColorStop(0, "#ff4500");
  grad.addColorStop(1, "#ffbe5c");
  imageContext.fillStyle = grad;
  imageContext.beginPath();
  imageContext.moveTo(imageCanvas.width / 2, imageCanvas.height / 2);
  imageContext.arc(
    imageCanvas.width / 2,
    imageCanvas.height / 2,
    38,
    0,
    2 * Math.PI
  );
  imageContext.closePath();
  imageContext.fill();
  var grad1 = imageContext.createRadialGradient(50, 25, 0, 50, 50, 50);
  grad1.addColorStop(0, "rgba(255,255,255,0.8)");
  grad1.addColorStop(0.6, "rgba(255,255,255,0.3)");
  grad1.addColorStop(1, "rgba(100,0,0,0)");
  imageContext.fillStyle = grad1;
  imageContext.beginPath();
  imageContext.moveTo(imageCanvas.width / 2, imageCanvas.height / 2);
  imageContext.arc(
    imageCanvas.width / 2,
    imageCanvas.height / 2,
    38,
    0,
    2 * Math.PI
  );
  imageContext.closePath();
  imageContext.fill();
  imageContext.fillStyle = "black";
  imageContext.beginPath();
  imageContext.moveTo(45 - 3, 50 + 15);
  imageContext.lineTo(45 - 3, 20 + 15);
  imageContext.lineTo(71 - 3, 35 + 15);
  imageContext.lineTo(45 - 3, 50 + 15);
  imageContext.lineTo(45 - 3, 20 + 15);
  imageContext.closePath();
  imageContext.fill();
  replayImage = new Image(100, 100);
  replayImage.src = imageCanvas.toDataURL("image/png");
  replayImage.onload = startGame;
}

function createRaceTrack() {
  carCanvas.width = 700;
  carCanvas.height = 700;
  trackContext.clearRect(0, 0, 700, 700);
  var grad = trackContext.createLinearGradient(0, 0, 700, 700);
  grad.addColorStop(0, "rgb(0,120,0)");
  grad.addColorStop(1, "rgb(0,51,0)");
  trackContext.fillStyle = grad;
  trackContext.fillRect(0, 0, 700, 700);
  trackContext.fillStyle = "rgb(90,90,90)";
  trackContext.beginPath();
  trackContext.moveTo(trackCanvas.width / 2, trackCanvas.height / 2);
  trackContext.arc(
    trackCanvas.width / 2,
    trackCanvas.height / 2,
    r2,
    0,
    2 * Math.PI
  );
  trackContext.closePath();
  trackContext.fill();
  trackContext.fillStyle = "rgb(51,51,51)";
  trackContext.beginPath();
  trackContext.moveTo(trackCanvas.width / 2, trackCanvas.height / 2);
  trackContext.arc(
    trackCanvas.width / 2,
    trackCanvas.height / 2,
    r1,
    0,
    2 * Math.PI
  );
  trackContext.closePath();
  trackContext.fill();
  trackContext.fillStyle = "rgb(0,51,0)";
  trackContext.beginPath();
  trackContext.moveTo(trackCanvas.width / 2, trackCanvas.height / 2);
  trackContext.arc(
    trackCanvas.width / 2,
    trackCanvas.height / 2,
    r4,
    0,
    2 * Math.PI
  );
  trackContext.closePath();
  trackContext.fill();
  grad = trackContext.createRadialGradient(
    trackCanvas.width / 2,
    trackCanvas.height / 2,
    r6,
    trackCanvas.width / 2,
    trackCanvas.height / 2,
    r5
  );
  grad.addColorStop(0, "rgb(0,51,0)");
  grad.addColorStop(0.8, "rgb(0,102,0)");
  trackContext.fillStyle = grad;
  trackContext.beginPath();
  trackContext.moveTo(trackCanvas.width / 2, trackCanvas.height / 2);
  trackContext.arc(
    trackCanvas.width / 2,
    trackCanvas.height / 2,
    r5,
    0,
    2 * Math.PI
  );
  trackContext.closePath();
  trackContext.fill();
  createTrackMarks();
  createStartRace();
  createLaneMarks();
  raceTrackImage = new Image(700, 700);
  raceTrackImage.src = trackCanvas.toDataURL("image/png");
  raceTrackImage.onload = createReplayButton;
}

function createTrackMarks() {
  trackContext.strokeStyle = "white";
  trackContext.lineWidth = 3;
  trackContext.beginPath();
  for (var i = 0; i < 2 * Math.PI; i += Math.PI / 20) {
    trackContext.moveTo(
      r1 * Math.cos(i) + trackCanvas.width / 2,
      r1 * Math.sin(i) + trackCanvas.height / 2
    );
    trackContext.arc(
      trackCanvas.width / 2,
      trackCanvas.height / 2,
      r1,
      i,
      i + Math.PI / 40
    );
  }
  trackContext.stroke();
}

function createLaneMarks() {
  trackContext.strokeStyle = "white";
  trackContext.lineWidth = 5;
  trackContext.beginPath();
  for (var i = 0; i < 2 * Math.PI; i += Math.PI / 10) {
    trackContext.moveTo(
      r2 * Math.cos(i) + trackCanvas.width / 2,
      r2 * Math.sin(i) + trackCanvas.height / 2
    );
    trackContext.arc(
      trackCanvas.width / 2,
      trackCanvas.height / 2,
      r2,
      i,
      i + Math.PI / 20
    );
  }
  trackContext.stroke();
  trackContext.strokeStyle = "red";
  trackContext.lineWidth = 5;
  trackContext.beginPath();
  for (
    var i = Math.PI / 20;
    i < 2 * Math.PI + Math.PI / 20;
    i += Math.PI / 10
  ) {
    trackContext.moveTo(
      r2 * Math.cos(i) + trackCanvas.width / 2,
      r2 * Math.sin(i) + trackCanvas.height / 2
    );
    trackContext.arc(
      trackCanvas.width / 2,
      trackCanvas.height / 2,
      r2,
      i,
      i + Math.PI / 20
    );
  }
  trackContext.stroke();

  trackContext.strokeStyle = "white";
  trackContext.lineWidth = 3;
  trackContext.beginPath();
  for (var i = 0; i < 2 * Math.PI; i += Math.PI / 10) {
    trackContext.moveTo(
      r4 * Math.cos(i) + trackCanvas.width / 2,
      r4 * Math.sin(i) + trackCanvas.height / 2
    );
    trackContext.arc(
      trackCanvas.width / 2,
      trackCanvas.height / 2,
      r4,
      i,
      i + Math.PI / 20
    );
  }
  trackContext.stroke();
  trackContext.strokeStyle = "red";
  trackContext.lineWidth = 3;
  trackContext.beginPath();
  for (
    var i = Math.PI / 20;
    i < 2 * Math.PI + Math.PI / 20;
    i += Math.PI / 10
  ) {
    trackContext.moveTo(
      r4 * Math.cos(i) + trackCanvas.width / 2,
      r4 * Math.sin(i) + trackCanvas.height / 2
    );
    trackContext.arc(
      trackCanvas.width / 2,
      trackCanvas.height / 2,
      r4,
      i,
      i + Math.PI / 20
    );
  }
  trackContext.stroke();
}

function createStartRace() {
  trackContext.fillStyle = "rgb(40,40,40)";
  trackContext.fillRect(
    trackCanvas.width / 2 - 20,
    trackCanvas.height / 2 - r2,
    40,
    140
  );
  trackContext.strokeStyle = "white";
  trackContext.lineWidth = 3;
  trackContext.strokeRect(
    trackCanvas.width / 2 - 20,
    trackCanvas.height / 2 - r2 + 1,
    40,
    139
  );
  trackContext.fillStyle = "white";
  for (var y = 0; y < 140; y += 40) {
    trackContext.fillRect(
      trackCanvas.width / 2 - 20,
      trackCanvas.height / 2 - r2 + y,
      20,
      20
    );
  }
  for (var y = 20; y < 140; y += 40) {
    trackContext.fillRect(
      trackCanvas.width / 2,
      trackCanvas.height / 2 - r2 + y,
      20,
      20
    );
  }
}

function createCar1() {
  carContext.clearRect(0, 0, 110, 100);
  carContext.save();
  carContext.translate(5, 25);
  //back axle
  carContext.fillStyle = "rgb(89,89,89)";
  carContext.fillRect(20, 13, 3, 27);
  //back blue under red design
  var grad5 = carContext.createLinearGradient(29, 0, 58, 0);
  grad5.addColorStop(0, "rgb(51,51,225)");
  grad5.addColorStop(0.6, "yellow");
  carContext.fillStyle = grad5;
  carContext.fillRect(29, 7, 29, 36);
  //red upper body design
  var grad = carContext.createLinearGradient(19, 0, 98, 0);
  //grad.addColorStop(0.8,"rgb(240,0,0)");
  grad.addColorStop(0, "rgb(102,0,0)");
  grad.addColorStop(1, "rgb(255,0,0)");
  carContext.fillStyle = grad;
  carContext.beginPath();
  carContext.moveTo(12, 7);
  carContext.bezierCurveTo(15, 30, 35, 7, 58, 7);
  carContext.lineTo(58, 43);
  carContext.bezierCurveTo(35, 43, 15, 20, 12, 43);
  carContext.closePath();
  carContext.fill();
  //curve to fix the front red upper body design
  carContext.fillStyle = grad;
  carContext.beginPath();
  carContext.moveTo(58, 7);
  carContext.bezierCurveTo(65, 10, 78, 23, 98, 23);
  carContext.lineTo(58, 23);
  carContext.lineTo(58, 7);
  carContext.closePath();
  carContext.fill();
  carContext.fillStyle = grad;
  carContext.beginPath();
  carContext.moveTo(58, 43);
  carContext.bezierCurveTo(65, 40, 78, 27, 98, 27);
  carContext.lineTo(58, 27);
  carContext.lineTo(58, 43);
  carContext.closePath();
  carContext.fill();
  //back tires
  var grad3 = carContext.createLinearGradient(10, 0, 30, 0);
  grad3.addColorStop(0, "rgb(26,26,26)");
  grad3.addColorStop(0.5, "rgb(115,115,115)");
  grad3.addColorStop(1, "rgb(26,26,26)");
  carContext.fillStyle = grad3;
  carContext.beginPath();
  carContext.moveTo(10, 10);
  carContext.lineTo(10, -8);
  carContext.bezierCurveTo(20, -10, 20, -10, 30, -8);
  carContext.lineTo(30, 13);
  carContext.bezierCurveTo(20, 15, 20, 15, 10, 13);
  carContext.closePath();
  carContext.fill();
  carContext.fillStyle = grad3;
  carContext.beginPath();
  carContext.moveTo(10, 40);
  carContext.lineTo(10, 58);
  carContext.bezierCurveTo(20, 60, 20, 60, 30, 58);
  carContext.lineTo(30, 37);
  carContext.bezierCurveTo(20, 35, 20, 35, 10, 37);
  carContext.closePath();
  carContext.fill();
  // Front tires
  grad3 = carContext.createLinearGradient(68, 0, 85, 0);
  grad3.addColorStop(0, "rgb(26,26,26)");
  grad3.addColorStop(0.5, "rgb(115,115,115)");
  grad3.addColorStop(1, "rgb(26,26,26)");
  carContext.fillStyle = grad3;
  carContext.beginPath();
  carContext.moveTo(68, 10);
  carContext.lineTo(68, -8);
  carContext.bezierCurveTo(76, -10, 77, -10, 85, -8);
  carContext.lineTo(85, 10);
  carContext.bezierCurveTo(76, 12, 77, 12, 68, 10);
  carContext.closePath();
  carContext.fill();
  carContext.fillStyle = grad3;
  carContext.beginPath();
  carContext.moveTo(68, 40);
  carContext.lineTo(68, 58);
  carContext.bezierCurveTo(76, 60, 77, 60, 85, 58);
  carContext.lineTo(85, 40);
  carContext.bezierCurveTo(76, 38, 77, 38, 68, 40);
  carContext.closePath();
  carContext.fill();
  carContext.fillStyle = "rgb(89,89,89)";
  carContext.fillRect(75, 10, 4, 30);
  //front bender
  var grad1 = carContext.createLinearGradient(87, 0, 104, 0);
  grad1.addColorStop(0, "rgb(120,0,0)");
  grad1.addColorStop(1, "rgb(240,0,0)");
  carContext.fillStyle = grad1;
  carContext.beginPath();
  carContext.moveTo(87, 0);
  carContext.lineTo(102, 0);
  carContext.bezierCurveTo(98, 15, 102, 20, 104, 25);
  carContext.bezierCurveTo(102, 30, 98, 35, 102, 50);
  carContext.lineTo(87, 50);
  carContext.bezierCurveTo(91, 25, 92, 25, 87, 0);
  carContext.closePath();
  carContext.fill();
  //front nose design
  carContext.fillStyle = grad;
  carContext.beginPath();
  carContext.moveTo(58, 15);
  carContext.lineTo(93, 21);
  carContext.bezierCurveTo(99, 25, 99, 25, 93, 29);
  carContext.lineTo(58, 35);
  carContext.closePath();
  carContext.fill();
  //back bender
  grad = carContext.createLinearGradient(-2, -2, 17, -2);
  carContext.strokeStyle = "black";
  grad.addColorStop(0, "rgb(170,0,0)");
  grad.addColorStop(1, "rgb(240,0,0)");
  carContext.fillStyle = grad;
  carContext.fillRect(-2, -2, 19, 50);
  carContext.strokeRect(-2, -2, 19, 50);
  // window
  var grad2 = carContext.createLinearGradient(50, 13, 50, 37);
  grad2.addColorStop(1, "rgb(179,179,179)");
  grad2.addColorStop(0.5, "white");
  grad2.addColorStop(0, "rgb(179,179,179)");
  carContext.fillStyle = grad2;
  carContext.beginPath();
  carContext.moveTo(50, 13);
  carContext.lineTo(50, 37);
  carContext.bezierCurveTo(69, 34, 69, 16, 50, 13);
  carContext.closePath();
  carContext.fill();
  carContext.fillStyle = grad2;
  carContext.beginPath();
  carContext.moveTo(50, 13);
  carContext.lineTo(50, 37);
  carContext.lineTo(23, 28);
  carContext.lineTo(23, 22);
  carContext.lineTo(50, 13);
  carContext.closePath();
  carContext.fill();
  var grad4 = carContext.createLinearGradient(50, 15, 50, 35);
  grad4.addColorStop(0, "rgb(0,0,0)");
  grad4.addColorStop(0.5, "rgb(115,115,115)");
  grad4.addColorStop(1, "rgb(0,0,0)");
  carContext.fillStyle = grad4;
  carContext.beginPath();
  carContext.moveTo(50, 15);
  carContext.lineTo(50, 35);
  carContext.bezierCurveTo(65, 33, 65, 17, 50, 15);
  carContext.closePath();
  carContext.fill();
  carContext.restore();
  carImage1 = new Image(110, 100);
  carImage1.src = carCanvas.toDataURL("image/png");
  carImage1.onload = createCar2;
}

function createCar2() {
  carContext.clearRect(0, 0, 110, 100);
  carContext.save();
  carContext.translate(55, 50);
  carContext.rotate(Math.PI);
  carContext.translate(-55, -50);
  carContext.translate(5, 25);
  //back axle
  carContext.fillStyle = "rgb(89,89,89)";
  carContext.fillRect(20, 13, 3, 27);
  //back blue under red design
  var grad5 = carContext.createLinearGradient(29, 0, 58, 0);
  grad5.addColorStop(0, "rgb(255,51,0)");
  grad5.addColorStop(0.6, "yellow");
  carContext.fillStyle = grad5;
  carContext.fillRect(29, 7, 29, 36);
  //red upper body design
  var grad = carContext.createLinearGradient(19, 0, 98, 0);
  //grad.addColorStop(0.8,"rgb(240,0,0)");
  grad.addColorStop(0, "rgb(0,0,102)");
  grad.addColorStop(1, "rgb(128,128,255)");
  carContext.fillStyle = grad;
  carContext.beginPath();
  carContext.moveTo(12, 7);
  carContext.bezierCurveTo(15, 30, 35, 7, 58, 7);
  carContext.lineTo(58, 43);
  carContext.bezierCurveTo(35, 43, 15, 20, 12, 43);
  carContext.closePath();
  carContext.fill();
  //curve to fix the front red upper body design
  carContext.fillStyle = grad;
  carContext.beginPath();
  carContext.moveTo(58, 7);
  carContext.bezierCurveTo(65, 10, 78, 23, 98, 23);
  carContext.lineTo(58, 23);
  carContext.lineTo(58, 7);
  carContext.closePath();
  carContext.fill();
  carContext.fillStyle = grad;
  carContext.beginPath();
  carContext.moveTo(58, 43);
  carContext.bezierCurveTo(65, 40, 78, 27, 98, 27);
  carContext.lineTo(58, 27);
  carContext.lineTo(58, 43);
  carContext.closePath();
  carContext.fill();
  //back tires
  var grad3 = carContext.createLinearGradient(10, 0, 30, 0);
  grad3.addColorStop(0, "rgb(26,26,26)");
  grad3.addColorStop(0.5, "rgb(115,115,115)");
  grad3.addColorStop(1, "rgb(26,26,26)");
  carContext.fillStyle = grad3;
  carContext.beginPath();
  carContext.moveTo(10, 10);
  carContext.lineTo(10, -8);
  carContext.bezierCurveTo(20, -10, 20, -10, 30, -8);
  carContext.lineTo(30, 13);
  carContext.bezierCurveTo(20, 15, 20, 15, 10, 13);
  carContext.closePath();
  carContext.fill();
  carContext.fillStyle = grad3;
  carContext.beginPath();
  carContext.moveTo(10, 40);
  carContext.lineTo(10, 58);
  carContext.bezierCurveTo(20, 60, 20, 60, 30, 58);
  carContext.lineTo(30, 37);
  carContext.bezierCurveTo(20, 35, 20, 35, 10, 37);
  carContext.closePath();
  carContext.fill();
  // Front tires
  grad3 = carContext.createLinearGradient(68, 0, 85, 0);
  grad3.addColorStop(0, "rgb(26,26,26)");
  grad3.addColorStop(0.5, "rgb(115,115,115)");
  grad3.addColorStop(1, "rgb(26,26,26)");
  carContext.fillStyle = grad3;
  carContext.beginPath();
  carContext.moveTo(68, 10);
  carContext.lineTo(68, -8);
  carContext.bezierCurveTo(76, -10, 77, -10, 85, -8);
  carContext.lineTo(85, 10);
  carContext.bezierCurveTo(76, 12, 77, 12, 68, 10);
  carContext.closePath();
  carContext.fill();
  carContext.fillStyle = grad3;
  carContext.beginPath();
  carContext.moveTo(68, 40);
  carContext.lineTo(68, 58);
  carContext.bezierCurveTo(76, 60, 77, 60, 85, 58);
  carContext.lineTo(85, 40);
  carContext.bezierCurveTo(76, 38, 77, 38, 68, 40);
  carContext.closePath();
  carContext.fill();
  carContext.fillStyle = "rgb(89,89,89)";
  carContext.fillRect(75, 10, 4, 30);
  //front bender
  var grad1 = carContext.createLinearGradient(87, 0, 104, 0);
  grad1.addColorStop(0, "rgb(0,0,77)");
  grad1.addColorStop(1, "rgb(179,179,255)");
  carContext.fillStyle = grad1;
  carContext.beginPath();
  carContext.moveTo(87, 0);
  carContext.lineTo(102, 0);
  carContext.bezierCurveTo(98, 15, 102, 20, 104, 25);
  carContext.bezierCurveTo(102, 30, 98, 35, 102, 50);
  carContext.lineTo(87, 50);
  carContext.bezierCurveTo(91, 25, 92, 25, 87, 0);
  carContext.closePath();
  carContext.fill();
  //front nose design
  carContext.fillStyle = grad;
  carContext.beginPath();
  carContext.moveTo(58, 15);
  carContext.lineTo(93, 21);
  carContext.bezierCurveTo(99, 25, 99, 25, 93, 29);
  carContext.lineTo(58, 35);
  carContext.closePath();
  carContext.fill();
  //back bender
  grad = carContext.createLinearGradient(-2, -2, 17, -2);
  carContext.strokeStyle = "black";
  grad.addColorStop(0, "rgb(0,0,170)");
  grad.addColorStop(1, "rgb(153,153,255)");
  carContext.fillStyle = grad;
  carContext.fillRect(-2, -2, 19, 50);
  carContext.strokeRect(-2, -2, 19, 50);
  // window
  var grad2 = carContext.createLinearGradient(50, 13, 50, 37);
  grad2.addColorStop(1, "rgb(179,179,179)");
  grad2.addColorStop(0.5, "white");
  grad2.addColorStop(0, "rgb(179,179,179)");
  carContext.fillStyle = grad2;
  carContext.beginPath();
  carContext.moveTo(50, 13);
  carContext.lineTo(50, 37);
  carContext.bezierCurveTo(69, 34, 69, 16, 50, 13);
  carContext.closePath();
  carContext.fill();
  carContext.fillStyle = grad2;
  carContext.beginPath();
  carContext.moveTo(50, 13);
  carContext.lineTo(50, 37);
  carContext.lineTo(23, 28);
  carContext.lineTo(23, 22);
  carContext.lineTo(50, 13);
  carContext.closePath();
  carContext.fill();
  var grad4 = carContext.createLinearGradient(50, 15, 50, 35);
  grad4.addColorStop(0, "rgb(0,0,0)");
  grad4.addColorStop(0.5, "rgb(115,115,115)");
  grad4.addColorStop(1, "rgb(0,0,0)");
  carContext.fillStyle = grad4;
  carContext.beginPath();
  carContext.moveTo(50, 15);
  carContext.lineTo(50, 35);
  carContext.bezierCurveTo(65, 33, 65, 17, 50, 15);
  carContext.closePath();
  carContext.fill();
  carContext.restore();
  carImage2 = new Image(110, 100);
  carImage2.src = carCanvas.toDataURL("image/png");
  carImage2.onload = createRaceTrack;
}

function animateCollision() {
  explosiveIndex = 0;
  if (isExplosiveTimerRunning) {
    return;
  }
  ignoreClicks = 1;
  explosiveTimer = setInterval(function () {
    if (explosiveIndex < 22) {
      carContext.clearRect(0, 0, 700, 700);
      carContext.save();
      carContext.translate(350, 350);
      carContext.rotate(theta1);
      carContext.drawImage(explosiveImages[explosiveIndex], -20, -R1 - 20);
      carContext.restore();
      explosiveIndex++;
    } else {
      if (isExplosiveTimerRunning) {
        clearInterval(explosiveTimer);
        isExplosiveTimerRunning = 0;
      }
      ignoreClicks = 0;
      //carContext.clearRect(0,0,700,700);
      R1 = 295;
      R2 = 225;
      theta1 = 0;
      theta2 = 0;
      drawCars();
      gameOver = 1;
      screenContext.drawImage(replayImage, 300, 300);
    }
  }, 30);
  playExplosionSound();
  isExplosiveTimerRunning = 1;
}

function smoke7() {
  imageCanvas.width = imageCanvas.width;
  imageContext.strokeStyle = "lightgrey";
  imageContext.fillStyle = "lightgrey";
  imageContext.beginPath();
  imageContext.moveTo(75, 30);
  //imageContext.lineTo(65,40);
  imageContext.bezierCurveTo(90, 20, 90, 20, 85, 10);
  imageContext.bezierCurveTo(85, 25, 85, 25, 75, 30);
  imageContext.closePath();
  imageContext.stroke();
  imageContext.fill();
  imageContext.beginPath();
  imageContext.moveTo(30, 95);
  //imageContext.lineTo(50,75);
  imageContext.bezierCurveTo(40, 98, 40, 98, 50, 95);
  imageContext.bezierCurveTo(40, 95, 40, 95, 30, 95);
  imageContext.closePath();
  imageContext.stroke();
  imageContext.fill();
  explosiveImages[21] = new Image(40, 40);
  explosiveImages[21].src = imageCanvas.toDataURL("image/png");
  explosiveImages[21].onload = createCar1;
}

function smoke6() {
  imageCanvas.width = imageCanvas.width;
  imageContext.strokeStyle = "lightgrey";
  imageContext.fillStyle = "lightgrey";
  imageContext.beginPath();
  imageContext.moveTo(75, 50);
  //imageContext.lineTo(45,40);
  imageContext.bezierCurveTo(90, 20, 90, 20, 65, 30);
  imageContext.bezierCurveTo(85, 25, 85, 25, 75, 50);
  imageContext.closePath();
  imageContext.stroke();
  imageContext.fill();
  imageContext.beginPath();
  imageContext.moveTo(10, 45);
  //imageContext.lineTo(25,65);
  imageContext.bezierCurveTo(1, 44, 1, 44, 5, 45);
  imageContext.bezierCurveTo(8, 46, 8, 46, 10, 45);
  imageContext.closePath();
  imageContext.stroke();
  imageContext.fill();
  imageContext.beginPath();
  imageContext.moveTo(30, 85);
  //imageContext.lineTo(50,75);
  imageContext.bezierCurveTo(40, 98, 40, 98, 50, 85);
  imageContext.bezierCurveTo(40, 95, 40, 95, 30, 85);
  imageContext.closePath();
  imageContext.stroke();
  imageContext.fill();
  explosiveImages[20] = new Image(40, 40);
  explosiveImages[20].src = imageCanvas.toDataURL("image/png");
  explosiveImages[20].onload = smoke7;
}

function smoke5() {
  imageCanvas.width = imageCanvas.width;
  imageContext.strokeStyle = "lightgrey";
  imageContext.fillStyle = "lightgrey";
  imageContext.beginPath();
  imageContext.moveTo(55, 60);
  //imageContext.lineTo(45,40);
  imageContext.bezierCurveTo(90, 20, 90, 20, 45, 40);
  imageContext.bezierCurveTo(85, 25, 85, 25, 55, 60);
  imageContext.closePath();
  imageContext.stroke();
  imageContext.fill();
  imageContext.beginPath();
  imageContext.moveTo(30, 45);
  //imageContext.lineTo(25,65);
  imageContext.bezierCurveTo(1, 54, 1, 54, 25, 65);
  imageContext.bezierCurveTo(8, 56, 8, 56, 30, 45);
  imageContext.closePath();
  imageContext.stroke();
  imageContext.fill();
  imageContext.beginPath();
  imageContext.moveTo(30, 75);
  //imageContext.lineTo(50,75);
  imageContext.bezierCurveTo(40, 98, 40, 98, 50, 75);
  imageContext.bezierCurveTo(40, 95, 40, 95, 30, 75);
  imageContext.closePath();
  imageContext.stroke();
  imageContext.fill();
  explosiveImages[19] = new Image(40, 40);
  explosiveImages[19].src = imageCanvas.toDataURL("image/png");
  explosiveImages[19].onload = smoke6;
}

function smoke4() {
  imageCanvas.width = imageCanvas.width;
  imageContext.strokeStyle = "lightgrey";
  imageContext.fillStyle = "lightgrey";
  imageContext.beginPath();
  imageContext.moveTo(55, 60);
  //imageContext.lineTo(45,40);
  imageContext.bezierCurveTo(90, 20, 90, 20, 45, 40);
  imageContext.bezierCurveTo(80, 30, 80, 30, 55, 60);
  imageContext.closePath();
  imageContext.stroke();
  imageContext.fill();
  imageContext.beginPath();
  imageContext.moveTo(30, 45);
  //imageContext.lineTo(25,65);
  imageContext.bezierCurveTo(2, 55, 2, 55, 25, 65);
  imageContext.bezierCurveTo(12, 57, 12, 57, 30, 45);
  imageContext.closePath();
  imageContext.stroke();
  imageContext.fill();
  imageContext.beginPath();
  imageContext.moveTo(30, 75);
  //imageContext.lineTo(50,75);
  imageContext.bezierCurveTo(40, 97, 40, 97, 50, 75);
  imageContext.bezierCurveTo(40, 90, 40, 90, 30, 75);
  imageContext.closePath();
  imageContext.stroke();
  imageContext.fill();
  explosiveImages[18] = new Image(40, 40);
  explosiveImages[18].src = imageCanvas.toDataURL("image/png");
  explosiveImages[18].onload = smoke5;
}

function smoke3() {
  imageCanvas.width = imageCanvas.width;
  imageContext.strokeStyle = "lightgrey";
  imageContext.fillStyle = "lightgrey";
  imageContext.beginPath();
  imageContext.moveTo(55, 60);
  //imageContext.lineTo(45,40);
  imageContext.bezierCurveTo(80, 30, 80, 30, 45, 40);
  imageContext.bezierCurveTo(60, 40, 60, 40, 55, 60);
  imageContext.closePath();
  imageContext.stroke();
  imageContext.fill();
  imageContext.beginPath();
  imageContext.moveTo(30, 45);
  //imageContext.lineTo(25,65);
  imageContext.bezierCurveTo(4, 57, 4, 57, 25, 65);
  imageContext.bezierCurveTo(17, 55, 17, 55, 30, 45);
  imageContext.closePath();
  imageContext.stroke();
  imageContext.fill();
  imageContext.beginPath();
  imageContext.moveTo(30, 75);
  //imageContext.lineTo(50,75);
  imageContext.bezierCurveTo(40, 95, 40, 95, 50, 75);
  imageContext.bezierCurveTo(40, 80, 40, 80, 30, 75);
  imageContext.closePath();
  imageContext.stroke();
  imageContext.fill();
  explosiveImages[17] = new Image(40, 40);
  explosiveImages[17].src = imageCanvas.toDataURL("image/png");
  explosiveImages[17].onload = smoke4;
}

function smoke2() {
  imageCanvas.width = imageCanvas.width;
  imageContext.strokeStyle = "lightgrey";
  imageContext.fillStyle = "lightgrey";
  imageContext.beginPath();
  imageContext.moveTo(55, 60);
  //imageContext.lineTo(45,40);
  imageContext.bezierCurveTo(70, 40, 70, 40, 45, 40);
  imageContext.bezierCurveTo(60, 48, 60, 48, 55, 60);
  imageContext.closePath();
  imageContext.stroke();
  imageContext.fill();
  imageContext.beginPath();
  imageContext.moveTo(30, 45);
  //imageContext.lineTo(25,65);
  imageContext.bezierCurveTo(7, 57, 7, 57, 25, 65);
  imageContext.bezierCurveTo(17, 55, 17, 55, 30, 45);
  imageContext.closePath();
  imageContext.stroke();
  imageContext.fill();
  imageContext.beginPath();
  imageContext.moveTo(30, 75);
  //imageContext.lineTo(50,75);
  imageContext.bezierCurveTo(40, 90, 40, 90, 50, 75);
  imageContext.bezierCurveTo(40, 80, 40, 80, 30, 75);
  imageContext.closePath();
  imageContext.stroke();
  imageContext.fill();
  explosiveImages[16] = new Image(40, 40);
  explosiveImages[16].src = imageCanvas.toDataURL("image/png");
  explosiveImages[16].onload = smoke3;
}

function smoke1() {
  imageCanvas.width = imageCanvas.width;
  imageContext.strokeStyle = "lightgrey";
  imageContext.fillStyle = "lightgrey";
  imageContext.beginPath();
  imageContext.moveTo(55, 60);
  //imageContext.lineTo(45,40);
  imageContext.bezierCurveTo(60, 48, 60, 48, 45, 40);
  imageContext.bezierCurveTo(55, 50, 55, 50, 55, 60);
  imageContext.closePath();
  imageContext.stroke();
  imageContext.fill();
  imageContext.beginPath();
  imageContext.moveTo(30, 45);
  //imageContext.lineTo(25,65);
  imageContext.bezierCurveTo(17, 55, 17, 55, 25, 65);
  imageContext.bezierCurveTo(22, 55, 22, 55, 30, 45);
  imageContext.closePath();
  imageContext.stroke();
  imageContext.fill();
  imageContext.beginPath();
  imageContext.moveTo(30, 75);
  //imageContext.lineTo(50,75);
  imageContext.bezierCurveTo(40, 85, 40, 85, 50, 75);
  imageContext.bezierCurveTo(40, 80, 40, 80, 30, 75);
  imageContext.closePath();
  imageContext.stroke();
  imageContext.fill();
  explosiveImages[15] = new Image(40, 40);
  explosiveImages[15].src = imageCanvas.toDataURL("image/png");
  explosiveImages[15].onload = smoke2;
}

function drawRing14() {
  imageCanvas.width = imageCanvas.width;
  imageContext.fillStyle = "lightgrey";
  imageContext.beginPath();
  imageContext.moveTo(50, 50);
  imageContext.arc(50, 50, 32, 0, 2 * Math.PI);
  imageContext.closePath();
  imageContext.fill();
  explosiveImages[14] = new Image(40, 40);
  explosiveImages[14].src = imageCanvas.toDataURL("image/png");
  explosiveImages[14].onload = smoke1;
}

function drawRing13() {
  imageCanvas.width = imageCanvas.width;
  imageContext.fillStyle = "lightgrey";
  imageContext.beginPath();
  imageContext.moveTo(50, 50);
  imageContext.arc(50, 50, 16, 0, 2 * Math.PI);
  imageContext.closePath();
  imageContext.fill();
  explosiveImages[13] = new Image(40, 40);
  explosiveImages[13].src = imageCanvas.toDataURL("image/png");
  explosiveImages[13].onload = drawRing14;
}

function drawRing12() {
  imageCanvas.width = imageCanvas.width;
  imageContext.fillStyle = "lightgrey";
  imageContext.beginPath();
  imageContext.moveTo(50, 50);
  imageContext.arc(50, 50, 8, 0, 2 * Math.PI);
  imageContext.closePath();
  imageContext.fill();
  explosiveImages[12] = new Image(40, 40);
  explosiveImages[12].src = imageCanvas.toDataURL("image/png");
  explosiveImages[12].onload = drawRing13;
}

function drawRing11() {
  imageCanvas.width = imageCanvas.width;
  imageContext.fillStyle = "lightgrey";
  imageContext.beginPath();
  imageContext.moveTo(50, 50);
  imageContext.arc(50, 50, 4, 0, 2 * Math.PI);
  imageContext.closePath();
  imageContext.fill();
  explosiveImages[11] = new Image(40, 40);
  explosiveImages[11].src = imageCanvas.toDataURL("image/png");
  explosiveImages[11].onload = drawRing12;
}

function drawRing10() {
  imageCanvas.width = imageCanvas.width;
  imageContext.fillStyle = "lightgrey";
  imageContext.beginPath();
  imageContext.moveTo(50, 50);
  imageContext.arc(50, 50, 2, 0, 2 * Math.PI);
  imageContext.closePath();
  imageContext.fill();
  explosiveImages[10] = new Image(40, 40);
  explosiveImages[10].src = imageCanvas.toDataURL("image/png");
  explosiveImages[10].onload = drawRing11;
}

function drawRing9() {
  imageCanvas.width = imageCanvas.width;
  imageContext.fillStyle = "orange";
  imageContext.beginPath();
  imageContext.moveTo(50, 50);
  imageContext.arc(50, 50, 10, 0, 2 * Math.PI);
  imageContext.closePath();
  imageContext.fill();
  imageContext.fillStyle = "orange";
  imageContext.strokeStyle = "orange";
  imageContext.beginPath();
  imageContext.moveTo(55, 50);
  imageContext.lineTo(50 + 50 * Math.cos(alpha), 50 - 50 * Math.sin(alpha));
  imageContext.lineTo(50, 45);
  imageContext.closePath();
  imageContext.stroke();
  imageContext.fill();
  imageContext.moveTo(50, 45);
  imageContext.lineTo(50 - 50 * Math.cos(alpha), 50 - 50 * Math.sin(alpha));
  imageContext.lineTo(45, 50);
  imageContext.closePath();
  imageContext.stroke();
  imageContext.fill();
  imageContext.moveTo(45, 50);
  imageContext.lineTo(50 - 50 * Math.cos(alpha), 50 + 50 * Math.sin(alpha));
  imageContext.lineTo(50, 55);
  imageContext.closePath();
  imageContext.stroke();
  imageContext.fill();
  imageContext.moveTo(50, 55);
  imageContext.lineTo(50 + 50 * Math.cos(alpha), 50 + 50 * Math.sin(alpha));
  imageContext.lineTo(55, 50);
  imageContext.closePath();
  imageContext.stroke();
  imageContext.fill();
  explosiveImages[9] = new Image(40, 40);
  explosiveImages[9].src = imageCanvas.toDataURL("image/png");
  explosiveImages[9].onload = drawRing10;
}

function drawRing8() {
  imageCanvas.width = imageCanvas.width;
  imageContext.fillStyle = "orange";
  imageContext.beginPath();
  imageContext.moveTo(50, 50);
  imageContext.arc(50, 50, 10, 0, 2 * Math.PI);
  imageContext.closePath();
  imageContext.fill();
  imageContext.fillStyle = "orange";
  imageContext.strokeStyle = "orange";
  imageContext.beginPath();
  imageContext.moveTo(55, 50);
  imageContext.lineTo(50 + 40 * Math.cos(alpha), 50 - 40 * Math.sin(alpha));
  imageContext.lineTo(50, 45);
  imageContext.closePath();
  imageContext.stroke();
  imageContext.fill();
  imageContext.moveTo(50, 45);
  imageContext.lineTo(50 - 40 * Math.cos(alpha), 50 - 40 * Math.sin(alpha));
  imageContext.lineTo(45, 50);
  imageContext.closePath();
  imageContext.stroke();
  imageContext.fill();
  imageContext.moveTo(45, 50);
  imageContext.lineTo(50 - 40 * Math.cos(alpha), 50 + 40 * Math.sin(alpha));
  imageContext.lineTo(50, 55);
  imageContext.closePath();
  imageContext.stroke();
  imageContext.fill();
  imageContext.moveTo(50, 55);
  imageContext.lineTo(50 + 40 * Math.cos(alpha), 50 + 40 * Math.sin(alpha));
  imageContext.lineTo(55, 50);
  imageContext.closePath();
  imageContext.stroke();
  imageContext.fill();
  explosiveImages[8] = new Image(40, 40);
  explosiveImages[8].src = imageCanvas.toDataURL("image/png");
  explosiveImages[8].onload = drawRing9;
}

function drawRing7() {
  imageCanvas.width = imageCanvas.width;
  imageContext.fillStyle = "orange";
  imageContext.beginPath();
  imageContext.moveTo(50, 50);
  imageContext.arc(50, 50, 10, 0, 2 * Math.PI);
  imageContext.closePath();
  imageContext.fill();
  imageContext.fillStyle = "orange";
  imageContext.strokeStyle = "orange";
  imageContext.beginPath();
  imageContext.moveTo(55, 50);
  imageContext.lineTo(50 + 30 * Math.cos(alpha), 50 - 30 * Math.sin(alpha));
  imageContext.lineTo(50, 45);
  imageContext.closePath();
  imageContext.stroke();
  imageContext.fill();
  imageContext.moveTo(50, 45);
  imageContext.lineTo(50 - 30 * Math.cos(alpha), 50 - 30 * Math.sin(alpha));
  imageContext.lineTo(45, 50);
  imageContext.closePath();
  imageContext.stroke();
  imageContext.fill();
  imageContext.moveTo(45, 50);
  imageContext.lineTo(50 - 30 * Math.cos(alpha), 50 + 30 * Math.sin(alpha));
  imageContext.lineTo(50, 55);
  imageContext.closePath();
  imageContext.stroke();
  imageContext.fill();
  imageContext.moveTo(50, 55);
  imageContext.lineTo(50 + 30 * Math.cos(alpha), 50 + 30 * Math.sin(alpha));
  imageContext.lineTo(55, 50);
  imageContext.closePath();
  imageContext.stroke();
  imageContext.fill();
  explosiveImages[7] = new Image(40, 40);
  explosiveImages[7].src = imageCanvas.toDataURL("image/png");
  explosiveImages[7].onload = drawRing8;
}

function drawRing6() {
  imageCanvas.width = imageCanvas.width;
  imageContext.fillStyle = "orange";
  imageContext.beginPath();
  imageContext.moveTo(50, 50);
  imageContext.arc(50, 50, 10, 0, 2 * Math.PI);
  imageContext.closePath();
  imageContext.fill();
  imageContext.fillStyle = "orange";
  imageContext.strokeStyle = "orange";
  imageContext.beginPath();
  imageContext.moveTo(55, 50);
  imageContext.lineTo(50 + 20 * Math.cos(alpha), 50 - 20 * Math.sin(alpha));
  imageContext.lineTo(50, 45);
  imageContext.closePath();
  imageContext.stroke();
  imageContext.fill();
  imageContext.moveTo(50, 45);
  imageContext.lineTo(50 - 20 * Math.cos(alpha), 50 - 20 * Math.sin(alpha));
  imageContext.lineTo(45, 50);
  imageContext.closePath();
  imageContext.stroke();
  imageContext.fill();
  imageContext.moveTo(45, 50);
  imageContext.lineTo(50 - 20 * Math.cos(alpha), 50 + 20 * Math.sin(alpha));
  imageContext.lineTo(50, 55);
  imageContext.closePath();
  imageContext.stroke();
  imageContext.fill();
  imageContext.moveTo(50, 55);
  imageContext.lineTo(50 + 20 * Math.cos(alpha), 50 + 20 * Math.sin(alpha));
  imageContext.lineTo(55, 50);
  imageContext.closePath();
  imageContext.stroke();
  imageContext.fill();
  explosiveImages[6] = new Image(40, 40);
  explosiveImages[6].src = imageCanvas.toDataURL("image/png");
  explosiveImages[6].onload = drawRing7;
}

function drawRing5() {
  imageCanvas.width = imageCanvas.width;
  imageContext.fillStyle = "rgba(255,165,0,0)";
  imageContext.beginPath();
  imageContext.moveTo(50, 50);
  imageContext.arc(50, 50, 15, 0, 2 * Math.PI);
  imageContext.closePath();
  imageContext.fill();
  explosiveImages[5] = new Image(40, 40);
  explosiveImages[5].src = imageCanvas.toDataURL("image/png");
  explosiveImages[5].onload = drawRing6;
}

function drawRing4() {
  imageCanvas.width = imageCanvas.width;
  imageContext.fillStyle = "orange";
  imageContext.beginPath();
  imageContext.moveTo(50, 50);
  imageContext.arc(50, 50, 12, 0, 2 * Math.PI);
  imageContext.closePath();
  imageContext.fill();
  imageContext.fillStyle = "black";
  imageContext.beginPath();
  imageContext.moveTo(50, 50);
  imageContext.arc(50, 50, 6, 0, 2 * Math.PI);
  imageContext.closePath();
  imageContext.fill();
  explosiveImages[4] = new Image(40, 40);
  explosiveImages[4].src = imageCanvas.toDataURL("image/png");
  explosiveImages[4].onload = drawRing5;
}

function drawRing3() {
  imageCanvas.width = imageCanvas.width;
  imageContext.fillStyle = "orange";
  imageContext.beginPath();
  imageContext.moveTo(50, 50);
  imageContext.arc(50, 50, 14, 0, 2 * Math.PI);
  imageContext.closePath();
  imageContext.fill();
  imageContext.fillStyle = "black";
  imageContext.beginPath();
  imageContext.moveTo(50, 50);
  imageContext.arc(50, 50, 7, 0, 2 * Math.PI);
  imageContext.closePath();
  imageContext.fill();
  explosiveImages[3] = new Image(40, 40);
  explosiveImages[3].src = imageCanvas.toDataURL("image/png");
  explosiveImages[3].onload = drawRing4;
}

function drawRing2() {
  imageCanvas.width = imageCanvas.width;
  imageContext.fillStyle = "orange";
  imageContext.beginPath();
  imageContext.moveTo(50, 50);
  imageContext.arc(50, 50, 16, 0, 2 * Math.PI);
  imageContext.closePath();
  imageContext.fill();
  imageContext.fillStyle = "black";
  imageContext.beginPath();
  imageContext.moveTo(50, 50);
  imageContext.arc(50, 50, 8, 0, 2 * Math.PI);
  imageContext.closePath();
  imageContext.fill();
  explosiveImages[2] = new Image(40, 40);
  explosiveImages[2].src = imageCanvas.toDataURL("image/png");
  explosiveImages[2].onload = drawRing3;
}

function drawRing1() {
  imageCanvas.width = imageCanvas.width;
  imageContext.fillStyle = "orange";
  imageContext.beginPath();
  imageContext.moveTo(50, 50);
  imageContext.arc(50, 50, 18, 0, 2 * Math.PI);
  imageContext.closePath();
  imageContext.fill();
  imageContext.fillStyle = "black";
  imageContext.beginPath();
  imageContext.moveTo(50, 50);
  imageContext.arc(50, 50, 9, 0, 2 * Math.PI);
  imageContext.closePath();
  imageContext.fill();
  explosiveImages[1] = new Image(40, 40);
  explosiveImages[1].src = imageCanvas.toDataURL("image/png");
  explosiveImages[1].onload = drawRing2;
}

function drawRing0() {
  screenContext.fillStyle = "black";
  screenContext.fillRect(0, 0, 700, 700);
  imageCanvas.width = imageCanvas.width;
  imageContext.fillStyle = "orange";
  imageContext.beginPath();
  imageContext.moveTo(50, 50);
  imageContext.arc(50, 50, 20, 0, 2 * Math.PI);
  imageContext.closePath();
  imageContext.fill();
  imageContext.fillStyle = "black";
  imageContext.beginPath();
  imageContext.moveTo(50, 50);
  imageContext.arc(50, 50, 10, 0, 2 * Math.PI);
  imageContext.closePath();
  imageContext.fill();
  explosiveImages[0] = new Image(40, 40);
  explosiveImages[0].src = imageCanvas.toDataURL("image/png");
  explosiveImages[0].onload = drawRing1;
}

function run() {
  if (
    /Android|iPhone|iPad|iPod|webOS|Blackberry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  )
    isMobile = 1;
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent) || true) {
    isIOS = 1;
  } else {
    loadPingAudio();
    loadExplosionAudio();
  }
  drawRing0();
}

export function RocketRacers() {
  React.useEffect(() => {
    startGlobalLoadingIndicator();
    scrollPreventCanvas = document.getElementById("scrollPreventCanvas");
    trackCanvas = document.getElementById("trackCanvas");
    trackContext = trackCanvas.getContext("2d");
    carCanvas = document.getElementById("carCanvas");
    carContext = carCanvas.getContext("2d");
    imageCanvas = document.getElementById("imageCanvas");
    imageContext = imageCanvas.getContext("2d");
    screenCanvas = document.getElementById("screenCanvas");
    screenContext = screenCanvas.getContext("2d");
    document.documentElement.style.overflow = "hidden";
    document.body.scroll = "no";

    run();
  }, []);

    return (
      <div>
        <canvas
          id="scrollPreventCanvas"
          width="700"
          height="700"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: 0,
            border: "0px solid black",
          }}
        />
        <canvas
          id="trackCanvas"
          width="700"
          height="700"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: 2,
            border: "0px solid black",
          }}
        />
        <canvas
          id="carCanvas"
          width="110"
          height="100"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: 3,
            border: "0px solid black",
          }}
        />
        <canvas
          id="imageCanvas"
          width="100"
          height="100"
          style={{
            position: "absolute",
            top: "100",
            left: "100",
            zIndex: 1,
            border: "0px solid black",
          }}
        />
        <canvas
          id="screenCanvas"
          width="700"
          height="700"
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

export { RocketRacers as default };
