import * as React from "react";
import { startGlobalLoadingIndicator, stopGlobalLoadingIndicator } from "../../Components/GlobalLoadingIndicator";
import { maxCanvasScale } from "../../Util/MaxCanvasScale";

var numberOfCellsVertical = 20;
var numberOfCellsHorizontal = 20;
var numberOfBombs = 60;

var horizontalOffset = 0;
var verticalOffset = 0;

var scrollPreventCanvas, numberCanvas, tileCanvas, flagCanvas, backgroundCanvas, timerCanvas, clockCanvas, scoreCanvas, smileyCanvas, imageCanvas, hiddenCanvas;

var numberContext, tileContext, flagContext, backgroundContext, timerContext, clockContext, scoreContext, smileyContext, imageContext, hiddenContext;

var canvasWidth = 400;
var canvasHeight = 400;
var pixelWidth = Math.round(canvasWidth/numberOfCellsHorizontal);
var pixelHeight = Math.round(canvasHeight/numberOfCellsVertical);

var backgroundWidth = 406;
var backgroundHeight = 459;
var borderThickness = (backgroundWidth - canvasWidth)/2;
var timerWidth = 400;
var timerHeight = 50;
var grid = new Array(numberOfCellsHorizontal);
var tileGrid = new Array(numberOfCellsHorizontal);
var flagGrid = new Array(numberOfCellsHorizontal);
var gameOver = 0;
var numberWidth = 25;
var numberHeight = 37;
var smileyWidth = 30;
var smileyHeight = 30;
var brightLED = "red";
var dimLED = "rgb(80,0,0)";
var clockDigits = new Array(10);
var smiley1 = new Image(smileyWidth,smileyHeight);
var smiley2 = new Image(smileyWidth,smileyHeight);
var imagesLoaded = 0;
var myTimer, isMyTimerRunning = 0, secondsCounter, numberOfFlagsLeft, tapTimer, tapCounter, lastTap;
var lastSmiley, playerIsVictorious = 0, isMobile = 0;

let isFirstCallToPlay = true;

function setEventListeners() {
	document.addEventListener("click",clickStuff);
	window.addEventListener("resize",rescaleAllCanvases);
	smileyCanvas.addEventListener("touchstart",function(e) {
		if (e.targetTouches.length > 1) {return;}
		var click = {clientX:e.targetTouches[0].clientX, clientY:e.targetTouches[0].clientY, which:0};
		clickStuff(click);
	},false);
	smileyCanvas.addEventListener("touchmove",function(e) {
		if (e.targetTouches.length === 1) {e.preventDefault();}
	},false);
	smileyCanvas.addEventListener("touchend",function(e) {
		e.preventDefault();
	},false);
	clockCanvas.addEventListener("touchmove",function(e) {
		if (e.targetTouches.length === 1) {e.preventDefault();}
	},false);
	clockCanvas.addEventListener("touchend",function(e) {
		e.preventDefault();
	},false);
	scoreCanvas.addEventListener("touchmove",function(e) {
		if (e.targetTouches.length === 1) {e.preventDefault();}
	},false);
	scoreCanvas.addEventListener("touchend",function(e) {
		e.preventDefault();
	},false);
	timerCanvas.addEventListener("touchmove",function(e) {
		if (e.targetTouches.length === 1) {e.preventDefault();}
	},false);
	timerCanvas.addEventListener("touchend",function(e) {
		e.preventDefault();
	},false);
	backgroundCanvas.addEventListener("touchmove",function(e) {
		if (e.targetTouches.length === 1) {e.preventDefault();}
	},false);
	backgroundCanvas.addEventListener("touchend",function(e) {
		e.preventDefault();
	},false);
	flagCanvas.addEventListener("touchstart",function(e) {
		if (e.targetTouches.length > 1) {return;}
		lastTap = e;
		tapCounter = 0;
		tapTimer = setInterval(function() {
			tapCounter++;
		},10);
		smileyContext.clearRect(0,0,smileyWidth,smileyHeight);
		smileyContext.drawImage(smiley2,0,0);
	},false);
	flagCanvas.addEventListener("touchmove",function(e) {
		if (e.targetTouches.length === 1) {e.preventDefault();}
	},false);
	flagCanvas.addEventListener("touchend",function(e) {
		e.preventDefault();
		clearInterval(tapTimer);
		var click = {clientX:lastTap.targetTouches[0].clientX, clientY:lastTap.targetTouches[0].clientY, which:(tapCounter > 20 ? 3:0)};
		clickStuff(click);
		smileyContext.clearRect(0,0,smileyWidth,smileyHeight);
		smileyContext.drawImage(smiley1,0,0);
	},false);
	scrollPreventCanvas.addEventListener("touchmove",function(evt) {
		evt.preventDefault();
	});
	document.onmousedown = function() {
		smileyContext.clearRect(0,0,smileyWidth,smileyHeight);
		smileyContext.drawImage(smiley2,0,0);
		lastSmiley = 1;
	}
	document.onmouseup = function() {
		if (gameOver) {return;}
		smileyContext.clearRect(0,0,smileyWidth,smileyHeight);
		smileyContext.drawImage(smiley1,0,0);
		lastSmiley = 0;
	}
	document.oncontextmenu = function(e) {
		e.preventDefault();
		var ev = e;
		ev.button = 2;
		clickStuff(ev);
	}
}

