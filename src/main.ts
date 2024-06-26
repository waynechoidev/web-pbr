import Program from "./engine/program";
import WebGLCanvas from "./engine/webgl-canvas";
import Sphere from "./geometry/sphere";
import Texture from "./engine/texture";
import { vec2, vec3, mat4 } from "./external/glmatrix/index";
import { toRadian } from "./external/glmatrix/common.js";
import { main_frag } from "./shader/main_frag";
import { main_vert } from "./shader/main_vert";
import Cubemap from "./engine/cubemap";
import Skybox from "./geometry/skybox";
import { background_vert } from "./shader/background_vert";
import { background_frag } from "./shader/background_frag";
import Camera from "./engine/camera";

const WIDTH = document.documentElement.clientWidth * 0.9;
const HEIGHT = document.documentElement.clientHeight * 0.9;

let deltaTime = 0;
let lastTime = 0;

const lightPos = vec3.fromValues(0, 0, 2);

const mainWindow = new WebGLCanvas(WIDTH, HEIGHT);
const gl = mainWindow.gl;

const mainProgram = new Program(gl, main_vert, main_frag);
const mainModelLoc = gl.getUniformLocation(mainProgram.id, "model");
const mainProjectionLoc = gl.getUniformLocation(mainProgram.id, "projection");
const mainViewLoc = gl.getUniformLocation(mainProgram.id, "view");
const mainCamPosLoc = gl.getUniformLocation(mainProgram.id, "camPos");
const mainlightPosLoc = gl.getUniformLocation(mainProgram.id, "lightPos");

const backgroundProgram = new Program(gl, background_vert, background_frag);
const backgroundProjectionLoc = gl.getUniformLocation(
  backgroundProgram.id,
  "projection"
);
const backgroundViewLoc = gl.getUniformLocation(backgroundProgram.id, "view");

const camera = new Camera({
  position: vec3.fromValues(0, 0, 2.5),
  center: vec3.fromValues(0, 0, 1.5),
  up: vec3.fromValues(0, 1, 0),
});

const loadedResources = {
  envCubemapImages: false,
  irradianceCubemapImages: false,
  textureLoaded: false,
};
function updateLoadingStatus() {
  if (
    loadedResources.envCubemapImages &&
    loadedResources.irradianceCubemapImages &&
    loadedResources.textureLoaded
  ) {
    document.getElementById("loader")!.style.display = "none";
  }
}

// Textures
const textureSrcs = [
  "https://waynechoidev.github.io/web-pbr/pbr/antique-grate1-height.jpg",
  "https://waynechoidev.github.io/web-pbr/pbr/antique-grate1-albedo.jpg",
  "https://waynechoidev.github.io/web-pbr/pbr/antique-grate1-normal-dx.jpg",
  "https://waynechoidev.github.io/web-pbr/pbr/antique-grate1-metallic.jpg",
  "https://waynechoidev.github.io/web-pbr/pbr/antique-grate1-roughness.jpg",
  "https://waynechoidev.github.io/web-pbr/pbr/antique-grate1-ao.jpg",
  "https://waynechoidev.github.io/web-pbr/cubemap/air_museum_playground_brdf.jpg",
];
const heightMap = new Texture(gl, "heightMap");
const albedoMap = new Texture(gl, "albedoMap");
const normalMap = new Texture(gl, "normalMap");
const metallicMap = new Texture(gl, "metallicMap");
const roughnessMap = new Texture(gl, "roughnessMap");
const aoMap = new Texture(gl, "aoMap");
const brdfLUT = new Texture(gl, "brdfLUT");

const loadTextureImages = async () => {
  const loadImagePromises = textureSrcs.map((src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.crossOrigin = "anonymous";
      img.onload = () => {
        resolve(img);
      };
      img.onerror = () => {
        reject(new Error("Image loading failed"));
      };
    });
  });

  try {
    const textures = (await Promise.all(
      loadImagePromises
    )) as HTMLImageElement[];
    heightMap.initialise(textures[0]);
    albedoMap.initialise(textures[1]);
    normalMap.initialise(textures[2]);
    metallicMap.initialise(textures[3]);
    roughnessMap.initialise(textures[4]);
    aoMap.initialise(textures[5]);
    brdfLUT.initialise(textures[6]);
    loadedResources.textureLoaded = true;
    updateLoadingStatus();
  } catch (error) {
    console.error("Error loading cubemap images:", error);
  }
};

