var Ie=i=>{throw TypeError(i)};var me=(i,e,t)=>e.has(i)||Ie("Cannot "+t);var n=(i,e,t)=>(me(i,e,"read from private field"),t?t.call(i):e.get(i)),c=(i,e,t)=>e.has(i)?Ie("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(i):e.set(i,t),l=(i,e,t,o)=>(me(i,e,"write to private field"),o?o.call(i,t):e.set(i,t),t),m=(i,e,t)=>(me(i,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function t(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(r){if(r.ep)return;r.ep=!0;const a=t(r);fetch(r.href,a)}})();function Z(i){const e={weekday:"long",year:"numeric",month:"long",day:"numeric"};return new Date(i).toLocaleDateString("en-US",e)}async function Ge(i,e="fade"){if(document.startViewTransition)try{document.documentElement.dataset.transitionType=e,await document.startViewTransition(()=>{i()}).finished,delete document.documentElement.dataset.transitionType}catch(t){console.error("Error during view transition:",t),i()}else i()}function Ve(i,e,t=500){i&&(i.classList.add(e),setTimeout(()=>{i.classList.remove(e)},t))}const Ae="dicoding_story_auth";function Ye(i){localStorage.setItem(Ae,JSON.stringify(i))}function q(){const i=localStorage.getItem(Ae);return i?JSON.parse(i):null}function $(){const i=q();return!!i&&!!i.loginResult&&!!i.loginResult.token}function K(){const i=q();return i&&i.loginResult?i.loginResult.token:null}const D={BASE_URL:"https://story-api.dicoding.dev/v1",MAP_SERVICE_API_KEY:"nbSpzK6cBXdYsIj1WF1z",VAPID_PUBLIC_KEY:"BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk"},R={REGISTER:`${D.BASE_URL}/register`,LOGIN:`${D.BASE_URL}/login`,STORIES:`${D.BASE_URL}/stories`,GUEST_STORIES:`${D.BASE_URL}/stories/guest`,STORY_DETAIL:i=>`${D.BASE_URL}/stories/${i}`,SUBSCRIBE:`${D.BASE_URL}/notifications/subscribe`,UNSUBSCRIBE:`${D.BASE_URL}/notifications/subscribe`};async function ze({name:i,email:e,password:t}){return await(await fetch(R.REGISTER,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:i,email:e,password:t})})).json()}async function Je({email:i,password:e}){return await(await fetch(R.LOGIN,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:i,password:e})})).json()}async function Ze({page:i,size:e,location:t,token:o}){const r=new URLSearchParams;i&&r.append("page",i),e&&r.append("size",e),t!==void 0&&r.append("location",t?1:0);const a=`${R.STORIES}?${r.toString()}`;return await(await fetch(a,{headers:{Authorization:`Bearer ${o}`}})).json()}async function Ke({id:i,token:e}){return await(await fetch(R.STORY_DETAIL(i),{headers:{Authorization:`Bearer ${e}`}})).json()}async function Qe({description:i,photo:e,lat:t,lon:o,token:r}){const a=new FormData;return a.append("description",i),a.append("photo",e),t!==void 0&&a.append("lat",t),o!==void 0&&a.append("lon",o),await(await fetch(R.STORIES,{method:"POST",headers:{Authorization:`Bearer ${r}`},body:a})).json()}async function Xe({description:i,photo:e,lat:t,lon:o}){const r=new FormData;return r.append("description",i),r.append("photo",e),t!==void 0&&r.append("lat",t),o!==void 0&&r.append("lon",o),await(await fetch(R.GUEST_STORIES,{method:"POST",body:r})).json()}async function Ce({endpoint:i,keys:e,token:t}){console.log("Calling subscribe API endpoint with:",{endpoint:i.substring(0,30)+"...",keysProvided:!!e,tokenProvided:!!t});const r=await(await fetch(R.SUBSCRIBE,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({endpoint:i,keys:e})})).json();return console.log("Subscribe API response:",r),r}async function Pe({endpoint:i,token:e}){console.log("Calling unsubscribe API endpoint with:",{endpoint:i.substring(0,30)+"...",tokenProvided:!!e});const o=await(await fetch(R.UNSUBSCRIBE,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({endpoint:i})})).json();return console.log("Unsubscribe API response:",o),o}const v=Object.freeze(Object.defineProperty({__proto__:null,addGuestStory:Xe,addStory:Qe,getStories:Ze,getStoryDetail:Ke,loginUser:Je,registerUser:ze,subscribeNotification:Ce,unsubscribeNotification:Pe},Symbol.toStringTag,{value:"Module"})),et=(i,e)=>e.some(t=>i instanceof t);let ke,Be;function tt(){return ke||(ke=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function it(){return Be||(Be=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Ne=new WeakMap,ve=new WeakMap,Me=new WeakMap,fe=new WeakMap,Le=new WeakMap;function ot(i){const e=new Promise((t,o)=>{const r=()=>{i.removeEventListener("success",a),i.removeEventListener("error",s)},a=()=>{t(x(i.result)),r()},s=()=>{o(i.error),r()};i.addEventListener("success",a),i.addEventListener("error",s)});return e.then(t=>{t instanceof IDBCursor&&Ne.set(t,i)}).catch(()=>{}),Le.set(e,i),e}function rt(i){if(ve.has(i))return;const e=new Promise((t,o)=>{const r=()=>{i.removeEventListener("complete",a),i.removeEventListener("error",s),i.removeEventListener("abort",s)},a=()=>{t(),r()},s=()=>{o(i.error||new DOMException("AbortError","AbortError")),r()};i.addEventListener("complete",a),i.addEventListener("error",s),i.addEventListener("abort",s)});ve.set(i,e)}let we={get(i,e,t){if(i instanceof IDBTransaction){if(e==="done")return ve.get(i);if(e==="objectStoreNames")return i.objectStoreNames||Me.get(i);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return x(i[e])},set(i,e,t){return i[e]=t,!0},has(i,e){return i instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in i}};function nt(i){we=i(we)}function at(i){return i===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const o=i.call(ge(this),e,...t);return Me.set(o,e.sort?e.sort():[e]),x(o)}:it().includes(i)?function(...e){return i.apply(ge(this),e),x(Ne.get(this))}:function(...e){return x(i.apply(ge(this),e))}}function st(i){return typeof i=="function"?at(i):(i instanceof IDBTransaction&&rt(i),et(i,tt())?new Proxy(i,we):i)}function x(i){if(i instanceof IDBRequest)return ot(i);if(fe.has(i))return fe.get(i);const e=st(i);return e!==i&&(fe.set(i,e),Le.set(e,i)),e}const ge=i=>Le.get(i);function ct(i,e,{blocked:t,upgrade:o,blocking:r,terminated:a}={}){const s=indexedDB.open(i,e),h=x(s);return o&&s.addEventListener("upgradeneeded",d=>{o(x(s.result),d.oldVersion,d.newVersion,x(s.transaction),d)}),t&&s.addEventListener("blocked",d=>t(d.oldVersion,d.newVersion,d)),h.then(d=>{a&&d.addEventListener("close",()=>a()),r&&d.addEventListener("versionchange",u=>r(u.oldVersion,u.newVersion,u))}).catch(()=>{}),h}const lt=["get","getKey","getAll","getAllKeys","count"],dt=["put","add","delete","clear"],ye=new Map;function De(i,e){if(!(i instanceof IDBDatabase&&!(e in i)&&typeof e=="string"))return;if(ye.get(e))return ye.get(e);const t=e.replace(/FromIndex$/,""),o=e!==t,r=dt.includes(t);if(!(t in(o?IDBIndex:IDBObjectStore).prototype)||!(r||lt.includes(t)))return;const a=async function(s,...h){const d=this.transaction(s,r?"readwrite":"readonly");let u=d.store;return o&&(u=u.index(h.shift())),(await Promise.all([u[t](...h),r&&d.done]))[0]};return ye.set(e,a),a}nt(i=>({...i,get:(e,t,o)=>De(e,t)||i.get(e,t,o),has:(e,t)=>!!De(e,t)||i.has(e,t)}));const ut="story-app-db",pt=1,_="stories",J=ct(ut,pt,{upgrade(i){i.createObjectStore(_,{keyPath:"id"})}}),S={async getStories(){return(await J).getAll(_)},async getStory(i){return(await J).get(_,i)},async putStory(i){return(await J).put(_,i)},async deleteStory(i){return(await J).delete(_,i)},async saveStories(i){const t=(await J).transaction(_,"readwrite"),o=t.objectStore(_);for(const r of i)await o.put(r);return t.complete}},W={_callbacks:{online:[],offline:[],statusChange:[]},_isOnline:window.navigator.onLine,init(){window.addEventListener("online",this._handleOnline.bind(this)),window.addEventListener("offline",this._handleOffline.bind(this))},_handleOnline(){this._isOnline=!0,this._notifyCallbacks("online"),this._notifyCallbacks("statusChange",!0)},_handleOffline(){this._isOnline=!1,this._notifyCallbacks("offline"),this._notifyCallbacks("statusChange",!1)},_notifyCallbacks(i,e){this._callbacks[i].forEach(t=>{t(e)})},addOnlineCallback(i){this._callbacks.online.push(i)},addOfflineCallback(i){this._callbacks.offline.push(i)},addStatusChangeCallback(i){this._callbacks.statusChange.push(i)},isOnline(){return this._isOnline}};var w,Q;class ht{constructor({view:e,model:t=v}){c(this,w);c(this,Q);l(this,w,e),l(this,Q,t)}async loadStories(){try{const e=K();if(!e){n(this,w).showLoginRequired();return}const t=await S.getStories();if(!W.isOnline()&&t.length>0){console.log("Loading stories from IndexedDB while offline"),n(this,w).displayStories(t);return}if(W.isOnline()){const o=await n(this,Q).getStories({token:e});if(o.error)throw new Error(o.message);if(!o.listStory||o.listStory.length===0){n(this,w).showEmptyStories();return}await S.saveStories(o.listStory),n(this,w).displayStories(o.listStory)}else t.length===0&&n(this,w).showError("You are offline and have no cached stories. Please connect to the internet.")}catch(e){console.error("loadStories: error:",e);try{const t=await S.getStories();if(t.length>0){console.log("Error loading from API, falling back to IndexedDB"),n(this,w).displayStories(t);return}}catch(t){console.error("Error accessing IndexedDB:",t)}n(this,w).showError(e.message)}}}w=new WeakMap,Q=new WeakMap;var X;class mt{constructor(){c(this,X,null)}async render(){return`
      <div class="home-hero" role="banner">
        <div class="home-hero-overlay" aria-hidden="true"></div>
        <div class="container">
          <div class="home-hero-content">
            <h1>Share Your Stories</h1>
            <p>Capture and share moments with the Dicoding community</p>
            <a href="#/add" class="btn home-hero-btn" aria-label="Create a new story">Create Story</a>
          </div>
        </div>
      </div>
      
      <section class="container home-content" aria-labelledby="recent-stories-heading">
        <div class="home-section-header">
          <h2 id="recent-stories-heading">Recent Stories</h2>
          <a href="#/map" class="btn-outline" aria-label="View stories on map">View Map</a>
        </div>
        
        <div id="stories-container" role="region" aria-live="polite">
          <div class="loader-container" role="status">
            <div class="loader"></div>
            <span class="sr-only">Loading stories...</span>
          </div>
        </div>
      </section>
    `}async afterRender(){this.addAccessibilityStyles(),l(this,X,new ht({view:this,model:v})),await n(this,X).loadStories()}showLoginRequired(){const e=document.getElementById("stories-container");e.innerHTML=`
      <div class="alert alert-error" role="alert">
        <p>You need to login to view stories. <a href="#/login">Login here</a> or <a href="#/register">Register</a></p>
      </div>
    `}showEmptyStories(){const e=document.getElementById("stories-container");e.innerHTML=`
      <div class="alert" role="alert">
        <p>No stories found. Be the first to <a href="#/add">create a story!</a></p>
      </div>
    `}showError(e){const t=document.getElementById("stories-container");t.innerHTML=`
      <div class="alert alert-error" role="alert">
        <p>${e||"Failed to load stories. Please try again later."}</p>
      </div>
    `}addAccessibilityStyles(){if(!document.getElementById("sr-only-styles")){const e=document.createElement("style");e.id="sr-only-styles",e.innerHTML=`
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
      `,document.head.appendChild(e)}}displayStories(e){const t=document.getElementById("stories-container"),o=e.map(r=>`
      <article class="story-card" style="view-transition-name: story-${r.id}" aria-labelledby="story-title-${r.id}">
        <figure class="story-image-container">
          <img 
            src="${r.photoUrl}" 
            alt="Story image by ${r.name}" 
            class="story-image"
          />
        </figure>
        <div class="story-content">
          <h3 class="story-title" id="story-title-${r.id}">${r.name}</h3>
          <p class="story-description">${this.truncateText(r.description,100)}</p>
          <div class="story-meta">
            <time class="story-date" datetime="${new Date(r.createdAt).toISOString()}">
              <span class="story-date-icon" aria-hidden="true">📅</span> ${Z(r.createdAt)}
            </time>
            <a href="#/detail/${r.id}" class="btn btn-outline" aria-label="Read more about ${r.name}'s story">Read More</a>
          </div>
        </div>
      </article>
    `).join("");t.innerHTML=`
      <div class="story-list">
        ${o}
      </div>
    `}truncateText(e,t){return e.length<=t?e:e.substring(0,t)+"..."}}X=new WeakMap;class ft{async render(){return`
      <section class="container about-page">
        <div class="about-hero">
          <div class="about-overlay"></div>
          <div class="about-hero-content">
            <h1>About Dicoding Story</h1>
            <p class="about-tagline">Share your moments with the Dicoding community</p>
          </div>
        </div>
        
        <div class="about-container">
          <div class="about-section">
            <div class="about-intro">
              <i class="about-icon">📖</i>
              <div>
                <h2>Our Story</h2>
                <p>Dicoding Story is a platform for sharing stories and experiences within the Dicoding community. Users can create and view stories with images and location data, connecting developers across Indonesia through shared moments and experiences.</p>
              </div>
            </div>
          </div>

          <div class="about-section features-section">
            <h2><i class="about-icon">✨</i> Features</h2>
            <div class="features-grid">
              <div class="feature-card">
                <div class="feature-icon">📱</div>
                <h3>Browse Stories</h3>
                <p>View stories from Dicoding users with a beautiful, responsive interface</p>
              </div>
              <div class="feature-card">
                <div class="feature-icon">📷</div>
                <h3>Camera Integration</h3>
                <p>Create stories with photos taken directly from your device camera</p>
              </div>
              <div class="feature-card">
                <div class="feature-icon">🗺️</div>
                <h3>Location Sharing</h3>
                <p>Add location data to your stories and view them on an interactive map</p>
              </div>
              <div class="feature-card">
                <div class="feature-icon">👤</div>
                <h3>User Accounts</h3>
                <p>Create an account to start sharing your stories with the community</p>
              </div>
            </div>
          </div>
          
          <div class="about-section tech-section">
            <h2><i class="about-icon">🔧</i> Technologies Used</h2>
            <div class="tech-grid">
              <div class="tech-item">
                <span class="tech-badge">SPA</span>
                <p>Single Page Application architecture</p>
              </div>
              <div class="tech-item">
                <span class="tech-badge">MVP</span>
                <p>Model-View-Presenter design pattern</p>
              </div>
              <div class="tech-item">
                <span class="tech-badge">View Transitions</span>
                <p>Smooth page transitions</p>
              </div>
              <div class="tech-item">
                <span class="tech-badge">Leaflet.js</span>
                <p>Interactive maps</p>
              </div>
              <div class="tech-item">
                <span class="tech-badge">MediaDevices API</span>
                <p>Camera functionality</p>
              </div>
              <div class="tech-item">
                <span class="tech-badge">Accessibility</span>
                <p>Skip-to-content and semantic HTML</p>
              </div>
            </div>
          </div>
          
          <div class="about-section api-section">
            <h2><i class="about-icon">🔌</i> API Information</h2>
            <div class="api-box">
              <p>This application uses the Dicoding Story API to manage users and stories.</p>
              <div class="api-url">
                <span>API Base URL:</span>
                <code>https://story-api.dicoding.dev/v1</code>
              </div>
            </div>
          </div>
          
          <div class="about-section developer-section">
            <h2><i class="about-icon">👨‍💻</i> Developer Information</h2>
            <div class="developer-info">
              <p>This application was created as part of the Dicoding course requirements for web development.</p>
              <p>© ${new Date().getFullYear()} Dicoding Story App</p>
              <div class="developer-links">
                <a href="https://www.dicoding.com" target="_blank" class="btn btn-outline">Visit Dicoding</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    `}async afterRender(){}}var P,ee;class gt{constructor({view:e,model:t=v}){c(this,P);c(this,ee);l(this,P,e),l(this,ee,t)}async login(e,t){try{n(this,P).setLoading(!0);const o=await n(this,ee).loginUser({email:e,password:t});if(o.error)throw new Error(o.message);return Ye(o),window.dispatchEvent(new CustomEvent("auth-changed")),n(this,P).showSuccess("Login successful. Redirecting to homepage..."),setTimeout(()=>{window.location.hash="#/"},1500),!0}catch(o){return console.error("login: error:",o),n(this,P).showError(o.message||"Failed to login. Please try again."),!1}finally{n(this,P).setLoading(!1)}}}P=new WeakMap,ee=new WeakMap;var te;class yt{constructor(){c(this,te,null)}async render(){return`
      <section class="container">
        <div class="auth-container">
          <h2 class="form-title">Login to Dicoding Story</h2>
          
          <div id="alert-container"></div>
          
          <form id="login-form">
            <div class="form-group">
              <label for="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                class="form-control" 
                required 
                autocomplete="email"
                placeholder="Enter your email"
              />
            </div>
            
            <div class="form-group">
              <label for="password">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                class="form-control" 
                required 
                autocomplete="current-password"
                placeholder="Enter your password"
                minlength="8"
              />
            </div>
            
            <button type="submit" class="btn btn-full" id="login-button">
              Login
            </button>
          </form>
          
          <div class="form-footer">
            <p>Don't have an account? <a href="#/register">Register</a></p>
          </div>
        </div>
      </section>
    `}async afterRender(){l(this,te,new gt({view:this,model:v})),this.attachFormListener()}attachFormListener(){document.getElementById("login-form").addEventListener("submit",async t=>{t.preventDefault();const o=document.getElementById("email").value,r=document.getElementById("password").value;await n(this,te).login(o,r)})}setLoading(e){const t=document.getElementById("login-button");e?(t.disabled=!0,t.textContent="Logging in..."):(t.disabled=!1,t.textContent="Login")}showSuccess(e){const t=document.getElementById("alert-container");t.innerHTML=`
      <div class="alert alert-success">
        <p>${e}</p>
      </div>
    `}showError(e){const t=document.getElementById("alert-container");t.innerHTML=`
      <div class="alert alert-error">
        <p>${e}</p>
      </div>
    `}}te=new WeakMap;var N,ie;class bt{constructor({view:e,model:t=v}){c(this,N);c(this,ie);l(this,N,e),l(this,ie,t)}async register(e,t,o){try{n(this,N).setLoading(!0);const r=await n(this,ie).registerUser({name:e,email:t,password:o});if(r.error)throw new Error(r.message);return n(this,N).showSuccess("Registration successful. Please login with your new account."),setTimeout(()=>{window.location.hash="#/login"},2e3),!0}catch(r){return console.error("register: error:",r),n(this,N).showError(r.message||"Failed to register. Please try again."),!1}finally{n(this,N).setLoading(!1)}}}N=new WeakMap,ie=new WeakMap;var oe;class vt{constructor(){c(this,oe,null)}async render(){return`
      <section class="container">
        <div class="auth-container">
          <h2 class="form-title">Register for Dicoding Story</h2>
          
          <div id="alert-container"></div>
          
          <form id="register-form">
            <div class="form-group">
              <label for="name">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                class="form-control" 
                required 
                autocomplete="name"
                placeholder="Enter your name"
              />
            </div>
            
            <div class="form-group">
              <label for="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                class="form-control" 
                required 
                autocomplete="email"
                placeholder="Enter your email"
              />
            </div>
            
            <div class="form-group">
              <label for="password">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                class="form-control" 
                required 
                autocomplete="new-password"
                placeholder="Enter your password (min 8 characters)"
                minlength="8"
              />
            </div>
            
            <button type="submit" class="btn btn-full" id="register-button">
              Register
            </button>
          </form>
          
          <div class="form-footer">
            <p>Already have an account? <a href="#/login">Login</a></p>
          </div>
        </div>
      </section>
    `}async afterRender(){l(this,oe,new bt({view:this,model:v})),this.attachFormListener()}attachFormListener(){document.getElementById("register-form").addEventListener("submit",async t=>{t.preventDefault();const o=document.getElementById("name").value,r=document.getElementById("email").value,a=document.getElementById("password").value;await n(this,oe).register(o,r,a)})}setLoading(e){const t=document.getElementById("register-button");e?(t.disabled=!0,t.textContent="Registering..."):(t.disabled=!1,t.textContent="Register")}showSuccess(e){const t=document.getElementById("alert-container");t.innerHTML=`
      <div class="alert alert-success">
        <p>${e}</p>
      </div>
    `}showError(e){const t=document.getElementById("alert-container");t.innerHTML=`
      <div class="alert alert-error">
        <p>${e}</p>
      </div>
    `}}oe=new WeakMap;var f,re;class wt{constructor({view:e,model:t=v}){c(this,f);c(this,re);l(this,f,e),l(this,re,t)}async loadStoryDetail(e){if(!e){n(this,f).showMissingIdError();return}const t=K();if(!t){n(this,f).showLoginRequired();return}try{const o=await S.getStory(e);if(!W.isOnline()&&o){console.log("Loading story detail from IndexedDB while offline"),n(this,f).displayStoryDetail(o),o.lat&&o.lon&&n(this,f).initMap(o);return}if(W.isOnline()){const r=await n(this,re).getStoryDetail({id:e,token:t});if(r.error)throw new Error(r.message);await S.putStory(r.story),n(this,f).displayStoryDetail(r.story),r.story.lat&&r.story.lon&&n(this,f).initMap(r.story)}else o||n(this,f).showError("You are offline and this story is not available offline.")}catch(o){console.error("loadStoryDetail: error:",o);try{const r=await S.getStory(e);if(r){console.log("Error loading from API, falling back to IndexedDB"),n(this,f).displayStoryDetail(r),r.lat&&r.lon&&n(this,f).initMap(r);return}}catch(r){console.error("Error accessing IndexedDB:",r)}n(this,f).showError(o.message)}}}f=new WeakMap,re=new WeakMap;var ne;class St{constructor(){c(this,ne,null)}async render(){return`
      <section class="container" aria-labelledby="story-title">
        <div id="story-detail-container">
          <div class="loader-container" role="status" aria-live="polite">
            <div class="loader"></div>
            <span class="sr-only">Loading story details...</span>
          </div>
        </div>
      </section>
    `}async afterRender(e){l(this,ne,new wt({view:this,model:v})),await n(this,ne).loadStoryDetail(e==null?void 0:e.id)}showMissingIdError(){const e=document.getElementById("story-detail-container");e.innerHTML=`
      <div class="alert alert-error" role="alert">
        <p>Story ID is missing. <a href="#/">Go back to home</a></p>
      </div>
    `}showLoginRequired(){const e=document.getElementById("story-detail-container");e.innerHTML=`
      <div class="alert alert-error" role="alert">
        <p>You need to login to view story details. <a href="#/login">Login here</a> or <a href="#/register">Register</a></p>
      </div>
    `}showError(e){const t=document.getElementById("story-detail-container");t.innerHTML=`
      <div class="alert alert-error" role="alert">
        <p>${e||"Failed to load story details. Please try again later."}</p>
      </div>
    `}displayStoryDetail(e){const t=document.getElementById("story-detail-container");t.innerHTML=`
      <div class="detail-container" style="view-transition-name: story-${e.id}">
        <a href="#/" class="btn btn-outline" aria-label="Back to story list">← Back to Stories</a>
        
        <article class="detail-content">
          <h1 class="detail-title" id="story-title">Story by ${e.name}</h1>
          
          <div class="detail-meta">
            <time datetime="${new Date(e.createdAt).toISOString()}">${Z(e.createdAt)}</time>
          </div>
          
          <figure>
            <img 
              src="${e.photoUrl}" 
              alt="Photo shared by ${e.name} on ${Z(e.createdAt)}" 
              class="detail-image"
            />
            <figcaption class="sr-only">Story photo shared by ${e.name}</figcaption>
          </figure>
          
          <div class="detail-description">
            <p>${e.description}</p>
          </div>
          
          ${e.lat&&e.lon?`
            <div class="map-container" id="map-container">
              <h3 id="map-heading">Story Location</h3>
              <div id="map" role="img" aria-labelledby="map-heading" aria-describedby="map-description"></div>
              <p id="map-description" class="sr-only">Map showing the location where this story was created at coordinates ${e.lat}, ${e.lon}</p>
              <p class="map-tip"><small>Tip: Use the layer control in the top-right corner to switch between different map styles.</small></p>
            </div>
          `:""}
        </article>
      </div>
    `,this.addAccessibilityStyles()}addAccessibilityStyles(){if(!document.getElementById("sr-only-styles")){const e=document.createElement("style");e.id="sr-only-styles",e.innerHTML=`
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
      `,document.head.appendChild(e)}}async initMap(e){const t=document.createElement("script");t.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",t.integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=",t.crossOrigin="",document.head.appendChild(t),t.onload=()=>{const o=L.map("map").setView([e.lat,e.lon],13),r={OpenStreetMap:L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}),"Stamen Watercolor":L.tileLayer("https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg",{attribution:'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>. Tiles hosted by <a href="https://stadiamaps.com/">Stadia Maps</a>',maxZoom:16}),"Stamen Terrain":L.tileLayer("https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png",{attribution:'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>. Tiles hosted by <a href="https://stadiamaps.com/">Stadia Maps</a>',maxZoom:18}),"ESRI World Imagery":L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{attribution:"Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",maxZoom:18})};r.OpenStreetMap.addTo(o);const a=L.divIcon({className:"custom-map-marker",html:'<div class="marker-pin" style="background-color: var(--primary-color); position: relative; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 10px rgba(0,0,0,0.3);"><i class="fas fa-camera" style="color: white;"></i></div>',iconSize:[30,30],iconAnchor:[15,30],popupAnchor:[0,-30]});L.marker([e.lat,e.lon],{icon:a}).addTo(o).bindPopup(`<b>Story by ${e.name}</b><br>${e.description.substring(0,50)}...`).openPopup(),L.control.layers(r,null,{collapsed:!1,position:"topright"}).addTo(o),L.control.scale().addTo(o),setTimeout(()=>{o.invalidateSize()},100)}}}ne=new WeakMap;const Te="dicoding_story_notification_subscription",B={isNotificationAvailable(){return"Notification"in window},isNotificationGranted(){return Notification.permission==="granted"},async requestPermission(i){return this.isNotificationAvailable()?await Notification.requestPermission()!=="granted"?(console.log("Notification permission denied"),alert("Notification permission denied"),!1):await this._registerServiceWorker()&&await this._subscribeUserToPush(i)?(this._saveSubscriptionState(!0),!0):!1:(console.log("Browser does not support notifications"),alert("Browser does not support notifications"),!1)},async _registerServiceWorker(){var i,e;if(!("serviceWorker"in navigator))return console.log("Service Worker not supported"),!1;try{if(console.log("Waiting for service worker to be ready..."),navigator.serviceWorker.controller)return console.log("Service worker already active:",navigator.serviceWorker.controller.scriptURL),!0;const t=await Promise.race([navigator.serviceWorker.ready,new Promise((o,r)=>setTimeout(()=>r(new Error("Service worker ready timeout")),1e4))]);return console.log("Service worker ready with scope:",t.scope),console.log("Service worker state:",(i=t.active)==null?void 0:i.state),((e=t.active)==null?void 0:e.state)!=="activated"&&(console.log("Waiting for service worker to activate..."),await new Promise(o=>{const r=()=>{var a;((a=t.active)==null?void 0:a.state)==="activated"?o():setTimeout(r,100)};r()})),console.log("Service worker is now active and ready"),!0}catch(t){return console.error("Service worker not ready",t),!1}},async _subscribeUserToPush(i){if(!("PushManager"in window))return console.log("Push notifications not supported"),!1;try{const e=await navigator.serviceWorker.ready,t=await e.pushManager.getSubscription();t&&(console.log("Unsubscribing from existing push subscription"),await t.unsubscribe()),console.log("Creating new push subscription with VAPID key"),console.log("VAPID key:",D.VAPID_PUBLIC_KEY);const o=this._urlB64ToUint8Array(D.VAPID_PUBLIC_KEY),r=await e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:o}),a=r.toJSON();return console.log("New push subscription created:",a),await this._sendSubscriptionToServer(r,i)?!0:(console.error("Failed to send subscription to server, unsubscribing"),await r.unsubscribe(),!1)}catch(e){return console.error("Failed to subscribe for push notifications:",e),!1}},async _sendSubscriptionToServer(i,e){const t=i.toJSON();try{console.log("Sending subscription to server with token:",e?"Valid token":"No token"),console.log("Subscription details:",{endpoint:t.endpoint,keys:t.keys});const o=await Ce({endpoint:t.endpoint,keys:t.keys,token:e});return console.log("Server response:",o),o.error?(console.error("Subscription to server failed:",o),!1):(console.log("Push notification subscription successful",o),!0)}catch(o){return console.error("Failed to send subscription to server",o),!1}},async getPushSubscription(){if(!("serviceWorker"in navigator))return null;try{const i=await navigator.serviceWorker.getRegistration();return i?await i.pushManager.getSubscription():null}catch(i){return console.error("Error getting push subscription:",i),null}},async isCurrentPushSubscriptionAvailable(){return!!await this.getPushSubscription()},async unsubscribeFromPush(i){try{const e=await this.getPushSubscription();if(!e)return this._saveSubscriptionState(!1),!0;const t=e.toJSON();console.log("Unsubscribing from push with endpoint:",t.endpoint);const o=await Pe({endpoint:t.endpoint,token:i});return await e.unsubscribe()?(console.log("Push notification unsubscribed",o),this._saveSubscriptionState(!1),!0):(console.error("Failed to unsubscribe from push manager"),!1)}catch(e){return console.error("Failed to unsubscribe from push notifications",e),!1}},async showDemoNotification(){if(!this.isNotificationAvailable()){alert("Notifications are not supported in this browser");return}try{if(!this.isNotificationGranted()&&await Notification.requestPermission()!=="granted"){alert("You need to allow notification permission first");return}if("serviceWorker"in navigator){(await navigator.serviceWorker.getRegistrations()).length===0&&(console.log("No service worker registered, registering now"),await this._registerServiceWorker());try{const t=await navigator.serviceWorker.ready,o={body:"This is a test notification from Dicoding Story App",icon:"/icons/icon-192x192.png",badge:"/icons/badge-72x72.png",vibrate:[100,50,100],data:{url:window.location.href,timestamp:new Date().getTime()}};await t.showNotification("Demo Notification",o),console.log("Notification shown via Service Worker");return}catch(t){console.error("Service Worker notification failed:",t)}}const i=new Notification("Demo Notification",{body:"This is a test notification from Dicoding Story App",icon:"/icons/icon-192x192.png"});i.onclick=function(){console.log("Notification clicked"),window.focus(),this.close()},console.log("Notification shown via Notification API")}catch(i){console.error("Error showing demo notification:",i),alert("Failed to show notification: "+i.message)}},_saveSubscriptionState(i){localStorage.setItem(Te,JSON.stringify({isSubscribed:i,timestamp:new Date().getTime()}))},isSubscribed(){const i=localStorage.getItem(Te);if(!i)return!1;try{const{isSubscribed:e}=JSON.parse(i);return e}catch{return!1}},_urlB64ToUint8Array(i){const e="=".repeat((4-i.length%4)%4),t=(i+e).replace(/-/g,"+").replace(/_/g,"/"),o=window.atob(t),r=new Uint8Array(o.length);for(let a=0;a<o.length;++a)r[a]=o.charCodeAt(a);return r}},ue="DICODING_STORY_EVENT",Oe={init(){this._setupEventListeners(),console.log("Story Notification Service initialized")},_setupEventListeners(){window.addEventListener("story-created",this._handleStoryCreated.bind(this)),console.log("Story creation event listener registered")},async _handleStoryCreated(i){var e;try{console.log("Story creation event received:",i.detail);const{story:t,byCurrentUser:o}=i.detail||{};if(!t){console.warn("No story data in the event");return}if(o){console.log("Story created by current user, skipping notification");return}if(!B.isNotificationAvailable()||!B.isNotificationGranted()){console.warn("Notifications not available or permission not granted");return}if("serviceWorker"in navigator)try{const r=await navigator.serviceWorker.ready;if(!r){console.error("No service worker registration available");return}const a=((e=t.description)==null?void 0:e.length)>30?t.description.substring(0,30)+"...":t.description||"",s="New Story Available",h=`${t.name||"Someone"} shared: "${a}"`;console.log("Preparing to show notification:",{title:s,body:h,story:t.id}),await r.showNotification(s,{body:h,icon:t.photoUrl||"/icons/icon-192x192.png",badge:"/icons/badge-72x72.png",vibrate:[100,50,100],image:t.photoUrl,data:{url:`#/detail/${t.id}`,storyId:t.id,createdAt:t.createdAt||new Date().toISOString()}}),console.log("Story notification displayed for story:",t.id)}catch(r){console.error("Service worker notification error:",r)}else console.warn("ServiceWorker not available for notifications")}catch(t){console.error("Error handling story notification:",t)}},broadcastNewStory(i,e=!0){var o;if(!i){console.warn("Cannot broadcast notification: No story data provided");return}console.log("Broadcasting story notification:",{storyId:i.id,byCurrentUser:e,description:((o=i.description)==null?void 0:o.substring(0,30))+"..."||"No description"}),this._saveRecentStory(i);const t={story:i,byCurrentUser:e};window.dispatchEvent(new CustomEvent("story-created",{detail:t})),console.log("Story notification event dispatched for story:",i.id),!e&&$()&&this._triggerServerPushNotification(i.id)},async _triggerServerPushNotification(i){try{if(!$()){console.log("User not authenticated, skipping server push notification");return}console.log("Would trigger server push notification for story:",i)}catch(e){console.error("Error triggering server push notification:",e)}},_saveRecentStory(i){if(i)try{const e=JSON.parse(localStorage.getItem(ue)||"[]");e.unshift({id:i.id,name:i.name,description:i.description,photoUrl:i.photoUrl,createdAt:i.createdAt||new Date().toISOString(),seen:!1});const t=e.slice(0,10);localStorage.setItem(ue,JSON.stringify(t)),console.log("Story saved to recent stories:",i.id)}catch(e){console.error("Error saving recent story:",e)}},getRecentStories(){try{return JSON.parse(localStorage.getItem(ue)||"[]")}catch(i){return console.error("Error getting recent stories:",i),[]}},markStorySeen(i){if(i)try{const t=this.getRecentStories().map(o=>o.id===i?{...o,seen:!0}:o);localStorage.setItem(ue,JSON.stringify(t)),console.log("Story marked as seen:",i)}catch(e){console.error("Error marking story as seen:",e)}},canReceiveNotifications(){return B.isNotificationAvailable()&&B.isNotificationGranted()&&B.isSubscribed()}};var b,ae,he,xe;class Et{constructor({view:e,model:t=v}){c(this,he);c(this,b);c(this,ae);l(this,b,e),l(this,ae,t)}checkAuth(){return K()?!0:(n(this,b).showLoginRequired(),!1)}async createStory(e,t,o){const r=K();if(!r)return n(this,b).showLoginRequired(),!1;try{n(this,b).setLoading(!0);const a=await n(this,ae).addStory({description:e,photo:t,lat:o==null?void 0:o.lat,lon:o==null?void 0:o.lon,token:r});if(a.error)throw new Error(a.message);return n(this,b).showSuccess("Story created successfully! Redirecting to home..."),a.story&&(Oe.broadcastNewStory(a.story,!0),m(this,he,xe).call(this,e)),setTimeout(()=>{window.location.hash="#/"},2e3),!0}catch(a){return console.error("createStory: error:",a),n(this,b).showError(a.message||"Failed to create story. Please try again."),!1}finally{n(this,b).setLoading(!1)}}validateFormData(e,t){return t?e.trim()?!0:(n(this,b).showError("Please enter a story description."),!1):(n(this,b).showError("Please capture a photo or upload an image."),!1)}}b=new WeakMap,ae=new WeakMap,he=new WeakSet,xe=async function(e){try{if("serviceWorker"in navigator&&"Notification"in window&&Notification.permission==="granted"){const t=await navigator.serviceWorker.ready,o=e.length>30?e.substring(0,30)+"...":e;t.showNotification("Story Published!",{body:`Your story has been published successfully: "${o}"`,icon:"/icons/icon-192x192.png",badge:"/icons/badge-72x72.png",vibrate:[100,50,100],data:{url:"#/",createdAt:new Date().toISOString()}})}}catch(t){console.error("Failed to trigger story notification:",t)}};var U,E,T,G,M,se;class Lt{constructor(){c(this,U,null);c(this,E,null);c(this,T,null);c(this,G,null);c(this,M,null);c(this,se,null)}async render(){return`
      <section class="container" aria-labelledby="add-story-heading">
        <div class="form-container">
          <h2 class="form-title" id="add-story-heading">Add New Story</h2>
          
          <div id="alert-container" role="alert" aria-live="assertive"></div>
          
          <form id="add-story-form" aria-describedby="form-description">
            <p id="form-description" class="sr-only">Fill in the form below to create a new story with a photo and optional location data.</p>
            
            <!-- Photo Input Options -->
            <div class="photo-options">
              <div class="option-tabs" role="tablist">
                <button 
                  type="button" 
                  class="option-tab active" 
                  data-tab="camera"
                  id="camera-tab-btn" 
                  role="tab"
                  aria-selected="true" 
                  aria-controls="camera-tab">Camera</button>
                <button 
                  type="button" 
                  class="option-tab" 
                  data-tab="gallery"
                  id="gallery-tab-btn" 
                  role="tab" 
                  aria-selected="false" 
                  aria-controls="gallery-tab">Gallery</button>
              </div>
              
              <!-- Camera Section -->
              <div class="form-group tab-content" id="camera-tab" role="tabpanel" aria-labelledby="camera-tab-btn">
                <label for="camera-stream">Take a Photo</label>
                <div class="camera-container">
                  <div class="camera-preview-wrapper">
                    <div class="camera-preview" id="camera-preview">
                      <video id="camera-stream" autoplay playsinline aria-label="Camera preview"></video>
                      <canvas id="camera-canvas" style="display: none;" aria-hidden="true"></canvas>
                      <img id="captured-image" class="captured-image" style="display: none;" alt="Your captured photo for the story" aria-live="polite">
                    </div>
                  </div>
                  <div class="camera-controls">
                    <button type="button" id="btn-start-camera" class="camera-btn">Open Camera</button>
                    <button type="button" id="btn-capture" class="camera-btn" disabled>Take Photo</button>
                    <button type="button" id="btn-retake" class="camera-btn" style="display: none;">Retake</button>
                  </div>
                </div>
              </div>
              
              <!-- File Upload Section -->
              <div class="form-group tab-content" id="gallery-tab" style="display: none;" role="tabpanel" aria-labelledby="gallery-tab-btn">
                <label for="file-upload">Upload Photo</label>
                <div class="file-upload-container">
                  <input type="file" id="file-upload" accept="image/*" class="file-input" aria-describedby="file-upload-help">
                  <label for="file-upload" class="file-upload-label">
                    <span class="file-upload-icon" aria-hidden="true">📁</span>
                    <span class="file-upload-text">Choose a file or drag it here</span>
                  </label>
                  <p id="file-upload-help" class="sr-only">Accepted file types: JPG, PNG, GIF. Maximum file size: 5 MB.</p>
                  <div class="file-preview-container" style="display: none;">
                    <img id="file-preview" class="file-preview-image" alt="Your uploaded photo for the story">
                    <button type="button" id="btn-remove-file" class="camera-btn">Remove</button>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Location Section -->
            <div class="form-group">
              <label id="location-label">Location</label>
              <div class="location-actions">
                <button type="button" id="get-current-location" class="btn" aria-describedby="location-help">
                  <i class="fas fa-location-arrow" aria-hidden="true"></i> Use My Current Location
                </button>
                <p id="location-help" class="sr-only">Adds your current geographic coordinates to the story</p>
                <div id="location-status" role="status" aria-live="polite"></div>
              </div>
              <div class="map-container" id="location-map-container" aria-label="Interactive map to select location">
                <div id="map"></div>
              </div>
              <p id="selected-location-text" aria-live="polite">No location selected. Click on the map to select a location or use your current location.</p>
            </div>
            
            <!-- Description -->
            <div class="form-group">
              <label for="description">Story Description</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                class="form-control"
                required
                placeholder="Write your story here..."
                aria-required="true"
              ></textarea>
            </div>
            
            <button type="submit" class="btn btn-full" id="submit-button">
              Create Story
            </button>
          </form>
        </div>
      </section>
    `}async afterRender(){this.addAccessibilityStyles(),l(this,U,new Et({view:this,model:v})),n(this,U).checkAuth()&&(this.initCamera(),this.initFileUpload(),this.initTabSwitching(),this.initMap(),this.initLocationFeatures(),this.setupForm())}showLoginRequired(){const e=document.getElementById("alert-container");e.innerHTML=`
      <div class="alert alert-error">
        <p>You need to login to add stories. <a href="#/login">Login here</a> or <a href="#/register">Register</a></p>
      </div>
    `}showSuccess(e){const t=document.getElementById("alert-container");t.innerHTML=`
      <div class="alert alert-success">
        <p>${e}</p>
      </div>
    `}showError(e){const t=document.getElementById("alert-container");t.innerHTML=`
      <div class="alert alert-error">
        <p>${e}</p>
      </div>
    `}setLoading(e){const t=document.getElementById("submit-button");e?(t.disabled=!0,t.textContent="Submitting..."):(t.disabled=!1,t.textContent="Create Story")}addAccessibilityStyles(){if(!document.getElementById("sr-only-styles")){const e=document.createElement("style");e.id="sr-only-styles",e.innerHTML=`
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
      `,document.head.appendChild(e)}}initTabSwitching(){const e=document.querySelectorAll(".option-tab"),t=document.querySelectorAll(".tab-content");e.forEach(o=>{o.addEventListener("click",()=>{e.forEach(s=>{s.classList.remove("active"),s.setAttribute("aria-selected","false")}),o.classList.add("active"),o.setAttribute("aria-selected","true"),t.forEach(s=>{s.style.display="none",s.setAttribute("aria-hidden","true")});const r=o.getAttribute("data-tab"),a=document.getElementById(`${r}-tab`);a.style.display="block",a.setAttribute("aria-hidden","false"),r==="camera"&&(this.stopCameraStream(),document.getElementById("btn-start-camera").disabled=!1,document.getElementById("btn-capture").disabled=!0)})})}initCamera(){const e=document.getElementById("btn-start-camera"),t=document.getElementById("btn-capture"),o=document.getElementById("btn-retake"),r=document.getElementById("camera-stream"),a=document.getElementById("camera-canvas"),s=document.getElementById("captured-image");e.addEventListener("click",async()=>{try{l(this,M,await navigator.mediaDevices.getUserMedia({video:{facingMode:"environment",width:{ideal:1280},height:{ideal:720}},audio:!1})),r.srcObject=n(this,M),r.style.display="block",s.style.display="none",e.disabled=!0,t.disabled=!1,o.style.display="none"}catch(h){console.error("Error accessing camera:",h),this.showError("Failed to access camera. Please ensure you have granted camera permissions.")}}),t.addEventListener("click",()=>{const h=a.getContext("2d");a.width=r.videoWidth,a.height=r.videoHeight,h.drawImage(r,0,0,a.width,a.height);const d=a.toDataURL("image/jpeg");s.src=d,s.style.display="block",r.style.display="none",this.stopCameraStream(),t.disabled=!0,o.style.display="inline-block",e.disabled=!1}),o.addEventListener("click",()=>{s.src="",s.style.display="none",o.style.display="none",e.disabled=!1,t.disabled=!0})}initFileUpload(){const e=document.getElementById("file-upload"),t=document.getElementById("file-preview"),o=document.querySelector(".file-preview-container"),r=document.getElementById("btn-remove-file"),a=document.querySelector(".file-upload-label");e.addEventListener("change",d=>{const u=d.target.files[0];if(u&&u.type.startsWith("image/")){const g=new FileReader;g.onload=H=>{t.src=H.target.result,o.style.display="block",a.style.display="none"},g.readAsDataURL(u)}});const s=document.querySelector(".file-upload-container");["dragenter","dragover","dragleave","drop"].forEach(d=>{s.addEventListener(d,h,!1)});function h(d){d.preventDefault(),d.stopPropagation()}["dragenter","dragover"].forEach(d=>{s.addEventListener(d,()=>{s.classList.add("highlight")},!1)}),["dragleave","drop"].forEach(d=>{s.addEventListener(d,()=>{s.classList.remove("highlight")},!1)}),s.addEventListener("drop",d=>{const u=d.dataTransfer.files[0];if(u&&u.type.startsWith("image/")){e.files=d.dataTransfer.files;const g=new FileReader;g.onload=H=>{t.src=H.target.result,o.style.display="block",a.style.display="none"},g.readAsDataURL(u)}},!1),r.addEventListener("click",()=>{e.value="",t.src="",o.style.display="none",a.style.display="flex"})}stopCameraStream(){n(this,M)&&(n(this,M).getTracks().forEach(e=>{e.stop()}),l(this,M,null))}async initMap(){const e=document.createElement("script");e.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",e.integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=",e.crossOrigin="",document.head.appendChild(e),e.onload=()=>{l(this,E,L.map("map").setView([-.7893,113.9213],5)),L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(n(this,E)),n(this,E).on("click",t=>{this.updateSelectedLocation(t.latlng.lat,t.latlng.lng)}),setTimeout(()=>{n(this,E).invalidateSize()},100)}}initLocationFeatures(){const e=document.getElementById("get-current-location"),t=document.getElementById("location-status");e.addEventListener("click",()=>{if(!navigator.geolocation){t.innerHTML=`
          <div class="alert alert-error">
            <p><i class="fas fa-exclamation-triangle"></i> Geolocation is not supported by your browser</p>
          </div>
        `;return}t.innerHTML=`
        <div class="location-loading">
          <span class="loader-small"></span> Getting your location...
        </div>
      `,e.disabled=!0,navigator.geolocation.getCurrentPosition(o=>{const{latitude:r,longitude:a}=o.coords;this.updateSelectedLocation(r,a),n(this,E).setView([r,a],15),t.innerHTML=`
            <div class="alert alert-success">
              <p><i class="fas fa-check-circle"></i> Location successfully obtained!</p>
            </div>
          `,e.disabled=!1,setTimeout(()=>{t.innerHTML=""},3e3)},o=>{let r;switch(o.code){case o.PERMISSION_DENIED:r="Location permission denied. Please allow access to your location.";break;case o.POSITION_UNAVAILABLE:r="Location information is unavailable.";break;case o.TIMEOUT:r="Request to get location timed out.";break;default:r="An unknown error occurred getting your location."}t.innerHTML=`
            <div class="alert alert-error">
              <p><i class="fas fa-exclamation-triangle"></i> ${r}</p>
            </div>
          `,e.disabled=!1},{enableHighAccuracy:!0,timeout:1e4,maximumAge:0})})}updateSelectedLocation(e,t){if(l(this,G,{lat:e,lon:t}),document.getElementById("selected-location-text").innerHTML=`
      <span>Selected location: <strong>${e.toFixed(6)}, ${t.toFixed(6)}</strong></span>
      <button type="button" id="clear-location" class="btn-small">
        <i class="fas fa-times"></i> Clear
      </button>
    `,document.getElementById("clear-location").addEventListener("click",o=>{o.preventDefault(),this.clearLocation()}),n(this,T))n(this,T).setLatLng([e,t]);else{const o=L.divIcon({className:"custom-map-marker",html:'<div class="marker-pin animate-bounce" style="background-color: var(--accent-color); position: relative; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 10px rgba(0,0,0,0.3);"><i class="fas fa-map-marker-alt" style="color: white;"></i></div>',iconSize:[30,30],iconAnchor:[15,30],popupAnchor:[0,-30]});l(this,T,L.marker([e,t],{icon:o}).addTo(n(this,E)))}}clearLocation(){n(this,T)&&(n(this,E).removeLayer(n(this,T)),l(this,T,null)),l(this,G,null),document.getElementById("selected-location-text").textContent="No location selected. Click on the map to select a location or use your current location."}setupForm(){document.getElementById("add-story-form").addEventListener("submit",async t=>{t.preventDefault();const o=document.getElementById("description").value,r=document.getElementById("captured-image"),a=document.getElementById("file-upload"),s=document.querySelector(".option-tab.active").getAttribute("data-tab");let h=null;if(s==="camera"){if(!r.src||r.style.display==="none"){this.showError("Please capture a photo using the camera.");return}const u=await fetch(r.src).then(g=>g.blob());h=new File([u],"story-image.jpg",{type:"image/jpeg"})}else{if(!a.files||a.files.length===0){this.showError("Please select an image from your gallery.");return}h=a.files[0]}if(!n(this,U).validateFormData(o,h))return;await n(this,U).createStory(o,h,n(this,G))&&this.stopCameraStream()})}async destroy(){this.stopCameraStream(),n(this,se)&&navigator.geolocation.clearWatch(n(this,se))}}U=new WeakMap,E=new WeakMap,T=new WeakMap,G=new WeakMap,M=new WeakMap,se=new WeakMap;var A,ce;class It{constructor({view:e,model:t=v}){c(this,A);c(this,ce);l(this,A,e),l(this,ce,t)}async loadStoriesWithLocation(){const e=K();if(!e){n(this,A).showLoginRequired();return}try{const t=await n(this,ce).getStories({token:e,location:1});if(t.error)throw new Error(t.message);const o=t.listStory;if(!o||o.length===0){n(this,A).showEmptyStories();return}const r=o.filter(a=>a.lat&&a.lon);if(r.length===0){n(this,A).showEmptyStoriesWithLocation();return}n(this,A).displayMap(r)}catch(t){console.error("loadStoriesWithLocation: error:",t),n(this,A).showError(t.message)}}}A=new WeakMap,ce=new WeakMap;var le;class kt{constructor(){c(this,le,null)}async render(){return`
      <section class="container">
        <h1>Story Map</h1>
        
        <div id="map-content">
          <div class="loader-container">
            <div class="loader"></div>
          </div>
        </div>
      </section>
    `}async afterRender(){l(this,le,new It({view:this,model:v})),await n(this,le).loadStoriesWithLocation()}showLoginRequired(){const e=document.getElementById("map-content");e.innerHTML=`
      <div class="alert alert-error">
        <p><i class="fas fa-exclamation-circle"></i> You need to login to view the story map. <a href="#/login">Login here</a> or <a href="#/register">Register</a></p>
      </div>
    `}showEmptyStories(){const e=document.getElementById("map-content");e.innerHTML=`
      <div class="alert">
        <p><i class="fas fa-info-circle"></i> No stories found. <a href="#/add">Create a story with location!</a></p>
      </div>
    `}showEmptyStoriesWithLocation(){const e=document.getElementById("map-content");e.innerHTML=`
      <div class="alert">
        <p><i class="fas fa-info-circle"></i> No stories with location data found. <a href="#/add">Create a story with location!</a></p>
      </div>
    `}showError(e){const t=document.getElementById("map-content");t.innerHTML=`
      <div class="alert alert-error">
        <p><i class="fas fa-exclamation-triangle"></i> ${e||"Failed to load story map. Please try again later."}</p>
      </div>
    `}displayMap(e){const t=document.getElementById("map-content");t.innerHTML=`
      <div class="map-container large">
        <div id="map"></div>
      </div>
      
      <div class="story-list-summary">
        <h3><i class="fas fa-map-marker-alt"></i> Stories with Location (${e.length})</h3>
        <p>Explore stories from different places. You can switch between different map styles using the layer control in the top-right corner.</p>
      </div>
    `,this.initMap(e)}async initMap(e){const t=document.createElement("script");t.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",t.integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=",t.crossOrigin="",document.head.appendChild(t),t.onload=()=>{const o=e.reduce((u,g)=>u+g.lat,0)/e.length,r=e.reduce((u,g)=>u+g.lon,0)/e.length,a=L.map("map").setView([o,r],5),s={OpenStreetMap:L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}),"Stamen Watercolor":L.tileLayer("https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg",{attribution:'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>. Tiles hosted by <a href="https://stadiamaps.com/">Stadia Maps</a>',maxZoom:16}),"Stamen Terrain":L.tileLayer("https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png",{attribution:'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>. Tiles hosted by <a href="https://stadiamaps.com/">Stadia Maps</a>',maxZoom:18,subdomains:"abcd"}),"ESRI World Imagery":L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{attribution:"Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",maxZoom:18})};s.OpenStreetMap.addTo(a);const h=L.layerGroup();e.forEach(u=>{const g=L.divIcon({className:"custom-map-marker",html:'<div class="marker-pin" style="background-color: var(--primary-color); position: relative; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 10px rgba(0,0,0,0.3);"><i class="fas fa-camera" style="color: white;"></i></div>',iconSize:[30,30],iconAnchor:[15,30],popupAnchor:[0,-30]}),H=L.marker([u.lat,u.lon],{icon:g}).addTo(a);h.addLayer(H);const qe=`
          <div class="map-popup">
            <h4>${u.name}</h4>
            <p>${this.truncateText(u.description,50)}</p>
            <img src="${u.photoUrl}" alt="Story by ${u.name}" style="width: 100%; max-height: 100px; object-fit: cover;">
            <p><i class="far fa-calendar-alt"></i> ${Z(u.createdAt)}</p>
            <a href="#/detail/${u.id}" class="btn btn-outline">View Details</a>
          </div>
        `;H.bindPopup(qe)}),h.addTo(a);const d={"Story Locations":h};L.control.layers(s,d,{collapsed:!1,position:"topright"}).addTo(a),L.control.scale().addTo(a),setTimeout(()=>{a.invalidateSize();const u=document.querySelector(".map-container");Ve(u,"animate-fade-in",800)},100)}}truncateText(e,t){return e.length<=t?e:e.substring(0,t)+"..."}}le=new WeakMap;const be={async saveStory(i){return await S.putStory(i),console.log(`Story with ID ${i.id} saved to IndexedDB`),i},async deleteStory(i){try{return await S.deleteStory(i),console.log(`Story with ID ${i} deleted from IndexedDB`),!0}catch(e){return console.error(`Error deleting story with ID ${i}:`,e),!1}},async clearOldStories(i=7){try{const e=await S.getStories(),t=new Date,o=new Date(t.setDate(t.getDate()-i));let r=0;for(const a of e)new Date(a.createdAt)<o&&(await S.deleteStory(a.id),r++);return console.log(`Cleared ${r} old stories from IndexedDB`),r}catch(e){return console.error("Error clearing old stories:",e),0}},async getStoriesFromIdb(){return await S.getStories()}};class Bt{async render(){return`
      <section class="container" aria-labelledby="offline-manager-heading">
        <div class="form-container">
          <h2 id="offline-manager-heading" class="form-title">Manage Offline Stories</h2>
          
          <div class="form-info">
            <p>This page allows you to manage stories that are stored offline on your device. You can view and delete individual stories or clear all stories that are older than 7 days.</p>
          </div>
          
          <div class="form-actions">
            <button id="clear-old-stories" class="btn">Clear Stories Older Than 7 Days</button>
          </div>
          
          <div id="offline-stories-container" class="offline-stories-container">
            <div class="loader-container">
              <div class="loader"></div>
            </div>
          </div>
        </div>
      </section>
    `}async afterRender(){await this.loadOfflineStories(),this.initEventListeners()}async loadOfflineStories(){const e=document.getElementById("offline-stories-container");try{const t=await be.getStoriesFromIdb();if(t.length===0){e.innerHTML=`
          <div class="alert">
            <p>No stories are stored offline.</p>
          </div>
        `;return}const o=t.map(a=>`
        <div class="offline-story-item" data-id="${a.id}">
          <div class="offline-story-content">
            <h3>${a.name}</h3>
            <p>${this.truncateText(a.description,100)}</p>
            <div class="offline-story-meta">
              <span>Saved on: ${Z(a.createdAt)}</span>
              <div class="offline-story-actions">
                <a href="#/detail/${a.id}" class="btn btn-outline btn-small">View</a>
                <button class="btn btn-outline btn-small delete-story" data-id="${a.id}">Delete</button>
              </div>
            </div>
          </div>
        </div>
      `).join("");e.innerHTML=`
        <div class="offline-stories-list">
          ${o}
        </div>
      `,document.querySelectorAll(".delete-story").forEach(a=>{a.addEventListener("click",async s=>{const h=s.target.dataset.id;await this.deleteStory(h)})})}catch(t){console.error("Error loading offline stories:",t),e.innerHTML=`
        <div class="alert alert-error">
          <p>Error loading offline stories: ${t.message}</p>
        </div>
      `}}initEventListeners(){const e=document.getElementById("clear-old-stories");e&&e.addEventListener("click",async()=>{await this.clearOldStories()})}async deleteStory(e){confirm("Are you sure you want to delete this story from offline storage?")&&(await be.deleteStory(e),await this.loadOfflineStories())}async clearOldStories(){if(confirm("Are you sure you want to clear all stories older than 7 days?")){const e=await be.clearOldStories(7);alert(`${e} old stories have been cleared from offline storage.`),await this.loadOfflineStories()}}truncateText(e,t){return e.length<=t?e:e.substring(0,t)+"..."}}class Dt{async render(){return`
      <section class="not-found-page">
        <div class="container">
          <div class="not-found-content">
            <h1 class="not-found-title">404</h1>
            <h2 class="not-found-subtitle">Page Not Found</h2>
            <p class="not-found-description">
              The page you are looking for might have been removed,
              had its name changed, or is temporarily unavailable.
            </p>
            <div class="not-found-actions">
              <a href="#/" class="btn btn-primary">Go to Homepage</a>
              <a href="#/offline" class="btn btn-outline">Offline Content</a>
            </div>
          </div>
        </div>
      </section>
    `}async afterRender(){}}const Tt={"/":new mt,"/about":new ft,"/login":new yt,"/register":new vt,"/detail/:id":new St,"/add":new Lt,"/map":new kt,"/offline":new Bt,"/404":new Dt};function Re(i){const e=i.split("/");return{resource:e[1]||null,id:e[2]||null}}function At(i){let e="";return i.resource&&(e=e.concat(`/${i.resource}`)),i.id&&(e=e.concat("/:id")),e||"/"}function _e(){return location.hash.replace("#","")||"/"}function Ct(){const i=_e(),e=Re(i);return At(e)}function Pt(){const i=_e();return Re(i)}var V,Y,C,I,z,F,y,k,O,p,$e,Ue,Se,de,Fe,We,Ee,He,pe,j,je;class Nt{constructor({navigationDrawer:e,drawerButton:t,content:o}){c(this,p);c(this,V,null);c(this,Y,null);c(this,C,null);c(this,I,null);c(this,z,null);c(this,F,null);c(this,y,null);c(this,k,null);c(this,O,null);c(this,de,e=>{if(e.preventDefault(),$()){const{token:t}=q().loginResult;B.unsubscribeFromPush(t)}localStorage.removeItem("dicoding_story_auth"),window.dispatchEvent(new CustomEvent("auth-changed")),window.location.hash="#/"});l(this,V,o),l(this,Y,t),l(this,C,e),l(this,I,document.querySelector("#auth-button")),l(this,y,document.querySelector("#notification-toggle")),l(this,k,document.querySelector("#try-notification")),l(this,O,document.querySelector("#offline-indicator")),m(this,p,$e).call(this),m(this,p,Ue).call(this),m(this,p,Fe).call(this),m(this,p,He).call(this),m(this,p,We).call(this)}async renderPage(){const e=Ct(),t=Tt[e],o=Pt();if(!t){window.location.hash="#/404";return}try{n(this,F)&&typeof n(this,F).destroy=="function"&&await n(this,F).destroy();const r=m(this,p,je).call(this,e);await Ge(async()=>{n(this,V).innerHTML=await t.render(o),await t.afterRender(o)},r),l(this,z,e),l(this,F,t)}catch(r){console.error("Error rendering page:",r),n(this,V).innerHTML=`
        <div class="container">
          <div class="alert alert-error">
            <p>Failed to load page content. Please try again later.</p>
          </div>
        </div>
      `}}}V=new WeakMap,Y=new WeakMap,C=new WeakMap,I=new WeakMap,z=new WeakMap,F=new WeakMap,y=new WeakMap,k=new WeakMap,O=new WeakMap,p=new WeakSet,$e=function(){n(this,Y).addEventListener("click",()=>{n(this,C).classList.toggle("open")}),document.body.addEventListener("click",e=>{!n(this,C).contains(e.target)&&!n(this,Y).contains(e.target)&&n(this,C).classList.remove("open"),n(this,C).querySelectorAll("a").forEach(t=>{t.contains(e.target)&&n(this,C).classList.remove("open")})})},Ue=function(){m(this,p,Se).call(this),window.addEventListener("auth-changed",()=>{m(this,p,Se).call(this),m(this,p,j).call(this)})},Se=function(){if($()){const{loginResult:e}=q();n(this,I).textContent=`Logout (${e.name})`,n(this,I).href="#/",n(this,I).addEventListener("click",n(this,de))}else n(this,I).textContent="Login",n(this,I).href="#/login",n(this,I).removeEventListener("click",n(this,de))},de=new WeakMap,Fe=function(){W.init(),m(this,p,Ee).call(this,W.isOnline()),W.addStatusChangeCallback(e=>{m(this,p,Ee).call(this,e)})},We=function(){Oe.init()},Ee=function(e){n(this,O)&&(e?n(this,O).classList.remove("show"):(n(this,O).textContent="You are offline. Some features may be limited.",n(this,O).classList.add("show")))},He=function(){n(this,y)&&(m(this,p,j).call(this),n(this,y).addEventListener("click",async()=>{if(!$()){alert("Please login to manage notifications");return}try{const{token:e}=q().loginResult;console.log("Managing notifications with token available:",!!e),m(this,p,pe).call(this)?(console.log("Attempting to unsubscribe from push notifications"),await B.unsubscribeFromPush(e)?(m(this,p,j).call(this),alert("You have unsubscribed from notifications")):alert("Failed to unsubscribe from notifications")):(console.log("Attempting to subscribe to push notifications"),await B.requestPermission(e)?(m(this,p,j).call(this),alert("You are now subscribed to notifications")):alert("Failed to subscribe to notifications"))}catch(e){console.error("Error managing notifications:",e),alert("An error occurred while managing notifications")}})),n(this,k)&&n(this,k).addEventListener("click",async()=>{if(!$()){alert("Please login to try notifications");return}try{if(console.log("Try notification button clicked"),!m(this,p,pe).call(this))if(console.log("User not subscribed to notifications, prompting to subscribe"),confirm("You need to subscribe to notifications first. Would you like to subscribe now?")){const{token:t}=q().loginResult;if(console.log("Attempting to subscribe user to notifications"),!await B.requestPermission(t)){alert("Failed to subscribe to notifications. Please try again.");return}m(this,p,j).call(this)}else return;console.log("Showing demo notification"),await B.showDemoNotification()}catch(e){console.error("Error showing notification:",e),alert("Failed to show notification")}})},pe=function(){const e=localStorage.getItem("dicoding_story_notification_subscription");if(!e)return!1;try{const{isSubscribed:t}=JSON.parse(e);return t}catch{return!1}},j=function(){if(!n(this,y))return;if(!$()){n(this,y).style.display="none",n(this,k)&&(n(this,k).style.display="none");return}n(this,y).style.display="inline-flex",n(this,k)&&(n(this,k).style.display="inline-flex"),m(this,p,pe).call(this)?(n(this,y).textContent="Unsubscribe Notifications",n(this,y).dataset.subscribed="true"):(n(this,y).textContent="Subscribe Notifications",n(this,y).dataset.subscribed="false")},je=function(e){if(!n(this,z))return"fade";const t={home:["/"],auth:["/login","/register"],content:["/detail","/add"],info:["/about","/map"]},o=s=>{for(const[h,d]of Object.entries(t))if(d.some(u=>s.startsWith(u)))return h;return"other"},r=o(n(this,z)),a=o(e);return r===a?"fade":r==="auth"&&a==="home"?"zoom":a==="content"?"slide":"fade"};document.addEventListener("DOMContentLoaded",async()=>{const i=new Nt({content:document.querySelector("#main-content"),drawerButton:document.querySelector("#drawer-button"),navigationDrawer:document.querySelector("#navigation-drawer")});await i.renderPage(),window.addEventListener("hashchange",async()=>{await i.renderPage()});const e=document.querySelector("#main-content"),t=document.querySelector(".skip-link");t.addEventListener("click",function(o){o.preventDefault(),t.blur(),e.focus(),e.scrollIntoView()})});
