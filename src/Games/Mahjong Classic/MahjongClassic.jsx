import * as React from "react";
import { imageSources, backgroundImageURL } from "./MahjongClassicImageSources";
import backgroundAudioURL from "./backgroundAudio.mp3";
import swipeAudioURL from "../Mahjong Alchemy/swipeAudio.mp3";
import {
  startGlobalLoadingIndicator,
  stopGlobalLoadingIndicator,
} from "../../Components/GlobalLoadingIndicator";
import { maxCanvasScale } from "../../Util/MaxCanvasScale";
import { clearInterval, setInterval } from "worker-timers";

var scrollPreventCanvas, imageCanvas, backgroundCanvas, tileCanvas, scoreCanvas;

var imageContext, backgroundContext, tileContext, scoreContext;

var tileImages = new Array(43);
var highlightedTiles = new Array(43);
var shadedTiles = new Array(43);
var backgroundImage, tileBorderImage;
var grid;
var numX = 10,
  numY = 8,
  numZ = 4;
var tileWidth = 50; //40;
var tileHeight = 70; //56;
var tileDepth = 12;
var tileCanvasWidth = tileWidth * numX + tileDepth;
var tileCanvasHeight = tileHeight * numY + tileDepth;

var selectionI = 0,
  selectionJ = 0,
  selectionK = 0,
  isSelected = 0;

var gameOver = 0;
var placardWidth = 500;
var placardHeight = 200;
var score;
var hasGameBegun = 0;
var isShuffling = 0;

var backgroundAudioContext,
  swipeAudioContext,
  swipeBuffer,
  backgroundBuffer,
  backgroundAudioVolume,
  swipeAudioVolume,
  lastSwipeAudioSource,
  isSwipeAudioLoaded = 0,
  isBackgroundAudioLoaded = 0,
  isSwipeAudioLoading = 0,
  isBackgroundAudioLoading = 0,
  backgroundIsPlaying = 0;
var isIOS = 0,
  isMobile = 0;

function loadBackgroundAudio() {
  if (isBackgroundAudioLoading) {
    return;
  }
  isBackgroundAudioLoading = 1;
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
      isBackgroundAudioLoaded = 1;
      playBackgroundSound();
    });
  };
  request.send();
}

function loadSwipeAudio() {
  if (isSwipeAudioLoading) {
    return;
  }
  isSwipeAudioLoading = 1;
  swipeAudioContext = new (window.AudioContext || window.webkitAudioContext)();
  swipeAudioVolume = swipeAudioContext.createGain();
  swipeAudioVolume.connect(swipeAudioContext.destination);
  var request = new XMLHttpRequest();
  request.open("GET", swipeAudioURL, true);
  request.responseType = "arraybuffer";
  request.onload = function () {
    swipeAudioContext.decodeAudioData(request.response, function (buffer) {
      isSwipeAudioLoaded = 1;
      swipeBuffer = buffer;
    });
  };
  request.send();
}

function playSwipeSound() {
  if (!isSwipeAudioLoaded) {
    return;
  }
  if (lastSwipeAudioSource) {
    lastSwipeAudioSource.stop();
  }
  swipeAudioVolume.gain.value = 0.7;
  var audioSource = swipeAudioContext.createBufferSource();
  audioSource.connect(swipeAudioVolume);
  audioSource.buffer = swipeBuffer;
  if (audioSource.start) {
    audioSource.start(0);
  } else if (audioSource.play) {
    audioSource.play(0);
  } else if (audioSource.noteOn) {
    audioSource.noteOn(0);
  }
  lastSwipeAudioSource = audioSource;
}

function playBackgroundSound() {
  if (!isBackgroundAudioLoaded) {
    return;
  }
  backgroundIsPlaying = 1;
  backgroundAudioVolume.gain.value = 0.3;
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
  centerCanvas(imageCanvas);
  centerCanvas(backgroundCanvas);
  centerCanvas(tileCanvas);
  centerCanvas(scoreCanvas);
}