function centerAllCanvases() {
	scrollPreventCanvas.style.left = "0px";
	scrollPreventCanvas.style.top = "0px";
	var rect = scrollPreventCanvas.getBoundingClientRect();
	var offsetX = Math.floor((window.innerWidth - scrollPreventCanvas.width)/2.);
	offsetX -= rect.left;
	var offsetY = Math.floor((window.innerHeight - scrollPreventCanvas.height)/2.);
	offsetY -= rect.top;
	scrollPreventCanvas.style.left = offsetX + "px";
	scrollPreventCanvas.style.top = offsetY + "px";
	backgroundCanvas.style.left = "0px";
	backgroundCanvas.style.top = "0px";
	var scale = backgroundCanvas.width/406.;
	rect = backgroundCanvas.getBoundingClientRect();
	offsetX = Math.floor((window.innerWidth - backgroundCanvas.width)/2.);
	offsetX -= rect.left;
	offsetY = Math.floor((window.innerHeight - backgroundCanvas.height)/2.);
	offsetY -= rect.top;
	backgroundCanvas.style.left = offsetX + "px";
	backgroundCanvas.style.top = offsetY + "px";
	numberCanvas.style.left = (offsetX + 3.*scale) + "px";
	numberCanvas.style.top = (offsetY + 56.*scale) + "px";
	tileCanvas.style.left = (offsetX + 3.*scale) + "px";
	tileCanvas.style.top = (offsetY + 56.*scale) + "px";
	flagCanvas.style.left = (offsetX + 3.*scale) + "px";
	flagCanvas.style.top = (offsetY + 56.*scale) + "px";
	timerCanvas.style.left = (offsetX + 3.*scale) + "px";
	timerCanvas.style.top = (offsetY + 3.*scale) + "px";
	clockCanvas.style.left = (offsetX + 303.*scale) + "px";
	clockCanvas.style.top = (offsetY + 10.*scale) + "px";
	scoreCanvas.style.left = (offsetX + 28.*scale) + "px";
	scoreCanvas.style.top = (offsetY + 10.*scale) + "px";
	smileyCanvas.style.left = (offsetX + 188.*scale) + "px";
	smileyCanvas.style.top = (offsetY + 13.*scale) + "px";
	imageCanvas.style.left = offsetX + "px";
	imageCanvas.style.top = offsetX + "px";
	hiddenCanvas.style.left=  offsetX + "px";
	hiddenCanvas.style.top = offsetY + "px";
}

function rescaleAllCanvases() {
	window.scrollTo(0,0);
	scrollPreventCanvas.style.left = "0px";
	scrollPreventCanvas.style.top = "0px";
	scrollPreventCanvas.width = window.innerWidth;
	scrollPreventCanvas.height = window.innerHeight;
	backgroundCanvas.style.left = "0px";
	backgroundCanvas.style.top = "0px";
	var rect = backgroundCanvas.getBoundingClientRect();
	var scaleX = window.innerWidth/406.;
	var scaleY = window.innerHeight/459.;
	var scale = (scaleX < scaleY ? scaleX : scaleY);
	if (scale >= maxCanvasScale) scale = maxCanvasScale;
	numberCanvas.width = Math.round(scale*400.);
	numberCanvas.height = Math.round(scale*400.);
	numberContext.scale(scale,scale);
	tileCanvas.width = Math.round(scale*400.);
	tileCanvas.height = Math.round(scale*400.);
	tileContext.scale(scale,scale);
	flagCanvas.width = Math.round(scale*400.);
	flagCanvas.height = Math.round(scale*400.);
	flagContext.scale(scale,scale);
	backgroundCanvas.width = Math.round(scale*406.);
	backgroundCanvas.height = Math.round(scale*459.);
	backgroundContext.scale(scale,scale);
	timerCanvas.width = Math.round(scale*400.);
	timerCanvas.height = Math.round(scale*50.);
	timerContext.scale(scale,scale);
	clockCanvas.width = Math.round(scale*75.);
	clockCanvas.height = Math.round(scale*37.);
	clockContext.scale(scale,scale);
	scoreCanvas.width = Math.round(scale*75.);
	scoreCanvas.height = Math.round(scale*37.);
	scoreContext.scale(scale,scale);
	smileyCanvas.width = Math.round(scale*30.);
	smileyCanvas.height = Math.round(scale*30.);
	smileyContext.scale(scale,scale);
	imageCanvas.width = 0;
	imageCanvas.height = 0;
	hiddenCanvas.width = 0;
	hiddenCanvas.height = 0;
	numberCanvas.style.left = (3.*scale) + "px";
	numberCanvas.style.top = (56.*scale) + "px";
	tileCanvas.style.left = (3.*scale) + "px";
	tileCanvas.style.top = (56.*scale) + "px";
	flagCanvas.style.left = (3.*scale) + "px";
	flagCanvas.style.top = (56.*scale) + "px";
	timerCanvas.style.left = (3.*scale) + "px";
	timerCanvas.style.top = (3.*scale) + "px";
	clockCanvas.style.left = (303.*scale) + "px";
	clockCanvas.style.top = (10.*scale) + "px";
	scoreCanvas.style.left = (28.*scale) + "px";
	scoreCanvas.style.top = (10.*scale) + "px";
	smileyCanvas.style.left = (188.*scale) + "px";
	smileyCanvas.style.top = (13.*scale) + "px";
	imageCanvas.width = 0;
	imageCanvas.height = 0;
	hiddenCanvas.width = 0;
	hiddenCanvas.height = 0;
	imageCanvas.style.left = "0px";
	imageCanvas.style.top = "0px";
	hiddenCanvas.style.left = "0px";
	hiddenCanvas.style.top = "0px";
	if (isMobile) {
		setTimeout(function() {
			window.scrollTo(0,rect.top);
			centerAllCanvases();
		},500);
	} else {
		window.scrollTo(0,rect.top);
		centerAllCanvases();
	}
	renderAll();
}

