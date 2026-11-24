/* engine: speech-bubble labels, the progress ring and sparkle stars */
function rr(x,X,Y,w,h,r){x.beginPath();x.moveTo(X+r,Y);x.arcTo(X+w,Y,X+w,Y+h,r);x.arcTo(X+w,Y+h,X,Y+h,r);x.arcTo(X,Y+h,X,Y,r);x.arcTo(X,Y,X+w,Y,r);x.closePath()}
const LIGHT=['#fffaf0','#ffd23f','#dddddd'];
const LABELS=new Set();
function killLabel(s){scene.remove(s);LABELS.delete(s);s.material.map.dispose();s.material.dispose()}
function label(text,bg='#fffaf0',scale=1.3){const c=document.createElement('canvas');c.width=512;c.height=200;const t=new THREE.CanvasTexture(c);t.minFilter=THREE.LinearFilter;
 const s=new THREE.Sprite(new THREE.SpriteMaterial({map:t,depthTest:false,transparent:true,fog:false}));const h=scale*1.3;s.scale.set(h*2.56,h,1);s.renderOrder=10;
 s.userData={c,t,txt:null,bg};setLabel(s,text);scene.add(s);LABELS.add(s);return s}
// a rounded speech bubble with a dark outline, soft shadow, top shine and a little pointer
function setLabel(s,text,bg){const u=s.userData;bg=bg||u.bg;if(u.txt===text&&u.cur===bg)return;u.txt=text;u.cur=bg;
 const x=u.c.getContext('2d'),dark='#2b2140';x.clearRect(0,0,512,200);x.font='700 60px Fredoka, system-ui, sans-serif';
 const tw=Math.min(420,x.measureText(text).width),w=tw+72,h=102,X=256-w/2,Y=28;
 x.fillStyle='rgba(0,0,0,.22)';rr(x,X+2,Y+9,w,h,h/2);x.fill();
 x.fillStyle=dark;x.beginPath();x.moveTo(238,Y+h-6);x.lineTo(274,Y+h-6);x.lineTo(256,Y+h+28);x.closePath();x.fill();rr(x,X,Y,w,h,h/2);x.fill();
 const g=x.createLinearGradient(0,Y,0,Y+h);g.addColorStop(0,shade(bg,.1));g.addColorStop(1,bg);x.fillStyle=g;rr(x,X+6,Y+6,w-12,h-12,(h-12)/2);x.fill();
 x.fillStyle=bg;x.beginPath();x.moveTo(245,Y+h-9);x.lineTo(267,Y+h-9);x.lineTo(256,Y+h+16);x.closePath();x.fill();
 x.fillStyle='rgba(255,255,255,.42)';rr(x,X+18,Y+11,w-36,13,6.5);x.fill();
 x.fillStyle=LIGHT.includes(bg)?dark:'#fff';x.textAlign='center';x.textBaseline='middle';x.fillText(text,256,Y+h/2+4,420);u.t.needsUpdate=true}
const ringC=document.createElement('canvas');ringC.width=ringC.height=128;const ringT=new THREE.CanvasTexture(ringC);
const ring=new THREE.Sprite(new THREE.SpriteMaterial({map:ringT,depthTest:false,transparent:true}));ring.scale.set(1.3,1.3,1);ring.renderOrder=11;scene.add(ring);
function setRing(p){const x=ringC.getContext('2d');x.clearRect(0,0,128,128);x.lineWidth=18;x.strokeStyle='#ffffffcc';x.beginPath();x.arc(64,64,48,0,7);x.stroke();
 x.strokeStyle='#4cb050';x.beginPath();x.arc(64,64,48,-Math.PI/2,-Math.PI/2+p*Math.PI*2);x.stroke();ringT.needsUpdate=true}

/* ---------- sparkle stars (bursts on every good moment) ---------- */
const starC=document.createElement('canvas');starC.width=starC.height=64;
{const x=starC.getContext('2d');x.translate(32,33);x.beginPath();for(let k=0;k<10;k++){const r=k%2?12:28,a=-Math.PI/2+k*Math.PI/5;x.lineTo(Math.cos(a)*r,Math.sin(a)*r)}x.closePath();
 const g=x.createRadialGradient(-3,-6,2,0,0,30);g.addColorStop(0,'#fffbe0');g.addColorStop(.5,'#ffd23f');g.addColorStop(1,'#ff9f1c');x.fillStyle=g;x.fill();x.lineJoin='round';x.lineWidth=4;x.strokeStyle='#8a5a00';x.stroke()}
const starT=new THREE.CanvasTexture(starC);
const SPARK=Array.from({length:80},()=>{const s=new THREE.Sprite(new THREE.SpriteMaterial({map:starT,transparent:true,depthWrite:false,fog:false}));s.visible=false;s.renderOrder=12;scene.add(s);return{s,life:0,max:1,sz:.5,v:new THREE.Vector3()}});
let sparkI=0;
function stars(x,y,z,n=10,pow=3){for(let k=0;k<n;k++){const p=SPARK[sparkI++%SPARK.length],a=Math.random()*Math.PI*2,sp=pow*(.4+Math.random()*.8);
 p.s.position.set(x,y,z);p.v.set(Math.cos(a)*sp*.7,pow*(.9+Math.random()*.9),Math.sin(a)*sp*.7);p.life=1;p.max=.7+Math.random()*.6;p.sz=.3+Math.random()*.35;p.s.visible=true}}
function stepStars(dt){for(const p of SPARK){if(!p.s.visible)continue;p.life-=dt/p.max;if(p.life<=0){p.s.visible=false;continue}
 p.v.y-=7*dt;p.s.position.addScaledVector(p.v,dt);const k=p.sz*(p.life>.85?(1-p.life)/.15:1);p.s.scale.set(k,k,1);p.s.material.opacity=Math.min(1,p.life*2.5);p.s.material.rotation+=dt*5}}
const starShape=new THREE.Shape();for(let k=0;k<10;k++){const r=k%2?.1:.24,a=Math.PI/2+k*Math.PI/5,X=Math.cos(a)*r,Y=Math.sin(a)*r;k?starShape.lineTo(X,Y):starShape.moveTo(X,Y)}
const star3G=new THREE.ExtrudeGeometry(starShape,{depth:.06,bevelEnabled:true,bevelThickness:.025,bevelSize:.025,bevelSegments:1});star3G.center();
const star3M=new THREE.MeshLambertMaterial({color:'#ffd23f',emissive:'#8a5a00'});
