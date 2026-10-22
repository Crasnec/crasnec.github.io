function e(e,t){let n=0,r;return e.addEventListener(`message`,e=>{let t=e.data;if(t.type!==`input`||r?.id!==t.id||t.value!==null&&(typeof t.value!=`string`||t.value.length>16e3))return;let{resolve:n}=r;r=void 0,n(t.value)}),e.start(),(e=``)=>r?Promise.reject(/* @__PURE__ */ Error(`Wait for the previous input before requesting another line`)):new Promise(i=>{let a=++n;r={id:a,resolve:i},t({type:`input`,id:a,prompt:String(e).slice(0,1e3)})})}String.raw`
import builtins as __pg_builtins
from pyodide.ffi import run_sync as __pg_run_sync, can_run_sync as __pg_can_run_sync, jsnull as __pg_jsnull
from _playground import request_input as __pg_request_input, input_unsupported as __pg_input_unsupported

async def read_input(prompt=""):
    value = await __pg_request_input(str(prompt))
    if value is None or value is __pg_jsnull:
        raise EOFError("EOF when reading a line")
    return value

def __pg_input(prompt=""):
    if not __pg_can_run_sync():
        raise RuntimeError(__pg_input_unsupported)
    return __pg_run_sync(read_input(prompt))

__pg_builtins.input = __pg_input
`;function t(e){if(typeof e==`string`)return e;if(e instanceof Error)return`${e.name}: ${e.message}`;if(typeof e!=`object`||!e)return String(e);let t=/* @__PURE__ */ new WeakSet;try{return JSON.stringify(e,(e,n)=>{if(typeof n==`bigint`)return`${String(n)}n`;if(typeof n==`object`&&n){if(t.has(n))return`[Circular]`;t.add(n)}return n},2)??`[Unserializable object]`}catch{return`[Unserializable object]`}}function n(e){let t=0,n=0,r=0,i=0;return a=>{if(a.type===`output`&&(t+=a.text.length,++n>500||t>64e3))throw Error(`Output limit exceeded (500 messages / 64 KB)`);if(a.type===`plot`){if(i+=a.png.byteLength,++r>8||a.png.byteLength>4e6||i>16e6)throw Error(`Plot limit exceeded (8 images / 4 MB each / 16 MB total)`);e.postMessage(a,[a.png])}else e.postMessage(a)}}self.addEventListener(`message`,e=>{r(e.data)},{once:!0});async function r(r){let i=n(r.port);Object.assign(globalThis,{input:e(r.port,i)});for(let e of[`log`,`info`,`debug`,`warn`,`error`])console[e]=(...n)=>{i({type:`output`,level:e===`warn`||e===`error`?e:`log`,text:n.map(t).join(` `)})};self.addEventListener(`unhandledrejection`,e=>{e.preventDefault(),i({type:`error`,text:t(e.reason)})}),self.addEventListener(`error`,e=>{e.preventDefault(),i({type:`error`,text:e.message})});let a;try{let e=r.runtime===`typescript`?(await import(`./transpile-DYCkqLjF.js`)).transpileTypeScript(r.code):r.code;/\b(?:import|export)\b/u.test(e)&&(e=(await import(`./module-imports-D5dR6SjT.js`)).rewriteModuleImports(e)),i({type:`ready`}),a=URL.createObjectURL(new Blob([e],{type:`text/javascript`})),await import(
/* @vite-ignore */
a),i({type:`done`})}catch(e){i({type:`error`,text:e instanceof Error?`${e.name}: ${e.message}`:String(e)})}finally{a&&URL.revokeObjectURL(a)}}