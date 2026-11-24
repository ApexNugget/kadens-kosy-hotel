/* engine: pixel-art canvas textures and the shared material cache (needs ENV) */
function shade(hex,a){const n=parseInt(hex.slice(1),16);const f=v=>Math.max(0,Math.min(255,Math.round(v+a*255)));
 return `rgb(${f(n>>16)},${f(n>>8&255)},${f(n&255)})`}
function pix(base,vary,draw,w=16,h=16,edge){const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');
 for(let i=0;i<w;i++)for(let j=0;j<h;j++){x.fillStyle=shade(base,(Math.random()-.5)*vary*.6);x.fillRect(i,j,1,1)}
 if(draw)draw(x);
 if(edge){x.fillStyle='rgba(255,255,255,.16)';x.fillRect(0,0,w,1);x.fillRect(0,0,1,h);x.fillStyle='rgba(0,0,0,.14)';x.fillRect(0,h-1,w,1);x.fillRect(w-1,0,1,h)}
 const t=new THREE.CanvasTexture(c);t.magFilter=THREE.NearestFilter;t.minFilter=THREE.NearestMipmapLinearFilter;t.anisotropy=ANISO;t.wrapS=t.wrapT=THREE.RepeatWrapping;return t}
const planks=c=>x=>{x.fillStyle=c;for(let y=3;y<16;y+=4)x.fillRect(0,y,16,1);[[4,0],[11,4],[2,8],[9,12]].forEach(([a,b])=>x.fillRect(a,b,1,3))};
const bricks=c=>x=>{x.fillStyle=c;for(let y=3;y<16;y+=4){x.fillRect(0,y,16,1);const o=(y/4|0)%2?0:8;x.fillRect(o,y-3,1,3)}};
const tiles=c=>x=>{x.fillStyle=c;x.fillRect(0,7,16,1);x.fillRect(7,0,1,16);x.fillRect(0,15,16,1);x.fillRect(15,0,1,16)};
const BASE={};
function tex(key){if(BASE[key])return BASE[key];let t;
 if(key==='grass')t=pix(ENV.ground,ENV.groundNoise);
 else if(key==='checker')t=pix('#f4f1e8',.05,x=>{for(let i=0;i<16;i++)for(let j=0;j<16;j++)if(((i>>3)+(j>>3))%2){x.fillStyle=shade(ENV.check,(Math.random()-.5)*.06);x.fillRect(i,j,1,1)}});
 else if(key==='gravel')t=pix('#a89f91',.25);
 else if(key.startsWith('plank:')){const c=key.slice(6);t=pix(c,.08,planks(shade(c,-.14)),16,16,1)}
 else if(key.startsWith('brick:')){const c=key.slice(6);t=pix(c,.08,bricks(shade(c,-.16)),16,16,1)}
 else if(key.startsWith('tile:')){const c=key.slice(5);t=pix(c,.05,tiles(shade(c,-.12)),16,16,1)}
 else if(key.startsWith('wool:'))t=pix(key.slice(5),.09,null,16,16,1);
 else if(key==='bill')t=pix('#4cb050',.06,x=>{x.fillStyle='#1f6e2a';x.fillRect(0,0,32,1);x.fillRect(0,15,32,1);x.fillRect(0,0,1,16);x.fillRect(31,0,1,16);
  x.fillStyle='#a5e3a0';x.fillRect(12,4,8,8);x.fillStyle='#1f6e2a';x.font='bold 9px sans-serif';x.textAlign='center';x.fillText('$',16,11);
  x.fillStyle='#2e8b3a';x.fillRect(3,6,4,4);x.fillRect(25,6,4,4)},32,16);
 return BASE[key]=t}
const TM={};
function tm(key,rx=1,ry=1){const k=key+'|'+rx.toFixed(1)+'|'+ry.toFixed(1);if(TM[k])return TM[k];
 const t=tex(key).clone();t.needsUpdate=true;t.repeat.set(rx,ry);return TM[k]=new THREE.MeshLambertMaterial({map:t})}
const MC={};const mat=c=>typeof c!=='string'?c:(MC[c]||(MC[c]=new THREE.MeshLambertMaterial({color:c})));
