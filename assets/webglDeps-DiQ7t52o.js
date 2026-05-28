import{AI as d,xI as l,Ff as m,I9 as b,Gt as x,bo as y,sd as F}from"./index-DbhcC6ny.js";import{e as j}from"./ShaderCompiler-G2XYGDs6.js";import{e as I}from"./ProgramTemplate-BhpUj-w-.js";function c(r){const{options:e,value:n}=r;return typeof e[n]=="number"}function p(r){let e="";for(const n in r){const o=r[n];if(typeof o=="boolean")o&&(e+=`#define ${n}
`);else if(typeof o=="number")e+=`#define ${n} ${o.toFixed()}
`;else if(typeof o=="object")if(c(o)){const{value:t,options:f,namespace:s}=o,a=s?`${s}_`:"";for(const i in f)e+=`#define ${a}${i} ${f[i].toFixed()}
`;e+=`#define ${n} ${a}${t}
`}else{const t=o.options;let f=0;for(const s in t)e+=`#define ${t[s]} ${(f++).toFixed()}
`;e+=`#define ${n} ${t[o.value]}
`}}return e}export{d as BufferObject,l as FramebufferObject,m as Program,b as ProgramCache,x as Renderbuffer,j as ShaderCompiler,y as Texture,F as VertexArrayObject,I as createProgram,p as glslifyDefineMap};
