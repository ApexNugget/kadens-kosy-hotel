/* engine: main animation loop and resize */
function frame(now){const dt=Math.min(.05,(now-last)/1000);last=now;if(running)step(dt);renderer.render(scene,cam);requestAnimationFrame(frame)}
function resize(){renderer.setSize(innerWidth,innerHeight,false);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()}
addEventListener('resize',resize);resize();
