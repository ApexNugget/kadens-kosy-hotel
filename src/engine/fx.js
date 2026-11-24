/* engine: floating "+$5" text and the near() helper */
const v3=new THREE.Vector3();
function fxAt(x,y,z,t){v3.set(x,y,z).project(cam);const d=document.createElement('div');d.className='fx';d.textContent=t;
 d.style.left=((v3.x+1)/2*innerWidth)+'px';d.style.top=((1-v3.y)/2*innerHeight)+'px';document.body.appendChild(d);setTimeout(()=>d.remove(),1000)}
const near=(x,z,r,m=player)=>Math.hypot(m.position.x-x,m.position.z-z)<r;
