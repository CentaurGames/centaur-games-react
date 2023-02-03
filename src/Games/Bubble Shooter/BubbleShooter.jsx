import * as React from "react";
import {
  startGlobalLoadingIndicator,
  stopGlobalLoadingIndicator,
} from "../../Components/GlobalLoadingIndicator";
import { maxCanvasScale } from "../../Util/MaxCanvasScale";

var canvasWidth = 610;
var canvasHeight = 600;

var scrollPreventCanvas,
  backgroundCanvas,
  shooterCanvas,
  bubbleCanvas,
  launchCanvas,
  imageCanvas,
  buttonCanvas;

var scrollPreventContext,
  backgroundContext,
  shooterContext,
  bubbleContext,
  launchContext,
  imageContext,
  buttonContext;

var canvases = [],
  contexts = [];

var shooterWidth = 40;
var shooterHeight = 40;
var shooterHeightInRealPixels = shooterHeight;
var bubbleRadius = Math.round(shooterWidth / 4);
var shooterImage = new Image(shooterWidth, shooterHeight);
//var bubbleImages = [new Image(2*bubbleRadius,2*bubbleRadius), new Image(2*bubbleRadius,2*bubbleRadius), new Image(2*bubbleRadius,2*bubbleRadius), new Image(2*bubbleRadius,2*bubbleRadius), new Image(2*bubbleRadius,2*bubbleRadius)];
var numberOfColors = 5;
var numberOfMagnificationStates = 4;
var bubbleImages = new Array(numberOfColors);
//var shineColors = ["pink","palegreen","powderblue","white","lavender"];
//var bubbleColors = ["red","green","blue","yellow","purple"];
var colorStop1 = ["pink", "palegreen", "powderblue", "white", "lavender"];
var colorStop2 = ["red", "green", "blue", "gold", "purple"];
var colorStop3 = [
  "orangered",
  "lime",
  "dodgerblue",
  "rgb(255,255,0)",
  "darkorchid",
];
var colorStop4 = ["darkred", "darkgreen", "mediumblue", "red", "darkmagenta"];
var pixelWidth = 2 * bubbleRadius;
var pixelHeight = Math.round(Math.sqrt(3) * bubbleRadius);
var horizontalGridSize = Math.floor(canvasWidth / pixelWidth);
var verticalGridSize = Math.floor((canvasHeight - shooterHeight) / pixelHeight);
var grid = new Array(horizontalGridSize);
var numberOfInitialLayers = 8;
var vx, vy;
var v = 10;
var deltaT = 10;
var startX = Math.round(canvasWidth / 2) - bubbleRadius;
var startY = canvasHeight - shooterHeight - bubbleRadius;
var launchX, launchY;
var myTimer, popTimer, layerTimer;
var isLaunching = 0;
var launchIndex;
var bubblesToBePoppedI = new Array(0);
var bubblesToBePoppedJ = new Array(0);
var magnification;
var noGoZone = canvasHeight - 3 * shooterHeight;
var gameOver = 0;
var SCORE = 0;
var newLayerWhileLaunching = 0;
var gamePaused = 1;
var clockTimer, clockCounter, lastLayerTimer;
var gameHasStarted = 0;
var imagesAreLoaded = 0;
var isMobile = 0;

//window.onorientationchange = rescaleAllCanvases;

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
  for (var i = 0; i < canvases.length; i++) {
    centerCanvas(canvases[i]);
  }
}

function rescaleCanvas(canvas, context, scale) {
  canvas.width = Math.floor(canvasWidth * scale);
  canvas.height = Math.floor(canvasHeight * scale);
  context.scale(scale, scale);
}

