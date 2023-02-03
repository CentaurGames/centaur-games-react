import * as React from "react";
import {
  cavernImageURL,
  lavaImageURL,
  tileImageURLs,
  cartImageURL,
  coinEdgeURL,
  coinImageURL,
} from "./VolcanoFrenzy2ImageSources";
import audioURL from "../Volcano Frenzy/audio.mp3";
import {
  startGlobalLoadingIndicator,
  stopGlobalLoadingIndicator,
} from "../../Components/GlobalLoadingIndicator";
import { maxCanvasScale } from "../../Util/MaxCanvasScale";

var audioContext,
  audioVolume,
  audioBuffer,
  isAudioLoaded = 0,
  isAudioLoading = 0,
  isIOS = 0,
  isMobile = 0;

var scrollPreventCanvas,
  lavaCanvas,
  cavernCanvas,
  fallingCanvas,
  tileCanvas,
  goldCanvas,
  cartCanvas,
  placardCanvas;

var lavaContext,
  cavernContext,
  fallingContext,
  tileContext,
  goldContext,
  cartContext,
  placardContext,
  playerContext;

var canvasWidth = 1136,
  canvasHeight = 640;
var gridWidth = 1116,
  gridHeight = 620;
var tileWidth = 31,
  tileHeight = 31;
var numberOfTilesX = gridWidth / tileWidth,
  numberOfTilesY = gridHeight / tileHeight;
var numberOfCartTransitions = 8,
  transitionTime = 60 / numberOfCartTransitions;
var grid, levelGrid, levelPositionX, levelPositionY, levelDirection;

var cavernImage,
  lavaImage,
  tileImages = new Array(tileImageURLs.length),
  cartImage,
  coinImage,
  coinEdge;

var rotationMatrix,
  thetaX,
  thetaY,
  thetaZ,
  phiX,
  phiY,
  omega = (2 * Math.PI) / 180;
var scrollY = 0;
var goldX, goldY;
var cartX,
  cartY,
  cartDirection,
  cartScale = 1;
var gameOver = 0,
  stopRendering = 0,
  isPlacardOn = 0;
var score = 0;
var coinInterval,
  isCoinIntervalRunning = 0;

var coinsInCart,
  fallingDebrisX,
  fallingDebrisY,
  fallingDebrisScale,
  fallingDebrisIndex,
  fallingDebrisMatrix,
  fallingCartInterval,
  isFallingCartIntervalRunning = 0,
  fallingCartX,
  fallingCartY,
  fallingFactor = 0.98;

var cartIsRolling = 0,
  lastKeyEvent,
  canIGetAKeyInEdgewise = 0;
var eventListenersAreSet = 0;
var deviceIsMobile;
var currentLevel = 0,
  numberOfRectangles;
var swipeStartX, swipeStartY, swipeDirection;
var ignoreNextMove,
  swipeListen = 0;

function playAudio() {
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
}

function loadAudio() {
  if (isAudioLoading || isAudioLoaded) return;
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
      playAudio();
    });
  };
  request.send();
}

function matrixMultiply(mat1, mat2) {
  var matrix = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      for (var k = 0; k < 3; k++) {
        matrix[i][j] += mat1[i][k] * mat2[k][j];
      }
    }
  }
  return matrix;
}

function rotateX(angle, matrix) {
  var xRotation = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];
  xRotation[1][1] = Math.cos(angle);
  xRotation[2][2] = xRotation[1][1];
  xRotation[1][2] = -Math.sin(angle);
  xRotation[2][1] = -xRotation[1][2];
  return matrixMultiply(xRotation, matrix);
}

function rotateY(angle, matrix) {
  var yRotation = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];
  yRotation[0][0] = Math.cos(angle);
  yRotation[2][2] = yRotation[0][0];
  yRotation[0][2] = Math.sin(angle);
  yRotation[2][0] = -yRotation[0][2];
  return matrixMultiply(yRotation, matrix);
}

function rotateZ(angle, matrix) {
  var zRotation = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];
  zRotation[0][0] = Math.cos(angle);
  zRotation[1][1] = zRotation[0][0];
  zRotation[0][1] = -Math.sin(angle);
  zRotation[1][0] = -zRotation[0][1];
  return matrixMultiply(zRotation, matrix);
}

function restartLevel() {
  grid = dealiasGrid(levelGrid);
  cartX = levelPositionX;
  cartY = levelPositionY;
  cartDirection = levelDirection;
  cartScale = 1;
  gameOver = 0;
  coinsInCart = [];
  setGoldPieces();
  render();
}

function setLavaInterval() {
  scrollY = 0;
  var lavaInterval = setInterval(function () {
    scrollY++;
    scrollY %= canvasHeight;
    lavaContext.clearRect(0, 0, canvasWidth, canvasHeight);
    lavaContext.drawImage(
      lavaImage,
      0,
      scrollY,
      canvasWidth,
      canvasHeight,
      0,
      0,
      canvasWidth,
      canvasHeight
    );
  }, 10);
}

function clearFallingCartInterval() {
  if (!isFallingCartIntervalRunning) return;
  score -= coinsInCart.length;
  playerContext = cartContext;
  clearInterval(fallingCartInterval);
  //stopRendering = 1;
  cartIsRolling = 0;
  isFallingCartIntervalRunning = 0;
  restartLevel();
}

function setFallingCartInterval() {
  if (isFallingCartIntervalRunning) return;
  playerContext = fallingContext;
  var left = (canvasWidth - gridWidth) / 2;
  var top = (canvasHeight - gridHeight) / 2;
  fallingCartX = left + cartX * tileWidth + tileWidth / 2;
  fallingCartY = top + cartY * tileHeight + tileHeight / 2;
  fallingCartInterval = setInterval(function () {
    var x0, y0, radius, theta;
    x0 = fallingCartX - canvasWidth / 2;
    y0 = fallingCartY - canvasHeight / 2;
    radius = Math.sqrt(x0 * x0 + y0 * y0);
    theta = Math.atan2(y0, x0);
    radius *= fallingFactor;
    fallingCartX = Math.round(radius * Math.cos(theta) + canvasWidth / 2);
    fallingCartY = Math.round(radius * Math.sin(theta) + canvasHeight / 2);
    cartScale *= fallingFactor;
    cartDirection += 1 / 32;
    if (cartScale < 0.1) {
      clearFallingCartInterval();
    }
    render();
  }, 20);
  isFallingCartIntervalRunning = 1;
}

