import * as React from "react";
import audioURL from "../Eight-Ball Pool/audio.mp3";
import explosionURL from "./explosion.mp3";

var scrollPreventCanvas, myCanvas, ballCanvas, tableCanvas, cueCanvas, cursorCanvas, imageCanvas, floorCanvas, explodingCanvas, livesCanvas;

var context, ballContext, tableContext, cueContext, cursorContext, imageContext, floorContext, explodingContext, livesContext;

var alpha = 45 * Math.PI/180;
var explosiveImages = new Array(22);
var explosiveTimer = new Array(16);
var explosiveTimerIsRunning = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var explosiveIndex = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
var r = 10; 
var h = Math.sqrt(3)*r;
var ys = [180,180,180+2*r,180+4*r,180-2*r,180-4*r,180+3*r,180+r,180-r,180-3*r,180+2*r,180,180-2*r,180+r,180-r,180];
var xs = [575,65,65,65,65,65,65+h,65+h,65+h,65+h,65+2*h,65+2*h,65+2*h,65+3*h,65+3*h,65+4*h];
var Vxs = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //10*Math.cos(theta)
var Vys = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //10*Math.sin(theta)
var myTimer;
var isBallOnTable = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
var c1 = "black", c3 = "teal", c2 = "orange";
var colors = ["white",c3,c2,c1,c2,c1,c3,c2,c2,c3,c1,c2,c1,c3,c3,c1];
var cueImage = new Image(370,15);
var distanceFromCueToBall = 20;
var cueTimer, phi, strengthOfHit;
var fric = 0.002;
var cueIsStriking = 0;
var ballImages = new Array(16);
var audioContext, audioBuffer, explosionBuffer, audioVolume, lastAudioSource;
var ballTimer = new Array(16);
var opacity = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var numberOfLives = 5;
var cueTimerIsRunning = 0, myTimerIsRunning = 0, ballTimerIsRunning = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var glowImage = new Image(20,20);
var areImagesLoaded = 0, isCollisionAudioLoaded = 0, isCollisionAudioLoading = 0, isExplosionAudioLoaded = 0, isExplosionAudioLoading = 0, isIOS = 0, isMobile = 0;

function centerCanvas(canvas) {
	// calibrate the origin
	canvas.style.left = "0px";
	canvas.style.top = "0px";
	var rect = canvas.getBoundingClientRect();
	var x0 = rect.left, y0 = rect.top;
	var x1 = (window.innerWidth - canvas.width)/2.;
	x1 -= x0;
	canvas.style.left = x1 + "px";
	var y1 = (window.innerHeight - canvas.height)/2.;
	y1 -= y0;
	canvas.style.left = x1 + "px";
	canvas.style.top = y1 + "px";
}

function centerAllCanvases() {
	centerCanvas(scrollPreventCanvas);
	centerCanvas(myCanvas);
	centerCanvas(ballCanvas);
	centerCanvas(tableCanvas);
	centerCanvas(cueCanvas);
	centerCanvas(cursorCanvas);
	centerCanvas(imageCanvas);
	centerCanvas(floorCanvas);
	centerCanvas(explodingCanvas);
	centerCanvas(livesCanvas);
}

function rescaleCanvases() {
	window.scrollTo(0,0);
	scrollPreventCanvas.style.left = "0px";
	scrollPreventCanvas.style.top = "0px";
	scrollPreventCanvas.width = window.innerWidth;
	scrollPreventCanvas.height = window.innerHeight;
	floorCanvas.style.left = "0px";
	floorCanvas.style.top = "0px";
	cursorCanvas.style.left = "0px";
	cursorCanvas.style.top = "0px";
	livesCanvas.style.left = "0px";
	livesCanvas.style.top = "0px";
	var rect = floorCanvas.getBoundingClientRect();
	var x0 = rect.left;
	var neededWidth = window.innerWidth;
	var y0 = rect.top;
	var neededHeight = window.innerHeight;
	var scaleX = neededWidth/800.;
	var scaleY = neededHeight/520.;
	var scale = (scaleX < scaleY ? scaleX : scaleY);
	if (scale >= 1) {
		scale = 1;
	}
	tableCanvas.width = Math.round(700.*scale);
	tableCanvas.height = Math.round(420.*scale);
	var offsetY = Math.round(scale*50.);
	tableCanvas.style.top = offsetY + "px";
	var offsetX = Math.round(scale*50.);
	tableCanvas.style.left = offsetX + "px";
	tableContext.scale(scale,scale);
	myCanvas.width = Math.round(640.*scale);
	myCanvas.height = Math.round(360.*scale);
	offsetY = Math.round(scale*80.);
	myCanvas.style.top = offsetY + "px";
	offsetX = Math.round(scale*80.);
	myCanvas.style.left = offsetX + "px";
	context.scale(scale,scale);
	ballCanvas.width = Math.round(640.*scale);
	ballCanvas.height = Math.round(360.*scale);
	offsetY = Math.round(scale*80.);
	ballCanvas.style.top = offsetY + "px";
	offsetX = Math.round(scale*80.);
	ballCanvas.style.left = offsetX + "px";
	ballContext.scale(scale,scale);
	cueCanvas.width = Math.round(370.*scale);
	cueCanvas.height = Math.round(15.*scale);
	offsetY = Math.round(scale*50.);
	cueCanvas.style.top = offsetY + "px";
	offsetX = Math.round(scale*50.);
	cueCanvas.style.left = offsetX + "px";
	cueContext.scale(scale,scale);
	cursorCanvas.width = Math.round(800.*scale);
	cursorCanvas.height = Math.round(520.*scale);
	cursorContext.scale(scale,scale);
	imageCanvas.width = Math.round(20.*scale);
	imageCanvas.height = Math.round(20.*scale);
	offsetY = Math.round(scale*50.);
	imageCanvas.style.top = offsetY + "px";
	offsetX = Math.round(scale*50.);
	imageCanvas.style.left = offsetX + "px";
	imageContext.scale(scale,scale);
	floorCanvas.width = Math.round(800.*scale);
	floorCanvas.height = Math.round(520.*scale);
	floorContext.scale(scale,scale);
	explodingCanvas.width = Math.round(640.*scale);
	explodingCanvas.height = Math.round(360.*scale);
	offsetY = Math.round(scale*80.);
	explodingCanvas.style.top = offsetY + "px";
	offsetX = Math.round(scale*80.);
	explodingCanvas.style.left = offsetX + "px";
	explodingContext.scale(scale,scale);
	livesCanvas.width = Math.round(800.*scale);
	livesCanvas.height = Math.round(520.*scale);
	livesContext.scale(scale,scale);
	if (isMobile) {
		setTimeout(function() { 
			window.scrollTo(0,y0);
			centerAllCanvases();
		},500);
	} else {
		window.scrollTo(0,y0);
		centerAllCanvases();
	}
	paintFloorCanvas();
	drawLives();
	drawTable();
	drawBall();
	if (!areBallsInMotion()) {
		drawCue();
	}
}

function smoke7() {
	imageCanvas.width = imageCanvas.width;
	imageContext.strokeStyle = "lightgrey"
	imageContext.fillStyle = "lightgrey";      
	imageContext.beginPath();
	imageContext.moveTo(75,30);
	//imageContext.lineTo(65,40);
	imageContext.bezierCurveTo(90,20,90,20,85,10);
	imageContext.bezierCurveTo(85,25,85,25,75,30);
	imageContext.closePath();
	imageContext.stroke();
	imageContext.fill();
	imageContext.beginPath();
	imageContext.moveTo(30,95);
	//imageContext.lineTo(50,75);
	imageContext.bezierCurveTo(40,98,40,98,50,95);
	imageContext.bezierCurveTo(40,95,40,95,30,95);
	imageContext.closePath();
	imageContext.stroke();
	imageContext.fill();
	explosiveImages[21] = new Image(100,100);
	explosiveImages[21].src = imageCanvas.toDataURL("image/png");
	explosiveImages[21].onload = function() {
		drawLives();
		rescaleCanvases();
		cursorCanvas.addEventListener("mousemove", mouseMotionDetector);
		cursorCanvas.addEventListener("mousedown", mouseDown);
		cursorCanvas.addEventListener("mouseup", mouseUp);
		cursorCanvas.addEventListener("touchmove", mouseMotionDetector);
		cursorCanvas.addEventListener("touchstart", mouseDown);
		cursorCanvas.addEventListener("touchend", mouseUp);
		scrollPreventCanvas.addEventListener("touchmove",function(evt) {
			evt.preventDefault();
		});
		window.addEventListener("resize",rescaleCanvases);
		myTimer = setInterval(moveBall,1);
		myTimerIsRunning = 1;
		areImagesLoaded = 1;
	};
}