function renderAll() {
	numberContext.clearRect(0,0,400,400);
	tileContext.clearRect(0,0,400,400);
	flagContext.clearRect(0,0,400,400);
	backgroundContext.clearRect(0,0,406,459);
	timerContext.clearRect(0,0,400,50);
	clockContext.clearRect(0,0,75,37);
	scoreContext.clearRect(0,0,75,37);
	smileyContext.clearRect(0,0,30,30);
	imageCanvas.width = 0;
	imageCanvas.height = 0;
	hiddenCanvas.width = 0;
	hiddenCanvas.height = 0;
	createTimerCanvas();
	drawClock();
	drawScoreboard();
	renderNumbers();
	renderTiles();
	drawAllFlags();
	if (lastSmiley) {
		smileyContext.drawImage(smiley2,0,0);
	} else {
		smileyContext.drawImage(smiley1,0,0);
	}
}

function initialize() {
	imageCanvas.width = 0;
	imageCanvas.height = 0;
	hiddenCanvas.width = 0;
	hiddenCanvas.height = 0;
	secondsCounter = 0;
	if (!isMyTimerRunning) {
		myTimer = setInterval(function() {
			drawClock();
			secondsCounter++;
		},1000);
		isMyTimerRunning = 1;
	}
	numberOfFlagsLeft = numberOfBombs;
	lastSmiley = 0;
	createGrid();
	createBombs();
	fillNumbers();
	rescaleAllCanvases();
	imagesLoaded = 1;
	setEventListeners();
	stopGlobalLoadingIndicator();
}

function drawSmiley2()
{
	imageCanvas.width = smileyWidth;
	imageCanvas.height = smileyHeight;
	var grad = imageContext.createLinearGradient(0,0,smileyWidth,smileyHeight);
	grad.addColorStop(0,"ghostwhite");
	grad.addColorStop(1,"dimgrey");
	imageContext.fillStyle = grad;
	imageContext.fillRect(0,0,smileyWidth,smileyHeight);
	imageContext.fillStyle = "yellow";
	imageContext.strokeStyle = "black"
	imageContext.beginPath();
	imageContext.arc(Math.floor(smileyWidth/2),Math.floor(smileyHeight/2),Math.floor(smileyWidth/2.5),0,2*Math.PI);
	imageContext.closePath();
	imageContext.fill();
	imageContext.stroke();
	imageContext.fillStyle = "black";
	imageContext.beginPath();
	imageContext.arc(11,12,1.5,0,2*Math.PI);
	imageContext.closePath();
	imageContext.fill();
	imageContext.beginPath();
	imageContext.arc(19,12,1.5,0,2*Math.PI);
	imageContext.closePath();
	imageContext.fill();
	imageContext.beginPath();
	imageContext.arc(15,20,3,0,2*Math.PI);
	imageContext.stroke();
	smiley2.onload = initialize;
	smiley2.src = imageCanvas.toDataURL("image/png");
}

function drawSmiley1()
{
	imageCanvas.width = smileyWidth;
	imageCanvas.height = smileyHeight;
	var grad = imageContext.createLinearGradient(0,0,smileyWidth,smileyHeight);
	grad.addColorStop(0,"ghostwhite");
	grad.addColorStop(1,"dimgrey");
	imageContext.fillStyle = grad;
	imageContext.fillRect(0,0,smileyWidth,smileyHeight);
	imageContext.fillStyle = "yellow";
	imageContext.strokeStyle = "black"
	imageContext.beginPath();
	imageContext.arc(Math.floor(smileyWidth/2),Math.floor(smileyHeight/2),Math.floor(smileyWidth/2.5),0,2*Math.PI);
	imageContext.closePath();
	imageContext.fill();
	imageContext.stroke();
	imageContext.fillStyle = "black";
	imageContext.beginPath();
	imageContext.arc(11,12,1.5,0,2*Math.PI);
	imageContext.closePath();
	imageContext.fill();
	imageContext.beginPath();
	imageContext.arc(19,12,1.5,0,2*Math.PI);
	imageContext.closePath();
	imageContext.fill();
	imageContext.beginPath();
	imageContext.moveTo(9,18);
	imageContext.bezierCurveTo(12,23,18,23,21,18);
	imageContext.stroke();
	smiley1.src = imageCanvas.toDataURL("image/png");
	smiley1.onload = drawSmiley2;
}

function drawClock()
{
	if (secondsCounter > 999)
	{
		secondsCounter = 999;
		if (isMyTimerRunning) {
			clearInterval(myTimer);
			isMyTimerRunning = 0;
		}
		return;
	}
	clockContext.clearRect(0,0,3*numberWidth,numberHeight);
	var num = secondsCounter;
	var hundreds = Math.floor(num/100);
	num -= hundreds*100;
	var tens = Math.floor(num/10);
	num -= tens*10;
	clockContext.drawImage(clockDigits[hundreds],0,0);
	clockContext.drawImage(clockDigits[tens],numberWidth,0);
	clockContext.drawImage(clockDigits[num],2*numberWidth,0);
}

function drawScoreboard()
{
	if (numberOfFlagsLeft > 999)
	{
		numberOfFlagsLeft = 999;
		return;
	}
	if (numberOfFlagsLeft < 0)
	{
		numberOfFlagsLeft = 0;
		return;
	}
	var num = numberOfFlagsLeft;
	var hundreds = Math.floor(num/100);
	num -= hundreds*100;
	var tens = Math.floor(num/10);
	num -= tens*10;
	scoreContext.drawImage(clockDigits[hundreds],0,0);
	scoreContext.drawImage(clockDigits[tens],numberWidth,0);
	scoreContext.drawImage(clockDigits[num],2*numberWidth,0);
}

