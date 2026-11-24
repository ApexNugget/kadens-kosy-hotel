/* engine: name tags and stacks of things carried in the hands */
function nameTag(n,bg){return label(n,bg,.7)}
function handStack(m,n,geo,mt){const hg=new THREE.Group();hg.position.set(0,.82,.48);m.add(hg);
 return{hg,items:Array.from({length:n},(_,k)=>{const r=new THREE.Mesh(geo,mt);r.position.set((k%2-.5)*.32,(k>>1)*.3,0);r.visible=false;hg.add(r);return r})}}