function rescaleAllCanvases() {
  window.scrollTo(0, 0);
  for (var i = 0; i < canvases.length; i++) {
    canvases[i].style.left = "0px";
    canvases[i].style.top = "0px";
  }
  var rect = buttonCanvas.getBoundingClientRect();
  var widthNeeded = window.innerWidth;
  var heightNeeded = window.innerHeight;
  var scaleX = widthNeeded / canvasWidth;
  var scaleY = heightNeeded / canvasHeight;
  var scale = scaleX < scaleY ? scaleX : scaleY;
  scale = scale >= maxCanvasScale ? maxCanvasScale : scale;
  scrollPreventCanvas.width = window.innerWidth;
  scrollPreventCanvas.height = window.innerHeight;
  for (var i = 1; i < canvases.length; i++) {
    rescaleCanvas(canvases[i], contexts[i], scale);
  }
  if (isMobile) {
    setTimeout(function () {
      window.scrollTo(0, rect.top);
      centerAllCanvases();
    }, 500);
  } else {
    window.scrollTo(0, rect.top);
    centerAllCanvases();
  }
  shooterHeightInRealPixels = scale * shooterHeight;
  renderBackground();
  shooterContext.drawImage(
    shooterImage,
    Math.round((canvasWidth - shooterWidth) / 2),
    canvasHeight - 2 * shooterHeight
  );
  if (!isLaunching) {
    launchContext.drawImage(bubbleImages[launchIndex][0], startX, startY);
  }
  renderGrid();
  if (gamePaused) {
    drawButton();
  }
}

function drawButton() {
  buttonContext.strokeStyle = "white";
  buttonContext.fillStyle = "white";
  buttonContext.moveTo(
    Math.round(canvasWidth / 2) - 20,
    Math.round(canvasHeight / 2) - 20
  );
  buttonContext.beginPath();
  buttonContext.lineTo(
    Math.round(canvasWidth / 2) + 20,
    Math.round(canvasHeight / 2)
  );
  buttonContext.lineTo(
    Math.round(canvasWidth / 2) - 20,
    Math.round(canvasHeight / 2) + 20
  );
  buttonContext.lineTo(
    Math.round(canvasWidth / 2) - 20,
    Math.round(canvasHeight / 2) - 20
  );
  buttonContext.closePath();
  buttonContext.fill();
  buttonContext.stroke();
  return;
}

function clickButton(e) {
  var rect = buttonCanvas.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;
  if (x >= 0 && x <= buttonCanvas.width && y >= 0 && y <= buttonCanvas.height) {
    // e.preventDefault();
    if (gameOver) {
      gameOver = 0;
      gamePaused = 0;
      buttonContext.clearRect(0, 0, canvasWidth, canvasHeight);
      launchContext.clearRect(0, 0, canvasWidth, canvasHeight);
      SCORE = 0;
      isLaunching = 0;
      imagesAreLoaded = 1;
      play();
      return;
    }
    if (gamePaused) {
      if (clockCounter === 0) {
        clockTimer = setInterval(function () {
          clockCounter++;
        }, 10);
      }
      layerTimer = setTimeout(function () {
        addNewLayer();
        layerTimer = setInterval(addNewLayer, 45000);
      }, 45000 - (clockCounter + lastLayerTimer) * 10);
      buttonContext.clearRect(0, 0, canvasWidth, canvasHeight);
      gamePaused = 0;
    } else {
      launch(e);
    }
  } else {
    if (!gamePaused) {
      clearInterval(layerTimer);
      drawButton();
      gamePaused = 1;
    }
  }
  return;
}

function addNewLayer() {
  lastLayerTimer = clockCounter;
  if (isLaunching) {
    newLayerWhileLaunching = 1;
    return;
  }
  var newGrid = new Array(grid.length);
  for (var i = 0; i < grid.length; i++) {
    newGrid[i] = new Array(grid[i].length);
  }
  for (var i = 0; i < grid.length; i++) {
    newGrid[i][0] = Math.floor(Math.random() * numberOfColors) + 1;
    newGrid[i][1] = Math.floor(Math.random() * numberOfColors) + 1;
    for (var j = 0; j < grid[i].length - 2; j++) {
      if (grid[i][j]) {
        newGrid[i][j + 2] = grid[i][j];
      }
    }
  }
  grid = newGrid;
  bubbleContext.clearRect(0, 0, canvasWidth, canvasHeight);
  renderGrid();
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length; j++) {
      if (grid[i][j] && (j + 1) * pixelHeight > noGoZone) {
        gameOverSequence();
      }
    }
  }
  return;
}

function renderGrid() {
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length; j++) {
      if (grid[i][j]) {
        drawBubble(i, j, grid[i][j] - 1, 0);
      }
    }
  }
  drawScore();
  return;
}