function drawFallingDebris() {
  var width = tileImages[0].width;
  var height = tileImages[0].height;
  var scale, matrix;
  for (var i = 0; i < fallingDebrisX.length; i++) {
    scale = fallingDebrisScale[i];
    matrix = fallingDebrisMatrix[i];
    fallingContext.save();
    fallingContext.translate(
      fallingDebrisX[i] + (width * scale) / 2,
      fallingDebrisY[i] + (height * scale) / 2
    );
    fallingContext.transform(
      matrix[0][0],
      matrix[1][0],
      matrix[0][1],
      matrix[1][1],
      matrix[0][2],
      matrix[1][2]
    );
    fallingContext.translate(
      -fallingDebrisX[i] - (width * scale) / 2,
      -fallingDebrisY[i] - (height * scale) / 2
    );
    fallingContext.drawImage(
      tileImages[fallingDebrisIndex[i] - 1],
      0,
      0,
      width,
      height,
      fallingDebrisX[i],
      fallingDebrisY[i],
      width * scale,
      height * scale
    );
    fallingContext.restore();
  }
}

function rescaleFallingDebris() {
  if (fallingDebrisX.length === 0) return;
  var x, y, radius, theta, matrix;
  for (var i = 0; i < fallingDebrisScale.length; i++) {
    x = fallingDebrisX[i] - canvasWidth / 2;
    y = fallingDebrisY[i] - canvasHeight / 2;
    radius = Math.sqrt(x * x + y * y);
    theta = Math.atan2(y, x);
    radius *= fallingFactor;
    x = radius * Math.cos(theta);
    y = radius * Math.sin(theta);
    fallingDebrisX[i] = x + canvasWidth / 2;
    fallingDebrisY[i] = y + canvasHeight / 2;
    matrix = fallingDebrisMatrix[i];
    matrix = rotateX((20 * Math.PI) / 180, matrix);
    matrix = rotateY((20 * Math.PI) / 180, matrix);
    matrix = rotateZ((20 * Math.PI) / 180, matrix);
    fallingDebrisMatrix[i] = matrix;
    fallingDebrisScale[i] *= fallingFactor;
    if (fallingDebrisScale[i] < 0.1) {
      fallingDebrisScale.splice(i, 1);
      fallingDebrisX.splice(i, 1);
      fallingDebrisY.splice(i, 1);
      fallingDebrisIndex.splice(i, 1);
      fallingDebrisMatrix.splice(i, 1);
      i--;
    }
  }
  render();
}

function setFallingDebrisInterval() {
  var fallingDebrisInterval = setInterval(rescaleFallingDebris, 20);
}

function coinTimerFunction() {
  thetaX = -omega * Math.sin(phiY) * Math.sin(phiX);
  thetaY = -omega * Math.cos(phiX);
  thetaZ = -omega * Math.sin(phiX) * Math.cos(phiY);
  rotationMatrix = rotateX(thetaX, rotationMatrix);
  rotationMatrix = rotateY(thetaY, rotationMatrix);
  rotationMatrix = rotateZ(thetaZ, rotationMatrix);
  drawCoins();
}

function clearCoinTimer() {
  if (!isCoinIntervalRunning) return;
  clearInterval(coinInterval);
  isCoinIntervalRunning = 0;
}

function setCoinTimer() {
  if (isCoinIntervalRunning) return;
  phiX = (-50 * Math.PI) / 180;
  phiY = (-20 * Math.PI) / 180;
  thetaX = phiX;
  thetaY = phiY;
  thetaZ = 0;
  rotationMatrix = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];
  rotationMatrix = rotateX(thetaX, rotationMatrix);
  rotationMatrix = rotateY(thetaY, rotationMatrix);
  rotationMatrix = rotateZ(thetaZ, rotationMatrix);
  coinInterval = setInterval(coinTimerFunction, 10);
  isCoinIntervalRunning = 1;
}

function drawRotatedCoin(index, i, j) {
  var shiftX, shiftY;
  switch (index) {
    case 3:
      shiftX = 5;
      shiftY = 5;
      break;
    case 4:
      shiftX = -5;
      shiftY = 5;
      break;
    case 5:
      shiftX = -5;
      shiftY = -5;
      break;
    case 6:
      shiftX = 5;
      shiftY = -5;
      break;
  }
  goldContext.save();
  goldContext.translate(i + tileWidth / 2, j + tileHeight / 2);
  goldContext.translate(shiftX, shiftY);
  goldContext.transform(
    rotationMatrix[0][0],
    rotationMatrix[1][0],
    rotationMatrix[0][1],
    rotationMatrix[1][1],
    rotationMatrix[0][2],
    rotationMatrix[1][2]
  );
  goldContext.translate(-8.5, -8.5);
  goldContext.drawImage(coinEdge, 0, 0, 20, 20, 0, 0, 17, 17);
  goldContext.restore();
  goldContext.save();
  goldContext.translate(i + tileWidth / 2, j + tileHeight / 2);
  goldContext.translate(shiftX, shiftY);
  goldContext.transform(
    rotationMatrix[0][0],
    rotationMatrix[1][0],
    rotationMatrix[0][1],
    rotationMatrix[1][1],
    rotationMatrix[0][2],
    rotationMatrix[1][2]
  );
  goldContext.translate(-8.5, -8.5);
  goldContext.drawImage(coinImage, 0, 0, 20, 20, 0, 0, 17, 17);
  goldContext.restore();
}

function drawCoins() {
  var left = (canvasWidth - gridWidth) / 2;
  var top = (canvasHeight - gridHeight) / 2;
  goldContext.clearRect(0, 0, canvasWidth, canvasHeight);
  for (var i = 0; i < goldX.length; i++) {
    drawRotatedCoin(
      grid[goldX[i]][goldY[i]],
      left + goldX[i] * tileWidth,
      top + goldY[i] * tileHeight
    );
  }
}