// Env Cubemaps
const envCubemap = new Cubemap(gl, "envCubemap");
const envCubemapSrcs = [
  "https://waynechoidev.github.io/web-pbr/cubemap/air_museum_playground_env_px.jpg",
  "https://waynechoidev.github.io/web-pbr/cubemap/air_museum_playground_env_nx.jpg",
  "https://waynechoidev.github.io/web-pbr/cubemap/air_museum_playground_env_py.jpg",
  "https://waynechoidev.github.io/web-pbr/cubemap/air_museum_playground_env_ny.jpg",
  "https://waynechoidev.github.io/web-pbr/cubemap/air_museum_playground_env_pz.jpg",
  "https://waynechoidev.github.io/web-pbr/cubemap/air_museum_playground_env_nz.jpg",
];
const loadEnvCubemapImages = async () => {
  const loadImagePromises = envCubemapSrcs.map((src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.crossOrigin = "anonymous";
      img.onload = () => {
        resolve(img);
      };
      img.onerror = () => {
        reject(new Error("Image loading failed"));
      };
    });
  });

  try {
    const envCubemapImages = (await Promise.all(
      loadImagePromises
    )) as HTMLImageElement[];
    envCubemap.initialise(envCubemapImages);
    loadedResources.envCubemapImages = true;
    updateLoadingStatus();
  } catch (error) {
    console.error("Error loading env cubemap images:", error);
  }
};

// Irradiance Cubemaps
const irradianceCubemap = new Cubemap(gl, "irradianceCubemap");
const irradianceCubemapSrcs = [
  "https://waynechoidev.github.io/web-pbr/cubemap/air_museum_playground_irradiance_px.jpg",
  "https://waynechoidev.github.io/web-pbr/cubemap/air_museum_playground_irradiance_nx.jpg",
  "https://waynechoidev.github.io/web-pbr/cubemap/air_museum_playground_irradiance_py.jpg",
  "https://waynechoidev.github.io/web-pbr/cubemap/air_museum_playground_irradiance_ny.jpg",
  "https://waynechoidev.github.io/web-pbr/cubemap/air_museum_playground_irradiance_pz.jpg",
  "https://waynechoidev.github.io/web-pbr/cubemap/air_museum_playground_irradiance_nz.jpg",
];
const loadIrradianceCubemapImages = async () => {
  const loadImagePromises = irradianceCubemapSrcs.map((src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.crossOrigin = "anonymous";
      img.onload = () => {
        resolve(img);
      };
      img.onerror = () => {
        reject(new Error("Image loading failed"));
      };
    });
  });

  try {
    const irradianceCubemapImages = (await Promise.all(
      loadImagePromises
    )) as HTMLImageElement[];
    irradianceCubemap.initialise(irradianceCubemapImages);
    loadedResources.irradianceCubemapImages = true;
    updateLoadingStatus();
  } catch (error) {
    console.error("Error loading cubemap images:", error);
  }
};

// Geometry
const sphere = new Sphere(gl, WIDTH >= 500 ? 0.6 : 0.4);
sphere.initialise();
const skybox = new Skybox(gl, 1);
skybox.initialise();

const projection = mat4.create();
mat4.perspective(projection, toRadian(45), WIDTH / HEIGHT, 0.1, 100);

function render(now: number) {
  mainWindow.clear();

  deltaTime = (now - lastTime) * 0.002;
  lastTime = now;

  const model = mat4.create();
  mat4.rotateZ(model, model, toRadian(0));
  mat4.rotateY(model, model, toRadian(0));

  const view = camera.getViewMatrix();

  mainProgram.use();
  gl.uniformMatrix4fv(mainModelLoc, false, model);
  gl.uniformMatrix4fv(mainViewLoc, false, view);
  gl.uniformMatrix4fv(mainProjectionLoc, false, projection);
  gl.uniform3f(
    mainCamPosLoc,
    camera.position[0],
    camera.position[1],
    camera.position[2]
  );
  gl.uniform3f(mainlightPosLoc, lightPos[0], lightPos[1], lightPos[2]);
  heightMap.use(mainProgram.id, 0);
  albedoMap.use(mainProgram.id, 3);
  normalMap.use(mainProgram.id, 4);
  metallicMap.use(mainProgram.id, 5);
  roughnessMap.use(mainProgram.id, 6);
  aoMap.use(mainProgram.id, 7);
  brdfLUT.use(mainProgram.id, 8);
  envCubemap.use(mainProgram.id, 9);
  irradianceCubemap.use(mainProgram.id, 10);
  sphere.draw();

  gl.depthFunc(gl.LEQUAL);
  backgroundProgram.use();
  gl.uniformMatrix4fv(backgroundViewLoc, false, view);
  gl.uniformMatrix4fv(backgroundProjectionLoc, false, projection);
  envCubemap.use(backgroundProgram.id, 0);
  skybox.draw();
  gl.depthFunc(gl.LESS);

  gl.useProgram(null);
  gl.bindTexture(gl.TEXTURE_2D, null);
  gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);

  window.requestAnimationFrame(render);
}

const start = async () => {
  await loadEnvCubemapImages();
  await loadIrradianceCubemapImages();
  await loadTextureImages();
  render(deltaTime);
};

start();