function rescaleCanvases() {
  window.scrollTo(0, 0);
  scrollPreventCanvas.style.left = "0px";
  scrollPreventCanvas.style.top = "0px";
  scrollPreventCanvas.width = window.innerWidth;
  scrollPreventCanvas.height = window.innerHeight;
  backgroundCanvas.style.left = "0px";
  backgroundCanvas.style.top = "0px";
  scoreCanvas.style.left = "0px";
  scoreCanvas.style.top = "0px";
  var rect = backgroundCanvas.getBoundingClientRect();
  var x0 = rect.left;
  var neededWidth = window.innerWidth;
  var y0 = rect.top;
  var neededHeight = window.innerHeight;
  var scaleX = neededWidth / 1050;
  var scaleY = neededHeight / 700;
  var scale = scaleX < scaleY ? scaleX : scaleY;
  if (scale >= maxCanvasScale) {
    scale = maxCanvasScale;
  }
  tileCanvas.width = Math.round(512 * scale);
  tileCanvas.height = Math.round(572 * scale);
  var offsetX = Math.round((scale * (1050 - 512)) / 2);
  var offsetY = Math.round((scale * (700 - 572)) / 2);
  tileCanvas.style.left = offsetX + "px";
  tileCanvas.style.top = offsetY + "px";
  tileContext.scale(scale, scale);
  backgroundCanvas.width = Math.round(1050 * scale);
  backgroundCanvas.height = Math.round(700 * scale);
  backgroundContext.scale(scale, scale);
  scoreCanvas.width = Math.round(1050 * scale);
  scoreCanvas.height = Math.round(700 * scale);
  scoreContext.scale(scale, scale);
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
  renderGrid();
}

function detectGameOver() {
  var numClickableTiles = 0;
  for (var i = 0; i < numX; i++) {
    for (var j = 0; j < numY; j++) {
      for (var k = 0; k < numZ; k++) {
        if (grid[i][j][k] >= 0 && isClickable(i, j, k)) {
          numClickableTiles++;
        }
      }
    }
  }
  if (numClickableTiles < 2) {
    gameOverSequence();
  }
}

function gameOverSequence() {
  gameOver = 1;
  var numOfSecs = 3;
  var countDown = setInterval(function () {
    if (numOfSecs <= 0) {
      clearInterval(countDown);
      createGrid();
      return;
    }
    scoreContext.clearRect(0, 0, 1050, 700);
    scoreContext.fillStyle = "black";
    var grad = scoreContext.createLinearGradient(
      (1050 - placardWidth) / 2,
      (700 - placardHeight) / 2,
      (1050 + placardWidth) / 2,
      (700 + placardHeight) / 2
    );
    grad.addColorStop(1, "#ff6b40");
    grad.addColorStop(0, "#ffca08");
    scoreContext.fillStyle = grad;
    scoreContext.fillRect(
      (1050 - placardWidth) / 2,
      (700 - placardHeight) / 2,
      placardWidth,
      placardHeight
    );
    scoreContext.font = "25px helvetica";
    scoreContext.textAlign = "center";
    scoreContext.textBaseline = "middle";
    scoreContext.fillStyle = "black";
    scoreContext.fillText(
      "You Win! New game in " + numOfSecs + "...",
      525,
      350
    );
    scoreContext.strokeRect(
      (1050 - placardWidth + 16) / 2,
      (700 - placardHeight + 16) / 2,
      placardWidth - 16,
      placardHeight - 16
    );
    scoreContext.strokeRect(
      (1050 - placardWidth + 8) / 2,
      (700 - placardHeight + 8) / 2,
      placardWidth - 8,
      placardHeight - 8
    );
    numOfSecs--;
  }, 1000);
}

