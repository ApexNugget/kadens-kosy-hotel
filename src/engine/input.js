/* engine: the hidden joystick and keyboard */
const joy={on:false,id:null,x:0,y:0,dx:0,dy:0},keys={};
$('stage').addEventListener('pointerdown',e=>{if(joy.on)return;joy.on=true;joy.id=e.pointerId;joy.x=e.clientX;joy.y=e.clientY;joy.dx=joy.dy=0;
 $('inf').classList.add('off')});
addEventListener('pointermove',e=>{if(!joy.on||e.pointerId!==joy.id)return;let dx=e.clientX-joy.x,dy=e.clientY-joy.y;const l=Math.hypot(dx,dy),m=50;
 if(l>m){dx*=m/l;dy*=m/l}joy.dx=dx/m;joy.dy=dy/m});
function endJoy(e){if(e.pointerId!==joy.id)return;joy.on=false;joy.dx=joy.dy=0;$('inf').classList.remove('off')}
addEventListener('pointerup',endJoy);addEventListener('pointercancel',endJoy);
addEventListener('keydown',e=>keys[e.key.toLowerCase()]=1);addEventListener('keyup',e=>keys[e.key.toLowerCase()]=0);
