import{$ as E,$a as Je,A as Se,Aa as k,Ba as oe,Bb as qe,Cb as ce,D as Ie,Dc as Ye,Ec as Ke,Ia as xe,Ja as ie,K as re,Ka as je,La as O,Mc as de,Na as ae,Nc as He,Oa as Ue,Oc as Qe,Pa as Fe,Pc as R,Qa as Be,Ta as x,Ua as P,V as Ne,Va as S,Wa as ze,Wc as Z,Xa as Ve,Y as _e,Ya as $e,Z as w,Za as Xe,_a as Ge,ab as We,bb as A,c as Oe,ca as T,dd as et,ea as l,fa as v,fd as le,gb as j,hd as q,ia as W,ib as Ze,ka as Le,l as Pe,la as Ce,m as J,ma as ke,q as C,ya as se}from"./chunk-NNBNMEEF.js";import{a as L,b as De,c as Ae}from"./chunk-GAL4ENT6.js";var F=class{},K=class{},D=class n{headers;normalizedNames=new Map;lazyInit;lazyUpdate=null;constructor(t){t?typeof t=="string"?this.lazyInit=()=>{this.headers=new Map,t.split(`
`).forEach(e=>{let r=e.indexOf(":");if(r>0){let s=e.slice(0,r),o=e.slice(r+1).trim();this.addHeaderEntry(s,o)}})}:typeof Headers<"u"&&t instanceof Headers?(this.headers=new Map,t.forEach((e,r)=>{this.addHeaderEntry(r,e)})):this.lazyInit=()=>{this.headers=new Map,Object.entries(t).forEach(([e,r])=>{this.setHeaderEntries(e,r)})}:this.headers=new Map}has(t){return this.init(),this.headers.has(t.toLowerCase())}get(t){this.init();let e=this.headers.get(t.toLowerCase());return e&&e.length>0?e[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(t){return this.init(),this.headers.get(t.toLowerCase())||null}append(t,e){return this.clone({name:t,value:e,op:"a"})}set(t,e){return this.clone({name:t,value:e,op:"s"})}delete(t,e){return this.clone({name:t,value:e,op:"d"})}maybeSetNormalizedName(t,e){this.normalizedNames.has(e)||this.normalizedNames.set(e,t)}init(){this.lazyInit&&(this.lazyInit instanceof n?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(t=>this.applyUpdate(t)),this.lazyUpdate=null))}copyFrom(t){t.init(),Array.from(t.headers.keys()).forEach(e=>{this.headers.set(e,t.headers.get(e)),this.normalizedNames.set(e,t.normalizedNames.get(e))})}clone(t){let e=new n;return e.lazyInit=this.lazyInit&&this.lazyInit instanceof n?this.lazyInit:this,e.lazyUpdate=(this.lazyUpdate||[]).concat([t]),e}applyUpdate(t){let e=t.name.toLowerCase();switch(t.op){case"a":case"s":let r=t.value;if(typeof r=="string"&&(r=[r]),r.length===0)return;this.maybeSetNormalizedName(t.name,e);let s=(t.op==="a"?this.headers.get(e):void 0)||[];s.push(...r),this.headers.set(e,s);break;case"d":let o=t.value;if(!o)this.headers.delete(e),this.normalizedNames.delete(e);else{let i=this.headers.get(e);if(!i)return;i=i.filter(c=>o.indexOf(c)===-1),i.length===0?(this.headers.delete(e),this.normalizedNames.delete(e)):this.headers.set(e,i)}break}}addHeaderEntry(t,e){let r=t.toLowerCase();this.maybeSetNormalizedName(t,r),this.headers.has(r)?this.headers.get(r).push(e):this.headers.set(r,[e])}setHeaderEntries(t,e){let r=(Array.isArray(e)?e:[e]).map(o=>o.toString()),s=t.toLowerCase();this.headers.set(s,r),this.maybeSetNormalizedName(t,s)}forEach(t){this.init(),Array.from(this.normalizedNames.keys()).forEach(e=>t(this.normalizedNames.get(e),this.headers.get(e)))}};var he=class{encodeKey(t){return tt(t)}encodeValue(t){return tt(t)}decodeKey(t){return decodeURIComponent(t)}decodeValue(t){return decodeURIComponent(t)}};function xt(n,t){let e=new Map;return n.length>0&&n.replace(/^\?/,"").split("&").forEach(s=>{let o=s.indexOf("="),[i,c]=o==-1?[t.decodeKey(s),""]:[t.decodeKey(s.slice(0,o)),t.decodeValue(s.slice(o+1))],a=e.get(i)||[];a.push(c),e.set(i,a)}),e}var jt=/%(\d[a-f0-9])/gi,Ut={40:"@","3A":":",24:"$","2C":",","3B":";","3D":"=","3F":"?","2F":"/"};function tt(n){return encodeURIComponent(n).replace(jt,(t,e)=>Ut[e]??t)}function Y(n){return`${n}`}var M=class n{map;encoder;updates=null;cloneFrom=null;constructor(t={}){if(this.encoder=t.encoder||new he,t.fromString){if(t.fromObject)throw new w(2805,!1);this.map=xt(t.fromString,this.encoder)}else t.fromObject?(this.map=new Map,Object.keys(t.fromObject).forEach(e=>{let r=t.fromObject[e],s=Array.isArray(r)?r.map(Y):[Y(r)];this.map.set(e,s)})):this.map=null}has(t){return this.init(),this.map.has(t)}get(t){this.init();let e=this.map.get(t);return e?e[0]:null}getAll(t){return this.init(),this.map.get(t)||null}keys(){return this.init(),Array.from(this.map.keys())}append(t,e){return this.clone({param:t,value:e,op:"a"})}appendAll(t){let e=[];return Object.keys(t).forEach(r=>{let s=t[r];Array.isArray(s)?s.forEach(o=>{e.push({param:r,value:o,op:"a"})}):e.push({param:r,value:s,op:"a"})}),this.clone(e)}set(t,e){return this.clone({param:t,value:e,op:"s"})}delete(t,e){return this.clone({param:t,value:e,op:"d"})}toString(){return this.init(),this.keys().map(t=>{let e=this.encoder.encodeKey(t);return this.map.get(t).map(r=>e+"="+this.encoder.encodeValue(r)).join("&")}).filter(t=>t!=="").join("&")}clone(t){let e=new n({encoder:this.encoder});return e.cloneFrom=this.cloneFrom||this,e.updates=(this.updates||[]).concat(t),e}init(){this.map===null&&(this.map=new Map),this.cloneFrom!==null&&(this.cloneFrom.init(),this.cloneFrom.keys().forEach(t=>this.map.set(t,this.cloneFrom.map.get(t))),this.updates.forEach(t=>{switch(t.op){case"a":case"s":let e=(t.op==="a"?this.map.get(t.param):void 0)||[];e.push(Y(t.value)),this.map.set(t.param,e);break;case"d":if(t.value!==void 0){let r=this.map.get(t.param)||[],s=r.indexOf(Y(t.value));s!==-1&&r.splice(s,1),r.length>0?this.map.set(t.param,r):this.map.delete(t.param)}else{this.map.delete(t.param);break}}}),this.cloneFrom=this.updates=null)}};var fe=class{map=new Map;set(t,e){return this.map.set(t,e),this}get(t){return this.map.has(t)||this.map.set(t,t.defaultValue()),this.map.get(t)}delete(t){return this.map.delete(t),this}has(t){return this.map.has(t)}keys(){return this.map.keys()}};function Ft(n){switch(n){case"DELETE":case"GET":case"HEAD":case"OPTIONS":case"JSONP":return!1;default:return!0}}function nt(n){return typeof ArrayBuffer<"u"&&n instanceof ArrayBuffer}function rt(n){return typeof Blob<"u"&&n instanceof Blob}function st(n){return typeof FormData<"u"&&n instanceof FormData}function Bt(n){return typeof URLSearchParams<"u"&&n instanceof URLSearchParams}var ot="Content-Type",it="Accept",ht="X-Request-URL",ft="text/plain",pt="application/json",zt=`${pt}, ${ft}, */*`,U=class n{url;body=null;headers;context;reportProgress=!1;withCredentials=!1;responseType="json";method;params;urlWithParams;transferCache;constructor(t,e,r,s){this.url=e,this.method=t.toUpperCase();let o;if(Ft(this.method)||s?(this.body=r!==void 0?r:null,o=s):o=r,o&&(this.reportProgress=!!o.reportProgress,this.withCredentials=!!o.withCredentials,o.responseType&&(this.responseType=o.responseType),o.headers&&(this.headers=o.headers),o.context&&(this.context=o.context),o.params&&(this.params=o.params),this.transferCache=o.transferCache),this.headers??=new D,this.context??=new fe,!this.params)this.params=new M,this.urlWithParams=e;else{let i=this.params.toString();if(i.length===0)this.urlWithParams=e;else{let c=e.indexOf("?"),a=c===-1?"?":c<e.length-1?"&":"";this.urlWithParams=e+a+i}}}serializeBody(){return this.body===null?null:typeof this.body=="string"||nt(this.body)||rt(this.body)||st(this.body)||Bt(this.body)?this.body:this.body instanceof M?this.body.toString():typeof this.body=="object"||typeof this.body=="boolean"||Array.isArray(this.body)?JSON.stringify(this.body):this.body.toString()}detectContentTypeHeader(){return this.body===null||st(this.body)?null:rt(this.body)?this.body.type||null:nt(this.body)?null:typeof this.body=="string"?ft:this.body instanceof M?"application/x-www-form-urlencoded;charset=UTF-8":typeof this.body=="object"||typeof this.body=="number"||typeof this.body=="boolean"?pt:null}clone(t={}){let e=t.method||this.method,r=t.url||this.url,s=t.responseType||this.responseType,o=t.transferCache??this.transferCache,i=t.body!==void 0?t.body:this.body,c=t.withCredentials??this.withCredentials,a=t.reportProgress??this.reportProgress,d=t.headers||this.headers,u=t.params||this.params,m=t.context??this.context;return t.setHeaders!==void 0&&(d=Object.keys(t.setHeaders).reduce((y,p)=>y.set(p,t.setHeaders[p]),d)),t.setParams&&(u=Object.keys(t.setParams).reduce((y,p)=>y.set(p,t.setParams[p]),u)),new n(e,r,i,{params:u,headers:d,context:m,reportProgress:a,responseType:s,withCredentials:c,transferCache:o})}},I=function(n){return n[n.Sent=0]="Sent",n[n.UploadProgress=1]="UploadProgress",n[n.ResponseHeader=2]="ResponseHeader",n[n.DownloadProgress=3]="DownloadProgress",n[n.Response=4]="Response",n[n.User=5]="User",n}(I||{}),B=class{headers;status;statusText;url;ok;type;constructor(t,e=200,r="OK"){this.headers=t.headers||new D,this.status=t.status!==void 0?t.status:e,this.statusText=t.statusText||r,this.url=t.url||null,this.ok=this.status>=200&&this.status<300}},pe=class n extends B{constructor(t={}){super(t)}type=I.ResponseHeader;clone(t={}){return new n({headers:t.headers||this.headers,status:t.status!==void 0?t.status:this.status,statusText:t.statusText||this.statusText,url:t.url||this.url||void 0})}},N=class n extends B{body;constructor(t={}){super(t),this.body=t.body!==void 0?t.body:null}type=I.Response;clone(t={}){return new n({body:t.body!==void 0?t.body:this.body,headers:t.headers||this.headers,status:t.status!==void 0?t.status:this.status,statusText:t.statusText||this.statusText,url:t.url||this.url||void 0})}},H=class extends B{name="HttpErrorResponse";message;error;ok=!1;constructor(t){super(t,0,"Unknown Error"),this.status>=200&&this.status<300?this.message=`Http failure during parsing for ${t.url||"(unknown url)"}`:this.message=`Http failure response for ${t.url||"(unknown url)"}: ${t.status} ${t.statusText}`,this.error=t.error||null}},Vt=200,$t=204;function ue(n,t){return{body:t,headers:n.headers,context:n.context,observe:n.observe,params:n.params,reportProgress:n.reportProgress,responseType:n.responseType,withCredentials:n.withCredentials,transferCache:n.transferCache}}var Xt=(()=>{class n{handler;constructor(e){this.handler=e}request(e,r,s={}){let o;if(e instanceof U)o=e;else{let a;s.headers instanceof D?a=s.headers:a=new D(s.headers);let d;s.params&&(s.params instanceof M?d=s.params:d=new M({fromObject:s.params})),o=new U(e,r,s.body!==void 0?s.body:null,{headers:a,context:s.context,params:d,reportProgress:s.reportProgress,responseType:s.responseType||"json",withCredentials:s.withCredentials,transferCache:s.transferCache})}let i=J(o).pipe(Ie(a=>this.handler.handle(a)));if(e instanceof U||s.observe==="events")return i;let c=i.pipe(Se(a=>a instanceof N));switch(s.observe||"body"){case"body":switch(o.responseType){case"arraybuffer":return c.pipe(C(a=>{if(a.body!==null&&!(a.body instanceof ArrayBuffer))throw new w(2806,!1);return a.body}));case"blob":return c.pipe(C(a=>{if(a.body!==null&&!(a.body instanceof Blob))throw new w(2807,!1);return a.body}));case"text":return c.pipe(C(a=>{if(a.body!==null&&typeof a.body!="string")throw new w(2808,!1);return a.body}));case"json":default:return c.pipe(C(a=>a.body))}case"response":return c;default:throw new w(2809,!1)}}delete(e,r={}){return this.request("DELETE",e,r)}get(e,r={}){return this.request("GET",e,r)}head(e,r={}){return this.request("HEAD",e,r)}jsonp(e,r){return this.request("JSONP",e,{params:new M().append(r,"JSONP_CALLBACK"),observe:"body",responseType:"json"})}options(e,r={}){return this.request("OPTIONS",e,r)}patch(e,r,s={}){return this.request("PATCH",e,ue(s,r))}post(e,r,s={}){return this.request("POST",e,ue(s,r))}put(e,r,s={}){return this.request("PUT",e,ue(s,r))}static \u0275fac=function(r){return new(r||n)(l(F))};static \u0275prov=E({token:n,factory:n.\u0275fac})}return n})();var Gt=new T("");function mt(n,t){return t(n)}function Jt(n,t){return(e,r)=>t.intercept(e,{handle:s=>n(s,r)})}function Wt(n,t,e){return(r,s)=>ke(e,()=>t(r,o=>n(o,s)))}var Zt=new T(""),ye=new T(""),yt=new T(""),gt=new T("",{providedIn:"root",factory:()=>!0});function qt(){let n=null;return(t,e)=>{n===null&&(n=(v(Zt,{optional:!0})??[]).reduceRight(Jt,mt));let r=v(se);if(v(gt)){let o=r.add();return n(t,e).pipe(re(()=>r.remove(o)))}else return n(t,e)}}var at=(()=>{class n extends F{backend;injector;chain=null;pendingTasks=v(se);contributeToStability=v(gt);constructor(e,r){super(),this.backend=e,this.injector=r}handle(e){if(this.chain===null){let r=Array.from(new Set([...this.injector.get(ye),...this.injector.get(yt,[])]));this.chain=r.reduceRight((s,o)=>Wt(s,o,this.injector),mt)}if(this.contributeToStability){let r=this.pendingTasks.add();return this.chain(e,s=>this.backend.handle(s)).pipe(re(()=>this.pendingTasks.remove(r)))}else return this.chain(e,r=>this.backend.handle(r))}static \u0275fac=function(r){return new(r||n)(l(K),l(Ce))};static \u0275prov=E({token:n,factory:n.\u0275fac})}return n})();var Yt=/^\)\]\}',?\n/,Kt=RegExp(`^${ht}:`,"m");function Ht(n){return"responseURL"in n&&n.responseURL?n.responseURL:Kt.test(n.getAllResponseHeaders())?n.getResponseHeader(ht):null}var ct=(()=>{class n{xhrFactory;constructor(e){this.xhrFactory=e}handle(e){if(e.method==="JSONP")throw new w(-2800,!1);let r=this.xhrFactory;return(r.\u0275loadImpl?Pe(r.\u0275loadImpl()):J(null)).pipe(Ne(()=>new Oe(o=>{let i=r.build();if(i.open(e.method,e.urlWithParams),e.withCredentials&&(i.withCredentials=!0),e.headers.forEach((h,f)=>i.setRequestHeader(h,f.join(","))),e.headers.has(it)||i.setRequestHeader(it,zt),!e.headers.has(ot)){let h=e.detectContentTypeHeader();h!==null&&i.setRequestHeader(ot,h)}if(e.responseType){let h=e.responseType.toLowerCase();i.responseType=h!=="json"?h:"text"}let c=e.serializeBody(),a=null,d=()=>{if(a!==null)return a;let h=i.statusText||"OK",f=new D(i.getAllResponseHeaders()),b=Ht(i)||e.url;return a=new pe({headers:f,status:i.status,statusText:h,url:b}),a},u=()=>{let{headers:h,status:f,statusText:b,url:G}=d(),g=null;f!==$t&&(g=typeof i.response>"u"?i.responseText:i.response),f===0&&(f=g?Vt:0);let _=f>=200&&f<300;if(e.responseType==="json"&&typeof g=="string"){let It=g;g=g.replace(Yt,"");try{g=g!==""?JSON.parse(g):null}catch(Nt){g=It,_&&(_=!1,g={error:Nt,text:g})}}_?(o.next(new N({body:g,headers:h,status:f,statusText:b,url:G||void 0})),o.complete()):o.error(new H({error:g,headers:h,status:f,statusText:b,url:G||void 0}))},m=h=>{let{url:f}=d(),b=new H({error:h,status:i.status||0,statusText:i.statusText||"Unknown Error",url:f||void 0});o.error(b)},y=!1,p=h=>{y||(o.next(d()),y=!0);let f={type:I.DownloadProgress,loaded:h.loaded};h.lengthComputable&&(f.total=h.total),e.responseType==="text"&&i.responseText&&(f.partialText=i.responseText),o.next(f)},X=h=>{let f={type:I.UploadProgress,loaded:h.loaded};h.lengthComputable&&(f.total=h.total),o.next(f)};return i.addEventListener("load",u),i.addEventListener("error",m),i.addEventListener("timeout",m),i.addEventListener("abort",m),e.reportProgress&&(i.addEventListener("progress",p),c!==null&&i.upload&&i.upload.addEventListener("progress",X)),i.send(c),o.next({type:I.Sent}),()=>{i.removeEventListener("error",m),i.removeEventListener("abort",m),i.removeEventListener("load",u),i.removeEventListener("timeout",m),e.reportProgress&&(i.removeEventListener("progress",p),c!==null&&i.upload&&i.upload.removeEventListener("progress",X)),i.readyState!==i.DONE&&i.abort()}})))}static \u0275fac=function(r){return new(r||n)(l(q))};static \u0275prov=E({token:n,factory:n.\u0275fac})}return n})(),vt=new T(""),Qt="XSRF-TOKEN",en=new T("",{providedIn:"root",factory:()=>Qt}),tn="X-XSRF-TOKEN",nn=new T("",{providedIn:"root",factory:()=>tn}),Q=class{},rn=(()=>{class n{doc;platform;cookieName;lastCookieString="";lastToken=null;parseCount=0;constructor(e,r,s){this.doc=e,this.platform=r,this.cookieName=s}getToken(){if(this.platform==="server")return null;let e=this.doc.cookie||"";return e!==this.lastCookieString&&(this.parseCount++,this.lastToken=Z(e,this.cookieName),this.lastCookieString=e),this.lastToken}static \u0275fac=function(r){return new(r||n)(l(R),l(O),l(en))};static \u0275prov=E({token:n,factory:n.\u0275fac})}return n})();function sn(n,t){let e=n.url.toLowerCase();if(!v(vt)||n.method==="GET"||n.method==="HEAD"||e.startsWith("http://")||e.startsWith("https://"))return t(n);let r=v(Q).getToken(),s=v(nn);return r!=null&&!n.headers.has(s)&&(n=n.clone({headers:n.headers.set(s,r)})),t(n)}var Et=function(n){return n[n.Interceptors=0]="Interceptors",n[n.LegacyInterceptors=1]="LegacyInterceptors",n[n.CustomXsrfConfiguration=2]="CustomXsrfConfiguration",n[n.NoXsrfProtection=3]="NoXsrfProtection",n[n.JsonpSupport=4]="JsonpSupport",n[n.RequestsMadeViaParent=5]="RequestsMadeViaParent",n[n.Fetch=6]="Fetch",n}(Et||{});function on(n,t){return{\u0275kind:n,\u0275providers:t}}function ir(...n){let t=[Xt,ct,at,{provide:F,useExisting:at},{provide:K,useFactory:()=>v(Gt,{optional:!0})??v(ct)},{provide:ye,useValue:sn,multi:!0},{provide:vt,useValue:!0},{provide:Q,useClass:rn}];for(let e of n)t.push(...e.\u0275providers);return W(t)}var dt=new T("");function ar(){return on(Et.LegacyInterceptors,[{provide:dt,useFactory:qt},{provide:ye,useExisting:dt,multi:!0}])}var an=new T(""),cn="b",dn="h",ln="s",un="st",hn="u",fn="rt",me=new T(""),pn=["GET","HEAD"];function mn(n,t){let y=v(me),{isCacheActive:e}=y,r=Ae(y,["isCacheActive"]),{transferCache:s,method:o}=n;if(!e||s===!1||o==="POST"&&!r.includePostRequests&&!s||o!=="POST"&&!pn.includes(o)||!r.includeRequestsWithAuthHeaders&&yn(n)||r.filter?.(n)===!1)return t(n);let i=v(Ue);if(v(an,{optional:!0}))throw new w(2803,!1);let a=n.url,d=gn(n,a),u=i.get(d,null),m=r.includeHeaders;if(typeof s=="object"&&s.includeHeaders&&(m=s.includeHeaders),u){let{[cn]:p,[fn]:X,[dn]:h,[ln]:f,[un]:b,[hn]:G}=u,g=p;switch(X){case"arraybuffer":g=new TextEncoder().encode(p).buffer;break;case"blob":g=new Blob([p]);break}let _=new D(h);return J(new N({body:g,headers:_,status:f,statusText:b,url:G}))}return t(n).pipe(_e(p=>{p instanceof N}))}function yn(n){return n.headers.has("authorization")||n.headers.has("proxy-authorization")}function lt(n){return[...n.keys()].sort().map(t=>`${t}=${n.getAll(t)}`).join("&")}function gn(n,t){let{params:e,method:r,responseType:s}=n,o=lt(e),i=n.serializeBody();i instanceof URLSearchParams?i=lt(i):typeof i!="string"&&(i="");let c=[r,s,t,i,o].join("|"),a=vn(c);return a}function vn(n){let t=0;for(let e of n)t=Math.imul(31,t)+e.charCodeAt(0)<<0;return t+=2147483648,t.toString()}function Tt(n){return[{provide:me,useFactory:()=>(Be("NgHttpTransferCache"),L({isCacheActive:!0},n))},{provide:yt,useValue:mn,multi:!0},{provide:qe,multi:!0,useFactory:()=>{let t=v(ce),e=v(me);return()=>{t.whenStable().then(()=>{e.isCacheActive=!1})}}}]}var ve=class extends Qe{supportsDOMEvents=!0},Ee=class n extends ve{static makeCurrent(){He(new n)}onAndCancel(t,e,r,s){return t.addEventListener(e,r,s),()=>{t.removeEventListener(e,r,s)}}dispatchEvent(t,e){t.dispatchEvent(e)}remove(t){t.remove()}createElement(t,e){return e=e||this.getDefaultDocument(),e.createElement(t)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(t){return t.nodeType===Node.ELEMENT_NODE}isShadowRoot(t){return t instanceof DocumentFragment}getGlobalEventTarget(t,e){return e==="window"?window:e==="document"?t:e==="body"?t.body:null}getBaseHref(t){let e=En();return e==null?null:Tn(e)}resetBaseElement(){z=null}getUserAgent(){return window.navigator.userAgent}getCookie(t){return Z(document.cookie,t)}},z=null;function En(){return z=z||document.querySelector("base"),z?z.getAttribute("href"):null}function Tn(n){return new URL(n,document.baseURI).pathname}var wn=(()=>{class n{build(){return new XMLHttpRequest}static \u0275fac=function(r){return new(r||n)};static \u0275prov=E({token:n,factory:n.\u0275fac})}return n})(),Te=new T(""),At=(()=>{class n{_zone;_plugins;_eventNameToPlugin=new Map;constructor(e,r){this._zone=r,e.forEach(s=>{s.manager=this}),this._plugins=e.slice().reverse()}addEventListener(e,r,s,o){return this._findPluginFor(r).addEventListener(e,r,s,o)}getZone(){return this._zone}_findPluginFor(e){let r=this._eventNameToPlugin.get(e);if(r)return r;if(r=this._plugins.find(o=>o.supports(e)),!r)throw new w(5101,!1);return this._eventNameToPlugin.set(e,r),r}static \u0275fac=function(r){return new(r||n)(l(Te),l(k))};static \u0275prov=E({token:n,factory:n.\u0275fac})}return n})(),te=class{_doc;constructor(t){this._doc=t}manager},ee="ng-app-id";function wt(n){for(let t of n)t.remove()}function Rt(n,t){let e=t.createElement("style");return e.textContent=n,e}function Rn(n,t,e,r){let s=n.head?.querySelectorAll(`style[${ee}="${t}"],link[${ee}="${t}"]`);if(s)for(let o of s)o.removeAttribute(ee),o instanceof HTMLLinkElement?r.set(o.href.slice(o.href.lastIndexOf("/")+1),{usage:0,elements:[o]}):o.textContent&&e.set(o.textContent,{usage:0,elements:[o]})}function we(n,t){let e=t.createElement("link");return e.setAttribute("rel","stylesheet"),e.setAttribute("href",n),e}var Ot=(()=>{class n{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;isServer;constructor(e,r,s,o={}){this.doc=e,this.appId=r,this.nonce=s,this.isServer=le(o),Rn(e,r,this.inline,this.external),this.hosts.add(e.head)}addStyles(e,r){for(let s of e)this.addUsage(s,this.inline,Rt);r?.forEach(s=>this.addUsage(s,this.external,we))}removeStyles(e,r){for(let s of e)this.removeUsage(s,this.inline);r?.forEach(s=>this.removeUsage(s,this.external))}addUsage(e,r,s){let o=r.get(e);o?o.usage++:r.set(e,{usage:1,elements:[...this.hosts].map(i=>this.addElement(i,s(e,this.doc)))})}removeUsage(e,r){let s=r.get(e);s&&(s.usage--,s.usage<=0&&(wt(s.elements),r.delete(e)))}ngOnDestroy(){for(let[,{elements:e}]of[...this.inline,...this.external])wt(e);this.hosts.clear()}addHost(e){this.hosts.add(e);for(let[r,{elements:s}]of this.inline)s.push(this.addElement(e,Rt(r,this.doc)));for(let[r,{elements:s}]of this.external)s.push(this.addElement(e,we(r,this.doc)))}removeHost(e){this.hosts.delete(e)}addElement(e,r){return this.nonce&&r.setAttribute("nonce",this.nonce),this.isServer&&r.setAttribute(ee,this.appId),e.appendChild(r)}static \u0275fac=function(r){return new(r||n)(l(R),l(ie),l(ae,8),l(O))};static \u0275prov=E({token:n,factory:n.\u0275fac})}return n})(),ge={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},Me=/%COMP%/g;var Pt="%COMP%",bn=`_nghost-${Pt}`,Mn=`_ngcontent-${Pt}`,Dn=!0,An=new T("",{providedIn:"root",factory:()=>Dn});function On(n){return Mn.replace(Me,n)}function Pn(n){return bn.replace(Me,n)}function St(n,t){return t.map(e=>e.replace(Me,n))}var bt=(()=>{class n{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;platformId;ngZone;nonce;tracingService;rendererByCompId=new Map;defaultRenderer;platformIsServer;constructor(e,r,s,o,i,c,a,d=null,u=null){this.eventManager=e,this.sharedStylesHost=r,this.appId=s,this.removeStylesOnCompDestroy=o,this.doc=i,this.platformId=c,this.ngZone=a,this.nonce=d,this.tracingService=u,this.platformIsServer=le(c),this.defaultRenderer=new V(e,i,a,this.platformIsServer,this.tracingService)}createRenderer(e,r){if(!e||!r)return this.defaultRenderer;this.platformIsServer&&r.encapsulation===x.ShadowDom&&(r=De(L({},r),{encapsulation:x.Emulated}));let s=this.getOrCreateRenderer(e,r);return s instanceof ne?s.applyToHost(e):s instanceof $&&s.applyStyles(),s}getOrCreateRenderer(e,r){let s=this.rendererByCompId,o=s.get(r.id);if(!o){let i=this.doc,c=this.ngZone,a=this.eventManager,d=this.sharedStylesHost,u=this.removeStylesOnCompDestroy,m=this.platformIsServer,y=this.tracingService;switch(r.encapsulation){case x.Emulated:o=new ne(a,d,r,this.appId,u,i,c,m,y);break;case x.ShadowDom:return new Re(a,d,e,r,i,c,this.nonce,m,y);default:o=new $(a,d,r,u,i,c,m,y);break}s.set(r.id,o)}return o}ngOnDestroy(){this.rendererByCompId.clear()}componentReplaced(e){this.rendererByCompId.delete(e)}static \u0275fac=function(r){return new(r||n)(l(At),l(Ot),l(ie),l(An),l(R),l(O),l(k),l(ae),l(Fe,8))};static \u0275prov=E({token:n,factory:n.\u0275fac})}return n})(),V=class{eventManager;doc;ngZone;platformIsServer;tracingService;data=Object.create(null);throwOnSyntheticProps=!0;constructor(t,e,r,s,o){this.eventManager=t,this.doc=e,this.ngZone=r,this.platformIsServer=s,this.tracingService=o}destroy(){}destroyNode=null;createElement(t,e){return e?this.doc.createElementNS(ge[e]||e,t):this.doc.createElement(t)}createComment(t){return this.doc.createComment(t)}createText(t){return this.doc.createTextNode(t)}appendChild(t,e){(Mt(t)?t.content:t).appendChild(e)}insertBefore(t,e,r){t&&(Mt(t)?t.content:t).insertBefore(e,r)}removeChild(t,e){e.remove()}selectRootElement(t,e){let r=typeof t=="string"?this.doc.querySelector(t):t;if(!r)throw new w(-5104,!1);return e||(r.textContent=""),r}parentNode(t){return t.parentNode}nextSibling(t){return t.nextSibling}setAttribute(t,e,r,s){if(s){e=s+":"+e;let o=ge[s];o?t.setAttributeNS(o,e,r):t.setAttribute(e,r)}else t.setAttribute(e,r)}removeAttribute(t,e,r){if(r){let s=ge[r];s?t.removeAttributeNS(s,e):t.removeAttribute(`${r}:${e}`)}else t.removeAttribute(e)}addClass(t,e){t.classList.add(e)}removeClass(t,e){t.classList.remove(e)}setStyle(t,e,r,s){s&(j.DashCase|j.Important)?t.style.setProperty(e,r,s&j.Important?"important":""):t.style[e]=r}removeStyle(t,e,r){r&j.DashCase?t.style.removeProperty(e):t.style[e]=""}setProperty(t,e,r){t!=null&&(t[e]=r)}setValue(t,e){t.nodeValue=e}listen(t,e,r,s){if(typeof t=="string"&&(t=de().getGlobalEventTarget(this.doc,t),!t))throw new Error(`Unsupported event target ${t} for event ${e}`);let o=this.decoratePreventDefault(r);return this.tracingService!==null&&this.tracingService.wrapEventListener&&(o=this.tracingService.wrapEventListener(t,e,o)),this.eventManager.addEventListener(t,e,o,s)}decoratePreventDefault(t){return e=>{if(e==="__ngUnwrap__")return t;(this.platformIsServer?this.ngZone.runGuarded(()=>t(e)):t(e))===!1&&e.preventDefault()}}};function Mt(n){return n.tagName==="TEMPLATE"&&n.content!==void 0}var Re=class extends V{sharedStylesHost;hostEl;shadowRoot;constructor(t,e,r,s,o,i,c,a,d){super(t,o,i,a,d),this.sharedStylesHost=e,this.hostEl=r,this.shadowRoot=r.attachShadow({mode:"open"}),this.sharedStylesHost.addHost(this.shadowRoot);let u=s.styles;u=St(s.id,u);for(let y of u){let p=document.createElement("style");c&&p.setAttribute("nonce",c),p.textContent=y,this.shadowRoot.appendChild(p)}let m=s.getExternalStyles?.();if(m)for(let y of m){let p=we(y,o);c&&p.setAttribute("nonce",c),this.shadowRoot.appendChild(p)}}nodeOrShadowRoot(t){return t===this.hostEl?this.shadowRoot:t}appendChild(t,e){return super.appendChild(this.nodeOrShadowRoot(t),e)}insertBefore(t,e,r){return super.insertBefore(this.nodeOrShadowRoot(t),e,r)}removeChild(t,e){return super.removeChild(null,e)}parentNode(t){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)))}destroy(){this.sharedStylesHost.removeHost(this.shadowRoot)}},$=class extends V{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;constructor(t,e,r,s,o,i,c,a,d){super(t,o,i,c,a),this.sharedStylesHost=e,this.removeStylesOnCompDestroy=s;let u=r.styles;this.styles=d?St(d,u):u,this.styleUrls=r.getExternalStyles?.(d)}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls)}destroy(){this.removeStylesOnCompDestroy&&this.sharedStylesHost.removeStyles(this.styles,this.styleUrls)}},ne=class extends ${contentAttr;hostAttr;constructor(t,e,r,s,o,i,c,a,d){let u=s+"-"+r.id;super(t,e,r,o,i,c,a,d,u),this.contentAttr=On(u),this.hostAttr=Pn(u)}applyToHost(t){this.applyStyles(),this.setAttribute(t,this.hostAttr,"")}createElement(t,e){let r=super.createElement(t,e);return super.setAttribute(r,this.contentAttr,""),r}},Sn=(()=>{class n extends te{constructor(e){super(e)}supports(e){return!0}addEventListener(e,r,s,o){return e.addEventListener(r,s,o),()=>this.removeEventListener(e,r,s,o)}removeEventListener(e,r,s,o){return e.removeEventListener(r,s,o)}static \u0275fac=function(r){return new(r||n)(l(R))};static \u0275prov=E({token:n,factory:n.\u0275fac})}return n})(),Dt=["alt","control","meta","shift"],In={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},Nn={alt:n=>n.altKey,control:n=>n.ctrlKey,meta:n=>n.metaKey,shift:n=>n.shiftKey},_n=(()=>{class n extends te{constructor(e){super(e)}supports(e){return n.parseEventName(e)!=null}addEventListener(e,r,s,o){let i=n.parseEventName(r),c=n.eventCallback(i.fullKey,s,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>de().onAndCancel(e,i.domEventName,c,o))}static parseEventName(e){let r=e.toLowerCase().split("."),s=r.shift();if(r.length===0||!(s==="keydown"||s==="keyup"))return null;let o=n._normalizeKey(r.pop()),i="",c=r.indexOf("code");if(c>-1&&(r.splice(c,1),i="code."),Dt.forEach(d=>{let u=r.indexOf(d);u>-1&&(r.splice(u,1),i+=d+".")}),i+=o,r.length!=0||o.length===0)return null;let a={};return a.domEventName=s,a.fullKey=i,a}static matchEventFullKeyCode(e,r){let s=In[e.key]||e.key,o="";return r.indexOf("code.")>-1&&(s=e.code,o="code."),s==null||!s?!1:(s=s.toLowerCase(),s===" "?s="space":s==="."&&(s="dot"),Dt.forEach(i=>{if(i!==s){let c=Nn[i];c(e)&&(o+=i+".")}}),o+=s,o===r)}static eventCallback(e,r,s){return o=>{n.matchEventFullKeyCode(o,e)&&s.runGuarded(()=>r(o))}}static _normalizeKey(e){return e==="esc"?"escape":e}static \u0275fac=function(r){return new(r||n)(l(R))};static \u0275prov=E({token:n,factory:n.\u0275fac})}return n})();function kr(n,t){return Ye(L({rootComponent:n},Ln(t)))}function Ln(n){return{appProviders:[...Un,...n?.providers??[]],platformProviders:jn}}function Cn(){Ee.makeCurrent()}function kn(){return new oe}function xn(){return xe(document),document}var jn=[{provide:O,useValue:et},{provide:je,useValue:Cn,multi:!0},{provide:R,useFactory:xn,deps:[]}];var Un=[{provide:Le,useValue:"root"},{provide:oe,useFactory:kn,deps:[]},{provide:Te,useClass:Sn,multi:!0,deps:[R]},{provide:Te,useClass:_n,multi:!0,deps:[R]},bt,Ot,At,{provide:Ze,useExisting:bt},{provide:q,useClass:wn,deps:[]},[]];var xr=(()=>{class n{_doc;constructor(e){this._doc=e}getTitle(){return this._doc.title}setTitle(e){this._doc.title=e||""}static \u0275fac=function(r){return new(r||n)(l(R))};static \u0275prov=E({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var Fn=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275prov=E({token:n,factory:function(r){let s=null;return r?s=new(r||n):s=l(Bn),s},providedIn:"root"})}return n})(),Bn=(()=>{class n extends Fn{_doc;constructor(e){super(),this._doc=e}sanitize(e,r){if(r==null)return null;switch(e){case A.NONE:return r;case A.HTML:return S(r,"HTML")?P(r):We(this._doc,String(r)).toString();case A.STYLE:return S(r,"Style")?P(r):r;case A.SCRIPT:if(S(r,"Script"))return P(r);throw new w(5200,!1);case A.URL:return S(r,"URL")?P(r):Je(String(r));case A.RESOURCE_URL:if(S(r,"ResourceURL"))return P(r);throw new w(5201,!1);default:throw new w(5202,!1)}}bypassSecurityTrustHtml(e){return ze(e)}bypassSecurityTrustStyle(e){return Ve(e)}bypassSecurityTrustScript(e){return $e(e)}bypassSecurityTrustUrl(e){return Xe(e)}bypassSecurityTrustResourceUrl(e){return Ge(e)}static \u0275fac=function(r){return new(r||n)(l(R))};static \u0275prov=E({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),be=function(n){return n[n.NoHttpTransferCache=0]="NoHttpTransferCache",n[n.HttpTransferCacheOptions=1]="HttpTransferCacheOptions",n[n.I18nSupport=2]="I18nSupport",n[n.EventReplay=3]="EventReplay",n[n.IncrementalHydration=4]="IncrementalHydration",n}(be||{});function jr(...n){let t=[],e=new Set,r=e.has(be.HttpTransferCacheOptions);for(let{\u0275providers:s,\u0275kind:o}of n)e.add(o),s.length&&t.push(s);return W([[],Ke(),e.has(be.NoHttpTransferCache)||r?[]:Tt({}),t])}export{D as a,M as b,Xt as c,ir as d,ar as e,bt as f,kr as g,xr as h,Fn as i,jr as j};