function isConnected(i, j) {
  if (j == 0) {
    return 1;
  }
  if (j % 2 == 0) {
    if (i + 1 < grid.length) {
      if (grid[i + 1][j - 1]) {
        return 1;
      }
    }
  } else {
    if (i - 1 >= 0) {
      if (grid[i - 1][j - 1]) {
        return 1;
      }
    }
  }
  if (grid[i][j - 1]) {
    return 1;
  }
  return 0;
}

function fillGrid(layer) {
  if (layer >= numberOfInitialLayers) {
    return;
  }
  for (var i = 0; i < horizontalGridSize; i++) {
    if (layer < 3 || (isConnected(i, layer) && Math.random() < 0.5)) {
      grid[i][layer] = Math.floor(Math.random() * numberOfColors) + 1;
    }
  }
  if (layer + 1 < numberOfInitialLayers) {
    fillGrid(layer + 1);
  }
  return;
}

function initializeGrid() {
  for (var i = 0; i < horizontalGridSize; i++) {
    grid[i] = new Array(verticalGridSize);
    for (var j = 0; j < verticalGridSize; j++) {
      grid[i][j] = 0;
    }
  }
  if (!imagesAreLoaded) {
    for (var i = 0; i < numberOfColors; i++) {
      bubbleImages[i] = new Array(numberOfMagnificationStates);
      for (var j = 0; j < numberOfMagnificationStates; j++) {
        bubbleImages[i][j] = new Image(2 * bubbleRadius, 2 * bubbleRadius);
      }
    }
  }
  fillGrid(0);
  return;
}

function drawGearTooth(theta1, theta2) {
  imageContext.save();
  imageContext.globalCompositeOperation = "destination-out";
  var r1 = Math.round((3 * shooterWidth) / 8);
  var r2 = Math.round((1.1 * shooterWidth) / 2);
  imageContext.translate(Math.round(shooterWidth / 2), shooterHeight);
  imageContext.beginPath();
  imageContext.moveTo(r2 * Math.cos(theta1), r2 * Math.sin(theta1));
  imageContext.lineTo(r1 * Math.cos(theta1), r1 * Math.sin(theta1));
  imageContext.arc(0, 0, r1, theta1, theta2);
  imageContext.lineTo(r2 * Math.cos(theta2), r2 * Math.sin(theta2));
  imageContext.lineTo(r2 * Math.cos(theta1), r2 * Math.sin(theta1));
  imageContext.closePath();
  imageContext.fill();
  imageContext.restore();
  return;
}

function drawShooter() {
  imageCanvas.width = shooterWidth;
  imageCanvas.height = 2 * shooterHeight;
  //imageContext.strokeStyle = "darkorange";
  //var gradient = imageContext.createLinearGradient(0,0,shooterWidth,2*shooterHeight);
  //gradient.addColorStop(0,"gold");
  //gradient.addColorStop(1,"darkorange");
  var gradient = imageContext.createRadialGradient(
    Math.round(shooterWidth / 2),
    shooterHeight,
    Math.round(shooterWidth / 4),
    Math.round(shooterWidth / 2),
    shooterHeight,
    Math.round(1.05 * shooterHeight)
  );
  gradient.addColorStop(0, "darkorange");
  gradient.addColorStop(0.25, "orangered");
  gradient.addColorStop(1, "darkred");
  imageContext.strokeStyle = gradient;
  imageContext.fillStyle = gradient;
  imageContext.beginPath();
  imageContext.arc(
    Math.round(shooterWidth / 2),
    shooterHeight,
    Math.round(shooterWidth / 2),
    0,
    2 * Math.PI
  );
  imageContext.closePath();
  imageContext.fill();
  imageContext.save();
  imageContext.globalCompositeOperation = "destination-out";
  imageContext.beginPath();
  imageContext.arc(
    Math.round(shooterWidth / 2),
    shooterHeight,
    Math.round(shooterWidth / 4),
    0,
    2 * Math.PI
  );
  imageContext.closePath();
  imageContext.fill();
  imageContext.restore();
  var numberOfGearTeeth = 20;
  var deltaTheta = Math.PI / (2 * numberOfGearTeeth);
  for (var i = 0; i < numberOfGearTeeth; i++) {
    drawGearTooth(
      (2 * i * Math.PI) / numberOfGearTeeth - deltaTheta,
      (2 * i * Math.PI) / numberOfGearTeeth + deltaTheta
    );
  }
  //imageContext.fillStyle = "darkorange";
  imageContext.fillRect(
    Math.round((3 * shooterWidth) / 8),
    Math.round(shooterHeight / 4),
    Math.round(shooterWidth / 4),
    Math.round((3 * shooterHeight) / 4)
  );
  imageContext.beginPath();
  imageContext.moveTo(Math.round(shooterWidth / 2), 0);
  imageContext.lineTo(
    Math.round(shooterWidth / 4),
    Math.round(shooterHeight / 4)
  );
  imageContext.lineTo(
    Math.round((3 * shooterWidth) / 4),
    Math.round(shooterHeight / 4)
  );
  imageContext.lineTo(Math.round(shooterWidth / 2), 0);
  imageContext.closePath();
  imageContext.stroke();
  imageContext.fill();
  imageContext.clearRect(
    Math.round(shooterWidth / 2) - Math.round(shooterWidth / 40),
    Math.round(shooterHeight / 4),
    Math.round(shooterWidth / 20),
    Math.round((3 * shooterHeight) / 4)
  );
  shooterImage.src = imageCanvas.toDataURL("image/png");
  shooterImage.onload = function () {
    shooterContext.drawImage(
      shooterImage,
      Math.round((canvasWidth - shooterWidth) / 2),
      canvasHeight - 2 * shooterHeight
    );
    imageCanvas.width = 0;
    imageCanvas.height = 0;
    drawBubbleImage(0, 0);
  };
  return;
}