function selectedTile() {
  imageCanvas.width = tileWidth;
  imageCanvas.height = tileHeight;
  imageContext.save();
  var scale = tileHeight / tileWidth;
  imageContext.scale(1, scale);
  var grad = imageContext.createRadialGradient(
    tileWidth / 2,
    tileWidth / 2,
    0,
    tileWidth / 2,
    tileWidth / 2,
    (1.2 * tileWidth) / 2
  );
  grad.addColorStop(1, "rgba(255,240,0,0.6)");
  grad.addColorStop(0.7, "rgba(255,240,0,0)");
  imageContext.fillStyle = grad;
  imageContext.fillRect(0, 0, tileWidth, tileWidth);
  imageContext.restore();
  tileBorderImage = new Image(tileWidth, tileHeight);
  tileBorderImage.src = imageCanvas.toDataURL("image/png");
  tileBorderImage.onload = createGrid;
}

function drawTileImage(index) {
  //this was to test if our images look right, we don't actually need it in the end program.
  imageContext.drawImage(tileImages[index], 0, 0);
}

function drawTiles(index) {
  //loads up images from data urls
  if (index > 42) {
    //images are done loading...do next thing here
    drawFrontTiles(0);
    return;
  }
  tileImages[index] = new Image(50, 50);
  tileImages[index].src = imageSources[index];
  tileImages[index].onload = function () {
    drawTiles(index + 1);
  };
}