function drawHorizontalBar(startY)
{
	imageContext.beginPath();
	imageContext.moveTo(7,startY);
	imageContext.lineTo(18,startY);
	imageContext.lineTo(20,startY+2);
	imageContext.lineTo(18,startY+4);
	imageContext.lineTo(7,startY+4);
	imageContext.lineTo(5,startY+2);
	imageContext.lineTo(7,startY);
	imageContext.closePath();
	imageContext.stroke();
	imageContext.fill();
}

function drawVerticalBar(startX,startY)
{
	imageContext.beginPath();
	imageContext.moveTo(startX,startY+2);
	imageContext.lineTo(startX,startY+13);
	imageContext.lineTo(startX+2,startY+15);
	imageContext.lineTo(startX+4,startY+13);
	imageContext.lineTo(startX+4,startY+2);
	imageContext.lineTo(startX+2,startY);
	imageContext.lineTo(startX,startY+2);
	imageContext.closePath();
	imageContext.stroke();
	imageContext.fill();
}

function drawDigit(top,topleft,topright,middle,bottomleft,bottomright,bottom)
{
	imageContext.fillStyle = "black";
	imageContext.fillRect(0,0,numberWidth,numberHeight);
	imageContext.fillStyle = (top ? brightLED:dimLED);
	imageContext.strokeStyle = (top ? brightLED:dimLED);
	drawHorizontalBar(1);
	imageContext.fillStyle = (topleft ? brightLED:dimLED);
	imageContext.strokeStyle = (topleft ? brightLED:dimLED);
	drawVerticalBar(1,3);
	imageContext.fillStyle = (topright ? brightLED:dimLED);
	imageContext.strokeStyle = (topright ? brightLED:dimLED);
	drawVerticalBar(20,3);
	imageContext.fillStyle = (middle ? brightLED:dimLED);
	imageContext.strokeStyle = (middle ? brightLED:dimLED);
	drawHorizontalBar(17);
	imageContext.fillStyle = (bottomleft ? brightLED:dimLED);
	imageContext.strokeStyle = (bottomleft ? brightLED:dimLED);
	drawVerticalBar(1,19);
	imageContext.fillStyle = (bottomright ? brightLED:dimLED);
	imageContext.strokeStyle = (bottomright ? brightLED:dimLED);
	drawVerticalBar(20,19);
	imageContext.fillStyle = (bottom ? brightLED:dimLED);
	imageContext.strokeStyle = (bottom ? brightLED:dimLED);
	drawHorizontalBar(32);
}

function drawNumber(num)
{
	imageCanvas.width = numberWidth;
	imageCanvas.height = numberHeight;
	if (num > 9)
	{
		drawSmiley1();
		return;
	}
	var img = new Image(numberWidth,numberHeight);
	switch (num)
	{
		case 0:
			drawDigit(1,1,1,0,1,1,1);
			break;
		case 1:
			drawDigit(0,0,1,0,0,1,0);
			break;
		case 2:
			drawDigit(1,0,1,1,1,0,1);
			break;
		case 3:
			drawDigit(1,0,1,1,0,1,1);
			break;
		case 4:
			drawDigit(0,1,1,1,0,1,0);
			break;
		case 5:
			drawDigit(1,1,0,1,0,1,1);
			break;
		case 6:
			drawDigit(1,1,0,1,1,1,1);
			break;
		case 7:
			drawDigit(1,0,1,0,0,1,0);
			break;
		case 8:
			drawDigit(1,1,1,1,1,1,1);
			break;
		case 9:
			drawDigit(1,1,1,1,0,1,1);
			break;
	}
	img.src = imageCanvas.toDataURL("image/png");
	img.onload = function() {
		clockDigits[num] = img;
		drawNumber(num+1);
	}
}

function createTimerCanvas()
{
	backgroundContext.fillStyle = "gainsboro";
	backgroundContext.fillRect(0,0,backgroundWidth,backgroundHeight);
	var grad = timerContext.createLinearGradient(0,0,timerWidth,timerHeight);
	grad.addColorStop(0,"gainsboro");
	grad.addColorStop(1,"rgb(190,190,190)");
	timerContext.fillStyle = grad;
	timerContext.fillRect(0,0,timerWidth,timerHeight);
}

function createGrid()
{
	for (var i = 0; i < grid.length; i++)
	{
		grid[i] = new Array(numberOfCellsVertical);
		tileGrid[i] = new Array(numberOfCellsVertical);
		flagGrid[i] = new Array(numberOfCellsVertical);
	}
	for (var i = 0; i < grid.length; i++)
	{
		for (var j = 0; j < grid[i].length; j++)
		{
			grid[i][j] = 0;
			tileGrid[i][j] = 1;
			flagGrid[i][j] = 0;
		}
	}
	return;
}

function createBombs()
{
	var bombX, bombY;
	for (var i = 0; i < numberOfBombs; i++)
	{
		while (true)
		{
			bombX = Math.floor(Math.random()*numberOfCellsHorizontal);
			bombY = Math.floor(Math.random()*numberOfCellsVertical);
			if (grid[bombX][bombY] == 0)
			{
				grid[bombX][bombY] = -1;
				break;
			}
		}
	}	
	return;
}