function smoke6() {
	imageCanvas.width = imageCanvas.width;
	imageContext.strokeStyle = "lightgrey"
	imageContext.fillStyle = "lightgrey";      
	imageContext.beginPath();
	imageContext.moveTo(75,50);
	//imageContext.lineTo(45,40);
	imageContext.bezierCurveTo(90,20,90,20,65,30);
	imageContext.bezierCurveTo(85,25,85,25,75,50);
	imageContext.closePath();
	imageContext.stroke();
	imageContext.fill();
	imageContext.beginPath();
	imageContext.moveTo(10,45);
	//imageContext.lineTo(25,65);
	imageContext.bezierCurveTo(1,44,1,44,5,45);
	imageContext.bezierCurveTo(8,46,8,46,10,45);
	imageContext.closePath();
	imageContext.stroke();
	imageContext.fill();
	imageContext.beginPath();
	imageContext.moveTo(30,85);
	//imageContext.lineTo(50,75);
	imageContext.bezierCurveTo(40,98,40,98,50,85);
	imageContext.bezierCurveTo(40,95,40,95,30,85);
	imageContext.closePath();
	imageContext.stroke();
	imageContext.fill();
	explosiveImages[20] = new Image(100,100);
	explosiveImages[20].src = imageCanvas.toDataURL("image/png");
	explosiveImages[20].onload = smoke7;
}

function smoke5() {
	imageCanvas.width = imageCanvas.width;
	imageContext.strokeStyle = "lightgrey"
	imageContext.fillStyle = "lightgrey";      
	imageContext.beginPath();
	imageContext.moveTo(55,60);
	//imageContext.lineTo(45,40);
	imageContext.bezierCurveTo(90,20,90,20,45,40);
	imageContext.bezierCurveTo(85,25,85,25,55,60);
	imageContext.closePath();
	imageContext.stroke();
	imageContext.fill();
	imageContext.beginPath();
	imageContext.moveTo(30,45);
	//imageContext.lineTo(25,65);
	imageContext.bezierCurveTo(1,54,1,54,25,65);
	imageContext.bezierCurveTo(8,56,8,56,30,45);
	imageContext.closePath();
	imageContext.stroke();
	imageContext.fill();
	imageContext.beginPath();
	imageContext.moveTo(30,75);
	//imageContext.lineTo(50,75);
	imageContext.bezierCurveTo(40,98,40,98,50,75);
	imageContext.bezierCurveTo(40,95,40,95,30,75);
	imageContext.closePath();
	imageContext.stroke();
	imageContext.fill();
	explosiveImages[19] = new Image(100,100);
	explosiveImages[19].src = imageCanvas.toDataURL("image/png");
	explosiveImages[19].onload = smoke6;
}

function smoke4() {
	imageCanvas.width = imageCanvas.width;
	imageContext.strokeStyle = "lightgrey"
	imageContext.fillStyle = "lightgrey";      
	imageContext.beginPath();
	imageContext.moveTo(55,60);
	//imageContext.lineTo(45,40);
	imageContext.bezierCurveTo(90,20,90,20,45,40);
	imageContext.bezierCurveTo(80,30,80,30,55,60);
	imageContext.closePath();
	imageContext.stroke();
	imageContext.fill();
	imageContext.beginPath();
	imageContext.moveTo(30,45);
	//imageContext.lineTo(25,65);
	imageContext.bezierCurveTo(2,55,2,55,25,65);
	imageContext.bezierCurveTo(12,57,12,57,30,45);
	imageContext.closePath();
	imageContext.stroke();
	imageContext.fill();
	imageContext.beginPath();
	imageContext.moveTo(30,75);
	//imageContext.lineTo(50,75);
	imageContext.bezierCurveTo(40,97,40,97,50,75);
	imageContext.bezierCurveTo(40,90,40,90,30,75);
	imageContext.closePath();
	imageContext.stroke();
	imageContext.fill();
	explosiveImages[18] = new Image(100,100);
	explosiveImages[18].src = imageCanvas.toDataURL("image/png");
	explosiveImages[18].onload = smoke5;
}

function smoke3() {
	imageCanvas.width = imageCanvas.width;
	imageContext.strokeStyle = "lightgrey"
	imageContext.fillStyle = "lightgrey";      
	imageContext.beginPath();
	imageContext.moveTo(55,60);
	//imageContext.lineTo(45,40);
	imageContext.bezierCurveTo(80,30,80,30,45,40);
	imageContext.bezierCurveTo(60,40,60,40,55,60);
	imageContext.closePath();
	imageContext.stroke();
	imageContext.fill();
	imageContext.beginPath();
	imageContext.moveTo(30,45);
	//imageContext.lineTo(25,65);
	imageContext.bezierCurveTo(4,57,4,57,25,65);
	imageContext.bezierCurveTo(17,55,17,55,30,45);
	imageContext.closePath();
	imageContext.stroke();
	imageContext.fill();
	imageContext.beginPath();
	imageContext.moveTo(30,75);
	//imageContext.lineTo(50,75);
	imageContext.bezierCurveTo(40,95,40,95,50,75);
	imageContext.bezierCurveTo(40,80,40,80,30,75);
	imageContext.closePath();
	imageContext.stroke();
	imageContext.fill();
	explosiveImages[17] = new Image(100,100);
	explosiveImages[17].src = imageCanvas.toDataURL("image/png");
	explosiveImages[17].onload = smoke4;
}

function smoke2() {
	imageCanvas.width = imageCanvas.width;
	imageContext.strokeStyle = "lightgrey"
	imageContext.fillStyle = "lightgrey";      
	imageContext.beginPath();
	imageContext.moveTo(55,60);
	//imageContext.lineTo(45,40);
	imageContext.bezierCurveTo(70,40,70,40,45,40);
	imageContext.bezierCurveTo(60,48,60,48,55,60);
	imageContext.closePath();
	imageContext.stroke();
	imageContext.fill();
	imageContext.beginPath();
	imageContext.moveTo(30,45);
	//imageContext.lineTo(25,65);
	imageContext.bezierCurveTo(7,57,7,57,25,65);
	imageContext.bezierCurveTo(17,55,17,55,30,45);
	imageContext.closePath();
	imageContext.stroke();
	imageContext.fill();
	imageContext.beginPath();
	imageContext.moveTo(30,75);
	//imageContext.lineTo(50,75);
	imageContext.bezierCurveTo(40,90,40,90,50,75);
	imageContext.bezierCurveTo(40,80,40,80,30,75);
	imageContext.closePath();
	imageContext.stroke();
	imageContext.fill();
	explosiveImages[16] = new Image(100,100);
	explosiveImages[16].src = imageCanvas.toDataURL("image/png");
	explosiveImages[16].onload = smoke3;
}

function smoke1() {
	imageCanvas.width = imageCanvas.width;
	imageContext.strokeStyle = "lightgrey"
	imageContext.fillStyle = "lightgrey";      
	imageContext.beginPath();
	imageContext.moveTo(55,60);
	//imageContext.lineTo(45,40);
	imageContext.bezierCurveTo(60,48,60,48,45,40);
	imageContext.bezierCurveTo(55,50,55,50,55,60);
	imageContext.closePath();
	imageContext.stroke();
	imageContext.fill();
	imageContext.beginPath();
	imageContext.moveTo(30,45);
	//imageContext.lineTo(25,65);
	imageContext.bezierCurveTo(17,55,17,55,25,65);
	imageContext.bezierCurveTo(22,55,22,55,30,45);
	imageContext.closePath();
	imageContext.stroke();
	imageContext.fill();
	imageContext.beginPath();
	imageContext.moveTo(30,75);
	//imageContext.lineTo(50,75);
	imageContext.bezierCurveTo(40,85,40,85,50,75);
	imageContext.bezierCurveTo(40,80,40,80,30,75);
	imageContext.closePath();
	imageContext.stroke();
	imageContext.fill();
	explosiveImages[15] = new Image(100,100);
	explosiveImages[15].src = imageCanvas.toDataURL("image/png");
	explosiveImages[15].onload = smoke2;
}

function drawRing14() {
	imageCanvas.width = imageCanvas.width;
	imageContext.fillStyle = "lightgrey";
	imageContext.beginPath();
	imageContext.moveTo(50,50);
	imageContext.arc(50,50,32,0,2*Math.PI);
	imageContext.closePath();
	imageContext.fill();
	explosiveImages[14] = new Image(100,100);
	explosiveImages[14].src = imageCanvas.toDataURL("image/png");
	explosiveImages[14].onload = smoke1;
}

function drawRing13() {
	imageCanvas.width = imageCanvas.width;
	imageContext.fillStyle = "lightgrey";
	imageContext.beginPath();
	imageContext.moveTo(50,50);
	imageContext.arc(50,50,16,0,2*Math.PI);
	imageContext.closePath();
	imageContext.fill();
	explosiveImages[13] = new Image(100,100);
	explosiveImages[13].src = imageCanvas.toDataURL("image/png");
	explosiveImages[13].onload = drawRing14;
}

function drawRing12() {
	imageCanvas.width = imageCanvas.width;
	imageContext.fillStyle = "lightgrey";
	imageContext.beginPath();
	imageContext.moveTo(50,50);
	imageContext.arc(50,50,8,0,2*Math.PI);
	imageContext.closePath();
	imageContext.fill();
	explosiveImages[12] = new Image(100,100);
	explosiveImages[12].src = imageCanvas.toDataURL("image/png");
	explosiveImages[12].onload = drawRing13;
}

