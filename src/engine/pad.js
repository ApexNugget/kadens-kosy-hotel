/* engine: green build squares */
function makePad(x,z,size=1.8){const g=new THREE.Group();g.position.set(x,0,z);scene.add(g);box(size+.2,.06,size+.2,'#ffffff',0,.03,0,g);box(size,.08,size,tm('wool:#4cb050'),0,.04,0,g);
 const l=label('',undefined,1.1);return{mesh:g,lbl:l,size,tick:0,wasOn:false}}