function countBombs(i,j)
{
	var counter = 0;
	if (i+1 < grid.length)
	{
		if (j+1 < grid[i+1].length)
		{
			if (grid[i+1][j+1] == -1) {counter++;}
		}
		if (grid[i+1][j] == -1) {counter++;}
		if (j-1 >= 0)
		{
			if (grid[i+1][j-1] == -1) {counter++;}
		}
	}
	if (j+1 < grid[i].length)
	{
		if (grid[i][j+1] == -1) {counter++;}
	}
	if (grid[i][j] == -1) {counter++;}
	if (j-1 >= 0)
	{
		if (grid[i][j-1] == -1) {counter++;}
	}
	if (i-1 >= 0)
	{
		if (j+1 < grid[i-1].length)
		{
			if (grid[i-1][j+1] == -1) {counter++;}
		}
		if (grid[i-1][j] == -1) {counter++;}
		if (j-1 >= 0)
		{
			if (grid[i-1][j-1] == -1) {counter++;}
		}
	}
	grid[i][j] = counter;
	return;
}

function fillNumbers()
{
	for (var i = 0; i < grid.length; i++)
	{
		for (var j = 0; j < grid[i].length; j++)
		{
			if (grid[i][j] == 0)
			{
				countBombs(i,j);
			}
		}
	}
	return;
}

function drawTile(i,j)
{
	var x = i*pixelWidth;
	var y = j*pixelHeight;
	tileContext.fillStyle = "ghostwhite";
	tileContext.beginPath();
	tileContext.moveTo(x+pixelWidth,y);
	tileContext.lineTo(x,y+pixelHeight);
	tileContext.lineTo(x,y);
	tileContext.lineTo(x+pixelWidth,y);
	tileContext.closePath();
	tileContext.fill();
	tileContext.fillStyle = "grey";
	tileContext.beginPath();
	tileContext.moveTo(x+pixelWidth,y+pixelHeight);
	tileContext.lineTo(x+pixelWidth,y);
	tileContext.lineTo(x,y+pixelHeight);
	tileContext.lineTo(x+pixelWidth,y+pixelHeight);
	tileContext.closePath();
	tileContext.fill();
	var gradient = tileContext.createLinearGradient(x+Math.round(pixelWidth/10),y+Math.round(pixelHeight/10),x+pixelWidth-Math.round(pixelWidth/10),y+pixelHeight-Math.round(pixelHeight/10));
	gradient.addColorStop(0,"ghostwhite");
	gradient.addColorStop(1,"grey");
	tileContext.fillStyle = gradient;
	tileContext.fillRect(x+Math.round(pixelWidth/10),y+Math.round(pixelHeight/10),Math.round(4*pixelWidth/5),Math.round(4*pixelHeight/5));
	return;	
}

function drawNumberTile(i,j,number)
{
	var x = i*pixelWidth;
	var y = j*pixelHeight;
	numberContext.strokeStyle = "grey";
	numberContext.strokeRect(x,y,pixelWidth,pixelHeight);
	numberContext.fillStyle = "rgb(210,210,195)";
	numberContext.fillRect(x,y,pixelWidth,pixelHeight);
	if (number == -1)
	{
		numberContext.fillStyle = "black";
		numberContext.beginPath();
		numberContext.arc(x+pixelWidth/2,y+pixelHeight/2,Math.floor(pixelWidth/4),0,2*Math.PI);
		numberContext.closePath();
		numberContext.fill();
		numberContext.beginPath();
		x += pixelWidth/2;
		y += pixelHeight/2;
		numberContext.moveTo(x,y+Math.round(pixelHeight/8));
		numberContext.lineTo(x+Math.round(3*pixelWidth/8),y+Math.round(3*pixelHeight/8));
		numberContext.lineTo(x+Math.round(pixelWidth/8),y);
		numberContext.lineTo(x,y+Math.round(pixelHeight/8));
		numberContext.closePath();
		numberContext.fill();
		numberContext.beginPath();
		numberContext.moveTo(x,y-Math.round(pixelHeight/8));
		numberContext.lineTo(x+Math.round(3*pixelWidth/8),y-Math.round(3*pixelHeight/8));
		numberContext.lineTo(x+Math.round(pixelWidth/8),y);
		numberContext.lineTo(x,y-Math.round(pixelHeight/8));
		numberContext.closePath();
		numberContext.fill();
		numberContext.beginPath();
		numberContext.moveTo(x,y+Math.round(pixelHeight/8));
		numberContext.lineTo(x-Math.round(3*pixelWidth/8),y+Math.round(3*pixelHeight/8));
		numberContext.lineTo(x-Math.round(pixelWidth/8),y);
		numberContext.lineTo(x,y+Math.round(pixelHeight/8));
		numberContext.closePath();
		numberContext.fill();
		numberContext.beginPath();
		numberContext.moveTo(x,y-Math.round(pixelHeight/8));
		numberContext.lineTo(x-Math.round(3*pixelWidth/8),y-Math.round(3*pixelHeight/8));
		numberContext.lineTo(x-Math.round(pixelWidth/8),y);
		numberContext.lineTo(x,y-Math.round(pixelHeight/8));
		numberContext.closePath();
		numberContext.fill();
		numberContext.beginPath();
		numberContext.moveTo(x+Math.round(pixelWidth/8),y);
		numberContext.lineTo(x,y+Math.round(3*pixelHeight/8));
		numberContext.lineTo(x-Math.round(pixelWidth/8),y);
		numberContext.lineTo(x+Math.round(pixelWidth/8),y);
		numberContext.closePath();
		numberContext.fill();
		numberContext.beginPath();
		numberContext.moveTo(x+Math.round(pixelWidth/8),y);
		numberContext.lineTo(x,y-Math.round(3*pixelHeight/8));
		numberContext.lineTo(x-Math.round(pixelWidth/8),y);
		numberContext.lineTo(x+Math.round(pixelWidth/8),y);
		numberContext.closePath();
		numberContext.fill();
		numberContext.beginPath();
		numberContext.moveTo(x,y+Math.round(pixelWidth/8));
		numberContext.lineTo(x+Math.round(3*pixelHeight/8),y);
		numberContext.lineTo(x,y-Math.round(pixelWidth/8));
		numberContext.lineTo(x,y+Math.round(pixelWidth/8));
		numberContext.closePath();
		numberContext.fill();
		numberContext.beginPath();
		numberContext.moveTo(x,y+Math.round(pixelWidth/8));
		numberContext.lineTo(x-Math.round(3*pixelHeight/8),y);
		numberContext.lineTo(x,y-Math.round(pixelWidth/8));
		numberContext.lineTo(x,y+Math.round(pixelWidth/8));
		numberContext.closePath();
		numberContext.fill();
		return;
	}
	if (number == 0) {return;}
	numberContext.font = "bold " + pixelHeight + "px Arial";
	switch (number)
	{
		case 1:
			numberContext.fillStyle = "blue";
			break;
		case 2:
			numberContext.fillStyle = "green";
			break;
		case 3:
			numberContext.fillStyle = "red";
			break;
		case 4:
			numberContext.fillStyle = "purple";
			break;
		case 5:
			numberContext.fillStyle = "orangered";
			break;
		case 6:
			numberContext.fillStyle = "teal";
			break;
		case 7:
			numberContext.fillStyle = "magenta";
			break;
		case 8:
			numberContext.fillStyle = "black";
			break;
	}
	x += 0.25*pixelWidth;
	y += 0.875*pixelHeight;
	x = Math.round(x);
	y = Math.round(y);
	numberContext.fillText(number,x,y,pixelWidth);
	return;
}