function drawCoinsInCart() {
  var left = (canvasWidth - gridWidth) / 2;
  var top = (canvasHeight - gridHeight) / 2;
  var cartWidth = 20 * cartScale;
  var cartHeight = 30 * cartScale;
  var x1 = isFallingCartIntervalRunning
    ? fallingCartX
    : left + cartX * tileWidth + tileWidth / 2 - cartWidth / 4;
  var y1 = isFallingCartIntervalRunning
    ? fallingCartY
    : top + cartY * tileHeight + tileHeight / 2 - cartHeight / 4;
  var rectWidth = (cartScale * cartWidth) / 2;
  var rectHeight = (cartScale * cartHeight) / 2;
  var numberOfCoinsPerRow = 3;
  var coinWidth = rectWidth / numberOfCoinsPerRow;
  var coinHeight = coinWidth;
  var coinDepth = 2 * cartScale;
  var numberOfColumns = Math.floor(rectHeight / coinHeight);
  var coinX, coinY, coinZ;
  for (var i = 0; i < coinsInCart.length; i++) {
    coinX = i % numberOfCoinsPerRow;
    coinY = Math.floor(i / numberOfCoinsPerRow);
    coinZ = Math.floor(coinY / numberOfColumns);
    coinY %= numberOfColumns;
    playerContext.drawImage(
      coinImage,
      0,
      0,
      coinImage.width,
      coinImage.height,
      x1 + coinX * coinWidth,
      y1 + coinY * coinHeight - coinZ * coinDepth,
      coinWidth,
      coinHeight
    );
  }
}

function drawPlacard() {
  var width = canvasWidth / 6;
  var height = canvasHeight / 6;
  placardContext.fillStyle = "gold";
  placardContext.fillRect(
    (canvasWidth - width) / 2,
    (canvasHeight - height) / 2,
    width,
    height
  );
  placardContext.fillStyle = "purple";
  placardContext.font = "18px helvetica";
  placardContext.textAlign = "center";
  placardContext.textBaseline = "middle";
  placardContext.fillText(
    "LEVEL " + (currentLevel + 1),
    canvasWidth / 2,
    canvasHeight / 2
  );
}

function drawScore() {
  var height = (canvasHeight - gridHeight) / 4;
  placardContext.fillStyle = "black";
  placardContext.fillRect(0, 0, canvasWidth, height);
  placardContext.fillStyle = "white";
  placardContext.font = "14px helvetica";
  placardContext.textAlign = "left";
  placardContext.textBaseline = "top";
  placardContext.fillText(
    "Level: " + (currentLevel + 1),
    canvasWidth / 4,
    height / 2
  );
  placardContext.textAlign = "right";
  placardContext.fillText("Score: " + score, (3 * canvasWidth) / 4, height / 2);
}

function render() {
  //if (stopRendering) return;
  lavaContext.clearRect(0, 0, canvasWidth, canvasHeight);
  placardContext.clearRect(0, 0, canvasWidth, canvasHeight);
  cavernContext.clearRect(0, 0, canvasWidth, canvasHeight);
  fallingContext.clearRect(0, 0, canvasWidth, canvasHeight);
  tileContext.clearRect(0, 0, canvasWidth, canvasHeight);
  cartContext.clearRect(0, 0, canvasWidth, canvasHeight);
  if (isPlacardOn) drawPlacard();
  drawScore();
  lavaContext.drawImage(
    lavaImage,
    0,
    scrollY,
    canvasWidth,
    canvasHeight,
    0,
    0,
    canvasWidth,
    canvasHeight
  );
  cavernContext.drawImage(cavernImage, 0, 0);
  drawFallingDebris();
  var left = (canvasWidth - gridWidth) / 2;
  var top = (canvasHeight - gridHeight) / 2;
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length; j++) {
      if (grid[i][j])
        tileContext.drawImage(
          tileImages[grid[i][j] - 1],
          left + i * tileWidth,
          top + j * tileHeight
        );
    }
  }
  drawCoins();
  if (stopRendering) return;
  if (!isFallingCartIntervalRunning) {
    playerContext.save();
    playerContext.translate(
      left + cartX * tileWidth + tileWidth / 2,
      top + cartY * tileHeight + tileHeight / 2
    );
    playerContext.rotate((cartDirection * Math.PI) / 2);
    playerContext.translate(
      -left - cartX * tileWidth - tileWidth / 2,
      -top - cartY * tileHeight - tileHeight / 2
    );
    playerContext.drawImage(
      cartImage,
      0,
      0,
      cartImage.width,
      cartImage.height,
      left +
        cartX * tileWidth +
        tileWidth / 2 -
        (cartImage.width * cartScale) / 2,
      top +
        cartY * tileHeight +
        tileHeight / 2 -
        (cartImage.height * cartScale) / 2,
      cartImage.width * cartScale,
      cartImage.height * cartScale
    );
    drawCoinsInCart();
    playerContext.restore();
    checkForVictory();
  } else {
    playerContext.save();
    playerContext.translate(fallingCartX, fallingCartY);
    playerContext.rotate((cartDirection * Math.PI) / 2);
    playerContext.translate(-fallingCartX, -fallingCartY);
    playerContext.drawImage(
      cartImage,
      0,
      0,
      cartImage.width,
      cartImage.height,
      fallingCartX - (cartScale * cartImage.width) / 2,
      fallingCartY - (cartScale * cartImage.height) / 2,
      cartScale * cartImage.width,
      cartScale * cartImage.height
    );
    drawCoinsInCart();
    playerContext.restore();
  }
}

function centerCanvas(canvas) {
  canvas.style.left = "0px";
  canvas.style.top = "0px";
  var rect = canvas.getBoundingClientRect();
  var x0 = rect.left,
    y0 = rect.top;
  var x1 = (window.innerWidth - canvas.width) / 2;
  x1 -= x0;
  canvas.style.left = x1 + "px";
  var y1 = (window.innerHeight - canvas.height) / 2;
  y1 -= y0;
  canvas.style.left = x1 + "px";
  canvas.style.top = y1 + "px";
}

function centerAllCanvases() {
  centerCanvas(scrollPreventCanvas);
  centerCanvas(lavaCanvas);
  centerCanvas(cavernCanvas);
  centerCanvas(fallingCanvas);
  centerCanvas(tileCanvas);
  centerCanvas(goldCanvas);
  centerCanvas(cartCanvas);
  centerCanvas(placardCanvas);
}

