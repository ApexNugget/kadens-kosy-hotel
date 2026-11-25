/* engine: things that fly in an arc (cash, items) */
const flyers=[];
// o.delay waits before taking off, o.h is the arc height, o.side swings it out sideways (for swirls)
function fly(geo,m,from,toFn,dur,onLand,o={}){const mesh=new THREE.Mesh(geo,m);mesh.position.copy(from);mesh.visible=!o.delay;scene.add(mesh);flyers.push({mesh,from:from.clone(),toFn,t:-(o.delay||0)/dur,dur,onLand,h:o.h||1.4,side:o.side||0})}
function stepFlyers(dt){for(let k=flyers.length-1;k>=0;k--){const f=flyers[k];f.t+=dt/f.dur;if(f.t<0)continue;f.mesh.visible=true;const e=Math.min(1,f.t),to=f.toFn();
 f.mesh.position.lerpVectors(f.from,to,e);const arc=Math.sin(Math.PI*e);f.mesh.position.y+=arc*f.h;
 if(f.side){const dx=to.x-f.from.x,dz=to.z-f.from.z,l=Math.hypot(dx,dz)||1;f.mesh.position.x+=-dz/l*f.side*arc;f.mesh.position.z+=dx/l*f.side*arc}f.mesh.rotation.y+=dt*9;f.mesh.rotation.z=Math.sin(e*Math.PI)*.6;
 if(f.t>=1){scene.remove(f.mesh);flyers.splice(k,1);f.onLand&&f.onLand()}}}