function drawRing11() {
	imageCanvas.width = imageCanvas.width;
	imageContext.fillStyle = "lightgrey";
	imageContext.beginPath();
	imageContext.moveTo(50,50);
	imageContext.arc(50,50,4,0,2*Math.PI);
	imageContext.closePath();
	imageContext.fill();
	explosiveImages[11] = new Image(100,100);
	explosiveImages[11].src = imageCanvas.toDataURL("image/png");
	explosiveImages[11].onload = drawRing12;
}

function drawRing10() {
	imageCanvas.width = imageCanvas.width;
	imageContext.fillStyle = "lightgrey";
	imageContext.beginPath();
	imageContext.moveTo(50,50);
	imageContext.arc(50,50,2,0,2*Math.PI);
	imageContext.closePath();
	imageContext.fill();
	explosiveImages[10] = new Image(100,100);
	explosiveImages[10].src = imageCanvas.toDataURL("image/png");
	explosiveImages[10].onload = drawRing11;
}

function drawRing9() {
	imageCanvas.width = imageCanvas.width;
	imageContext.fillStyle = "orange";
	imageContext.beginPath();
	imageContext.moveTo(50,50);
	imageContext.arc(50,50,10,0,2*Math.PI);
	imageContext.closePath();
	imageContext.fill();
	imageContext.fillStyle = "orange";
	imageContext.strokeStyle = "orange";
	imageContext.beginPath();
	imageContext.moveTo(55,50);
	imageContext.lineTo(50+50*Math.cos(alpha),50-50*Math.sin(alpha));
	imageContext.lineTo(50,45);
	imageContext.closePath();
	imageContext.stroke();
	imageContext.fill();
	imageContext.moveTo(50,45);
	imageContext.lineTo(50-50*Math.cos(alpha),50-50*Math.sin(alpha));
	imageContext.lineTo(45,50);
	imageContext.closePath();
	imageContext.stroke();
	imageContext.fill();
	imageContext.moveTo(45,50);
	imageContext.lineTo(50-50*Math.cos(alpha),50+50*Math.sin(alpha));
	imageContext.lineTo(50,55);
	imageContext.closePath();
	imageContext.stroke();
	imageContext.fill();
	imageContext.moveTo(50,55);
	imageContext.lineTo(50+50*Math.cos(alpha),50+50*Math.sin(alpha));
	imageContext.lineTo(55,50);
	imageContext.closePath();
	imageContext.stroke();
	imageContext.fill();
	explosiveImages[9] = new Image(100,100);
	explosiveImages[9].src = imageCanvas.toDataURL("image/png");
	explosiveImages[9].onload = drawRing10;
}

function drawRing8() {
	imageCanvas.width = imageCanvas.width;
	imageContext.fillStyle = "orange";
	imageContext.beginPath();
	imageContext.moveTo(50,50);
	imageContext.arc(50,50,10,0,2*Math.PI);
	imageContext.closePath();
	imageContext.fill();
	imageContext.fillStyle = "orange";
	imageContext.strokeStyle = "orange";
	imageContext.beginPath();
	imageContext.moveTo(55,50);
	imageContext.lineTo(50+40*Math.cos(alpha),50-40*Math.sin(alpha));
	imageContext.lineTo(50,45);
	imageContext.closePath();
	imageContext.stroke();
	imageContext.fill();
	imageContext.moveTo(50,45);
	imageContext.lineTo(50-40*Math.cos(alpha),50-40*Math.sin(alpha));
	imageContext.lineTo(45,50);
	imageContext.closePath();
	imageContext.stroke();
	imageContext.fill();
	imageContext.moveTo(45,50);
	imageContext.lineTo(50-40*Math.cos(alpha),50+40*Math.sin(alpha));
	imageContext.lineTo(50,55);
	imageContext.closePath();
	imageContext.stroke();
	imageContext.fill();
	imageContext.moveTo(50,55);
	imageContext.lineTo(50+40*Math.cos(alpha),50+40*Math.sin(alpha));
	imageContext.lineTo(55,50);
	imageContext.closePath();
	imageContext.stroke();
	imageContext.fill();
	explosiveImages[8] = new Image(100,100);
	explosiveImages[8].src = imageCanvas.toDataURL("image/png");
	explosiveImages[8].onload = drawRing9;
}

function drawRing7() {
	imageCanvas.width = imageCanvas.width;
	imageContext.fillStyle = "orange";
	imageContext.beginPath();
	imageContext.moveTo(50,50);
	imageContext.arc(50,50,10,0,2*Math.PI);
	imageContext.closePath();
	imageContext.fill();
	imageContext.fillStyle = "orange";
	imageContext.strokeStyle = "orange";
	imageContext.beginPath();
	imageContext.moveTo(55,50);
	imageContext.lineTo(50+30*Math.cos(alpha),50-30*Math.sin(alpha));
	imageContext.lineTo(50,45);
	imageContext.closePath();
	imageContext.stroke();
	imageContext.fill();
	imageContext.moveTo(50,45);
	imageContext.lineTo(50-30*Math.cos(alpha),50-30*Math.sin(alpha));
	imageContext.lineTo(45,50);
	imageContext.closePath();
	imageContext.stroke();
	imageContext.fill();
	imageContext.moveTo(45,50);
	imageContext.lineTo(50-30*Math.cos(alpha),50+30*Math.sin(alpha));
	imageContext.lineTo(50,55);
	imageContext.closePath();
	imageContext.stroke();
	imageContext.fill();
	imageContext.moveTo(50,55);
	imageContext.lineTo(50+30*Math.cos(alpha),50+30*Math.sin(alpha));
	imageContext.lineTo(55,50);
	imageContext.closePath();
	imageContext.stroke();
	imageContext.fill();
	explosiveImages[7] = new Image(100,100);
	explosiveImages[7].src = imageCanvas.toDataURL("image/png");
	explosiveImages[7].onload = drawRing8;
}

function drawRing6() {
	imageCanvas.width = imageCanvas.width;
	imageContext.fillStyle = "orange";
	imageContext.beginPath();
	imageContext.moveTo(50,50);
	imageContext.arc(50,50,10,0,2*Math.PI);
	imageContext.closePath();
	imageContext.fill();
	imageContext.fillStyle = "orange";
	imageContext.strokeStyle = "orange";
	imageContext.beginPath();
	imageContext.moveTo(55,50);
	imageContext.lineTo(50+20*Math.cos(alpha),50-20*Math.sin(alpha));
	imageContext.lineTo(50,45);
	imageContext.closePath();
	imageContext.stroke();
	imageContext.fill();
	imageContext.moveTo(50,45);
	imageContext.lineTo(50-20*Math.cos(alpha),50-20*Math.sin(alpha));
	imageContext.lineTo(45,50);
	imageContext.closePath();
	imageContext.stroke();
	imageContext.fill();
	imageContext.moveTo(45,50);
	imageContext.lineTo(50-20*Math.cos(alpha),50+20*Math.sin(alpha));
	imageContext.lineTo(50,55);
	imageContext.closePath();
	imageContext.stroke();
	imageContext.fill();
	imageContext.moveTo(50,55);
	imageContext.lineTo(50+20*Math.cos(alpha),50+20*Math.sin(alpha));
	imageContext.lineTo(55,50);
	imageContext.closePath();
	imageContext.stroke();
	imageContext.fill();
	explosiveImages[6] = new Image(100,100);
	explosiveImages[6].src = imageCanvas.toDataURL("image/png");
	explosiveImages[6].onload = drawRing7;
}

function drawRing5() {
	imageCanvas.width = imageCanvas.width;
	imageContext.fillStyle = "rgba(255,165,0,0)";
	imageContext.beginPath();
	imageContext.moveTo(50,50);
	imageContext.arc(50,50,15,0,2*Math.PI);
	imageContext.closePath();
	imageContext.fill();
	explosiveImages[5] = new Image(100,100);
	explosiveImages[5].src = imageCanvas.toDataURL("image/png");
	explosiveImages[5].onload = drawRing6;
}

function drawRing4() {
	imageCanvas.width = imageCanvas.width;
	imageContext.fillStyle = "orange";
	imageContext.beginPath();
	imageContext.moveTo(50,50);
	imageContext.arc(50,50,12,0,2*Math.PI);
	imageContext.closePath();
	imageContext.fill();
	imageContext.fillStyle = "black";
	imageContext.beginPath();
	imageContext.moveTo(50,50);
	imageContext.arc(50,50,6,0,2*Math.PI);
	imageContext.closePath();
	imageContext.fill();
	explosiveImages[4] = new Image(100,100);
	explosiveImages[4].src = imageCanvas.toDataURL("image/png");
	explosiveImages[4].onload = drawRing5;
}