function drawBubbleImage(index, mag) {
  if (index >= numberOfColors) {
    launchIndex = Math.floor(Math.random() * numberOfColors);
    rescaleAllCanvases();
    //launchContext.drawImage(bubbleImages[launchIndex][0],startX,startY);
    //renderGrid();
    document.onmousemove = mouseMotionDetector;
    document.onclick = clickButton;
    window.addEventListener(
      "touchstart",
      function (e) {
        if (e.targetTouches.length > 1) {
          return;
        }
        var ev = {
          clientX: e.targetTouches[0].clientX,
          clientY: e.targetTouches[0].clientY,
        };
        clickButton(ev);
        mouseMotionDetector(ev);
      },
      false
    );
    buttonCanvas.addEventListener(
      "touchmove",
      function (e) {
        if (e.targetTouches.length === 1) {
          e.preventDefault();
        }
        var ev = {
          clientX: e.targetTouches[0].clientX,
          clientY: e.targetTouches[0].clientY,
        };
        mouseMotionDetector(ev);
      },
      false
    );
    buttonCanvas.addEventListener(
      "touchend",
      function (e) {
        e.preventDefault();
      },
      false
    );
    scrollPreventCanvas.addEventListener("touchmove", function (evt) {
      evt.preventDefault();
    });
    if (!gamePaused) {
      layerTimer = setInterval(addNewLayer, 45000);
    }
    stopGlobalLoadingIndicator();
    return;
  }
  if (mag >= numberOfMagnificationStates) {
    drawBubbleImage(index + 1, 0);
    return;
  }
  var bR = bubbleRadius * Math.pow(2, -mag);
  imageCanvas.width = 2 * bubbleRadius;
  imageCanvas.height = 2 * bubbleRadius;
  //var gradient = imageContext.createRadialGradient(Math.round(bubbleRadius/2),Math.round(bubbleRadius/2),0,Math.round(bubbleRadius/2),Math.round(bubbleRadius/2),bubbleRadius);
  //gradient.addColorStop(0,shineColors[index]);
  //gradient.addColorStop(0.6,bubbleColors[index]);
  var gradient = imageContext.createRadialGradient(
    Math.round(bubbleRadius / 2),
    Math.round(bubbleRadius / 2),
    0,
    bubbleRadius,
    bubbleRadius,
    Math.round(1.6 * bubbleRadius)
  );
  //gradient.addColorStop(0,"cyan");
  //gradient.addColorStop(1,"mediumblue");
  //gradient.addColorStop(0.68,"deepskyblue");
  //gradient.addColorStop(0.2,"blue");
  gradient.addColorStop(0, colorStop1[index]);
  gradient.addColorStop(0.2, colorStop2[index]);
  gradient.addColorStop(0.68, colorStop3[index]);
  gradient.addColorStop(1, colorStop4[index]);
  imageContext.fillStyle = gradient;
  imageContext.arc(bubbleRadius, bubbleRadius, bR, 0, 2 * Math.PI);
  imageContext.fill();
  bubbleImages[index][mag].src = imageCanvas.toDataURL("image/png");
  bubbleImages[index][mag].onload = function () {
    imageCanvas.width = 0;
    imageCanvas.height = 0;
    drawBubbleImage(index, mag + 1);
  };
  return;
}

