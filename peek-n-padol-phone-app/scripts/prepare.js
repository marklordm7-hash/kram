// Downloads three.js r128 next to index.html so the app works fully offline,
// then points index.html at the local copy. Needs Node 18+ (global fetch).
const fs=require("fs"),path=require("path");
const url="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
const www=path.join(__dirname,"..","www"),out=path.join(www,"three.min.js"),page=path.join(www,"index.html");
(async()=>{
  if(!fs.existsSync(out)){
    const r=await fetch(url);if(!r.ok)throw new Error("three.js download failed: "+r.status);
    fs.writeFileSync(out,Buffer.from(await r.arrayBuffer()));console.log("downloaded three.min.js");
  }
  let h=fs.readFileSync(page,"utf8");
  if(h.includes(url)){h=h.replace(url,"three.min.js");fs.writeFileSync(page,h);console.log("index.html now uses the local three.min.js")}
  const swp=path.join(www,"sw.js");let sw=fs.readFileSync(swp,"utf8");
  if(!sw.includes("three.min.js")){sw=sw.replace('"./manifest.webmanifest",','"./manifest.webmanifest","./three.min.js",');fs.writeFileSync(swp,sw)}
})().catch(e=>{console.error(e.message);process.exit(1)});
