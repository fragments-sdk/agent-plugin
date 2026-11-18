// Copyright 2026 Conan McNicholl. Fragments Local Use License, see LICENSE.
"use strict";var Ht=Object.create;var pe=Object.defineProperty;var Wt=Object.getOwnPropertyDescriptor;var qt=Object.getOwnPropertyNames;var Ut=Object.getPrototypeOf,Dt=Object.prototype.hasOwnProperty;var zt=(e,t)=>{for(var r in t)pe(e,r,{get:t[r],enumerable:!0})},tt=(e,t,r,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of qt(t))!Dt.call(e,n)&&n!==r&&pe(e,n,{get:()=>t[n],enumerable:!(a=Wt(t,n))||a.enumerable});return e};var le=(e,t,r)=>(r=e!=null?Ht(Ut(e)):{},tt(t||!e||!e.__esModule?pe(r,"default",{value:e,enumerable:!0}):r,e)),Gt=e=>tt(pe({},"__esModule",{value:!0}),e);var Rn={};zt(Rn,{CAMERA_LEFTOVER_AGE_MS:()=>jt,CAMERA_MARK:()=>Ke,CAMERA_MARKER:()=>Ve,seeCamera:()=>In,sweepCameraLeftovers:()=>Lt});module.exports=Gt(Rn);var X=le(require("node:fs/promises"),1),Ft=le(require("node:http"),1),Me=le(require("node:os"),1),oe=le(require("node:path"),1);async function me({mode:e,budgetMs:t,maxCss:r=12e3,firstScreenOnly:a=!1,top:n=0,first:i=!0,last:o=!1}){if(!["warm","tile","still"].includes(e)||!Number.isFinite(t)||t<=0||!Number.isSafeInteger(r)||r<=0||r>12e3||typeof a!="boolean"||!Number.isSafeInteger(n)||n<0||n>12e3||typeof i!="boolean"||typeof o!="boolean")throw new Error("Camera viewport preparation received invalid bounds.");let l=performance.now()+t,c=()=>{if(performance.now()>=l)throw new Error("Camera viewport preparation exceeded its page-clock budget.")},h=async w=>{c();let x;try{let s=await Promise.race([w,new Promise((d,u)=>{x=setTimeout(()=>u(new Error("Camera viewport preparation exceeded its page-clock budget.")),Math.max(1,l-performance.now()))})]);return c(),s}finally{clearTimeout(x)}},f=w=>(c(),fragmentsMask.own(w)),g=()=>h(new Promise(w=>requestAnimationFrame(w))),p=()=>Math.max(document.documentElement.scrollHeight,document.body?.scrollHeight||0,innerHeight),T=innerHeight,M=innerWidth,$=p();if(!(T>0&&M>0))throw new Error("The camera viewport has no size.");let C=0,I=0,N=null,D=[],R=0,F=!1,q;f(()=>{let w="[data-studio-unpinned]{visibility:hidden!important;transition:none!important}html{scroll-behavior:auto!important}nextjs-portal,vite-error-overlay,#webpack-dev-server-client-overlay{display:none!important}",x=window.__fragmentsCameraStyle;x?.isConnected||(x=document.createElement("style"),document.documentElement.appendChild(x),window.__fragmentsCameraStyle=x),x.textContent!==w&&(x.textContent=w)});let m=w=>f(()=>scrollTo({left:0,top:w,behavior:"instant"})),b=()=>f(()=>{for(let w of document.getAnimations()){c();try{let x=w.effect?.getComputedTiming().endTime;Number.isFinite(x)&&w.playState==="running"?w.finish():x===1/0&&(w.pause(),w.currentTime=0)}catch{I++}}for(let w of document.querySelectorAll("video, audio"))try{w.pause()}catch{I++}}),S=async()=>{await g(),await g(),await h(document.fonts.ready);let w=[...document.images].filter(x=>{let s=x.getBoundingClientRect();return s.width>0&&s.height>0&&s.bottom>0&&s.top<innerHeight&&s.right>0&&s.left<innerWidth});if(await h(Promise.all(w.map(x=>x.decode().catch(()=>{C++})))),b(),innerHeight!==T||innerWidth!==M)throw new Error("The camera viewport changed size during preparation.")};if(e==="still")b();else if(e==="warm"){let w=a?1:Math.ceil(r/T)+2,x=0;for(let s=0;s<w;s++){c(),m(x),await S();let d=scrollY,u=Math.min(r,p());if(D.push(d),R=Math.max(R,Math.min(u,d+T)),a||Math.ceil(d+T)>=u){!a&&u===p()&&(m(u),q=scrollY+T);break}if(x=Math.min(d+T,Math.max(0,u-T)),x<=d||s===w-1){F=!0;break}}m(0),await S()}else m(n),await S(),f(()=>{let w=new Set([...document.querySelectorAll("body *")].filter(x=>["fixed","sticky"].includes(getComputedStyle(x).position)));for(let x of document.querySelectorAll("[data-studio-unpinned]"))w.has(x)||x.removeAttribute("data-studio-unpinned");for(let x of w){let s=x.getBoundingClientRect(),d=getComputedStyle(x),u=!1;if(s.width*s.height<innerWidth*innerHeight*.6)if(d.position==="fixed"){let y=s.top>innerHeight/2;if(u=y?!o:!i,o&&y&&s.width>0&&s.height>0){let E=Math.max(0,s.left),P=Math.max(0,s.top),j=Math.min(innerWidth,s.right),v=Math.min(innerHeight,s.bottom);j>E&&v>P&&(N=N?[Math.min(N[0],E),Math.min(N[1],P),Math.max(N[2],j),Math.max(N[3],v)]:[E,P,j,v])}}else{let y=parseFloat(d.top);u=!i&&Number.isFinite(y)&&s.top<=y+1}x.toggleAttribute("data-studio-unpinned",u)}}),await g(),await g(),D.push(scrollY),R=Math.min(r,p(),scrollY+T);return c(),{top:scrollY,width:innerWidth,height:innerHeight,initialHeight:$,pageHeight:p(),foot:q,visited:D,warmedHeight:R,growing:p()>$,cut:p()>r,limited:F,failedImages:C,failedAnimations:I,low:N}}function ge(){let e=n=>{let i=[],o=document.createTreeWalker(n,NodeFilter.SHOW_TEXT),l;for(;l=o.nextNode();){if(l.parentElement?.closest("style,script,svg,noscript"))continue;let c=(l.nodeValue||"").trim();c&&i.push(c)}return i.join(`
`).slice(0,2e3)},t=document.querySelector("vite-error-overlay");if(t?.shadowRoot)return{error:(t.shadowRoot.querySelector(".message,.message-body")?.textContent?.trim()||e(t.shadowRoot)).slice(0,1e3),kind:"overlay"};for(let n of document.querySelectorAll("nextjs-portal")){let i=n.shadowRoot;if(!i)continue;let o=i.querySelector("[data-nextjs-dialog-header],[data-nextjs-error-message],[data-nextjs-error-overlay],#nextjs__container_errors_desc"),l=e(o||i);if(o||/Unhandled Runtime Error|Build Error|Server Error|Failed to compile|Runtime Error/i.test(l))return{error:l.slice(0,1e3),kind:"overlay"}}let r=(document.body?.innerText||"").trim(),a=document.body?.querySelector("img,canvas,svg,video,iframe");return!r&&!a?{error:"The page rendered no visible content.",kind:"blank"}:{ok:!0,boundarySuspected:r.length<400&&/something went wrong|application error|an error occurred|unexpected error/i.test(r)}}function nt(){let e=(document.body?.innerText||"").trim();return{password:!!document.querySelector("input[type=password]:not([autocomplete=new-password])"),inputs:document.querySelectorAll("input:not([type=hidden]):not([type=submit]):not([type=button])").length,notFound:e.length<600&&(/\b404\b/.test(e)&&/not\s+(?:be\s+)?found|(?:does|do)\s*n[o']?t\s+exist|no longer exists/i.test(e)||/page\s+not\s+found|page\s+(?:could|can)\s*n[o']?t\s+be\s+found|page\s+(?:does|do)\s*n[o']?t\s+exist/i.test(e))}}var Ne=`<!doctype html><html data-fragments-camera-canary="1"><meta charset="utf-8"><title>Fragments camera canary</title>
<style>@font-face{font-family:FragmentsCameraCanary;src:url('./canary.woff2')}html{color-scheme:light;background:white;color:#17212b;font:20px system-ui;overflow:hidden}body{margin:0}*{caret-color:transparent!important}#scene{position:absolute;left:0;top:0;width:320px;height:480px;padding:20px;box-sizing:border-box;transform-origin:0 0}h1{font:24px system-ui;margin:0}#web{font:20px FragmentsCameraCanary;margin-top:12px}.gradient{position:absolute;left:20px;top:100px;width:120px;height:140px;background:linear-gradient(37deg,#1976d2,#ef5350)}canvas{position:absolute;left:184px;top:100px;width:96px;height:64px}img{position:absolute;left:184px;top:200px;width:96px;height:64px;image-rendering:pixelated}#controls{position:absolute;left:20px;top:300px}#controls>input:not([type]),#controls>select{display:block;width:120px}#probe{position:absolute;left:184px;top:400px;width:24px;height:24px;background:rgb(17,123,231)}</style>
<main id="scene"><h1>System Aa 0123</h1><div id="web">Web Aa 0123</div><div class="gradient"></div><canvas id="canary-canvas" width="96" height="64"></canvas><img id="canary-image" src="./canary.png" alt=""><div id="controls"><input value="Canary" readonly><input type="checkbox" checked><input type="radio" checked><select><option>Canary</option></select></div><div id="probe"></div></main>
<script>const scene=document.querySelector('#scene');scene.style.transform='scale('+Math.min(1,innerWidth/320,innerHeight/480)+')';const canvas=document.querySelector('#canary-canvas'),context=canvas.getContext('2d');context.fillStyle='rgb(29,137,67)';context.fillRect(0,0,96,64);canvas.dataset.ready='1';</script></html>`;async function rt(){if(document.documentElement.dataset.fragmentsCameraCanary!=="1"||document.querySelector("#canary-canvas")?.dataset.ready!=="1")throw new Error("The camera has not loaded its built-in canary.");if(await document.fonts.ready,await document.querySelector("#canary-image").decode(),![...document.fonts].some(t=>t.family==="FragmentsCameraCanary"&&t.status==="loaded"))throw new Error("The camera canary web font did not load.");await new Promise(t=>requestAnimationFrame(()=>requestAnimationFrame(t)));let e=document.querySelector("#scene").getBoundingClientRect();if(!(e.width>0&&e.height>0)||e.left<0||e.top<0||e.right>innerWidth+.01||e.bottom>innerHeight+.01)throw new Error("The camera canary scene does not fit its aperture.");return{width:innerWidth,height:innerHeight,dpr:devicePixelRatio}}function we(){let e=window,t=new Set,r=a=>{typeof a=="string"&&a.startsWith("/")&&t.add(a)};for(let a of[e.__TSR__,e.__TSR_ROUTER__,e.router,e.__TANSTACK_ROUTER__]){let n=a&&(a.router||a);n?.routesByPath&&Object.keys(n.routesByPath).forEach(r)}for(let a of[e.__reactRouterManifest,e.__remixManifest]){let n=a?.routes||{},i=(o,l=new Set)=>{if(!o||l.has(o.id))return"";l.add(o.id);let c=i(n[o.parentId],l);return o.path?.startsWith("/")?o.path:[c,o.path||""].join("/").replace(/\/+/g,"/")};Object.values(n).forEach(o=>r(i(o)||"/"))}return e.__BUILD_MANIFEST&&Object.keys(e.__BUILD_MANIFEST).forEach(r),r(e.__NEXT_DATA__?.page),[...t]}var ot="(() => { if ('__fragmentsPending' in window) return; let pending = 0; Object.defineProperty(window, '__fragmentsPending', { get: () => pending }); const track = () => { pending++; let open = true; return () => { if (open) { open = false; pending--; } }; }; const fetch = window.fetch; if (typeof fetch === 'function') window.fetch = function (...args) { const done = track(); try { const answer = fetch.apply(this, args); answer.then(done, done); return answer; } catch (error) { done(); throw error; } }; const send = XMLHttpRequest.prototype.send; XMLHttpRequest.prototype.send = function (...args) { const done = track(); this.addEventListener('loadend', done); try { return send.apply(this, args); } catch (error) { done(); throw error; } }; })();",at="(() => { const shared = new Set(), reset = () => { for (const internals of shared) if (typeof internals.recentlyCreatedOwnerStacks === 'number') internals.recentlyCreatedOwnerStacks = 0; }; let hook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__; if (!hook) { let next = 1; hook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = { renderers: new Map(), supportsFiber: true, inject(renderer) { const id = next++; this.renderers.set(id, renderer); return id; }, onScheduleFiberRoot() {}, onCommitFiberRoot() {}, onCommitFiberUnmount() {} }; } const inject = hook.inject, schedule = hook.onScheduleFiberRoot, commit = hook.onCommitFiberRoot; hook.inject = function (renderer) { if (renderer?.currentDispatcherRef) { shared.add(renderer.currentDispatcherRef); reset(); } return inject.apply(this, arguments); }; hook.onScheduleFiberRoot = function () { reset(); return schedule?.apply(this, arguments); }; hook.onCommitFiberRoot = function () { reset(); return commit?.apply(this, arguments); }; })();",it="(() => { const real = window.eval; const named = function (code) { const made = real(code); try { const url = typeof code === 'string' ? /\\n\\/\\/# sourceURL=((?:about|rsc):\\/\\/React\\/[^\\n]+)/.exec(code)?.[1] : undefined, at = url ? code.lastIndexOf('_()})') : -1; if (at > 0 && made && typeof made === 'object') { const before = code.slice(0, at), place = `${url}:${before.split('\\n').length}:${at - before.lastIndexOf('\\n')}`; for (const key of Object.keys(made)) if (typeof made[key] === 'function') Object.defineProperty(made[key], 'displayName', { value: `${key}@${place}`, configurable: true }); } } catch {} return made; }; let current = real; Object.defineProperty(window, 'eval', { configurable: true, get() { if (current !== real) return current; return /\\ncreateFakeFunction@/.test(new Error().stack || '') ? named : real; }, set(value) { current = value; } }); })();",st=`const began = performance.now(); let last = began, landed = 0; const shape = () => [document.documentElement.scrollHeight, document.documentElement.scrollWidth, document.body?.childElementCount ?? 0, landed].join(); let seen = shape(); const watch = new MutationObserver(() => { last = performance.now(); }); watch.observe(document.documentElement, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['class', 'hidden', 'src', 'open', 'aria-busy', 'data-state'] }); const loads = typeof PerformanceObserver === 'function' ? new PerformanceObserver((list) => { landed += list.getEntries().length; }) : undefined; try { loads?.observe({ type: 'resource' }); } catch {} try { while (performance.now() - began < 5000) { await new Promise((next) => setTimeout(next, 50)); const now = shape(); if (now !== seen || (window.__fragmentsPending ?? 0) > 0 || document.querySelector('[aria-busy="true"],template[id^="B:"]')) { seen = now; last = performance.now(); } else if (performance.now() - last >= 300) break; } } finally { watch.disconnect(); loads?.disconnect(); } return [...document.querySelectorAll('[aria-busy="true"]')].some((element) => { const box = element.getBoundingClientRect(), width = Math.min(box.right, innerWidth) - Math.max(box.left, 0), height = Math.min(box.bottom, innerHeight) - Math.max(box.top, 0); return width > 0 && height > 0 && width * height * 4 >= innerWidth * innerHeight; }) ? 'busy' : true`;function ye({includeHidden:e=!1}={}){let t=[],r=[],a=[],n=[],i=[],o=[],l=[],c=new Map,h=new Map,f=[];window.__fragmentsReviewElements=f;let g='input,textarea,select,iframe,[contenteditable]:not([contenteditable="false"]),[data-fragments-mask]',p=s=>{let d=2166136261;for(let u=0;u<s.length;u++)d^=s.charCodeAt(u),d=Math.imul(d,16777619);return(d>>>0).toString(16)},T=/(?:^|\/)node_modules\/|\/dist\/compiled\/|react-jsx-(?:dev-)?runtime|react-dom|react-server-dom|\[turbopack\]|\[externals\]|\.vite\/deps/,M=new Map,$=s=>{if(!s)return null;let d=String(s.stack||s);if(M.has(d))return M.get(d);let u=d.split(`
`).slice(0,100),y=[],E=!1,P=-1;for(let v of u){let k=v.match(/^\s*at\s+(?:(.+?)\s+\()?(.+?):(\d+):(\d+)\)?\s*$/)||v.match(/^(.*?)@(.+?):(\d+):(\d+)$/);k&&T.test(k[2])?(P<0&&(P=y.length),y.push("")):(y.push(v),k&&(E=!0))}!E&&P>=0&&(y[P]="at vendor (fragments-vendor:0:0)");let j=y.join(`
`)||"Error";return M.set(d,j),j},C=s=>{try{return $(s?._debugStack||s?.debugStack)}catch{return null}},I=s=>{try{return $(s?.debugLocation)}catch{return null}},N=s=>{let d=s?.type;return s?.name||(typeof d=="function"?d.displayName||d.name:typeof d=="string"?d:d?.render?.displayName||d?.render?.name||d?.type?.displayName||d?.type?.name)||null},D=s=>{let d=[],u=s;for(let y=0;u&&u!==document.body&&y<20;y++,u=u.parentElement){let E=1;for(let P=u.previousElementSibling;P;P=P.previousElementSibling)P.tagName===u.tagName&&E++;d.unshift(`${u.tagName.toLowerCase()}:${E}`)}return d.join("/")},R=s=>String(s||"").replace(/\s+/g," ").trim().slice(0,120),F=s=>{let d=R(s);return/(?:^|[\s"'])(?:[A-Za-z]:[\\/]|\/(?:Users|home|private|tmp|var|opt|Volumes|Applications|etc)\/)|file:\/\/|https?:\/\//i.test(d)||d.startsWith("/")?"":d},q=s=>{let d=[],u=y=>{if(y.nodeType===Node.TEXT_NODE){d.push(y.nodeValue||"");return}if(y.nodeType!==Node.ELEMENT_NODE||y.closest('[aria-hidden="true"],[hidden],[inert],script,style,noscript,svg'))return;let E=getComputedStyle(y);if(!(E.display==="none"||E.visibility==="hidden"))for(let P of y.childNodes)u(P)};return u(s),R(d.join(" "))},m=s=>{let d=R(s.getAttribute("aria-labelledby")),u=R(d.split(/\s+/).filter(Boolean).map(z=>document.getElementById(z)?.textContent||"").join(" ")),y=s.id?[...document.querySelectorAll("label[for]")].find(z=>z.htmlFor===s.id):null,E=R(y?.textContent||s.closest("label")?.textContent),P=q(s),j=s.querySelector('img[alt]:not([aria-hidden="true"])'),v=s.querySelector('svg:not([aria-hidden="true"]) title'),k=R(s.getAttribute("alt")||j?.getAttribute("alt")||v?.textContent),W=s.tagName==="INPUT"&&/^(submit|reset|button|image)$/.test(s.type)?R(s.value||(s.type==="submit"?"Submit":s.type==="reset"?"Reset":"")):"",V=R(s.getAttribute("aria-label")),L=R(s.getAttribute("title"));return{evidence:{text:F(P),ariaLabel:F(V),ariaLabelledby:F(d),labelledbyText:F(u),title:F(L),alt:F(k),labelFor:F(E)},name:u||V||E||W||P||k||L}},b=s=>{let d=R(s.getAttribute("role")).toLowerCase();if(d)return d;let u=s.tagName.toLowerCase();return u==="a"&&s.hasAttribute("href")?"link":u==="input"?s.type==="checkbox"?"checkbox":s.type==="radio"?"radio":/^(button|submit|reset|image)$/.test(s.type)?"button":"textbox":u==="select"?"combobox":u==="textarea"?"textbox":u==="summary"?"button":u},S=s=>{let d=s.parentElement;if(!d||d.querySelectorAll('button,a[href],input,select,textarea,[role="button"],[role="link"]').length!==1)return"";let u=[...d.children].filter(y=>y!==s&&!y.contains(s)).map(q).filter(Boolean);return u.length===1&&u[0].length<=60?F(u[0]):""},w=s=>{let d=[...s.querySelectorAll("svg")];if(d.length!==1)return"";let y=[...d[0].classList].filter(E=>/^(?:lucide|icon|tabler)-[a-z][\w-]*$/.test(E)&&!/^(?:lucide|icon|tabler)-icon$/.test(E));return y.length===1?R(y[0].replace(/^(?:lucide|icon|tabler)-/,"").replace(/-/g," ")):""},x=document.body?document.body.querySelectorAll("*"):[];for(let s of x){if(r.length>=12e3)break;if(s.closest("script,style,noscript,nextjs-portal,vite-error-overlay,[data-fragments-redaction]"))continue;let d=s.getBoundingClientRect(),u=getComputedStyle(s);if(!e&&(d.width<1||d.height<1||u.visibility==="hidden"||u.display==="none"))continue;let y=t.length,E=!!s.closest(g),j={dom:{tag:s.tagName.toLowerCase(),path:D(s),...s.getAttribute("role")?{role:s.getAttribute("role")}:{}},owner:[]};!E&&s.hasAttribute("data-testid")&&(j.dom.testid=s.getAttribute("data-testid").slice(0,120)),E&&(j.masked=!0);let v=["color","backgroundColor","fontFamily","fontSize","fontWeight","lineHeight","letterSpacing","padding","margin","borderRadius","display","gap"].map(U=>u[U]),k=JSON.stringify(v);h.has(k)||(h.set(k,a.length),a.push(v));let W=s.parentElement;for(;W&&!c.has(W);)W=W.parentElement;let V=E?"":[...s.childNodes].filter(U=>U.nodeType===Node.TEXT_NODE).map(U=>U.nodeValue||"").join(" ").trim();if(r.push([y,W?c.get(W):-1,Math.round(d.x+scrollX),Math.round(d.y+scrollY),Math.round(d.width),Math.round(d.height),h.get(k),E?null:p(V)]),s.matches(g)&&i.push({x:Math.round(d.x+scrollX),y:Math.round(d.y+scrollY),width:Math.ceil(d.width),height:Math.ceil(d.height),reason:"form-value"}),c.set(s,y),t.push(j),f.push(s),(!E||s.matches("input,select,textarea"))&&!s.closest('[aria-hidden="true"],[inert],[hidden]')&&u.visibility!=="hidden"&&u.display!=="none"){let U=b(s);if(s.matches('button,a[href],input:not([type="hidden"]),select,textarea,summary,[role="button"],[role="link"],[role="checkbox"],[role="switch"],[role="tab"],[role="menuitem"]')){let{name:_,evidence:Y}=m(s);if(!_){let J={anchor:y,role:U,evidence:Y,nearbyText:S(s),iconName:w(s)};j.unnamed=J,o.push(y),l.push(J)}}}let L=Object.getOwnPropertyNames(s).find(U=>U.startsWith("__reactFiber$")||U.startsWith("__reactInternalInstance$")),B=L?s[L]:null,z={anchor:y,hasFiber:!!B,ownStack:C(B),ownLoc:I(B),ownDebugSource:B?._debugSource?{fileName:B._debugSource.fileName,lineNumber:B._debugSource.lineNumber,columnNumber:B._debugSource.columnNumber}:null,owners:[],returnChain:[]},H=B?._debugOwner;for(let U=0;H&&U<24;U++,H=H._debugOwner||H.owner){let te=N(H);te&&j.owner.push(te),z.owners.push({name:te,env:H.env||null,stack:C(H),loc:I(H),debugSource:H._debugSource?{fileName:H._debugSource.fileName,lineNumber:H._debugSource.lineNumber,columnNumber:H._debugSource.columnNumber}:null})}for(let U=B?.return,te=0;U&&te<24;U=U.return,te++)N(U)&&z.returnChain.push({name:N(U),stack:C(U)});n.push(z)}return{anchors:t,els:r,styles:a,probes:n,masked:i,unnamed:o,unnamedFacts:l,truncated:r.length>=12e3}}var $n=`(${ye.toString()})()`;function Jt(){if(!document.getElementById("fragments-review-capture-style")){let n=document.createElement("style");n.id="fragments-review-capture-style",n.setAttribute("data-fragments-redaction","true"),n.textContent='*,*::before,*::after{animation-play-state:paused!important;transition:none!important;caret-color:transparent!important}input,textarea,select,[contenteditable]:not([contenteditable="false"]){color:transparent!important;text-shadow:none!important;-webkit-text-fill-color:transparent!important}',document.head.appendChild(n)}document.querySelectorAll("[data-fragments-redaction-box]").forEach(n=>n.remove());let t=[],r=[],a=n=>{r.push(...n.querySelectorAll('input,textarea,select,iframe,[contenteditable]:not([contenteditable="false"]),[data-fragments-mask]'));for(let i of n.querySelectorAll("*"))i.shadowRoot&&!i.matches("nextjs-portal,vite-error-overlay")&&a(i.shadowRoot)};a(document);for(let n of r){let i=n.getBoundingClientRect();if(i.width<=0||i.height<=0)continue;let o={x:Math.floor(i.x+scrollX),y:Math.floor(i.y+scrollY),width:Math.ceil(i.width+1),height:Math.ceil(i.height+1),reason:"form-value"},l=document.createElement("div");l.setAttribute("data-fragments-redaction","true"),l.setAttribute("data-fragments-redaction-box","true"),Object.assign(l.style,{position:"absolute",left:`${o.x}px`,top:`${o.y}px`,width:`${o.width}px`,height:`${o.height}px`,background:"#d4d4d4",zIndex:"2147483647",pointerEvents:"none",borderRadius:getComputedStyle(n).borderRadius}),document.body.appendChild(l),t.push(o)}return t}var Fn=`(${Jt.toString()})()`;var Vt=/(?:^|\/)(?:api|auth|_next|__vite|logout|log-out|signout|sign-out|delete|destroy|remove|unsubscribe|purchase|confirm|callback|download|export)(?:\/|$)/i,Kt=/\.(?:avif|gif|ico|jpe?g|png|svg|webp|mp[34]|pdf|zip|woff2?|ttf|css|js|map|json|xml|txt)$/i,Xt=e=>/\[[^\]]+\]|(?:^|\/)(?:\$|:|\*)|\{[^}]+\}/.test(e);function ce(e,t="http://fragments.invalid",{allowPattern:r=!1}={}){if(typeof e!="string"||!e||/[\\\0]/.test(e))return null;try{let a=new URL(t),n=new URL(e,a);if(!/^https?:$/.test(n.protocol)||n.origin!==a.origin||n.username||n.password||n.search)return null;let i=decodeURI(n.pathname).replace(/\/+$/,"")||"/";return Vt.test(i)||Kt.test(i)||!r&&Xt(i)?null:i}catch{return null}}var Wn=24*1024*1024;var Yt="This browser cannot look inside closed parts of a page, so it was not pictured.",lt=String.raw`(() => {
    const hosts = new Set(['article', 'aside', 'blockquote', 'body', 'div', 'footer', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'main', 'nav', 'p', 'section', 'span']);
    return (element) => { if (!hosts.has(element.localName) && !element.localName.includes('-')) return null; try { return chrome.dom.openOrClosedShadowRoot(element); } catch { return null; } };
  })()`,ct=String.raw`(element, inner) => {
    const rect = element.getBoundingClientRect();
    if (!inner) return rect;
    const computed = getComputedStyle(element);
    const top = parseFloat(computed.borderTopWidth) || 0, right = parseFloat(computed.borderRightWidth) || 0, bottom = parseFloat(computed.borderBottomWidth) || 0, left = parseFloat(computed.borderLeftWidth) || 0;
    return new DOMRect(rect.x + left, rect.y + top, Math.max(0, rect.width - left - right), Math.max(0, rect.height - top - bottom));
  }`,Zt=String.raw`function (mode, scope) {
  const confirmOnly = mode === 'confirm', measure = mode === 'measure';
  // A tile's confirm proves what its viewport draws, and what may be drawn into it from anywhere (generated content).
  const tile = confirmOnly && scope === 'viewport';
  const refusal = 'A form value on this page could not be hidden, so it was not pictured.';
  // Closed shadow roots are reached through the extension world's chrome.dom: it proves it can, on a root of its own.
  const dom = typeof chrome === 'object' && chrome && chrome.dom && typeof chrome.dom.openOrClosedShadowRoot === 'function' ? chrome.dom : null;
  const shadowOf = dom && ${lt};
  const reach = !!dom && (() => { try { const host = document.createElement('div'), root = host.attachShadow({ mode: 'closed' }); return shadowOf(host) === root; } catch { return false; } })();
  if (!reach) { if (measure) return null; throw new Error(${JSON.stringify(Yt)}); }
  const sentinel = window.__fragmentsMaskSentinel, placeOf = ${ct};
  const fields = 'input:not([type=checkbox]):not([type=radio]):not([type=range]):not([type=color]):not([type=hidden]):not([type=submit]):not([type=reset]):not([type=button]):not([type=image]),textarea,select,[contenteditable]:not([contenteditable="false"])';
  const editable = '[contenteditable]:not([contenteditable="false"])';
  const labelled = 'input[type=button],input[type=submit],input[type=reset]';
  const ours = '[data-fragments-redaction],[data-studio-overlay]';
  // What a person sees and uses in place of a field kept out of sight, and that can show its value.
  const controls = 'button,select,textarea,input:not([type=hidden]):not([type=checkbox]):not([type=radio]),[contenteditable]:not([contenteditable="false"]),[role=button],[role=combobox],[role=listbox],[role=textbox],[role=searchbox],[role=spinbutton],[role=slider],[aria-haspopup]:not([aria-haspopup=false])';
  // Of those, the ones that open a choice.
  const pickers = '[role=combobox],[aria-haspopup=listbox],[aria-haspopup=tree],[aria-haspopup=grid],[aria-haspopup=dialog]';
  const choosers = 'select,[role=listbox],[role=spinbutton],[role=slider],[aria-expanded],' + pickers;
  // An entry that picks from a list: what it holds is drawn in the box around it.
  const listed = '[role=combobox],[list],[aria-autocomplete]:not([aria-autocomplete=none]),[aria-haspopup]:not([aria-haspopup=false])';
  const pictures = 'img,video,canvas,object,embed,svg';
  // The only values kept out: a secret, by what its field is, whatever it says. A password (shown as text too), a one-time
  // code, a card's number, security code and expiry; and a field named for a password, a secret, an API key, an access
  // token or a private key (a settings page's key, pictured in the person's own session), by its name or id ('apiKey',
  // 'api_key'), its label or its placeholder ('API key').
  const named = [['password'], ['passwd'], ['passcode'], ['secret'], ['api', 'key'], ['access', 'token'], ['auth', 'token'], ['private', 'key']];
  const secrets = ':is(' + fields + '):is(input[type=password],' + ['current-password', 'new-password', 'one-time-code', 'cc-number', 'cc-csc', 'cc-exp', 'cc-exp-month', 'cc-exp-year'].map((token) => '[autocomplete~=' + token + ' i]').join(',')
    + ',' + named.flatMap((parts) => [...new Set(['', '-', '_'].map((join) => parts.join(join)))]).flatMap((word) => ['[name*="' + word + '" i]:not([type=email])', '[id*="' + word + '" i]:not([type=email])']).join(',')
    + ',' + named.map((parts) => '[aria-label*="' + parts.join(' ') + '" i]').join(',') + ')';
  // A label is words, not an attribute, so a field it names ('API key' over a field with the id 'key') is found by them.
  const says = new RegExp('(' + named.map((parts) => parts.join('[\\s_-]?')).join('|') + ')', 'i');
  const called = (element) => says.test(element.getAttribute('placeholder') || '') || [...(element.labels || [])].some((label) => says.test(label.textContent))
    || (element.getAttribute('aria-labelledby') || '').split(/\s+/).some((id) => id && says.test(element.getRootNode().getElementById?.(id)?.textContent || ''));
  const secretsIn = (root) => [...root.querySelectorAll(secrets), ...[...root.querySelectorAll(fields)].filter((field) => !field.matches(secrets) && called(field))];
  // What the page marks private, for this camera or for a session recorder: covered whole.
  const marked = '[data-fragments-mask],[data-private]:not([data-private=false]),.fs-mask,.fs-exclude,.rr-mask,.rr-block,.ph-no-capture,.sentry-mask,.sentry-block,[data-sentry-mask],[data-sentry-block],[data-hj-suppress],[data-dd-privacy=mask],[data-dd-privacy=hidden]';
  // What holds a document of its own (covered unless it is the page's own and holds nothing kept out), and what is marked.
  const frames = 'iframe,frame,object,embed,' + marked;
  const hidden = [['-webkit-text-fill-color', 'transparent'], ['-webkit-text-security', 'disc'], ['text-shadow', 'none'], ['-webkit-text-stroke-color', 'transparent'], ['text-decoration-color', 'transparent'], ['text-emphasis-color', 'transparent']];
  const hide = hidden.map(([name, value]) => name + ':' + value + '!important').join(';');
  const shown = '-webkit-text-fill-color:currentcolor!important;-webkit-text-security:none!important';
  // Outranks a page's own rule for the same pseudo-element, however it is written.
  const strong = ':not(#fragments-mask-a):not(#fragments-mask-b)';
  // One rule each: a pseudo-element one engine does not know drops only its own rule.
  const rules = [
    '*,*::before,*::after{animation-play-state:paused!important;transition:none!important;caret-color:transparent!important}',
    // A secret field's own words, even one filled after the mask ran (the proof then finds it).
    secrets + '{' + hide + '}',
    '[data-fragments-hide~=editor]' + strong + ' *{visibility:hidden!important}',
    // Only a secret field's words are hidden, and only its placeholder is shown again: the page's own rules are kept.
    secrets + '::placeholder{' + shown + '}',
    // A select showing its empty choice ("Choose…") shows its placeholder, not a value.
    secrets + ':not([multiple]):has(option:checked[value=""]){' + shown + '}',
    secrets + '::file-selector-button{' + shown + '}',
    secrets + '::-webkit-file-upload-button{' + shown + '}',
    '[data-fragments-hide~=file]' + strong + '::file-selector-button{color:var(--fragments-file-button)!important}',
    '[data-fragments-hide~=file]' + strong + '::-webkit-file-upload-button{color:var(--fragments-file-button)!important}',
    ...['', '-fields-wrapper', '-text', '-month-field', '-day-field', '-year-field', '-hour-field', '-minute-field', '-second-field', '-millisecond-field', '-meridiem-field', '-week-field'].map((part) => secrets + '::-webkit-datetime-edit' + part + '{' + hide + '}'),
    '[data-fragments-hide~=text]' + strong + '::first-letter{' + hide + '}',
    '[data-fragments-hide~=text]' + strong + '::first-line{' + hide + '}',
    '[data-fragments-hide~=before]' + strong + '::before,[data-fragments-hide~=after]' + strong + '::after{visibility:hidden!important}',
  ].join('\n');
  const alpha = (colour) => {
    if (!colour || colour === 'transparent') return 0;
    const slash = /\/\s*([\d.]+)(%?)\s*\)$/.exec(colour), comma = /^rgba\([^,]+,[^,]+,[^,]+,\s*([\d.]+)\)$/.exec(colour);
    return slash ? Number(slash[1]) / (slash[2] ? 100 : 1) : comma ? Number(comma[1]) : 1;
  };
  // Letters, digits and pictures, whatever the case, spacing, punctuation or currency: '$4,242.00' holds '4242'.
  const plain = (text) => String(text || '').normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}\p{So}]/gu, '');
  const words = (text) => String(text || '').normalize('NFKC').toLowerCase().split(/[^\p{L}\p{N}\p{So}]+/u).filter(Boolean);
  // Whether words near a value repeat it: one of three or more characters within them, a shorter one as a word of its
  // own ('$5.00' and '5 kg' repeat '5'; '15' does not). Asked for part (a holder's words): words of three or more
  // characters within it, or of any length ('loose': a field kept out of sight, whose code is drawn a digit a box).
  const repeats = (value, raw, match) => {
    const text = plain(raw);
    if (!text) return false;
    if ((match === 'part' && text.length >= 3 || match === 'loose') && value.includes(text)) return true;
    return value.length >= 3 ? text.includes(value) : words(raw).includes(value);
  };
  // A list of values looked up by their first three characters: the ones of three or more a plain text holds (long),
  // and the shorter ones apart (short). Tested one by one, every block of words on a page of 2,600 fields was compared
  // with every value, and so was every generated content and placeholder.
  const grams = (list) => {
    const starts = new Map(), short = [];
    for (const value of new Set(list)) { if (value.length < 3) { short.push(value); continue; } const key = value.slice(0, 3), at = starts.get(key); if (at) at.push(value); else starts.set(key, [value]); }
    const long = (flat) => {
      const found = new Set();
      for (let at = 0; at + 3 <= flat.length; at++) { const near = starts.get(flat.slice(at, at + 3)); if (near) for (const value of near) if (flat.startsWith(value, at)) found.add(value); }
      return found;
    };
    return { short, long };
  };
  // Whether words anywhere spell a value in whole words: 'Hello, Ada Lovelace!' spells 'adalovelace' and '$4,242.00'
  // spells '4242'; 'Install' does not spell 'all'.
  const echoes = (value, raw) => {
    if (!plain(raw).includes(value)) return false;
    const parts = words(raw);
    for (let from = 0; from < parts.length; from++) {
      let joined = '';
      for (let to = from; to < parts.length && joined.length < value.length; to++) { joined += parts[to]; if (joined === value) return true; }
    }
    return false;
  };
  const written = (raw) => /\S/.test(raw || '');
  // Every tree of the page: open and closed shadow roots, not the ones the engine draws its own controls with.
  const roots = [document], found = [];
  const inspect = (root) => {
    found.push(...new Set([...secretsIn(root), ...root.querySelectorAll(frames)]));
    for (const element of root.querySelectorAll('*')) {
      const shadow = shadowOf(element);
      if (shadow && shadow.mode !== 'user-agent' && !element.matches('nextjs-portal,vite-error-overlay,' + ours)) { roots.push(shadow); sentinel?.watch(shadow); inspect(shadow); }
    }
  };
  inspect(document);
  const own = (root) => [...(root === document ? document.head || document.documentElement : root).children].find((child) => child.hasAttribute('data-fragments-form-values'));
  const up = (element) => element.parentElement || element.getRootNode().host || null;
  // Whether an element is in one matching a selector, itself or what holds it in its tree (as closest says), each
  // element tested once: a page's 19,000 words otherwise test the same few holders again and again.
  const under = (selector) => {
    const known = new Map();
    return (element) => {
      const path = [];
      let found = false;
      for (let at = element; at; at = at.parentElement) {
        if (known.has(at)) { found = known.get(at); break; }
        path.push(at);
        if (at.matches(selector)) { found = true; break; }
      }
      for (const one of path) known.set(one, found);
      return found;
    };
  };
  const ourAt = under(ours), mine = (element) => !ourAt(element);

  // What the last run changed is put back first (only where the page has not changed it since), so what is hidden is
  // what the page draws now.
  const undo = window.__fragmentsMaskUndo || (window.__fragmentsMaskUndo = []);
  if (!confirmOnly && !measure) {
    for (const [element, name, before, priority, set] of undo.splice(0).reverse()) {
      if (name === '@placeholder') { if (!element.hasAttribute('placeholder')) element.setAttribute('placeholder', before); continue; }
      if (element.style.getPropertyValue(name) !== set || element.style.getPropertyPriority(name) !== 'important') continue;
      if (before) element.style.setProperty(name, before, priority); else element.style.removeProperty(name);
    }
    for (const root of roots) for (const element of root.querySelectorAll('[data-fragments-hide]')) element.removeAttribute('data-fragments-hide');
  }

  const behind = (element) => {
    for (let at = up(element); at; at = up(at)) { const colour = getComputedStyle(at).backgroundColor; if (alpha(colour) >= 0.99) return colour; }
    return 'Canvas';
  };
  // Sharing more than a pixel each way: a label that only touches a field is not over it.
  const overlaps = (at, rect) => Math.min(at.right, rect.right) - Math.max(at.left, rect.left) > 1 && Math.min(at.bottom, rect.bottom) - Math.max(at.top, rect.top) > 1;
  const shared = (at, rect) => Math.max(0, Math.min(at.right, rect.right) - Math.max(at.left, rect.left)) * Math.max(0, Math.min(at.bottom, rect.bottom) - Math.max(at.top, rect.top));
  const sized = (rect) => rect.width >= 2 && rect.height >= 2;
  // Places by the rows of the page they lie on (with two pixels around them), so what lies over a rect is compared only
  // with the places on its rows: compared with every place, 19,000 words on a page of 600 fields took most of the time.
  const rowsOf = (list) => {
    const rows = new Map();
    list.forEach((item, order) => { for (let row = Math.floor((item.rect.top - 2) / 64), last = Math.floor((item.rect.bottom + 2) / 64); row <= last; row++) { const at = rows.get(row); if (at) at.push(order); else rows.set(row, [order]); } });
    // The places on the rows a rect spans, each once and in their order.
    return (rect) => {
      const first = Math.floor(rect.top / 64), last = Math.floor(rect.bottom / 64);
      if (first === last) { const at = rows.get(first); return at ? at.map((order) => list[order]) : []; }
      const orders = new Set();
      for (let row = first; row <= last; row++) for (const order of rows.get(row) || []) orders.add(order);
      return [...orders].sort((a, b) => a - b).map((order) => list[order]);
    };
  };
  // In a tile's viewport, or near enough to draw into it (a glyph's overhang, a shadow).
  const viewWidth = innerWidth, viewHeight = innerHeight;
  const shows = (rect) => !tile || rect.right > -16 && rect.bottom > -16 && rect.left < viewWidth + 16 && rect.top < viewHeight + 16;
  const onPage = (rect) => rect.right + scrollX > 0 && rect.bottom + scrollY > 0;
  const visible = (element) => typeof element.checkVisibility === 'function' ? element.checkVisibility({ visibilityProperty: true }) : getComputedStyle(element).visibility !== 'hidden';
  // Drawn where it is: not see-through, a few pixels, clipped away or off the page.
  const drawn = (element, rect) => { const computed = getComputedStyle(element); return seen(element, rect) >= 4 && onPage(rect) && (typeof element.checkVisibility === 'function' ? element.checkVisibility({ opacityProperty: true, visibilityProperty: true }) : computed.opacity !== '0' && computed.visibility !== 'hidden'); };
  const paints = (computed) => alpha(computed.backgroundColor) > 0 || computed.backgroundImage !== 'none' || (computed.boxShadow && computed.boxShadow !== 'none') || ['Top', 'Right', 'Bottom', 'Left'].some((side) => parseFloat(computed['border' + side + 'Width']) > 0 && computed['border' + side + 'Style'] !== 'none' && alpha(computed['border' + side + 'Color']) > 0);
  // A box drawn around something: its own, or an outline laid over it whole (a notched fieldset).
  const framed = (element) => {
    if (paints(getComputedStyle(element))) return true;
    const rect = element.getBoundingClientRect();
    return [...element.children].some((child) => { const at = child.getBoundingClientRect(); return getComputedStyle(child).position === 'absolute' && Math.abs(at.left - rect.left) <= 2 && Math.abs(at.right - rect.right) <= 2 && Math.abs(at.top - rect.top) <= 8 && Math.abs(at.bottom - rect.bottom) <= 2 && paints(getComputedStyle(child)); });
  };
  // How much of a field can be seen: what clips it (its own clip, anything around it that hides overflow) cut away.
  const seen = (element, rect) => {
    const computed = getComputedStyle(element);
    if (/^rect\(\s*0(px)?[\s,]+0(px)?[\s,]+0(px)?[\s,]+0(px)?\s*\)$/.test(computed.clip) || /^inset\(\s*50%/.test(computed.clipPath)) return 0;
    let left = rect.left, top = rect.top, right = rect.right, bottom = rect.bottom;
    const propagated = getComputedStyle(document.documentElement).overflow === 'visible';
    for (let at = up(element); at && at !== document.documentElement; at = up(at)) {
      // The body's overflow is the window's, unless the root has its own.
      if (at === document.body && propagated) continue;
      const around = getComputedStyle(at);
      if (around.overflowX !== 'visible' || around.overflowY !== 'visible') { const box = at.getBoundingClientRect(); left = Math.max(left, box.left); top = Math.max(top, box.top); right = Math.min(right, box.right); bottom = Math.min(bottom, box.bottom); }
      if (around.position === 'fixed') break;
    }
    return Math.min(right - left, bottom - top);
  };
  // What generated content says: its strings, and the attributes it names (an engine may leave attr() unresolved).
  const said = (element, content) => {
    let text = '';
    content.replace(/"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'|attr\(\s*([\w-]+)[^)]*\)/g, (all, double, single, name) => { text += double ?? single ?? (element.getAttribute(name) || ''); return all; });
    return text;
  };
  // The control standing for a field kept out of sight: the nearest one beside it that repeats its value, else the
  // nearest that opens a choice, looked for no further out than the first thing around it with a box of its own. A
  // choice, a date, a time or a number is often written otherwise than its field holds it ('USA' for 'US', '7:30 AM'
  // for '07:30'): for those, else the nearest control at all, which is only a guess ('guessed'), so what holds the
  // field is judged too. A text's own field is repeated by its control; a button that only happens to be near it, such
  // as "Resend code", is not taken for it.
  const standIn = (element, values, formatted) => {
    for (let path = element, at = up(element); at && at !== document.body && at !== document.documentElement; path = at, at = up(at)) {
      const kids = [...at.children], here = kids.indexOf(path);
      const near = kids.filter((kid) => kid !== path).sort((a, b) => Math.abs(kids.indexOf(a) - here) - Math.abs(kids.indexOf(b) - here) || kids.indexOf(a) - kids.indexOf(b));
      const seenHere = [];
      for (const kid of near) for (const control of kid.matches(controls) ? [kid] : kid.querySelectorAll(controls)) if (sized(control.getBoundingClientRect()) && visible(control)) seenHere.push(control);
      const says = seenHere.find((control) => values.some((value) => repeats(value, control.matches('input,select,textarea') ? control.value : control.textContent, 'part')));
      const opens = seenHere.find((control) => control.matches(choosers));
      if (says || opens) return { control: says || opens };
      if (formatted && seenHere.length) return { control: seenHere[0], guessed: true };
      if (sized(at.getBoundingClientRect())) return null;
    }
    return null;
  };
  const holderOf = (element) => {
    for (let at = up(element); at; at = up(at)) { const rect = at.getBoundingClientRect(); if (sized(rect)) return visible(at) ? at : null; }
    return null;
  };
  const small = (holder, rect) => holder !== document.body && holder !== document.documentElement && rect.height <= 120 && rect.width <= 1000;
  // The box drawn around an entry that draws none of its own (a tag field, a combobox), holding no other field.
  const frameOf = (element) => {
    if (paints(getComputedStyle(element))) return null;
    for (let at = up(element); at && at !== document.body && at !== document.documentElement; at = up(at)) {
      if (at.matches('form,fieldset,label,p,li,td,th,a,h1,h2,h3,h4,h5,h6,dialog,[role=dialog]') || at.getBoundingClientRect().height > 200) return null;
      if (!framed(at)) continue;
      for (const other of at.querySelectorAll(fields)) if (other !== element) return null;
      return at;
    }
    return null;
  };
  const picture = (element) => {
    let inner = null;
    try { inner = element.contentDocument || element.getSVGDocument?.() || null; } catch {}
    if (inner) return inner.documentElement?.localName === 'svg';
    return /^image\//i.test(element.type || '') || /\.(svg|png|jpe?g|gif|webp|avif|ico)([?#]|$)/i.test(element.getAttribute('data') || element.getAttribute('src') || '');
  };
  const entry = (element) => element.localName === 'textarea' || element.localName === 'input' && ['text', 'search', 'email', 'url', 'tel', 'number', 'password'].includes(element.type);
  // A frame of the page's own origin whose every tree is read here, holding nothing kept out and no frame that is not its
  // own too, is pictured as drawn (a preview, an editor's canvas), and watched while it is. Any other is covered, and so is
  // one still loading: until it has, it shows an empty document of the page's origin, whatever origin it is loading.
  const ownFrame = (element, depth) => {
    let inner = null;
    try { inner = element.contentDocument; } catch {}
    if (!inner?.documentElement || element.matches(marked) || depth > 4) return false;
    const asked = element.getAttribute(element.localName === 'object' ? 'data' : 'src') || '';
    if (inner.readyState !== 'complete' || (asked && !/^about:/i.test(asked.trim()) && inner.URL === 'about:blank')) return false;
    const trees = [inner];
    for (let index = 0; index < trees.length; index++) {
      const tree = trees[index];
      if (tree.querySelector(marked) || secretsIn(tree).length) return false;
      for (const nested of tree.querySelectorAll('iframe,frame,object,embed')) if (!(nested.matches('object,embed') && picture(nested)) && !ownFrame(nested, depth + 1)) return false;
      for (const each of tree.querySelectorAll('*')) { const shadow = shadowOf(each); if (shadow && shadow.mode !== 'user-agent') trees.push(shadow); }
    }
    for (const tree of trees) sentinel?.watch(tree);
    return true;
  };

  // Where a value is shown: over a field holding one (nothing may be written there at all), where a control or a box
  // shows a choice (the same), and where words may repeat one (a label, a holder, the whole page).
  const valued = [], values = [], wide = [], regions = [], covers = [], shownAt = [], standIns = [];
  // A value as the page may spell it again: whole, each word of a name of two or three words, each line of one written
  // over several (a message's preview), and the last four digits of a long number (a card's).
  const spread = (raw) => {
    const whole = plain(raw);
    if (whole.length >= 3) wide.push(whole);
    const parts = String(raw).trim().split(/\s+/);
    if (parts.length > 1 && parts.length <= 3) for (const part of parts) { const one = plain(part); if (one.length >= 3) wide.push(one); }
    const lines = String(raw).split(/\n/).map(plain).filter((line) => line.length >= 3);
    if (lines.length > 1) wide.push(...lines);
    if (/^\d{12,}$/.test(whole)) wide.push(whole.slice(-4));
  };
  const region = (rect, kind, element, values, match) => { regions.push({ rect, kind, element, all: !values, values, match }); if (!values) shownAt.push(rect); };
  const labels = (element, values) => { for (const label of element.labels || []) { const at = label.getBoundingClientRect(); if (sized(at)) region(at, 'label', label, values, 'whole'); } };
  let unsure = false;
  const range = document.createRange();
  const covered = new Set();
  // A cover is its element's box, or what is inside its border (inner), measured again wherever it is drawn.
  const cover = (element, inner, rect, background, radius) => { if (covered.has(element) || !sized(rect)) return; covered.add(element); covers.push({ element, inner, rect, background, radius: parseFloat(radius) || 0 }); };
  const inside = (element) => {
    const computed = getComputedStyle(element), left = parseFloat(computed.borderLeftWidth) || 0;
    return { rect: placeOf(element, true), background: alpha(computed.backgroundColor) >= 0.99 ? computed.backgroundColor : behind(element), radius: Math.max(0, (parseFloat(computed.borderTopLeftRadius) || 0) - left) };
  };
  // Painted over (the live page), words keep their own glyphs, so what is painted must not follow their width: each line
  // is painted across the box that lays it out, the nearest one around it whose width does not follow its words.
  const band = (element, rect) => {
    let at = element;
    for (; at && at !== document.body && at !== document.documentElement; at = up(at)) {
      const computed = getComputedStyle(at), around = up(at);
      if (/^inline|^contents/.test(computed.display) || /absolute|fixed/.test(computed.position) || computed.float !== 'none' || (around && /flex|grid/.test(getComputedStyle(around).display))) continue;
      break;
    }
    const box = (at || document.body).getBoundingClientRect(), left = Math.min(box.left, rect.left), right = Math.max(box.right, rect.right);
    return new DOMRect(left, rect.top, right - left, rect.height);
  };
  for (const element of found) {
    if (!mine(element)) continue;
    const rect = element.getBoundingClientRect(), computed = getComputedStyle(element);
    // Not where it is not drawn: the camera hides a pinned frame (a chat widget) on the viewports after its own. An
    // object or embed is a frame unless it shows a picture.
    if (element.matches(frames)) { if (visible(element) && !(element.matches('object,embed') && picture(element)) && !ownFrame(element, 0)) cover(element, false, rect, behind(element), computed.borderTopLeftRadius); continue; }
    const tag = element.localName;
    let texts = [], changed = true;
    if (tag === 'select') {
      const chosen = [...element.selectedOptions];
      texts = chosen.flatMap((option) => [option.label || option.text, option.value]);
      if (!chosen.some((option) => (option.label || option.text || option.value).trim()) || (!element.multiple && chosen.length === 1 && chosen[0].getAttribute('value') === '')) texts = [];
      // Its choices are the page's own words: the one it holds is looked for elsewhere on the page only once a person
      // changed it, not while it is the one the page chose (its selected option, or its first).
      let first = [...element.options].filter((option) => option.defaultSelected);
      if (!element.multiple) first = first.length ? first.slice(-1) : [...element.options].filter((option) => !option.disabled).slice(0, 1);
      changed = chosen.length !== first.length || chosen.some((option, index) => option !== first[index]);
      // A list box draws its chosen rows in the system's highlight, whatever the page says: covered inside its border.
      if (sized(rect) && texts.length && (element.multiple || element.size > 1)) { const { rect: at, background, radius } = inside(element); cover(element, true, at, background, radius); }
    } else if (tag === 'input' || tag === 'textarea') texts = element.type === 'file' ? [...(element.files || [])].map((file) => file.name) : element.value ? [element.value] : [];
    else if ((element.textContent || '').trim() || element.querySelector('img,picture,video,canvas,svg,object,embed,iframe')) texts = [element.textContent || ' '];
    const these = texts.map(plain).filter(Boolean);
    // A date written out beside a hidden one ('November 12, 2001') says its year.
    if (tag === 'input' && /^(date|datetime-local|month|week)$/.test(element.type) && element.value) these.push(element.value.slice(0, 4));
    if (texts.length) {
      valued.push(element);
      if (changed) { values.push(...these); texts.forEach(spread); }
      if (sized(rect) && computed.visibility !== 'hidden') region(rect, 'field', element);
      labels(element, these);
      // Painted over, what an editor draws beyond its box (lines that run past it, a part laid outside it) is painted too,
      // as a band as wide as the editor, so its words' width is not drawn. An editor that clips what overflows it draws
      // nothing beyond its box.
      if (measure && element.matches(editable) && computed.overflowX === 'visible' && computed.overflowY === 'visible') {
        range.selectNodeContents(element);
        const all = range.getBoundingClientRect();
        if (sized(all) && (all.left < rect.left - 1 || all.top < rect.top - 1 || all.right > rect.right + 1 || all.bottom > rect.bottom + 1)) shownAt.push(band(element, all));
      }
    }
    // A field kept out of sight itself (see-through, a few pixels, clipped away or off the page), not inside something
    // that is not drawn at all (a closed tab's panel).
    const parent = up(element);
    const away = !drawn(element, rect) && (tag === 'input' || tag === 'textarea' || tag === 'select') && parent && !(typeof parent.checkVisibility === 'function' && !parent.checkVisibility());
    if (away && texts.length) {
      const found = standIn(element, these, tag === 'select' || /^(date|datetime-local|month|week|time|number)$/.test(element.type));
      if (found) {
        const { control } = found;
        region(control.getBoundingClientRect(), 'control', control);
        if (control.matches(fields + ',' + labelled)) standIns.push(control);
        if (!found.guessed) continue;
      }
    }
    if (away && (texts.length || tag === 'textarea')) {
      const holder = holderOf(element), at = holder && holder.getBoundingClientRect();
      // A code editor's own field is empty, its text drawn around it: the editor is hidden whole, if the field is in it.
      if (holder && (texts.length ? small(holder, at) : holder !== document.body && holder !== document.documentElement && overlaps(rect, at))) region(at, 'holder', holder);
      else if (holder && these.length) region(at, 'holder', holder, these, 'loose');
    }
    // The box drawn around an entry that picks from a list and shows what it holds, or around a tag field's chips (a box
    // of their own with words in it, before the entry): covered inside its border, since their sizes follow the value.
    const frame = entry(element) && !away && frameOf(element);
    if (frame) {
      const beside = [...frame.querySelectorAll('*')].filter((other) => !other.contains(element) && !element.contains(other) && !other.closest('label,legend'));
      const chips = beside.some((chip) => chip.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_FOLLOWING && written(chip.textContent) && paints(getComputedStyle(chip)));
      if (chips || element.matches(listed) && beside.some((other) => written(other.textContent) || other.matches(pictures))) {
        const place = inside(frame);
        region(frame.getBoundingClientRect(), 'frame', frame); cover(frame, true, place.rect, place.background, place.radius);
      }
    }
  }
  const whole = regions.filter((region) => region.all);
  const placesAt = rowsOf(regions), wholeAt = rowsOf(whole);
  const over = (rects, raw) => {
    let hit = false;
    const near = rects.length === 1 ? placesAt(rects[0]) : [...new Set(rects.flatMap(placesAt))];
    for (const region of near) if (rects.some((at) => overlaps(at, region.rect)) && (region.all ? written(raw) : region.values.some((value) => repeats(value, raw, region.match)))) hit = region.hit = true;
    return hit;
  };
  // The values a text spells somewhere (plain), each looked for only where its first three characters are. The lists
  // are complete by now: every value was found above.
  let spells, held;
  const valuesIn = (flat) => {
    spells = spells || grams(wide);
    return [...spells.short.filter((value) => flat.includes(value)), ...spells.long(flat)];
  };
  const echoed = (raw) => valuesIn(plain(raw)).some((value) => echoes(value, raw));
  // Whether words repeat a value (as repeats says, for every value at once) or spell one, once for each string: an icon
  // font's generated content repeats a few strings across thousands of elements.
  const told = new Map();
  const tells = (raw) => {
    let result = told.get(raw);
    if (result !== undefined) return result;
    if (!held) { const { short, long } = grams(values); held = { short: new Set(short), long }; }
    const flat = plain(raw);
    result = !!flat && (held.long(flat).size > 0 || (held.short.size > 0 && words(raw).some((word) => held.short.has(word)))) || echoed(raw);
    told.set(raw, result);
    return result;
  };
  // Words written inline with others are read together, as they are drawn: a value spelled across a tag or a <wbr>
  // ('ada@<wbr>lovelace.io') is found in each piece of it, and so is one cut short ('Quarterly plan for Ada Lo…').
  const phrasing = 'a,abbr,b,bdi,bdo,cite,code,data,del,dfn,em,font,i,ins,kbd,label,mark,q,s,samp,small,span,strong,sub,sup,time,u,var';
  const skipped = fields + ',script,style,template,noscript,' + ours, skippedAt = under(skipped);
  const lines = new Map();
  const spelled = (block) => {
    const pieces = [], starts = [], hit = new Set();
    let text = '';
    const add = (node) => { pieces.push(node); starts.push(text.length); text += node.data; };
    if (!block.firstElementChild) { for (const node of block.childNodes) if (node.nodeType === 3) add(node); }
    else {
      const walk = document.createTreeWalker(block, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, { acceptNode: (node) => node.nodeType !== 1 ? NodeFilter.FILTER_ACCEPT : node.matches(phrasing) && !node.matches(skipped) ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_REJECT });
      for (let node = walk.nextNode(); node; node = walk.nextNode()) add(node);
    }
    const flat = plain(text), present = valuesIn(flat), cuts = [...text.matchAll(/…|\.\.\./g)];
    if (!present.length && !cuts.length) return hit;
    // Its words, never one across two pieces: each piece is drawn on its own.
    const tokens = [];
    pieces.forEach((piece, index) => { for (const match of piece.data.matchAll(/[\p{L}\p{N}\p{So}]+/gu)) { const word = plain(match[0]); if (word) tokens.push({ word, from: starts[index] + match.index, to: starts[index] + match.index + match[0].length }); } });
    const take = (from, to) => pieces.forEach((piece, index) => { if (starts[index] < to && starts[index] + piece.data.length > from) hit.add(piece); });
    for (const value of present) for (let from = 0; from < tokens.length; from++) {
      let joined = '';
      for (let to = from; to < tokens.length && joined.length < value.length; to++) { joined += tokens[to].word; if (joined === value) take(tokens[from].from, tokens[to].to); }
    }
    // Cut short: the words just before an ellipsis, six letters or more of them, that a value holds.
    for (const cut of cuts) {
      let last = tokens.length - 1;
      while (last >= 0 && tokens[last].to > cut.index) last--;
      if (last < 0 || text.slice(tokens[last].to, cut.index).trim()) continue;
      let tail = '', from = -1;
      for (let at = last; at >= 0; at--) { tail = tokens[at].word + tail; if (!wide.some((value) => value.includes(tail))) break; if (tail.length >= 6) from = at; }
      if (from >= 0) take(tokens[from].from, cut.index + cut[0].length);
    }
    return hit;
  };
  // A field over which anything is laid that draws no words (a picture, a colour): covered inside its border.
  const boxed = regions.filter((region) => region.all && region.kind === 'field'), boxedAt = rowsOf(boxed);
  const fill = (region) => { const place = inside(region.element); cover(region.element, true, place.rect, place.background, place.radius); };
  const within = (rect, around) => sized(rect) && rect.left >= around.left - 2 && rect.right <= around.right + 2 && rect.top >= around.top - 2 && rect.bottom <= around.bottom + 2;
  // Where anything over a place shown whole must lie: the place and two pixels around it (as within allows).
  const nearbyAt = rowsOf(whole.map(({ rect }) => ({ rect: { left: rect.left - 2, top: rect.top - 2, right: rect.right + 2, bottom: rect.bottom + 2 } })));
  const copies = new Map(), generated = [], hiddenPictures = [], placeholders = [], fieldAt = under(fields);
  if (regions.length || values.length) {
    for (const root of roots) {
      // Words: each run measured where it is drawn, line by line.
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        // Words written straight into a shadow root are drawn by its host.
        const parent = node.parentElement || node.parentNode?.host;
        if (!parent || !written(node.data) || skippedAt(parent)) continue;
        let echo;
        if (node.parentElement) {
          let block = parent;
          while (block.parentElement && block.matches(phrasing)) block = block.parentElement;
          if (!lines.has(block)) lines.set(block, wide.length ? spelled(block) : new Set());
          echo = lines.get(block).has(node);
        } else echo = echoed(node.data);
        range.selectNodeContents(node);
        // Its lines, listed only for words that repeat a value or lie over where one is shown (and, for a tile, in it).
        if (!echo || tile) { const all = range.getBoundingClientRect(); if (!shows(all) || !echo && !placesAt(all).some((region) => overlaps(all, region.rect))) continue; }
        const rects = [...range.getClientRects()].filter((at) => at.width > 0 && at.height > 0);
        // Words that spell a value are hidden even where they are not drawn now (a hint shown on focus, a popover not
        // yet open), so a page that shows them while a tile is pictured shows dots.
        if (rects.length ? over(rects, node.data) || echo : echo) copies.set(parent, [...(copies.get(parent) || []), ...rects]);
      }
      for (const element of root.querySelectorAll('*')) {
        if (!mine(element)) continue;
        // Generated content: where it is drawn cannot be measured, so any that repeats a value is hidden wherever it is,
        // and any written by something over a field holding a value.
        let at = null;
        for (const pseudo of ['::before', '::after']) {
          const style = getComputedStyle(element, pseudo), content = style.content;
          if (!content || content === 'none' || content === 'normal') continue;
          const raw = said(element, content);
          if (!written(raw)) {
            // No words, but a picture or a colour laid over a field holding a value (a card's brand): the field is covered
            // inside its border, unless what is laid is larger than the field (a card's own background).
            if (boxed.length && /absolute|fixed/.test(style.position) && (alpha(style.backgroundColor) > 0 || style.backgroundImage !== 'none' || /url\(/.test(content))) {
              at = at || element.getBoundingClientRect();
              for (const region of boxedAt(at)) if (overlaps(at, region.rect) && !(parseFloat(style.width) * parseFloat(style.height) > region.rect.width * region.rect.height)) fill(region);
            }
            continue;
          }
          at = at || element.getBoundingClientRect();
          const repeated = tells(raw);
          if (!repeated && !wholeAt(at).some((region) => overlaps(at, region.rect))) continue;
          if (measure && style.visibility === 'hidden') continue;
          generated.push([element, pseudo]); shownAt.push(measure ? band(element, at) : at);
          // Painted over, not hidden, it must be drawn inside its element's box.
          if (measure && repeated && (!sized(at) || /absolute|fixed/.test(style.position) || style.transform !== 'none')) unsure = true;
        }
        // A tile's own: generated content may be drawn anywhere, but nothing else is looked at outside it.
        if (tile && !shows(at = at || element.getBoundingClientRect())) continue;
        const tag = element.localName;
        // A placeholder that says a value, or that is laid over a field holding one.
        if ((tag === 'input' || tag === 'textarea') && !element.value && written(element.getAttribute('placeholder'))) {
          const rect = at || element.getBoundingClientRect(), text = element.getAttribute('placeholder');
          if (tells(text) || wholeAt(rect).some((region) => region.kind === 'field' && region.element !== element && overlaps(rect, region.rect))) { placeholders.push(element); shownAt.push(rect); }
        }
        // A button's label that spells a value.
        if (element.matches(labelled) && element.value && !standIns.includes(element) && echoed(element.value)) { standIns.push(element); shownAt.push(at || element.getBoundingClientRect()); }
        // A picture over where a value is shown: a flag, a face, a card's brand, an icon (which cannot be told from them).
        // Half over or more, it is hidden; less, the place is covered (a field inside its border). Only what is laid over
        // such a place is looked at (its box first, then its style).
        if (whole.length && (at = at || element.getBoundingClientRect(), nearbyAt(at).some(({ rect: around }) => overlaps(at, around))) && !fieldAt(element)) {
          const style = getComputedStyle(element);
          if ((element.matches(pictures) && !(tag === 'svg' && element.parentElement?.closest('svg'))) || /url\(/.test(style.backgroundImage)) {
            const rect = at, area = rect.width * rect.height;
            for (const region of wholeAt(rect)) {
              if (!(area >= 1) || element.contains(region.element) || !overlaps(rect, region.rect)) continue;
              if (shared(rect, region.rect) * 2 >= area) { hiddenPictures.push(element); shownAt.push(rect); break; }
              const place = region.kind === 'field' ? inside(region.element) : { rect: region.rect, background: behind(region.element), radius: getComputedStyle(region.element).borderTopLeftRadius };
              cover(region.element, region.kind === 'field', place.rect, place.background, place.radius);
            }
          } else if (boxed.length && alpha(style.backgroundColor) > 0) {
            // A colour laid inside a field holding a value (a swatch of the colour typed).
            const rect = at;
            for (const region of boxedAt(rect)) if (!element.contains(region.element) && !region.element.contains(element) && within(rect, region.rect)) fill(region);
          }
        }
      }
    }
  }
  for (const [parent, rects] of copies) shownAt.push(...(measure ? rects.map((rect) => band(parent, rect)) : rects));

  const box = (rect) => ({ x: Math.floor(rect.x + scrollX), y: Math.floor(rect.y + scrollY), width: Math.ceil(rect.width + 1), height: Math.ceil(rect.height + 1), reason: 'form-value' });
  const view = (rect) => ({ x: Math.floor(rect.x), y: Math.floor(rect.y), width: Math.ceil(rect.width + 1), height: Math.ceil(rect.height + 1) });
  // Covers are rounded outward to whole pixels: a cover a fraction short of its place leaves a line of it drawn.
  const outward = (rect) => { const x = Math.floor(rect.left), y = Math.floor(rect.top); return { x, y, width: Math.ceil(rect.right) - x, height: Math.ceil(rect.bottom) - y }; };
  if (measure) return unsure ? null : [...shownAt.map(view), ...covers.map((cover) => outward(cover.rect))];

  // The colours covers are painted in, as sRGB bytes; the canvas behind everything as this page draws it. Each colour
  // is read once, before anything is written.
  // The canvas's colour is read once by hiding, the only run that writes, and kept by the root's colour scheme: confirming
  // writes no probe, so the page sees no change of the mask's outside hiding.
  const ink = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  const inks = new Map();
  const scheme = getComputedStyle(document.documentElement).colorScheme + (matchMedia('(prefers-color-scheme: dark)').matches ? ' dark' : ' light');
  const canvases = window.__fragmentsMaskCanvas || (window.__fragmentsMaskCanvas = new Map());
  const bytes = (colour) => {
    if (inks.has(colour)) return inks.get(colour);
    let css = colour;
    if (colour === 'Canvas') {
      if (confirmOnly && canvases.has(scheme)) { inks.set(colour, canvases.get(scheme)); return canvases.get(scheme); }
      const probe = document.createElement('div');
      probe.setAttribute('data-fragments-redaction', 'true'); probe.style.cssText = 'position:absolute;width:0;height:0;background-color:Canvas';
      document.documentElement.appendChild(probe); css = getComputedStyle(probe).backgroundColor; probe.remove();
    }
    ink.clearRect(0, 0, 1, 1); ink.fillStyle = '#000'; ink.fillStyle = css; ink.fillRect(0, 0, 1, 1);
    const found = [...ink.getImageData(0, 0, 1, 1).data];
    inks.set(colour, found);
    if (colour === 'Canvas') canvases.set(scheme, found);
    return found;
  };
  // Hiding reads the canvas's colour whether or not a cover needs it now, so a cover a tile finds needs no probe.
  if (!confirmOnly) bytes('Canvas');
  const fills = covers.map((cover) => bytes(cover.background));

  const mark = (element, what) => element.setAttribute('data-fragments-hide', [...new Set([...(element.getAttribute('data-fragments-hide') || '').split(' ').filter(Boolean), what])].join(' '));
  if (!confirmOnly) {
    // Everything is read before anything is written: a read after a write lays the page out again, once for each of
    // 600 fields. Sizes first: a field that sizes itself to its text keeps the size it had once its glyphs are dots, as
    // the slab kept it. What is written over it takes the dots' size: its own was under the slab, and would tell the value.
    const before = valued.map((element) => { const computed = getComputedStyle(element); return [element, computed.display, computed.width, computed.height]; });
    let styledButtons;
    const buttonsStyled = () => {
      if (styledButtons !== undefined) return styledButtons;
      const any = (list) => [...list].some((rule) => (rule.selectorText && /file-selector-button|file-upload-button/.test(rule.selectorText) && !!rule.style?.color) || (rule.cssRules && any(rule.cssRules)));
      styledButtons = false;
      for (const sheet of document.styleSheets) if (!sheet.ownerNode?.hasAttribute?.('data-fragments-redaction')) { try { if (any(sheet.cssRules)) styledButtons = true; } catch { styledButtons = true; } }
      return styledButtons;
    };
    // What clearing an element needs to know of it: a chosen file's button colour, and a fill clipped to its text.
    // WebKit draws a chosen file's name in the field's colour, whatever its fill. Its button keeps the colour it had:
    // its own where the engine says it (Chromium), the field's where the page has the button take it (Tailwind's base
    // styles), and the system's, untouched, where the page leaves it alone.
    const facts = new Map();
    const read = (element) => {
      if (facts.has(element)) return;
      const computed = getComputedStyle(element);
      let button = null;
      if (element.localName === 'input' && element.type === 'file') {
        button = '';
        try { button = getComputedStyle(element, '::file-selector-button').color; } catch {}
        if (!button || button === computed.color) button = buttonsStyled() ? computed.color : '';
      }
      facts.set(element, { button, clipped: /text/.test(computed.backgroundClip + ' ' + computed.webkitBackgroundClip) });
    };
    // Words alone, in nothing drawn, are hidden whole; words in a drawn box (a code's cell), only their glyphs.
    const bare = new Set([...copies.keys()].filter((parent) => parent instanceof SVGElement || (!parent.children.length && !paints(getComputedStyle(parent)))));
    for (const element of [...valued, ...standIns, ...copies.keys()]) if (!bare.has(element)) read(element);
    for (const root of roots) if (!own(root)) {
      const sheet = document.createElement('style');
      sheet.setAttribute('data-fragments-redaction', 'true'); sheet.setAttribute('data-fragments-form-values', 'true');
      sheet.textContent = rules; (root === document ? document.head || document.documentElement : root).appendChild(sheet);
    }
    // An inline rule outranks any the page has, however specific; each is written down to be put back next time.
    const set = (element, name, value) => {
      const before = element.style.getPropertyValue(name), priority = element.style.getPropertyPriority(name);
      element.style.setProperty(name, value, 'important');
      undo.push([element, name, before, priority, element.style.getPropertyValue(name)]);
    };
    const clear = (element) => {
      const { button, clipped } = facts.get(element);
      if (button !== null) {
        if (button) { set(element, '--fragments-file-button', button); mark(element, 'file'); }
        set(element, 'color', 'transparent');
      }
      // An editor's first letter and line are hidden too, whatever the page's own rules for them say.
      if (element.matches(editable)) { mark(element, 'editor'); mark(element, 'text'); }
      for (const [name, value] of hidden) set(element, name, value);
      if (clipped) { set(element, 'background-image', 'none'); set(element, 'background-color', 'transparent'); }
    };
    for (const element of valued) clear(element);
    for (const element of standIns) clear(element);
    for (const element of placeholders) { undo.push([element, '@placeholder', element.getAttribute('placeholder')]); element.removeAttribute('placeholder'); }
    for (const parent of copies.keys()) {
      if (bare.has(parent)) { mark(parent, 'all'); set(parent, 'visibility', 'hidden'); }
      else { mark(parent, 'text'); clear(parent); }
    }
    for (const [element, pseudo] of generated) mark(element, pseudo.slice(2));
    for (const element of hiddenPictures) { mark(element, 'all'); set(element, 'visibility', 'hidden'); }
    // Read all, then set back what moved; again, since a field set back can move another, at most three times.
    for (let pass = 0; pass < 3; pass++) {
      const moved = [];
      for (const [element, display, width, height] of before) {
        if (display === 'inline' || display === 'contents' || display === 'none') continue;
        const now = getComputedStyle(element);
        for (const [size, was] of [['width', width], ['height', height]]) if (now[size] !== was && /px$/.test(was)) moved.push([element, size, was]);
      }
      if (!moved.length) break;
      for (const [element, size, was] of moved) for (const name of [size, 'min-' + size, 'max-' + size]) set(element, name, was);
    }
  }

  // The covers as they are now, each kept by its element for the seal to measure again.
  const painted = covers.map((cover, index) => ({ ...outward(placeOf(cover.element, cover.inner)), fill: fills[index], radius: cover.radius }));
  window.__fragmentsMaskCovers = covers.map(({ element, inner }) => ({ element, inner }));

  // The camera's proof, found afresh from the page as it is: every value, and everything written over where one is
  // shown, is drawn in no way at all. That covers stay where they were while a tile is pictured is the seal's.
  const refuse = () => { throw new Error(refusal); };
  const glyphless = (computed, file) => computed.visibility === 'hidden' || (alpha(computed.getPropertyValue('-webkit-text-fill-color')) === 0 && computed.getPropertyValue('-webkit-text-security') !== 'none' && (!computed.textShadow || computed.textShadow === 'none') && (!(parseFloat(computed.getPropertyValue('-webkit-text-stroke-width')) > 0) || alpha(computed.getPropertyValue('-webkit-text-stroke-color')) === 0) && (computed.textDecorationLine === 'none' || alpha(computed.textDecorationColor) === 0) && (!/text/.test(computed.backgroundClip + ' ' + computed.webkitBackgroundClip) || (computed.backgroundImage === 'none' && alpha(computed.backgroundColor) === 0)) && (!file || alpha(computed.color) === 0));
  // Its own sheet, whole and for every medium: a page that sets its media to 'print' turns every rule off.
  for (const root of roots) { const sheet = own(root); if (!sheet || !sheet.isConnected || !sheet.sheet || sheet.sheet.disabled || sheet.sheet.media.length || sheet.textContent !== rules) refuse(); }
  for (const element of valued) {
    const computed = getComputedStyle(element);
    if (!glyphless(computed, element.localName === 'input' && element.type === 'file')) refuse();
    if (element.matches(editable)) {
      for (const inner of element.querySelectorAll('*')) if (getComputedStyle(inner).visibility !== 'hidden') refuse();
      if (computed.visibility !== 'hidden') for (const pseudo of ['::first-letter', '::first-line']) if (!glyphless(getComputedStyle(element, pseudo))) refuse();
    }
  }
  for (const element of standIns) if (!glyphless(getComputedStyle(element))) refuse();
  for (const element of placeholders) if (written(element.getAttribute('placeholder'))) refuse();
  for (const parent of copies.keys()) {
    const computed = getComputedStyle(parent);
    if (!glyphless(computed)) refuse();
    if (computed.visibility !== 'hidden') for (const pseudo of ['::first-letter', '::first-line']) if (!glyphless(getComputedStyle(parent, pseudo))) refuse();
  }
  for (const [element, pseudo] of generated) if (!glyphless(getComputedStyle(element, pseudo))) refuse();
  for (const element of hiddenPictures) if (getComputedStyle(element).visibility !== 'hidden') refuse();
  return { boxes: [...shownAt, ...covers.map((cover) => cover.rect)].map(box), covers: tile ? painted.filter((at) => shows({ left: at.x, top: at.y, right: at.x + at.width, bottom: at.y + at.height })) : painted };
}`,Qt=String.raw`function () {
  if (window.__fragmentsMaskSentinel) return window.__fragmentsMaskSentinel;
  const sentinel = { generation: 0 };
  let observer = null, watched = new WeakSet();
  const options = { subtree: true, childList: true, attributes: true, characterData: true };
  sentinel.count = () => { if (observer && observer.takeRecords().length) sentinel.generation++; return sentinel.generation; };
  sentinel.forget = () => { observer?.takeRecords(); };
  // Watching starts with the camera's first hide, not at document start: only changes after hiding matter to the seal,
  // and the live page, which shares the extension, pays nothing for it.
  sentinel.start = () => { if (observer) return; observer = new MutationObserver(() => { sentinel.generation++; }); watched = new WeakSet(); sentinel.watch(document); };
  sentinel.stop = () => { if (!observer) return; observer.disconnect(); observer = null; sentinel.generation++; };
  sentinel.watch = (root) => { if (observer && !watched.has(root)) { watched.add(root); observer.observe(root, options); } };
  Object.defineProperty(window, '__fragmentsMaskSentinel', { value: sentinel });
  return sentinel;
}`,en=String.raw`function () {
  const sentinel = window.__fragmentsMaskSentinel, placeOf = ${ct};
  const shadowOf = ${lt}, roots = [document];
  for (let index = 0; index < roots.length; index++) for (const element of roots[index].querySelectorAll('*')) { const shadow = shadowOf(element); if (shadow && shadow.mode !== 'user-agent') roots.push(shadow); }
  // Elements by a number of their own, kept in the world, so the seal can name which one is focused or open.
  const ids = window.__fragmentsMaskIds || (window.__fragmentsMaskIds = { next: 0, of: new WeakMap() });
  const idOf = (element) => { let id = ids.of.get(element); if (id === undefined) ids.of.set(element, id = ++ids.next); return id; };
  const read = [sentinel ? sentinel.count() : 'unwatched', roots.length, scrollX, scrollY, location.hash];
  for (let active = document.activeElement; active; active = shadowOf(active)?.activeElement || null) read.push('focus', idOf(active));
  // Each state this engine can match, asked of it once.
  const states = window.__fragmentsMaskStates || (window.__fragmentsMaskStates = [':popover-open', ':modal', ':open', ':not(:defined)'].filter((state) => { try { return CSS.supports('selector(' + state + ')'); } catch { return false; } }).join(','));
  for (const root of roots) {
    if (states) { read.push('states'); for (const element of root.querySelectorAll(states)) read.push(idOf(element)); }
    for (const field of root.querySelectorAll('input,textarea,select')) {
      read.push(field.value, field.checked, field.indeterminate);
      if (field.localName === 'select') for (const option of field.selectedOptions) read.push(option.index);
      else if (field.type === 'file') for (const file of field.files || []) read.push(file.name);
    }
    for (const frame of root.querySelectorAll('iframe,frame,object,embed')) { let inner = null; try { inner = frame.contentDocument; } catch {} read.push('frame', inner ? idOf(inner) + inner.readyState : 'away'); }
    for (const sheet of [...root.styleSheets, ...(root.adoptedStyleSheets || [])]) {
      read.push(sheet.disabled, sheet.media.mediaText);
      let rules;
      try { rules = sheet.cssRules; } catch { read.push('unread'); continue; }
      read.push(rules.length);
      for (const rule of rules) read.push(rule.cssText);
    }
  }
  for (const { element, inner } of window.__fragmentsMaskCovers || []) { if (!element.isConnected) { read.push('gone'); continue; } const at = placeOf(element, inner); read.push(at.left, at.top, at.width, at.height); }
  const text = read.join('\u0001'), last = window.__fragmentsMaskSealed;
  if (last && last.text === text) return last.name;
  const name = (last ? Number(last.name.split(':')[0]) + 1 : 1) + ':' + text.length;
  window.__fragmentsMaskSealed = { text, name };
  return name;
}`,Ie="fragments-mask",tn=String.raw`(() => {
  if (globalThis.fragmentsMask) return;
  const sentinel = (${Qt})(), mask = (${Zt}), seal = (${en});
  // Each run counts the page's changes before it and forgets its own after it. Hiding starts the sentinel's watch.
  const run = (mode, scope) => { const start = performance.now(); if (mode === 'hide') sentinel.start(); sentinel.count(); try { return { ...mask(mode, scope), ms: performance.now() - start }; } finally { sentinel.forget(); } };
  const tile = () => {
    try { return { ...run('confirm', 'viewport'), again: false, seal: seal() }; } catch {}
    run('hide');
    return { ...run('confirm', 'viewport'), again: true, seal: seal() };
  };
  const own = (change) => { sentinel.count(); try { return change(); } finally { sentinel.forget(); } };
  Object.defineProperty(globalThis, 'fragmentsMask', { value: Object.freeze({ hide: () => ({ ...run('hide'), seal: seal() }), tile, seal, confirm: () => run('confirm', 'document'), end: () => sentinel.stop(), own, measure: () => own(() => mask('measure')) }) });
})();
`,nn=["localhost","127.0.0.1","[::1]","*.localhost"].flatMap(e=>["http","https"].map(t=>`${t}://${e}/*`));function Re({matches:e=nn}={}){return{"manifest.json":JSON.stringify({manifest_version:3,name:Ie,version:"1.0",content_scripts:[{matches:e,js:["world.js"],run_at:"document_start",all_frames:!0,match_about_blank:!0}]},null,2)+`
`,"world.js":tn}}var he=e=>e!==null&&typeof e=="object"&&!Array.isArray(e),Oe=["rasterization","gpu_compositing","2d_canvas","webgl"],dt=["vendor","device","driver"],Pe=(e,t=200)=>typeof e=="string"&&e.length>0&&e.length<=t;var rn=e=>he(e)&&["raster","gpu","recipe","canary"].some(t=>t in e);function be(e){if(!(!he(e)||e.engine!=="chromium"||!Pe(e.version)||!/^[0-9]+(?:\.[0-9]+)*$/.test(e.version)||!["macOS","Windows","Linux"].includes(e.os))&&!(!Number.isFinite(e.dpr)||e.dpr<=0||!Number.isSafeInteger(e.recipe)||e.recipe<0||!Pe(e.canary,128))&&!(!he(e.raster)||!Oe.every(t=>Pe(e.raster[t],64)))&&!(!he(e.gpu)||!dt.every(t=>typeof e.gpu[t]=="string"&&e.gpu[t].length<=200)))return{engine:"chromium",version:e.version,dpr:e.dpr,os:e.os,raster:Object.fromEntries(Oe.map(t=>[t,e.raster[t]])),gpu:Object.fromEntries(dt.map(t=>[t,e.gpu[t]])),recipe:e.recipe,canary:e.canary}}function _e(e){if(rn(e)){let t=be(e);return t?JSON.stringify(["canonical",t.engine,t.version.split(".")[0],t.dpr,t.os,Oe.map(r=>t.raster[r]),t.recipe,t.canary]):null}return!he(e)||!["engine","version","os"].every(t=>typeof e[t]=="string"&&!!e[t])||!Number.isFinite(e.dpr)||e.dpr<=0?null:JSON.stringify(["legacy",e.engine,e.version,e.dpr,e.os])}var de=2;function xe({product:e,dpr:t,platform:r,gpu:a,recipe:n,canary:i}){let o=/^(?:Chrome|HeadlessChrome|Chromium)\/([0-9]+(?:\.[0-9]+)*)$/.exec(e)?.[1],l={win32:"Windows",darwin:"macOS",linux:"Linux"}[r],c=a?.devices?.[0],h=a?.featureStatus;if(!o||!l||![1,2].includes(t)||n!==de||typeof i!="string"||!/^[a-f0-9]{64}$/.test(i)||!c||!["vendorId","deviceId"].every(g=>Number.isSafeInteger(c[g])&&c[g]>=0)||!["vendorString","deviceString","driverVendor","driverVersion"].every(g=>typeof c[g]=="string")||!(c.vendorString||c.vendorId)||!(c.deviceString||c.deviceId))throw new Error("Renderer identity needs actual browser, platform, GPU, recipe and canary facts.");let f=be({engine:"chromium",version:o,dpr:t,os:l,raster:h,gpu:{vendor:c.vendorString||`0x${c.vendorId.toString(16)}`,device:c.deviceString||`0x${c.deviceId.toString(16)}`,driver:[c.driverVendor,c.driverVersion].filter(Boolean).join(" ")},recipe:n,canary:i});if(!f)throw new Error("Renderer identity did not contain complete GPU feature facts.");return f}async function Le(e){let t=await ke(e),r=`(${rt.toString()})()`,a=await K(e,t,r);if(![a?.width,a?.height].every(i=>Number.isSafeInteger(i)&&i>0)||![1,2].includes(a.dpr))throw new Error("The canary did not report its actual aperture.");let n=await wt(e);try{let i=await K(e,t,r);if(!n.settled||n.frame.flat||n.frame.width!==a.width*a.dpr||n.frame.height!==a.height*a.dpr||i?.width!==a.width||i?.height!==a.height||i?.dpr!==a.dpr)throw new Error("The camera canary was blank, changing or at a different aperture.");return{sha:n.frame.sha,width:n.frame.width,height:n.frame.height,dpr:a.dpr}}finally{e.drop([n.frame.handle])}}var on=`(async () => { ${st} })()`,ut=new WeakMap,ft="login|log-in|log_in|signin|sign-in|sign_in",pt=(e,t)=>new RegExp(`(?:^|/)(?:(?:${t})(?:[-_]?[0-9]+)?|${e})(?=$|/)`,"i"),an=pt("auth|sso|sessions?",ft),sn=pt("auth|sso|sessions?|register|reset|forgot|password|(?:forgot|reset)[-_]?password",`${ft}|signup|sign-up|sign_up`),ln=/^\/(?:errors?\/)?(?:401|403|404|500|503)$/,$e=e=>typeof e=="string"&&e.startsWith("/")&&!e.startsWith("//")&&!/[?#\\\u0000-\u001f\u007f]/.test(e);function Fe({target:e,landed:t,status:r,offSite:a,health:n={},pictureMissing:i=!1}){if(!$e(e)||typeof i!="boolean"||!n||typeof n!="object"||Array.isArray(n)||a!=null&&(typeof a!="string"||!a.trim())||["password","notFound","boundarySuspected"].some(h=>n[h]!==void 0&&typeof n[h]!="boolean")||n.inputs!==void 0&&(!Number.isSafeInteger(n.inputs)||n.inputs<0)||n.error!==void 0&&typeof n.error!="string")throw new Error("Landing classification needs owner-reported paths, HTTP status and page facts.");if(a){let h=new URL(a);if(!["http:","https:"].includes(h.protocol)||!h.hostname)throw new Error("Landing classification needs the blocked HTTP address.");return{status:"needs-sign-in",reason:`It goes to ${h.hostname} to sign in.`}}if(!$e(t)||!Number.isInteger(r)||r<100||r>599)throw new Error("Landing classification needs owner-reported paths, HTTP status and page facts.");if(r>=400&&!i)return{status:"missing",reason:`The server answered HTTP ${r}.`};let o=r<400&&n.notFound===!0&&!ln.test(e);if(o&&!i)return{status:"missing",reason:"The app shows its not-found page at this address."};if(r===401||r===403)return{status:"needs-sign-in",reason:`The server answered HTTP ${r}: it wants a sign-in.`};let l=r>=400?[404,410].includes(r)?`Not found: the server answered HTTP ${r}.`:`The server answered HTTP ${r}.`:n.error?`The page shows an error: ${n.error.slice(0,300)}`:o?"Not found: the app shows its not-found page at this address.":void 0;return l||n.boundarySuspected?{status:"error",reason:l||"The page may be showing an error message instead of its content."}:n.password===!0&&(an.test(t)||n.inputs!==void 0&&n.inputs<=4)&&(t!==e||!sn.test(e))?{status:"needs-sign-in",reason:"This page shows a sign-in form in place of the requested page."}:{status:"pictured"}}function mt(e){if(!e||typeof e!="object"||["places","health"].some(t=>typeof e[t]!="string"||!e[t].trim())||["places","health","routes","index","compactPlaces"].some(t=>e[t]!==void 0&&(typeof e[t]!="string"||e[t].length>2097152)))throw new Error("The camera needs its owner-supplied page reader expressions.")}async function cn(e,t){mt(t);let r=`(() => {
    let places = (${t.places});
    if (Array.isArray(places?.probes) && places.probes.length > 2000) { places.probes = places.probes.slice(0, 2000); places.truncated = true; }
    ${t.compactPlaces?`places = (${t.compactPlaces})(places);`:""}
    const around = 'header,nav,aside,footer,[role=navigation],[role=banner],[role=contentinfo],[role=complementary]';
    const links = [...document.querySelectorAll('a[href]')].filter(a => a.origin === location.origin && !a.search && !a.hasAttribute('download') && (!a.target || a.target === '_self'));
    const client = document.documentElement.clientWidth, over = Math.max(0, Math.ceil(Math.max(document.documentElement.scrollWidth, document.body?.scrollWidth || 0) - client));
    const index = over ? places?.els?.find(row => row[4] > 0 && row[2] + row[4] > client + 1)?.[0] : undefined;
    return { landed: location.pathname.replace(/\\/+$/, '') || '/', title: document.title.slice(0, 200), width: innerWidth, viewportHeight: innerHeight,
      height: Math.max(document.documentElement.scrollHeight, document.body?.scrollHeight || 0, innerHeight),
      theme: ['light','dark'].includes(document.documentElement.dataset.theme) ? document.documentElement.dataset.theme : document.documentElement.classList.contains('dark') ? 'dark' : document.documentElement.classList.contains('light') ? 'light' : matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
      links: [...new Set(links.map(a => a.pathname))].slice(0, 400), menu: [...new Set(links.map(a => a.pathname))].filter(path => links.every(a => a.pathname !== path || a.closest(around))).slice(0, 400),
      runtimeRoutes: ${t.routes?`(${t.routes})`:"[]"}, places, health: { ...(${t.health}), ...(${nt.toString()})() },
      overflow: { width: innerWidth, over, ...(index === undefined ? {} : { index }) }, index: ${t.index?`(() => { try { return (${t.index}); } catch { return null; } })()`:"null"} };
  })()`,a=await e.send("Runtime.evaluate",{expression:r,awaitPromise:!0,returnByValue:!0}),n=a?.result?.value,i=n?.places;if(a?.exceptionDetails!==void 0||a?.result?.type!=="object"||!n||typeof n!="object"||!$e(n.landed)||typeof n.title!="string"||!["light","dark"].includes(n.theme)||![n.width,n.viewportHeight].every(o=>Number.isSafeInteger(o)&&o>0)||!Number.isFinite(n.height)||n.height<n.viewportHeight||!n.health||typeof n.health!="object"||!["links","menu","runtimeRoutes"].every(o=>Array.isArray(n[o])&&n[o].length<=(o==="runtimeRoutes"?1e5:400))||!i||!["anchors","els","styles"].every(o=>Array.isArray(i[o])&&i[o].length<=1e5)||i.anchors.some(o=>!o||typeof o!="object"||Array.isArray(o))||i.els.some(o=>!Array.isArray(o)||o.length<8||!Number.isInteger(o[0])||o[0]<0||o[0]>=i.anchors.length||o.slice(2,6).some(l=>!Number.isFinite(l))||o[4]<0||o[5]<0)||!n.overflow||n.overflow.width!==n.width||!Number.isSafeInteger(n.overflow.over)||n.overflow.over<0||n.overflow.index!==void 0&&(!Number.isSafeInteger(n.overflow.index)||n.overflow.index<0||n.overflow.index>=i.anchors.length))throw new Error("The page did not return complete camera reader facts.");for(let o of["links","menu","runtimeRoutes"])n[o]=[...new Set(n[o].map(l=>ce(l)).filter(Boolean))];return n}function dn(e,t){let r=new Map,a=new Map(e.els.map(c=>[c[0],c])),n=new Map;e.anchors.forEach((c,h)=>{let f=c?.dom?.path;typeof f=="string"&&r.set(f,r.has(f)?-1:h)}),t.anchors.forEach(c=>{let h=c?.dom?.path;typeof h=="string"&&n.set(h,(n.get(h)||0)+1)});let i=[],o=new Set;for(let c of t.els){let h=t.anchors[c[0]],f=h?.dom?.path,g=r.get(f),p=a.get(g);!p||g<0||n.get(f)!==1||h?.masked||e.anchors[g]?.masked||(i.push([f,h,p,c]),(p[7]!==c[7]||p.slice(2,6).some((T,M)=>Math.abs(T-c[M+2])>1))&&o.add(f))}function l(c){let h=[],f=new Set,g=p=>{let T=Math.floor(p[2]),M=Math.floor(p[3]),$=Math.ceil(p[2]+p[4])-T,C=Math.ceil(p[3]+p[5])-M;if(!$||!C)return;let I=[T,M,$,C].join(",");if(!f.has(I)&&(f.add(I),h.push({x:T,y:M,width:$,height:C,radius:0,fill:[229,229,229,255]}),h.length>4e3))throw new Error("The page has too many volatile regions for a bounded picture.")};for(let[p,T,M,$]of i)c.has(p)&&(T.volatile=!0,g(M),g($));return h}return{changed:o,cover:l}}function un(e,t,r){let n=Math.ceil(t/8),i=Math.ceil(r/8),o=new Uint8Array(n*i),l=0;for(let c of e)for(let h=Math.max(0,Math.floor(c.y/8));h<Math.min(i,Math.ceil((c.y+c.height)/8));h++)for(let f=Math.max(0,Math.floor(c.x/8));f<Math.min(n,Math.ceil((c.x+c.width)/8));f++)o[h*n+f]||(o[h*n+f]=1,l++);return l/(n*i)}async function hn(e,t,r){let a=await e.send("Runtime.evaluate",{expression:t,awaitPromise:!0,returnByValue:!0});if(a?.exceptionDetails!==void 0||a?.result?.type!=="boolean"||a.result.value!==!0)throw new Error(r);return!0}async function fn(e){let t=await e.send("Runtime.evaluate",{expression:on,awaitPromise:!0,returnByValue:!0});if(t?.exceptionDetails===void 0&&t?.result?.type==="string"&&t.result.value==="busy")throw Object.assign(new Error("The page was still loading when the camera stopped waiting for it."),{cameraFailure:"loading"});if(t?.exceptionDetails!==void 0||t?.result?.type!=="boolean"||t.result.value!==!0)throw new Error("The page did not complete the camera quiet check.");return!0}async function pn(e){await e.send("Animation.enable"),await e.send("Animation.setPlaybackRate",{playbackRate:0})}async function mn(e){await e.send("Animation.setPlaybackRate",{playbackRate:1}),await e.send("Animation.disable")}async function ke(e){let t=new Map,r=[],a=[],n,i=!1,o=!1;try{if(r.push(e.on("Runtime.executionContextCreated",h=>{let f=h?.context;f?.name===Ie&&f.auxData?.type==="isolated"&&typeof f.uniqueId=="string"&&f.uniqueId&&t.set(f.uniqueId,{uniqueId:f.uniqueId,frameId:f.auxData.frameId})})),r.push(e.on("Runtime.executionContextDestroyed",h=>{typeof h?.executionContextUniqueId=="string"&&h.executionContextUniqueId?t.delete(h.executionContextUniqueId):o=!0})),r.push(e.on("Runtime.executionContextsCleared",()=>t.clear())),i=!0,await e.send("Runtime.enable"),n=(await e.send("Page.getFrameTree"))?.frameTree?.frame?.id,typeof n!="string"||!n)throw new Error("The camera could not identify its main frame.")}catch(c){a.push(c)}finally{if(i)try{await e.send("Runtime.disable")}catch(c){a.push(c)}for(let c of r.reverse())try{c()}catch(h){a.push(h)}}if(a.length===1)throw a[0];if(a.length)throw new AggregateError(a,"The camera mask-world session did not finish cleanly.");let l=[...t.values()].filter(c=>c.frameId===n);if(o||l.length!==1)throw new Error("The camera did not identify exactly one isolated mask world in its main frame.");return l[0].uniqueId}async function K(e,t,r){if(typeof t!="string"||!t||typeof r!="string"||!r.trim())throw new Error("Mask evaluation needs its unique world and an expression.");let a=await e.send("Runtime.evaluate",{expression:r,uniqueContextId:t,awaitPromise:!0,returnByValue:!0});if(a?.exceptionDetails!==void 0||typeof a?.result?.type!="string"||a.result.type!=="undefined"&&!Object.hasOwn(a.result,"value"))throw new Error("The camera mask-world evaluation did not return a value.");return a.result.value}function Be({budgetMs:e,maxCss:t=12e3,firstScreenOnly:r=!1}){if(!Number.isFinite(e)||e<=0||!Number.isSafeInteger(t)||t<=0||t>12e3||typeof r!="boolean")throw new Error("Camera viewport preparation needs a positive page-clock budget and a CSS limit from 1 to 12000.");return{budgetMs:e,maxCss:t,firstScreenOnly:r}}function gt(e){if(!Number.isFinite(e?.top)||e.top<0||!Number.isSafeInteger(e.width)||e.width<=0||!Number.isSafeInteger(e.height)||e.height<=0||!Number.isFinite(e.pageHeight)||e.pageHeight<e.height)throw new Error("The camera did not return complete viewport facts.");return e}function je(e){if(gt(e),!Number.isFinite(e.warmedHeight)||e.warmedHeight<0)throw new Error("The camera did not return complete viewport facts.");return e}async function gn(e,t,r){let a=Be(r),n=je(await K(e,t,`(${me.toString()})(${JSON.stringify({...a,mode:"warm"})})`));await fn(e);let i=gt(await K(e,t,`(${me.toString()})(${JSON.stringify({...a,mode:"still"})})`)),o={top:i.top,width:i.width,height:i.height,pageHeight:i.pageHeight};if(o.width!==n.width||o.height!==n.height)throw new Error("The camera viewport changed size during preparation.");if(o.top!==0)throw new Error("The camera did not remain at the top after preparation.");let l=Math.min(a.maxCss,a.firstScreenOnly?n.height:o.pageHeight);return je({...n,...o,failedAnimations:n.failedAnimations+i.failedAnimations,growing:o.pageHeight>n.initialHeight,cut:o.pageHeight>a.maxCss,limited:n.limited||Math.ceil(n.warmedHeight)<l})}async function ht(e,t,{top:r,first:a,last:n,budgetMs:i}){let o=Be({budgetMs:i});if(!Number.isSafeInteger(r)||r<0||r>12e3||typeof a!="boolean"||typeof n!="boolean")throw new Error("Camera tile positioning needs a CSS offset from 0 to 12000 and explicit first/last flags.");return je(await K(e,t,`(${me.toString()})(${JSON.stringify({...o,mode:"tile",top:r,first:a,last:n})})`))}async function wt(e){let t=new Set,r=new Set;async function a(){let n=await e.frame();if(!Number.isSafeInteger(n?.handle)||n.handle<=0||r.has(n.handle))throw new Error("The camera did not supply a new frame handle.");if(r.add(n.handle),t.add(n.handle),!Number.isSafeInteger(n.width)||n.width<=0||!Number.isSafeInteger(n.height)||n.height<=0||typeof n.sha!="string"||!/^[a-f0-9]{64}$/.test(n.sha)||typeof n.flat!="boolean")throw new Error("The camera did not supply a complete raw-frame record.");return{handle:n.handle,sha:n.sha,width:n.width,height:n.height,flat:n.flat}}try{let n=await a();for(let i=2;i<=5;i++){let o=performance.now();for(;performance.now()-o<100;)await new Promise(h=>setTimeout(h,Math.max(1,100-(performance.now()-o))));let l=await a();if(l.width!==n.width||l.height!==n.height)throw new Error("The camera frame dimensions changed during settling.");let c=l.sha===n.sha;if(e.drop([n.handle]),t.delete(n.handle),n=l,c||i===5)return t.delete(l.handle),{frame:l,settled:c,frames:i}}}finally{t.size&&e.drop([...t])}}function yt(e){if(!Array.isArray(e?.covers))throw new Error("The camera mask did not supply its cover proof.");return e.covers.map(t=>{if(![t?.x,t?.y,t?.width,t?.height].every(Number.isSafeInteger)||t.width<=0||t.height<=0||!Number.isFinite(t.radius)||t.radius<0||!Array.isArray(t.fill)||t.fill.length!==4||!t.fill.every(r=>Number.isInteger(r)&&r>=0&&r<=255))throw new Error("The camera mask did not supply complete cover metadata.");return{x:t.x,y:t.y,width:t.width,height:t.height,fill:[...t.fill],radius:t.radius}})}function ve(e){if(typeof e?.seal!="string"||!e.seal)throw new Error("The camera mask did not supply its tile proof.");return{seal:e.seal,covers:yt(e),boxes:bt(e)}}function bt(e){if(!Array.isArray(e?.boxes)||e.boxes.length>4e3)throw new Error("The camera mask did not return bounded form geometry.");return e.boxes.map(t=>{if(![t?.x,t?.y,t?.width,t?.height].every(Number.isSafeInteger)||t.width<=0||t.height<=0)throw new Error("The camera mask did not return complete form geometry.");return{x:t.x,y:t.y,width:t.width,height:t.height,reason:"form-value"}})}async function wn(e,t){let r,a=0;try{for(let n=0;n<3;n++){let i=ve(await K(e,t,"fragmentsMask.tile()")),o=await wt(e);r=o.frame.handle,a+=o.frames;let l=await K(e,t,"fragmentsMask.seal()");if(typeof l!="string"||!l)throw new Error("The camera mask did not supply its post-frame seal.");if(l===i.seal)return r=void 0,{...o,covers:i.covers,boxes:i.boxes,retakes:n,shots:a};if(e.drop([r]),r=void 0,n===2)throw new Error("The camera mask changed during three attempts at the same tile.");ve(await K(e,t,"fragmentsMask.hide()"))}}finally{r!==void 0&&e.drop([r])}}async function yn(e,t,r={}){let{width:a,height:n=900,dpr:i,maskWorld:o,staging:l,kept:c,deadline:h,signal:f,reload:g}=t,p=Be(t),T=h-Date.now();if(!Number.isSafeInteger(a)||a<=0||!Number.isSafeInteger(n)||n<=0||![1,2].includes(i)||a*i>32768||n*i>32768||a*n*i*i>32e6||typeof l!="string"||!l||!Number.isFinite(h)||T<=0||T>2147483647||o!==void 0&&(typeof o!="string"||!o)||g!==void 0&&typeof g!="function")throw new Error("A camera tile job needs its fixed aperture, private staging, live deadline and optional owner reload.");let M=AbortSignal.timeout(Math.ceil(T)),$=f?AbortSignal.any([f,M]):M,C=()=>{if($.throwIfAborted(),Date.now()>=h)throw new Error("The camera tile job reached its deadline.")},I=()=>(C(),Math.min(p.budgetMs,Math.max(1,h-Date.now()))),N=o,D=0,R=0,F=0;async function q(){let m=Date.now(),b=()=>F>=2||h-Date.now()<Date.now()-m,S=_=>Object.assign(new Error(_),b()?{}:{code:"CAMERA_UNSETTLED"}),w=!1,x=!1,s=!1,d=!1,u,y,E=!1,P=!0,j=0,v=0,k=0,W=0,V,L,B,z=[],H=new Set;async function U(){if(!x){if(x=!0,await K(e,N,"fragmentsMask.end()")!==void 0)throw new Error("The camera mask did not finish its job.");w=!0}}function te(_){if(_.width!==a||_.height!==n)throw new Error("The camera aperture changed during its tile job.");if(![_.failedImages,_.failedAnimations].every(Y=>Number.isSafeInteger(Y)&&Y>=0))throw new Error("The camera viewport did not return its asset-readiness facts.");return k+=_.failedImages,W+=_.failedAnimations,V=_.pageHeight,_}try{C();let _=te(await gn(e,N,{...p,budgetMs:I()}));if(C(),E=!0,await pn(e),C(),await r.start?.(),C(),!Number.isFinite(_.initialHeight)||_.initialHeight<n||typeof _.limited!="boolean")throw new Error("The camera did not return its initial warm-region facts.");let Y=Number.isSafeInteger(_.foot*i)&&Math.abs(_.foot-_.pageHeight)<1?_.foot:Math.ceil(_.pageHeight),J=Math.min(p.maxCss,p.firstScreenOnly?n:Y),fe=ve(await K(e,N,"fragmentsMask.hide()"));r.mask?.(fe.boxes),C();async function*O(){let G=0,Z;try{let ae=Math.ceil(J/n)+2;for(let se=0;G<J;se++){if(C(),se>=ae)throw new Error("The camera tiles did not make bounded scroll progress.");let Ze=Math.min(Math.floor(G),Math.max(0,Math.ceil(J-n))),Qe=Ze+n>=J,re=te(await ht(e,N,{top:Ze,first:se===0,last:Qe,budgetMs:I()}));if(!Number.isSafeInteger(re.top*i)||se===0&&re.top!==0||re.top>G||re.top+n<=G)throw new Error("The camera tiles have a scroll gap or no progress.");let et=Math.abs(re.top+n-J);if(Qe&&et>0&&et<1)throw S("The page changed where it ends while it was pictured.");let ne=await wn(e,N),ue=ne.frame.handle;try{if(C(),j+=ne.shots,v+=ne.retakes,ne.frame.width!==a*i||ne.frame.height!==n*i||H.has(ue))throw new Error("The camera did not retain a fresh viewport at its fixed aperture.");if(H.add(ue),se===0){if(ne.frame.flat)throw Object.assign(new Error("The camera first viewport is blank."),{code:"CAMERA_BLANK",shots:j});L=ne.frame.sha,B=ue}P&&=ne.settled,r.mask?.(ne.boxes),z.push(re.top),yield{handle:ue,top:re.top,covers:ne.covers,low:re.low}}finally{e.drop([ue])}G=Math.min(J,re.top+n)}C();let Xe=await K(e,N,"fragmentsMask.confirm()"),Bt=bt(Xe);if(r.mask?.(Bt),yt(Xe),C(),te(await ht(e,N,{top:0,first:!0,last:z.length===1,budgetMs:I()})).top!==0)throw new Error("The camera could not return to the top for its final check.");await r.afterTiles?.({last:b()}),C();let Ye=ve(await K(e,N,"fragmentsMask.tile()"));r.mask?.(Ye.boxes);let Q=await e.frame();try{if(j++,C(),!Number.isSafeInteger(Q?.handle)||Q.handle<=0||Q.handle===B||H.has(Q.handle)||Q.width!==a*i||Q.height!==n*i||typeof Q.sha!="string"||!/^[a-f0-9]{64}$/.test(Q.sha)||typeof Q.flat!="boolean")throw new Error("The camera did not return a fresh final viewport record.");if(await K(e,N,"fragmentsMask.seal()")!==Ye.seal)throw S("The camera mask changed during its final top-frame check.");P&&=Q.sha===L}finally{Number.isSafeInteger(Q?.handle)&&Q.handle>0&&e.drop([Q.handle])}s=!0}catch(ae){throw Z=ae,ae}finally{try{await U()}catch(ae){throw Z?new AggregateError([Z,ae],"The camera tile proof and mask cleanup failed."):ae}}}y=O();let A=await e.compose({width:a,height:J,dpr:i,staging:l,kept:r.kept?r.kept():c,signal:$,tiles:y,...r.finalCovers?{finalCovers:r.finalCovers}:{}});if(C(),!s||!w||typeof A?.mark!="string"||!/^[a-f0-9]{24}$/.test(A.mark)||A.width!==a*i||A.height!==J*i||typeof A.unchanged!="boolean"||!A.files||typeof A.files!="object"||(A.unchanged?Object.keys(A.files).length!==0:typeof A.files.picture!="string"||!A.files.picture)||!Array.isArray(A.tiles)||A.tiles.length!==z.length||!A.tiles.every((G,Z)=>G.top===z[Z]&&G.width===a*i&&G.height===Math.min(n*i,A.height-G.top*i)&&typeof G.sha=="string"&&/^[a-f0-9]{64}$/.test(G.sha)))throw new Error("The camera compositor did not complete the proved tile stream.");return{...A,settled:P,cssHeight:J,viewportHeight:n,cut:V>Math.ceil(J),limited:_.limited||!p.firstScreenOnly&&V>Math.ceil(J)&&J<p.maxCss,growing:V>_.initialHeight,failedImages:k,failedAnimations:W,shots:j+R,retakes:v,tileCount:z.length,reloads:D,unsettled:F}}catch(_){throw d=!0,u=_,_?.code==="CAMERA_UNSETTLED"&&(_.shots=j),_}finally{let _=[];try{await y?.return()}catch(Y){_.push(Y)}try{await U()}catch(Y){_.push(Y)}if(E)try{await mn(e)}catch(Y){_.push(Y)}if(_.length)throw new AggregateError(d?[u,..._]:_,"The camera tile job did not finish its owned cleanup.")}}for(;;){C(),N??=await ke(e);try{return await q()}catch(m){if(m?.code==="CAMERA_UNSETTLED"&&F<2){R+=m.shots,F++;continue}if(m?.code!=="CAMERA_BLANK"||D||!g)throw m;R+=m.shots,C(),await g(),C(),D++,N=void 0}}}async function He(e,t,{reads:r,landing:a,renderer:n,maskWorld:i,reload:o,volatile:l=!1,walk:c}={}){let h=performance.now(),f={capture:0,mask:0,reads:0,cdpMessages:0},g,p,T,M=[],$=!1,C=new Map,I=new Map,N=(m,b)=>{let S=dn(m.places,b.places);for(let w of S.changed)I.set(w,(I.get(w)||0)+1);return S},D=async(m,b)=>{let S=performance.now();try{return await b()}finally{f[m]+=performance.now()-S}},R={async send(m,b){f.cdpMessages++;let S=()=>e.send(m,b);return m==="Runtime.evaluate"&&b?.expression?.startsWith("fragmentsMask.")?D("mask",S):S()},on(m,b){return e.on(m,b)},frame(){return D("capture",()=>e.frame())},drop(m){return e.drop(m)},compose(m){return e.compose(m)}};function F(m){for(let b of m)C.set([b.x,b.y,b.width,b.height,b.reason].join(","),{...b});if(C.size>4e3)throw new Error("The shot has too much proved mask geometry.")}async function q(){return D("reads",async()=>{let m=await a(),b=Fe({target:t.route,...m,pictureMissing:t.pictureMissing??!1});if(m?.offSite||b.status==="missing")throw Object.assign(new Error(b.reason),{cameraFailure:m?.offSite?"needs-sign-in":"missing"});let S=await cn(R,r);if(S.width!==t.width||S.viewportHeight!==(t.height??900)||m?.landed!==S.landed)throw new Error("The owner landing or aperture differs from the page read.");let w=Fe({target:t.route,...m,health:S.health,pictureMissing:t.pictureMissing??!1});if(w.status==="missing")throw Object.assign(new Error(w.reason),{cameraFailure:"missing"});return T=w,S})}try{mt(r);let m=be(n);if(!t||ce(t.route)!==t.route||!["light","dark"].includes(t.theme)||typeof t.state!="string"||!t.state||typeof(t.pictureMissing??!1)!="boolean"||typeof a!="function"||typeof l!="boolean"||c!==void 0||!m||m.recipe!==de||m.dpr!==t.dpr)throw new Error("A shot needs its loaded job, readers, actual renderer/landing and supported volatility option.");let b=o&&(async()=>{p=void 0,I.clear(),await o()}),S=await yn(R,{...t,budgetMs:t.budgetMs??5e3,maskWorld:i,reload:b,kept:void 0},{async start(){M=[],C.clear(),$=!1;let s=await q();l&&p&&N(p,s),g=p=s},mask:F,async afterTiles({last:s}){if(p=await q(),p.landed!==g.landed)throw new Error("The page changed its landed route during the picture.");if(l){let d=N(g,p);if(!s&&[...d.changed].some(u=>I.get(u)===1))throw Object.assign(new Error("The page changed while it was pictured."),{code:"CAMERA_UNSETTLED"});if(M=d.cover(new Set([...d.changed,...[...I].filter(([,u])=>u>1).map(([u])=>u)])),un(M,t.width,t.height??900)>.5)throw Object.assign(new Error("The page kept changing while it was pictured."),{cameraFailure:"unsettled"})}F(M.map(({x:d,y:u,width:y,height:E})=>({x:d,y:u,width:y,height:E,reason:"volatile"}))),$=!0},finalCovers:()=>M,kept:()=>t.kept&&g.theme===t.theme&&t.kept.viewportHeight===(t.height??900)&&_e(t.kept.renderer)===_e(m)?t.kept.mark:void 0});if(!$)throw new Error("The shot did not complete its private reads and proofs.");let w=performance.now()-h,x=S.timings?.imaging;if(!Number.isFinite(x)||x<0)throw new Error("The shot compositor did not report its measured work.");return{...S,route:t.route,width:t.width,height:S.cssHeight,state:t.state,theme:p.theme,renderer:m,landed:p.landed,title:p.title,links:p.links,menu:p.menu,runtimeRoutes:p.runtimeRoutes,status:T.status,reason:T.reason||"",overflow:p.overflow,places:JSON.stringify(p.places),index:p.index===null?null:JSON.stringify(p.index),masked:[...C.values()],maskProved:!0,privacy:{secretsMasked:!0},volatile:M.length>0,timings:{...f,imaging:x,settle:Math.max(0,w-f.capture-f.mask-f.reads-x),total:w,shots:S.shots,tiles:S.tileCount}}}catch(m){let b=m instanceof AggregateError?m.errors.find(S=>S?.cameraFailure)??m:m;return{failure:t?.signal?.aborted||m?.name==="AbortError"?"stopped":b?.cameraFailure||(m?.code==="CAMERA_BLANK"?"blank":"failed"),reason:String(b?.message||"The camera did not finish its picture.").slice(0,300)}}}async function We(e,{width:t,height:r=900,dpr:a,theme:n}){if(!Number.isSafeInteger(t)||t<=0||!Number.isSafeInteger(r)||r<=0||!Number.isFinite(a)||a<=0||!["light","dark"].includes(n))throw new Error("Camera preparation needs positive dimensions and dpr, and a light or dark theme.");let i=ut.get(e);if(i?.broken)throw i.error;if(i?.active)throw new Error("The camera is already being prepared.");i||(i={installed:!1,active:!1,broken:!1},ut.set(e,i)),i.active=!0;try{await e.send("Emulation.setDeviceMetricsOverride",{width:t,height:r,deviceScaleFactor:a,mobile:!1}),await e.send("Emulation.setScrollbarsHidden",{hidden:!0}),await e.send("Emulation.setFocusEmulationEnabled",{enabled:!0});let o=[{name:"prefers-color-scheme",value:n},{name:"prefers-reduced-motion",value:"reduce"},{name:"forced-colors",value:"none"},{name:"prefers-contrast",value:"no-preference"}];await e.send("Emulation.setEmulatedMedia",{features:o});let l=[...o.map(({name:c,value:h})=>`(${c}: ${h})`),"(pointer: fine)","(hover: hover)"];if(await hn(e,`${JSON.stringify(l)}.every(query => matchMedia(query).matches)`,"The camera media profile did not match."),!i.installed){for(let c of[ot,at,it]){let h=await e.send("Page.addScriptToEvaluateOnNewDocument",{source:`if (window === window.top) { ${c} }`});if(typeof h?.identifier!="string"||!h.identifier)throw new Error("The camera bootstrap registration was not acknowledged.")}i.installed=!0}}catch(o){throw i.broken=!0,i.error=o,o}finally{i.active=!1}}var Ee=require("node:crypto"),ee=require("node:fs/promises"),ie=le(require("node:path"),1),Ue=require("node:stream"),kt=require("node:stream/promises"),St=require("node:timers/promises"),Ae=require("node:zlib"),Et=Buffer.from([137,80,78,71,13,10,26,10]),bn=Uint32Array.from({length:256},(e,t)=>{for(let r=0;r<8;r++)t=t&1?3988292384^t>>>1:t>>>1;return t>>>0});async function At(e){let t=4294967295;for(let r=0;r<e.length;r+=65536){let a=Math.min(e.length,r+65536);for(let n=r;n<a;n++)t=bn[(t^e[n])&255]^t>>>8;a<e.length&&await(0,St.setImmediate)()}return(t^4294967295)>>>0}async function qe(e,t=Buffer.alloc(0)){let r=Buffer.allocUnsafe(t.length+12);return r.writeUInt32BE(t.length),r.write(e,4,4,"latin1"),t.copy(r,8),r.writeUInt32BE(await At(r.subarray(4,r.length-4)),r.length-4),r}async function*Te({width:e,height:t,rows:r,level:a=1}){if(!Number.isSafeInteger(e)||e<=0||e>32768||!Number.isSafeInteger(t)||t<=0||t>32768||e*t>4e7||![1,2,3].includes(a)||typeof r?.[Symbol.asyncIterator]!="function"&&typeof r?.[Symbol.iterator]!="function")throw new Error("PNG encoding needs bounded dimensions, RGBA rows and compression level 1 to 3.");let n=Buffer.alloc(13);n.writeUInt32BE(e),n.writeUInt32BE(t,4),n[8]=8,n[9]=6,yield Buffer.from(Et),yield await qe("IHDR",n);async function*i(){let f=0;for await(let g of r){if(!(g instanceof Uint8Array)||g.length!==e*4||++f>t)throw new Error("PNG encoding received incomplete or extra RGBA rows.");let p=Buffer.allocUnsafe(e*4+1);p[0]=0,p.set(g,1),yield p}if(f!==t)throw new Error("PNG encoding received missing RGBA rows.")}let o=Ue.Readable.from(i(),{objectMode:!1,highWaterMark:65536}),l=(0,Ae.createDeflate)({level:a}),c=(0,kt.pipeline)(o,l);c.catch(()=>{});let h=33;try{for await(let f of l){if(h+=f.length+12,h+12>40*1024*1024)throw new Error("The encoded PNG exceeds the staged picture limit.");yield await qe("IDAT",f)}await c,yield await qe("IEND")}finally{o.destroy(),l.destroy(),await c.catch(()=>{})}}async function Se(e,t,r){for(let a=0;a<t.length;){let{bytesWritten:n}=await e.write(t,a,t.length-a,r+a);if(!n)throw new Error("The covered picture rows could not be staged.");a+=n}}async function vt(e,t,r){for(let a=0;a<t.length;){let{bytesRead:n}=await e.read(t,a,t.length-a,r+a);if(!n)throw new Error("The covered picture rows are incomplete.");a+=n}}function xt(e,t){if(!Array.isArray(e))throw new Error("Picture composition needs explicit cover metadata.");return e.map(r=>{if(![r?.x,r?.y,r?.width,r?.height].every(Number.isSafeInteger)||r.width<=0||r.height<=0||![r.x*t,r.y*t,r.width*t,r.height*t,(r.x+r.width)*t,(r.y+r.height)*t].every(Number.isSafeInteger)||!Number.isFinite(r.radius*t)||r.radius<0||!Array.isArray(r.fill)||r.fill.length!==4||!r.fill.every(l=>Number.isInteger(l)&&l>=0&&l<=255))throw new Error("Picture composition received incomplete cover metadata.");let a=Math.floor(r.x*t),n=Math.floor(r.y*t),i=Math.ceil((r.x+r.width)*t),o=Math.ceil((r.y+r.height)*t);return{x:a,y:n,right:i,bottom:o,radius:Math.min(r.radius*t,(i-a)/2,(o-n)/2),fill:[...r.fill]}})}function Tt(e,t,r,a){for(let n of a)if(!(r<n.y||r>=n.bottom))for(let i=Math.max(0,n.x);i<Math.min(t,n.right);i++){let o=1,l=Math.min(i+.5-n.x,n.right-i-.5),c=Math.min(r+.5-n.y,n.bottom-r-.5);if(n.radius&&l<n.radius&&c<n.radius){let f=i+.5<(n.x+n.right)/2?n.x+n.radius:n.right-n.radius,g=r+.5<(n.y+n.bottom)/2?n.y+n.radius:n.bottom-n.radius,p=0;for(let T of[.125,.375,.625,.875])for(let M of[.125,.375,.625,.875])(i+T-f)**2+(r+M-g)**2<=n.radius**2&&p++;o=p/16}let h=i*4;for(let f=0;f<3;f++)e[h+f]=Math.round(n.fill[f]*o+e[h+f]*(1-o));e[h+3]=Math.round(255*o+e[h+3]*(1-o))}return e}function vn(e,t,r){let a=Buffer.from(e.data.subarray(t*e.width*4,(t+1)*e.width*4));for(let n=0;n<a.length;n+=4)if(a[n+3]!==255){let i=a[n+3]/255;for(let o=0;o<3;o++)a[n+o]=Math.round(a[n+o]*i+255*(1-i));a[n+3]=255}return Tt(a,e.width,t,r)}async function Ct({width:e,height:t,dpr:r,tiles:a,staging:n,kept:i,signal:o,finalCovers:l}){let c=performance.now(),h={imaging:0},f=0;if(!Number.isSafeInteger(e)||e<=0||!Number.isSafeInteger(t*r)||t<=0||t>12e3||![1,2].includes(r)||e*t*r*r>4e7||typeof n!="string"||!ie.default.isAbsolute(n)||typeof a?.[Symbol.asyncIterator]!="function"||l!==void 0&&typeof l!="function"||i!==void 0&&(typeof i!="string"||!/^[a-f0-9]{24}$/.test(i)))throw new Error("Picture composition needs bounded geometry, a private staging directory and a tile stream.");let g=e*r,p=t*r;if(g>32768||p>32768)throw new Error("The composed picture exceeds its dimension limit.");o?.throwIfAborted();let T=await(0,ee.realpath)(n);if(!(await(0,ee.stat)(T)).isDirectory())throw new Error("Picture staging is not a directory.");let M=await(0,ee.mkdtemp)(ie.default.join(T,"camera-compose-"));if(ie.default.dirname(M)!==T||!ie.default.basename(M).startsWith("camera-compose-"))throw new Error("The private composition directory is outside staging.");let $=ie.default.join(M,"covered.rgba"),C=ie.default.join(M,"picture.png"),I,N,D,R,F=!1,q=!1,m=0,b=-1,S=!1,w=[],x={[Symbol.asyncIterator](){let s=a[Symbol.asyncIterator](),d=async(u,y)=>{let E=performance.now();try{return typeof s[u]=="function"?await s[u](y):{done:!0,value:y}}finally{f+=performance.now()-E}};return{next:u=>d("next",u),return:u=>d("return",u)}}};try{I=await(0,ee.open)($,"wx+",384);for await(let v of x){o?.throwIfAborted();let k=v?.frame,W=Math.round(v?.top*r);if(!Number.isFinite(v?.top)||v.top<0||b<0&&v.top!==0||!Number.isSafeInteger(W)||W<b||W>m||W>=p||S||k?.width!==g||!Number.isSafeInteger(k.height)||k.height<=0||k.height>32768||g*k.height>32e6||R!==void 0&&k.height!==R||!(k.data instanceof Uint8Array)||k.data.length!==g*k.height*4||W+k.height<=m)throw new Error("The picture tiles have invalid geometry, a gap or no progress.");R=k.height;let V=xt(v.covers,r),L;if(v.low!==void 0&&v.low!==null){if(!Array.isArray(v.low)||v.low.length!==4||!v.low.every(Number.isFinite)||v.low[0]<0||v.low[1]<0||v.low[2]>e||v.low[3]*r>k.height||v.low[2]<=v.low[0]||v.low[3]<=v.low[1])throw new Error("The picture tile has an invalid bottom-bar union.");L=v.low.map(B=>Math.round(B*r)),S=!0}for(let B=0;B<k.height;B++){o?.throwIfAborted();let z=vn(k,B,V),H=W+B;H>=p||(H>=m?await Se(I,z,H*g*4):L&&B>=L[1]&&B<L[3]&&await Se(I,z.subarray(L[0]*4,L[2]*4),(H*g+L[0])*4))}b=W,m=Math.min(p,W+k.height),w.push({top:v.top,width:k.width,height:Math.min(k.height,p-W)})}if(m!==p)throw new Error("The picture tiles do not cover the requested height.");if(l){let v=await l();if(o?.throwIfAborted(),!Array.isArray(v)||v.length>4e3)throw new Error("The final non-form covers exceed the bounded picture proof.");let k=xt(v,r),W=Math.max(0,Math.min(p,...k.map(L=>L.y))),V=Math.min(p,Math.max(0,...k.map(L=>L.bottom)));for(let L=W;L<V;L++){o?.throwIfAborted();let B=Buffer.allocUnsafe(g*4);await vt(I,B,L*g*4),Tt(B,g,L,k),await Se(I,B,L*g*4)}}async function*s(){for(let v=0;v<p;v++){o?.throwIfAborted();let k=Buffer.allocUnsafe(g*4);await vt(I,k,v*g*4),yield k}}let d=Buffer.alloc(8);d.writeUInt32BE(g),d.writeUInt32BE(p,4);let u=(0,Ee.createHash)("sha256").update(d),y=w.map(v=>({top:Math.round(v.top*r),height:v.height,digest:(0,Ee.createHash)("sha256")})),E=0;for await(let v of s()){u.update(v);for(let k of y)E>=k.top&&E<k.top+k.height&&k.digest.update(v);E++}w.forEach((v,k)=>{v.sha=y[k].digest.digest("hex")}),o?.throwIfAborted();let P=u.digest("hex").slice(0,24);if(P===i)return{files:{},mark:P,tiles:w,unchanged:!0,width:g,height:p,timings:h};N=await(0,ee.open)(C,"wx",384);let j=0;for await(let v of Te({width:g,height:p,rows:s(),level:1}))o?.throwIfAborted(),await Se(N,v,j),j+=v.length;return await N.close(),N=void 0,o?.throwIfAborted(),q=!0,{files:{picture:C},mark:P,tiles:w,unchanged:!1,width:g,height:p,timings:h}}catch(s){throw F=!0,D=s,s}finally{let s=[];async function d(y){try{await y()}catch(E){s.push(E)}}await d(()=>N?.close()),await d(()=>I?.close());let u=y=>(0,ee.unlink)(y).catch(E=>{if(E.code!=="ENOENT")throw E});if(await d(()=>u($)),(!q||s.length)&&(await d(()=>u(C)),await d(()=>(0,ee.rmdir)(M))),h.imaging=Math.max(0,performance.now()-c-f),s.length)throw new AggregateError(F?[D,...s]:s,"Picture composition did not clean up its owned staging files.")}}async function Mt(e,{maxPixels:t=32e6}={}){if(!(e instanceof Uint8Array)||e.byteLength<45||e.byteLength>64*1024*1024||!Number.isSafeInteger(t)||t<=0||t>32e6)throw new Error("The camera PNG exceeds its encoded or pixel limit.");let r=Buffer.from(e);if(!r.subarray(0,8).equals(Et))throw new Error("The camera frame is not a PNG.");let a=[],n,i,o,l=!1,c=!1,h=!1,f=!1,g=0;for(let m=8;m<r.length;){if(++g>65536||m+12>r.length)throw new Error("The camera PNG has incomplete chunks.");let b=r.readUInt32BE(m),S=m+12+b;if(b>2147483647||S>r.length)throw new Error("The camera PNG has an incomplete chunk.");let w=r.toString("latin1",m+4,m+8);if(!/^[A-Za-z]{2}[A-Z][A-Za-z]$/.test(w)||await At(r.subarray(m+4,S-4))!==r.readUInt32BE(S-4))throw new Error("The camera PNG has an invalid chunk or checksum.");let x=r.subarray(m+8,S-4);if(g===1){if(w!=="IHDR"||b!==13)throw new Error("The camera PNG has no complete header.");if(n=x.readUInt32BE(0),i=x.readUInt32BE(4),!n||!i||n>32768||i>32768||n*i>t)throw new Error("The camera PNG exceeds its pixel limit.");if(x[8]!==8||![2,6].includes(x[9])||x[10]!==0||x[11]!==0||x[12]!==0)throw new Error("The camera PNG needs non-interlaced 8-bit RGB or RGBA rows.");o=x[9]===6?4:3}else if(w==="IDAT"){if(h)throw new Error("The camera PNG data chunks are not consecutive.");c=!0,a.push(x)}else{if(c&&(h=!0),w==="IEND"){if(b||!c||S!==r.length)throw new Error("The camera PNG has an incomplete end.");l=!0;break}if(w==="PLTE"){if(f||c||!b||b>768||b%3)throw new Error("The camera PNG has an invalid palette.");f=!0}else if(w==="tRNS"||["acTL","fcTL","fdAT"].includes(w)||w[0]===w[0].toUpperCase())throw new Error("The camera PNG contains an unsupported critical, transparency or animation chunk.")}m=S}if(!l)throw new Error("The camera PNG has no complete end.");let p=n*o,T=Buffer.allocUnsafe(p+1),M=Buffer.allocUnsafe(n*i*4),$=Buffer.alloc(p),C=T.subarray(1),I=0,N=0,D=!0,R=(0,Ee.createHash)("sha256"),F=Ue.Readable.from(a),q=(0,Ae.createInflate)();try{for await(let m of F.pipe(q))for(let b=0;b<m.length;){if(N>=i)throw new Error("The camera PNG has extra inflated rows.");let S=Math.min(T.length-I,m.length-b);if(m.copy(T,I,b,b+S),I+=S,b+=S,I!==T.length)continue;let w=T[0];if(w>4)throw new Error("The camera PNG has an unknown row filter.");for(let s=0;s<p;s++){let d=s<o?0:C[s-o],u=$[s],y=s<o?0:$[s-o],E=0;if(w===1)E=d;else if(w===2)E=u;else if(w===3)E=d+u>>>1;else if(w===4){let P=d+u-y,j=Math.abs(P-d),v=Math.abs(P-u),k=Math.abs(P-y);E=j<=v&&j<=k?d:v<=k?u:y}C[s]=T[s+1]+E&255}let x=N*n*4;for(let s=0;s<n;s++){let d=x+s*4;for(let u=0;u<4;u++){let y=u===3&&o===3?255:C[s*o+u];M[d+u]=y,y!==M[u]&&(D=!1)}}R.update(M.subarray(x,x+n*4)),C.copy($),N++,I=0}if(N!==i||I)throw new Error("The camera PNG has missing inflated rows.");if(q.bytesWritten!==a.reduce((m,b)=>m+b.length,0))throw new Error("The camera PNG has trailing compressed data.");return{width:n,height:i,data:M,sha:R.digest("hex"),flat:D}}finally{F.destroy(),q.destroy()}}function Nt(e,t){let r=new Map,a=0,n=!1,i=!1;e.once("close",()=>r.clear());let o={send(l,c){return t.send(l,c)},on(l,c){return t.on(l,c),()=>t.off(l,c)},async frame(){if(e.isClosed()||n||r.size>=3)throw new Error("The CLI camera frame is closed, busy or holding too many frames.");n=!0;try{let l=await ke(o);if(await K(o,l,"new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve(true))))")!==!0)throw new Error("The CLI camera did not complete its fresh-paint wait.");let h=await t.send("Page.captureScreenshot",{format:"png",fromSurface:!0,captureBeyondViewport:!1,optimizeForSpeed:!0});if(typeof h?.data!="string"||!h.data.length||h.data.length>89478488||h.data.length%4||!/^[A-Za-z0-9+/]+={0,2}$/.test(h.data))throw new Error("The CLI camera did not return bounded PNG transport bytes.");let f=await Mt(Buffer.from(h.data,"base64"));if(e.isClosed())throw new Error("The CLI camera closed while its frame was decoding.");let g=++a;return r.set(g,f),{handle:g,width:f.width,height:f.height,sha:f.sha,flat:f.flat}}finally{n=!1}},drop(l){if(!Array.isArray(l)||!l.every(c=>Number.isSafeInteger(c)&&c>0))throw new Error("The CLI camera needs valid frame handles to drop.");for(let c of l)r.delete(c)},async compose({tiles:l,...c}){if(e.isClosed()||i||n||typeof l?.[Symbol.asyncIterator]!="function")throw new Error("The CLI camera cannot compose this tile stream.");i=!0;async function*h(){for await(let f of l){let g=r.get(f?.handle);if(!g)throw new Error("The CLI camera cannot compose an unknown frame handle.");try{yield{...f,frame:g}}finally{r.delete(f.handle)}}}try{return await Ct({...c,tiles:h()})}finally{i=!1}}};return o}var xn=/^(localhost|127\.0\.0\.1|\[::1\]|::1|.+\.localhost)$/i,ze=e=>xn.test(e);function Ge(e){let t=(e??"").replace(/^\[|\]$/g,"").toLowerCase();return/^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(t)||t==="::1"||/^::ffff:127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(t)||/^::ffff:7f[0-9a-f]{2}:[0-9a-f]{1,4}$/.test(t)}var De=new Map;async function It(e,t){if(ze(e))return{local:!0,found:[]};let r=e.toLowerCase();if(r.startsWith("["))return De.delete(r),{local:!1,found:[]};let a=await t(r).catch(()=>[]);return a.length&&a.every(Ge)?(De.set(r,[...a]),{local:!0,found:a}):(De.delete(r),{local:!1,found:a})}var Rt=le(require("node:dns"),1);var kn=e=>It(e,async t=>(await Rt.default.promises.lookup(t,{all:!0})).map(r=>r.address)),Pt=async e=>(await kn(e)).local;var Je=process.platform;var Sn=e=>/^https?:$/.test(e.protocol)&&ze(e.hostname),En=async e=>/^https?:$/.test(e.protocol)&&Pt(e.hostname),Ot=900,An=/^fragments-see-(?:mask-)?[A-Za-z0-9]{6}$/,Ve="fragments-camera.json",Ke="fragments-see-camera",jt=1440*60*1e3;async function _t(e){await X.default.writeFile(oe.default.join(e,Ve),`${JSON.stringify({camera:Ke,at:Date.now()})}
`,{flag:"wx",mode:384})}async function Lt({dir:e=Me.default.tmpdir(),now:t=Date.now(),maxAgeMs:r=jt}={}){let a=[],n;try{n=await X.default.readdir(e,{withFileTypes:!0})}catch{return a}for(let i of n){if(!An.test(i.name)||!i.isDirectory())continue;let o=oe.default.join(e,i.name),l=oe.default.join(o,Ve);try{let[c,h]=await Promise.all([X.default.lstat(o),X.default.lstat(l)]);if(!c.isDirectory()||c.isSymbolicLink()||!h.isFile()||h.size>1024)continue;let f=JSON.parse(await X.default.readFile(l,"utf8"));if(f?.camera!==Ke||typeof f.at!="number"||t-Math.max(c.mtimeMs,h.mtimeMs,f.at)<r)continue;await X.default.rm(o,{recursive:!0,force:!0}),a.push(i.name)}catch{}}return a}var Tn,Ce=new WeakMap,Cn=e=>{if(!e?.startsWith('"'))return e??void 0;try{let t=JSON.parse(e);return typeof t=="string"?t:void 0}catch{return}};async function Mn(e){try{return await fetch(e,{redirect:"manual",signal:AbortSignal.timeout(5e3)}),!0}catch{return!1}}async function Nn(e){let t=Buffer.from([203,53,91,255,203,53,91,255]),r=[];for await(let l of Te({width:2,height:2,rows:[t,t]}))r.push(Buffer.from(l));let[a,n]=await Promise.all([X.default.readFile(oe.default.join(e,"canary.woff2")),X.default.readFile(oe.default.join(e,"canary-font.LICENSE"))]),i={"/canary":{type:"text/html; charset=utf-8",body:Ne},"/canary.woff2":{type:"font/woff2",body:a},"/canary.png":{type:"image/png",body:Buffer.concat(r)},"/canary-license.txt":{type:"text/plain; charset=utf-8",body:n}},o=Ft.default.createServer({maxHeaderSize:8192},(l,c)=>{let h=l.method==="GET"&&l.url&&Object.hasOwn(i,l.url)?i[l.url]:void 0;c.writeHead(h?200:404,{"Content-Type":h?.type??"text/plain","Cache-Control":"no-store","X-Content-Type-Options":"nosniff","Content-Security-Policy":"default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; font-src 'self'; img-src 'self'"}),c.end(h?.body??"Not found")});return o.requestTimeout=2e3,o.headersTimeout=2e3,o.keepAliveTimeout=1e3,o.maxConnections=4,await new Promise((l,c)=>{o.once("error",c),o.listen({port:0,host:"127.0.0.1"},l)}),o.on("error",()=>{}),{origin:`http://127.0.0.1:${o.address().port}`,close:()=>new Promise(l=>{o.closeAllConnections(),o.close(()=>l())})}}function In(e,t){let a=(Ce.get(e)??Promise.resolve()).then(()=>$t(e,t),()=>$t(e,t)),n=a.catch(()=>{});return Ce.set(e,n),n.then(()=>{Ce.get(e)===n&&Ce.delete(e)}),a}async function $t(e,t){let{width:r,theme:a="light",assets:n,timeoutMs:i=45e3}=t,o;try{o=new URL(t.url)}catch{return{refused:"not-loopback",reason:"That is not a web address."}}if(!/^https?:$/.test(o.protocol)||o.username||o.password)return{refused:"not-loopback",reason:"Only an http or https page on this computer is pictured."};if(!await En(o))return{refused:"not-loopback",reason:"That address is not on this computer."};let l=ce(o.pathname,o.origin);if(!l||!Number.isInteger(r)||r<240||r>7680)return{refused:"failed",reason:"The page needs a plain path and a width from 240 to 7680."};if(e.over)return{refused:"gone",reason:`The browser is gone: ${e.over}.`};if(!await Mn(o.origin))return{refused:"not-answering",reason:`Nothing answers at ${o.origin}. Fragments does not start a project's server: start its dev server yourself, then pass its address again.`};Tn??=Lt().catch(()=>{});let c=Date.now()+i,h=()=>Math.max(1,c-Date.now()),f,g,p,T,M,$=!1,C,I,N,D=new Set;try{M=await Nn(n);let R=M.origin;g=await X.default.mkdtemp(oe.default.join(Me.default.tmpdir(),"fragments-see-mask-")),await _t(g);let F=[...new Set([new URL(R),o].map(O=>`${O.protocol}//${O.host}/*`))];for(let[O,A]of Object.entries(Re({matches:F})))await X.default.writeFile(oe.default.join(g,O),A,{flag:"wx",mode:384});f=(await e.send("Extensions.loadUnpacked",{path:g})).id,{targetId:p}=await e.send("Target.createTarget",{url:"about:blank",background:!0,newWindow:!0});let{sessionId:q}=await e.send("Target.attachToTarget",{targetId:p,flatten:!0});N=q;let m=new Map;C=e.listen(O=>{if(O.method==="Target.detachedFromTarget"&&O.params?.sessionId===q){$=!0;for(let A of D)A()}if(O.sessionId===q)for(let A of[...m.get(O.method)??[]])A(O.params)});let b=(O,A)=>$||e.over?Promise.reject(new Error(e.over??"The camera tab closed.")):e.send(O,A??{},q),S=(O,A)=>{(m.get(O)??m.set(O,new Set).get(O)).add(A)},s=Nt({isClosed:()=>$||!!e.over,once:(O,A)=>{D.add(A)}},{send:b,on:S,off:(O,A)=>{m.get(O)?.delete(A)}});await b("Page.enable"),await b("Network.enable"),await b("Network.setBypassServiceWorker",{bypass:!0}),await b("Storage.clearDataForOrigin",{origin:o.origin,storageTypes:"all"}),I=o.origin;let d="canary",u,y=(await b("Page.getFrameTree")).frameTree.frame.id,E="about:blank",P;S("Page.frameNavigated",O=>{let A=O.frame;A.parentId||(y=A.id,E=A.url)}),S("Network.responseReceived",O=>{let A=O;A.type==="Document"&&A.frameId===y&&(P={status:A.response.status,ip:A.response.remoteIPAddress})}),S("Fetch.requestPaused",O=>{let A=O,G=!1;if(A.frameId===y){let Z;try{Z=new URL(A.request.url)}catch{}G=!Z||Z.origin!==(d==="canary"?R:o.origin)||!!Z.username||!!Z.password,G&&(u=A.request.url)}b(G?"Fetch.failRequest":"Fetch.continueRequest",G?{requestId:A.requestId,errorReason:"BlockedByClient"}:{requestId:A.requestId}).catch(()=>{})}),await b("Fetch.enable",{patterns:[{resourceType:"Document",requestStage:"Request"}]});let j=async(O,A)=>{d=A,u=void 0,P=void 0;let G=e.hear("Page.domContentEventFired",q,h()),Z=await b("Page.navigate",{url:O});if(Z?.errorText){if(u)return;throw new Error(`The page did not load: ${Z.errorText}.`)}if(!await G)throw Object.assign(new Error("The page was still loading when the camera stopped waiting for it."),{refused:"loading"})},v=()=>{if(u)return{offSite:u,landed:null,status:null};let O=new URL(E);if(O.origin!==o.origin||!P)throw new Error("The camera left the asked origin or lost its load result.");if(!Sn(O)&&!Ge(P.ip))throw new Error("The page did not come over this computer's own connection.");return{landed:O.pathname.replace(/\/+$/,"")||"/",status:P.status}},{product:k}=await e.send("Browser.getVersion"),W=async()=>(await e.send("SystemInfo.getInfo")).gpu;await We(s,{width:r,height:Ot,dpr:1,theme:a}),await j(`${R}/canary`,"canary");let V=await W(),L=await Le(s),B=xe({product:k,dpr:1,platform:Je,gpu:V,recipe:de,canary:L.sha}),z=()=>{if(!u)return;let O="another address";try{O=new URL(u).host||O}catch{}return{refused:"not-loopback",reason:`The page sent the camera to ${O}, away from ${o.host}; nothing there was loaded or pictured.`}};if(await j(new URL(l,o.origin).href,"page"),z())return z();T=await X.default.mkdtemp(oe.default.join(Me.default.tmpdir(),"fragments-see-")),await _t(T);let H=await He(s,{route:l,width:r,height:Ot,dpr:1,state:"default",theme:a,deadline:c,staging:T,pictureMissing:!0},{reads:{places:`(${ye.toString()})()`,health:`(${ge.toString()})()`,routes:`(${we.toString()})()`,...t.indexRead?{index:t.indexRead}:{}},renderer:B,volatile:!0,landing:v,reload:()=>j(new URL(l,o.origin).href,"page")});if(z())return z();if("failure"in H)return{refused:H.failure,reason:H.reason};if(JSON.stringify(xe({product:k,dpr:1,platform:Je,gpu:await W(),recipe:de,canary:L.sha}))!==JSON.stringify(B))return{refused:"failed",reason:"The browser's GPU changed while the page was pictured."};if(H.maskProved!==!0||H.privacy?.secretsMasked!==!0)return{refused:"mask",reason:"The page could not be masked, so no picture was shared."};let U=await X.default.readFile(H.files.picture),{files:te,places:_,index:Y,...J}=H,fe=Cn(Y);return{picture:U,shot:J,...fe?{indexText:fe}:{}}}catch(R){for(let q=Date.now()+1e3;!e.over&&!$&&Date.now()<q;)await new Promise(m=>setTimeout(m,50));if(e.over||$)return{refused:"gone",reason:`The browser is gone: ${e.over??"its tab was closed"}.`};let F=R;return{refused:F.refused??"failed",reason:String(F.message??R).slice(0,300)}}finally{C?.(),I&&N&&!e.over&&await e.send("Storage.clearDataForOrigin",{origin:I,storageTypes:"all"},N).catch(()=>{}),p&&await e.send("Target.closeTarget",{targetId:p}).catch(()=>{}),f&&await e.send("Extensions.uninstall",{id:f}).catch(()=>{}),g&&await X.default.rm(g,{recursive:!0,force:!0}).catch(()=>{}),await M?.close().catch(()=>{}),T&&await X.default.rm(T,{recursive:!0,force:!0}).catch(()=>{})}}0&&(module.exports={CAMERA_LEFTOVER_AGE_MS,CAMERA_MARK,CAMERA_MARKER,seeCamera,sweepCameraLeftovers});
