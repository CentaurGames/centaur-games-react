(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{76:function(e,t,o){"use strict";o.r(t),o.d(t,"LumpyDumplings3",(function(){return ve})),o.d(t,"default",(function(){return ve}));var n,a,i,r,l,c,d,s,h,u=o(0),f=o(68);function g(e){return(g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function p(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function b(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function v(e,t){return!t||"object"!==g(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function m(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function w(e){return(w=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function y(e,t){return(y=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var T,P,C,I,S,k,R,x=0,z=0,M=new Image(80,69),E=new Image(40,40),L=new Image(40,40),O=new Image(200,90),D=new Image(200,90),B=new Image(10,200),A=new Image(250,155),G=new Image(1136,640),U=new Array(4),_=new Array(4),j=D.width,W=0,H=0,X=640-D.height,q=0,J=0,F=0,K=0,N=0;function Q(){if(!N){N=1,T=new(window.AudioContext||window.webkitAudioContext),(P=T.createGain()).connect(T.destination);var e=new XMLHttpRequest;e.open("GET",f.a,!0),e.responseType="arraybuffer",e.onload=function(){T.decodeAudioData(e.response,(function(e){C=e,K=1,function(){I&&(I.loop=!1,I.stop());var e=T.createBufferSource();P.gain.value=1,e.connect(P),e.buffer=C,e.loop=!0,e.start?e.start(0):e.play?e.play(0):e.noteOn&&e.noteOn(0),I=e}()}))},e.send()}}function V(e){e.style.left="0px",e.style.top="0px";var t=e.getBoundingClientRect(),o=Math.floor((window.innerWidth-e.width)/2);o-=t.left;var n=Math.floor((window.innerHeight-e.height)/2);n-=t.top,e.style.left=o+"px",e.style.top=n+"px"}function Y(){V(a),V(i),V(r),V(l)}function Z(e,t,o){e.width=Math.floor(1136*o),e.height=Math.floor(640*o),e.style.left="0px",e.style.top="0px",t.scale(o,o)}function $(){window.scrollTo(0,0),r.style.left="0px",r.style.top="0px",n.style.left="0px",n.style.top="0px",n.width=window.innerWidth,n.height=window.innerHeight;var e=r.getBoundingClientRect(),t=window.innerWidth/1136,o=window.innerHeight/640,c=t<o?t:o;c=c>=1?1:c,a.width=0,a.height=0,Z(i,d,c),Z(r,s,c),Z(l,h,c),z?setTimeout((function(){window.scrollTo(0,e.top),Y()}),500):(window.scrollTo(0,e.top),Y()),ee(),d.clearRect(0,0,1136,640),s.clearRect(0,0,1136,640),d.drawImage(G,0,0),s.drawImage(A,S-j/2,640-A.height),_<640?s.drawImage(L,U-20,_-40):s.drawImage(L,0,0,40,40,U-20,_-40,40,640-_+40),J&&re()}function ee(){h.clearRect(0,0,1136,640),h.drawImage(L,0,0,40,40,10,10,20,20),h.fillStyle="white",h.font="20px helvetica",h.textAlign="center",h.textBaseline="middle",h.fillText(q+"",40,20),F&&h.drawImage(M,(1136-M.width)/2,(640-M.height)/2)}function te(){for(var e=0;e<4;e++)if(_[e]-40>=640)return void re();ee(),d.clearRect(0,0,1136,640),s.clearRect(0,0,1136,640),d.drawImage(G,0,0),s.drawImage(A,S-j/2,640-A.height);for(e=0;e<4;e++)_[e]<640?s.drawImage(L,U[e]-20,_[e]-40):s.drawImage(L,0,0,40,40,U[e]-20,_[e]-40,40,640-_[e]+40)}function oe(e){if(!J){switch(e.keyCode){case 37:S-=15;break;case 39:S+=15;break;default:return}S=(S=S<j/2?j/2:S)>1136-j/2-1?1136-j/2-1:S,H&&(clearTimeout(R),H=0),R=setTimeout((function(){oe(e)}),10),H=1,te()}}function ne(e){H&&(clearTimeout(R),H=0)}function ae(e){e.preventDefault(),J||(S=e.clientX||e.targetTouches[0].clientX,S-=l.getBoundingClientRect().left,S=(S=(S*=1136/l.width)<j/2?j/2:S)>1136-j/2-1?1136-j/2-1:S,te())}function ie(e){x&&!K&&Q(),e.preventDefault(),J&&(J=0,F=0,function(){var e=X/4;a.width=0,a.height=0,S=568;for(var t=0;t<U.length;t++)U[t]=Math.floor(1136*Math.random()),_[t]=-t*e;q=0,setTimeout(ce,500)}())}function re(){J=1,F=1,W&&(clearInterval(k),W=0),h.drawImage(M,(1136-M.width)/2,(640-M.height)/2)}function le(){for(var e=0;e<4;e++)_[e]+=3,_[e]>=X&&(Math.abs(U[e]-S)<j/2?(q++,_[e]=0,U[e]=Math.floor(1136*Math.random())):J=1);te()}function ce(){W||(k=setInterval(le,10),W=1)}function de(){a.width=1136,a.height=640,c.fillStyle="maroon",c.fillRect(0,0,a.width,a.height),c.strokeStyle="red";for(var e,t,o=0;o<42;o++)for(var i=o%2;i<42;i+=2)e=1136*i/40,t=640*o/40,c.beginPath(),c.moveTo(e+32,t),c.arc(e,t,32,0,2*Math.PI),c.closePath(),c.fill(),c.beginPath(),c.moveTo(e+8,t),c.arc(e,t,8,0,2*Math.PI),c.closePath(),c.stroke(),c.beginPath(),c.moveTo(e+16,t),c.arc(e,t,16,0,2*Math.PI),c.closePath(),c.stroke(),c.beginPath(),c.moveTo(e+24,t),c.arc(e,t,24,0,2*Math.PI),c.closePath(),c.stroke(),c.beginPath(),c.moveTo(e+32,t),c.arc(e,t,32,0,2*Math.PI),c.closePath(),c.stroke();var r=c.createRadialGradient(568,320,0,568,320,Math.sqrt(1700096)/2);r.addColorStop(0,"rgba(255,255,0,0.2)"),r.addColorStop(1,"rgba(255,255,0,0)"),c.fillStyle=r,c.fillRect(0,0,1136,640),G.src=a.toDataURL("image/png"),G.onload=function(){F=1,J=1,S=568,/iPhone|iPad|iPod|Android|webOS|Blackberry|IEMobile|Opera Mini/i.test(navigator.userAgent)&&(z=1),/iPhone|iPad|iPod/i.test(navigator.userAgent),x=1,document.addEventListener("keydown",oe),document.addEventListener("keyup",ne),document.addEventListener("mousemove",ae),l.addEventListener("touchstart",ae),l.addEventListener("touchmove",ae),l.addEventListener("touchend",ie),document.addEventListener("mouseup",ie),window.addEventListener("resize",$),n.addEventListener("touchmove",(function(e){e.preventDefault()})),$()}}function se(){a.width=250,a.height=155,c.translate(0,-95),c.save(),c.translate(100,250),c.rotate(39*Math.PI/180),c.translate(-100,-250),c.drawImage(B,100,50),c.restore(),c.save(),c.translate(100,250),c.rotate(43*Math.PI/180),c.translate(-100,-250),c.drawImage(B,100,40),c.restore(),c.drawImage(D,0,160),A.src=a.toDataURL("image/png"),A.onload=de}function he(){a.width=10,a.height=200,c.save(),c.translate(5,100),c.rotate(Math.PI),c.translate(-5,-100);var e=c.createLinearGradient(5,0,5,200);e.addColorStop(.5,"darkblue"),e.addColorStop(1,"black"),c.fillStyle=e,c.strokeStyle="indigo",c.lineWidth=1,c.beginPath(),c.moveTo(0,195),c.lineTo(4,0),c.lineTo(6,0),c.lineTo(10,195),c.bezierCurveTo(5,197,5,197,0,195),c.closePath(),c.stroke(),c.fill(),c.globalCompositeOperation="source-atop",c.fillStyle="gold",c.fillRect(0,170,10,2),c.fillRect(0,175,10,2),c.fillRect(0,180,10,2),c.restore(),B.src=a.toDataURL("image/png"),B.onload=se}function ue(){a.width=200,a.height=90,c.fillStyle="black",c.beginPath(),c.moveTo(0,0),c.bezierCurveTo(30,60,30,60,60,80),c.bezierCurveTo(70,90,70,90,100,90),c.lineTo(100,0),c.lineTo(0,0),c.closePath(),c.fill(),c.beginPath(),c.moveTo(200,0),c.bezierCurveTo(170,60,170,60,140,80),c.bezierCurveTo(130,90,130,90,100,90),c.lineTo(100,0),c.lineTo(200,0),c.closePath(),c.fill(),c.save(),c.globalCompositeOperation="source-atop",c.drawImage(O,0,0),c.restore(),c.strokeStyle="black",c.beginPath(),c.moveTo(0,0),c.bezierCurveTo(30,60,30,60,60,80),c.bezierCurveTo(70,90,70,90,100,90),c.bezierCurveTo(130,90,130,90,140,80),c.bezierCurveTo(170,60,170,60,200,0),c.lineTo(0,0),c.closePath(),c.stroke(),D.src=a.toDataURL("image/png"),D.onload=he}function fe(){a.width=200,a.height=90,c.fillStyle="rgb(204,0,0)",c.fillRect(0,0,200,90),c.fillStyle="white",c.fillRect(0,2,200,14),c.beginPath(),c.moveTo(100,50),c.arc(100,50,25,0,2*Math.PI),c.closePath(),c.fill(),c.font="30px helvetica",c.fillStyle="black",c.textAlign="center",c.textBaseline="middle",c.fillText("⻝",100,50),c.strokeStyle="rgb(204,0,0)",c.lineWidth=1;for(var e=16;e<a.width;e+=28)c.beginPath(),c.moveTo(e,9),c.lineTo(e,5),c.lineTo(e-12,5),c.lineTo(e-12,13),c.lineTo(e-4,13),c.lineTo(e-4,9),c.lineTo(e-8,9),c.stroke(),c.beginPath(),c.moveTo(e,9),c.lineTo(e,13),c.lineTo(e+12,13),c.lineTo(e+12,5),c.lineTo(e+4,5),c.lineTo(e+4,9),c.lineTo(e+8,9),c.stroke();var t=c.createRadialGradient(100,0,0,100,0,90);t.addColorStop(0,"rgba(0,0,0,0)"),t.addColorStop(1,"rgba(0,0,0,0.8)"),c.fillStyle=t,c.fillRect(0,0,200,90),O.src=a.toDataURL("image/png"),O.onload=ue}function ge(){a.width=40,a.height=40;var e=c.createRadialGradient(20,5,0,20,5,40);e.addColorStop(0,"rgb(255, 230, 230)"),e.addColorStop(.6,"rgb(255, 204, 153)"),e.addColorStop(1,"rgb(153, 102, 51)"),c.fillStyle=e,c.strokeStyle="brown",c.beginPath(),c.moveTo(20,0),c.bezierCurveTo(12,13,13,3,5,16),c.bezierCurveTo(1,25,1,26,5,35),c.bezierCurveTo(10,39,10,39,20,39),c.bezierCurveTo(30,39,30,39,35,35),c.bezierCurveTo(39,26,39,25,35,16),c.bezierCurveTo(27,3,28,13,20,0),c.closePath(),c.stroke(),c.fill(),c.fillStyle="rgb(153, 102, 51)",c.beginPath(),c.moveTo(20,5),c.bezierCurveTo(17,12,17,13,18,20),c.bezierCurveTo(21,12,21,13,20,5),c.closePath(),c.fill(),c.beginPath(),c.moveTo(18,5),c.bezierCurveTo(13,14,13,14,10,20),c.bezierCurveTo(9,14,9,14,18,5),c.closePath(),c.fill(),c.beginPath(),c.moveTo(22,5),c.bezierCurveTo(27,12,27,13,28,20),c.lineTo(24,12,24,13,22,5),c.closePath(),c.fill(),c.beginPath(),c.moveTo(24,5),c.bezierCurveTo(30,10,30,11,34,20),c.lineTo(28,11,28,10,24,5),c.closePath(),c.fill(),c.save(),c.globalCompositeOperation="source-atop",c.drawImage(E,0,0),c.restore(),L.src=a.toDataURL("image/png"),L.onload=fe}function pe(){a.width=40,a.height=40;var e=c.createRadialGradient(5,30,0,5,30,5);e.addColorStop(0,"rgba(255,0,0,0.3)"),e.addColorStop(1,"rgba(255,0,0,0)"),c.fillStyle=e,c.beginPath(),c.moveTo(5,30),c.arc(5,30,5,0,2*Math.PI),c.closePath(),c.fill(),(e=c.createRadialGradient(35,30,0,35,30,5)).addColorStop(0,"rgba(255,0,0,0.3)"),e.addColorStop(1,"rgba(255,0,0,0)"),c.fillStyle=e,c.beginPath(),c.moveTo(35,30),c.arc(35,30,5,0,2*Math.PI),c.closePath(),c.fill(),(e=c.createRadialGradient(9,24,0,10,25,3)).addColorStop(0,"white"),e.addColorStop(.6,"black"),c.fillStyle=e,c.beginPath(),c.moveTo(10,25),c.arc(10,25,3,0,2*Math.PI),c.closePath(),c.fill(),(e=c.createRadialGradient(29,24,0,30,25,3)).addColorStop(0,"white"),e.addColorStop(.6,"black"),c.fillStyle=e,c.beginPath(),c.moveTo(30,25),c.arc(30,25,3,0,2*Math.PI),c.closePath(),c.fill(),c.fillStyle="black",c.beginPath(),c.moveTo(10,30),c.lineTo(30,30),c.bezierCurveTo(20,35,20,35,10,30),c.closePath(),c.fill(),E.src=a.toDataURL("image/png"),E.onload=ge}function be(){h.fillStyle="black",h.fillRect(0,0,l.width,l.height),a.width=M.width,a.height=M.height,c.fillStyle="black",c.beginPath(),c.moveTo(0,0),c.lineTo(a.width,a.height/2),c.lineTo(0,a.height),c.lineTo(0,0),c.closePath(),c.fill(),M.src=a.toDataURL("image/png"),M.onload=pe}var ve=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&y(e,t)}(P,e);var t,o,f,g,T=(t=P,function(){var e,o=w(t);if(m()){var n=w(this).constructor;e=Reflect.construct(o,arguments,n)}else e=o.apply(this,arguments);return v(this,e)});function P(){return p(this,P),T.apply(this,arguments)}return o=P,(f=[{key:"componentDidMount",value:function(){n=document.getElementById("scrollPreventCanvas"),a=document.getElementById("imgCanvas"),c=a.getContext("2d"),i=document.getElementById("bkgrndCanvas"),d=i.getContext("2d"),r=document.getElementById("dumplingCanvas"),s=r.getContext("2d"),l=document.getElementById("scrCanvas"),h=l.getContext("2d"),document.documentElement.style.overflow="hidden",document.body.scroll="no",be()}},{key:"render",value:function(){return u.createElement("div",null,u.createElement("canvas",{id:"scrollPreventCanvas",width:"1136",height:"640",style:{position:"absolute",top:"10",left:"10",zIndex:0,border:"0px solid black"}}),u.createElement("canvas",{id:"imgCanvas",width:"40",height:"40",style:{position:"absolute",top:"10",left:"10",zIndex:1,border:"0px solid black"}}),u.createElement("canvas",{id:"bkgrndCanvas",width:"1136",height:"640",style:{position:"absolute",top:"10",left:"10",zIndex:2,border:"0px solid black"}}),u.createElement("canvas",{id:"dumplingCanvas",width:"1136",height:"640",style:{position:"absolute",top:"10",left:"10",zIndex:3,border:"0px solid black"}}),u.createElement("canvas",{id:"scrCanvas",width:"1136",height:"640",style:{position:"absolute",top:"10",left:"10",zIndex:4,border:"0px solid black"}}))}}])&&b(o.prototype,f),g&&b(o,g),P}(u.Component)}}]);