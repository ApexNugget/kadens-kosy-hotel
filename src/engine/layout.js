/* engine: keep the hint, goals and the ☰ panel tidy under the top bar */
function layoutHud(){const hb=Math.round(document.querySelector('.hud').getBoundingClientRect().bottom),g=document.getElementById('goals'),h=document.getElementById('hint'),mp=document.getElementById('morep');
 put('goals',(hb+8)+'px','top');if(mp)put('morep',(hb+8)+'px','top');
 // the hint sits centred between the goals and the right edge; if that's too narrow it drops below the goals
 const gr=g?g.getBoundingClientRect():{right:0,bottom:hb},side=Math.round(gr.right+10),room=innerWidth-2*side;
 if(room>=260){put('hint',side+'px','left');put('hint',side+'px','right');put('hint',(hb+8)+'px','top')}
 else{put('hint','10px','left');put('hint','10px','right');put('hint',Math.round(Math.max(hb,gr.bottom)+8)+'px','top')}}
function setupMore(){const b=document.getElementById('more'),p=document.getElementById('morep');if(!b||!p)return;
 b.onclick=e=>{e.stopPropagation();p.hidden=!p.hidden;layoutHud()};
 addEventListener('pointerdown',e=>{if(!p.hidden&&!p.contains(e.target)&&e.target!==b)p.hidden=true},true)}
setupMore();