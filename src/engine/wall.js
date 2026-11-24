/* engine: de-duplicated wall lines (stops overlapping walls flickering) */
function wall(x1,z1,x2,z2,key='plank:#e8d9a8',h=1.6){const horiz=x2-x1>=z2-z1,c=horiz?(z1+z2)/2:(x1+x2)/2;
 let segs=[[horiz?x1:z1,horiz?x2:z2]];
 for(const L of LINES)if(L.horiz===horiz&&Math.abs(L.c-c)<.2)segs=segs.flatMap(([a,b])=>{if(L.b<=a||L.a>=b)return[[a,b]];const o=[];if(L.a>a)o.push([a,L.a]);if(L.b<b)o.push([L.b,b]);return o});
 LINES.push({horiz,c,a:horiz?x1:z1,b:horiz?x2:z2});
 h+=(LINES.length%5)*.006;// tiny height differences so corner tops never flicker
 segs.filter(([a,b])=>b-a>.05).forEach(([a,b])=>{const len=b-a,cx=horiz?(a+b)/2:c,cz=horiz?c:(a+b)/2,w=horiz?len:.3,d=horiz?.3:len;
  box(w,h,d,tm(key,len/1.2,h/1.2),cx,h/2,cz);C.push({x1:cx-w/2,x2:cx+w/2,z1:cz-d/2,z2:cz+d/2,on:true})})}