function rescaleCanvases() {
  window.scrollTo(0, 0);
  scrollPreventCanvas.style.left = "0px";
  scrollPreventCanvas.style.top = "0px";
  lavaCanvas.style.left = "0px";
  lavaCanvas.style.top = "0px";
  cavernCanvas.style.left = "0px";
  cavernCanvas.style.top = "0px";
  fallingCanvas.style.left = "0px";
  fallingCanvas.style.top = "0px";
  tileCanvas.style.left = "0px";
  tileCanvas.style.top = "0px";
  goldCanvas.style.left = "0px";
  goldCanvas.style.top = "0px";
  cartCanvas.style.left = "0px";
  cartCanvas.style.top = "0px";
  placardCanvas.style.left = "0px";
  placardCanvas.style.top = "0px";
  var rect = lavaCanvas.getBoundingClientRect();
  var x0 = rect.left;
  var neededWidth = window.innerWidth;
  var y0 = rect.top;
  var neededHeight = window.innerHeight;
  var scaleX = neededWidth / canvasWidth;
  var scaleY = neededHeight / canvasHeight;
  var scale = scaleX < scaleY ? scaleX : scaleY;
  if (scale >= maxCanvasScale) scale = maxCanvasScale;
  scrollPreventCanvas.width = neededWidth;
  scrollPreventCanvas.height = neededHeight;
  lavaCanvas.width = Math.round(canvasWidth * scale);
  lavaCanvas.height = Math.round(canvasHeight * scale);
  lavaContext.scale(scale, scale);
  cavernCanvas.width = Math.round(canvasWidth * scale);
  cavernCanvas.height = Math.round(canvasHeight * scale);
  cavernContext.scale(scale, scale);
  fallingCanvas.width = Math.round(canvasWidth * scale);
  fallingCanvas.height = Math.round(canvasHeight * scale);
  fallingContext.scale(scale, scale);
  tileCanvas.width = Math.round(canvasWidth * scale);
  tileCanvas.height = Math.round(canvasHeight * scale);
  tileContext.scale(scale, scale);
  goldCanvas.width = Math.round(canvasWidth * scale);
  goldCanvas.height = Math.round(canvasHeight * scale);
  goldContext.scale(scale, scale);
  cartCanvas.width = Math.round(canvasWidth * scale);
  cartCanvas.height = Math.round(canvasHeight * scale);
  cartContext.scale(scale, scale);
  placardCanvas.width = Math.round(canvasWidth * scale);
  placardCanvas.height = Math.round(canvasHeight * scale);
  placardContext.scale(scale, scale);
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

function gameOverSequence() {
  if (gameOver) return;
  //alert("Game Over");
  gameOver = 1;
  var couldIGetAKeyInEdgewise = 0;
  setFallingCartInterval();
}

function victorySequence() {
  if (gameOver) return;
  currentLevel++;
  gameOver = 1;
  initializeGrid();
}

function checkForVictory() {
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length; j++) {
      if (cartX === i && cartY === j) continue;
      if (grid[i][j]) return;
    }
  }
  victorySequence();
}

function convertCrossroads(newDirection) {
  switch (cartDirection) {
    case 0:
      switch (newDirection) {
        case 0:
          return 0;
        case 1:
          return 5;
        case 2:
          return 7;
        default:
          return 6;
      }
    case 1:
      switch (newDirection) {
        case 0:
          return 3;
        case 1:
          return 0;
        case 2:
          return 6;
        default:
          return 7;
      }
    case 2:
      switch (newDirection) {
        case 0:
          return 7;
        case 1:
          return 4;
        case 2:
          return 0;
        default:
          return 3;
      }
    default:
      switch (newDirection) {
        case 0:
          return 4;
        case 1:
          return 7;
        case 2:
          return 5;
        default:
          return 0;
      }
  }
}

function findCrossroadFallingPiece(newDirection) {
  switch (cartDirection) {
    case 0:
      switch (newDirection) {
        case 0:
          return 7;
        case 1:
          return 3;
        case 2:
          return 7;
        default:
          return 4;
      }
    case 1:
      switch (newDirection) {
        case 0:
          return 5;
        case 1:
          return 7;
        case 2:
          return 4;
        default:
          return 7;
      }
    case 2:
      switch (newDirection) {
        case 0:
          return 7;
        case 1:
          return 6;
        case 2:
          return 7;
        default:
          return 5;
      }
    default:
      switch (newDirection) {
        case 0:
          return 6;
        case 1:
          return 7;
        case 2:
          return 3;
        default:
          return 7;
      }
  }
}

function moveCart(newDirection, newX, newY) {
  if (gameOver || isFallingCartIntervalRunning) return;
  if (
    newX < 0 ||
    newY < 0 ||
    newX >= grid.length ||
    newY >= grid[0].length ||
    !grid[newX][newY]
  ) {
    gameOverSequence();
    return;
  }
  for (var i = 0; i < goldX.length; i++) {
    if (newX === goldX[i] && newY === goldY[i]) {
      score++;
      coinsInCart.push(1);
      goldX.splice(i, 1);
      goldY.splice(i, 1);
    }
  }
  if (grid[cartX][cartY] === 7) {
    fallingDebrisX.push(cartX * tileWidth + (canvasWidth - gridWidth) / 2);
    fallingDebrisY.push(cartY * tileHeight + (canvasHeight - gridHeight) / 2);
    fallingDebrisIndex.push(findCrossroadFallingPiece(newDirection));
    fallingDebrisScale.push(1);
    fallingDebrisMatrix.push([
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ]);
    grid[cartX][cartY] = convertCrossroads(newDirection);
  } else {
    fallingDebrisX.push(cartX * tileWidth + (canvasWidth - gridWidth) / 2);
    fallingDebrisY.push(cartY * tileHeight + (canvasHeight - gridHeight) / 2);
    fallingDebrisIndex.push(grid[cartX][cartY]);
    fallingDebrisScale.push(1);
    fallingDebrisMatrix.push([
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ]);
    grid[cartX][cartY] = 0;
  }
  cartIsRolling = 1;
  setTimeout(function () {
    if (cartDirection === 0 && newDirection === 3) {
      transitionBetweenTiles(4, cartX, cartY, newDirection, newX, newY, 0);
    } else if (cartDirection === 3 && newDirection === 0) {
      transitionBetweenTiles(cartDirection, cartX, cartY, 4, newX, newY, 0);
    } else {
      transitionBetweenTiles(
        cartDirection,
        cartX,
        cartY,
        newDirection,
        newX,
        newY,
        0
      );
    }
  }, transitionTime);
}