function drawFrontTiles(index) {
  if (index > 42) {
    //images are done loading...do next thing here
    drawShadedTiles(0);
    return;
  }
  //creates the front tiles
  imageCanvas.width = tileWidth + tileDepth;
  imageCanvas.height = tileHeight + tileDepth;
  var rectWidth = tileWidth;
  var rectHeight = tileHeight;
  var radius = 5;
  var x = Math.round(tileWidth - radius + radius / Math.sqrt(2));
  var y = Math.round(radius - radius / Math.sqrt(2));
  //imageContext.fillStyle = "#ff9966";
  //var grad = imageContext.createLinearGradient(0,0,rectWidth,rectHeight);
  //grad.addColorStop(0,"#fffacc");
  //grad.addColorStop(1,"#ffcccc");
  imageContext.fillStyle = "#ffbbbb";
  //top connect line between front and back tile
  imageContext.beginPath();
  imageContext.moveTo(x, y);
  imageContext.lineTo(x + tileDepth, y + tileDepth);
  imageContext.lineTo(x, y + tileDepth);
  imageContext.lineTo(x, y);
  imageContext.closePath();
  imageContext.fill();
  imageContext.save();
  //bottom connect line between front and back tile
  imageContext.beginPath();
  imageContext.moveTo(tileWidth - x, tileHeight - y);
  imageContext.lineTo(tileWidth - x + tileDepth, tileHeight - y + tileDepth);
  imageContext.lineTo(tileWidth - x + tileDepth, tileHeight - y);
  imageContext.lineTo(tileWidth - x, tileHeight - y);
  imageContext.closePath();
  imageContext.fill();
  imageContext.save();
  //back tile
  imageContext.translate(tileDepth, tileDepth);
  imageContext.beginPath();
  imageContext.moveTo(radius, radius);
  imageContext.arc(radius, radius, radius, 0, 2 * Math.PI);
  imageContext.closePath();
  imageContext.fill();
  imageContext.beginPath();
  imageContext.moveTo(tileWidth - radius, radius);
  imageContext.arc(tileWidth - radius, radius, radius, 0, 2 * Math.PI);
  imageContext.closePath();
  imageContext.fill();
  imageContext.beginPath();
  imageContext.moveTo(tileWidth - radius, tileHeight - radius);
  imageContext.arc(
    tileWidth - radius,
    tileHeight - radius,
    radius,
    0,
    2 * Math.PI
  );
  imageContext.closePath();
  imageContext.fill();
  imageContext.beginPath();
  imageContext.moveTo(radius, tileHeight - radius);
  imageContext.arc(radius, tileHeight - radius, radius, 0, 2 * Math.PI);
  imageContext.closePath();
  imageContext.fill();
  imageContext.fillRect(radius, 0, rectWidth - 2 * radius, rectHeight);
  imageContext.fillRect(0, radius, rectWidth, rectHeight - 2 * radius);
  imageContext.restore();
  //white border
  imageContext.strokeStyle = "white";
  imageContext.lineWidth = 1;
  imageContext.beginPath();
  imageContext.moveTo(radius, radius);
  imageContext.arc(radius, radius, radius, 0, 2 * Math.PI);
  imageContext.closePath();
  imageContext.stroke();
  imageContext.beginPath();
  imageContext.moveTo(tileWidth - radius, radius);
  imageContext.arc(tileWidth - radius, radius, radius, 0, 2 * Math.PI);
  imageContext.closePath();
  imageContext.stroke();
  imageContext.beginPath();
  imageContext.moveTo(tileWidth - radius, tileHeight - radius);
  imageContext.arc(
    tileWidth - radius,
    tileHeight - radius,
    radius,
    0,
    2 * Math.PI
  );
  imageContext.closePath();
  imageContext.stroke();
  imageContext.beginPath();
  imageContext.moveTo(radius, tileHeight - radius);
  imageContext.arc(radius, tileHeight - radius, radius, 0, 2 * Math.PI);
  imageContext.closePath();
  imageContext.stroke();
  imageContext.strokeRect(radius, 0, rectWidth - 2 * radius, rectHeight);
  imageContext.strokeRect(0, radius, rectWidth, rectHeight - 2 * radius);
  //front tile
  var grad = imageContext.createLinearGradient(0, 0, rectWidth, rectHeight);
  grad.addColorStop(0, "#fffacc");
  grad.addColorStop(1, "#ffcccc");
  imageContext.fillStyle = grad;
  imageContext.beginPath();
  imageContext.moveTo(radius, radius);
  imageContext.arc(radius, radius, radius, 0, 2 * Math.PI);
  imageContext.closePath();
  imageContext.fill();
  imageContext.beginPath();
  imageContext.moveTo(tileWidth - radius, radius);
  imageContext.arc(tileWidth - radius, radius, radius, 0, 2 * Math.PI);
  imageContext.closePath();
  imageContext.fill();
  imageContext.beginPath();
  imageContext.moveTo(tileWidth - radius, tileHeight - radius);
  imageContext.arc(
    tileWidth - radius,
    tileHeight - radius,
    radius,
    0,
    2 * Math.PI
  );
  imageContext.closePath();
  imageContext.fill();
  imageContext.beginPath();
  imageContext.moveTo(radius, tileHeight - radius);
  imageContext.arc(radius, tileHeight - radius, radius, 0, 2 * Math.PI);
  imageContext.closePath();
  imageContext.fill();
  imageContext.fillRect(radius, 0, rectWidth - 2 * radius, rectHeight);
  imageContext.fillRect(0, radius, rectWidth, rectHeight - 2 * radius);
  imageContext.drawImage(
    tileImages[index],
    rectWidth / 2 - tileWidth / 2,
    rectHeight / 2 - tileWidth / 2
  );
  //draw shiny
  imageContext.save();
  imageContext.globalCompositeOperation = "source-atop";
  grad = imageContext.createLinearGradient(
    0,
    0,
    imageCanvas.width,
    imageCanvas.height
  );
  grad.addColorStop(0.4, "rgba(255,255,255,0)");
  grad.addColorStop(0.5, "rgba(255,255,255,0.5)");
  grad.addColorStop(0.6, "rgba(255,255,255,0)");
  imageContext.fillStyle = grad;
  imageContext.fillRect(0, 0, tileWidth + tileDepth, tileHeight + tileDepth);
  imageContext.restore();
  highlightedTiles[index] = new Image(
    tileWidth + tileDepth,
    tileHeight + tileDepth
  );
  highlightedTiles[index].src = imageCanvas.toDataURL("image/png");
  highlightedTiles[index].onload = function () {
    drawFrontTiles(index + 1);
  };
}

