/* engine: picture maths questions for power-ups */
let mq=null;const THINGS=['🍎','⭐','🐶','🍪','🎈','🐟','🍓','🚗'];
function newQ(){const it=pick(THINGS),r=(a,b)=>a+Math.floor(Math.random()*(b-a+1));let ans,pics,q;
 if(Math.random()<.3){ans=r(2,8);pics=`<span>${it.repeat(ans)}</span>`;q='How many?'}
 else{const a=r(1,5),b=r(1,5);ans=a+b;pics=`<span>${it.repeat(a)}</span> + <span>${it.repeat(b)}</span>`;q=`${a} + ${b} = ?`}
 const opts=new Set([ans]);while(opts.size<3){const v=ans+pick([-2,-1,1,2]);if(v>=1&&v<=10)opts.add(v)}
 mq={ans};$('pics').innerHTML=pics;$('q').textContent=q;$('mres').textContent='';
 $('ans').innerHTML=[...opts].sort(()=>Math.random()-.5).map(v=>`<button class="btn" data-v="${v}">${v}</button>`).join('')}