function determineNextMove() {
  if (gameOver || isFallingCartIntervalRunning) return;
  var nextDirection = cartDirection,
    nextX = cartX,
    nextY = cartY;
  if (grid[cartX][cartY] > 2 && grid[cartX][cartY] < 7) {
    switch (grid[cartX][cartY]) {
      case 3:
        nextDirection = cartDirection === 0 ? 1 : 2;
        break;
      case 4:
        nextDirection = cartDirection === 0 ? 3 : 2;
        break;
      case 5:
        nextDirection = cartDirection === 1 ? 0 : 3;
        break;
      default:
        nextDirection = cartDirection === 3 ? 0 : 1;
    }
  }
  switch (nextDirection) {
    case 0:
      nextY--;
      break;
    case 1:
      nextX++;
      break;
    case 2:
      nextY++;
      break;
    default:
      nextX--;
  }
  moveCart(nextDirection, nextX, nextY);
}

function transitionBetweenTiles(
  oldDirection,
  oldX,
  oldY,
  newDirection,
  newX,
  newY,
  index
) {
  if (gameOver || isFallingCartIntervalRunning) return;
  if (index > numberOfCartTransitions) {
    cartDirection %= 4;
    if (grid[cartX][cartY] < 7) {
      determineNextMove();
    } else {
      cartIsRolling = 0;
      arrowKeyEvent(lastKeyEvent);
    }
    return;
  }
  cartDirection =
    (index * (newDirection - oldDirection)) / numberOfCartTransitions +
    oldDirection;
  cartX = (index * (newX - oldX)) / numberOfCartTransitions + oldX;
  cartY = (index * (newY - oldY)) / numberOfCartTransitions + oldY;
  render();
  setTimeout(function () {
    transitionBetweenTiles(
      oldDirection,
      oldX,
      oldY,
      newDirection,
      newX,
      newY,
      index + 1
    );
  }, transitionTime);
}

function swipeEndEvent(evt) {
  evt.preventDefault();
  var swipeEndX = evt.targetTouches[0].clientX;
  var swipeEndY = evt.targetTouches[0].clientY;
  var theta = Math.atan2(swipeEndY - swipeStartY, swipeEndX - swipeStartX);
  theta += theta < 0 ? 2 * Math.PI : 0;
  var direction = Math.round((2 * theta) / Math.PI);
  direction %= 4;
  var key;
  switch (direction) {
    case 0: //right
      key = 39;
      break;
    case 1: //down
      key = 40;
      break;
    case 2: //left
      key = 37;
      break;
    default:
      //up
      key = 38;
  }
  //alert(key);
  var newEvent = {
    keyCode: key,
  };
  arrowKeyEvent(newEvent);
}

function swipeMoveEvent(evt) {
  evt.preventDefault();
  if (!swipeListen) return;
  var swipeMoveX = evt.targetTouches[0].clientX;
  var swipeMoveY = evt.targetTouches[0].clientY;
  var dx = swipeMoveX - swipeStartX;
  var dy = swipeMoveY - swipeStartY;
  if (dx * dx + dy * dy > 100) {
    swipeEndEvent(evt);
    swipeListen = 0;
  }
}

function swipeStartEvent(evt) {
  if (isIOS && !isAudioLoaded) loadAudio();
  evt.preventDefault();
  swipeStartX = evt.targetTouches[0].clientX;
  swipeStartY = evt.targetTouches[0].clientY;
  swipeListen = 1;
}

function clickEvent(evt) {
  if (isIOS && !isAudioLoaded) loadAudio();
}

function arrowKeyEvent(evt) {
  if (gameOver) return;
  if (cartIsRolling) {
    canIGetAKeyInEdgewise = 1;
    lastKeyEvent = evt;
    return;
  }
  lastKeyEvent = evt;
  var newX = cartX,
    newY = cartY,
    newDirection = cartDirection;
  switch (evt.keyCode) {
    case 37: //left
      newDirection = 3;
      newX--;
      switch (grid[cartX][cartY]) {
        case 1:
          return;
        case 3:
          return;
        case 6:
          return;
        case 11:
          return;
      }
      break;
    case 38: //up
      newDirection = 0;
      newY--;
      switch (grid[cartX][cartY]) {
        case 2:
          return;
        case 3:
          return;
        case 4:
          return;
        case 8:
          return;
      }
      break;
    case 39: //right
      newDirection = 1;
      newX++;
      switch (grid[cartX][cartY]) {
        case 1:
          return;
        case 4:
          return;
        case 5:
          return;
        case 9:
          return;
      }
      break;
    case 40: //down
      newDirection = 2;
      newY++;
      switch (grid[cartX][cartY]) {
        case 2:
          return;
        case 5:
          return;
        case 6:
          return;
        case 10:
          return;
      }
      break;
    default:
      return;
  }
  moveCart(newDirection, newX, newY);
}

function setEventListeners() {
  placardCanvas.addEventListener("mousedown", clickEvent);
  placardCanvas.addEventListener("touchstart", swipeStartEvent);
  placardCanvas.addEventListener("touchmove", swipeMoveEvent);
  scrollPreventCanvas.addEventListener("touchmove", function (evt) {
    evt.preventDefault();
  });
  document.addEventListener("keydown", arrowKeyEvent);
  window.addEventListener("resize", rescaleCanvases);
}

function initializePlayerPosition() {
  var test = 0;
  while (!test) {
    cartX = Math.floor(Math.random() * grid.length);
    cartY = Math.floor(Math.random() * grid[0].length);
    test = grid[cartX][cartY] < 3 && grid[cartX][cartY] > 0;
  }
  cartDirection = grid[cartX][cartY] != 1;
}

function setGoldPieces() {
  goldX = [];
  goldY = [];
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length; j++) {
      if (grid[i][j] > 2 && grid[i][j] < 7) {
        goldX.push(i);
        goldY.push(j);
      }
    }
  }
}