function drawShadedTiles(index) {
  if (index > 42) {
    //images are done loading...do next thing here
    drawBackGroundImage();
    return;
  }
  imageCanvas.width = tileWidth + tileDepth;
  imageCanvas.height = tileHeight + tileDepth;
  imageContext.drawImage(highlightedTiles[index], 0, 0);
  //draw shady tiles
  imageContext.save();
  imageContext.globalCompositeOperation = "source-atop";
  imageContext.fillStyle = "rgba(0,0,0,0.2)";
  imageContext.fillRect(0, 0, tileWidth + tileDepth, tileHeight + tileDepth);
  imageContext.restore();
  shadedTiles[index] = new Image(tileWidth + tileDepth, tileHeight + tileDepth);
  shadedTiles[index].src = imageCanvas.toDataURL("image/png");
  shadedTiles[index].onload = function () {
    drawShadedTiles(index + 1);
  };
}

function drawBackGroundImage() {
  backgroundImage = new Image();
  //backgroundImage.src = "http://centaurgamesonline.com/wp-content/uploads/2018/08/MahjongBackground.jpg";
  backgroundImage.src = backgroundImageURL;
  backgroundImage.onload = selectedTile;
  //imageCanvas.width = 1050;
  //imageCanvas.height = 700;
  //imageContext.drawImage(backgroundImage,0,0,backgroundImage.width,backgroundImage.height,0,0,1050,700);
  //console.log(imageCanvas.toDataURL("image/png"));
}

function doesTileMatch(index1, index2) {
  //seasons: index 38-41
  //flowers: index 34-37
  if (index1 === index2) {
    return 1;
  }
  if (34 <= index1 && index1 <= 37 && 34 <= index2 && index2 <= 37) {
    return 1;
  }
  if (38 <= index1 && index1 <= 41 && 38 <= index2 && index2 <= 41) {
    return 1;
  }
  return 0;
}

function makeSecondSelection(evt) {
  var rect = tileCanvas.getBoundingClientRect();
  var scale = 1050 / backgroundCanvas.width;
  var x = (evt.clientX || evt.targetTouches[0].clientX) - rect.left;
  x *= scale;
  var y = (evt.clientY || evt.targetTouches[0].clientY) - rect.top;
  y *= scale;
  if (x < 0 || x >= tileCanvasWidth || y < 0 || y >= tileCanvasHeight) return;
  x -= tileWidth / 2;
  y -= tileHeight / 2;
  var newI, newJ, newK;
  for (var k = 3; k >= 0; k--) {
    newI = Math.round((x + k * tileDepth) / tileWidth);
    if (newI < 0) newI = 0;
    if (newI >= numX) newI = numX - 1;
    newJ = Math.round((y + k * tileDepth) / tileHeight);
    if (newJ < 0) newJ = 0;
    if (newJ >= numY) newJ = numY - 1;
    newK = k;
    if (grid[newI][newJ][newK] != -1) {
      break;
    }
  }
  if (newI === selectionI && newJ === selectionJ && newK === selectionK) {
    isSelected = 0;
    playSwipeSound();
    renderGrid();
    return;
  }
  if (isClickable(newI, newJ, newK)) {
    if (
      doesTileMatch(
        grid[newI][newJ][newK],
        grid[selectionI][selectionJ][selectionK]
      )
    ) {
      grid[newI][newJ][newK] = -1;
      grid[selectionI][selectionJ][selectionK] = -1;
      isSelected = 0;
      score += 2;
      detectGameOver();
    } else {
      selectionI = newI;
      selectionJ = newJ;
      selectionK = newK;
    }
    playSwipeSound();
  }
  checkForShuffle();
  renderGrid();
}

