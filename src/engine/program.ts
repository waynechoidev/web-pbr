export default class Program {
  private _program: WebGLProgram;
  private _gl: WebGL2RenderingContext;

  constructor(
    gl: WebGL2RenderingContext,
    vertexShaderSource: string,
    fragmentShaderSource: string
  ) {
    this._gl = gl;

    this._program = this._gl.createProgram()!;
    if (!this._program) console.error(`failed to creat a program.`);

    const vertexShader = this.compileShader(
      this._gl.VERTEX_SHADER,
      vertexShaderSource
    );
    const fragmentShader = this.compileShader(
      this._gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );
    this._gl.attachShader(this._program, vertexShader!);
    this._gl.attachShader(this._program, fragmentShader!);
    this._gl.linkProgram(this._program);

    const success = gl.getProgramParameter(this._program, gl.LINK_STATUS);
    if (!success) console.error(gl.getProgramInfoLog(this._program));
  }

  public use() {
    this._gl.useProgram(this._program);
  }

  public get id() {
    return this._program;
  }
  private compileShader(type: number, source: string) {
    const shader = this._gl.createShader(type);
    if (!shader) return console.error(`failed to creat a shader type ${type}.`);

    this._gl.shaderSource(shader, source);
    this._gl.compileShader(shader);

    const success = this._gl.getShaderParameter(
      shader,
      this._gl.COMPILE_STATUS
    );
    if (success) return shader;
    else console.log(this._gl.getShaderInfoLog(shader));
  }
}
