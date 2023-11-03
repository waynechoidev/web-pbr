import Program from "./engine/program";
import WebGLCanvas from "./engine/webgl-canvas";
import Sphere from "./geometry/sphere";
import Square from "./geometry/square";
import Texture from "./engine/texture";
import { vec3, mat4 } from "./external/glmatrix/index";
import { toRadian } from "./external/glmatrix/common.js";
import { fragmentShader } from "./shader/fragment-shader";
import { vertexShader } from "./shader/vertex-shader";

const WIDTH = document.documentElement.clientWidth * 0.9;
const HEIGHT = document.documentElement.clientHeight * 0.9;

const mainWindow = new WebGLCanvas(WIDTH, HEIGHT);
const program = new Program(mainWindow.gl, vertexShader, fragmentShader);

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

const playButton = document.getElementById("play") as HTMLButtonElement;
playButton?.addEventListener("click", () => {
  video.play();
  playButton.hidden = true;
});

const sphere = new Sphere(mainWindow.gl, WIDTH >= 500 ? 0.6 : 0.4);
sphere.initialise();

const u_model = mainWindow.gl.getUniformLocation(program.id, "model");
const u_projection = mainWindow.gl.getUniformLocation(program.id, "projection");
const u_view = mainWindow.gl.getUniformLocation(program.id, "view");

const projection = mat4.create();
mat4.perspective(projection, toRadian(45), WIDTH / HEIGHT, 0.1, 100);

let deltaTime = 0;
let lastTime = 0;

let y = 130;
let z = -23.5;
const speed = 10;

function render(now: number) {
  mainWindow.clear();

  deltaTime = (now - lastTime) * 0.002;
  lastTime = now;

  if (!video.paused) {
    if (y >= 360) y = 0;
    else y += deltaTime * speed;
  }

  program.use();

  const model = mat4.create();
  mat4.rotateZ(model, model, toRadian(z));
  mat4.rotateY(model, model, toRadian(y));

  const view = mat4.create();
  mat4.lookAt(
    view,
    vec3.fromValues(0, 0, 2.5),
    vec3.fromValues(0, 0, 1.5),
    vec3.fromValues(0, 1, 0)
  );

  mainWindow.gl.uniformMatrix4fv(u_model, false, model);
  mainWindow.gl.uniformMatrix4fv(u_view, false, view);
  mainWindow.gl.uniformMatrix4fv(u_projection, false, projection);

  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    texture.update(video);
    sphere.draw();
  }

  mainWindow.gl.useProgram(null);
  mainWindow.gl.bindTexture(mainWindow.gl.TEXTURE_2D, null);
  window.requestAnimationFrame(render);
}
render(deltaTime);