function makeFirstSelection(evt) {
  evt.preventDefault();
  if (gameOver) return;
  if (isIOS && !isSwipeAudioLoaded) {
    loadSwipeAudio();
  }
  if (isIOS && !isBackgroundAudioLoaded) {
    loadBackgroundAudio();
  }
  if (isSelected) {
    makeSecondSelection(evt);
    return;
  }
  var rect = tileCanvas.getBoundingClientRect();
  var scale = 1050 / backgroundCanvas.width;
  var x = (evt.clientX || evt.targetTouches[0].clientX) - rect.left;
  x *= scale;
  var y = (evt.clientY || evt.targetTouches[0].clientY) - rect.top;
  y *= scale;
  if (x < 0 || x >= tileCanvasWidth || y < 0 || y >= tileCanvasHeight) return;
  x -= tileWidth / 2;
  y -= tileHeight / 2;
  var newI, newJ, newK;
  for (var k = 3; k >= 0; k--) {
    newI = Math.round((x + k * tileDepth) / tileWidth);
    if (newI < 0) newI = 0;
    if (newI >= numX) newI = numX - 1;
    newJ = Math.round((y + k * tileDepth) / tileHeight);
    if (newJ < 0) newJ = 0;
    if (newJ >= numY) newJ = numY - 1;
    newK = k;
    if (grid[newI][newJ][newK] != -1) {
      break;
    }
  }
  if (isClickable(newI, newJ, newK)) {
    selectionI = newI;
    selectionJ = newJ;
    selectionK = newK;
    playSwipeSound();
    isSelected = 1;
    renderGrid();
  }
}

function renderGrid() {
  if (isShuffling) return;
  tileContext.clearRect(0, 0, 1050, 700);
  backgroundContext.clearRect(0, 0, 1050, 700);
  backgroundContext.drawImage(backgroundImage, 0, 0);
  scoreContext.clearRect(0, 0, 1050, 700);
  scoreContext.font = "18px helvetica";
  scoreContext.textAlign = "left";
  scoreContext.textBaseline = "top";
  scoreContext.fillStyle = "firebrick";
  scoreContext.fillText("SCORE: " + score, 50, 25);
  var test;
  for (var k = 0; k < numZ; k++) {
    test = 0;
    for (var j = 0; j < numY; j++) {
      for (var i = 0; i < numX; i++) {
        if (grid[i][j][k] > -1) {
          test = 1;
          if (isClickable(i, j, k)) {
            tileContext.drawImage(
              highlightedTiles[grid[i][j][k]],
              i * tileWidth - k * tileDepth,
              j * tileHeight - k * tileDepth
            );
          } else {
            tileContext.drawImage(
              shadedTiles[grid[i][j][k]],
              i * tileWidth - k * tileDepth,
              j * tileHeight - k * tileDepth
            );
          }
          if (
            isSelected &&
            selectionI === i &&
            selectionJ === j &&
            selectionK === k
          ) {
            tileContext.drawImage(
              tileBorderImage,
              i * tileWidth - k * tileDepth,
              j * tileHeight - k * tileDepth
            );
          }
        }
      }
    }
    if (!test) {
      continue;
    }
    /*
		tileContext.globalCompositeOperation = "source-atop";
		tileContext.fillStyle = "rgba(0,0,0,0.025)";
		tileContext.fillRect(0,0,1050,700);
		tileContext.globalCompositeOperation = "source-over";
		*/
  }
}

function setEventListeners() {
  if (isMobile) {
    scrollPreventCanvas.addEventListener("touchstart", makeFirstSelection);
  } else {
    scrollPreventCanvas.addEventListener("mousedown", makeFirstSelection);
  }
  window.addEventListener("resize", rescaleCanvases);
  scrollPreventCanvas.addEventListener("touchmove", function (evt) {
    evt.preventDefault();
  });
}