function renderNumbers()
{
	for (var i = 0; i < grid.length; i++)
	{
		for (var j = 0; j < grid[i].length; j++)
		{
			drawNumberTile(i,j,grid[i][j]);
		}
	}
	return;
}

function renderTiles()
{
	for (var i = 0; i < grid.length; i++)
	{
		for (var j = 0; j < grid[i].length; j++)
		{
			if (tileGrid[i][j]) {
				if (gameOver && !playerIsVictorious) {
					if (grid[i][j] === -1) {
						continue;
					} else {
						drawTile(i,j);
					}
				} else {
					drawTile(i,j);
				}
			}
		}
	}
}

function clearCell(i,j)
{
	if (tileGrid[i][j] === 0) return;
	tileGrid[i][j] = 0;
	var x = i*pixelWidth;
	var y = j*pixelHeight;
	tileContext.clearRect(x,y,pixelWidth,pixelHeight);
	if (flagGrid[i][j]) {
		numberOfFlagsLeft++;
		flagContext.clearRect(x,y,pixelWidth,pixelHeight);
		flagGrid[i][j] = 0;
		drawScoreboard();
	}
	if (grid[i][j] == 0)
	{
		if (i+1 < grid.length)
		{
			if (j+1 < grid[i+1].length)
			{
				clearCell(i+1,j+1);
			}
			clearCell(i+1,j);
			if (j-1 >= 0)
			{
				clearCell(i+1,j-1);
			}
		}
		if (j+1 < grid[i].length)
		{
			clearCell(i,j+1);
		}
		clearCell(i,j);
		if (j-1 >= 0)
		{
			clearCell(i,j-1);
		}
		if (i-1 >= 0)
		{
			if (j+1 < grid[i-1].length)
			{
				clearCell(i-1,j+1);
			}
			clearCell(i-1,j);
			if (j-1 >= 0)
			{
				clearCell(i-1,j-1);
			}
		}
	}
	return;
}

function gameOverSequence()
{
	gameOver = 1;
	if (isMyTimerRunning) {
		clearInterval(myTimer);
	}
	//smileyCanvas.width = smileyWidth;
	//smileyCanvas.height = smileyHeight;
	smileyContext.clearRect(0,0,30,30);
	smileyContext.drawImage(smiley2,0,0);
	var x, y;
	for (var i = 0; i < grid.length; i++)
	{
		for (var j = 0; j < grid[i].length; j++)
		{
			if (grid[i][j] == -1)
			{
				x = i*pixelWidth;
				y = j*pixelHeight;
				tileContext.clearRect(x,y,pixelWidth,pixelHeight);
			}
		}
	}
	return;
}

function drawAllFlags() {
	for (var i = 0; i < flagGrid.length; i++) {
		for (var j = 0; j < flagGrid[i].length; j++) {
			if (flagGrid[i][j]) {
				if (playerIsVictorious) {
					drawGreenFlag(i,j);
				} else {
					if (!gameOver) {
						drawRedFlag(i,j);
					}
				}
			}
		}
	}
}

function drawGreenFlag(i,j)
{
	var x = i*pixelWidth + Math.round(pixelWidth/2);
	var y = j*pixelHeight;
	flagContext.fillStyle = "black";
	flagContext.fillRect(x - Math.round(pixelWidth/20), y + Math.round(pixelHeight/8), Math.round(pixelWidth/10), Math.round(3*pixelHeight/4));
	flagContext.fillStyle = "green";
	flagContext.beginPath();
	flagContext.moveTo(x,y+Math.round(pixelHeight/8));
	flagContext.lineTo(x-Math.round(pixelWidth/3),y+Math.round(2.5*pixelHeight/8));
	flagContext.lineTo(x,y+Math.round(pixelHeight/2));
	flagContext.lineTo(x,y+Math.round(pixelHeight/8));
	flagContext.closePath();
	flagContext.fill();
	flagContext.fillStyle = "black";
	flagContext.fillRect(x-Math.round(pixelWidth/3),y+Math.round(3*pixelHeight/4),Math.round(2*pixelWidth/3),Math.round(pixelHeight/8));
	return;	
}