function drawRing3() {
	imageCanvas.width = imageCanvas.width;
	imageContext.fillStyle = "orange";
	imageContext.beginPath();
	imageContext.moveTo(50,50);
	imageContext.arc(50,50,14,0,2*Math.PI);
	imageContext.closePath();
	imageContext.fill();
	imageContext.fillStyle = "black";
	imageContext.beginPath();
	imageContext.moveTo(50,50);
	imageContext.arc(50,50,7,0,2*Math.PI);
	imageContext.closePath();
	imageContext.fill();
	explosiveImages[3] = new Image(100,100);
	explosiveImages[3].src = imageCanvas.toDataURL("image/png");
	explosiveImages[3].onload = drawRing4;
}

function drawRing2() {
	imageCanvas.width = imageCanvas.width;
	imageContext.fillStyle = "orange";
	imageContext.beginPath();
	imageContext.moveTo(50,50);
	imageContext.arc(50,50,16,0,2*Math.PI);
	imageContext.closePath();
	imageContext.fill();
	imageContext.fillStyle = "black";
	imageContext.beginPath();
	imageContext.moveTo(50,50);
	imageContext.arc(50,50,8,0,2*Math.PI);
	imageContext.closePath();
	imageContext.fill();
	explosiveImages[2] = new Image(100,100);
	explosiveImages[2].src = imageCanvas.toDataURL("image/png");
	explosiveImages[2].onload = drawRing3;
}


function drawRing1() {
	imageCanvas.width = imageCanvas.width;
	imageContext.fillStyle = "orange";
	imageContext.beginPath();
	imageContext.moveTo(50,50);
	imageContext.arc(50,50,18,0,2*Math.PI);
	imageContext.closePath();
	imageContext.fill();
	imageContext.fillStyle = "black";
	imageContext.beginPath();
	imageContext.moveTo(50,50);
	imageContext.arc(50,50,9,0,2*Math.PI);
	imageContext.closePath();
	imageContext.fill();
	explosiveImages[1] = new Image(100,100);
	explosiveImages[1].src = imageCanvas.toDataURL("image/png");
	explosiveImages[1].onload = drawRing2;
}

function drawRing0() {
	imageCanvas.width = 100;
	imageCanvas.height = 100;
	imageContext.fillStyle = "orange";
	imageContext.beginPath();
	imageContext.moveTo(50,50);
	imageContext.arc(50,50,20,0,2*Math.PI);
	imageContext.closePath();
	imageContext.fill();
	imageContext.fillStyle = "black";
	imageContext.beginPath();
	imageContext.moveTo(50,50);
	imageContext.arc(50,50,10,0,2*Math.PI);
	imageContext.closePath();
	imageContext.fill();
	explosiveImages[0] = new Image(100,100);
	explosiveImages[0].src = imageCanvas.toDataURL("image/png");
	explosiveImages[0].onload = drawRing1;
}

function drawGlowImage() {
	imageCanvas.width = imageCanvas.width;
	var grad = imageContext.createRadialGradient(Math.round(10-r/2),Math.round(10-r/2),0,Math.round(10-r/2),Math.round(10-r/2),(1+1/Math.sqrt(2))*r);
	grad.addColorStop(0,"white");
	grad.addColorStop(0.2,"red");
	grad.addColorStop(1,"black");
	imageContext.fillStyle = grad;
	imageContext.beginPath();
	imageContext.moveTo(10,10);
	imageContext.arc(10,10,r,0,2*Math.PI);
	imageContext.closePath();
	imageContext.fill();
	glowImage.src = imageCanvas.toDataURL("image/png");
	glowImage.onload = drawRing0;
}

function paintFloorCanvas() {
	var grad = floorContext.createLinearGradient(0,0,800,520);
	grad.addColorStop(1,"rgb(102,0,0)");
	grad.addColorStop(0,"rgb(150,0,0)");
	floorContext.fillStyle = grad;
	floorContext.fillRect(0,0,800,520);
}

function drawLives() {
	//livesCanvas.width = livesCanvas.width;
	livesContext.clearRect(0,0,800,520);
	for(var i = 0; i < numberOfLives; i++) {
		livesContext.drawImage(ballImages[0],Math.round(50+2.5*r*i),15);
	}
}

function loadAudio() {
	audioContext = new (window.AudioContext || window.webkitAudioContext)();
	audioVolume = audioContext.createGain();
	audioVolume.connect(audioContext.destination);
	if (!isCollisionAudioLoading) {
		isCollisionAudioLoading = 1;
		var request = new XMLHttpRequest();
		request.open('GET', audioURL, true);
		request.responseType = 'arraybuffer';
		request.onload = function() {
			audioContext.decodeAudioData(request.response, function(buffer) {
				audioBuffer = buffer;
				isCollisionAudioLoaded = 1;
			});
		};
		request.send();
	}
	if (!isExplosionAudioLoading) {
		isExplosionAudioLoading = 1;
		var request2 = new XMLHttpRequest();
		request2.open('GET', explosionURL, true);
		request2.responseType = 'arraybuffer';
		request2.onload = function() {
			audioContext.decodeAudioData(request2.response, function(buffer) {
				explosionBuffer = buffer;
				isExplosionAudioLoaded = 1;
			});
		};
		request2.send();
	}
}

function createBallImage(i) {
	imageCanvas.width = imageCanvas.width;
	if (i > 15) {
		drawGlowImage();
		return;
	}
	var grad = imageContext.createRadialGradient(Math.round(10-r/2),Math.round(10-r/2),0,Math.round(10-r/2),Math.round(10-r/2),(1+1/Math.sqrt(2))*r);
	grad.addColorStop(0,"white");
	grad.addColorStop(0.2,colors[i]);
	grad.addColorStop(1,"black");
	imageContext.fillStyle = grad;
	//ballContext.fillStyle = colors[i];
	imageContext.beginPath();
	imageContext.moveTo(10,10);
	imageContext.arc(10,10,r,0,2*Math.PI);
	imageContext.closePath();
	imageContext.fill();
	ballImages[i] = new Image(20,20);
	ballImages[i].src = imageCanvas.toDataURL("image/png");
	ballImages[i].onload = function() {
		createBallImage(i+1);
	}
}

function initializeGlobals() {
	ys = [180,180,180+2*r,180+4*r,180-2*r,180-4*r,180+3*r,180+r,180-r,180-3*r,180+2*r,180,180-2*r,180+r,180-r,180];
	xs = [575,65,65,65,65,65,65+h,65+h,65+h,65+h,65+2*h,65+2*h,65+2*h,65+3*h,65+3*h,65+4*h];
	Vxs = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //10*Math.cos(theta)
	Vys = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //10*Math.sin(theta)
	isBallOnTable = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
	opacity = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	numberOfLives = 5;
	cueTimerIsRunning = 0;
	myTimerIsRunning = 0;
	ballTimerIsRunning = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	explosiveIndex = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
}

function run() {
	if (/Android|iPhone|iPad|iPod|webOS|Blackberry|IEMobile|Opera Mini/i.test(navigator.userAgent)) isMobile = 1;
	if (/iPhone|iPad|iPod/i.test(navigator.userAgent) || true) {
		isIOS = 1;
	} else {
		loadAudio();
	}
	paintFloorCanvas();
	initializeGlobals();
	cursorContext.fillStyle = "black";
	cursorContext.fillRect(0,0,800,520);
	drawTable();
	if (!areImagesLoaded) {
		drawCueImage();
	} else {
		myTimer = setInterval(moveBall,1);
		myTimerIsRunning = 1;
		drawLives();
	}
}
	