function reshuffleGrid() {
  var needsTileI = [],
    needsTileJ = [],
    needsTileK = [],
    indicesOnBoard = [];
  for (var i = 0; i < numX; i++) {
    for (var j = 0; j < numY; j++) {
      for (var k = 0; k < numZ; k++) {
        if (grid[i][j][k] != -1) {
          indicesOnBoard.push(grid[i][j][k]);
          needsTileI.push(i);
          needsTileJ.push(j);
          needsTileK.push(k);
          grid[i][j][k] = -2;
        }
      }
    }
  }
  var i, j, k, n;
  for (var index = 0; index < indicesOnBoard.length; index++) {
    n = Math.floor(Math.random() * needsTileI.length);
    i = needsTileI[n];
    j = needsTileJ[n];
    k = needsTileK[n];
    grid[i][j][k] = indicesOnBoard[index];
    needsTileI.splice(n, 1);
    needsTileJ.splice(n, 1);
    needsTileK.splice(n, 1);
  }
  checkForShuffle();
  //renderGrid();
}

function drawReshufflePlacard() {
  isShuffling = 1;
  scoreContext.clearRect(0, 0, 1050, 700);
  scoreContext.strokeStyle = "black";
  var grad = scoreContext.createLinearGradient(
    (1050 - placardWidth) / 2,
    (700 - placardHeight) / 2,
    (1050 + placardWidth) / 2,
    (700 + placardHeight) / 2
  );
  grad.addColorStop(1, "#ff6b40");
  grad.addColorStop(0, "#ffca08");
  scoreContext.fillStyle = grad;
  scoreContext.fillRect(
    (1050 - placardWidth) / 2,
    (700 - placardHeight) / 2,
    placardWidth,
    placardHeight
  );
  scoreContext.font = "25px helvetica";
  scoreContext.textAlign = "center";
  scoreContext.textBaseline = "middle";
  scoreContext.fillStyle = "black";
  scoreContext.fillText("Reshuffling...", 525, 350);
  scoreContext.strokeRect(
    (1050 - placardWidth + 16) / 2,
    (700 - placardHeight + 16) / 2,
    placardWidth - 16,
    placardHeight - 16
  );
  scoreContext.strokeRect(
    (1050 - placardWidth + 8) / 2,
    (700 - placardHeight + 8) / 2,
    placardWidth - 8,
    placardHeight - 8
  );
  setTimeout(reshuffleGrid, 500);
}

function checkForShuffle() {
  var clickableTiles = [];
  for (var i = 0; i < numX; i++) {
    for (var j = 0; j < numY; j++) {
      for (var k = 0; k < numZ; k++) {
        if (grid[i][j][k] >= 0 && isClickable(i, j, k)) {
          clickableTiles.push(grid[i][j][k]);
        }
      }
    }
  }
  if (clickableTiles.length === 0) return;
  for (var n = 0; n < clickableTiles.length; n++) {
    for (var m = 0; m < clickableTiles.length; m++) {
      if (doesTileMatch(clickableTiles[n], clickableTiles[m]) && n != m) {
        isShuffling = 0;
        renderGrid();
        return;
      }
    }
  }
  renderGrid();
  //alert("Reshuffling...");
  drawReshufflePlacard();
  //reshuffleGrid();
}

function randomizeGrid() {
  var index = 0;
  for (var i = 0; i < numX; i++) {
    for (var j = 0; j < numY; j++) {
      for (var k = 0; k < numZ; k++) {
        if (grid[i][j][k] != -1) {
          grid[i][j][k] = Math.floor(index / 2) % highlightedTiles.length;
          index++;
        }
      }
    }
  }
  reshuffleGrid();
  if (!hasGameBegun) {
    setEventListeners();
    rescaleCanvases();
    stopGlobalLoadingIndicator();
  }
  //rescaleCanvases();
  hasGameBegun = 1;
}

