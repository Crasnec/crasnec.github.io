const e=e=>typeof e==`object`&&!!e&&!Array.isArray(e),t=e=>Array.isArray(e),n=e=>typeof e==`number`&&Number.isSafeInteger(e)&&e>=0;function r(e){if(!t(e)||e.length>50)return;let n=[];for(let t of e){if(typeof t!=`string`||!t.trim()||t.length>2048||/[\r\n\0]/u.test(t)||n.includes(t))return;n.push(t)}return n}function i(t){if(!(!e(t)||t.type!==`input`||!n(t.id)||t.value!==null&&(typeof t.value!=`string`||t.value.length>16e3)))return{type:`input`,id:t.id,value:t.value}}function a(t){if(!e(t)||typeof t.code!=`string`||t.code.length>1e5||!(t.port instanceof MessagePort)||typeof t.assets!=`string`||t.runtime!==`javascript`&&t.runtime!==`typescript`&&t.runtime!==`python`||t.persistent!==void 0&&typeof t.persistent!=`boolean`)return;let n=r(t.pythonPackages);if(!(!n||t.runtime!==`python`&&(n.length>0||t.persistent===!0)))return{code:t.code,runtime:t.runtime,port:t.port,assets:t.assets,pythonPackages:n,...typeof t.persistent==`boolean`?{persistent:t.persistent}:{}}}function o(e,t){let n=0,r;return e.addEventListener(`message`,e=>{let t=i(e.data);if(!t||r?.id!==t.id)return;let{resolve:n}=r;r=void 0,n(t.value)}),e.start(),(e=``)=>r?Promise.reject(/* @__PURE__ */ Error(`Wait for the previous input before requesting another line`)):new Promise(i=>{let a=++n;r={id:a,resolve:i},t({type:`input`,id:a,prompt:String(e).slice(0,1e3)})})}String.raw`
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
`;function s(e){if(typeof e==`string`)return e;if(e instanceof Error)return`${e.name}: ${e.message}`;if(typeof e!=`object`||!e)return String(e);let t=/* @__PURE__ */ new WeakSet;try{return JSON.stringify(e,(e,n)=>{if(typeof n==`bigint`)return`${String(n)}n`;if(typeof n==`object`&&n){if(t.has(n))return`[Circular]`;t.add(n)}return n},2)??`[Unserializable object]`}catch{return`[Unserializable object]`}}function c(e){let t=0,n=0,r=0,i=0;return a=>{if(a.type===`output`&&(t+=a.text.length,++n>500||t>64e3))throw Error(`Output limit exceeded (500 messages / 64 KB)`);if(a.type===`plot`){if(i+=a.png.byteLength,++r>8||a.png.byteLength>4e6||i>16e6)throw Error(`Plot limit exceeded (8 images / 4 MB each / 16 MB total)`);e.postMessage(a,[a.png])}else e.postMessage(a)}}self.addEventListener(`message`,e=>{let t=a(e.data);t&&l(t)},{once:!0});async function l(e){let t=c(e.port);Object.assign(globalThis,{input:o(e.port,t)});for(let e of[`log`,`info`,`debug`,`warn`,`error`])console[e]=(...n)=>{t({type:`output`,level:e===`warn`||e===`error`?e:`log`,text:n.map(s).join(` `)})};self.addEventListener(`unhandledrejection`,e=>{e.preventDefault(),t({type:`error`,text:s(e.reason)})}),self.addEventListener(`error`,e=>{e.preventDefault(),t({type:`error`,text:e.message})});let n;try{let r=e.runtime===`typescript`?(await import(`./transpile-DYCkqLjF.js`)).transpileTypeScript(e.code):e.code;/\b(?:import|export)\b/u.test(r)&&(r=(await import(`./module-imports-D5dR6SjT.js`)).rewriteModuleImports(r)),t({type:`ready`}),n=URL.createObjectURL(new Blob([r],{type:`text/javascript`})),await import(
/* @vite-ignore */
n),t({type:`done`})}catch(e){t({type:`error`,text:e instanceof Error?`${e.name}: ${e.message}`:String(e)})}finally{n&&URL.revokeObjectURL(n)}}