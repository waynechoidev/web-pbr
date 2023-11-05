import Program from "./engine/program";
import WebGLCanvas from "./engine/webgl-canvas";
import Sphere from "./geometry/sphere";
import Texture from "./engine/texture";
import { vec3, mat4 } from "./external/glmatrix/index";
import { toRadian } from "./external/glmatrix/common.js";
import { fragmentShader } from "./shader/fragment-shader";
import { vertexShader } from "./shader/vertex-shader";
import Cubemap from "./engine/cubemap";
import Skybox from "./geometry/skybox";
import { skyboxVertexShader } from "./shader/skybox-vertex-shader";
import { skyboxFragmentShader } from "./shader/skybox-fragment-shader";

const WIDTH = document.documentElement.clientWidth * 0.9;
const HEIGHT = document.documentElement.clientHeight * 0.9;

let deltaTime = 0;
let lastTime = 0;

let modelRotateY = 130;
const modelRotateZ = -23.5;
const rotateSpeed = 10;

let viewRotateX = 0;
let viewRotateY = 0;
const viewStartEye = vec3.fromValues(0, 0, 2.5);
const viewStartCenter = vec3.fromValues(0, 0, 1.5);
const viewStartUp = vec3.fromValues(0, 1, 0);

const mainWindow = new WebGLCanvas(WIDTH, HEIGHT);

const program = new Program(mainWindow.gl, vertexShader, fragmentShader);
const u_model = mainWindow.gl.getUniformLocation(program.id, "model");
const u_projection = mainWindow.gl.getUniformLocation(program.id, "projection");
const u_view = mainWindow.gl.getUniformLocation(program.id, "view");
const u_view_position = mainWindow.gl.getUniformLocation(
  program.id,
  "viewPosition"
);

const skyboxProgram = new Program(
  mainWindow.gl,
  skyboxVertexShader,
  skyboxFragmentShader
);
const u_projection_skybox = mainWindow.gl.getUniformLocation(
  skyboxProgram.id,
  "projection"
);
const u_view_skybox = mainWindow.gl.getUniformLocation(
  skyboxProgram.id,
  "view"
);

// Interactions
let isDragging = false;
let initialX: number, initialY: number;

const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

const startEvent = isMobile ? "touchstart" : "mousedown";
const moveEvent = isMobile ? "touchmove" : "mousemove";
const endEvent = isMobile ? "touchend" : "mouseup";

document.addEventListener(startEvent, (e) => {
  isDragging = true;
  initialX = isMobile
    ? (e as TouchEvent).touches[0].clientX
    : (e as MouseEvent).clientX;
  initialY = isMobile
    ? (e as TouchEvent).touches[0].clientY
    : (e as MouseEvent).clientY;
});

document.addEventListener(moveEvent, (e) => {
  if (isDragging) {
    const currentX = isMobile
      ? (e as TouchEvent).touches[0].clientX
      : (e as MouseEvent).clientX;
    const currentY = isMobile
      ? (e as TouchEvent).touches[0].clientY
      : (e as MouseEvent).clientY;

    const dx = currentX - initialX;
    const dy = currentY - initialY;

    viewRotateX += dy / 10;
    viewRotateY += dx / 10;

    initialX = currentX;
    initialY = currentY;

    e.preventDefault();
  }
});

document.addEventListener(endEvent, () => {
  isDragging = false;
});

const playButton = document.getElementById("play") as HTMLButtonElement;
playButton?.addEventListener("click", () => {
  video.play();
  playButton.hidden = true;
});

// Textures
const video = document.createElement("video");
video.src = "https://waynechoidev.github.io/earth-animation/sphere.mp4";
video.crossOrigin = "anonymous";

const texture = new Texture(mainWindow.gl);

video.addEventListener("loadedmetadata", () => {
  video.currentTime = 0.1;
  texture.initialise(video);
});
video.addEventListener("ended", () => {
  video.currentTime = 0.1;
  video.play();
});

// Cubemap
const skybox = new Skybox(mainWindow.gl, 20);
skybox.initialise();
const skyboxTexture = new Cubemap(mainWindow.gl);
skyboxTexture.initialise([
  "https://waynechoidev.github.io/earth-animation/cubemap/px.png",
  "https://waynechoidev.github.io/earth-animation/cubemap/nx.png",
  "https://waynechoidev.github.io/earth-animation/cubemap/py.png",
  "https://waynechoidev.github.io/earth-animation/cubemap/ny.png",
  "https://waynechoidev.github.io/earth-animation/cubemap/pz.png",
  "https://waynechoidev.github.io/earth-animation/cubemap/nz.png",
]);

// Model
const sphere = new Sphere(mainWindow.gl, WIDTH >= 500 ? 0.6 : 0.4);
sphere.initialise();

const projection = mat4.create();
mat4.perspective(projection, toRadian(45), WIDTH / HEIGHT, 0.1, 100);

function render(now: number) {
  mainWindow.clear();

  deltaTime = (now - lastTime) * 0.002;
  lastTime = now;

  if (!video.paused) {
    if (modelRotateY >= 360) modelRotateY = 0;
    else modelRotateY += deltaTime * rotateSpeed;
  }

  program.use();

  const model = mat4.create();
  mat4.rotateZ(model, model, toRadian(modelRotateZ));
  mat4.rotateY(model, model, toRadian(modelRotateY));

  const view = mat4.create();
  const viewRotationMatrix = mat4.create();
  mat4.rotateY(viewRotationMatrix, viewRotationMatrix, toRadian(viewRotateY));
  mat4.rotateX(viewRotationMatrix, viewRotationMatrix, toRadian(viewRotateX));
  const eye = vec3.create();
  const center = vec3.create();
  const up = vec3.create();
  vec3.transformMat4(eye, viewStartEye, viewRotationMatrix);
  vec3.transformMat4(center, viewStartCenter, viewRotationMatrix);
  vec3.transformMat4(up, viewStartUp, viewRotationMatrix);
  mat4.lookAt(view, eye, center, up);

  mainWindow.gl.uniformMatrix4fv(u_model, false, model);
  mainWindow.gl.uniformMatrix4fv(u_view, false, view);
  mainWindow.gl.uniformMatrix4fv(u_projection, false, projection);
  mainWindow.gl.uniform3f(u_view_position, eye[0], eye[1], eye[2]);

  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    texture.update(video);
    sphere.draw();
  }

  skyboxProgram.use();
  mainWindow.gl.uniformMatrix4fv(u_view_skybox, false, view);
  mainWindow.gl.uniformMatrix4fv(u_projection_skybox, false, projection);
  skyboxTexture.use();
  skybox.draw();

  mainWindow.gl.useProgram(null);
  mainWindow.gl.bindTexture(mainWindow.gl.TEXTURE_2D, null);
  window.requestAnimationFrame(render);
}
render(deltaTime);
