import * as React from "react";
import {
  startGlobalLoadingIndicator,
  stopGlobalLoadingIndicator,
} from "../../Components/GlobalLoadingIndicator";
import { maxCanvasScale } from "../../Util/MaxCanvasScale";

var delta_t = 70;

var scrollPreventCanvas, c, background_canvas, buttonCanvas, textCanvas;

var ctx, background_ctx, buttonContext, textContext;

var canvasWidth = 400;
var canvasHeight = 400;

var XMAX = canvasWidth / 10;
var YMAX = canvasHeight / 10;
var pixel_width = Math.round(canvasWidth / XMAX);
var pixel_height = Math.round(canvasHeight / YMAX);
var VX;
var VY;
var grid = new Array(XMAX + 1);
var xmid = Math.round((XMAX + 1) / 2);
var ymid = Math.round((YMAX + 1) / 2);
var snakex;
var snakey;
var GAME_OVER = 0;
var GAME_PAUSED = 1;
var SCORE;
var APPLEX, APPLEY;
var myTimer;
var isMobile = 0;

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
  centerCanvas(c);
  centerCanvas(background_canvas);
  centerCanvas(buttonCanvas);
  centerCanvas(textCanvas);
}

function rescaleCanvas(canvas, context, scale) {
  canvas.width = Math.floor(canvasWidth * scale);
  canvas.height = Math.floor(canvasHeight * scale);
  context.scale(scale, scale);
}

function rescaleAllCanvases() {
  window.scrollTo(0, 0);
  scrollPreventCanvas.style.left = "0px";
  scrollPreventCanvas.style.top = "0px";
  c.style.left = "0px";
  c.style.top = "0px";
  background_canvas.style.left = "0px";
  background_canvas.style.top = "0px";
  buttonCanvas.style.left = "0px";
  buttonCanvas.style.top = "0px";
  textCanvas.style.left = "0px";
  textCanvas.style.top = "0px";
  var rect = buttonCanvas.getBoundingClientRect();
  var widthNeeded = window.innerWidth;
  var heightNeeded = window.innerHeight;
  var scaleX = widthNeeded / canvasWidth;
  var scaleY = heightNeeded / canvasHeight;
  var scale = scaleX < scaleY ? scaleX : scaleY;
  scale = scale >= maxCanvasScale ? maxCanvasScale : scale;
  scrollPreventCanvas.width = window.innerWidth;
  scrollPreventCanvas.height = window.innerHeight;
  rescaleCanvas(c, ctx, scale);
  rescaleCanvas(background_canvas, background_ctx, scale);
  rescaleCanvas(buttonCanvas, buttonContext, scale);
  rescaleCanvas(textCanvas, textContext, scale);
  if (isMobile) {
    setTimeout(function () {
      window.scrollTo(0, rect.top);
      centerAllCanvases();
    }, 500);
  } else {
    window.scrollTo(0, rect.top);
    centerAllCanvases();
  }
  draw_background();
  render_initializer();
  if (GAME_PAUSED || GAME_OVER) {
    drawButton();
  }
  if (GAME_OVER) {
    textContext.fillStyle = "black";
    textContext.font = "20px Arial";
    textContext.textAlign = "center";
    textContext.textBaseline = "middle";
    textContext.fillText("GAME OVER", 200, 166);
    textContext.fillText("SCORE: " + SCORE, 200, 186);
  }
}