function drawBubble(i, j, index, mag) {
  var x = i * pixelWidth;
  var y = j * pixelHeight;
  if (j % 2 == 0) {
    x += bubbleRadius;
  }
  x = Math.round(x);
  y = Math.round(y);
  if (x < 0) {
    x = 0;
  }
  if (x >= canvasWidth) {
    x = canvasWidth - 1;
  }
  if (y < 0) {
    y = 0;
  }
  if (y >= canvasHeight) {
    y = canvasHeight - 1;
  }
  bubbleContext.drawImage(bubbleImages[index][mag], x, y);
  return;
}

function mouseMotionDetector(e) {
  if (gameOver || gamePaused) {
    return;
  }
  //var x = Math.round(canvasWidth/2) - Math.floor(e.clientX - offsetHorizontal);
  //var y = canvasHeight - shooterHeight - Math.floor(e.clientY - offsetVertical);
  var rect = buttonCanvas.getBoundingClientRect();

  var x =
    Math.round(buttonCanvas.width / 2) - Math.floor(e.clientX - rect.left);

  var y =
    buttonCanvas.height -
    shooterHeightInRealPixels -
    Math.floor(e.clientY - rect.top);
  var theta = Math.atan2(x, y);
  shooterContext.clearRect(
    Math.round(canvasWidth / 2) - shooterHeight,
    canvasHeight - 2 * shooterHeight,
    2 * shooterHeight,
    2 * shooterHeight
  );
  shooterContext.save();
  shooterContext.translate(
    Math.round(canvasWidth / 2),
    canvasHeight - shooterHeight
  );
  shooterContext.rotate(2 * Math.PI - theta);
  shooterContext.drawImage(
    shooterImage,
    -Math.round(shooterWidth / 2),
    -shooterHeight
  );
  shooterContext.restore();
  return;
}

function fillUpPops(i, j) {
  for (var k = 0; k < bubblesToBePoppedI.length; k++) {
    if (bubblesToBePoppedI[k] == i && bubblesToBePoppedJ[k] == j) {
      return;
    }
  }
  bubblesToBePoppedI.push(i);
  bubblesToBePoppedJ.push(j);
  if (j > 0) {
    if (j % 2 == 0) {
      if (i + 1 < grid.length) {
        if (grid[i + 1][j - 1] == grid[i][j]) {
          fillUpPops(i + 1, j - 1);
        }
      }
    } else {
      if (i - 1 >= 0) {
        if (grid[i - 1][j - 1] == grid[i][j]) {
          fillUpPops(i - 1, j - 1);
        }
      }
    }
    if (grid[i][j - 1] == grid[i][j]) {
      fillUpPops(i, j - 1);
    }
  }
  if (i > 0) {
    if (grid[i - 1][j] == grid[i][j]) {
      fillUpPops(i - 1, j);
    }
  }
  if (i + 1 < grid.length) {
    if (grid[i + 1][j] == grid[i][j]) {
      fillUpPops(i + 1, j);
    }
  }
  if (j + 1 < grid[i].length) {
    if (j % 2 == 0) {
      if (i + 1 < grid.length) {
        if (grid[i + 1][j + 1] == grid[i][j]) {
          fillUpPops(i + 1, j + 1);
        }
      }
    } else {
      if (i - 1 >= 0) {
        if (grid[i - 1][j + 1] == grid[i][j]) {
          fillUpPops(i - 1, j + 1);
        }
      }
    }
    if (grid[i][j + 1] == grid[i][j]) {
      fillUpPops(i, j + 1);
    }
  }
  return;
}

