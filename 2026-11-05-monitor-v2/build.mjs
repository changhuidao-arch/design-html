import {build} from '../../node_modules/esbuild/lib/main.js';
import {writeFile,readFile} from 'node:fs/promises';
const root=new URL('.',import.meta.url).pathname.slice(1);
const result=await build({entryPoints:[root+'src/client.jsx'],bundle:true,platform:'browser',format:'cjs',target:'es2022',external:['react','react-dom','react/jsx-runtime'],loader:{'.css':'text'},jsx:'automatic',write:false});
await writeFile(root+'plugin.js',`window.__ModuleLoader__.load({id:'dsh-multica-monitor-v2',factory:(require)=>{var module={exports:{}};var exports=module.exports;\n${result.outputFiles[0].text}\nreturn module.exports;}});`);
await build({entryPoints:[root+'boot.jsx'],outfile:root+'boot.js',bundle:true,platform:'browser',format:'iife',minify:true,jsx:'automatic',define:{'process.env.NODE_ENV':'"production"'}});
console.log('Built independent full v2 static UI');