function drawButton() {
  buttonContext.strokeStyle = "black";
  buttonContext.fillStyle = "black";
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

function touchButton(e) {
  //if (e.targetTouches.length > 1) {return;}
  var rect = c.getBoundingClientRect();
  var x = e.targetTouches[0].clientX - rect.left;
  var y = e.targetTouches[0].clientY - rect.top;
  var scale = 400 / c.width;
  x *= scale;
  y *= scale;
  var key, code;
  if (x >= 0 && x <= canvasWidth && y >= 0 && y <= canvasHeight) {
    e.preventDefault();
    if (GAME_OVER) {
      GAME_OVER = 0;
      GAME_PAUSED = 0;
      buttonContext.clearRect(0, 0, canvasWidth, canvasHeight);
      textContext.clearRect(0, 0, canvasWidth, canvasHeight);
      play();
      return;
    }
    if (GAME_PAUSED) {
      buttonContext.clearRect(0, 0, canvasWidth, canvasHeight);
      GAME_PAUSED = 0;
    } else {
      if (!VX) {
        if (x > snakex[0] * pixel_width) {
          //right
          code = 39;
        } else {
          //left
          code = 37;
        }
      } else {
        if (y > snakey[0] * pixel_height) {
          //down
          code = 40;
        } else {
          //up
          code = 38;
        }
      }
      key = {
        evnt: e,
        keyCode: code,
        preventDefault: function () {
          this.evnt.preventDefault();
        },
      };
      click_stuff(key);
    }
  } else {
    drawButton();
    GAME_PAUSED = 1;
  }
  return;
}

function clickButton(e) {
  var rect = c.getBoundingClientRect();
  var scale = 400 / c.width;
  var x = (e.clientX - rect.left) * scale;
  var y = (e.clientY - rect.top) * scale;
  if (x >= 0 && x <= canvasWidth && y >= 0 && y <= canvasHeight) {
    e.preventDefault();
    if (GAME_OVER) {
      GAME_OVER = 0;
      GAME_PAUSED = 0;
      buttonContext.clearRect(0, 0, canvasWidth, canvasHeight);
      textContext.clearRect(0, 0, canvasWidth, canvasHeight);
      play();
      return;
    }
    if (GAME_PAUSED) {
      buttonContext.clearRect(0, 0, canvasWidth, canvasHeight);
      GAME_PAUSED = 0;
    } else {
      drawButton();
      GAME_PAUSED = 1;
    }
  }
  return;
}

function draw_segment(i, j) {
  var x = (i * canvasWidth) / XMAX;
  var y = (j * canvasHeight) / YMAX;
  x -= pixel_width / 2;
  y -= pixel_height / 2;
  ctx.fillStyle = "green";
  ctx.fillRect(Math.round(x), Math.round(y), pixel_width, pixel_height);
  ctx.beginPath();
  x += pixel_width / 2;
  y += pixel_width;
  ctx.moveTo(x, y);
  x += pixel_width / 2;
  y -= pixel_width / 2;
  ctx.lineTo(x, y);
  x -= pixel_width / 2;
  y -= pixel_width / 2;
  ctx.lineTo(x, y);
  x -= pixel_width / 2;
  y += pixel_width / 2;
  ctx.lineTo(x, y);
  x += pixel_width / 2;
  y += pixel_width / 2;
  ctx.lineTo(x, y);
  ctx.fillStyle = "purple";
  ctx.fill();
  return;
}

function draw_apple(i, j) {
  var x = (i * canvasWidth) / XMAX;
  var y = (j * canvasHeight) / YMAX;
  var x1, y1, x2, y2, x3, y3, width, height, newx, newy;
  newx = x;
  newy = Math.round(y + pixel_height / 2);
  width = Math.round(pixel_width / 16);
  height = Math.round(pixel_height / 11);
  ctx.beginPath();
  ctx.moveTo(newx, newy);
  x1 = newx + 5 * width;
  y1 = newy - 2 * height;
  x2 = newx + 8 * width;
  y2 = newy - 8 * height;
  x3 = newx;
  y3 = newy - 5 * height;
  ctx.bezierCurveTo(x1, y1, x2, y2, x3, y3);
  x1 = newx - 5 * width;
  x2 = newx - 8 * width;
  ctx.moveTo(newx, newy);
  ctx.bezierCurveTo(x1, y1, x2, y2, x3, y3);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x3, y3);
  x1 = x3;
  y1 = y3 - 2 * height;
  x2 = x3 - width;
  y2 = y3 - 3 * height;
  x3 -= 2 * width;
  y3 -= 4 * height;
  ctx.bezierCurveTo(x1, y1, x2, y2, x3, y3);
  ctx.moveTo(newx, newy - 5 * height);
  x1 = newx - width;
  x2 = newx - 2 * width;
  x3 = newx - 3 * width;
  y3 = newy - 9 * height;
  ctx.bezierCurveTo(x1, y1, x2, y2, x3, y3);
  ctx.lineTo(newx - 2 * width, y3);
  ctx.fillStyle = "green";
  ctx.fill();
  return;
}

