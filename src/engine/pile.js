/* engine: stacks of cash on the floor */
function makePile(px,pz,n){const g=new THREE.Group();scene.add(g);const arr=[];
 for(let k=0;k<n;k++){const s=k%8,lv=k/8|0;const m=new THREE.Mesh(billGeo,billMat);m.castShadow=true;m.position.set(px+(s%2-.5)*.64,.05+lv*.1,pz+((s>>1)-1.5)*.36);g.add(m);arr.push(m)}
 const l=label('$0','#4cb050',1);l.position.set(px,2,pz);return{arr,l}}