function isHanging(i, j, direction) {
  if (isConnected(i, j)) {
    return 0;
  }
  if (direction == 0) {
    if (i - 1 >= 0) {
      if (grid[i - 1][j] && !isHanging(i - 1, j, -1)) {
        return 0;
      }
    }
    if (i + 1 < grid.length) {
      if (grid[i + 1][j] && !isHanging(i + 1, j, 1)) {
        return 0;
      }
    }
  }
  if (direction == -1) {
    if (i - 1 >= 0) {
      if (grid[i - 1][j] && !isHanging(i - 1, j, -1)) {
        return 0;
      }
    }
  }
  if (direction == 1) {
    if (i + 1 < grid.length) {
      if (grid[i + 1][j] && !isHanging(i + 1, j, 1)) {
        return 0;
      }
    }
  }
  return 1;
}

function gameOverSequence() {
  if (gameOver) {
    return;
  }
  gameOver = 1;
  clearInterval(layerTimer);
  launchContext.fillStyle = "white";
  launchContext.font = "30px Arial";
  launchContext.textAlign = "center";
  launchContext.fillText("GAME OVER", canvasWidth / 2, canvasHeight / 2);
  drawButton();
  return;
}

function checkAllHangers() {
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length; j++) {
      if (grid[i][j] && isHanging(i, j, 0)) {
        bubblesToBePoppedI.push(i);
        bubblesToBePoppedJ.push(j);
      }
    }
  }
  if (bubblesToBePoppedI.length) {
    SCORE += bubblesToBePoppedI.length;
    popAllBubbles(1);
  } else {
    isLaunching = 0;
    if (newLayerWhileLaunching) {
      addNewLayer();
      newLayerWhileLaunching = 0;
    }
    for (var i = 0; i < grid.length; i++) {
      for (var j = 0; j < grid[i].length; j++) {
        if (grid[i][j] && (j + 1) * pixelHeight > noGoZone) {
          gameOverSequence();
          return;
        }
      }
    }
    launchIndex = Math.floor(Math.random() * numberOfColors);
    launchContext.drawImage(bubbleImages[launchIndex][0], startX, startY);
    drawScore();
  }
  return;
}

function popAllBubbles(mag) {
  if (mag >= numberOfMagnificationStates) {
    bubbleContext.clearRect(0, 0, canvasWidth, canvasHeight);
    for (var k = 0; k < bubblesToBePoppedI.length; k++) {
      grid[bubblesToBePoppedI[k]][bubblesToBePoppedJ[k]] = 0;
    }
    bubblesToBePoppedI = new Array(0);
    bubblesToBePoppedJ = new Array(0);
    renderGrid();
    checkAllHangers();
    return;
  }
  var test;
  bubbleContext.clearRect(0, 0, canvasWidth, canvasHeight);
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length; j++) {
      if (grid[i][j]) {
        test = 0;
        for (var k = 0; k < bubblesToBePoppedI.length; k++) {
          if (i == bubblesToBePoppedI[k] && j == bubblesToBePoppedJ[k]) {
            drawBubble(i, j, grid[i][j] - 1, mag);
            test = 1;
          }
        }
        if (!test) {
          drawBubble(i, j, grid[i][j] - 1, 0);
        }
      }
    }
  }
  drawScore();
  var im = new Image(canvasWidth, canvasHeight);
  im.src = bubbleCanvas.toDataURL("image/png");
  im.onload = function () {
    setTimeout(function () {
      popAllBubbles(mag + 1);
    }, 30);
  };
  return;
}

function checkForPops(i, j) {
  fillUpPops(i, j);
  if (bubblesToBePoppedI.length < 3) {
    bubblesToBePoppedI = new Array(0);
    bubblesToBePoppedJ = new Array(0);
    for (var j = 0; j < grid[i].length; j++) {
      if (grid[i][j] && (j + 1) * pixelHeight > noGoZone) {
        gameOverSequence();
        return;
      }
    }
    drawScore();
    launchIndex = Math.floor(Math.random() * numberOfColors);
    launchContext.drawImage(bubbleImages[launchIndex][0], startX, startY);
    isLaunching = 0;
    return;
  }
  SCORE += bubblesToBePoppedI.length;
  popAllBubbles(1);
  return;
}

