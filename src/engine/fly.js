/* engine: things that fly in an arc (cash, items) */
const flyers=[];
function fly(geo,m,from,toFn,dur,onLand){const mesh=new THREE.Mesh(geo,m);mesh.position.copy(from);scene.add(mesh);flyers.push({mesh,from:from.clone(),toFn,t:0,dur,onLand})}
function stepFlyers(dt){for(let k=flyers.length-1;k>=0;k--){const f=flyers[k];f.t+=dt/f.dur;const e=Math.min(1,f.t),to=f.toFn();
 f.mesh.position.lerpVectors(f.from,to,e);f.mesh.position.y+=Math.sin(Math.PI*e)*1.4;f.mesh.rotation.y+=dt*9;f.mesh.rotation.z=Math.sin(e*Math.PI)*.6;
 if(f.t>=1){scene.remove(f.mesh);flyers.splice(k,1);f.onLand&&f.onLand()}}}
