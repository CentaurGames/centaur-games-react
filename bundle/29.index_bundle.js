(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{80:function(e,t,o){"use strict";o.r(t),o.d(t,"PoolOutbreak",(function(){return ft})),o.d(t,"default",(function(){return ft}));var a,l,n,r,i,h,c,d,s,f,g,u,b,v,m,P,T,p,y,M=o(0),w=o(63),S=o(70);function C(e){return(C="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function I(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function k(e,t){for(var o=0;o<t.length;o++){var a=t[o];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function x(e,t){return!t||"object"!==C(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function L(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function R(e){return(R=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function z(e,t){return(z=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var E,D,G,U,q,A,B,O,_,j=45*Math.PI/180,W=new Array(22),Y=new Array(16),H=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],V=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],X=10,J=Math.sqrt(3)*X,F=[180,180,200,220,160,140,210,190,170,150,200,180,160,190,170,180],K=[575,65,65,65,65,65,65+J,65+J,65+J,65+J,65+2*J,65+2*J,65+2*J,65+3*J,65+3*J,65+4*J],N=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],Q=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],Z=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],$="black",ee="teal",te="orange",oe=["white",ee,te,$,te,$,ee,te,te,ee,$,te,$,ee,ee,$],ae=new Image(370,15),le=20,ne=0,re=new Array(16),ie=new Array(16),he=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],ce=5,de=0,se=0,fe=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],ge=new Image(20,20),ue=0,be=0,ve=0,me=0,Pe=0,Te=0,pe=0;function ye(e){e.style.left="0px",e.style.top="0px";var t=e.getBoundingClientRect(),o=t.left,a=t.top,l=(window.innerWidth-e.width)/2;l-=o,e.style.left=l+"px";var n=(window.innerHeight-e.height)/2;n-=a,e.style.left=l+"px",e.style.top=n+"px"}function Me(){ye(a),ye(l),ye(n),ye(r),ye(i),ye(h),ye(c),ye(d),ye(s),ye(f)}function we(){window.scrollTo(0,0),a.style.left="0px",a.style.top="0px",a.width=window.innerWidth,a.height=window.innerHeight,d.style.left="0px",d.style.top="0px",h.style.left="0px",h.style.top="0px",f.style.left="0px",f.style.top="0px";var e=d.getBoundingClientRect(),t=(e.left,window.innerWidth),o=e.top,M=t/800,w=window.innerHeight/520,S=M<w?M:w;S>=1&&(S=1),r.width=Math.round(700*S),r.height=Math.round(420*S);var C=Math.round(50*S);r.style.top=C+"px";var I=Math.round(50*S);r.style.left=I+"px",b.scale(S,S),l.width=Math.round(640*S),l.height=Math.round(360*S),C=Math.round(80*S),l.style.top=C+"px",I=Math.round(80*S),l.style.left=I+"px",g.scale(S,S),n.width=Math.round(640*S),n.height=Math.round(360*S),C=Math.round(80*S),n.style.top=C+"px",I=Math.round(80*S),n.style.left=I+"px",u.scale(S,S),i.width=Math.round(370*S),i.height=Math.round(15*S),C=Math.round(50*S),i.style.top=C+"px",I=Math.round(50*S),i.style.left=I+"px",v.scale(S,S),h.width=Math.round(800*S),h.height=Math.round(520*S),m.scale(S,S),c.width=Math.round(20*S),c.height=Math.round(20*S),C=Math.round(50*S),c.style.top=C+"px",I=Math.round(50*S),c.style.left=I+"px",P.scale(S,S),d.width=Math.round(800*S),d.height=Math.round(520*S),T.scale(S,S),s.width=Math.round(640*S),s.height=Math.round(360*S),C=Math.round(80*S),s.style.top=C+"px",I=Math.round(80*S),s.style.left=I+"px",p.scale(S,S),f.width=Math.round(800*S),f.height=Math.round(520*S),y.scale(S,S),pe?setTimeout((function(){window.scrollTo(0,o),Me()}),500):(window.scrollTo(0,o),Me()),Xe(),Je(),Qe(),at(),ot()||tt()}function Se(){c.width=c.width,P.strokeStyle="lightgrey",P.fillStyle="lightgrey",P.beginPath(),P.moveTo(75,30),P.bezierCurveTo(90,20,90,20,85,10),P.bezierCurveTo(85,25,85,25,75,30),P.closePath(),P.stroke(),P.fill(),P.beginPath(),P.moveTo(30,95),P.bezierCurveTo(40,98,40,98,50,95),P.bezierCurveTo(40,95,40,95,30,95),P.closePath(),P.stroke(),P.fill(),W[21]=new Image(100,100),W[21].src=c.toDataURL("image/png"),W[21].onload=function(){Je(),we(),h.addEventListener("mousemove",Ze),h.addEventListener("mousedown",$e),h.addEventListener("mouseup",et),h.addEventListener("touchmove",Ze),h.addEventListener("touchstart",$e),h.addEventListener("touchend",et),a.addEventListener("touchmove",(function(e){e.preventDefault()})),window.addEventListener("resize",we),E=setInterval(lt,1),se=1,ue=1}}function Ce(){c.width=c.width,P.strokeStyle="lightgrey",P.fillStyle="lightgrey",P.beginPath(),P.moveTo(75,50),P.bezierCurveTo(90,20,90,20,65,30),P.bezierCurveTo(85,25,85,25,75,50),P.closePath(),P.stroke(),P.fill(),P.beginPath(),P.moveTo(10,45),P.bezierCurveTo(1,44,1,44,5,45),P.bezierCurveTo(8,46,8,46,10,45),P.closePath(),P.stroke(),P.fill(),P.beginPath(),P.moveTo(30,85),P.bezierCurveTo(40,98,40,98,50,85),P.bezierCurveTo(40,95,40,95,30,85),P.closePath(),P.stroke(),P.fill(),W[20]=new Image(100,100),W[20].src=c.toDataURL("image/png"),W[20].onload=Se}function Ie(){c.width=c.width,P.strokeStyle="lightgrey",P.fillStyle="lightgrey",P.beginPath(),P.moveTo(55,60),P.bezierCurveTo(90,20,90,20,45,40),P.bezierCurveTo(85,25,85,25,55,60),P.closePath(),P.stroke(),P.fill(),P.beginPath(),P.moveTo(30,45),P.bezierCurveTo(1,54,1,54,25,65),P.bezierCurveTo(8,56,8,56,30,45),P.closePath(),P.stroke(),P.fill(),P.beginPath(),P.moveTo(30,75),P.bezierCurveTo(40,98,40,98,50,75),P.bezierCurveTo(40,95,40,95,30,75),P.closePath(),P.stroke(),P.fill(),W[19]=new Image(100,100),W[19].src=c.toDataURL("image/png"),W[19].onload=Ce}function ke(){c.width=c.width,P.strokeStyle="lightgrey",P.fillStyle="lightgrey",P.beginPath(),P.moveTo(55,60),P.bezierCurveTo(90,20,90,20,45,40),P.bezierCurveTo(80,30,80,30,55,60),P.closePath(),P.stroke(),P.fill(),P.beginPath(),P.moveTo(30,45),P.bezierCurveTo(2,55,2,55,25,65),P.bezierCurveTo(12,57,12,57,30,45),P.closePath(),P.stroke(),P.fill(),P.beginPath(),P.moveTo(30,75),P.bezierCurveTo(40,97,40,97,50,75),P.bezierCurveTo(40,90,40,90,30,75),P.closePath(),P.stroke(),P.fill(),W[18]=new Image(100,100),W[18].src=c.toDataURL("image/png"),W[18].onload=Ie}function xe(){c.width=c.width,P.strokeStyle="lightgrey",P.fillStyle="lightgrey",P.beginPath(),P.moveTo(55,60),P.bezierCurveTo(80,30,80,30,45,40),P.bezierCurveTo(60,40,60,40,55,60),P.closePath(),P.stroke(),P.fill(),P.beginPath(),P.moveTo(30,45),P.bezierCurveTo(4,57,4,57,25,65),P.bezierCurveTo(17,55,17,55,30,45),P.closePath(),P.stroke(),P.fill(),P.beginPath(),P.moveTo(30,75),P.bezierCurveTo(40,95,40,95,50,75),P.bezierCurveTo(40,80,40,80,30,75),P.closePath(),P.stroke(),P.fill(),W[17]=new Image(100,100),W[17].src=c.toDataURL("image/png"),W[17].onload=ke}function Le(){c.width=c.width,P.strokeStyle="lightgrey",P.fillStyle="lightgrey",P.beginPath(),P.moveTo(55,60),P.bezierCurveTo(70,40,70,40,45,40),P.bezierCurveTo(60,48,60,48,55,60),P.closePath(),P.stroke(),P.fill(),P.beginPath(),P.moveTo(30,45),P.bezierCurveTo(7,57,7,57,25,65),P.bezierCurveTo(17,55,17,55,30,45),P.closePath(),P.stroke(),P.fill(),P.beginPath(),P.moveTo(30,75),P.bezierCurveTo(40,90,40,90,50,75),P.bezierCurveTo(40,80,40,80,30,75),P.closePath(),P.stroke(),P.fill(),W[16]=new Image(100,100),W[16].src=c.toDataURL("image/png"),W[16].onload=xe}function Re(){c.width=c.width,P.strokeStyle="lightgrey",P.fillStyle="lightgrey",P.beginPath(),P.moveTo(55,60),P.bezierCurveTo(60,48,60,48,45,40),P.bezierCurveTo(55,50,55,50,55,60),P.closePath(),P.stroke(),P.fill(),P.beginPath(),P.moveTo(30,45),P.bezierCurveTo(17,55,17,55,25,65),P.bezierCurveTo(22,55,22,55,30,45),P.closePath(),P.stroke(),P.fill(),P.beginPath(),P.moveTo(30,75),P.bezierCurveTo(40,85,40,85,50,75),P.bezierCurveTo(40,80,40,80,30,75),P.closePath(),P.stroke(),P.fill(),W[15]=new Image(100,100),W[15].src=c.toDataURL("image/png"),W[15].onload=Le}function ze(){c.width=c.width,P.fillStyle="lightgrey",P.beginPath(),P.moveTo(50,50),P.arc(50,50,32,0,2*Math.PI),P.closePath(),P.fill(),W[14]=new Image(100,100),W[14].src=c.toDataURL("image/png"),W[14].onload=Re}function Ee(){c.width=c.width,P.fillStyle="lightgrey",P.beginPath(),P.moveTo(50,50),P.arc(50,50,16,0,2*Math.PI),P.closePath(),P.fill(),W[13]=new Image(100,100),W[13].src=c.toDataURL("image/png"),W[13].onload=ze}function De(){c.width=c.width,P.fillStyle="lightgrey",P.beginPath(),P.moveTo(50,50),P.arc(50,50,8,0,2*Math.PI),P.closePath(),P.fill(),W[12]=new Image(100,100),W[12].src=c.toDataURL("image/png"),W[12].onload=Ee}function Ge(){c.width=c.width,P.fillStyle="lightgrey",P.beginPath(),P.moveTo(50,50),P.arc(50,50,4,0,2*Math.PI),P.closePath(),P.fill(),W[11]=new Image(100,100),W[11].src=c.toDataURL("image/png"),W[11].onload=De}function Ue(){c.width=c.width,P.fillStyle="lightgrey",P.beginPath(),P.moveTo(50,50),P.arc(50,50,2,0,2*Math.PI),P.closePath(),P.fill(),W[10]=new Image(100,100),W[10].src=c.toDataURL("image/png"),W[10].onload=Ge}function qe(){c.width=c.width,P.fillStyle="orange",P.beginPath(),P.moveTo(50,50),P.arc(50,50,10,0,2*Math.PI),P.closePath(),P.fill(),P.fillStyle="orange",P.strokeStyle="orange",P.beginPath(),P.moveTo(55,50),P.lineTo(50+50*Math.cos(j),50-50*Math.sin(j)),P.lineTo(50,45),P.closePath(),P.stroke(),P.fill(),P.moveTo(50,45),P.lineTo(50-50*Math.cos(j),50-50*Math.sin(j)),P.lineTo(45,50),P.closePath(),P.stroke(),P.fill(),P.moveTo(45,50),P.lineTo(50-50*Math.cos(j),50+50*Math.sin(j)),P.lineTo(50,55),P.closePath(),P.stroke(),P.fill(),P.moveTo(50,55),P.lineTo(50+50*Math.cos(j),50+50*Math.sin(j)),P.lineTo(55,50),P.closePath(),P.stroke(),P.fill(),W[9]=new Image(100,100),W[9].src=c.toDataURL("image/png"),W[9].onload=Ue}function Ae(){c.width=c.width,P.fillStyle="orange",P.beginPath(),P.moveTo(50,50),P.arc(50,50,10,0,2*Math.PI),P.closePath(),P.fill(),P.fillStyle="orange",P.strokeStyle="orange",P.beginPath(),P.moveTo(55,50),P.lineTo(50+40*Math.cos(j),50-40*Math.sin(j)),P.lineTo(50,45),P.closePath(),P.stroke(),P.fill(),P.moveTo(50,45),P.lineTo(50-40*Math.cos(j),50-40*Math.sin(j)),P.lineTo(45,50),P.closePath(),P.stroke(),P.fill(),P.moveTo(45,50),P.lineTo(50-40*Math.cos(j),50+40*Math.sin(j)),P.lineTo(50,55),P.closePath(),P.stroke(),P.fill(),P.moveTo(50,55),P.lineTo(50+40*Math.cos(j),50+40*Math.sin(j)),P.lineTo(55,50),P.closePath(),P.stroke(),P.fill(),W[8]=new Image(100,100),W[8].src=c.toDataURL("image/png"),W[8].onload=qe}function Be(){c.width=c.width,P.fillStyle="orange",P.beginPath(),P.moveTo(50,50),P.arc(50,50,10,0,2*Math.PI),P.closePath(),P.fill(),P.fillStyle="orange",P.strokeStyle="orange",P.beginPath(),P.moveTo(55,50),P.lineTo(50+30*Math.cos(j),50-30*Math.sin(j)),P.lineTo(50,45),P.closePath(),P.stroke(),P.fill(),P.moveTo(50,45),P.lineTo(50-30*Math.cos(j),50-30*Math.sin(j)),P.lineTo(45,50),P.closePath(),P.stroke(),P.fill(),P.moveTo(45,50),P.lineTo(50-30*Math.cos(j),50+30*Math.sin(j)),P.lineTo(50,55),P.closePath(),P.stroke(),P.fill(),P.moveTo(50,55),P.lineTo(50+30*Math.cos(j),50+30*Math.sin(j)),P.lineTo(55,50),P.closePath(),P.stroke(),P.fill(),W[7]=new Image(100,100),W[7].src=c.toDataURL("image/png"),W[7].onload=Ae}function Oe(){c.width=c.width,P.fillStyle="orange",P.beginPath(),P.moveTo(50,50),P.arc(50,50,10,0,2*Math.PI),P.closePath(),P.fill(),P.fillStyle="orange",P.strokeStyle="orange",P.beginPath(),P.moveTo(55,50),P.lineTo(50+20*Math.cos(j),50-20*Math.sin(j)),P.lineTo(50,45),P.closePath(),P.stroke(),P.fill(),P.moveTo(50,45),P.lineTo(50-20*Math.cos(j),50-20*Math.sin(j)),P.lineTo(45,50),P.closePath(),P.stroke(),P.fill(),P.moveTo(45,50),P.lineTo(50-20*Math.cos(j),50+20*Math.sin(j)),P.lineTo(50,55),P.closePath(),P.stroke(),P.fill(),P.moveTo(50,55),P.lineTo(50+20*Math.cos(j),50+20*Math.sin(j)),P.lineTo(55,50),P.closePath(),P.stroke(),P.fill(),W[6]=new Image(100,100),W[6].src=c.toDataURL("image/png"),W[6].onload=Be}function _e(){c.width=c.width,P.fillStyle="rgba(255,165,0,0)",P.beginPath(),P.moveTo(50,50),P.arc(50,50,15,0,2*Math.PI),P.closePath(),P.fill(),W[5]=new Image(100,100),W[5].src=c.toDataURL("image/png"),W[5].onload=Oe}function je(){c.width=c.width,P.fillStyle="orange",P.beginPath(),P.moveTo(50,50),P.arc(50,50,12,0,2*Math.PI),P.closePath(),P.fill(),P.fillStyle="black",P.beginPath(),P.moveTo(50,50),P.arc(50,50,6,0,2*Math.PI),P.closePath(),P.fill(),W[4]=new Image(100,100),W[4].src=c.toDataURL("image/png"),W[4].onload=_e}function We(){c.width=c.width,P.fillStyle="orange",P.beginPath(),P.moveTo(50,50),P.arc(50,50,14,0,2*Math.PI),P.closePath(),P.fill(),P.fillStyle="black",P.beginPath(),P.moveTo(50,50),P.arc(50,50,7,0,2*Math.PI),P.closePath(),P.fill(),W[3]=new Image(100,100),W[3].src=c.toDataURL("image/png"),W[3].onload=je}function Ye(){c.width=c.width,P.fillStyle="orange",P.beginPath(),P.moveTo(50,50),P.arc(50,50,16,0,2*Math.PI),P.closePath(),P.fill(),P.fillStyle="black",P.beginPath(),P.moveTo(50,50),P.arc(50,50,8,0,2*Math.PI),P.closePath(),P.fill(),W[2]=new Image(100,100),W[2].src=c.toDataURL("image/png"),W[2].onload=We}function He(){c.width=c.width,P.fillStyle="orange",P.beginPath(),P.moveTo(50,50),P.arc(50,50,18,0,2*Math.PI),P.closePath(),P.fill(),P.fillStyle="black",P.beginPath(),P.moveTo(50,50),P.arc(50,50,9,0,2*Math.PI),P.closePath(),P.fill(),W[1]=new Image(100,100),W[1].src=c.toDataURL("image/png"),W[1].onload=Ye}function Ve(){c.width=100,c.height=100,P.fillStyle="orange",P.beginPath(),P.moveTo(50,50),P.arc(50,50,20,0,2*Math.PI),P.closePath(),P.fill(),P.fillStyle="black",P.beginPath(),P.moveTo(50,50),P.arc(50,50,10,0,2*Math.PI),P.closePath(),P.fill(),W[0]=new Image(100,100),W[0].src=c.toDataURL("image/png"),W[0].onload=He}function Xe(){var e=T.createLinearGradient(0,0,800,520);e.addColorStop(1,"rgb(102,0,0)"),e.addColorStop(0,"rgb(150,0,0)"),T.fillStyle=e,T.fillRect(0,0,800,520)}function Je(){y.clearRect(0,0,800,520);for(var e=0;e<ce;e++)y.drawImage(re[0],Math.round(50+25*e),15)}function Fe(){if(q=new(window.AudioContext||window.webkitAudioContext),(O=q.createGain()).connect(q.destination),!ve){ve=1;var e=new XMLHttpRequest;e.open("GET",w.a,!0),e.responseType="arraybuffer",e.onload=function(){q.decodeAudioData(e.response,(function(e){A=e,be=1}))},e.send()}if(!Pe){Pe=1;var t=new XMLHttpRequest;t.open("GET",S.a,!0),t.responseType="arraybuffer",t.onload=function(){q.decodeAudioData(t.response,(function(e){B=e,me=1}))},t.send()}}function Ke(e){if(c.width=c.width,e>15)!function(){c.width=c.width;var e=P.createRadialGradient(Math.round(5),Math.round(5),0,Math.round(5),Math.round(5),(1+1/Math.sqrt(2))*X);e.addColorStop(0,"white"),e.addColorStop(.2,"red"),e.addColorStop(1,"black"),P.fillStyle=e,P.beginPath(),P.moveTo(10,10),P.arc(10,10,X,0,2*Math.PI),P.closePath(),P.fill(),ge.src=c.toDataURL("image/png"),ge.onload=Ve}();else{var t=P.createRadialGradient(Math.round(5),Math.round(5),0,Math.round(5),Math.round(5),(1+1/Math.sqrt(2))*X);t.addColorStop(0,"white"),t.addColorStop(.2,oe[e]),t.addColorStop(1,"black"),P.fillStyle=t,P.beginPath(),P.moveTo(10,10),P.arc(10,10,X,0,2*Math.PI),P.closePath(),P.fill(),re[e]=new Image(20,20),re[e].src=c.toDataURL("image/png"),re[e].onload=function(){Ke(e+1)}}}function Ne(){/Android|iPhone|iPad|iPod|webOS|Blackberry|IEMobile|Opera Mini/i.test(navigator.userAgent)&&(pe=1),/iPhone|iPad|iPod/i.test(navigator.userAgent),Te=1,Xe(),F=[180,180,200,220,160,140,210,190,170,150,200,180,160,190,170,180],K=[575,65,65,65,65,65,65+J,65+J,65+J,65+J,65+2*J,65+2*J,65+2*J,65+3*J,65+3*J,65+4*J],N=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],Q=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],Z=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],he=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],ce=5,de=0,se=0,fe=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],V=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],m.fillStyle="black",m.fillRect(0,0,800,520),Qe(),ue?(E=setInterval(lt,1),se=1,Je()):function(){v.fillStyle="rgb(102,34,0)",v.beginPath(),v.moveTo(350,15),v.lineTo(262,13),v.lineTo(262,2),v.lineTo(350,0),v.lineTo(350,15),v.closePath(),v.fill(),v.fillStyle="rgb(191,191,191)",v.beginPath(),v.moveTo(262,13),v.lineTo(175,12),v.lineTo(175,3),v.lineTo(262,2),v.lineTo(262,13),v.closePath(),v.fill(),v.fillStyle="rgb(255,212,128)",v.beginPath(),v.moveTo(175,12),v.lineTo(10,9),v.lineTo(10,6),v.lineTo(175,3),v.lineTo(175,12),v.closePath(),v.fill();var e=v.createLinearGradient(0,0,0,15);e.addColorStop(0,"rgba(255,255,255,0)"),e.addColorStop(.5,"rgba(255,255,255,0.6)"),e.addColorStop(1,"rgba(255,255,255,0)"),v.fillStyle=e,v.beginPath(),v.moveTo(350,15),v.lineTo(10,9),v.lineTo(10,6),v.lineTo(350,0),v.lineTo(350,15),v.closePath(),v.fill(),v.fillStyle="black",v.beginPath(),v.moveTo(350,0),v.bezierCurveTo(360,1,360,14,350,15),v.lineTo(350,0),v.closePath(),v.fill(),ae.src=i.toDataURL("image/png"),ae.onload=function(){Ke(0)}}()}function Qe(){b.fillStyle="rgb(0,70,0)",b.fillRect(0,0,700,420);var e,t,o,a,l=g.createRadialGradient(320/3,180,0,320/3,180,200);l.addColorStop(0,"seagreen"),l.addColorStop(1,"rgb(0,70,0)"),g.fillStyle=l,g.save(),g.transform(3,0,0,1,0,0),g.fillRect(0,0,640/3,360),g.restore(),g.fillStyle="black",g.beginPath(),g.moveTo(0,0),g.arc(0,0,22,0,2*Math.PI),g.closePath(),g.fill(),g.fillStyle="black",g.beginPath(),g.moveTo(0,360),g.arc(0,360,22,0,2*Math.PI),g.closePath(),g.fill(),g.fillStyle="black",g.beginPath(),g.moveTo(640,0),g.arc(640,0,22,0,2*Math.PI),g.closePath(),g.fill(),g.fillStyle="black",g.beginPath(),g.moveTo(640,360),g.arc(640,360,22,0,2*Math.PI),g.closePath(),g.fill(),g.fillStyle="black",g.beginPath(),g.moveTo(320,0),g.arc(320,-10,22,0,2*Math.PI),g.closePath(),g.fill(),g.fillStyle="black",g.beginPath(),g.moveTo(320,360),g.arc(320,370,22,0,2*Math.PI),g.closePath(),g.fill(),(l=b.createLinearGradient(0,0,30,0)).addColorStop(0,"rgb(128,66,0)"),l.addColorStop(1,"rgb(51,26,0)"),b.fillStyle=l,b.fillRect(0,0,30,420),(l=b.createLinearGradient(0,390,0,420)).addColorStop(1,"rgb(128,66,0)"),l.addColorStop(0,"rgb(51,26,0)"),b.fillStyle=l,b.fillRect(0,390,700,420),(l=b.createLinearGradient(700,210,670,210)).addColorStop(0,"rgb(128,66,0)"),l.addColorStop(1,"rgb(51,26,0)"),b.fillStyle=l,b.fillRect(670,0,30,420),(l=b.createLinearGradient(30,0,30,30)).addColorStop(0,"rgb(128,66,0)"),l.addColorStop(1,"rgb(51,26,0)"),b.fillStyle=l,b.fillRect(0,0,700,30),b.fillStyle="rgba(51,26,0,0.4)";for(var n=0;n<50;n++)o=Math.floor(420*Math.random()),a=Math.floor(420*Math.random()),e=Math.floor(30*Math.random()),t=Math.floor(e+2*Math.random()-1),b.beginPath(),b.moveTo(e,o),b.bezierCurveTo(t,Math.round((o+a)/2),t,Math.round((o+a)/2),e,a),b.lineTo(e,o),b.closePath(),b.fill();for(n=0;n<50;n++)o=Math.floor(420*Math.random()),a=Math.floor(420*Math.random()),e=Math.floor(30*Math.random()),t=Math.floor(e+2*Math.random()-1),b.beginPath(),b.moveTo(e+670,o),b.bezierCurveTo(t+670,Math.round((o+a)/2),t+670,Math.round((o+a)/2),e+670,a),b.lineTo(e+670,o),b.closePath(),b.fill();(l=b.createLinearGradient(30,0,30,30)).addColorStop(0,"rgba(102,51,0,0.4)"),l.addColorStop(1,"rgba(26,13,0,0.4)"),b.fillStyle=l;for(n=0;n<15;n++)e=Math.floor(700*Math.random()),t=Math.floor(700*Math.random()),o=Math.floor(30*Math.random()),a=Math.floor(o+8*Math.random()-4),b.beginPath(),b.moveTo(e,o),b.bezierCurveTo(Math.round((e+t)/2),a,Math.round((e+t)/2),a,t,o),b.lineTo(e,o),b.closePath(),b.fill();(l=b.createLinearGradient(0,390,0,420)).addColorStop(1,"rgba(102,51,0,0.4)"),l.addColorStop(0,"rgba(26,13,0,0.4)"),b.fillStyle=l;for(n=0;n<15;n++)e=Math.floor(700*Math.random()),t=Math.floor(700*Math.random()),o=Math.floor(30*Math.random()),a=Math.floor(o+8*Math.random()-4),b.beginPath(),b.moveTo(e,o+390),b.bezierCurveTo(Math.round((e+t)/2),a+390,Math.round((e+t)/2),a+390,t,o+390),b.lineTo(e,o+390),b.closePath(),b.fill();for(n=0;n<3;n++){b.fillStyle="white";var r=405,i=Math.round(69.5*n+121.5);b.beginPath(),b.moveTo(i,r),b.arc(i,r,3.5,0,2*Math.PI),b.closePath(),b.fill()}for(n=0;n<3;n++){b.fillStyle="white";r=405,i=700-Math.round(69.5*n+121.5);b.beginPath(),b.moveTo(i,r),b.arc(i,r,3.5,0,2*Math.PI),b.closePath(),b.fill()}for(n=0;n<3;n++){b.fillStyle="white";r=15,i=Math.round(69.5*n+121.5);b.beginPath(),b.moveTo(i,r),b.arc(i,r,3.5,0,2*Math.PI),b.closePath(),b.fill()}for(n=0;n<3;n++){b.fillStyle="white";r=15,i=700-Math.round(69.5*n+121.5);b.beginPath(),b.moveTo(i,r),b.arc(i,r,3.5,0,2*Math.PI),b.closePath(),b.fill()}for(n=0;n<3;n++){b.fillStyle="white";r=Math.round(79*n+131),i=15;b.beginPath(),b.moveTo(i,r),b.arc(i,r,3.5,0,2*Math.PI),b.closePath(),b.fill()}for(n=0;n<3;n++){b.fillStyle="white";r=Math.round(79*n+131),i=685;b.beginPath(),b.moveTo(i,r),b.arc(i,r,3.5,0,2*Math.PI),b.closePath(),b.fill()}!function(){var e=b.createLinearGradient(0,0,52,52);e.addColorStop(0,"rgb(128,64,0)"),e.addColorStop(1,"rgb(255,179,102)"),b.fillStyle=e,b.beginPath(),b.moveTo(30,45),b.lineTo(30,52),b.lineTo(0,52),b.lineTo(0,0),b.lineTo(52,0),b.lineTo(52,30),b.closePath(),b.fill(),b.fillStyle="rgb(102,51,0)",b.beginPath(),b.moveTo(30,30),b.arc(30,30,20,0,2*Math.PI),b.closePath(),b.fill(),(e=b.createLinearGradient(15,15,30,30)).addColorStop(1,"black"),e.addColorStop(.25,"rgb(77,40,0)"),b.fillStyle=e,b.beginPath(),b.moveTo(30,30),b.arc(30,30,15,0,2*Math.PI),b.closePath(),b.fill(),(e=b.createLinearGradient(0,420,52,368)).addColorStop(0,"rgb(128,64,0)"),e.addColorStop(1,"rgb(255,179,102)"),b.fillStyle=e,b.fillRect(0,368,52,52),b.fillStyle="rgb(102,51,0)",b.beginPath(),b.moveTo(30,390),b.arc(30,390,20,0,2*Math.PI),b.closePath(),b.fill(),(e=b.createLinearGradient(15,405,30,390)).addColorStop(1,"black"),e.addColorStop(.25,"rgb(77,40,0)"),b.fillStyle=e,b.beginPath(),b.moveTo(30,390),b.arc(30,390,15,0,2*Math.PI),b.closePath(),b.fill(),(e=b.createLinearGradient(700,420,648,368)).addColorStop(0,"rgb(128,64,0)"),e.addColorStop(1,"rgb(255,179,102)"),b.fillStyle=e,b.fillRect(648,368,52,52),b.fillStyle="rgb(102,51,0)",b.beginPath(),b.moveTo(670,390),b.arc(670,390,20,0,2*Math.PI),b.closePath(),b.fill(),(e=b.createLinearGradient(685,405,670,390)).addColorStop(1,"black"),e.addColorStop(.25,"rgb(77,40,0)"),b.fillStyle=e,b.beginPath(),b.moveTo(670,390),b.arc(670,390,15,0,2*Math.PI),b.closePath(),b.fill(),(e=b.createLinearGradient(700,0,648,52)).addColorStop(0,"rgb(128,64,0)"),e.addColorStop(1,"rgb(255,179,102)"),b.fillStyle=e,b.fillRect(648,0,52,52),b.fillStyle="rgb(102,51,0)",b.beginPath(),b.moveTo(670,30),b.arc(670,30,20,0,2*Math.PI),b.closePath(),b.fill(),(e=b.createLinearGradient(685,15,670,30)).addColorStop(1,"black"),e.addColorStop(.25,"rgb(77,40,0)"),b.fillStyle=e,b.beginPath(),b.moveTo(670,30),b.arc(670,30,15,0,2*Math.PI),b.closePath(),b.fill(),(e=b.createLinearGradient(330,0,330,52)).addColorStop(0,"rgb(128,64,0)"),e.addColorStop(.6,"rgb(255,179,102)"),b.fillStyle=e,b.fillRect(330,0,40,52),b.fillStyle="rgb(95,48,0)",b.beginPath(),b.moveTo(350,25),b.arc(350,25,20,0,2*Math.PI),b.closePath(),b.fill(),(e=b.createLinearGradient(350,10,350,25)).addColorStop(1,"black"),e.addColorStop(.05,"rgb(77,40,0)"),b.fillStyle=e,b.beginPath(),b.moveTo(350,25),b.arc(350,25,15,0,2*Math.PI),b.closePath(),b.fill(),(e=b.createLinearGradient(330,420,330,368)).addColorStop(0,"rgb(128,64,0)"),e.addColorStop(.6,"rgb(255,179,102)"),b.fillStyle=e,b.fillRect(330,368,40,52),b.fillStyle="rgb(95,48,0)",b.beginPath(),b.moveTo(350,395),b.arc(350,395,20,0,2*Math.PI),b.closePath(),b.fill(),(e=b.createLinearGradient(350,410,350,395)).addColorStop(1,"black"),e.addColorStop(.05,"rgb(77,40,0)"),b.fillStyle=e,b.beginPath(),b.moveTo(350,395),b.arc(350,395,15,0,2*Math.PI),b.closePath(),b.fill()}()}function Ze(e){if(e.preventDefault(),!ne&&!ot()){var t=h.getBoundingClientRect(),o=(e.clientX||e.targetTouches[0].clientX)-t.left,a=(e.clientY||e.targetTouches[0].clientY)-t.top,l=800/h.width;G=Math.atan2(F[0]+80-a*l,K[0]+80-o*l),tt()}}function $e(e){!Te||be&&me||Fe(),ne||e.targetTouches&&e.targetTouches.length>1||(e.preventDefault(),ot()||(Ze(e),D=setInterval((function(){le<=120&&(le++,tt())}),10),de=1))}function et(e){ne||e.targetTouches&&e.targetTouches.length>1||(e.preventDefault(),ot()||(U=le/30,de&&(clearInterval(D),de=0),ne=1,D=setInterval((function(){le>=X?(le-=5,tt()):(N[0]=U*Math.cos(G+Math.PI),Q[0]=U*Math.sin(G+Math.PI),de&&(clearInterval(D),de=0),m.clearRect(0,0,800,520),le=20,O.gain.setValueAtTime(1,q.currentTime),st(),ne=0)}),1),de=1))}function tt(){m.clearRect(0,0,800,520),m.save(),m.translate(K[0]+80,F[0]+80),m.rotate(G),m.drawImage(ae,-10+le,-7),m.restore()}function ot(){for(var e=0;e<16;e++)if(0!=N[e]||0!=Q[e])return 1;return 0}function at(){!function(){for(var e,t,o,a,l,n,r,i,h,c=0;c<K.length;c++)for(var d=0;d<F.length;d++)c!=d&&Z[c]&&Z[d]&&(e=K[c]-K[d],t=F[c]-F[d],(o=Math.sqrt(e*e+t*t))<20&&(a=(K[c]+K[d])/2,l=(F[c]+F[d])/2,e=K[c]-a,t=F[c]-l,o=Math.sqrt(e*e+t*t),n=a+(e=X*e/o),i=l+(t=X*t/o),e=K[d]-a,t=F[d]-l,o=Math.sqrt(e*e+t*t),r=a+(e=X*e/o),h=l+(t=X*t/o),n<X&&(r+=X-n,n=X),r<X&&(n+=X-r,r=X),n>629&&(r-=n-639+X,n=629),r>629&&(n-=r-639+X,r=629),i<X&&(h+=X-i,i=X),h<X&&(i+=X-h,h=X),i>349&&(h-=i-359+X,i=349),h>349&&(i-=h-359+X,h=349),K[c]=Math.round(n),F[c]=Math.round(i),K[d]=Math.round(r),F[d]=Math.round(h)))}(),u.clearRect(0,0,640,360),p.clearRect(0,0,640,360);for(var e=0;e<K.length;e++)Z[e]&&(u.drawImage(re[e],K[e]-X,F[e]-X),p.save(),p.globalAlpha=he[e],p.drawImage(ge,K[e]-X,F[e]-X),p.restore()),-1!=V[e]&&p.drawImage(W[V[e]],K[e]-X-40,F[e]-X-40);ot()||(nt(K[0],F[0])&&(K[0]=575,F[0]=180,Z[0]=1,at()),tt()),function(){for(var e=1;e<16;e++)if(Z[e])return;t=g.createLinearGradient(320,170,320,190),t.addColorStop(0,"yellow"),t.addColorStop(1,"rgb(255,102,0)"),g.fillStyle=t,g.strokeStyle="black",g.lineWidth=3,g.font="36px impact",g.textAlign="center",g.textBaseline="middle",g.strokeText("You Win!",320,180),g.fillText("You Win!",320,180),setTimeout((function(){se&&(clearInterval(E),se=0),de&&(clearInterval(D),de=0);for(var e=0;e<16;e++)fe[e]&&(clearInterval(ie[e]),fe[e],he[e]=0),H[e]&&(clearInterval(Y[e]),H[e]=0);Ne()}),5e3);var t}()}function lt(){for(var e=0;e<16;e++)if(0!=N[e]||0!=Q[e]){var t=Math.atan2(Q[e],N[e]);Q[e]-=.002*Math.sin(t),N[e]-=.002*Math.cos(t),.002>=Math.sqrt(N[e]*N[e]+Q[e]*Q[e])&&(N[e]=0,Q[e]=0)}for(e=0;e<K.length;e++)for(var o=0;o<K.length;o++)e!==o&&Z[e]&&Z[o]&&rt(K[e]+N[e],F[e]+N[e],K[o]+N[o],F[o]+Q[o])&&dt(e,o);for(e=0;e<K.length;e++)nt(K[e],F[e])?(Z[e]=0,N[e]=0,Q[e]=0,fe[e]&&(clearInterval(ie[e]),fe[e]=0,he[e]=0)):((K[e]+X+N[e]>=640||K[e]-X+N[e]<0)&&(N[e]*=-1),(F[e]+X+Q[e]>=360||F[e]-X+Q[e]<0)&&(Q[e]*=-1),K[e]+=N[e],F[e]+=Q[e]);at()}function nt(e,t){var o=e-0,a=t-0,l=Math.sqrt(o*o+a*a);return l<=22?1:(o=e-640,a=t-0,(l=Math.sqrt(o*o+a*a))<=22?1:(o=e-0,a=t-360,(l=Math.sqrt(o*o+a*a))<=22?1:(o=e-640,a=t-360,(l=Math.sqrt(o*o+a*a))<=22?1:(o=e-320,a=t-0,(l=Math.sqrt(o*o+a*a))<=22?1:(o=e-320,a=t-360,(l=Math.sqrt(o*o+a*a))<=22?1:0)))))}function rt(e,t,o,a){var l=e-o,n=t-a;return Math.sqrt(l*l+n*n)<=20?1:0}function it(e){ie[e]=setInterval((function(){ct(e)}),1e3),fe[e]=1}function ht(e){for(var t=1;t<16;t++)e!==t&&Math.sqrt((K[t]-K[e])*(K[t]-K[e])+(F[t]-F[e])*(F[t]-F[e]))<=50&&(fe[t]||Z[t]&&it(t));H[e]||(!function(){if(!me)return;O.gain.setValueAtTime(1,q.currentTime),_&&_.stop();var e=q.createBufferSource();e.connect(O),e.buffer=B,e.start?e.start(0):e.play?e.play(0):e.noteOn&&e.noteOn(0);_=e}(),V[e]=0,Y[e]=setInterval((function(){V[e]<21?V[e]++:(V[e]=-1,H[e]&&(H[e]=0,clearInterval(Y[e])))}),30),H[e]=1)}function ct(e){if(he[e]>=1)return 1===ce?(fe[e]&&(clearInterval(ie[e]),fe[e]=0),he[e]=0,ht(e),ce--,Je(),Z[e]=0,at(),(t=g.createLinearGradient(320,170,320,190)).addColorStop(0,"yellow"),t.addColorStop(1,"rgb(255,102,0)"),g.fillStyle=t,g.strokeStyle="black",g.lineWidth=3,g.font="36px impact",g.textAlign="center",g.textBaseline="middle",g.strokeText("You Lose!",320,180),g.fillText("You Lose!",320,180),void setTimeout((function(){se&&(clearInterval(E),se=0),de&&(clearInterval(D),de=0);for(var e=0;e<16;e++)fe[e]&&(clearInterval(ie[e]),fe[e],he[e]=0),H[e]&&(clearInterval(Y[e]),H[e]=0);Ne()}),5e3)):(ht(e),ce--,Je(),Z[e]=0,fe[e]&&(clearInterval(ie[e]),fe[e]=0),void(he[e]=0));var t;he[e]+=1/60}function dt(e,t){if(0!==N[e]||0!==Q[e]||0!==N[t]||0!==Q[t]){0===e&&0===he[t]&&(fe[t]||(ie[t]=setInterval((function(){ct(t)}),1e3),fe[t]=1)),0===t&&0===he[e]&&(fe[e]||(ie[e]=setInterval((function(){ct(e)}),1e3),fe[e]=1));var o=Math.atan2(F[t]-F[e],K[t]-K[e]),a=Math.sin(o),l=Math.cos(o),n=(N[e]-N[t])*a*a-(Q[e]-Q[t])*a*l+N[t],r=(Q[e]-Q[t])*l*l-(N[e]-N[t])*a*l+Q[t],i=((N[e]-N[t])*l+(Q[e]-Q[t])*a)*l+N[t],h=((N[e]-N[t])*l+(Q[e]-Q[t])*a)*a+Q[t];N[e]=n,Q[e]=r,N[t]=i,Q[t]=h;var c=Math.sqrt((N[e]-N[t])*(N[e]-N[t])+(Q[e]-Q[t])*(Q[e]-Q[t]));c>4?O.gain.setValueAtTime(1,q.currentTime):O.gain.setValueAtTime(Math.pow(c/4,5.6),q.currentTime),st()}}function st(){if(be){_&&_.stop();var e=q.createBufferSource();e.connect(O),e.buffer=A,e.start?e.start(0):e.play?e.play(0):e.noteOn&&e.noteOn(0),_=e}}var ft=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&z(e,t)}(E,e);var t,o,w,S,C=(t=E,function(){var e,o=R(t);if(L()){var a=R(this).constructor;e=Reflect.construct(o,arguments,a)}else e=o.apply(this,arguments);return x(this,e)});function E(){return I(this,E),C.apply(this,arguments)}return o=E,(w=[{key:"componentDidMount",value:function(){a=document.getElementById("scrollPreventCanvas"),l=document.getElementById("myCanvas"),g=l.getContext("2d"),n=document.getElementById("ballCanvas"),u=n.getContext("2d"),r=document.getElementById("tableCanvas"),b=r.getContext("2d"),i=document.getElementById("cueCanvas"),v=i.getContext("2d"),h=document.getElementById("cursorCanvas"),m=h.getContext("2d"),c=document.getElementById("imageCanvas"),P=c.getContext("2d"),d=document.getElementById("floorCanvas"),T=d.getContext("2d"),s=document.getElementById("explodingCanvas"),p=s.getContext("2d"),f=document.getElementById("livesCanvas"),y=f.getContext("2d"),document.documentElement.style.overflow="hidden",document.body.scroll="no",Ne()}},{key:"render",value:function(){return M.createElement("div",null,M.createElement("canvas",{id:"scrollPreventCanvas",width:"640",height:"360",style:{position:"absolute",top:"80",left:"80",zIndex:0,border:"0px solid black"}}),M.createElement("canvas",{id:"myCanvas",width:"640",height:"360",style:{position:"absolute",top:"80",left:"80",zIndex:4,border:"0px solid black"}}),M.createElement("canvas",{id:"ballCanvas",width:"640",height:"360",style:{position:"absolute",top:"80",left:"80",zIndex:5,border:"0px solid black"}}),M.createElement("canvas",{id:"tableCanvas",width:"700",height:"420",style:{position:"absolute",top:"50",left:"50",zIndex:3,border:"0px solid black"}}),M.createElement("canvas",{id:"cueCanvas",width:"370",height:"15",style:{position:"absolute",top:"50",left:"50",zIndex:2,border:"0px solid black"}}),M.createElement("canvas",{id:"cursorCanvas",width:"800",height:"520",style:{position:"absolute",top:"0",left:"0",zIndex:7,border:"0px solid black"}}),M.createElement("canvas",{id:"imageCanvas",width:"20",height:"20",style:{position:"absolute",top:"50",left:"50",zIndex:2,border:"0px solid black"}}),M.createElement("canvas",{id:"floorCanvas",width:"800",height:"520",style:{position:"absolute",top:"0",left:"0",zIndex:1,border:"0px solid black"}}),M.createElement("canvas",{id:"explodingCanvas",width:"640",height:"360",style:{position:"absolute",top:"80",left:"80",zIndex:6,border:"0px solid black"}}),M.createElement("canvas",{id:"livesCanvas",width:"800",height:"520",style:{position:"absolute",top:"0",left:"0",zIndex:2,border:"0px solid black"}}))}}])&&k(o.prototype,w),S&&k(o,S),E}(M.Component)}}]);