function stepForward() {
  var newX = launchX + vx;
  var newY = launchY + vy;
  if (newX >= canvasWidth) {
    newX = 2 * canvasWidth - newX;
    vx *= -1;
  }
  if (newX < 0) {
    newX *= -1;
    vx *= -1;
  }
  /*
	if (Math.round(newY) < 0)
	{
		newY = 0;
	}
	*/
  if (newY >= canvasHeight) {
    newY = 2 * canvasHeight - newY;
    vy *= -1;
  }
  var i, j;
  j = Math.round(newY / pixelHeight);
  if (j % 2 == 0) {
    i = Math.round((newX - bubbleRadius) / pixelWidth);
  } else {
    i = Math.round(newX / pixelWidth);
  }
  if (i < 0) {
    i = 0;
  }
  if (j < 0) {
    j = 0;
  }
  if (i >= horizontalGridSize) {
    i = horizontalGridSize - 1;
  }
  if (j >= verticalGridSize) {
    j = verticalGridSize - 1;
  }
  if (grid[i][j] || Math.round(newY) < 0) {
    clearInterval(myTimer);
    j = Math.round(launchY / pixelHeight);
    if (j % 2 == 0) {
      i = Math.round((launchX - bubbleRadius) / pixelWidth);
    } else {
      i = Math.round(launchX / pixelWidth);
    }
    if (i < 0) {
      i = 0;
    }
    if (j < 0) {
      j = 0;
    }
    if (i >= horizontalGridSize) {
      i = horizontalGridSize - 1;
    }
    if (j >= verticalGridSize) {
      j = verticalGridSize - 1;
    }
    grid[i][j] = launchIndex + 1;
    launchContext.clearRect(0, 0, canvasWidth, canvasHeight);
    drawBubble(i, j, launchIndex, 0);
    //launchIndex = Math.floor(Math.random()*numberOfColors);
    //launchContext.drawImage(bubbleImages[launchIndex][0],startX,startY,pixelWidth,pixelHeight);
    //isLaunching = 0;
    checkForPops(i, j);
  } else {
    //launchContext.clearRect(launchX-pixelWidth,launchY-pixelHeight,2*pixelWidth,2*pixelHeight);
    launchContext.clearRect(0, 0, canvasWidth, canvasHeight);
    launchX = newX;
    launchY = newY;
    launchContext.drawImage(bubbleImages[launchIndex][0], launchX, launchY);
  }
  return;
}

function launch(e) {
  if (isLaunching || gameOver) {
    return;
  }
  //var x = Math.round(canvasWidth/2) - Math.floor(e.clientX - offsetHorizontal);
  //var y = canvasHeight - shooterHeight - Math.floor(e.clientY - offsetVertical);
  var rect = buttonCanvas.getBoundingClientRect();

  var x =
    Math.round(buttonCanvas.width / 2) - Math.floor(e.clientX - rect.left);

  var y =
    buttonCanvas.height -
    shooterHeightInRealPixels -
    Math.floor(e.clientY - rect.top);
  var theta = Math.atan2(y, x);
  theta += Math.PI;
  vx = v * Math.cos(theta);
  vy = v * Math.sin(theta);
  launchX = startX;
  launchY = startY;
  isLaunching = 1;
  myTimer = setInterval(stepForward, deltaT);
  return;
}

function renderBackground() {
  backgroundContext.fillStyle = "rgb(22,0,77)";
  backgroundContext.fillRect(0, 0, canvasWidth, canvasHeight);
  backgroundContext.strokeStyle = "red";
  backgroundContext.beginPath();
  backgroundContext.moveTo(0, noGoZone);
  backgroundContext.lineTo(canvasWidth, noGoZone);
  backgroundContext.closePath();
  backgroundContext.stroke();
  return;
}

function drawScore() {
  bubbleContext.fillStyle = "white";
  bubbleContext.font = "12px Arial";
  bubbleContext.fillText(
    "SCORE: " + SCORE,
    canvasWidth - 3 * shooterWidth,
    canvasHeight - 2 * shooterHeight
  );
  return;
}

function play() {
  if (
    /Android|iPhone|iPad|iPod|webOS|Blackberry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  )
    isMobile = 1;
  initializeGrid();
  if (gamePaused) {
    clockCounter = 0;
    lastLayerTimer = 0;
    drawButton();
  }
  bubbleContext.clearRect(0, 0, canvasWidth, canvasHeight);
  if (!imagesAreLoaded) {
    renderBackground();
    drawShooter();
  } else {
    renderGrid();
    launchIndex = Math.floor(Math.random() * numberOfColors);
    launchContext.drawImage(bubbleImages[launchIndex][0], startX, startY);
  }
  return;
}

