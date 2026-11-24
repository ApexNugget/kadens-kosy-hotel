/* engine: keep saves safe and let the games work offline */
try{if(navigator.storage&&navigator.storage.persist)navigator.storage.persisted().then(p=>p||navigator.storage.persist()).catch(()=>{})}catch(e){}
try{if('serviceWorker' in navigator&&(location.protocol==='https:'||location.hostname==='localhost')&&!/claude|anthropic/.test(location.hostname))navigator.serviceWorker.register('sw.js').catch(()=>{})}catch(e){}