function drawTable() {
	var scale = 3;
	tableContext.fillStyle = "rgb(0,70,0)";
	tableContext.fillRect(0,0,700,420);
	var grad = context.createRadialGradient(320/scale,180,0,320/scale,180,200);
	grad.addColorStop(0,"seagreen");
	grad.addColorStop(1,"rgb(0,70,0)");
	context.fillStyle = grad;
	context.save();
	context.transform(scale,0,0,1,0,0);
	context.fillRect(0,0,640/scale,360);
	context.restore();
	holes();
	grad = tableContext.createLinearGradient(0,0,30,0);
	grad.addColorStop(0,"rgb(128,66,0)");
	grad.addColorStop(1,"rgb(51,26,0)");
	tableContext.fillStyle = grad;
	tableContext.fillRect(0,0,30,420);
	grad = tableContext.createLinearGradient(0,390,0,420);
	grad.addColorStop(1,"rgb(128,66,0)");
	grad.addColorStop(0,"rgb(51,26,0)");
	tableContext.fillStyle = grad;
	tableContext.fillRect(0,390,700,420);
	grad = tableContext.createLinearGradient(700,210,670,210);
	grad.addColorStop(0,"rgb(128,66,0)");
	grad.addColorStop(1,"rgb(51,26,0)");
	tableContext.fillStyle = grad;
	tableContext.fillRect(670,0,30,420);
	grad = tableContext.createLinearGradient(30,0,30,30);
	grad.addColorStop(0,"rgb(128,66,0)");
	grad.addColorStop(1,"rgb(51,26,0)");
	tableContext.fillStyle = grad;
	tableContext.fillRect(0,0,700,30);
	var x1, x2, y1, y2;             //Create grain pattern in the wood top & bottom wood
	tableContext.fillStyle = "rgba(51,26,0,0.4)";
	for (var i = 0; i < 50; i++)
	{
		y1 = Math.floor(Math.random()*420);
		y2 = Math.floor(Math.random()*420);
		x1 = Math.floor(Math.random()*30);
		x2 = Math.floor(x1 + Math.random()*2 - 1);
		tableContext.beginPath();
		tableContext.moveTo(x1,y1);
		tableContext.bezierCurveTo(x2,Math.round((y1+y2)/2),x2,Math.round((y1+y2)/2),x1,y2);
		tableContext.lineTo(x1,y1);
		tableContext.closePath();
		tableContext.fill();
	}
	for (var i = 0; i < 50; i++)
	{
		y1 = Math.floor(Math.random()*420);
		y2 = Math.floor(Math.random()*420);
		x1 = Math.floor(Math.random()*30);
		x2 = Math.floor(x1 + Math.random()*2 - 1);
		tableContext.beginPath();
		tableContext.moveTo(x1+670,y1);
		tableContext.bezierCurveTo(x2+670,Math.round((y1+y2)/2),x2+670,Math.round((y1+y2)/2),x1+670,y2);
		tableContext.lineTo(x1+670,y1);
		tableContext.closePath();
		tableContext.fill();
	}
	grad = tableContext.createLinearGradient(30,0,30,30);
	grad.addColorStop(0,"rgba(102,51,0,0.4)");
	grad.addColorStop(1,"rgba(26,13,0,0.4)");
	tableContext.fillStyle = grad;
	//Create grain pattern in the left & right wood
	for (var i = 0; i < 15; i++)
	{
		x1 = Math.floor(Math.random()*700);
		x2 = Math.floor(Math.random()*700);
		y1 = Math.floor(Math.random()*30);
		y2 = Math.floor(y1 + Math.random()*8 - 4);
		tableContext.beginPath();
		tableContext.moveTo(x1,y1);
		tableContext.bezierCurveTo(Math.round((x1+x2)/2),y2,Math.round((x1+x2)/2),y2,x2,y1);
		tableContext.lineTo(x1,y1);
		tableContext.closePath();
		tableContext.fill();
	}
	grad = tableContext.createLinearGradient(0,390,0,420);
	grad.addColorStop(1,"rgba(102,51,0,0.4)");
	grad.addColorStop(0,"rgba(26,13,0,0.4)");
	tableContext.fillStyle = grad;
	for (var i = 0; i < 15; i++)
	{
		x1 = Math.floor(Math.random()*700);
		x2 = Math.floor(Math.random()*700);
		y1 = Math.floor(Math.random()*30);
		y2 = Math.floor(y1 + Math.random()*8 - 4);
		tableContext.beginPath();
		tableContext.moveTo(x1,y1+390);
		tableContext.bezierCurveTo(Math.round((x1+x2)/2),y2+390,Math.round((x1+x2)/2),y2+390,x2,y1+390);
		tableContext.lineTo(x1,y1+390);
		tableContext.closePath();
		tableContext.fill();
	}
	for (var i = 0; i < 3; i++) { 
		tableContext.fillStyle =  "white";  	//White dots
		var y = 405;
		var x = Math.round(69.5*i+121.5);
		tableContext.beginPath();
		tableContext.moveTo(x,y);
		tableContext.arc(x,y,3.5,0,2*Math.PI);
		tableContext.closePath();
		tableContext.fill();
	}
	for (var i = 0; i < 3; i++) { 
		tableContext.fillStyle =  "white";  	//White dots
		var y = 405;
		var x = 700 - Math.round(69.5*i+121.5);
		tableContext.beginPath();
		tableContext.moveTo(x,y);
		tableContext.arc(x,y,3.5,0,2*Math.PI);
		tableContext.closePath();
		tableContext.fill();
	}
	for (var i = 0; i < 3; i++) { 
		tableContext.fillStyle =  "white";  	//White dots
		var y = 15;
		var x = Math.round(69.5*i+121.5);
		tableContext.beginPath();
		tableContext.moveTo(x,y);
		tableContext.arc(x,y,3.5,0,2*Math.PI);
		tableContext.closePath();
		tableContext.fill();
	}
	for (var i = 0; i < 3; i++) { 
		tableContext.fillStyle =  "white";  	//White dots
		var y = 15;
		var x = 700 - Math.round(69.5*i+121.5);
		tableContext.beginPath();
		tableContext.moveTo(x,y);
		tableContext.arc(x,y,3.5,0,2*Math.PI);
		tableContext.closePath();
		tableContext.fill();
	}
	for (var i = 0; i < 3; i++) { 
		tableContext.fillStyle =  "white";  	//White dots
		var y = Math.round((79*i)+131);
		var x = 15;
		tableContext.beginPath();
		tableContext.moveTo(x,y);
		tableContext.arc(x,y,3.5,0,2*Math.PI);
		tableContext.closePath();
		tableContext.fill();
	}
	for (var i = 0; i < 3; i++) { 
		tableContext.fillStyle =  "white";  	//White dots
		var y = Math.round((79*i)+131);
		var x = 685;
		tableContext.beginPath();
		tableContext.moveTo(x,y);
		tableContext.arc(x,y,3.5,0,2*Math.PI);
		tableContext.closePath();
		tableContext.fill();
	}
	tableHoles();
}

function drawCueImage() {
	cueContext.fillStyle = "rgb(102,34,0)";    //Cue Canvas
	cueContext.beginPath();
	cueContext.moveTo(350,15);
	cueContext.lineTo(262,13);
	cueContext.lineTo(262,2);
	cueContext.lineTo(350,0);
	cueContext.lineTo(350,15);
	cueContext.closePath();
	cueContext.fill();
	cueContext.fillStyle = "rgb(191,191,191)";
	cueContext.beginPath();
	cueContext.moveTo(262,13);
	cueContext.lineTo(175,12);
	cueContext.lineTo(175,3);
	cueContext.lineTo(262,2);
	cueContext.lineTo(262,13);
	cueContext.closePath();
	cueContext.fill();
	cueContext.fillStyle = "rgb(255,212,128)";
	cueContext.beginPath();
	cueContext.moveTo(175,12);
	cueContext.lineTo(10,9);
	cueContext.lineTo(10,6);
	cueContext.lineTo(175,3);
	cueContext.lineTo(175,12);
	cueContext.closePath();
	cueContext.fill();
	var grad = cueContext.createLinearGradient(0,0,0,15);
	grad.addColorStop(0,"rgba(255,255,255,0)");
	grad.addColorStop(0.5,"rgba(255,255,255,0.6)");
	grad.addColorStop(1,"rgba(255,255,255,0)");
	cueContext.fillStyle = grad;
	cueContext.beginPath();
	cueContext.moveTo(350,15);
	cueContext.lineTo(10,9);
	cueContext.lineTo(10,6);
	cueContext.lineTo(350,0);
	cueContext.lineTo(350,15);
	cueContext.closePath();
	cueContext.fill();
	cueContext.fillStyle = "black";       //Curvy bit of cue
	cueContext.beginPath();
	cueContext.moveTo(350,0);
	cueContext.bezierCurveTo(360,1,360,14,350,15);
	cueContext.lineTo(350,0);
	cueContext.closePath();
	cueContext.fill();
	cueImage.src = cueCanvas.toDataURL("image/png");
	cueImage.onload = function() {
		createBallImage(0);
	}
}

function mouseMotionDetector(evt) {
	evt.preventDefault();
	if (cueIsStriking) {
		return;	
	}
	if (areBallsInMotion()) {
		return;
	}
	var rect = cursorCanvas.getBoundingClientRect();
	var x = (evt.clientX || evt.targetTouches[0].clientX) - rect.left;
	var y = (evt.clientY || evt.targetTouches[0].clientY) - rect.top;
	var scale = 800/cursorCanvas.width;
	phi = Math.atan2(ys[0]+80-y*scale,xs[0]+80-x*scale);
	drawCue();
}

function mouseDown(evt) {
	if (isIOS && (!isCollisionAudioLoaded || !isExplosionAudioLoaded)) {
		loadAudio();
	}
	if (cueIsStriking) {
		return;	
	}
	if (evt.targetTouches && evt.targetTouches.length > 1) {
		return;
	}
	evt.preventDefault();
	if (areBallsInMotion()) {
		return;
	}
	mouseMotionDetector(evt);
	cueTimer = setInterval(function() {
		if (distanceFromCueToBall <= 120) {
			distanceFromCueToBall++;
			drawCue();
		}
	},10);
	cueTimerIsRunning = 1;
}

