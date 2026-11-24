/* engine: renderer, scene, camera, sun and the box/plane helpers (needs ENV) */
const renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
const ANISO=Math.min(8,renderer.capabilities.getMaxAnisotropy());
$('stage').appendChild(renderer.domElement);
const scene=new THREE.Scene();scene.background=new THREE.Color(ENV.sky);if(ENV.fog)scene.fog=new THREE.Fog(ENV.sky,ENV.fog[0],ENV.fog[1]);
const cam=new THREE.PerspectiveCamera(42,1,.1,200);
scene.add(new THREE.HemisphereLight(0xe8f6ff,0x8f7d62,.78));
const sun=new THREE.DirectionalLight(0xfff1d6,.78);sun.castShadow=true;sun.shadow.bias=-.0006;sun.shadow.normalBias=.02;
sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-22,right:22,top:22,bottom:-22,far:90});scene.add(sun);scene.add(sun.target);
function add(m,p,x,y,z){m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;(p||scene).add(m);return m}
const GC={};const geo=(w,h,d)=>{const k=w+','+h+','+d;return GC[k]||(GC[k]=new THREE.BoxGeometry(w,h,d))};// shared shapes: no leaks as guests come and go
const box=(w,h,d,c,x,y,z,p)=>add(new THREE.Mesh(geo(w,h,d),mat(c)),p,x,y,z);
const cylm=(r,h,c,x,y,z,p)=>add(new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,12),mat(c)),p,x,y,z);
function plane(w,d,m,x,z,y=.01){const p=new THREE.Mesh(new THREE.PlaneGeometry(w,d),mat(m));p.rotation.x=-Math.PI/2;p.position.set(x,y,z);p.receiveShadow=true;scene.add(p);return p}
