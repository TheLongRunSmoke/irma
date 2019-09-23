!function(n){var e={};function t(r){if(e[r])return e[r].exports;var a=e[r]={i:r,l:!1,exports:{}};return n[r].call(a.exports,a,a.exports,t),a.l=!0,a.exports}t.m=n,t.c=e,t.d=function(n,e,r){t.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:r})},t.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},t.t=function(n,e){if(1&e&&(n=t(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var a in n)t.d(r,a,function(e){return n[e]}.bind(null,a));return r},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},t.p="",t(t.s=0)}([function(n,e,t){"use strict";t.r(e);t(1);var r=t(8),a=document.getElementById("seed_input"),o=document.getElementById("roll"),i=document.getElementById("about_button"),s=document.getElementById("about"),d=document.getElementById("content"),c=d.getContext("2d"),l=document.getElementById("save"),u=document.getElementById("data_url_link"),f=function(){var n=document.documentElement.clientWidth,e=document.documentElement.clientHeight;d.width=n,d.height=e,d.style.width=n+"px",d.style.height=e+"px",x(a.value)},p=function(){var n=Math.random()<.5?-1:1;a.value=n*Math.floor(1e8+9e8*Math.random()),x(a.value)},h=function(){s.style.display="none"==s.style.display?"":"none"},m=function(){document.onclick=function(n){"none"!=s.style.display&&(n.composedPath().forEach((function(n){n.id})),s.style.display="none")}},g=function(n){var e=d.toDataURL("image/jpeg");u.href=e,u.download=a.value+".jpg",u.click()};Math.seededRandom=function(){var n=arguments.length>0&&void 0!==arguments[0]&&arguments[0];Math.seed=(9301*Math.seed+49297)%233280;var e=Math.seed/233280;return n?e:Math.abs(e)};var v,b=["#ef5350","#ec407a","#ab47bc","#7e57c2","#5c6bc0","#42a5f5","#26c6da","#26a69a","#66bb6a","#9ccc65","#d4e157","#ffee58","#ffca28","#8d6e63","#bdbdbd","#78909c"],y=function n(){var e=Math.seededRandom()*b.length,t=b[Math.floor(e)];return t!=b.last?(b.last=t,t):n()},w=function(){var n=c.canvas.width,e=c.canvas.height,t=Math.seededRandom()*n,r=Math.seededRandom()*e,a=Math.seededRandom()*e/2;a<e/12&&(a=e/12);var o=Math.seededRandom(!0)*a*.7,i=Math.seededRandom(!0)*Math.sqrt(Math.pow(a,2)-Math.pow(o,2)),s=a+Math.sqrt(Math.pow(i,2)+Math.pow(o,2))+Math.seededRandom()*e/3;return c.createRadialGradient(t,r,a,t+o,r+i,s)},x=function(n){if(n&&"-"!==n){Math.seed=a.value;var e=c.canvas.width,t=c.canvas.height;c.clearRect(0,0,e,t);var o,i,s,l,u,f=(o=180*Math.seededRandom(),i=c.canvas.width/2,s=c.canvas.height/2,o=o*Math.PI/180,l=Math.abs(Math.tan(o)*s),u=o<Math.PI/2?s:-s,l>i&&(l=i,u=1/Math.tan(o)*i),c.createLinearGradient(i+l,s+u,i-l,s-u));f.addColorStop(0,y()),f.addColorStop(1,y()),c.fillStyle=f,c.fillRect(0,0,e,t);for(var p=0;p<5;p++){var h=w(),m=y();h.addColorStop(0,m),h.addColorStop(1,m+"00"),c.fillStyle=h,c.fillRect(0,0,e,t)}r.blur(d,50)}};window.onresize=f,f(),o.addEventListener("click",p),l.addEventListener("click",g),i.addEventListener("click",(function(n){n.stopPropagation(),h()})),m(),v=a,["input","keydown","keyup","mousedown","mouseup","select","contextmenu","drop"].forEach((function(n){v.addEventListener(n,(function(){/^-?\d*$/.test(v.value)?(v.oldValue=v.value,v.oldSelectionStart=v.selectionStart,v.oldSelectionEnd=v.selectionEnd):v.hasOwnProperty("oldValue")&&(v.value=v.oldValue,v.setSelectionRange(v.oldSelectionStart,v.oldSelectionEnd)),x(a.value)}))})),function(n){n.addEventListener("click",(function(){return a.setSelectionRange(0,a.value.length)}))}(a),p()},function(n,e,t){var r=t(2);"string"==typeof r&&(r=[[n.i,r,""]]);var a={insert:"head",singleton:!1};t(7)(r,a);r.locals&&(n.exports=r.locals)},function(n,e,t){e=n.exports=t(3)(!1);var r=t(4),a=r(t(5)),o=r(t(6));e.push([n.i,'html, body {\r\n    width: 100%;\r\n    height: 100%;\r\n    padding: 0;\r\n    margin: 0;\r\n    overflow: hidden;\r\n    font-family: Roboto, -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI", "Oxygen", "Ubuntu", "Cantarell", "Open Sans", sans-serif;\r\n    font-size: 20px;\r\n    line-height: 1.5;\r\n    background: white;\r\n    cursor: default;\r\n}\r\n\r\na {\r\n    padding-top: 12px;\r\n    color: white;\r\n}\r\n\r\nh1 {\r\n    font-size: 32px;\r\n}\r\n\r\nh2 {\r\n    font-size: 24px;\r\n}\r\n\r\n.scrimed {\r\n    background: linear-gradient(0deg, #00000000, #00000040);\r\n    border-radius: 0 0 12px 12px;\r\n}\r\n\r\n#panel {\r\n    padding: 12px;\r\n    color: white;\r\n    display: flex;\r\n    align-items: center;\r\n    position: absolute;\r\n}\r\n\r\n.fadeoutable {\r\n    -moz-animation: UIfade 500ms ease-in 2s forwards;\r\n    -webkit-animation: UIfade 500ms ease-in 2s forwards;\r\n    -o-animation: UIfade 500ms ease-in 2s forwards;\r\n    animation: UIfade 500ms ease-in 2s forwards;\r\n    -webkit-animation-fill-mode: forwards;\r\n    animation-fill-mode: forwards;\r\n}\r\n\r\n.fadeoutable:hover {\r\n    -moz-animation: UIappear 500ms ease-in 0s forwards;\r\n    -webkit-animation: UIappear 500ms ease-in 0s forwards;\r\n    -o-animation: UIappear 500ms ease-in 0s forwards;\r\n    animation: UIappear 500ms ease-in 0s forwards;\r\n    -webkit-animation-fill-mode: forwards;\r\n    animation-fill-mode: forwards;\r\n}\r\n\r\n#hint {\r\n    padding: 12px;\r\n    margin: 0;\r\n    color: white;\r\n    position: absolute;\r\n    right: 0;\r\n}\r\n\r\n.centered {\r\n    position: absolute;\r\n    top: 50%;\r\n    left: 50%;\r\n}\r\n\r\n#about {\r\n    width: min-content;\r\n    background-color: rgba(0, 0, 0, 0.5);\r\n    border-radius: 12px;\r\n    position: relative;\r\n    margin-top: -50%;\r\n    left: -50%;\r\n    color: white;\r\n    padding: 24px;\r\n}\r\n\r\ninput {\r\n    outline: none;\r\n}\r\n\r\ninput[type=text] {\r\n    height: 100%;\r\n    width: 120px;\r\n    font-size: 20px;\r\n    line-height: 1.5;\r\n    border: none;\r\n    background: #00000000;\r\n    color: white;\r\n    margin: 0 12px;\r\n}\r\n\r\nbutton {\r\n    outline: none;\r\n    background-color: #00000000;\r\n    border: #00000000;\r\n    margin-right: 12px;\r\n    position: relative;\r\n}\r\n\r\n#roll {\r\n    width: 48px;\r\n    height: 48px;\r\n    background-image: url('+a+");\r\n}\r\n\r\n#save {\r\n    width: 48px;\r\n    height: 48px;\r\n    background-image: url("+o+");\r\n}\r\n\r\n#data_url_link {\r\n    display: none;\r\n}\r\n\r\ncanvas {\r\n    width: 100%;\r\n}\r\n\r\n@keyframes UIfade {\r\n    to {\r\n        opacity: 0;\r\n    }\r\n}\r\n\r\n@-webkit-keyframes UIfade {\r\n    to {\r\n        opacity: 0;\r\n    }\r\n}\r\n\r\n@keyframes UIappear {\r\n    to {\r\n        opacity: 1;\r\n    }\r\n}\r\n\r\n@-webkit-keyframes UIappear {\r\n    to {\r\n        opacity: 1;\r\n    }\r\n}",""])},function(n,e,t){"use strict";n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t=function(n,e){var t=n[1]||"",r=n[3];if(!r)return t;if(e&&"function"==typeof btoa){var a=(i=r,s=btoa(unescape(encodeURIComponent(JSON.stringify(i)))),d="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),"/*# ".concat(d," */")),o=r.sources.map((function(n){return"/*# sourceURL=".concat(r.sourceRoot).concat(n," */")}));return[t].concat(o).concat([a]).join("\n")}var i,s,d;return[t].join("\n")}(e,n);return e[2]?"@media ".concat(e[2],"{").concat(t,"}"):t})).join("")},e.i=function(n,t){"string"==typeof n&&(n=[[null,n,""]]);for(var r={},a=0;a<this.length;a++){var o=this[a][0];null!=o&&(r[o]=!0)}for(var i=0;i<n.length;i++){var s=n[i];null!=s[0]&&r[s[0]]||(t&&!s[2]?s[2]=t:t&&(s[2]="(".concat(s[2],") and (").concat(t,")")),e.push(s))}},e}},function(n,e,t){"use strict";n.exports=function(n,e){return"string"!=typeof(n=n.__esModule?n.default:n)?n:(/^['"].*['"]$/.test(n)&&(n=n.slice(1,-1)),/["'() \t\n]/.test(n)||e?'"'.concat(n.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):n)}},function(n,e,t){n.exports=t.p+"b6045a031f56a8fecae1c605f5012bfc.png"},function(n,e,t){n.exports=t.p+"57297ca627e4bcd70c07ad996091ee7d.png"},function(n,e,t){"use strict";var r,a={},o=function(){return void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r},i=function(){var n={};return function(e){if(void 0===n[e]){var t=document.querySelector(e);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}n[e]=t}return n[e]}}();function s(n,e){for(var t=[],r={},a=0;a<n.length;a++){var o=n[a],i=e.base?o[0]+e.base:o[0],s={css:o[1],media:o[2],sourceMap:o[3]};r[i]?r[i].parts.push(s):t.push(r[i]={id:i,parts:[s]})}return t}function d(n,e){for(var t=0;t<n.length;t++){var r=n[t],o=a[r.id],i=0;if(o){for(o.refs++;i<o.parts.length;i++)o.parts[i](r.parts[i]);for(;i<r.parts.length;i++)o.parts.push(g(r.parts[i],e))}else{for(var s=[];i<r.parts.length;i++)s.push(g(r.parts[i],e));a[r.id]={id:r.id,refs:1,parts:s}}}}function c(n){var e=document.createElement("style");if(void 0===n.attributes.nonce){var r=t.nc;r&&(n.attributes.nonce=r)}if(Object.keys(n.attributes).forEach((function(t){e.setAttribute(t,n.attributes[t])})),"function"==typeof n.insert)n.insert(e);else{var a=i(n.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(e)}return e}var l,u=(l=[],function(n,e){return l[n]=e,l.filter(Boolean).join("\n")});function f(n,e,t,r){var a=t?"":r.css;if(n.styleSheet)n.styleSheet.cssText=u(e,a);else{var o=document.createTextNode(a),i=n.childNodes;i[e]&&n.removeChild(i[e]),i.length?n.insertBefore(o,i[e]):n.appendChild(o)}}function p(n,e,t){var r=t.css,a=t.media,o=t.sourceMap;if(a&&n.setAttribute("media",a),o&&btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),n.styleSheet)n.styleSheet.cssText=r;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(r))}}var h=null,m=0;function g(n,e){var t,r,a;if(e.singleton){var o=m++;t=h||(h=c(e)),r=f.bind(null,t,o,!1),a=f.bind(null,t,o,!0)}else t=c(e),r=p.bind(null,t,e),a=function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(t)};return r(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap)return;r(n=e)}else a()}}n.exports=function(n,e){(e=e||{}).attributes="object"==typeof e.attributes?e.attributes:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=o());var t=s(n,e);return d(t,e),function(n){for(var r=[],o=0;o<t.length;o++){var i=t[o],c=a[i.id];c&&(c.refs--,r.push(c))}n&&d(s(n,e),e);for(var l=0;l<r.length;l++){var u=r[l];if(0===u.refs){for(var f=0;f<u.parts.length;f++)u.parts[f]();delete a[u.id]}}}}},function(n,e){var t=[512,512,456,512,328,456,335,512,405,328,271,456,388,335,292,512,454,405,364,328,298,271,496,456,420,388,360,335,312,292,273,512,482,454,428,405,383,364,345,328,312,298,284,271,259,496,475,456,437,420,404,388,374,360,347,335,323,312,302,292,282,273,265,512,497,482,468,454,441,428,417,405,394,383,373,364,354,345,337,328,320,312,305,298,291,284,278,271,265,259,507,496,485,475,465,456,446,437,428,420,412,404,396,388,381,374,367,360,354,347,341,335,329,323,318,312,307,302,297,292,287,282,278,273,269,265,261,512,505,497,489,482,475,468,461,454,447,441,435,428,422,417,411,405,399,394,389,383,378,373,368,364,359,354,350,345,341,337,332,328,324,320,316,312,309,305,301,298,294,291,287,284,281,278,274,271,268,265,262,259,257,507,501,496,491,485,480,475,470,465,460,456,451,446,442,437,433,428,424,420,416,412,408,404,400,396,392,388,385,381,377,374,370,367,363,360,357,354,350,347,344,341,338,335,332,329,326,323,320,318,315,312,310,307,304,302,299,297,294,292,289,287,285,282,280,278,275,273,271,269,267,265,263,261,259],r=[9,11,12,13,13,14,14,15,15,15,15,16,16,16,16,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24],a=function n(){!function(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n),this.r=0,this.g=0,this.b=0,this.a=0,this.next=null};n.exports={blur:function(n,e){if(!(isNaN(e)||e<1)){e|=0;var o=n.getContext("2d"),i=o.canvas.width,s=o.canvas.height,d=function(n,e,t,r,a){if(!(n&&"getContext"in n))throw new TypeError("Expecting canvas with `getContext` method.");var o=n.getContext("2d");try{return o.getImageData(e,t,r,a)}catch(n){throw new Error("Unable to get image data: "+n)}}(n,0,0,i,s);d=function(n,e,o,i){var s,d,c,l,u,f,p,h,m,g,v,b,y,w,x,M,S,k,E,I,R,C=n.data,U=2*i+1,j=e-1,_=o-1,O=i+1,L=O*(O+1)/2,B=new a,T=B;for(c=1;c<U;c++)T=T.next=new a,c===O&&(R=T);T.next=B;var N=null,P=null;p=f=0;var z=t[i],D=r[i];for(d=0;d<o;d++){for(w=x=M=h=m=g=0,v=O*(S=C[f]),b=O*(k=C[f+1]),y=O*(E=C[f+2]),h+=L*S,m+=L*k,g+=L*E,T=B,c=0;c<O;c++)T.r=S,T.g=k,T.b=E,T=T.next;for(c=1;c<O;c++)l=f+((j<c?j:c)<<2),h+=(T.r=S=C[l])*(I=O-c),m+=(T.g=k=C[l+1])*I,g+=(T.b=E=C[l+2])*I,w+=S,x+=k,M+=E,T=T.next;for(N=B,P=R,s=0;s<e;s++)C[f]=h*z>>D,C[f+1]=m*z>>D,C[f+2]=g*z>>D,h-=v,m-=b,g-=y,v-=N.r,b-=N.g,y-=N.b,l=p+((l=s+i+1)<j?l:j)<<2,h+=w+=N.r=C[l],m+=x+=N.g=C[l+1],g+=M+=N.b=C[l+2],N=N.next,v+=S=P.r,b+=k=P.g,y+=E=P.b,w-=S,x-=k,M-=E,P=P.next,f+=4;p+=e}for(s=0;s<e;s++){for(x=M=w=m=g=h=0,v=O*(S=C[f=s<<2]),b=O*(k=C[f+1]),y=O*(E=C[f+2]),h+=L*S,m+=L*k,g+=L*E,T=B,c=0;c<O;c++)T.r=S,T.g=k,T.b=E,T=T.next;for(u=e,c=1;c<=i;c++)f=u+s<<2,h+=(T.r=S=C[f])*(I=O-c),m+=(T.g=k=C[f+1])*I,g+=(T.b=E=C[f+2])*I,w+=S,x+=k,M+=E,T=T.next,c<_&&(u+=e);for(f=s,N=B,P=R,d=0;d<o;d++)C[l=f<<2]=h*z>>D,C[l+1]=m*z>>D,C[l+2]=g*z>>D,h-=v,m-=b,g-=y,v-=N.r,b-=N.g,y-=N.b,l=s+((l=d+O)<_?l:_)*e<<2,h+=w+=N.r=C[l],m+=x+=N.g=C[l+1],g+=M+=N.b=C[l+2],N=N.next,v+=S=P.r,b+=k=P.g,y+=E=P.b,w-=S,x-=k,M-=E,P=P.next,f+=e}return n}(d,i,s,e),o.putImageData(d,0,0)}}}}]);