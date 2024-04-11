(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function i(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(n){if(n.ep)return;n.ep=!0;const o=i(n);fetch(n.href,o)}})();class re{constructor(t,i,r){this._gl=t,this._program=this._gl.createProgram(),this._program||console.error("failed to creat a program.");const n=this.compileShader(this._gl.VERTEX_SHADER,i),o=this.compileShader(this._gl.FRAGMENT_SHADER,r);this._gl.attachShader(this._program,n),this._gl.attachShader(this._program,o),this._gl.linkProgram(this._program),t.getProgramParameter(this._program,t.LINK_STATUS)||console.error(t.getProgramInfoLog(this._program))}use(){this._gl.useProgram(this._program)}get id(){return this._program}compileShader(t,i){const r=this._gl.createShader(t);if(!r)return console.error(`failed to creat a shader type ${t}.`);if(this._gl.shaderSource(r,i),this._gl.compileShader(r),this._gl.getShaderParameter(r,this._gl.COMPILE_STATUS))return r;console.log(this._gl.getShaderInfoLog(r))}}class ye{constructor(t,i){this._canvas=document.getElementById("canvas"),this._canvas.width=t,this._canvas.height=i,this._gl=this._canvas.getContext("webgl2"),this._gl&&(this._gl.viewport(0,0,t,i),this._gl.enable(this._gl.DEPTH_TEST),this._gl.cullFace(this._gl.BACK),this._gl.enable(this._gl.CULL_FACE))}clear(){this._gl&&(this._gl.clearColor(0,0,0,1),this._gl.clear(this._gl.DEPTH_BUFFER_BIT|this._gl.COLOR_BUFFER_BIT))}get gl(){return this._gl}}class oe{constructor(t){this._gl=t,this._VAO=null,this._IBO=null,this._VBO=null,this._indexCount=0,this._vertices=[],this._indices=[]}initialise(){this._indexCount=this._indices.length;const t=[];for(let i=0;i<this._vertices.length;i++){const{position:r,normal:n,tangent:o,texCoord:s}=this._vertices[i];t.push(...r,...n,...o,...s)}this._VAO=this._gl.createVertexArray(),this._gl.bindVertexArray(this._VAO),this._IBO=this._gl.createBuffer(),this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER,this._IBO),this._gl.bufferData(this._gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(this._indices),this._gl.STATIC_DRAW),this._VBO=this._gl.createBuffer(),this._gl.bindBuffer(this._gl.ARRAY_BUFFER,this._VBO),this._gl.bufferData(this._gl.ARRAY_BUFFER,new Float32Array(t),this._gl.STATIC_DRAW),this._gl.vertexAttribPointer(0,3,this._gl.FLOAT,!1,4*11,0),this._gl.enableVertexAttribArray(0),this._gl.vertexAttribPointer(1,3,this._gl.FLOAT,!1,4*11,4*3),this._gl.enableVertexAttribArray(1),this._gl.vertexAttribPointer(2,3,this._gl.FLOAT,!1,4*11,4*6),this._gl.enableVertexAttribArray(2),this._gl.vertexAttribPointer(3,2,this._gl.FLOAT,!1,4*11,4*9),this._gl.enableVertexAttribArray(3),this._gl.bindBuffer(this._gl.ARRAY_BUFFER,null),this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER,null),this._gl.bindVertexArray(null)}draw(){this._gl.bindVertexArray(this._VAO),this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER,this._IBO),this._gl.drawElements(this._gl.TRIANGLES,this._indexCount,this._gl.UNSIGNED_SHORT,0),this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER,null),this._gl.bindVertexArray(null)}}const z=1e-6;let x=typeof Float32Array<"u"?Float32Array:Array;const we=Math.PI/180;function j(e){return e*we}function Me(){let e=new x(9);return x!=Float32Array&&(e[1]=0,e[2]=0,e[3]=0,e[5]=0,e[6]=0,e[7]=0),e[0]=1,e[4]=1,e[8]=1,e}function A(){let e=new x(16);return x!=Float32Array&&(e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0),e[0]=1,e[5]=1,e[10]=1,e[15]=1,e}function Ae(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function ee(e,t,i,r){let n=r[0],o=r[1],s=r[2],a=Math.sqrt(n*n+o*o+s*s),l,g,c,_,h,m,f,v,p,M,T,y,R,P,C,F,N,D,S,B,V,X,O,G;return a<z?null:(a=1/a,n*=a,o*=a,s*=a,l=Math.sin(i),g=Math.cos(i),c=1-g,_=t[0],h=t[1],m=t[2],f=t[3],v=t[4],p=t[5],M=t[6],T=t[7],y=t[8],R=t[9],P=t[10],C=t[11],F=n*n*c+g,N=o*n*c+s*l,D=s*n*c-o*l,S=n*o*c-s*l,B=o*o*c+g,V=s*o*c+n*l,X=n*s*c+o*l,O=o*s*c-n*l,G=s*s*c+g,e[0]=_*F+v*N+y*D,e[1]=h*F+p*N+R*D,e[2]=m*F+M*N+P*D,e[3]=f*F+T*N+C*D,e[4]=_*S+v*B+y*V,e[5]=h*S+p*B+R*V,e[6]=m*S+M*B+P*V,e[7]=f*S+T*B+C*V,e[8]=_*X+v*O+y*G,e[9]=h*X+p*O+R*G,e[10]=m*X+M*O+P*G,e[11]=f*X+T*O+C*G,t!==e&&(e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e)}function Re(e,t,i){let r=Math.sin(i),n=Math.cos(i),o=t[4],s=t[5],a=t[6],l=t[7],g=t[8],c=t[9],_=t[10],h=t[11];return t!==e&&(e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[4]=o*n+g*r,e[5]=s*n+c*r,e[6]=a*n+_*r,e[7]=l*n+h*r,e[8]=g*n-o*r,e[9]=c*n-s*r,e[10]=_*n-a*r,e[11]=h*n-l*r,e}function se(e,t,i){let r=Math.sin(i),n=Math.cos(i),o=t[0],s=t[1],a=t[2],l=t[3],g=t[8],c=t[9],_=t[10],h=t[11];return t!==e&&(e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[0]=o*n-g*r,e[1]=s*n-c*r,e[2]=a*n-_*r,e[3]=l*n-h*r,e[8]=o*r+g*n,e[9]=s*r+c*n,e[10]=a*r+_*n,e[11]=l*r+h*n,e}function Pe(e,t,i){let r=Math.sin(i),n=Math.cos(i),o=t[0],s=t[1],a=t[2],l=t[3],g=t[4],c=t[5],_=t[6],h=t[7];return t!==e&&(e[8]=t[8],e[9]=t[9],e[10]=t[10],e[11]=t[11],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[0]=o*n+g*r,e[1]=s*n+c*r,e[2]=a*n+_*r,e[3]=l*n+h*r,e[4]=g*n-o*r,e[5]=c*n-s*r,e[6]=_*n-a*r,e[7]=h*n-l*r,e}function Ce(e,t,i,r,n){const o=1/Math.tan(t/2);if(e[0]=o/i,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=o,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=-1,e[12]=0,e[13]=0,e[15]=0,n!=null&&n!==1/0){const s=1/(r-n);e[10]=(n+r)*s,e[14]=2*n*r*s}else e[10]=-1,e[14]=-2*r;return e}const Le=Ce;function Ie(e,t,i,r){let n,o,s,a,l,g,c,_,h,m,f=t[0],v=t[1],p=t[2],M=r[0],T=r[1],y=r[2],R=i[0],P=i[1],C=i[2];return Math.abs(f-R)<z&&Math.abs(v-P)<z&&Math.abs(p-C)<z?Ae(e):(c=f-R,_=v-P,h=p-C,m=1/Math.sqrt(c*c+_*_+h*h),c*=m,_*=m,h*=m,n=T*h-y*_,o=y*c-M*h,s=M*_-T*c,m=Math.sqrt(n*n+o*o+s*s),m?(m=1/m,n*=m,o*=m,s*=m):(n=0,o=0,s=0),a=_*s-h*o,l=h*n-c*s,g=c*o-_*n,m=Math.sqrt(a*a+l*l+g*g),m?(m=1/m,a*=m,l*=m,g*=m):(a=0,l=0,g=0),e[0]=n,e[1]=a,e[2]=c,e[3]=0,e[4]=o,e[5]=l,e[6]=_,e[7]=0,e[8]=s,e[9]=g,e[10]=h,e[11]=0,e[12]=-(n*f+o*v+s*p),e[13]=-(a*f+l*v+g*p),e[14]=-(c*f+_*v+h*p),e[15]=1,e)}function E(){let e=new x(3);return x!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0),e}function Ue(e){let t=e[0],i=e[1],r=e[2];return Math.sqrt(t*t+i*i+r*r)}function u(e,t,i){let r=new x(3);return r[0]=e,r[1]=t,r[2]=i,r}function te(e,t,i){return e[0]=t[0]-i[0],e[1]=t[1]-i[1],e[2]=t[2]-i[2],e}function ae(e,t){let i=t[0],r=t[1],n=t[2],o=i*i+r*r+n*n;return o>0&&(o=1/Math.sqrt(o)),e[0]=t[0]*o,e[1]=t[1]*o,e[2]=t[2]*o,e}function Fe(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]}function Y(e,t,i){let r=t[0],n=t[1],o=t[2],s=i[0],a=i[1],l=i[2];return e[0]=n*l-o*a,e[1]=o*s-r*l,e[2]=r*a-n*s,e}function I(e,t,i){let r=t[0],n=t[1],o=t[2],s=i[3]*r+i[7]*n+i[11]*o+i[15];return s=s||1,e[0]=(i[0]*r+i[4]*n+i[8]*o+i[12])/s,e[1]=(i[1]*r+i[5]*n+i[9]*o+i[13])/s,e[2]=(i[2]*r+i[6]*n+i[10]*o+i[14])/s,e}const Ne=Ue;(function(){let e=E();return function(t,i,r,n,o,s){let a,l;for(i||(i=3),r||(r=0),n?l=Math.min(n*i+r,t.length):l=t.length,a=r;a<l;a+=i)e[0]=t[a],e[1]=t[a+1],e[2]=t[a+2],o(e,e,s),t[a]=e[0],t[a+1]=e[1],t[a+2]=e[2];return t}})();function De(){let e=new x(4);return x!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0,e[3]=0),e}function Se(e,t){let i=t[0],r=t[1],n=t[2],o=t[3],s=i*i+r*r+n*n+o*o;return s>0&&(s=1/Math.sqrt(s)),e[0]=i*s,e[1]=r*s,e[2]=n*s,e[3]=o*s,e}(function(){let e=De();return function(t,i,r,n,o,s){let a,l;for(i||(i=4),r||(r=0),n?l=Math.min(n*i+r,t.length):l=t.length,a=r;a<l;a+=i)e[0]=t[a],e[1]=t[a+1],e[2]=t[a+2],e[3]=t[a+3],o(e,e,s),t[a]=e[0],t[a+1]=e[1],t[a+2]=e[2],t[a+3]=e[3];return t}})();function ie(){let e=new x(4);return x!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0),e[3]=1,e}function Be(e,t,i){i=i*.5;let r=Math.sin(i);return e[0]=r*t[0],e[1]=r*t[1],e[2]=r*t[2],e[3]=Math.cos(i),e}function H(e,t,i,r){let n=t[0],o=t[1],s=t[2],a=t[3],l=i[0],g=i[1],c=i[2],_=i[3],h,m,f,v,p;return m=n*l+o*g+s*c+a*_,m<0&&(m=-m,l=-l,g=-g,c=-c,_=-_),1-m>z?(h=Math.acos(m),f=Math.sin(h),v=Math.sin((1-r)*h)/f,p=Math.sin(r*h)/f):(v=1-r,p=r),e[0]=v*n+p*l,e[1]=v*o+p*g,e[2]=v*s+p*c,e[3]=v*a+p*_,e}function Ve(e,t){let i=t[0]+t[4]+t[8],r;if(i>0)r=Math.sqrt(i+1),e[3]=.5*r,r=.5/r,e[0]=(t[5]-t[7])*r,e[1]=(t[6]-t[2])*r,e[2]=(t[1]-t[3])*r;else{let n=0;t[4]>t[0]&&(n=1),t[8]>t[n*3+n]&&(n=2);let o=(n+1)%3,s=(n+2)%3;r=Math.sqrt(t[n*3+n]-t[o*3+o]-t[s*3+s]+1),e[n]=.5*r,r=.5/r,e[3]=(t[o*3+s]-t[s*3+o])*r,e[o]=(t[o*3+n]+t[n*3+o])*r,e[s]=(t[s*3+n]+t[n*3+s])*r}return e}const le=Se;(function(){let e=E(),t=u(1,0,0),i=u(0,1,0);return function(r,n,o){let s=Fe(n,o);return s<-.999999?(Y(e,t,n),Ne(e)<1e-6&&Y(e,i,n),ae(e,e),Be(r,e,Math.PI),r):s>.999999?(r[0]=0,r[1]=0,r[2]=0,r[3]=1,r):(Y(e,n,o),r[0]=e[0],r[1]=e[1],r[2]=e[2],r[3]=1+s,le(r,r))}})();(function(){let e=ie(),t=ie();return function(i,r,n,o,s,a){return H(e,r,s,a),H(t,n,o,a),H(i,e,t,2*a*(1-a)),i}})();(function(){let e=Me();return function(t,i,r,n){return e[0]=r[0],e[3]=r[1],e[6]=r[2],e[1]=n[0],e[4]=n[1],e[7]=n[2],e[2]=-i[0],e[5]=-i[1],e[8]=-i[2],le(t,Ve(t,e))}})();function $(){let e=new x(2);return x!=Float32Array&&(e[0]=0,e[1]=0),e}function w(e,t){let i=new x(2);return i[0]=e,i[1]=t,i}function Xe(e,t,i){return e[0]=t[0]+i[0],e[1]=t[1]+i[1],e}function ne(e,t,i){return e[0]=t[0]-i[0],e[1]=t[1]-i[1],e}(function(){let e=$();return function(t,i,r,n,o,s){let a,l;for(i||(i=2),r||(r=0),n?l=Math.min(n*i+r,t.length):l=t.length,a=r;a<l;a+=i)e[0]=t[a],e[1]=t[a+1],o(e,e,s),t[a]=e[0],t[a+1]=e[1];return t}})();class Oe extends oe{constructor(t,i){super(t);const r=100,n=100,o=-2*Math.PI/r,s=-1*Math.PI/n;for(let a=0;a<=n;a++){const l=A();ee(l,A(),s*a,u(0,0,1));const g=E();I(g,u(0,-i,0),l);for(let c=0;c<=r;c++){const _=A();ee(_,A(),o*c,u(0,1,0));const h=E();I(h,g,_);const m=E();ae(m,h);const f=w(1-c/r,1-a/n);this._vertices.push({position:h,normal:m,texCoord:f,tangent:E()})}}for(let a=0;a<n;a++){const l=(r+1)*a;for(let g=0;g<r;g++){const c=l+g,_=l+g+1,h=l+(g+1)%(r+1)+(r+1),m=h-1;this._indices.push(c),this._indices.push(h),this._indices.push(_),this._indices.push(c),this._indices.push(m),this._indices.push(h);const f=this._vertices[c].position,v=this._vertices[_].position,p=this._vertices[h].position,M=this._vertices[m].position,T=this.calculateTangent(f,v,p,this._vertices[c].texCoord,this._vertices[_].texCoord,this._vertices[h].texCoord),y=this.calculateTangent(f,p,M,this._vertices[c].texCoord,this._vertices[h].texCoord,this._vertices[m].texCoord);this._vertices[c].tangent=T,this._vertices[_].tangent=T,this._vertices[h].tangent=T,this._vertices[c].tangent=y,this._vertices[h].tangent=y,this._vertices[m].tangent=y}}}calculateTangent(t,i,r,n,o,s){const a=E();te(a,i,t);const l=E();te(l,r,t);const g=$();ne(g,o,n);const c=$();ne(c,s,n);const _=1/(g[0]*c[1]-c[0]*g[1]),h=E();return h[0]=_*(c[1]*a[0]-g[1]*l[0]),h[1]=_*(c[1]*a[1]-g[1]*l[1]),h[2]=_*(c[1]*a[2]-g[1]*l[2]),h}}class L{constructor(t,i){this._gl=t,this._textureID=t.createTexture(),this._name=i}initialise(t){this._gl.bindTexture(this._gl.TEXTURE_2D,this._textureID),this._gl.texParameteri(this._gl.TEXTURE_2D,this._gl.TEXTURE_WRAP_S,this._gl.CLAMP_TO_EDGE),this._gl.texParameteri(this._gl.TEXTURE_2D,this._gl.TEXTURE_WRAP_T,this._gl.CLAMP_TO_EDGE),this._gl.texParameteri(this._gl.TEXTURE_2D,this._gl.TEXTURE_MIN_FILTER,this._gl.LINEAR),this._gl.texParameteri(this._gl.TEXTURE_2D,this._gl.TEXTURE_MAG_FILTER,this._gl.LINEAR),this._gl.texImage2D(this._gl.TEXTURE_2D,0,this._gl.RGB,this._gl.RGB,this._gl.UNSIGNED_BYTE,t),this._gl.bindTexture(this._gl.TEXTURE_2D,null)}use(t,i){this._gl.activeTexture(this._gl.TEXTURE0+i),this._gl.bindTexture(this._gl.TEXTURE_2D,this._textureID);const r=this._gl.getUniformLocation(t,this._name);this._gl.uniform1i(r,i)}}const Ge=`#version 300 es
precision mediump float;

out vec4 FragColor;
in vec2 TexCoord;
in vec3 posWorld;
in vec3 normalWorld;
in vec3 tangentWorld;

uniform vec3 camPos;
uniform vec3 lightPos;

// prevent collision with sampler2D and samplerCube
uniform sampler2D dummy1;
uniform sampler2D dummy2;

uniform sampler2D albedoMap;
uniform sampler2D normalMap;
uniform sampler2D metallicMap;
uniform sampler2D roughnessMap;
uniform sampler2D aoMap;
uniform sampler2D brdfLUT;

uniform samplerCube envCubemap;
uniform samplerCube irradianceCubemap;

const float PI = 3.14159265359;

float DistributionGGX(vec3 N, vec3 H, float roughness)
{
    float a = roughness*roughness;
    float a2 = a*a;
    float NdotH = max(dot(N, H), 0.0);
    float NdotH2 = NdotH*NdotH;

    float nom   = a2;
    float denom = (NdotH2 * (a2 - 1.0) + 1.0);
    denom = PI * denom * denom;

    return nom / denom;
}

float GeometrySchlickGGX(float NdotV, float roughness)
{
    float r = (roughness + 1.0);
    float k = (r*r) / 8.0;

    float nom   = NdotV;
    float denom = NdotV * (1.0 - k) + k;

    return nom / denom;
}

float GeometrySmith(vec3 N, vec3 V, vec3 L, float roughness)
{
    float NdotV = max(dot(N, V), 0.0);
    float NdotL = max(dot(N, L), 0.0);
    float ggx2 = GeometrySchlickGGX(NdotV, roughness);
    float ggx1 = GeometrySchlickGGX(NdotL, roughness);

    return ggx1 * ggx2;
}

vec3 fresnelSchlick(float cosTheta, vec3 F0)
{
    return F0 + (1.0 - F0) * pow(clamp(1.0 - cosTheta, 0.0, 1.0), 5.0);
}

vec3 fresnelSchlickRoughness(float cosTheta, vec3 F0, float roughness)
{
    return F0 + (max(vec3(1.0 - roughness), F0) - F0) * pow(clamp(1.0 - cosTheta, 0.0, 1.0), 5.0);
}

void main()
{
    // Apply gamma correction to the sampled albedo texture to convert it from sRGB space to linear space
    vec3 albedo = pow(texture(albedoMap, TexCoord).rgb, vec3(2.2));
    float metallic  = texture(metallicMap, TexCoord).r;
    float roughness = texture(roughnessMap, TexCoord).r;
    float ao = texture(aoMap, TexCoord).r;

    vec3 N = normalize(normalWorld);
    // Adjust the tangent vector to ensure it is perpendicular to the surface
    // by removing the component parallel to the normal vector.
    vec3 T = normalize(tangentWorld - dot(tangentWorld, N) * N);
    vec3 B = cross(N, T);
    mat3 TBN = mat3(T, B, N);
    N = normalize(TBN * (texture(normalMap, TexCoord).xyz * 2.0 - 1.0));

    vec3 V = normalize(camPos - posWorld);
    vec3 R = reflect(-V, N);

    vec3 lightRadiances = vec3(10.0);

    vec3 F0 = vec3(0.04);
    F0 = mix(F0, albedo, metallic);

    // use camPos instead of lightPos
    vec3 L = normalize(camPos - posWorld);
    vec3 H = normalize(V + L);
    float distance = length(camPos - posWorld);
    float attenuation = 1.0 / (distance * distance);
    vec3 radiance = lightRadiances * attenuation;

    vec3 F = fresnelSchlick(max(dot(H, V), 0.0), F0);
    float G = GeometrySmith(N, V, L, roughness);
    float NDF = DistributionGGX(N, H, roughness);

    vec3 numerator = NDF * G * F;
    // + 0.0001 to prevent divide by zero
    float denominator = 4.0 * max(dot(N, V), 0.0) * max(dot(N, L), 0.0) + 0.0001;
    vec3 specular = numerator / denominator;

    vec3 kS = F;

    vec3 kD = vec3(1.0) - kS;
    kD *= 1.0 - metallic;

    // scale light by NdotL
    float NdotL = max(dot(N, L), 0.0);

    vec3 directLight = (kD * albedo / PI + specular) * radiance * NdotL;

    // ambient lighting (we now use IBL as the ambient term)
    F = fresnelSchlickRoughness(max(dot(N, V), 0.0), F0, roughness);

    kS = F;
    kD = 1.0 - kS;
    kD *= 1.0 - metallic;

    // Apply gamma correction to the sampled irradianceCubemap texture to convert it from sRGB space to linear space
    vec3 irradiance = pow(texture(irradianceCubemap, N).rgb, vec3(2.2));
    vec3 diffuse = irradiance * albedo;

    // sample both the pre-filter map and the BRDF lut and combine them together as per the Split-Sum approximation to get the IBL specular part.
    const float MAX_REFLECTION_LOD = 4.0;
    // Apply gamma correction to the sampled envCubemap texture to convert it from sRGB space to linear space
    vec3 prefilteredColor = pow(textureLod(envCubemap, R,  roughness * MAX_REFLECTION_LOD).rgb, vec3(2.2));
    vec2 brdf  = texture(brdfLUT, vec2(max(dot(N, V), 0.0), roughness)).rg;
    specular = prefilteredColor * (F * brdf.x + brdf.y);

    vec3 ambient = (kD * diffuse + specular) * ao;

    vec3 color = directLight + ambient;

    // HDR tonemapping
    color = color / (color + vec3(1.0));
    // gamma correct
    color = pow(color, vec3(1.0/2.2));

    FragColor = vec4(color, 1.0);
}
`,ze=`#version 300 es
precision mediump float;

layout (location = 0) in vec3 pos;
layout (location = 1) in vec3 norm;
layout (location = 2) in vec3 tangent;
layout (location = 3) in vec2 tex;

out vec3 posWorld;
out vec3 normalWorld;
out vec3 tangentWorld;
out vec2 TexCoord;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

uniform sampler2D heightMap;

void main()
{
    // ignore scale
	normalWorld = normalize(mat3(transpose(inverse(model))) * norm);
	tangentWorld = normalize(model * vec4(tangent, 1.0)).xyz;
	TexCoord = tex;
    
    float heightScale = 0.03;
	float height = texture(heightMap, tex).r;
	height = height * 2.0 - 1.0; // 0~1 -> -1~1
	vec3 newPos = pos + vec3(normalWorld * height * heightScale);


	gl_Position = projection * view * model * vec4(newPos, 1.0);

	posWorld = (model * vec4(newPos, 1.0)).xyz;
}
`;class ce{constructor(t,i){this._gl=t,this._textureID=t.createTexture(),this._name=i}async initialise(t){this._gl.bindTexture(this._gl.TEXTURE_CUBE_MAP,this._textureID);for(let i=0;i<6;i++)this._gl.texImage2D(this._gl.TEXTURE_CUBE_MAP_POSITIVE_X+i,0,this._gl.RGB,this._gl.RGB,this._gl.UNSIGNED_BYTE,t[i]);this._gl.texParameteri(this._gl.TEXTURE_CUBE_MAP,this._gl.TEXTURE_WRAP_S,this._gl.CLAMP_TO_EDGE),this._gl.texParameteri(this._gl.TEXTURE_CUBE_MAP,this._gl.TEXTURE_WRAP_T,this._gl.CLAMP_TO_EDGE),this._gl.texParameteri(this._gl.TEXTURE_CUBE_MAP,this._gl.TEXTURE_MIN_FILTER,this._gl.LINEAR),this._gl.texParameteri(this._gl.TEXTURE_CUBE_MAP,this._gl.TEXTURE_MAG_FILTER,this._gl.LINEAR),this._gl.bindTexture(this._gl.TEXTURE_CUBE_MAP,null)}use(t,i){this._gl.activeTexture(this._gl.TEXTURE0+i),this._gl.bindTexture(this._gl.TEXTURE_CUBE_MAP,this._textureID);const r=this._gl.getUniformLocation(t,this._name);this._gl.uniform1i(r,i)}}class je extends oe{constructor(t,i){super(t),this._vertices.push({position:u(-1*i,1*i,-1*i),normal:u(0,0,0),tangent:u(0,0,0),texCoord:w(0,0)}),this._vertices.push({position:u(-1*i,-1*i,-1*i),normal:u(0,0,0),tangent:u(0,0,0),texCoord:w(0,0)}),this._vertices.push({position:u(1*i,1*i,-1*i),normal:u(0,0,0),tangent:u(0,0,0),texCoord:w(0,0)}),this._vertices.push({position:u(1*i,-1*i,-1*i),normal:u(0,0,0),tangent:u(0,0,0),texCoord:w(0,0)}),this._vertices.push({position:u(-1*i,1*i,1*i),normal:u(0,0,0),tangent:u(0,0,0),texCoord:w(0,0)}),this._vertices.push({position:u(1*i,1*i,1*i),normal:u(0,0,0),tangent:u(0,0,0),texCoord:w(0,0)}),this._vertices.push({position:u(-1*i,-1*i,1*i),normal:u(0,0,0),tangent:u(0,0,0),texCoord:w(0,0)}),this._vertices.push({position:u(1*i,-1*i,1*i),normal:u(0,0,0),tangent:u(0,0,0),texCoord:w(0,0)}),this._indices.push(0,1,2,2,1,3,2,3,5,5,3,7,5,7,4,4,7,6,4,6,0,0,6,1,4,0,5,5,0,2,1,6,3,3,6,7)}}const We=`#version 300 es
precision mediump float;

layout (location = 0) in vec3 pos;
layout (location = 1) in vec3 norm;
layout (location = 2) in vec3 tangent;
layout (location = 3) in vec2 tex;

uniform mat4 view;
uniform mat4 projection;

out vec3 WorldPos;

void main()
{
    WorldPos = pos;

	mat4 rotView = mat4(mat3(view));
	vec4 clipPos = projection * rotView * vec4(WorldPos, 1.0);

	gl_Position = clipPos.xyww;
}
`,ke=`#version 300 es
precision mediump float;

out vec4 FragColor;
in vec3 WorldPos;

uniform samplerCube envCubemap;

void main()
{		
    vec3 envColor = texture(envCubemap, WorldPos).rgb;
    
    FragColor = vec4(envColor, 1.0);
}
`;class Ye{constructor({position:t,center:i,up:r}){this._position=t,this._center=i,this._up=r,this._rotate=w(0,0),this._isDragging=!1,this._initialX=0,this._initialY=0,this._isMobile=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),this.initializeEvent()}get position(){const t=this.getViewRotationMatrix(),i=E();return I(i,this._position,t),i}getViewMatrix(){const t=A(),i=this.getViewRotationMatrix(),r=E(),n=E(),o=E();return I(r,this._position,i),I(n,this._center,i),I(o,this._up,i),Ie(t,r,n,o),t}initializeEvent(){const t=this._isMobile?"touchstart":"mousedown",i=this._isMobile?"touchmove":"mousemove",r=this._isMobile?"touchend":"mouseup";document.addEventListener(t,n=>{this._isDragging=!0,this._initialX=this._isMobile?n.touches[0].clientX:n.clientX,this._initialY=this._isMobile?n.touches[0].clientY:n.clientY}),document.addEventListener(i,n=>{if(this._isDragging){const o=this._isMobile?n.touches[0].clientX:n.clientX,s=this._isMobile?n.touches[0].clientY:n.clientY,a=o-this._initialX,l=s-this._initialY;this._rotate=Xe(this._rotate,this._rotate,w(l/10,a/10)),this._initialX=o,this._initialY=s,n.preventDefault()}}),document.addEventListener(r,()=>{this._isDragging=!1})}getViewRotationMatrix(){const t=A();return se(t,t,j(this._rotate[1])),Re(t,t,j(this._rotate[0])),t}}const Z=document.documentElement.clientWidth*.9,he=document.documentElement.clientHeight*.9,q=u(0,0,2),ge=new ye(Z,he),d=ge.gl,b=new re(d,ze,Ge),He=d.getUniformLocation(b.id,"model"),qe=d.getUniformLocation(b.id,"projection"),$e=d.getUniformLocation(b.id,"view"),Ke=d.getUniformLocation(b.id,"camPos"),Qe=d.getUniformLocation(b.id,"lightPos"),k=new re(d,We,ke),Ze=d.getUniformLocation(k.id,"projection"),Je=d.getUniformLocation(k.id,"view"),W=new Ye({position:u(0,0,2.5),center:u(0,0,1.5),up:u(0,1,0)}),U={envCubemapImages:!1,irradianceCubemapImages:!1,textureLoaded:!1};function J(){U.envCubemapImages&&U.irradianceCubemapImages&&U.textureLoaded&&(document.getElementById("loader").style.display="none")}const et=["https://waynechoidev.github.io/web-pbr/pbr/antique-grate1-height.jpg","https://waynechoidev.github.io/web-pbr/pbr/antique-grate1-albedo.jpg","https://waynechoidev.github.io/web-pbr/pbr/antique-grate1-normal-dx.jpg","https://waynechoidev.github.io/web-pbr/pbr/antique-grate1-metallic.jpg","https://waynechoidev.github.io/web-pbr/pbr/antique-grate1-roughness.jpg","https://waynechoidev.github.io/web-pbr/pbr/antique-grate1-ao.jpg","https://waynechoidev.github.io/web-pbr/cubemap/air_museum_playground_brdf.jpg"],_e=new L(d,"heightMap"),me=new L(d,"albedoMap"),de=new L(d,"normalMap"),ue=new L(d,"metallicMap"),pe=new L(d,"roughnessMap"),fe=new L(d,"aoMap"),ve=new L(d,"brdfLUT"),tt=async()=>{const e=et.map(t=>new Promise((i,r)=>{const n=new Image;n.src=t,n.crossOrigin="anonymous",n.onload=()=>{i(n)},n.onerror=()=>{r(new Error("Image loading failed"))}}));try{const t=await Promise.all(e);_e.initialise(t[0]),me.initialise(t[1]),de.initialise(t[2]),ue.initialise(t[3]),pe.initialise(t[4]),fe.initialise(t[5]),ve.initialise(t[6]),U.textureLoaded=!0,J()}catch(t){console.error("Error loading cubemap images:",t)}},K=new ce(d,"envCubemap"),it=["https://waynechoidev.github.io/web-pbr/cubemap/air_museum_playground_env_px.jpg","https://waynechoidev.github.io/web-pbr/cubemap/air_museum_playground_env_nx.jpg","https://waynechoidev.github.io/web-pbr/cubemap/air_museum_playground_env_py.jpg","https://waynechoidev.github.io/web-pbr/cubemap/air_museum_playground_env_ny.jpg","https://waynechoidev.github.io/web-pbr/cubemap/air_museum_playground_env_pz.jpg","https://waynechoidev.github.io/web-pbr/cubemap/air_museum_playground_env_nz.jpg"],nt=async()=>{const e=it.map(t=>new Promise((i,r)=>{const n=new Image;n.src=t,n.crossOrigin="anonymous",n.onload=()=>{i(n)},n.onerror=()=>{r(new Error("Image loading failed"))}}));try{const t=await Promise.all(e);K.initialise(t),U.envCubemapImages=!0,J()}catch(t){console.error("Error loading env cubemap images:",t)}},be=new ce(d,"irradianceCubemap"),rt=["https://waynechoidev.github.io/web-pbr/cubemap/air_museum_playground_irradiance_px.jpg","https://waynechoidev.github.io/web-pbr/cubemap/air_museum_playground_irradiance_nx.jpg","https://waynechoidev.github.io/web-pbr/cubemap/air_museum_playground_irradiance_py.jpg","https://waynechoidev.github.io/web-pbr/cubemap/air_museum_playground_irradiance_ny.jpg","https://waynechoidev.github.io/web-pbr/cubemap/air_museum_playground_irradiance_pz.jpg","https://waynechoidev.github.io/web-pbr/cubemap/air_museum_playground_irradiance_nz.jpg"],ot=async()=>{const e=rt.map(t=>new Promise((i,r)=>{const n=new Image;n.src=t,n.crossOrigin="anonymous",n.onload=()=>{i(n)},n.onerror=()=>{r(new Error("Image loading failed"))}}));try{const t=await Promise.all(e);be.initialise(t),U.irradianceCubemapImages=!0,J()}catch(t){console.error("Error loading cubemap images:",t)}},xe=new Oe(d,Z>=500?.6:.4);xe.initialise();const Ee=new je(d,1);Ee.initialise();const Q=A();Le(Q,j(45),Z/he,.1,100);function Te(e){ge.clear();const t=A();Pe(t,t,j(0)),se(t,t,j(0));const i=W.getViewMatrix();b.use(),d.uniformMatrix4fv(He,!1,t),d.uniformMatrix4fv($e,!1,i),d.uniformMatrix4fv(qe,!1,Q),d.uniform3f(Ke,W.position[0],W.position[1],W.position[2]),d.uniform3f(Qe,q[0],q[1],q[2]),_e.use(b.id,0),me.use(b.id,3),de.use(b.id,4),ue.use(b.id,5),pe.use(b.id,6),fe.use(b.id,7),ve.use(b.id,8),K.use(b.id,9),be.use(b.id,10),xe.draw(),d.depthFunc(d.LEQUAL),k.use(),d.uniformMatrix4fv(Je,!1,i),d.uniformMatrix4fv(Ze,!1,Q),K.use(k.id,0),Ee.draw(),d.depthFunc(d.LESS),d.useProgram(null),d.bindTexture(d.TEXTURE_2D,null),d.bindTexture(d.TEXTURE_CUBE_MAP,null),window.requestAnimationFrame(Te)}const st=async()=>{await nt(),await ot(),await tt(),Te()};st();