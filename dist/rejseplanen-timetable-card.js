/*!
* Rejseplanen Timetable Card
* https://github.com/FHallengreen/rejseplanen-timetable-card
*
* Copyright (c) 2025-2026 Mattias Sjödin
* Copyright (c) 2026 Frederik Hansen
* Released under the MIT License.
*
* Derived from HomeAssistant_Trafiklab_Timetable_Card by Mattias Sjödin (MIT).
*/
/**
* @license
* Copyright 2019 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
var e=globalThis,t=e.ShadowRoot&&(e.ShadyCSS===void 0||e.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,n=Symbol(),r=new WeakMap,i=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,n=this.t;if(t&&e===void 0){let t=n!==void 0&&n.length===1;t&&(e=r.get(n)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&r.set(n,e))}return e}toString(){return this.cssText}},a=e=>new i(typeof e==`string`?e:e+``,void 0,n),o=(e,...t)=>new i(e.length===1?e[0]:t.reduce(((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1]),e[0]),e,n),s=(n,r)=>{if(t)n.adoptedStyleSheets=r.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet));else for(let t of r){let r=document.createElement(`style`),i=e.litNonce;i!==void 0&&r.setAttribute(`nonce`,i),r.textContent=t.cssText,n.appendChild(r)}},c=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return a(t)})(e):e,l,{is:u,defineProperty:d,getOwnPropertyDescriptor:f,getOwnPropertyNames:p,getOwnPropertySymbols:m,getPrototypeOf:ee}=Object,h=globalThis,te=h.trustedTypes,ne=te?te.emptyScript:``,re=h.reactiveElementPolyfillSupport,g=(e,t)=>e,_={toAttribute(e,t){
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
switch(t){case Boolean:e=e?ne:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},v=(e,t)=>!u(e,t),ie={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:v};(l=Symbol).metadata??(l.metadata=Symbol(`metadata`)),h.litPropertyMetadata??(h.litPropertyMetadata=new WeakMap);var y=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ie){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&d(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=f(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ie}static _$Ei(){if(this.hasOwnProperty(g(`elementProperties`)))return;let e=ee(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(g(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(g(`properties`))){let e=this.properties,t=[...p(e),...m(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(c(e))}else e!==void 0&&t.push(c(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return s(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?_:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?_:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n){if(e!==void 0){let r=this.constructor,i=this[e];if(n??(n=r.getPropertyOptions(e)),!((n.hasChanged??v)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach((e=>e.hostUpdate?.())),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach((e=>e.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach((e=>this._$ET(e,this[e])))),this._$EM()}updated(e){}firstUpdated(e){}};y.elementStyles=[],y.shadowRootOptions={mode:`open`},y[g(`elementProperties`)]=new Map,y[g(`finalized`)]=new Map,re?.({ReactiveElement:y}),(h.reactiveElementVersions??(h.reactiveElementVersions=[])).push(`2.1.1`);
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
var b=globalThis,x=b.trustedTypes,ae=x?x.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,oe=`$lit$`,S=`lit$${Math.random().toFixed(9).slice(2)}$`,C=`?`+S,se=`<${C}>`,w=document,T=()=>w.createComment(``),E=e=>e===null||typeof e!=`object`&&typeof e!=`function`,D=Array.isArray,ce=e=>D(e)||typeof e?.[Symbol.iterator]==`function`,O=`[ 	
\f\r]`,k=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,le=/-->/g,A=/>/g,j=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),M=/'/g,ue=/"/g,de=/^(?:script|style|textarea|title)$/i,N=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),P=Symbol.for(`lit-noChange`),F=Symbol.for(`lit-nothing`),fe=new WeakMap,I=w.createTreeWalker(w,129);function L(e,t){if(!D(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return ae===void 0?t:ae.createHTML(t)}var pe=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=k;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===k?c[1]===`!--`?o=le:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=j):(de.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=j):o=A:o===j?c[0]===`>`?(o=i??k,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?j:c[3]===`"`?ue:M):o===ue||o===M?o=j:o===le||o===A?o=k:(o=j,i=void 0);let d=o===j&&e[t+1].startsWith(`/>`)?` `:``;a+=o===k?n+se:l>=0?(r.push(s),n.slice(0,l)+oe+n.slice(l)+S+d):n+S+(l===-2?t:d)}return[L(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},R=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=pe(t,n);if(this.el=e.createElement(l,r),I.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=I.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(oe)){let t=u[o++],n=i.getAttribute(e).split(S),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?he:r[1]===`?`?ge:r[1]===`@`?_e:V}),i.removeAttribute(e)}else e.startsWith(S)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(de.test(i.tagName)){let e=i.textContent.split(S),t=e.length-1;if(t>0){i.textContent=x?x.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],T()),I.nextNode(),c.push({type:2,index:++a});i.append(e[t],T())}}}else if(i.nodeType===8){if(i.data===C)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(S,e+1))!==-1;)c.push({type:7,index:a}),e+=S.length-1}}a++}}static createElement(e,t){let n=w.createElement(`template`);return n.innerHTML=e,n}};function z(e,t,n=e,r){if(t===P)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=E(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??(n._$Co=[]))[r]=i),i!==void 0&&(t=z(e,i._$AS(e,t.values),i,r)),t}var me=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??w).importNode(t,!0);I.currentNode=r;let i=I.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new B(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new ve(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=I.nextNode(),a++)}return I.currentNode=w,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},B=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=z(this,e,t),E(e)?e===F||e==null||e===``?(this._$AH!==F&&this._$AR(),this._$AH=F):e!==this._$AH&&e!==P&&this._(e):e._$litType$===void 0?e.nodeType===void 0?ce(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==F&&E(this._$AH)?this._$AA.nextSibling.data=e:this.T(w.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=R.createElement(L(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new me(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=fe.get(e.strings);return t===void 0&&fe.set(e.strings,t=new R(e)),t}k(t){D(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(T()),this.O(T()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=e.nextSibling;e.remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},V=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=F,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=F}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=z(this,e,t,0),a=!E(e)||e!==this._$AH&&e!==P,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=z(this,r[n+o],t,o),s===P&&(s=this._$AH[o]),a||(a=!E(s)||s!==this._$AH[o]),s===F?e=F:e!==F&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},he=class extends V{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===F?void 0:e}},ge=class extends V{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==F)}},_e=class extends V{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=z(this,e,t,0)??F)===P)return;let n=this._$AH,r=e===F&&n!==F||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==F&&(n===F||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ve=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){z(this,e)}},ye=b.litHtmlPolyfillSupport;ye?.(R,B),(b.litHtmlVersions??(b.litHtmlVersions=[])).push(`3.3.1`);var be=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new B(t.insertBefore(T(),e),e,void 0,n??{})}return i._$AI(e),i},H=globalThis,U=class extends y{constructor(){
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=be(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return P}};U._$litElement$=!0,U.finalized=!0,H.litElementHydrateSupport?.({LitElement:U});var xe=H.litElementPolyfillSupport;xe?.({LitElement:U}),(H.litElementVersions??(H.litElementVersions=[])).push(`4.2.1`);
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/var Se={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:v},Ce=(e=Se,t,n)=>{let{kind:r,metadata:i}=n,a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),r===`setter`&&((e=Object.create(e)).wrapped=!0),a.set(n.name,e),r===`accessor`){let{name:r}=n;return{set(n){let i=t.get.call(this);t.set.call(this,n),this.requestUpdate(r,i,e)},init(t){return t!==void 0&&this.C(r,void 0,e,t),t}}}if(r===`setter`){let{name:r}=n;return function(n){let i=this[r];t.call(this,n),this.requestUpdate(r,i,e)}}throw Error(`Unsupported decorator location: `+r)};function we(e){return(t,n)=>typeof n==`object`?Ce(e,t,n):((e,t,n)=>{let r=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),r?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/function Te(e){return we({...e,state:!0,attribute:!1})}var W={card:{title:`Rejseplanen Timetable`},error:{entity_not_found:`Entity not found: {entity}`,xml_format:`The sensor returns XML data. Add format=json to the Rejseplanen API URL.`},empty:{no_upcoming:`No upcoming departures`},label:{platform:`Platform {platform}`,stand:`Stand {platform}`,bay:`Bay {platform}`,now:`Now`,in_minutes:`in {minutes} min`,updated:`Updated {time}`,mode_bus:`Bus`,mode_metro:`Metro`,mode_train:`Train`,mode_tram:`Tram`,mode_taxi:`Taxi`,mode_boat:`Boat`},status:{cancelled:`Cancelled`,delayed:`Delayed {minutes} min`,on_time:`On time`,scheduled:`Scheduled`},editor:{sensor_entity:`Sensor entity`,show_heading:`Show heading (friendly name)`,max_items:`Max items`,section_general:`Card options`,help_sensor:`Select the Rejseplanen REST sensor (with a Departure attribute).`,help_show_heading:`Show the sensor's friendly name as the card heading.`,help_max_items:`Maximum number of departures to display.`}},Ee={da:{card:{title:`Rejseplanen Afgangstavle`},error:{entity_not_found:`Entitet ikke fundet: {entity}`,xml_format:`Sensoren returnerer XML-data. Tilføj format=json til Rejseplanen API-URL'en.`},empty:{no_upcoming:`Ingen kommende afgange`},label:{platform:`Perron {platform}`,stand:`Stoppested {platform}`,bay:`Kaj {platform}`,now:`Nu`,in_minutes:`om {minutes} min`,updated:`Opdateret {time}`,mode_bus:`Bus`,mode_metro:`Metro`,mode_train:`Tog`,mode_tram:`Letbane`,mode_taxi:`Taxa`,mode_boat:`Færge`},status:{cancelled:`Aflyst`,delayed:`Forsinket {minutes} min`,on_time:`Til tiden`,scheduled:`Planlagt`},editor:{sensor_entity:`Sensor entitet`,show_heading:`Vis overskrift (venligt navn)`,max_items:`Maks. antal`,section_general:`Kort indstillinger`,help_sensor:`Vælg Rejseplanen REST-sensoren (med attributten Departure).`,help_show_heading:`Vis sensorens venlige navn som kortets overskrift.`,help_max_items:`Maksimalt antal afgange der skal vises.`}},sv:{card:{title:`Rejseplanen Tidtabell`},error:{entity_not_found:`Enheten hittades inte: {entity}`,xml_format:`Sensorn returnerar XML-data. Lägg till format=json i Rejseplanen API-URL:en.`},empty:{no_upcoming:`Inga kommande avgångar`},label:{platform:`Plattform {platform}`,stand:`Läge {platform}`,bay:`Brygga {platform}`,now:`Nu`,in_minutes:`om {minutes} min`,updated:`Uppdaterad {time}`,mode_bus:`Buss`,mode_metro:`T-bana`,mode_train:`Tåg`,mode_tram:`Spårvagn`,mode_taxi:`Taxi`,mode_boat:`Båt`},status:{cancelled:`Inställd`,delayed:`Försenad {minutes} min`,on_time:`I tid`,scheduled:`Planerad`},editor:{sensor_entity:`Sensornamn`,show_heading:`Visa rubrik (visningsnamn)`,max_items:`Max antal`,section_general:`Kortalternativ`,help_sensor:`Välj Rejseplanen REST-sensorn (med attributet Departure).`,help_show_heading:`Visa sensorns visningsnamn som kortets rubrik.`,help_max_items:`Maximalt antal avgångar att visa.`}},en:W};function De(e,t){let n=t.split(`.`).reduce((e,t)=>e?e[t]:void 0,e);return typeof n==`string`?n:void 0}function Oe(e,t,n){let r=De(Ee[String(e?.locale?.language||e?.language||`en`).toLowerCase().slice(0,2)]??W,t)??De(W,t)??t;return n?Object.entries(n).reduce((e,[t,n])=>e.split(`{${t}}`).join(String(n)),r):r}function G(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var ke,K=class extends U{setConfig(e){this._config={show_name:!0,max_items:5,...e}}_valueChanged(e){this._config||(this._config={type:`rejseplanen-timetable-card`,entity:``,show_name:!0,max_items:5});let t=e.currentTarget,n=e.detail,r={...this._config},i=t?.configValue??t?.dataset?.configValue;if(i){let e=n?.value??t.value??t.checked;if(t.type===`number`||t.inputMode===`numeric`||i===`max_items`){let t=Number(e);Number.isNaN(t)||(e=t)}t.type===`checkbox`?r[i]=t.checked:e!==void 0&&(r[i]=e)}JSON.stringify(r)!==JSON.stringify(this._config)&&(this._config=r,this.dispatchEvent(new CustomEvent(`config-changed`,{detail:{config:r}})))}render(){let e=(e,t)=>Oe(this.hass,e,t),t=!!customElements.get(`ha-entity-picker`)&&!!this.hass,n=!!customElements.get(`ha-switch`),r=!!customElements.get(`ha-textfield`),i=!!customElements.get(`ha-form`),a={entity:this._config?.entity??``,show_name:this._config?.show_name!==!1,max_items:this._config?.max_items??5};if(i){let t=[{name:`entity`,selector:{entity:{domain:`sensor`}}},{name:`show_name`,selector:{boolean:{}}},{name:`max_items`,selector:{number:{min:1,max:20,mode:`box`}}}],n={entity:a.entity,show_name:a.show_name,max_items:a.max_items};return N`
        <ha-form
          .hass=${this.hass}
          .data=${n}
          .schema=${t}
          .computeLabel=${t=>{switch(t.name){case`entity`:return e(`editor.sensor_entity`);case`show_name`:return e(`editor.show_heading`);case`max_items`:return e(`editor.max_items`);default:return String(t.name)}}}
          .computeHelper=${t=>{switch(t.name){case`entity`:return e(`editor.help_sensor`);case`show_name`:return e(`editor.help_show_heading`);case`max_items`:return e(`editor.help_max_items`);default:return}}}
          @value-changed=${e=>{let t=e.detail?.value||{},n={...this._config||{type:`custom:rejseplanen-timetable-card`},entity:t.entity??``,show_name:t.show_name??!0,max_items:typeof t.max_items==`number`?t.max_items:Number(t.max_items)||5};JSON.stringify(n)!==JSON.stringify(this._config)&&(this._config=n,this.dispatchEvent(new CustomEvent(`config-changed`,{detail:{config:n}})))}}
        ></ha-form>
      `}return N`
      <div class="card-config">
        <div class="field">
          ${t?N`<ha-entity-picker
                  .hass=${this.hass}
                  .value=${a.entity}
                  .label=${e(`editor.sensor_entity`)}
                  .configValue=${`entity`}
                  .includeDomains=${[`sensor`]}
                  allow-custom-entity
                  @value-changed=${this._valueChanged}
                ></ha-entity-picker>`:N`<label class="lbl">${e(`editor.sensor_entity`)}<input
                    type="text"
                    .value=${a.entity}
                    data-config-value="entity"
                    @input=${e=>this._valueChanged(e)}
                  /></label>`}
        </div>
        <div class="field">
          ${n?N`<ha-formfield .label=${e(`editor.show_heading`)}>
                  <ha-switch
                    .checked=${a.show_name}
                    .configValue=${`show_name`}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>`:N`<label class="lbl"><input type="checkbox"
                    .checked=${a.show_name}
                    data-config-value="show_name"
                    @change=${e=>this._valueChanged(e)}
                  /> ${e(`editor.show_heading`)}</label>`}
        </div>
        <div class="field">
          ${r?N`<ha-textfield
                  .label=${e(`editor.max_items`)}
                  .value=${String(a.max_items)}
                  .configValue=${`max_items`}
                  type="number"
                  min="1"
                  max="20"
                  @value-changed=${this._valueChanged}
                  @input=${this._valueChanged}
                  @change=${this._valueChanged}
                ></ha-textfield>`:N`<label class="lbl">${e(`editor.max_items`)}<input
                    type="number" min="1" max="20"
                    .value=${String(a.max_items)}
                    data-config-value="max_items"
                    @input=${e=>this._valueChanged(e)}
                  /></label>`}
        </div>
      </div>
    `}};ke=K,ke.styles=o`
  .card-config { display: grid; gap: 16px; }
  .lbl { display: grid; gap: 6px; font: inherit; color: var(--primary-text-color); }
  input[type="text"], input[type="number"] { padding: 8px; border-radius: 6px; border: 1px solid var(--divider-color); width: 100%; background: var(--card-background-color); color: var(--primary-text-color); }
  `,G([we({attribute:!1})],K.prototype,`hass`,void 0),G([Te()],K.prototype,`_config`,void 0),customElements.get(`rejseplanen-timetable-card-editor`)||customElements.define(`rejseplanen-timetable-card-editor`,K);function Ae(e,t){if(!e||!t)return;let n=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e),r=/^(\d{2}):(\d{2})(?::(\d{2}))?$/.exec(t);if(n&&r)return new Date(+n[1],n[2]-1,+n[3],+r[1],+r[2],r[3]?+r[3]:0)}function je(e,t){let n=e=>(parseInt(e.substring(0,2))||0)*60+(parseInt(e.substring(3,5))||0),r=n(t)-n(e);return r<-720&&(r+=1440),r>720&&(r-=1440),r}function q(e){return e.toString().padStart(2,`0`)}function Me(e){let t=(e?.catOut||``).toString(),n=(e?.catOutL||``).toString(),r=(e?.icon?.res||``).toString(),i=t.toUpperCase();return t===`MET`||n.includes(`Metro`)||r===`prod_sub`?`metro`:n.includes(`Tog`)||n.includes(`Train`)||t.includes(`S-Tog`)||n.includes(`Lokalbane`)||n.includes(`Regional`)||n.includes(`InterCity`)||[`S`,`RE`,`REG`,`IC`,`ICL`,`LYN`,`LOK`,`ØRE`].includes(i)||[`prod_comm`,`prod_reg`,`prod_long`,`prod_loc`,`prod_ic`].includes(r)?`train`:n.includes(`Tram`)||n.includes(`Letbane`)||r===`prod_tram`?`tram`:n.includes(`Ferry`)||n.includes(`Boat`)||n.includes(`Færge`)||r===`prod_ship`?`boat`:`bus`}function Ne(e,t=new Date){if(!e)return null;let n=e.ProductAtStop||{},r=(e.time||``).toString(),i=(e.rtTime||``).toString(),a=i||r,o=Ae(e.date,r),s=i?Ae(e.rtDate||e.date,i):void 0,c=s??o,l=new Date(t);l.setSeconds(0,0);let u=null;c?u=Math.floor((c.getTime()-l.getTime())/6e4):a&&(u=je(`${q(t.getHours())}:${q(t.getMinutes())}`,a));let d=0;o&&s?d=Math.round((s.getTime()-o.getTime())/6e4):r&&i&&(d=je(r,i));let f=``;e.rtTrack?f=e.rtTrack.toString():e.track?f=e.track.toString():e.rtPlatform?.text?f=e.rtPlatform.text.toString():e.platform?.text&&(f=e.platform.text.toString());let p=r.substring(0,5),m=i?i.substring(0,5):p;return{line:n.displayNumber||e.name||``,destination:e.direction||``,scheduled_time:p,expected_time:m,time_formatted:m,minutes_until:u,transport_mode:Me(n),real_time:!!i,delay_minutes:d,canceled:e.cancelled===!0||e.cancelled===`true`,platform:f,station:e.stop||``}}function Pe(e){let t=e.attributes||{};if(`destination`in t||`scheduled_time`in t)return{line:t.line,destination:t.destination,scheduled_time:t.scheduled_time,expected_time:t.expected_time??t.scheduled_time,time_formatted:t.time_formatted,minutes_until:Number(e.state),transport_mode:t.transport_mode,real_time:t.real_time,delay:t.delay,delay_minutes:t.delay_minutes,canceled:t.canceled,platform:t.platform,agency:t.agency,station:t.station}}function J(e){if(Array.isArray(e))return e;if(e&&typeof e==`object`)return[e]}function Fe(e){return[e?.attributes?.Departure,e?.attributes?.DepartureBoard?.Departure].some(e=>{let t=J(e)?.[0];return!!t&&typeof t==`object`&&Object.keys(t).some(e=>e.startsWith(`@`))})}function Ie(e,t=new Date){if(!e)return[];let n,r=J(e.attributes?.upcoming),i=J(e.attributes?.Departure);if(r&&r.length>0)n=`line`in r[0]||`destination`in r[0]?r:r.map(e=>Ne(e,t)).filter(e=>e!==null);else if(i)n=i.map(e=>Ne(e,t)).filter(e=>e!==null);else{let t=Pe(e);n=t?[t]:[]}let a=n.filter(e=>!Le(e.minutes_until)||e.minutes_until>=0),o=e=>Le(e.minutes_until)?e.minutes_until:1/0;return a.sort((e,t)=>o(e)===o(t)?0:o(e)<o(t)?-1:1)}function Le(e){return typeof e==`number`&&!Number.isNaN(e)}function Re(e,t){let n=e?.time_format;if(n===`12`)return!0;if(n===`24`)return!1;let r=n===`system`?void 0:e?.language||t||`en`;try{return!!new Intl.DateTimeFormat(r,{hour:`numeric`}).resolvedOptions().hour12}catch{return!1}}function Y(e,t,n){return n?`${e%12||12}:${q(t)} ${e<12?`AM`:`PM`}`:`${q(e)}:${q(t)}`}function ze(e,t){let n=/^(\d{1,2}):(\d{2})/.exec(e);return n?Y(+n[1],+n[2],t):e}function Be(e){let t=e??``;return t.length<=4?`normal`:t.length<=6?`medium`:t.split(` `).some(e=>e.length>8)?`xlong`:`long`}var Ve={M1:`#0A9A48`,M2:`#FFC917`,M3:`#EE3B43`,M4:`#1EBAE5`},He={A:`#0173B7`,B:`#72BF44`,BX:`#72BF44`,C:`#E87722`,E:`#8B8C8E`,F:`#FFC917`,H:`#E30613`},X=`#E30613`,Ue=[`IC`,`LYN`,`ICL`,`REG`],We=[`ØRE`,`ØRESUND`],Ge=[`HORNBÆKBANEN`,`LILLE NORD`,`FREDERIKSVÆRKBANEN`,`GRIBSKOVBANEN`,`NÆRUMBANEN`,`ØSTBANEN`,`ODSHERREDSBANEN`,`TØLLØSEBANEN`],Ke=[`1A`,`2A`,`3A`,`4A`,`5A`,`6A`,`7A`,`9A`],qe=new Set([`#FFC917`]);function Z(e){return{bg:e,color:qe.has(e)?`#000`:`#fff`}}function Je(e,t){if(!e)return;let n=String(e).toUpperCase();if(Ve[n])return Z(Ve[n]);if(He[n])return Z(He[n]);if(Ue.includes(n))return Z(X);if(We.includes(n))return Z(`#2B6B3D`);if(Ge.includes(n))return Z(`#1073A5`);if(Ke.includes(n))return Z(X);if(n.endsWith(`S`)&&n.length<=4)return Z(`#0173B7`);if(n.startsWith(`E`))return Z(`#5A5A5A`);if(n.startsWith(`N`)||n.endsWith(`N`))return Z(`#003366`);if(t===`train`&&/^\d+$/.test(n))return Z(X);if(/^\d+[A-Z]?$/.test(n))return Z(`#FFC917`)}var Ye,Q=`rejseplanen-timetable-card`,Xe=15e3,$=class extends U{constructor(...e){super(...e),this._overlayHeight=0,this._overlayTop=0}set hass(e){this._hass=e,this.requestUpdate()}get hass(){return this._hass}connectedCallback(){super.connectedCallback(),this._tick=setInterval(()=>this.requestUpdate(),Xe)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._tick),this._tick=void 0}static getStubConfig(){return{show_name:!0,max_items:5}}static getConfigElement(){return document.createElement(`rejseplanen-timetable-card-editor`)}setConfig(e){if(!e||!e.entity)throw Error(`Required property missing: entity`);this._config={show_name:!0,max_items:5,...e,type:Q}}getCardSize(){let e=this._getDepartures().length||1;return 1+Math.min(e,this._config?.max_items??5)}_getEntity(){let e=this._config?.entity;if(e)return this.hass?.states?.[e]}_t(e,t){return Oe(this.hass,e,t)}_getDepartures(){return Ie(this._getEntity())}_modeLabel(e){if(!e)return;let t=`label.mode_${String(e).toLowerCase()}`,n=this._t(t);return n===t?e:n}_iconForMode(e){if(e)switch(String(e).toLowerCase()){case`bus`:return`mdi:bus`;case`metro`:return`mdi:subway-variant`;case`train`:return`mdi:train`;case`tram`:return`mdi:tram`;case`taxi`:return`mdi:taxi`;case`boat`:return`mdi:ferry`;default:return}}_platformLabelFor(e){let t=e?.platform;if(t==null||t===``)return;let n=String(e?.transport_mode||``).toLowerCase(),r=n===`bus`||n===`taxi`||n===`tram`?`label.stand`:n===`boat`?`label.bay`:`label.platform`;return this._t(r,{platform:t})}_statusFor(e){if(e.canceled)return{label:this._t(`status.cancelled`),badge:`cancel`};let t=typeof e.delay_minutes==`number`?e.delay_minutes:typeof e.delay==`number`?Math.round(e.delay/60):0;return t>0?{label:this._t(`status.delayed`,{minutes:t}),badge:`delay`}:e.real_time===!1?{label:this._t(`status.scheduled`),badge:`scheduled`}:{label:this._t(`status.on_time`),badge:`ok`}}_use12h(){return Re(this.hass?.locale,this.hass?.language)}_formatTimeString(e){let t=e.time_formatted||e.expected_time||e.scheduled_time;if(!t)return``;if(/^\d{1,2}:\d{2}/.test(t))return ze(t,this._use12h());let n=new Date(t);return Number.isNaN(n.getTime())?String(t):Y(n.getHours(),n.getMinutes(),this._use12h())}_formatUpdated(e){let t=new Date(e);return Number.isNaN(t.getTime())?e:Y(t.getHours(),t.getMinutes(),this._use12h())}_openMoreInfo(){let e=this._config?.entity;e&&this.dispatchEvent(new CustomEvent(`hass-more-info`,{bubbles:!0,composed:!0,detail:{entityId:e}}))}_onKeyActivate(e){(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),this._openMoreInfo())}updated(){try{let e=this.renderRoot.querySelector(`.list`),t=this.renderRoot.querySelector(`.card-body`),n=this.renderRoot.querySelector(`ha-card`);if(!e||!t||!n)return;let r=e.getBoundingClientRect(),i=t.getBoundingClientRect(),a=n.getBoundingClientRect(),o=Math.max(0,i.top-a.top),s=Math.max(0,r.top-i.top),c=Math.max(0,o+s-2),l=-o;(c!==this._overlayHeight||l!==this._overlayTop)&&(this._overlayHeight=c,this._overlayTop=l,this.requestUpdate())}catch{}}render(){let e=this._getEntity();if(!this._config)return F;if(!e)return N`<ha-card header=${this._t(`card.title`)}>
        <div class="content error">${this._t(`error.entity_not_found`,{entity:this._config.entity})}</div>
      </ha-card>`;let t=this._config.show_name!==!1,n=t?e.attributes?.friendly_name||e.entity_id:void 0,r=this._getDepartures().slice(0,this._config.max_items??5),i=Fe(e),a=e.attributes?.last_update??e.last_updated,o=new Set(r.map(e=>e.station||``)).size>1;return N`
      <ha-card .header=${t?n??this._t(`card.title`):void 0}>
        <div class="card-body">
          ${t?N`<div
                    class="header-overlay"
                    style="top: ${this._overlayTop}px; height: ${this._overlayHeight}px;"
                    role="button"
                    tabindex="0"
                    @click=${()=>this._openMoreInfo()}
                    @keydown=${e=>this._onKeyActivate(e)}
                  ></div>`:F}
        ${i?N`<div class="content error">${this._t(`error.xml_format`)}</div>`:r.length===0?N`<div class="content empty">${this._t(`empty.no_upcoming`)}</div>`:N`<div class="list" role="list">
              ${r.map(e=>{let t=this._statusFor(e),n=this._formatTimeString(e),r=typeof e.minutes_until==`number`?e.minutes_until:void 0,i=this._modeLabel(e.transport_mode)??e.transport_mode,a=this._iconForMode(e.transport_mode),s=r===void 0?void 0:r===0?this._t(`label.now`):this._t(`label.in_minutes`,{minutes:r}),c=Je(e.line,e.transport_mode),l=c?`background: ${c.bg}; color: ${c.color};`:``,u=Be(e.line);return N`
                  <div class="row ${e.canceled?`cancelled`:``}" role="listitem">
                    <div class="line">
                      <span class="pill" role="button" tabindex="0"
                            style="${l}"
                            @click=${()=>this._openMoreInfo()}
                            @keydown=${e=>this._onKeyActivate(e)}>
                        ${a&&u!==`xlong`?N`<ha-icon class="pill-icon" .icon=${a}></ha-icon>`:F}<span class="pill-text ${u}">${e.line??``}</span>
                      </span>
                    </div>
                    <div class="main">
                      ${o&&e.station?N`<div class="station">${e.station}</div>`:F}
                      <div class="dest">${e.destination??``}</div>
                      <div class="meta">
                        ${this._platformLabelFor(e)?N`<span class="platform">${this._platformLabelFor(e)}</span>`:F}
                        ${i?N`<span class="mode-text">${i}</span>`:F}
                      </div>
                    </div>
                    <div class="right">
                      <div class="time"><span class="time-text">${n}</span></div>
                      ${s!==void 0||t?.label?N`<div class="in-status">
                              ${s?N`<span class="in">${s}</span>`:F}
                              ${t?.label?N`<span class="status ${t.badge}">${t.label}</span>`:F}
                            </div>`:F}
                    </div>
                  </div>`})}
            </div>`}
        <div class="footer">
          ${e.attributes?.attribution?N`<span class="attr">${e.attributes.attribution}</span>`:F}
          ${a?N`<span class="updated">${this._t(`label.updated`,{time:this._formatUpdated(a)})}</span>`:F}
        </div>
        </div>
      </ha-card>
    `}};Ye=$,Ye.styles=o`
    ha-card {
      --pill-bg: var(--primary-color);
      --ok: var(--success-color, #0b8457);
      --delay: var(--warning-color, #b36b00);
      --cancel: var(--error-color, #c92a2a);
      /* Size controls for icon and line pill */
      --rejseplanen-pill-font-size: 1.3em; /* Smaller pill for more space */
      --rejseplanen-pill-icon-size: 1.1em; /* scale icon with text */
      --rejseplanen-pill-icon-nudge: -0.05em; /* slight optical centering */
    }
    .card-body { position: relative; container-type: inline-size; }
    .header-overlay { position: absolute; left: 0; right: 0; background: transparent; z-index: 2; }
    .content {
      padding: 12px 16px;
    }
    .error { color: var(--error-color); }
    .empty { color: var(--secondary-text-color); }
    .list { padding: 8px 8px 0; }
    .row {
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 12px;
      align-items: center;
      padding: 8px;
      border-bottom: 1px solid var(--divider-color);
    }
    .row:last-child { border-bottom: none; }
    .card-header { padding: 16px; font-size: 1.1em; font-weight: 600; cursor: pointer; }
    .pill {
      /* Fixed size so every row lines up; long line names shrink instead (see .pill-text) */
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.25em;
      width: var(--rejseplanen-pill-width, 4.8em);
      height: 1.75em;
      padding: 0 0.4em;
      overflow: hidden;
      border-radius: 999px;
      background: var(--pill-bg);
      color: var(--text-primary-color, white);
      font-weight: 600;
      line-height: 1;
      font-size: var(--rejseplanen-pill-font-size, 2em);
      cursor: pointer;
    }
    .pill-text { white-space: nowrap; }
    .pill-text.medium { font-size: 0.75em; }
    .pill-text.long { font-size: 0.55em; white-space: normal; line-height: 1.05; text-align: center; }
    .pill-text.xlong { font-size: 0.55em; }
    .station { font-size: 0.85em; color: var(--secondary-text-color); margin-bottom: 2px; }
    .dest { font-weight: 600; font-size: 1.1em; }
    .meta { color: var(--secondary-text-color); font-size: 0.86em; display: flex; flex-wrap: wrap; gap: 0 8px; }
    .meta span { white-space: nowrap; }
    .pill-icon {
      --mdc-icon-size: var(--rejseplanen-pill-icon-size, 1.25em);
      width: var(--rejseplanen-pill-icon-size, 1.25em);
      height: var(--rejseplanen-pill-icon-size, 1.25em);
      flex: none;
      color: currentColor;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transform: translateY(var(--rejseplanen-pill-icon-nudge));
    }
    .right { text-align: right; }
    .time { font-weight: 600; font-size: 1.1em; }
    /* Countdown and status share a line in wide cards and stack in narrow ones */
    .in-status { color: var(--secondary-text-color); font-size: 0.9em; display: flex; justify-content: flex-end; align-items: baseline; gap: 8px; white-space: nowrap; }
    @container (max-width: 420px) {
      .in-status { flex-direction: column; align-items: flex-end; gap: 0; }
    }
    .status { font-size: 0.9em; }
    .status.ok { color: var(--ok); }
    .status.scheduled { color: var(--secondary-text-color); }
    .status.delay { color: var(--delay); }
    .status.cancel { color: var(--cancel); font-weight: 700; }
    /* Cancelled: strike out the whole departure so it cannot be mistaken for a running service */
    .row.cancelled .line, .row.cancelled .main, .row.cancelled .time, .row.cancelled .in { opacity: 0.55; }
    .row.cancelled .dest, .row.cancelled .time-text, .row.cancelled .in { text-decoration: line-through; }
    .footer {
      display: flex;
      justify-content: space-between;
      padding: 8px 16px 12px;
      color: var(--secondary-text-color);
      font-size: 0.8em;
    }
  `,G([Te()],$.prototype,`_config`,void 0),customElements.get(Q)||(customElements.define(Q,$),window.customCards=window.customCards||[],window.customCards.push({type:Q,name:`Rejseplanen Timetable`,description:`Shows upcoming departures from Rejseplanen (Danish public transport)`,preview:!0}));
//# sourceMappingURL=rejseplanen-timetable-card.js.map