function mouseUp(evt) {
	if (cueIsStriking) {
		return;	
	}
	if (evt.targetTouches && evt.targetTouches.length > 1) {
		return;
	}
	evt.preventDefault();
	if (areBallsInMotion()) {
		return;
	}
	strengthOfHit = distanceFromCueToBall/30;
	if (cueTimerIsRunning) {
		clearInterval(cueTimer);
		cueTimerIsRunning = 0;
	}
	cueIsStriking = 1;
	cueTimer = setInterval(function() {
		if (distanceFromCueToBall >= r) {
			distanceFromCueToBall -= 5;
			drawCue();
		} else {
			Vxs[0] = strengthOfHit*Math.cos(phi+Math.PI);
			Vys[0] = strengthOfHit*Math.sin(phi+Math.PI);
			if (cueTimerIsRunning) {
				clearInterval(cueTimer);
				cueTimerIsRunning = 0;
			}
			//cursorCanvas.width = cursorCanvas.width;
			cursorContext.clearRect(0,0,800,520);
			distanceFromCueToBall = 20;
			audioVolume.gain.setValueAtTime(1,audioContext.currentTime);
			collidingSound();
			cueIsStriking = 0;
		}
	},1);
	cueTimerIsRunning = 1;
}

function drawCue() {
	//cursorCanvas.width = cursorCanvas.width;
	cursorContext.clearRect(0,0,800,520);
	cursorContext.save();
	cursorContext.translate(xs[0]+80,ys[0]+80);
	cursorContext.rotate(phi);
	//Draw x & y
	cursorContext.drawImage(cueImage,-10+distanceFromCueToBall,-7);
	cursorContext.restore();
}

function areBallsInMotion() {
	for (var i = 0; i < 16; i++) {
		if (Vxs[i] != 0 || Vys[i] != 0) {
			return 1;
		}
	}
	return 0;
}

function holes() {
	var radius = 22;
	context.fillStyle = "black";
	context.beginPath();
	context.moveTo(0,0);
	context.arc(0,0,radius,0,2*Math.PI);
	context.closePath();
	context.fill();
	context.fillStyle = "black";
	context.beginPath();
	context.moveTo(0,360);
	context.arc(0,360,radius,0,2*Math.PI);
	context.closePath();
	context.fill();
	context.fillStyle = "black";
	context.beginPath();
	context.moveTo(640,0);
	context.arc(640,0,radius,0,2*Math.PI);
	context.closePath();
	context.fill();
	context.fillStyle = "black";
	context.beginPath();
	context.moveTo(640,360);
	context.arc(640,360,radius,0,2*Math.PI);
	context.closePath();
	context.fill();
	context.fillStyle = "black";
	context.beginPath();
	context.moveTo(320,0);
	context.arc(320,-10,radius,0,2*Math.PI);
	context.closePath();
	context.fill();
	context.fillStyle = "black";
	context.beginPath();
	context.moveTo(320,360);
	context.arc(320,370,radius,0,2*Math.PI);
	context.closePath();
	context.fill();
}

function tableHoles() {
	var radius = 15;
	//Top left Hole
	var grad = tableContext.createLinearGradient(0,0,52,52); 
	grad.addColorStop(0,"rgb(128,64,0)");
	grad.addColorStop(1,"rgb(255,179,102)");  
	tableContext.fillStyle = grad;  	//Table canvas bigger rect background around holes
	tableContext.beginPath();
	tableContext.moveTo(30,45);
	tableContext.lineTo(30,52);
	tableContext.lineTo(0,52);
	tableContext.lineTo(0,0);
	tableContext.lineTo(52,0);
	tableContext.lineTo(52,30);
	tableContext.closePath();
	tableContext.fill();
	tableContext.fillStyle = "rgb(102,51,0)";  	//Table canvas smaller arc background around holes
	tableContext.beginPath();
	tableContext.moveTo(30,30);
	tableContext.arc(30,30,20,0,2*Math.PI);
	tableContext.closePath();
	tableContext.fill();
	grad = tableContext.createLinearGradient(15,15,30,30);  //Gradient table canvas hole
	grad.addColorStop(1,"black");
	grad.addColorStop(0.25,"rgb(77,40,0)");  
	tableContext.fillStyle = grad;  	//Table canvas holes
	tableContext.beginPath();
	tableContext.moveTo(30,30);
	tableContext.arc(30,30,radius,0,2*Math.PI);
	tableContext.closePath();
	tableContext.fill();
	//Top right hole
	grad = tableContext.createLinearGradient(0,420,52,368);
	grad.addColorStop(0,"rgb(128,64,0)");
	grad.addColorStop(1,"rgb(255,179,102)");  
	tableContext.fillStyle = grad;  	//Table canvas bigger background around holes
	tableContext.fillRect(0,368,52,52);
	tableContext.fillStyle = "rgb(102,51,0)";  	//Table canvas smaller background around holes
	tableContext.beginPath();
	tableContext.moveTo(30,390);
	tableContext.arc(30,390,20,0,2*Math.PI);
	tableContext.closePath();
	tableContext.fill();
	grad = tableContext.createLinearGradient(15,405,30,390);
	grad.addColorStop(1,"black");
	grad.addColorStop(0.25,"rgb(77,40,0)");  
	tableContext.fillStyle = grad;  	//Table canvas holes
	tableContext.beginPath();
	tableContext.moveTo(30,390);
	tableContext.arc(30,390,radius,0,2*Math.PI);
	tableContext.closePath();
	tableContext.fill(); 
	//Bottom right hole
	grad = tableContext.createLinearGradient(700,420,648,368);
	grad.addColorStop(0,"rgb(128,64,0)");
	grad.addColorStop(1,"rgb(255,179,102)");  
	tableContext.fillStyle = grad;  	//Table canvas bigger background around holes
	tableContext.fillRect(648,368,52,52);
	tableContext.fillStyle = "rgb(102,51,0)";  	//Table canvas smaller background around holes
	tableContext.beginPath();
	tableContext.moveTo(670,390);
	tableContext.arc(670,390,20,0,2*Math.PI);
	tableContext.closePath();
	tableContext.fill();
	grad = tableContext.createLinearGradient(685,405,670,390);
	grad.addColorStop(1,"black");
	grad.addColorStop(0.25,"rgb(77,40,0)");  
	tableContext.fillStyle = grad;  	//Table canvas holes
	tableContext.beginPath();
	tableContext.moveTo(670,390);
	tableContext.arc(670,390,radius,0,2*Math.PI);
	tableContext.closePath();
	tableContext.fill();
	//Bottom left hole
	grad = tableContext.createLinearGradient(700,0,648,52);
	grad.addColorStop(0,"rgb(128,64,0)");
	grad.addColorStop(1,"rgb(255,179,102)");  
	tableContext.fillStyle = grad;  	//Table canvas bigger background around holes
	tableContext.fillRect(648,0,52,52);
	tableContext.fillStyle = "rgb(102,51,0)";  	//Table canvas smaller background around holes
	tableContext.beginPath();
	tableContext.moveTo(670,30);
	tableContext.arc(670,30,20,0,2*Math.PI);
	tableContext.closePath();
	tableContext.fill();
	grad = tableContext.createLinearGradient(685,15,670,30);
	grad.addColorStop(1,"black");
	grad.addColorStop(0.25,"rgb(77,40,0)");  
	tableContext.fillStyle = grad;  	//Table canvas holes
	tableContext.beginPath();
	tableContext.moveTo(670,30);
	tableContext.arc(670,30,radius,0,2*Math.PI);
	tableContext.closePath();
	tableContext.fill();
	//Left hole
	grad = tableContext.createLinearGradient(330,0,330,52);
	grad.addColorStop(0,"rgb(128,64,0)");
	grad.addColorStop(0.6,"rgb(255,179,102)");  
	tableContext.fillStyle = grad;  	//Table canvas bigger background around holes
	tableContext.fillRect(330,0,40,52);
	tableContext.fillStyle =  "rgb(95,48,0)";  	//Table canvas smaller background around holes
	tableContext.beginPath();
	tableContext.moveTo(350,25);
	tableContext.arc(350,25,20,0,2*Math.PI);
	tableContext.closePath();
	tableContext.fill();
	grad = tableContext.createLinearGradient(350,10,350,25);
	grad.addColorStop(1,"black");
	grad.addColorStop(0.05,"rgb(77,40,0)");  
	tableContext.fillStyle = grad;  	//Table canvas holes
	tableContext.beginPath();
	tableContext.moveTo(350,25);
	tableContext.arc(350,25,radius,0,2*Math.PI);
	tableContext.closePath();
	tableContext.fill();
	//Right hole
	grad = tableContext.createLinearGradient(330,420,330,368);
	grad.addColorStop(0,"rgb(128,64,0)");
	grad.addColorStop(0.6,"rgb(255,179,102)");  
	tableContext.fillStyle = grad;  	//Table canvas bigger background around holes
	tableContext.fillRect(330,368,40,52);
	tableContext.fillStyle =  "rgb(95,48,0)";  	//Table canvas smaller background around holes
	tableContext.beginPath();
	tableContext.moveTo(350,395);
	tableContext.arc(350,395,20,0,2*Math.PI);
	tableContext.closePath();
	tableContext.fill();
	grad = tableContext.createLinearGradient(350,410,350,395);
	grad.addColorStop(1,"black");
	grad.addColorStop(0.05,"rgb(77,40,0)");  
	tableContext.fillStyle = grad;  	//Table canvas holes
	tableContext.beginPath();
	tableContext.moveTo(350,395);
	tableContext.arc(350,395,radius,0,2*Math.PI);
	tableContext.closePath();
	tableContext.fill();
}