export class BubbleShooter extends React.Component {
  componentDidMount() {
    startGlobalLoadingIndicator();
    scrollPreventCanvas = document.getElementById("scrollPreventCanvas");
    scrollPreventContext = scrollPreventCanvas.getContext("2d");
    backgroundCanvas = document.getElementById("bkgrndCanvas");
    backgroundContext = backgroundCanvas.getContext("2d");
    shooterCanvas = document.getElementById("shtrCanvas");
    shooterContext = shooterCanvas.getContext("2d");
    bubbleCanvas = document.getElementById("bublCanvas");
    bubbleContext = bubbleCanvas.getContext("2d");
    launchCanvas = document.getElementById("lnchCanvas");
    launchContext = launchCanvas.getContext("2d");
    imageCanvas = document.getElementById("imgCanvas");
    imageContext = imageCanvas.getContext("2d");
    buttonCanvas = document.getElementById("playButton");
    buttonContext = buttonCanvas.getContext("2d");
    canvases = [
      scrollPreventCanvas,
      backgroundCanvas,
      shooterCanvas,
      bubbleCanvas,
      launchCanvas,
      imageCanvas,
      buttonCanvas,
    ];
    contexts = [
      scrollPreventContext,
      backgroundContext,
      shooterContext,
      bubbleContext,
      launchContext,
      imageContext,
      buttonContext,
    ];
    window.addEventListener("resize", rescaleAllCanvases);
    document.documentElement.style.overflow = "hidden";
    document.body.scroll = "no";

    play();
  }

  render() {
    return (
      <div>
        <canvas
          id="scrollPreventCanvas"
          width="610"
          height="600"
          style={{
            paddingLeft: "0",
            paddingRight: "0",
            marginLeft: "auto",
            marginRight: "auto",
            display: "block",
            position: "absolute",
            left: "0",
            top: "0",
            zIndex: 0,
            border: "1px solid black",
          }}
        />
        <canvas
          id="bkgrndCanvas"
          width="610"
          height="600"
          style={{
            paddingLeft: "0",
            paddingRight: "0",
            marginLeft: "auto",
            marginRight: "auto",
            display: "block",
            position: "absolute",
            left: "0",
            top: "0",
            zIndex: 2,
            border: "1px solid black",
          }}
        />
        <canvas
          id="shtrCanvas"
          width="610"
          height="600"
          style={{
            paddingLeft: "0",
            paddingRight: "0",
            marginLeft: "auto",
            marginRight: "auto",
            display: "block",
            position: "absolute",
            left: "0",
            top: "0",
            zIndex: 3,
            border: "1px solid black",
          }}
        />
        <canvas
          id="bublCanvas"
          width="610"
          height="600"
          style={{
            paddingLeft: "0",
            paddingRight: "0",
            marginLeft: "auto",
            marginRight: "auto",
            display: "block",
            position: "absolute",
            left: "0",
            top: "0",
            zIndex: 4,
            border: "1px solid black",
          }}
        />
        <canvas
          id="lnchCanvas"
          width="610"
          height="600"
          style={{
            paddingLeft: "0",
            paddingRight: "0",
            marginLeft: "auto",
            marginRight: "auto",
            display: "block",
            position: "absolute",
            left: "0",
            top: "0",
            zIndex: 5,
            border: "1px solid black",
          }}
        />
        <canvas
          id="imgCanvas"
          width="0"
          height="0"
          style={{
            paddingLeft: "0",
            paddingRight: "0",
            marginLeft: "auto",
            marginRight: "auto",
            display: "block",
            position: "absolute",
            left: "0",
            top: "0",
            zIndex: 1,
            border: "1px solid black",
          }}
        />
        <canvas
          id="playButton"
          width="610"
          height="600"
          style={{
            paddingLeft: "0",
            paddingRight: "0",
            marginLeft: "auto",
            marginRight: "auto",
            display: "block",
            position: "absolute",
            left: "0",
            top: "0",
            zIndex: 6,
            border: "1px solid black",
          }}
        />
      </div>
    );
  }
}

export { BubbleShooter as default };