function pixel_on(i, j) {
  switch (grid[i][j]) {
    case 1:
      draw_segment(i, j);
      break;
    case 2:
      draw_apple(i, j);
      break;
  }
  return;
}

function pixel_off(i, j) {
  var x = (i * canvasWidth) / XMAX;
  var y = (j * canvasHeight) / YMAX;
  x -= pixel_width / 2;
  y -= pixel_height / 2;
  ctx.clearRect(Math.round(x), Math.round(y), pixel_width, pixel_height);
  return;
}

function click_stuff(e) {
  if (GAME_OVER || GAME_PAUSED) {
    return;
  }
  switch (e.keyCode) {
    case 37:
      e.preventDefault();
      if (snakex[0] - 1 == snakex[1]) {
        return;
      }
      VX = -1;
      VY = 0;
      break;
    case 38:
      e.preventDefault();
      if (snakey[0] - 1 == snakey[1]) {
        return;
      }
      VX = 0;
      VY = -1;
      break;
    case 39:
      e.preventDefault();
      if (snakex[0] + 1 == snakex[1]) {
        return;
      }
      VX = 1;
      VY = 0;
      break;
    case 40:
      e.preventDefault();
      if (snakey[0] + 1 == snakey[1]) {
        return;
      }
      VX = 0;
      VY = 1;
      break;
  }
  return;
}

function fill_grid() {
  for (var i = 0; i < grid.length; i++) {
    grid[i] = new Array(YMAX + 1);
  }
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length; j++) {
      grid[i][j] = 0;
    }
  }
  return;
}

function create_apple() {
  var test = 0;
  while (test == 0) {
    APPLEX = Math.round(Math.random() * (XMAX - 4) + 2);
    APPLEY = Math.round(Math.random() * (YMAX - 4) + 2);
    if (grid[APPLEX][APPLEY] == 0) {
      test = 1;
      grid[APPLEX][APPLEY] = 2;
      return;
    }
  }
  return;
}

Array.prototype.update = function (x) {
  var newx = x;
  var oldx;
  for (var i = 0; i < this.length; i++) {
    oldx = this[i];
    this[i] = newx;
    newx = oldx;
  }
  return;
};

function draw_background() {
  var step_width = Math.round(canvasWidth / 15);
  var step_height = Math.round(canvasHeight / 15);
  for (var i = 0; i < canvasWidth; i += step_width) {
    for (var j = 0; j < canvasHeight; j += step_height) {
      background_ctx.fillStyle = "Lavender";
      //background_ctx.fillStyle = "MistyRose";
      if ((i + j) % 2 == 0) {
        background_ctx.fillStyle = "White";
        //background_ctx.fillStyle = "LemonChiffon";
        //background_ctx.fillStyle = "MistyRose";
      }
      background_ctx.fillRect(i, j, step_width, step_height);
    }
  }
  return;
}

function render_pixels() {
  ctx.clearRect(0, 0, 400, 400);
  for (var i = 0; i <= XMAX; i++) {
    for (var j = 0; j <= YMAX; j++) {
      switch (grid[i][j]) {
        case 0:
          break;
        case 1:
          draw_segment(i, j);
          break;
        case 2:
          draw_apple(i, j);
          break;
      }
    }
  }
}

function render_initializer() {
  draw_background();
  render_pixels();
  return;
}

