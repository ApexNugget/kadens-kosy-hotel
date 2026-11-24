/* engine: fade the loading screen away once the first picture is drawn, and fade softly when leaving a page */
(function(){const L=document.getElementById('loader');
 const done=()=>{if(!L||L.classList.contains('gone'))return;L.classList.add('gone');setTimeout(()=>L.remove(),600)};
 const fonts=document.fonts&&document.fonts.ready?Promise.race([document.fonts.ready,new Promise(r=>setTimeout(r,1500))]):Promise.resolve();
 fonts.then(()=>requestAnimationFrame(()=>requestAnimationFrame(done)));setTimeout(done,4000);
 addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('a[href]');if(!a||e.defaultPrevented||a.target||a.hasAttribute('download'))return;
  const u=new URL(a.href,location.href);if(u.origin!==location.origin||!/(\.html|\/)$/.test(u.pathname))return;
  e.preventDefault();document.documentElement.classList.add('leaving');setTimeout(()=>{location.href=a.href},260)});
 addEventListener('pageshow',e=>{if(e.persisted)document.documentElement.classList.remove('leaving')})})();