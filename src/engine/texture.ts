export default class Texture {
  private _gl: WebGL2RenderingContext;
  private _textureID: WebGLTexture | null;
  private _name: string;

  constructor(gl: WebGL2RenderingContext, name: string) {
    this._gl = gl;
    this._textureID = gl.createTexture();
    this._name = name;
  }

  public initialise(image: TexImageSource) {
    this._gl.bindTexture(this._gl.TEXTURE_2D, this._textureID);
    this._gl.texParameteri(
      this._gl.TEXTURE_2D,
      this._gl.TEXTURE_WRAP_S,
      this._gl.CLAMP_TO_EDGE
    );
    this._gl.texParameteri(
      this._gl.TEXTURE_2D,
      this._gl.TEXTURE_WRAP_T,
      this._gl.CLAMP_TO_EDGE
    );
    this._gl.texParameteri(
      this._gl.TEXTURE_2D,
      this._gl.TEXTURE_MIN_FILTER,
      this._gl.LINEAR
    );
    this._gl.texParameteri(
      this._gl.TEXTURE_2D,
      this._gl.TEXTURE_MAG_FILTER,
      this._gl.LINEAR
    );
    this._gl.texImage2D(
      this._gl.TEXTURE_2D,
      0,
      this._gl.RGB,
      this._gl.RGB,
      this._gl.UNSIGNED_BYTE,
      image
    );
    this._gl.bindTexture(this._gl.TEXTURE_2D, null);
  }

  public use(program: WebGLProgram, index: number) {
    this._gl.activeTexture(this._gl.TEXTURE0 + index);
    this._gl.bindTexture(this._gl.TEXTURE_2D, this._textureID);

    const uniformLoc = this._gl.getUniformLocation(program, this._name);
    this._gl.uniform1i(uniformLoc, index);
  }
}
