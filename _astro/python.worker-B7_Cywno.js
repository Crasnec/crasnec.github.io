function e(e){return JSON.parse(e)}var t={numpy:`NumPy`,pandas:`pandas`,scipy:`SciPy`,matplotlib:`Matplotlib`,seaborn:`Seaborn`};const n=e=>Object.hasOwn(t,e);function r(e){let t=0,n=0,r=0,i=0;return a=>{if(a.type===`output`&&(t+=a.text.length,++n>500||t>64e3))throw Error(`Output limit exceeded (500 messages / 64 KB)`);if(a.type===`plot`){if(i+=a.png.byteLength,++r>8||a.png.byteLength>4e6||i>16e6)throw Error(`Plot limit exceeded (8 images / 4 MB each / 16 MB total)`);e.postMessage(a,[a.png])}else e.postMessage(a)}}function i(e){if(typeof e!=`string`||e.length>5333336)throw Error(`Plot exceeds the 4 MB image limit`);let t=atob(e),n=new Uint8Array(t.length);for(let e=0;e<t.length;e++)n[e]=t.charCodeAt(e);if(n.byteLength>4e6||![137,80,78,71,13,10,26,10].every((e,t)=>n[t]===e))throw Error(`Plot output must be a PNG image`);return n.buffer}self.addEventListener(`message`,e=>{a(e.data)},{once:!0});async function a(t){let a=r(t.port);try{let{loadPyodide:r}=await import(
/* @vite-ignore */
new URL(`pyodide.mjs`,t.assets).href),o=await r({indexURL:t.assets,packageBaseUrl:t.assets,stdin:()=>{throw Error(`Interactive input is unavailable; provide input in your code`)},stdout:e=>{a({type:`output`,level:`log`,text:e})},stderr:e=>{a({type:`output`,level:`error`,text:e})}});o.registerJsModule(`_playground`,{source:t.code,emit_png:(e,t)=>{a({type:`plot`,png:i(e),alt:typeof t==`string`?t.slice(0,300):`Matplotlib figure`})},emit_warning:e=>{a({type:`output`,level:`warn`,text:e})}}),o.runPython(`
import warnings as __pg_warnings
from _playground import emit_warning as __pg_emit_warning

def __pg_showwarning(message, category, filename, lineno, file=None, line=None):
    __pg_emit_warning(__pg_warnings.formatwarning(message, category, filename, lineno, line))

__pg_warnings.showwarning = __pg_showwarning
`);let s=e(o.runPython(`import json as __pg_json
from _playground import source as __pg_source
from pyodide.code import find_imports as __pg_find_imports
__pg_json.dumps(__pg_find_imports(__pg_source))`)),c=new Set(t.pythonPackages);if(!Array.isArray(s))throw Error(`Could not inspect Python imports`);for(let e of s)typeof e==`string`&&n(e)&&c.add(e);c.size&&(a({type:`status`,text:`Loading ${[...c].join(`, `)}…`}),await o.loadPackage([...c],{checkIntegrity:!0,messageCallback:e=>{a({type:`status`,text:e})},errorCallback:e=>{a({type:`output`,level:`warn`,text:e})}}));let l=c.has(`matplotlib`)||c.has(`seaborn`);l&&o.runPython(`
import base64 as __pg_base64
import io as __pg_io
import matplotlib as __pg_mpl
__pg_mpl.use("Agg", force=True)
__pg_mpl.rcParams["figure.dpi"] = 120
import matplotlib.pyplot as __pg_plt
from _playground import emit_png as __playground_emit_png

def __playground_flush_plots(*args, **kwargs):
    for number in __pg_plt.get_fignums():
        figure = __pg_plt.figure(number)
        buffer = __pg_io.BytesIO()
        with __pg_warnings.catch_warnings(record=True) as notices:
            figure.savefig(buffer, format="png", dpi="figure")
        title = figure.get_suptitle() or next((axis.get_title() for axis in figure.axes if axis.get_title()), "Matplotlib figure")
        __playground_emit_png(__pg_base64.b64encode(buffer.getvalue()).decode("ascii"), title)
        __pg_plt.close(figure)
        for notice in notices:
            __pg_showwarning(notice.message, notice.category, notice.filename, notice.lineno)

__pg_plt.show = __playground_flush_plots
`),a({type:`ready`}),await o.runPythonAsync(t.code),l&&o.runPython(`__playground_flush_plots()`),a({type:`done`})}catch(e){a({type:`error`,text:e instanceof Error?e.message:String(e)})}}