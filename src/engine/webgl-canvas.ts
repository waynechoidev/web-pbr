export default class WebGLCanvas {
  private _canvas: HTMLCanvasElement;
  private _gl: WebGL2RenderingContext;

  constructor(width: number, height: number) {
    // get element
    this._canvas = document.getElementById("canvas") as HTMLCanvasElement;
    this._canvas.width = width;
    this._canvas.height = height;

    // get context
    this._gl = this._canvas.getContext("webgl2")!;
    if (!this._gl) return;

    // Tell WebGL how to convert from clip space to pixels
    this._gl.viewport(0, 0, width, height);

    this._gl.enable(this._gl.DEPTH_TEST);
    this._gl.cullFace(this._gl.BACK);
    this._gl.enable(this._gl.CULL_FACE);
  }

  public clear() {
    if (!this._gl) return;
    this._gl.clearColor(0, 0, 0, 1);
    this._gl.clear(this._gl.DEPTH_BUFFER_BIT | this._gl.COLOR_BUFFER_BIT);
  }

  public get gl() {
    return this._gl!;
  }
}