function drawRedFlag(i,j) {
	var x = i*pixelWidth + Math.round(pixelWidth/2);
	var y = j*pixelHeight;
	flagContext.fillStyle = "black";
	flagContext.fillRect(x - Math.round(pixelWidth/20), y + Math.round(pixelHeight/8), Math.round(pixelWidth/10), Math.round(3*pixelHeight/4));
	flagContext.fillStyle = "red";
	flagContext.beginPath();
	flagContext.moveTo(x,y+Math.round(pixelHeight/8));
	flagContext.lineTo(x-Math.round(pixelWidth/3),y+Math.round(2.5*pixelHeight/8));
	flagContext.lineTo(x,y+Math.round(pixelHeight/2));
	flagContext.lineTo(x,y+Math.round(pixelHeight/8));
	flagContext.closePath();
	flagContext.fill();
	flagContext.fillStyle = "black";
	flagContext.fillRect(x-Math.round(pixelWidth/3),y+Math.round(3*pixelHeight/4),Math.round(2*pixelWidth/3),Math.round(pixelHeight/8));
	return;	
}

function shiftClick(x,y)
{
	var scale = 400./numberCanvas.width;
	var i = Math.floor(x*scale/pixelWidth);
	var j = Math.floor(y*scale/pixelHeight);
	if (flagGrid[i][j] == 1)
	{
		flagContext.clearRect(i*pixelWidth,j*pixelHeight,pixelWidth,pixelHeight);
		flagGrid[i][j] = 0;
		numberOfFlagsLeft++;
		drawScoreboard();
		return;
	}
	if (tileGrid[i][j] == 0)
	{
		return;
	}
	var x1 = i*pixelWidth + Math.round(pixelWidth/2);
	var y1 = j*pixelHeight;
	flagContext.fillStyle = "black";
	flagContext.fillRect(x1 - Math.round(pixelWidth/20), y1 + Math.round(pixelHeight/8), Math.round(pixelWidth/10), Math.round(3*pixelHeight/4));
	flagContext.fillStyle = "red";
	flagContext.beginPath();
	flagContext.moveTo(x1,y1+Math.round(pixelHeight/8));
	flagContext.lineTo(x1-Math.round(pixelWidth/3),y1+Math.round(2.5*pixelHeight/8));
	flagContext.lineTo(x1,y1+Math.round(pixelHeight/2));
	flagContext.lineTo(x1,y1+Math.round(pixelHeight/8));
	flagContext.closePath();
	flagContext.fill();
	flagContext.fillStyle = "black";
	flagContext.fillRect(x1-Math.round(pixelWidth/3),y1+Math.round(3*pixelHeight/4),Math.round(2*pixelWidth/3),Math.round(pixelHeight/8));
	flagGrid[i][j] = 1;
	numberOfFlagsLeft--;
	drawScoreboard();	
}

function checkForVictory()
{
	var counter = 0;
	for (var i = 0; i < tileGrid.length; i++)
	{
		for (var j = 0; j < tileGrid[i].length; j++)
		{
			if (tileGrid[i][j]) {counter++;}
		}
	}
	if (counter == numberOfBombs) {return 1;}
	return 0;
}

function victorySequence()
{
	playerIsVictorious = 1;
	for (var i = 0; i < tileGrid.length; i++)
	{
		for (var j = 0; j < tileGrid[i].length; j++)
		{
			if (!flagGrid[i][j])
			{
				shiftClick(i*pixelWidth,j*pixelHeight);
			}
		}
	}
	for (var i = 0; i < flagGrid.length; i++)
	{
		for (var j = 0; j < flagGrid[i].length; j++)
		{
			if (flagGrid[i][j])
			{
				flagContext.clearRect(i*pixelWidth,j*pixelHeight,pixelWidth,pixelHeight);
				drawGreenFlag(i,j);
			}
		}
	}
	gameOver = 1;
	if (isMyTimerRunning) {
		clearInterval(myTimer);
		isMyTimerRunning = 0;
	}
	//var im = new Image(canvasWidth,canvasHeight);
	//im.src = flagCanvas.toDataURL("image/png");
	//im.onload = function() { alert("You win!"); }
	return;
}

function unshiftClick(x,y)
{
	var scale = 400./numberCanvas.width;
	var i = Math.floor(x*scale/pixelWidth);
	var j = Math.floor(y*scale/pixelHeight);
	clearCell(i,j);
	if (flagGrid[i][j])
	{
		flagGrid[i][j] = 0;
		numberOfFlagsLeft++;
		drawScoreboard();
	}
	if (grid[i][j] == -1)
	{
		flagContext.clearRect(0,0,canvasWidth,canvasHeight);
		flagContext.fillStyle = "rgba(255,0,0,0.5)";
		flagContext.fillRect(i*pixelWidth,j*pixelHeight,pixelWidth,pixelHeight);
		gameOverSequence();
	}
	if (checkForVictory())
	{
		victorySequence();
	}
}

