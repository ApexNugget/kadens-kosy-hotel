/* engine: manager menu helpers */
function perkState(p){const l=p.get()||0;if(l>=p.names.length)return{max:1,l};
 return{l,cost:p.costs[l],name:p.names[l],lock:p.rest&&!G.rest?'Needs the restaurant':level()<p.lvs[l]?'Level '+p.lvs[l]:''}}
let tab='staff';const stars3=l=>'★'.repeat(l)+'☆'.repeat(3-l);