function Rectangle(x, y, w, h) {
  this.left = x;
  this.top = y;
  this.width = w;
  this.height = h;
  this.fillGrid = function () {
    switch (grid[this.left][this.top]) {
      case 0:
        grid[this.left][this.top] = 3;
        break;
      case 1:
        grid[this.left][this.top] = 11;
        break;
      case 2:
        grid[this.left][this.top] = 8;
        break;
      case 3:
        grid[this.left][this.top] = 3;
        break;
      case 4:
        grid[this.left][this.top] = 8;
        break;
      case 5:
        grid[this.left][this.top] = 7;
        break;
      case 6:
        grid[this.left][this.top] = 11;
        break;
      case 7:
        grid[this.left][this.top] = 7;
        break;
      case 8:
        grid[this.left][this.top] = 8;
        break;
      case 9:
        grid[this.left][this.top] = 7;
        break;
      case 10:
        grid[this.left][this.top] = 7;
        break;
      case 11:
        grid[this.left][this.top] = 11;
        break;
    }
    switch (grid[this.left + this.width][this.top]) {
      case 0:
        grid[this.left + this.width][this.top] = 4;
        break;
      case 1:
        grid[this.left + this.width][this.top] = 9;
        break;
      case 2:
        grid[this.left + this.width][this.top] = 8;
        break;
      case 3:
        grid[this.left + this.width][this.top] = 8;
        break;
      case 4:
        grid[this.left + this.width][this.top] = 4;
        break;
      case 5:
        grid[this.left + this.width][this.top] = 9;
        break;
      case 6:
        grid[this.left + this.width][this.top] = 7;
        break;
      case 7:
        grid[this.left + this.width][this.top] = 7;
        break;
      case 8:
        grid[this.left + this.width][this.top] = 8;
        break;
      case 9:
        grid[this.left + this.width][this.top] = 9;
        break;
      case 10:
        grid[this.left + this.width][this.top] = 7;
        break;
      case 11:
        grid[this.left + this.width][this.top] = 7;
        break;
    }
    switch (grid[this.left][this.top + this.height]) {
      case 0:
        grid[this.left][this.top + this.height] = 6;
        break;
      case 1:
        grid[this.left][this.top + this.height] = 11;
        break;
      case 2:
        grid[this.left][this.top + this.height] = 10;
        break;
      case 3:
        grid[this.left][this.top + this.height] = 11;
        break;
      case 4:
        grid[this.left][this.top + this.height] = 7;
        break;
      case 5:
        grid[this.left][this.top + this.height] = 10;
        break;
      case 6:
        grid[this.left][this.top + this.height] = 6;
        break;
      case 7:
        grid[this.left][this.top + this.height] = 7;
        break;
      case 8:
        grid[this.left][this.top + this.height] = 7;
        break;
      case 9:
        grid[this.left][this.top + this.height] = 7;
        break;
      case 10:
        grid[this.left][this.top + this.height] = 10;
        break;
      case 11:
        grid[this.left][this.top + this.height] = 11;
        break;
    }
    switch (grid[this.left + this.width][this.top + this.height]) {
      case 0:
        grid[this.left + this.width][this.top + this.height] = 5;
        break;
      case 1:
        grid[this.left + this.width][this.top + this.height] = 9;
        break;
      case 2:
        grid[this.left + this.width][this.top + this.height] = 10;
        break;
      case 3:
        grid[this.left + this.width][this.top + this.height] = 7;
        break;
      case 4:
        grid[this.left + this.width][this.top + this.height] = 9;
        break;
      case 5:
        grid[this.left + this.width][this.top + this.height] = 5;
        break;
      case 6:
        grid[this.left + this.width][this.top + this.height] = 10;
        break;
      case 7:
        grid[this.left + this.width][this.top + this.height] = 7;
        break;
      case 8:
        grid[this.left + this.width][this.top + this.height] = 7;
        break;
      case 9:
        grid[this.left + this.width][this.top + this.height] = 9;
        break;
      case 10:
        grid[this.left + this.width][this.top + this.height] = 10;
        break;
      case 11:
        grid[this.left + this.width][this.top + this.height] = 7;
        break;
    }
    for (var i = this.left + 1; i < this.left + this.width; i++) {
      switch (grid[i][this.top]) {
        case 0:
          grid[i][this.top] = 2;
          break;
        case 1:
          grid[i][this.top] = 7;
          break;
        case 2:
          grid[i][this.top] = 2;
          break;
        case 3:
          grid[i][this.top] = 8;
          break;
        case 4:
          grid[i][this.top] = 8;
          break;
        case 5:
          grid[i][this.top] = 10;
          break;
        case 6:
          grid[i][this.top] = 10;
          break;
        case 7:
          grid[i][this.top] = 7;
          break;
        case 8:
          grid[i][this.top] = 8;
          break;
        case 9:
          grid[i][this.top] = 7;
          break;
        case 10:
          grid[i][this.top] = 10;
          break;
        case 11:
          grid[i][this.top] = 7;
          break;
      }
      switch (grid[i][this.top + this.height]) {
        case 0:
          grid[i][this.top + this.height] = 2;
          break;
        case 1:
          grid[i][this.top + this.height] = 7;
          break;
        case 2:
          grid[i][this.top + this.height] = 2;
          break;
        case 3:
          grid[i][this.top + this.height] = 8;
          break;
        case 4:
          grid[i][this.top + this.height] = 8;
          break;
        case 5:
          grid[i][this.top + this.height] = 10;
          break;
        case 6:
          grid[i][this.top + this.height] = 10;
          break;
        case 7:
          grid[i][this.top + this.height] = 7;
          break;
        case 8:
          grid[i][this.top + this.height] = 8;
          break;
        case 9:
          grid[i][this.top + this.height] = 7;
          break;
        case 10:
          grid[i][this.top + this.height] = 10;
          break;
        case 11:
          grid[i][this.top + this.height] = 7;
          break;
      }
    }
    for (var j = this.top + 1; j < this.top + this.height; j++) {
      switch (grid[this.left][j]) {
        case 0:
          grid[this.left][j] = 1;
          break;
        case 1:
          grid[this.left][j] = 1;
          break;
        case 2:
          grid[this.left][j] = 7;
          break;
        case 3:
          grid[this.left][j] = 11;
          break;
        case 4:
          grid[this.left][j] = 9;
          break;
        case 5:
          grid[this.left][j] = 9;
          break;
        case 6:
          grid[this.left][j] = 11;
          break;
        case 7:
          grid[this.left][j] = 7;
          break;
        case 8:
          grid[this.left][j] = 7;
          break;
        case 9:
          grid[this.left][j] = 9;
          break;
        case 10:
          grid[this.left][j] = 7;
          break;
        case 11:
          grid[this.left][j] = 11;
          break;
      }
      switch (grid[this.left + this.width][j]) {
        case 0:
          grid[this.left + this.width][j] = 1;
          break;
        case 1:
          grid[this.left + this.width][j] = 1;
          break;
        case 2:
          grid[this.left + this.width][j] = 7;
          break;
        case 3:
          grid[this.left + this.width][j] = 11;
          break;
        case 4:
          grid[this.left + this.width][j] = 9;
          break;
        case 5:
          grid[this.left + this.width][j] = 9;
          break;
        case 6:
          grid[this.left + this.width][j] = 11;
          break;
        case 7:
          grid[this.left + this.width][j] = 7;
          break;
        case 8:
          grid[this.left + this.width][j] = 7;
          break;
        case 9:
          grid[this.left + this.width][j] = 9;
          break;
        case 10:
          grid[this.left + this.width][j] = 7;
          break;
        case 11:
          grid[this.left + this.width][j] = 11;
          break;
      }
    }
  };
  this.distanceToIntersect = function (x0, y0, angle) {
    var dx, dy, angleTL, angleTR, angleBL, angleBR;
    dx = this.left - x0;
    dy = this.top - y0;
    angleTL = Math.atan2(dy, dx);
    dx += this.width;
    angleTR = Math.atan2(dy, dx);
    dy += this.height;
    angleBR = Math.atan2(dy, dx);
    dx -= this.width;
    angleBL = Math.atan2(dy, dx);
    angleTL += angleTL < 0 ? 2 * Math.PI : 0;
    angleTR += angleTR < 0 ? 2 * Math.PI : 0;
    angleBL += angleBL < 0 ? 2 * Math.PI : 0;
    angleBR += angleBR < 0 ? 2 * Math.PI : 0;
    var quadrant;
    if (angle >= angleTL && angle <= angleTR) {
      quadrant = 0;
    } else if (angle >= angleTR || angle <= angleBR) {
      quadrant = 1;
    } else if (angle >= angleBR && angle <= angleBL) {
      quadrant = 2;
    } else {
      quadrant = 3;
    }
    var x1, y1;
    var slope = Math.tan(angle);
    var intercept = y0 - slope * x0;
    switch (quadrant) {
      case 0:
        y1 = this.top;
        x1 = (y1 - intercept) / slope;
        break;
      case 1:
        x1 = this.left + this.width;
        y1 = slope * x1 + intercept;
        break;
      case 2:
        y1 = this.top + this.height;
        x1 = (y1 - intercept) / slope;
        break;
      case 3:
        x1 = this.left;
        y1 = slope * x1 + intercept;
        break;
    }
    dy = y1 - y0;
    dx = x1 - x0;
    return Math.sqrt(dx * dx + dy * dy);
  };
  this.checkForIntersect = function (rect) {
    if (
      this.left === rect.left ||
      this.left + this.width === rect.left + rect.width ||
      this.top === rect.top ||
      this.top + this.height === rect.top + rect.height
    )
      return 1;
    if (
      this.left === rect.left + rect.width ||
      this.left + this.width === rect.left ||
      this.top === rect.top + rect.height ||
      this.top + this.height === rect.top
    )
      return 1;
    return 0;
  };
  this.checkArrayForIntersect = function (rects) {
    if (
      this.top < 0 ||
      this.left < 0 ||
      this.top + this.height >= grid[0].length ||
      this.left + this.width >= grid.length
    )
      return 1;
    for (var i = 0; i < rects.length; i++) {
      if (this.checkForIntersect(rects[i])) return 1;
    }
    return 0;
  };
}