function drawBall() {
	correctOverlaps();
	//ballCanvas.width = ballCanvas.width;
	ballContext.clearRect(0,0,640,360);
	//explodingCanvas.width = explodingCanvas.width;
	explodingContext.clearRect(0,0,640,360);
	for (var i = 0; i < xs.length; i++) {	
		if (isBallOnTable[i]) {
			ballContext.drawImage(ballImages[i],xs[i]-r,ys[i]-r);
			explodingContext.save();
			explodingContext.globalAlpha = opacity[i];
			explodingContext.drawImage(glowImage,xs[i]-r,ys[i]-r);
			explodingContext.restore();
			/*
			var grad = explodingContext.createRadialGradient(Math.round(xs[i]-r/2),Math.round(ys[i]-r/2),0,Math.round(xs[i]-r/2),Math.round(ys[i]-r/2),(1+1/Math.sqrt(2))*r);
			grad.addColorStop(0,"rgba(255,255,255," + opacity[i] + ")");
			grad.addColorStop(0.2,"rgba(255,0,0," + opacity[i] + ")");
			grad.addColorStop(1,"rgba(0,0,0," + opacity[i] + ")");
			explodingContext.fillStyle = grad;
			explodingContext.beginPath();
			explodingContext.moveTo(xs[i],ys[i]);
			explodingContext.arc(xs[i],ys[i],r,0,2*Math.PI);
			explodingContext.closePath();
			explodingContext.fill();
			*/
		}
		if (explosiveIndex[i] != -1) {
			explodingContext.drawImage(explosiveImages[explosiveIndex[i]],xs[i]-r-40,ys[i]-r-40);
		}
	}
	if (!areBallsInMotion()) {
		if (isBallinPocket(xs[0],ys[0])) {
			xs[0] = 575;
			ys[0] = 180;
			isBallOnTable[0] = 1;
			drawBall();
		}
		drawCue();
	}
	checkIfGameIsOver();
}

function moveBall() {
	for (var i = 0; i < 16; i++) {
		if (Vxs[i] != 0 || Vys[i] != 0) {
			var theta = Math.atan2(Vys[i],Vxs[i]);
			Vys[i] -= fric * Math.sin(theta);
			Vxs[i] -= fric * Math.cos(theta);
			var v = Math.sqrt(Vxs[i]*Vxs[i] + Vys[i]*Vys[i]);
			if (fric >= v) {
				Vxs[i] = 0;
				Vys[i] = 0;
			}
			//Vxs[i] = Math.round(Vxs[i]);
			//Vys[i] = Math.round(Vys[i]);
			//Vys[i] -= fric*Vys[i]/v;
			//Vxs[i] -= fric*Vxs[i]/v;
		}
	}
	for (var i = 0; i < xs.length; i++) {
		for (var j = 0; j < xs.length; j++) {
			if (i === j) { continue; }
			if (isBallOnTable[i] && isBallOnTable[j] && areBallsColliding(xs[i]+Vxs[i],ys[i]+Vxs[i],xs[j]+Vxs[j],ys[j]+Vys[j])) {
				collideBalls(i,j);
			}
		}
	}
	for (var i = 0; i < xs.length; i++) {
		if (isBallinPocket(xs[i],ys[i])) {
			isBallOnTable[i] = 0;
			Vxs[i] = 0;
			Vys[i] = 0;
			if (ballTimerIsRunning[i]) {
				clearInterval(ballTimer[i]);
				ballTimerIsRunning[i] = 0;
				opacity[i] = 0;
			}
		} else {
			if (xs[i] + r + Vxs[i] >= 640 || xs[i] - r + Vxs[i] < 0) {
				Vxs[i] *= -1;
			}
			if (ys[i] + r + Vys[i] >= 360 || ys[i] - r + Vys[i] < 0) {
				Vys[i] *= -1;
			}
			xs[i] += Vxs[i];
			ys[i] += Vys[i];
		}
	}
	drawBall();
}

function isBallinPocket(ballx,bally) {
	var dx = ballx - 0;
	var dy = bally - 0;
	var distance = Math.sqrt(dx * dx + dy * dy);
	if (distance <= 22) {
		return 1;
	}
	dx = ballx - 640;
	dy = bally - 0;
	distance = Math.sqrt(dx * dx + dy * dy);
	if (distance <= 22) {
		return 1;
	}
	dx = ballx - 0;
	dy = bally - 360;
	distance = Math.sqrt(dx * dx + dy * dy);
	if (distance <= 22) {
		return 1;
	}
	dx = ballx - 640;
	dy = bally - 360;
	distance = Math.sqrt(dx * dx + dy * dy);
	if (distance <= 22) {
		return 1;
	}
	dx = ballx - 320;
	dy = bally - 0;
	distance = Math.sqrt(dx * dx + dy * dy);
	if (distance <= 22) {
		return 1;
	}
	dx = ballx - 320;
	dy = bally - 360;
	distance = Math.sqrt(dx * dx + dy * dy);
	if (distance <= 22) {
		return 1;
	}
	return 0;	
}

function areBallsColliding(ballx1,bally1,ballx2,bally2) {
	var dx = ballx1 - ballx2;
	var dy = bally1 - bally2;
	var distance = Math.sqrt(dx * dx + dy * dy);
	var radius = 10;
	if (distance <= 2*radius) {
		return 1;
	}
	return 0;
}

function explodeBall(i) {
	if (!explosiveTimerIsRunning[i]) {
		explosionSound();
		explosiveIndex[i] = 0;
		explosiveTimer[i] = setInterval(function() {
			if (explosiveIndex[i] < 21) {
				explosiveIndex[i]++;
			} else {
				explosiveIndex[i] = -1;
				if (explosiveTimerIsRunning[i]) {
					explosiveTimerIsRunning[i] = 0;
					clearInterval(explosiveTimer[i]);
				}
			}
		},30);
		explosiveTimerIsRunning[i] = 1;
	}
}

function explosionCountDown(j) {
	if (opacity[j] >= 1) {
		if (numberOfLives === 1) {
			if (ballTimerIsRunning[j]) {
				clearInterval(ballTimer[j]);
				ballTimerIsRunning[j] = 0;
			}
			opacity[j] = 0;
			explodeBall(j);
			numberOfLives--;
			drawLives();
			isBallOnTable[j] = 0;
			drawBall();
			loseGame();
			return;
		}
		explodeBall(j);
		numberOfLives--;
		drawLives();
		isBallOnTable[j] = 0;
		if (ballTimerIsRunning[j]) {
			clearInterval(ballTimer[j]);
			ballTimerIsRunning[j] = 0;
		}
		opacity[j] = 0;
		return;
	}
	opacity[j] += 1./60.;
}

function collideBalls(i,j) {
	if (Vxs[i] === 0 && Vys[i] === 0 && Vxs[j] === 0 && Vys[j] === 0) {
		return;
	} 
	if (i === 0 && opacity[j] === 0) {
		if (!ballTimerIsRunning[j]) {
			ballTimer[j] = setInterval(function() {
				(function(index) {
					explosionCountDown(index);
				})(j);
			},1000);
			ballTimerIsRunning[j] = 1;
		}
	}
	if (j === 0 && opacity[i] === 0) {
		if (!ballTimerIsRunning[i]) {
			ballTimer[i] = setInterval(function() {
				(function(index) {
					explosionCountDown(index);
				})(i);
			},1000);
			ballTimerIsRunning[i] = 1;
		}
	}
	var phi = Math.atan2(ys[j]-ys[i],xs[j]-xs[i]);
	var s = Math.sin(phi);
	var c = Math.cos(phi);
	var newVx = (Vxs[i]-Vxs[j])*s*s-(Vys[i]-Vys[j])*s*c+Vxs[j];
	var newVy = (Vys[i]-Vys[j])*c*c-(Vxs[i]-Vxs[j])*s*c+Vys[j];
	var newVx1 = ((Vxs[i]-Vxs[j])*c+(Vys[i]-Vys[j])*s)*c+Vxs[j];
	var newVy1 = ((Vxs[i]-Vxs[j])*c+(Vys[i]-Vys[j])*s)*s+Vys[j];
	Vxs[i] = newVx;
	Vys[i] = newVy;
	Vxs[j] = newVx1;
	Vys[j] = newVy1;
	var V = Math.sqrt((Vxs[i]-Vxs[j])*(Vxs[i]-Vxs[j])+(Vys[i]-Vys[j])*(Vys[i]-Vys[j]));
	if (V > 4) {
		audioVolume.gain.setValueAtTime(1,audioContext.currentTime);
	} else {
		audioVolume.gain.setValueAtTime(Math.pow(V/4,5.6),audioContext.currentTime)
	}
	collidingSound();
}

