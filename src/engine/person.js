/* engine: blocky people: build, animate and walk along a path */
function limb(w,h,d,c,x,y,p){const g=new THREE.Group();g.position.set(x,y,0);p.add(g);box(w,h,d,c,0,-h/2,0,g);return g}
function person(shirt,hair,skin='#f2c39b',pants='#3b5bab',hat,o={}){const g=new THREE.Group();scene.add(g);
 const legL=limb(.26,.6,.26,pants,-.14,.6,g),legR=limb(.26,.6,.26,pants,.14,.6,g);
 box(.56,.66,.3,shirt,0,.93,0,g);
 const armL=limb(.2,.5,.22,o.sleeve||shirt,-.39,1.24,g),armR=limb(.2,.5,.22,o.sleeve||shirt,.39,1.24,g);
 box(.2,.14,.22,skin,0,-.57,0,armL);box(.2,.14,.22,skin,0,-.57,0,armR);
 box(.5,.5,.5,skin,0,1.52,0,g);box(.54,.14,.54,hair,0,1.8,0,g);box(.54,o.longHair||o.mullet?.7:.38,.14,hair,0,o.longHair||o.mullet?1.46:1.62,-.21,g);
 if(o.mullet)box(.5,.25,.1,hair,0,1.2,-.22,g);if(o.tash)box(.26,.06,.03,hair,0,1.44,.26,g);
 if(o.belt){box(.6,.1,.34,'#6b3e1f',0,.62,0,g);box(.09,.28,.09,'#ffd23f',.24,.5,.17,g);box(.09,.2,.09,'#c0c0c0',-.22,.52,.17,g)}
 if(o.bow){box(.22,.09,.03,'#e2366b',0,1.2,.17,g);box(.56,.66,.04,'#2b2140',0,.93,-.16,g)}
 if(o.longHair){box(.1,.5,.5,hair,-.27,1.55,-.02,g);box(.1,.5,.5,hair,.27,1.55,-.02,g)}
 if(hat==='crown'){box(.56,.16,.56,'#ffd23f',0,1.92,0,g);[-.2,0,.2].forEach(x=>box(.1,.14,.1,'#ffd23f',x,2.06,.2,g));box(.08,.08,.04,'#ff4d4d',0,1.92,.29,g)}
 else if(hat==='band')box(.56,.08,.56,'#ffffff',0,1.84,0,g);
 else if(hat==='chef'){box(.56,.1,.56,'#ffffff',0,1.86,0,g);box(.5,.36,.5,'#ffffff',0,2.08,0,g);box(.6,.14,.6,'#f4f4f4',0,2.3,0,g)}
 else if(hat)box(.58,.18,.58,hat,0,1.9,0,g);
 if(o.maid){box(.4,.5,.03,'#ffffff',0,.86,.17,g);box(.3,.08,.03,'#ffffff',0,1.2,.17,g);box(.7,.28,.42,'#1d1d1d',0,.52,0,g)}
 if(o.overalls){box(.58,.42,.32,o.overalls,0,.8,0,g);[-.17,.17].forEach(x=>box(.08,.26,.33,o.overalls,x,1.12,0,g));box(.2,.14,.02,'#264d8a',0,.86,.17,g);[-.17,.17].forEach(x=>box(.06,.06,.03,'#ffd23f',x,1.02,.17,g))}
 [-1,1].forEach(s=>{box(.13,.08,.02,'#ffffff',s*.12,1.56,.255,g);box(.065,.08,.025,o.eyes||'#3b2a8a',s*.09,1.56,.256,g)});
 box(.18,.05,.02,'#9b4a3b',0,1.4,.255,g);
 g.userData={legL,legR,armL,armR,ph:0};return g}
function animate(g,moving,dt,hold,ride){const u=g.userData;u.ph=moving&&!ride?u.ph+dt*12:u.ph*.8;const s=Math.sin(u.ph)*.7;
 u.legL.rotation.x=s;u.legR.rotation.x=-s;if(hold){u.armL.rotation.x=u.armR.rotation.x=-1.25}else if(ride){u.armL.rotation.x=u.armR.rotation.x=-.9}else{u.armL.rotation.x=-s*.8;u.armR.rotation.x=s*.8}}
function walk(e,dt,speed=4.2){const m=e.m;if(!e.path.length){animate(m,false,dt,e.hold);return false}
 const tg=e.path[0],dx=tg.x-m.position.x,dz=tg.z-m.position.z,d=Math.hypot(dx,dz),s=speed*dt;
 if(d<=s){m.position.x=tg.x;m.position.z=tg.z;e.path.shift();if(tg.tele){m.position.x=tg.tele.x;m.position.z=tg.tele.z}}else{m.position.x+=dx/d*s;m.position.z+=dz/d*s;m.rotation.y=Math.atan2(dx,dz)}
 animate(m,true,dt,e.hold);if(e.tag)e.tag.position.set(m.position.x,2.4,m.position.z);return!e.path.length}