function centerGrid() {
  var xs = [],
    ys = [];
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length; j++) {
      if (grid[i][j]) {
        xs.push(i);
        ys.push(j);
      }
    }
  }
  var xMin = xs[0],
    xMax = xs[0],
    yMin = ys[0],
    yMax = ys[0];
  for (var i = 0; i < xs.length; i++) {
    if (xs[i] < xMin) xMin = xs[i];
    if (xs[i] > xMax) xMax = xs[i];
  }
  for (var i = 0; i < ys.length; i++) {
    if (ys[i] < yMin) yMin = ys[i];
    if (ys[i] > yMax) yMax = ys[i];
  }
  var height = yMax - yMin;
  var width = xMax - xMin;
  var xMin_ = Math.round((grid.length - 1 - width) / 2);
  var yMin_ = Math.round((grid[0].length - 1 - height) / 2);
  var deltaX = xMin_ - xMin;
  var deltaY = yMin_ - yMin;
  var newGrid = [];
  for (var i = 0; i < grid.length; i++) {
    newGrid.push(new Array(grid[i].length));
    for (var j = 0; j < grid[i].length; j++) {
      if (
        i >= xMin_ &&
        i <= xMin_ + width &&
        j >= yMin_ &&
        j <= yMin_ + height
      ) {
        newGrid[i][j] = grid[i - deltaX][j - deltaY];
      } else {
        newGrid[i][j] = 0;
      }
    }
  }
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length; j++) {
      grid[i][j] = newGrid[i][j];
    }
  }
}