function correctOverlaps() {
	var dx, dy, d, xAve, yAve, xNewI, xNewJ, yNewI, yNewJ;
	for (var i = 0; i < xs.length; i++) {
		for (var j = 0; j < ys.length; j++) {
			if (i == j || !isBallOnTable[i] || !isBallOnTable[j]) {continue;}
			dx = xs[i] - xs[j];
			dy = ys[i] - ys[j];
			d = Math.sqrt(dx*dx + dy*dy);
			if (d < 2*r) {
				xAve = (xs[i] + xs[j])/2;
				yAve = (ys[i] + ys[j])/2;
				dx = xs[i] - xAve;
				dy = ys[i] - yAve;
				d = Math.sqrt(dx*dx + dy*dy);
				dx = r*dx/d;
				dy = r*dy/d;
				xNewI = xAve + dx;
				yNewI = yAve + dy;
				dx = xs[j] - xAve;
				dy = ys[j] - yAve;
				d = Math.sqrt(dx*dx + dy*dy);
				dx = r*dx/d;
				dy = r*dy/d;
				xNewJ = xAve + dx;
				yNewJ = yAve + dy;
				if (xNewI < r) {
					xNewJ += (r - xNewI);
					xNewI = r;
				}
				if (xNewJ < r) {
					xNewI += (r - xNewJ);
					xNewJ = r;
				}
				if (xNewI > 639 - r) {
					xNewJ -= (xNewI - 639 + r);
					xNewI = 639 - r;
				}
				if (xNewJ > 639 - r) {
					xNewI -= (xNewJ - 639 + r);
					xNewJ = 639 - r;
				}
				if (yNewI < r) {
					yNewJ += (r - yNewI);
					yNewI = r;
				}
				if (yNewJ < r) {
					yNewI += (r - yNewJ);
					yNewJ = r;
				}
				if (yNewI > 359 - r) {
					yNewJ -= (yNewI - 359 + r);
					yNewI = 359 - r;
				}
				if (yNewJ > 359 - r) {
					yNewI -= (yNewJ - 359 + r);
					yNewJ = 359 - r;
				}
				xs[i] = Math.round(xNewI);
				ys[i] = Math.round(yNewI);
				xs[j] = Math.round(xNewJ);
				ys[j] = Math.round(yNewJ);
			}
		}
	}
}

function collidingSound() {
	if (!isCollisionAudioLoaded) return;
	if (lastAudioSource) {
		lastAudioSource.stop();
	}
	var audioSource = audioContext.createBufferSource();
	audioSource.connect(audioVolume);
	audioSource.buffer = audioBuffer;
	if (audioSource.start) {
		audioSource.start(0);
	} else if (audioSource.play) {
		audioSource.play(0);
	} else if (audioSource.noteOn) {
		audioSource.noteOn(0);	
	}
	lastAudioSource = audioSource;
}

function explosionSound() {
	if (!isExplosionAudioLoaded) return;
	audioVolume.gain.setValueAtTime(1,audioContext.currentTime);
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

function endGame() {     // You Win Text function
	/*
	if (myTimerIsRunning) {
		clearInterval(myTimer);
		myTimerIsRunning = 0;
	}
	if (cueTimerIsRunning) {
		clearInterval(cueTimer);
		cueTimerIsRunning = 0;
	}
	for (var i = 0; i < 16; i++) {
		if (ballTimerIsRunning[i]) {
			clearInterval(ballTimer[i]);
			ballTimerIsRunning[i];
			opacity[i] = 0;
		}
		if (explosiveTimerIsRunning[i]) {
			clearInterval(explosiveTimer[i]);
			explosiveTimerIsRunning[i] = 0;
		}
	}
	*/
	var grad = context.createLinearGradient(320,170,320,190);
	grad.addColorStop(0,"yellow");
	grad.addColorStop(1,"rgb(255,102,0)");
	context.fillStyle = grad;
	context.strokeStyle = "black";
	context.lineWidth = 3;
	context.font = "36px impact";
	context.textAlign = "center";
	context.textBaseline = "middle";
	context.strokeText("You Win!",320,180);
	context.fillText("You Win!",320,180);
	setTimeout(function() {
		if (myTimerIsRunning) {
			clearInterval(myTimer);
			myTimerIsRunning = 0;
		}
		if (cueTimerIsRunning) {
			clearInterval(cueTimer);
			cueTimerIsRunning = 0;
		}
		for (var i = 0; i < 16; i++) {
			if (ballTimerIsRunning[i]) {
				clearInterval(ballTimer[i]);
				ballTimerIsRunning[i];
				opacity[i] = 0;
			}
			if (explosiveTimerIsRunning[i]) {
				clearInterval(explosiveTimer[i]);
				explosiveTimerIsRunning[i] = 0;
			}
		}
		run();
	},5000);
}

function loseGame() {     // You Win Text function
	/*
	if (myTimerIsRunning) {
		clearInterval(myTimer);
		myTimerIsRunning = 0;
	}
	if (cueTimerIsRunning) {
		clearInterval(cueTimer);
		cueTimerIsRunning = 0;
	}
	for (var i = 0; i < 16; i++) {
		if (ballTimerIsRunning[i]) {
			clearInterval(ballTimer[i]);
			ballTimerIsRunning[i] = 0;
			opacity[i] = 0;
		}
	}
	*/
	var grad = context.createLinearGradient(320,170,320,190);
	grad.addColorStop(0,"yellow");
	grad.addColorStop(1,"rgb(255,102,0)");
	context.fillStyle = grad;
	context.strokeStyle = "black";
	context.lineWidth = 3;
	context.font = "36px impact";
	context.textAlign = "center";
	context.textBaseline = "middle";
	context.strokeText("You Lose!",320,180);
	context.fillText("You Lose!",320,180);
	setTimeout(function() {
		if (myTimerIsRunning) {
			clearInterval(myTimer);
			myTimerIsRunning = 0;
		}
		if (cueTimerIsRunning) {
			clearInterval(cueTimer);
			cueTimerIsRunning = 0;
		}
		for (var i = 0; i < 16; i++) {
			if (ballTimerIsRunning[i]) {
				clearInterval(ballTimer[i]);
				ballTimerIsRunning[i];
				opacity[i] = 0;
			}
			if (explosiveTimerIsRunning[i]) {
				clearInterval(explosiveTimer[i]);
				explosiveTimerIsRunning[i] = 0;
			}
		}
		run();
	},5000);
}

function checkIfGameIsOver() {
	for (var i = 1; i < 16; i++) {
		if (isBallOnTable[i]) {
			return;
		}
	}
	endGame();
}

export class PoolDynamite extends React.Component {
    componentDidMount() {
        scrollPreventCanvas = document.getElementById("scrollPreventCanvas");
        myCanvas = document.getElementById("myCanvas");
        context = myCanvas.getContext("2d");
        ballCanvas = document.getElementById("ballCanvas");
        ballContext = ballCanvas.getContext("2d");
        tableCanvas = document.getElementById("tableCanvas");
        tableContext = tableCanvas.getContext("2d");
        cueCanvas = document.getElementById("cueCanvas");
        cueContext = cueCanvas.getContext("2d");
        cursorCanvas = document.getElementById("cursorCanvas");
        cursorContext = cursorCanvas.getContext("2d");
        imageCanvas = document.getElementById("imageCanvas");
        imageContext = imageCanvas.getContext("2d");
        floorCanvas = document.getElementById("floorCanvas");
        floorContext = floorCanvas.getContext("2d");
        explodingCanvas = document.getElementById("explodingCanvas");
        explodingContext = explodingCanvas.getContext("2d");
        livesCanvas = document.getElementById("livesCanvas");
		livesContext = livesCanvas.getContext("2d");
		document.documentElement.style.overflow = "hidden";
		document.body.scroll = "no";

        run();
    }

    render() {
        return (
            <div>
            <canvas id ="scrollPreventCanvas" width="640" height="360" style={{position: "absolute", top: "80", left: "80", zIndex: 0, border: "0px solid black"}} />
            <canvas id ="myCanvas" width="640" height="360" style={{position: "absolute", top: "80", left: "80", zIndex: 4, border: "0px solid black"}} />
            <canvas id ="ballCanvas" width="640" height="360" style={{position: "absolute", top: "80", left: "80", zIndex: 5, border: "0px solid black"}} />
            <canvas id ="tableCanvas" width="700" height="420" style={{position: "absolute", top: "50", left: "50", zIndex: 3, border: "0px solid black"}} />
            <canvas id ="cueCanvas" width="370" height="15" style={{position: "absolute", top: "50", left: "50", zIndex: 2, border: "0px solid black"}} />
            <canvas id ="cursorCanvas" width="800" height="520" style={{position: "absolute", top: "0", left: "0", zIndex: 7, border: "0px solid black"}} />
            <canvas id ="imageCanvas" width="20" height="20" style={{position: "absolute", top: "50", left: "50", zIndex: 2, border: "0px solid black"}} />
            <canvas id ="floorCanvas" width="800" height="520" style={{position: "absolute", top: "0", left: "0", zIndex: 1, border: "0px solid black"}} />
            <canvas id ="explodingCanvas" width="640" height="360" style={{position: "absolute", top: "80", left: "80", zIndex: 6, border: "0px solid black"}} />
            <canvas id ="livesCanvas" width="800" height="520" style={{position: "absolute", top: "0", left: "0", zIndex: 2, border: "0px solid black"}} />
            </div>
        );
    }
}

