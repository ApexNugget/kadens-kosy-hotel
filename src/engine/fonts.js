/* engine: re-draw labels once the Fredoka font has loaded */
if(document.fonts)document.fonts.ready.then(()=>LABELS.forEach(l=>{const u=l.userData,t=u.txt;u.txt=null;setLabel(l,t,u.cur)}));
