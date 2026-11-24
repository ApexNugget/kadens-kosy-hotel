/* engine: tiny Web Audio beeps and jingles (respects G.mute) */
let ac=null;
function tone(f,d=.12,type='sine',when=0,vol=.14){if(G.mute)return;try{ac=ac||new (window.AudioContext||window.webkitAudioContext)();
 const o=ac.createOscillator(),g=ac.createGain(),t=ac.currentTime+when;o.type=type;o.frequency.setValueAtTime(f,t);
 g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g).connect(ac.destination);o.start(t);o.stop(t+d)}catch(e){}}
const sfx={cash:()=>tone(1200+Math.random()*300,.05,'square',0,.04),ding:()=>{tone(1175,.3);tone(1568,.3,'sine',.1)},
 pop:()=>tone(700,.07,'triangle'),clean:()=>{tone(784,.1);tone(1047,.1,'sine',.08);tone(1319,.18,'sine',.16)},
 sad:()=>{tone(330,.15,'triangle');tone(247,.25,'triangle',.12)},build:()=>{[523,659,784,1047].forEach((f,i)=>tone(f,.18,'triangle',i*.09))},
 level:()=>{[523,659,784,1047,1319,1568].forEach((f,i)=>tone(f,.2,'square',i*.08,.07))},no:()=>tone(180,.15,'sawtooth',0,.08),
 pu:()=>{[880,1109,1319,1760].forEach((f,i)=>tone(f,.1,'square',i*.05,.06))}};
