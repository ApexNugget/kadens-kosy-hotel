/* engine: only touch the DOM when a value changes */
const HC={};function put(id,v,prop='textContent'){if(HC[id+prop]===v)return false;HC[id+prop]=v;if(prop==='width'||prop==='top')$(id).style[prop]=v;else $(id)[prop]=v;return true}