function createGrid() {
  imageCanvas.width = 0;
  imageCanvas.Height = 0;
  score = 0;
  gameOver = 0;
  grid = new Array(numX);
  for (var i = 0; i < numX; i++) {
    grid[i] = new Array(numY);
    for (var j = 0; j < numY; j++) {
      grid[i][j] = new Array(numZ);
      for (var k = 0; k < numZ; k++) {
        grid[i][j][k] = -1;
      }
    }
  }
  var r = numX / 2,
    xCenter = (numX - 1) / 2,
    yCenter = (numY - 1) / 2;
  for (var i = 0; i < numX; i++) {
    grid[i][0][0] = -2;
    grid[i][numY - 1][0] = -2;
    for (var j = 0; j < numY; j++) {
      r = numY / 2;
      if (
        (i - xCenter) * (i - xCenter) + (j - yCenter) * (j - yCenter) <
        r * r
      ) {
        grid[i][j][0] = -2;
      }
      r *= 0.75;
      if (
        (i - xCenter) * (i - xCenter) + (j - yCenter) * (j - yCenter) <
        r * r
      ) {
        grid[i][j][1] = -2;
      }
      r *= 0.75;
      if (
        (i - xCenter) * (i - xCenter) + (j - yCenter) * (j - yCenter) <
        r * r
      ) {
        grid[i][j][2] = -2;
      }
      r *= 0.75;
      if (
        (i - xCenter) * (i - xCenter) + (j - yCenter) * (j - yCenter) <
        r * r
      ) {
        grid[i][j][3] = -2;
      }
    }
  }
  randomizeGrid();
}

function isClickableAtBeginning(i, j, k) {
  if (k < numZ - 1 && grid[i][j][k + 1] === -2) {
    return 0;
  }
  if (i === 0 || grid[i - 1][j][k] > -2) {
    return 1;
  }
  if (i === numX - 1 || grid[i + 1][j][k] > -2) {
    return 1;
  }
  return 0;
}

function isClickable(i, j, k) {
  if (grid[i][j][k] === -1) return 0;
  if (k < numZ - 1 && grid[i][j][k + 1] >= 0) {
    return 0;
  }
  if (i === 0 || grid[i - 1][j][k] < 0) {
    return 1;
  }
  if (i === numX - 1 || grid[i + 1][j][k] < 0) {
    return 1;
  }
  return 0;
}

function sketch() {
  if (
    /Android|iPhone|iPad|iPod|webOS|Blackberry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  )
    isMobile = 1;
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent) || true) {
    isIOS = 1;
  } else {
    loadSwipeAudio();
    loadBackgroundAudio();
  }
  tileCanvas.width = tileCanvasWidth;
  tileCanvas.height = tileCanvasHeight;
  tileContext.fillStyle = "black";
  tileContext.fillRect(0, 0, tileCanvas.width, tileCanvas.height);
  drawTiles(0);
}

export function MahjongClassic() {
  React.useEffect(() => {
    startGlobalLoadingIndicator();
    scrollPreventCanvas = document.getElementById("scrollPreventCanvas");
    imageCanvas = document.getElementById("imageCanvas");
    backgroundCanvas = document.getElementById("backgroundCanvas");
    tileCanvas = document.getElementById("tileCanvas");
    scoreCanvas = document.getElementById("scoreCanvas");
    imageContext = imageCanvas.getContext("2d");
    backgroundContext = backgroundCanvas.getContext("2d");
    tileContext = tileCanvas.getContext("2d");
    scoreContext = scoreCanvas.getContext("2d");
    document.documentElement.style.overflow = "hidden";
    document.body.scroll = "no";

    sketch();
  }, []);

  return (
    <div>
      <canvas
        id="scrollPreventCanvas"
        width="40"
        height="40"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          zIndex: 4,
          border: "0px solid black",
        }}
      />
      <canvas
        id="imageCanvas"
        width="40"
        height="40"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          zIndex: 0,
          border: "0px solid black",
        }}
      />
      <canvas
        id="backgroundCanvas"
        width="1050"
        height="700"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          zIndex: 1,
          border: "0px solid black",
        }}
      />
      <canvas
        id="tileCanvas"
        width="1050"
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
        id="scoreCanvas"
        width="1050"
        height="700"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          zIndex: 3,
          border: "0px solid black",
        }}
      />
    </div>
  );
}

export { MahjongClassic as default };