function createPuzzle() {
  var width = Math.floor(Math.random() * (grid.length - 6) + 6);
  var height = Math.floor(Math.random() * (grid[0].length - 9) + 9);
  var canvasRect = new Rectangle(0, 0, grid.length, grid[0].length);
  var x = Math.floor(Math.random() * (grid.length - width));
  var y = Math.floor(Math.random() * (grid[0].length - height));
  var rect = new Rectangle(x, y, width, height);
  var rectArray = new Array();
  rectArray.push(rect);
  var test,
    angle,
    index,
    x1,
    x2,
    x3,
    x4,
    y1,
    y2,
    y3,
    y4,
    rMin,
    rMax,
    r,
    newRect,
    counter;
  for (var i = 0; i < numberOfRectangles; i++) {
    test = 1;
    counter = 0;
    while (test) {
      index = Math.floor(Math.random() * rectArray.length);
      rect = rectArray[index];
      x1 = Math.floor(Math.random() * (rect.width - 2) + rect.left + 1);
      y1 = Math.floor(Math.random() * (rect.height - 2) + rect.top + 1);
      angle = Math.random() * 2 * Math.PI;
      rMin = rect.distanceToIntersect(x1, y1, angle);
      rMax = canvasRect.distanceToIntersect(x1, y1, angle);
      r = Math.random() * (rMax - rMin) + rMin;
      x2 = Math.floor(r * Math.cos(angle) + x1);
      y2 = Math.floor(r * Math.sin(angle) + y1);
      x3 = x1 < x2 ? x1 : x2;
      y3 = y1 < y2 ? y1 : y2;
      x4 = x1 < x2 ? x2 : x1;
      y4 = y1 < y2 ? y2 : y1;
      newRect = new Rectangle(x3, y3, x4 - x3, y4 - y3);
      test = newRect.checkArrayForIntersect(rectArray);
      if (x4 - x3 <= 1 || y4 - y3 <= 1) test = 1;
      counter++;
      if (counter > 100) return 0;
    }
    rectArray.push(newRect);
  }
  for (var i = 0; i < rectArray.length; i++) {
    rectArray[i].fillGrid();
  }
  centerGrid();
  setGoldPieces();
  initializePlayerPosition();
  levelGrid = dealiasGrid(grid);
  levelPositionX = cartX;
  levelPositionY = cartY;
  levelDirection = cartDirection;
  return 1;
}

function dealiasGrid(arr) {
  var newGrid = new Array(arr.length);
  for (var i = 0; i < arr.length; i++) {
    newGrid[i] = new Array(arr[i].length);
    for (var j = 0; j < arr[i].length; j++) {
      newGrid[i][j] = arr[i][j];
    }
  }
  return newGrid;
}

function initializeGrid() {
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
  numberOfRectangles = Math.round(8 / (1 + Math.exp(-currentLevel)));
  isPlacardOn = 1;
  gameOver = 1;
  var placardTimer = setTimeout(function () {
    isPlacardOn = 0;
    gameOver = 0;
    cartIsRolling = 0;
    render();
  }, 3000);
  playerContext = cartContext;
  stopRendering = 0;
  cartScale = 1;
  isFallingCartIntervalRunning = 0;
  coinsInCart = [];
  fallingDebrisX = [];
  fallingDebrisY = [];
  fallingDebrisScale = [];
  fallingDebrisIndex = [];
  fallingDebrisMatrix = [];
  grid = new Array(numberOfTilesX);
  for (var i = 0; i < grid.length; i++) {
    grid[i] = new Array(numberOfTilesY);
    for (var j = 0; j < grid[i].length; j++) {
      grid[i][j] = 0;
    }
  }
  var test = 0;
  while (!test) {
    test = createPuzzle();
  }
  if (!eventListenersAreSet) {
    setEventListeners();
    setCoinTimer();
    setFallingDebrisInterval();
    setLavaInterval();
    rescaleCanvases();
    eventListenersAreSet = 1;
    stopGlobalLoadingIndicator();
  } else {
    render();
  }
}

function loadCoinEdge() {
  coinEdge = new Image();
  coinEdge.src = coinEdgeURL;
  coinEdge.onload = initializeGrid;
}

function loadCoinImage() {
  coinImage = new Image();
  coinImage.src = coinImageURL;
  coinImage.onload = loadCoinEdge;
}

function loadCartImage() {
  cartImage = new Image();
  cartImage.src = cartImageURL;
  cartImage.onload = loadCoinImage;
}

function loadTileImage(index) {
  if (index >= tileImages.length) {
    loadCartImage();
    return;
  }
  tileImages[index] = new Image();
  tileImages[index].src = tileImageURLs[index];

  tileImages[index].onload = function () {
    loadTileImage(index + 1);
  };
}

function loadCavernImage() {
  cavernImage = new Image();
  cavernImage.src = cavernImageURL;
  cavernImage.onload = function () {
    loadTileImage(0);
  };
}

function loadLavaImage() {
  lavaImage = new Image();
  lavaImage.src = lavaImageURL;
  lavaImage.onload = loadCavernImage;
}

export class VolcanoFrenzy2 extends React.Component {
  componentDidMount() {
    startGlobalLoadingIndicator();
    scrollPreventCanvas = document.getElementById("scrollPreventCanvas");
    lavaCanvas = document.getElementById("lavaCanvas");
    lavaContext = lavaCanvas.getContext("2d");
    cavernCanvas = document.getElementById("cavernCanvas");
    cavernContext = cavernCanvas.getContext("2d");
    fallingCanvas = document.getElementById("fallingCanvas");
    fallingContext = fallingCanvas.getContext("2d");
    tileCanvas = document.getElementById("tileCanvas");
    tileContext = tileCanvas.getContext("2d");
    goldCanvas = document.getElementById("goldCanvas");
    goldContext = goldCanvas.getContext("2d");
    cartCanvas = document.getElementById("cartCanvas");
    cartContext = cartCanvas.getContext("2d");
    placardCanvas = document.getElementById("placardCanvas");
    placardContext = placardCanvas.getContext("2d");
    playerContext = cartContext;
    document.documentElement.style.overflow = "hidden";
    document.body.scroll = "no";

    loadLavaImage();
  }

  render() {
    return (
      <div>
        <canvas
          id="scrollPreventCanvas"
          width="1136"
          height="640"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: 0,
            border: "0px solid black",
          }}
        />
        <canvas
          id="lavaCanvas"
          width="1136"
          height="640"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: 1,
            border: "0px solid black",
          }}
        />
        <canvas
          id="cavernCanvas"
          width="1136"
          height="640"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: 2,
            border: "0px solid black",
          }}
        />
        <canvas
          id="fallingCanvas"
          width="1136"
          height="640"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: 3,
            border: "0px solid black",
          }}
        />
        <canvas
          id="tileCanvas"
          width="1136"
          height="640"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: 4,
            border: "0px solid black",
          }}
        />
        <canvas
          id="goldCanvas"
          width="1136"
          height="640"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: 5,
            border: "0px solid black",
          }}
        />
        <canvas
          id="cartCanvas"
          width="1136"
          height="640"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: 6,
            border: "0px solid black",
          }}
        />
        <canvas
          id="placardCanvas"
          width="1136"
          height="640"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: 7,
            border: "0px solid black",
          }}
        />
      </div>
    );
  }
}

export { VolcanoFrenzy2 as default };
