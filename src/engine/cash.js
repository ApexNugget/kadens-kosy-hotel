/* engine: picking up cash piles. Small piles come in a few bills at a time;
   a big pile (the label turns gold) comes in all at once as a jackpot swirl */
function jackpotAt(){return 30}
function cashLabel(l,v){const big=v>=jackpotAt();setLabel(l,(big?'💰 $':'$')+v,big?'#ffd23f':undefined)}
function grabPile(get,set,px,pz,draw){const v=get();if(v<=0)return;const close=near(px,pz,1.5);if(!(boost.magnet>0||close))return;
 if(v>=jackpotAt()){set(0);draw();jackpot(v,px,pz);return}
 if(pileT<=.07)return;pileT=0;const n=Math.min(v,Math.max(1,Math.ceil(v/10)));set(v-n);draw();
 fly(billGeo,billMat,W3(px,.5,pz),backTop,boost.magnet>0&&!close?.7:.38,()=>{G.coins+=n;stat('cash',n);bump=1;sfx.cash()})}
function jackpot(v,px,pz){const N=Math.max(8,Math.min(24,Math.ceil(v/6))),each=Math.floor(v/N);let landed=0;
 tone(1046,.08,'square',0,.06);tone(1568,.12,'square',.07,.06);
 for(let k=0;k<N;k++){const share=k===N-1?v-each*(N-1):each;
  fly(billGeo,billMat,W3(px+(Math.random()-.5)*.7,.35+Math.random()*.4,pz+(Math.random()-.5)*.7),backTop,.5+Math.random()*.3,()=>{
    G.coins+=share;stat('cash',share);bump=1.6;landed++;tone(620+landed*40,.05,'square',0,.035);
    if(landed===N){sfx.level();const P=player.position;stars(P.x,1.6,P.z,40,5);
     v3.set(P.x,2.9,P.z).project(cam);const d=document.createElement('div');d.className='fx big jack';d.textContent='+$'+v+'! 💰';
     d.style.left=((v3.x+1)/2*innerWidth)+'px';d.style.top=((1-v3.y)/2*innerHeight)+'px';document.body.appendChild(d);setTimeout(()=>d.remove(),2000)}},
   {delay:k*.035,h:1.8+Math.random()*1.6,side:(Math.random()-.5)*3})}}