function clickStuff(e)
{
	var rect = tileCanvas.getBoundingClientRect();
	horizontalOffset = rect.left;
	verticalOffset = rect.top;
	var backgroundRect = backgroundCanvas.getBoundingClientRect();
	if (e.clientX < backgroundRect.left || e.clientX > backgroundRect.right || e.clientY < backgroundRect.top || e.clientY > backgroundRect.bottom)	{return;}
	var smileyRect = smileyCanvas.getBoundingClientRect();
	if (e.clientX >= smileyRect.left && e.clientX <= smileyRect.right && e.clientY >= smileyRect.top && e.clientY <= smileyRect.bottom)
	{
		gameOver = 0;
		if (isMyTimerRunning) {
			clearInterval(myTimer);
			isMyTimerRunning = 0;
		}
		//flagCanvas.width = canvasWidth;
		//flagCanvas.height = canvasHeight;
		flagContext.clearRect(0,0,400,400);
		play();
		return;
	}
	if (gameOver) {return;}
	var rightClick = (e.which === 3 || e.button === 2);
	if (!e.shiftKey && !rightClick)
	{
		unshiftClick(e.clientX-horizontalOffset,e.clientY-verticalOffset);		
	} else {
		shiftClick(e.clientX-horizontalOffset,e.clientY-verticalOffset);
	}
	return;
}

function play()
{
	if (/Android|iPhone|iPad|iPod|webOS|Blackberry|IEMobile|Opera Mini/i.test(navigator.userAgent)) isMobile = 1; 
	playerIsVictorious = 0;
	if (!imagesLoaded)
	{
		hiddenContext.fillStyle = "black";
		hiddenContext.fillRect(0,0,406,460);
		drawNumber(0);
	} else {
		secondsCounter = 0;
		if (!isMyTimerRunning) {
			myTimer = setInterval(function() {
				drawClock();
				secondsCounter++;
			},1000);
			isMyTimerRunning = 1;
		}
		numberOfFlagsLeft = numberOfBombs;
		smileyContext.clearRect(0,0,smileyWidth,smileyHeight);
		smileyContext.drawImage(smiley1,0,0);
		lastSmiley = 0;
		createGrid();
		createBombs();
		fillNumbers();
		renderNumbers();
		renderTiles();
		if (isFirstCallToPlay) {
			rescaleAllCanvases();
			isFirstCallToPlay = false;
		}
	}
}

export class Minesweeper extends React.Component {
    componentDidMount() {
		startGlobalLoadingIndicator();
        scrollPreventCanvas = document.getElementById("scrollPreventCanvas");
        numberCanvas = document.getElementById("nmbrCanvas");
        tileCanvas = document.getElementById("tlCanvas");
        flagCanvas = document.getElementById("flgCanvas");
        backgroundCanvas = document.getElementById("bkgrndCanvas");
        timerCanvas = document.getElementById("tmrCanvas");
        clockCanvas = document.getElementById("clkCanvas");
        scoreCanvas = document.getElementById("scrCanvas");
        smileyCanvas = document.getElementById("smlyCanvas");
        imageCanvas = document.getElementById("imgCanvas");
        hiddenCanvas = document.getElementById("hdnCanvas")
        numberContext = numberCanvas.getContext("2d");
        tileContext = tileCanvas.getContext("2d");
        flagContext = flagCanvas.getContext("2d");
        backgroundContext = backgroundCanvas.getContext("2d");
        timerContext = timerCanvas.getContext("2d");
        clockContext = clockCanvas.getContext("2d");
        scoreContext = scoreCanvas.getContext("2d");
        smileyContext = smileyCanvas.getContext("2d");
        imageContext = imageCanvas.getContext("2d");
		hiddenContext = hiddenCanvas.getContext("2d");
		document.documentElement.style.overflow = "hidden";
		document.body.scroll = "no";

        play();
    }

    render() {
        return (
            <div>
            <canvas id="scrollPreventCanvas" width="400" height="400" style={{position: "absolute", left: "3", top: "56", zIndex: 0, border: "0px solid grey"}} />
            <canvas id="nmbrCanvas" width="400" height="400" style={{position: "absolute", left: "3", top: "56", zIndex: 2, border: "1px solid grey"}} />
            <canvas id="tlCanvas" width="400" height="400" style={{position: "absolute", left: "3", top: "56", zIndex: 3, border: "1px solid grey"}} />
            <canvas id="flgCanvas" width="400" height="400" style={{position: "absolute", left: "3", top: "56", zIndex: 4, border: "1px solid grey"}} />
            <canvas id="bkgrndCanvas" width="406" height="459" style={{position: "absolute", left: "0", top: "0", zIndex: 1, border: "1px solid grey"}} />
            <canvas id="tmrCanvas" width="400" height="50" style={{position: "absolute", left: "3", top: "3", zIndex: 2, border: "1px solid grey"}} />
            <canvas id="clkCanvas" width="75" height="37" style={{position: "absolute", left: "303", top: "10", zIndex: 3, border: "1px solid grey"}} />
            <canvas id="scrCanvas" width="75" height="37" style={{position: "absolute", left: "28", top: "10", zIndex: 3, border: "1px solid grey"}} />
            <canvas id="smlyCanvas" width="30" height="30" style={{position: "absolute", left: "188", top: "13", zIndex: 3, border: "2px solid grey"}} />
            <canvas id="imgCanvas" width="25" height="37" style={{position: "absolute", top: "30", left: "100", zIndex: 1, border: "0px solid black"}} />
            <canvas id="hdnCanvas" width="406" height="460" style={{position: "absolute", left: "0", top: "0", zIndex: 5, border: "0px solid black"}} />
            </div>
        );
    }
}

export {Minesweeper as default};