import { mkdir, copyFile, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
const root=process.cwd();const out=join(root,'www');await mkdir(out,{recursive:true});
for(const name of ['index.html','manifest.webmanifest','icon.svg']) await copyFile(join(root,name),join(out,name));
let html=await readFile(join(out,'index.html'),'utf8');
// Service workers are only useful for the hosted PWA, not the packaged mobile WebView.
html=html.replace(/<script>if\('serviceWorker' in navigator\)[\s\S]*?<\/script><\/body><\/html>/, '</body></html>');
// Keep packaged app navigation within the local webview; product links remain external Amazon links.
await writeFile(join(out,'index.html'),html);
console.log('SHOPIZ mobile web assets prepared in www/');
