/* engine: the tap-to-buy card */
let offerNext=null,offerCur=null;
const leftOf=(id,cost)=>Math.max(0,cost-(G.paid[id]||0));
function consider(pad,x,z,o){if(near(x,z,pad.size*.62))offerNext={...o,x,z}}
function showOffer(){const n=offerNext;offerNext=null;
 if((n&&n.id)!==(offerCur&&offerCur.id)){const b=$('buy');b.hidden=!n;if(n){b.style.animation='none';void b.offsetWidth;b.style.animation='';put('bicon',n.icon);put('bname',n.name)}}
 offerCur=n;if(!n)return;const left=leftOf(n.id,n.cost);
 put('bsub',n.lock?'🔒 '+n.lock:G.coins>=left?'Tap to buy!':`Need $${left-G.coins} more`);put('bbtn',n.lock?'🔒':'$'+left);put('bbtn',!!n.lock||G.coins<left,'disabled')}
$('bbtn').onclick=()=>{const o=offerCur;if(!o||o.lock)return;const left=leftOf(o.id,o.cost);if(G.coins<left){sfx.no();return}
 G.coins-=left;delete G.paid[o.id];stat(o.id.startsWith('rt')?'upgrade':'build');for(let k=0;k<8;k++)setTimeout(()=>fly(billGeo,billMat,backTop(),()=>W3(o.x,.1,o.z),.32,()=>tone(700+Math.random()*400,.04,'triangle',0,.05)),k*45);
 o.done();sfx.build();stars(o.x,.5,o.z,26,4.5);fxAt(o.x,1.5,o.z,'Built! 🎉');save();offerCur=null;$('buy').hidden=true;HC['bbtndisabled']=null};