function move_forward() {
  if (GAME_OVER || GAME_PAUSED) {
    return;
  }
  var HEADX = snakex[0] + VX;
  var HEADY = snakey[0] + VY;
  var TAILX = snakex[snakex.length - 1];
  var TAILY = snakey[snakey.length - 1];
  if (HEADX > XMAX || HEADX < 0 || HEADY > YMAX || HEADY < 0) {
    //alert("Game over! Score: " + SCORE);
    textContext.fillStyle = "black";
    textContext.font = "20px Arial";
    textContext.textAlign = "center";
    textContext.textBaseline = "middle";
    textContext.fillText("GAME OVER", 200, 166);
    textContext.fillText("SCORE: " + SCORE, 200, 186);
    clearInterval(myTimer);
    GAME_OVER = 1;
    drawButton();
    return;
  }
  if (grid[HEADX][HEADY] == 1) {
    if (HEADX != TAILX || HEADY != TAILY) {
      //alert("Game over! Score: " + SCORE);
      textContext.fillStyle = "black";
      textContext.font = "20px Arial";
      textContext.textAlign = "center";
      textContext.textBaseline = "middle";
      textContext.fillText("GAME OVER", 200, 166);
      textContext.fillText("SCORE: " + SCORE, 200, 186);
      clearInterval(myTimer);
      GAME_OVER = 1;
      drawButton();
      return;
    }
  }
  if (HEADX == APPLEX && HEADY == APPLEY) {
    grid[HEADX][HEADY] = 1;
    SCORE++;
    //pixel_off(HEADX,HEADY);
    //draw_segment(HEADX,HEADY);
    //pixel_on(HEADX,HEADY);
    create_apple();
    //draw_apple(APPLEX,APPLEY);
    //pixel_on(APPLEX,APPLEY);
    render_pixels();
    snakex.unshift(HEADX);
    snakey.unshift(HEADY);
    return;
  }
  snakex.update(HEADX);
  snakey.update(HEADY);
  grid[TAILX][TAILY] = 0;
  //pixel_off(TAILX,TAILY);
  grid[HEADX][HEADY] = 1;
  //draw_segment(HEADX,HEADY);
  render_pixels();
}

function initializeEventListeners() {
  if (
    /Android|iPhone|iPad|iPod|webOS|Blackberry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  )
    isMobile = 1;
  window.addEventListener("resize", rescaleAllCanvases);
  document.onkeydown = click_stuff;
  document.onclick = clickButton;
  window.addEventListener("touchstart", touchButton, false);
  textCanvas.addEventListener(
    "touchend",
    function (e) {
      e.preventDefault();
    },
    false
  );
  textCanvas.addEventListener(
    "touchmove",
    function (e) {
      if (e.targetTouches.length === 1) {
        e.preventDefault();
      }
    },
    false
  );
  scrollPreventCanvas.addEventListener("touchmove", function (evt) {
    evt.preventDefault();
  });
}

function play() {
  VX = 0;
  VY = -1;
  SCORE = 0;
  snakex = [xmid, xmid, xmid];
  snakey = [ymid - 2, ymid - 1, ymid];
  fill_grid();
  for (var i = 0; i < snakex.length; i++) {
    grid[snakex[i]][snakey[i]] = 1;
  }
  create_apple();
  if (GAME_PAUSED) {
    drawButton();
  }
  myTimer = setInterval(move_forward, delta_t);
}

export class Snake extends React.Component {
  componentDidMount() {
    startGlobalLoadingIndicator();
    scrollPreventCanvas = document.getElementById("scrollPreventCanvas");
    c = document.getElementById("myCanvas");
    ctx = c.getContext("2d");
    background_canvas = document.getElementById("background");
    background_ctx = background_canvas.getContext("2d");
    buttonCanvas = document.getElementById("playButton");
    buttonContext = buttonCanvas.getContext("2d");
    textCanvas = document.getElementById("txtCanvas");
    textContext = textCanvas.getContext("2d");
    document.documentElement.style.overflow = "hidden";
    document.body.scroll = "no";
    initializeEventListeners();
    play();
    rescaleAllCanvases();
    stopGlobalLoadingIndicator();
  }

  render() {
    return (
      <div>
        <canvas
          id="scrollPreventCanvas"
          width="400"
          height="400"
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            zIndex: 0,
            border: "0px solid black",
          }}
        />
        <canvas
          id="myCanvas"
          width="400"
          height="400"
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            zIndex: 2,
            border: "1px solid black",
          }}
        />
        <canvas
          id="background"
          width="400"
          height="400"
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            zIndex: 1,
            border: "1px solid black",
          }}
        />
        <canvas
          id="playButton"
          width="400"
          height="400"
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            zIndex: 3,
            border: "1px solid black",
          }}
        />
        <canvas
          id="txtCanvas"
          width="400"
          height="400"
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            zIndex: 4,
            border: "1px solid black",
          }}
        />
      </div>
    );
  }
}

export { Snake as default };
