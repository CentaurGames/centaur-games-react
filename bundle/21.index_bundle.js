(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{101:function(t,e,n){"use strict";n.r(e),n.d(e,"ChickenWings3",(function(){return Mt})),n.d(e,"default",(function(){return Mt}));var o,r,i,a,c,l,u,d,f,s=n(0),h=n.p+"f52bfd34d4cf854993ca95e63846f77b.png",p=n.p+"397f9904333d1082af5a94114ae6fe69.png",w=n.p+"f9088eb06c609c25cad9c502460cc82c.png",y=n.p+"f54143c825451cdf6404913d743446b9.png",g=n.p+"8bcf2719febe12223ce1c74ac361e715.png",v=h,m=p,b=w,x=y,C=g,E=n(67);function M(t){return(M="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function I(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function R(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function O(t,e){return!e||"object"!==M(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function T(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function k(t){return(k=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function S(t,e){return(S=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var P,B,A,L,_,j,D,z,W,H,X=40,q=20,G=new Array(10),J=new Array(10),N=new Array(10),U=new Array(10),K=15,Y=0,F=0,Q=0,V=1,Z=0,$=0,tt=0,et=0,nt=0,ot=0;function rt(){if(!et){et=1,z=new(window.AudioContext||window.webkitAudioContext),(H=z.createGain()).connect(z.destination);var t=new XMLHttpRequest;t.open("GET",E.a,!0),t.responseType="arraybuffer",t.onload=function(){z.decodeAudioData(t.response,(function(t){W=t,tt=1,function(){if(!tt)return;H.gain.value=.2;var t=z.createBufferSource();t.connect(H),t.buffer=W,t.loop=!0,t.start?t.start(0):t.play?t.play(0):t.noteOn&&t.noteOn(0)}()}))},t.send()}}function it(t){J[t]<0?function(t){G[t]=Math.floor(640*Math.random()),U[t]=Math.random()<.5?-1:1,J[t]=1136,N[t]=.75*Math.random()+.25,Z++,K=Math.floor(Z/5)+15}(t):J[t]-=K,(G[t]<=0||G[t]>=640)&&(U[t]*=-1),G[t]+=3*U[t]}function at(){if(!V){Y+=K,Y%=1136;for(var t=0;t<10;t++)it(t);lt(),function(){for(var t=0;t<10;t++)if(ft(t))return void dt()}()}}function ct(t){u.drawImage(L,0,0,X,q,G[t]-Math.round(X*N[t]/2),J[t]-Math.round(q*N[t]/2),Math.round(X*N[t]),Math.round(q*N[t]))}function lt(){l.clearRect(0,0,640,1136),u.clearRect(0,0,640,1136),d.clearRect(0,0,640,1136),f.clearRect(0,0,640,1136),function(){if(0!==V){f.drawImage(D,(640-1.3*D.width)/2,(1136-1.3*D.height)/2,1.3*D.width,1.3*D.height),f.font="30px helvetica",f.lineWidth=1,f.textAlign="center",f.textBaseline="middle",f.strokeStyle="black",f.fillStyle="black",f.strokeText("CURRENT SCORE: "+Z,320,548),f.fillText("CURRENT SCORE: "+Z,320,548),f.strokeText("BEST SCORE: "+$,320,588),f.fillText("BEST SCORE: "+$,320,588),f.font="20px helvetica",f.fillText("CLICK TO PLAY",320,628)}}(),function(){if(!V){var t=1.3*_.width,e=1.3*_.height;d.drawImage(_,0,0,_.width,_.height,P-t/2,568-e/2,t,e)}}();for(var t=0;t<10;t++)ct(t);l.fillStyle="lightblue",l.fillRect(0,0,640,1136),l.drawImage(A,0,Y,640,1136,0,0,640,1136)}function ut(){F||(B=setInterval((function(){at()}),30),F=1)}function dt(){V=1,lt(),F&&(clearInterval(B),F=0),Z>$&&($=Z)}function ft(t){var e,n;return e=P-G[t],n=568-J[t],Math.sqrt(e*e+n*n)<=75*N[t]}function st(t){t.style.left="0px",t.style.top="0px";var e=t.getBoundingClientRect(),n=e.left,o=e.top,r=(window.innerWidth-t.width)/2;r-=n;var i=(window.innerHeight-t.height)/2;i-=o,t.style.left=r+"px",t.style.top=i+"px"}function ht(){st(r),st(i),st(a),st(c)}function pt(){window.scrollTo(0,0),o.style.left="0px",o.style.top="0px",o.width=window.innerWidth,o.height=window.innerHeight,r.style.left="0px",r.style.top="0px",i.style.left="0px",i.style.top="0px",a.style.left="0px",a.style.top="0px",c.style.left="0px",c.style.top="0px";var t=r.getBoundingClientRect(),e=(t.left,window.innerWidth),n=t.top,s=e/640,h=window.innerHeight/1136,p=s<h?s:h;p>=1&&(p=1),r.width=Math.round(640*p),r.height=Math.round(1136*p),l.scale(p,p),i.width=Math.round(640*p),i.height=Math.round(1136*p),u.scale(p,p),a.width=Math.round(640*p),a.height=Math.round(1136*p),d.scale(p,p),c.width=Math.round(640*p),c.height=Math.round(1136*p),f.scale(p,p),ot?setTimeout((function(){window.scrollTo(0,n),ht()}),500):(window.scrollTo(0,n),ht()),lt()}function wt(t){if(t.preventDefault(),!V){var e=r.getBoundingClientRect(),n=640/r.width;(P=Math.round(((t.clientX||t.targetTouches[0].clientX)-e.left)*n))<0&&(P=0),P>=640&&(P=CanvasWidth-1),lt()}}function yt(t){t.preventDefault(),nt&&!tt&&rt(),1===V&&vt()}function gt(){window.addEventListener("resize",pt),c.addEventListener("mousemove",wt),c.addEventListener("mousedown",yt),c.addEventListener("touchmove",wt),o.addEventListener("touchmove",(function(t){t.preventDefault()}))}function vt(){/iPhone|iPad|iPod|Android|webOS|Blackberry|IEMobile|Opera Mini/i.test(navigator.userAgent)&&(ot=1),/iPhone|iPad|iPod/i.test(navigator.userAgent),nt=1,K=15,V=0,Z=0,P=320,function(){for(var t=0;t<10;t++)G[t]=Math.floor(640*Math.random()),U[t]=Math.random()<.5?-1:1,J[t]=1136*t/10+1136,N[t]=.75*Math.random()+.25}(),Q?(gt(),ut()):((A=new Image).src=v,A.onload=Et)}function mt(){V=1,Q=1,X=L.width,q=L.height,_.width,_.height,gt(),ut(),pt()}function bt(){(D=new Image).src=C,D.onload=mt}function xt(){(j=new Image).src=x,j.onload=bt}function Ct(){(_=new Image).src=b,_.onload=xt}function Et(){(L=new Image).src=m,L.onload=Ct}var Mt=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&S(t,e)}(y,t);var e,n,h,p,w=(e=y,function(){var t,n=k(e);if(T()){var o=k(this).constructor;t=Reflect.construct(n,arguments,o)}else t=n.apply(this,arguments);return O(this,t)});function y(){return I(this,y),w.apply(this,arguments)}return n=y,(h=[{key:"componentDidMount",value:function(){o=document.getElementById("scrollPreventCanvas"),r=document.getElementById("treeCanvas"),l=r.getContext("2d"),i=document.getElementById("mushroomCanvas"),u=i.getContext("2d"),a=document.getElementById("eggCanvas"),d=a.getContext("2d"),c=document.getElementById("replayCanvas"),f=c.getContext("2d"),document.documentElement.style.overflow="hidden",document.body.scroll="no",vt()}},{key:"render",value:function(){return s.createElement("div",null,s.createElement("canvas",{id:"scrollPreventCanvas",width:"640",height:"1136",style:{position:"absolute",top:"0",left:"0",zIndex:0,border:"0px solid black"}}),s.createElement("canvas",{id:"treeCanvas",width:"640",height:"1136",style:{position:"absolute",top:"0",left:"0",zIndex:1,border:"0px solid black"}}),s.createElement("canvas",{id:"mushroomCanvas",width:"640",height:"1136",style:{position:"absolute",top:"0",left:"0",zIndex:2,border:"0px solid black"}}),s.createElement("canvas",{id:"eggCanvas",width:"640",height:"1136",style:{position:"absolute",top:"0",left:"0",zIndex:3,border:"0px solid black"}}),s.createElement("canvas",{id:"replayCanvas",width:"640",height:"1136",style:{position:"absolute",top:"0",left:"0",zIndex:4,border:"0px solid black"}}))}}])&&R(n.prototype,h),p&&R(n,p),y}(s.Component)}}]);