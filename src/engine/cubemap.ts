export default class Cubemap {
  private _gl: WebGL2RenderingContext;
  private _textureID: WebGLTexture | null;
  private _images: HTMLImageElement[] = [];

  constructor(gl: WebGL2RenderingContext) {
    this._gl = gl;
    this._textureID = gl.createTexture();
  }

  public async initialise(imgs: HTMLImageElement[]) {
    this._gl.bindTexture(this._gl.TEXTURE_CUBE_MAP, this._textureID);

    for (let i = 0; i < 6; i++) {
      this._gl.texImage2D(
        this._gl.TEXTURE_CUBE_MAP_POSITIVE_X + i,
        0,
        this._gl.RGB,
        this._gl.RGB,
        this._gl.UNSIGNED_BYTE,
        imgs[i]
      );
    }

    this._gl.texParameteri(
      this._gl.TEXTURE_CUBE_MAP,
      this._gl.TEXTURE_WRAP_S,
      this._gl.CLAMP_TO_EDGE
    );
    this._gl.texParameteri(
      this._gl.TEXTURE_CUBE_MAP,
      this._gl.TEXTURE_WRAP_T,
      this._gl.CLAMP_TO_EDGE
    );
    this._gl.texParameteri(
      this._gl.TEXTURE_CUBE_MAP,
      this._gl.TEXTURE_MIN_FILTER,
      this._gl.LINEAR
    );
    this._gl.texParameteri(
      this._gl.TEXTURE_CUBE_MAP,
      this._gl.TEXTURE_MAG_FILTER,
      this._gl.LINEAR
    );

    this._gl.bindTexture(this._gl.TEXTURE_CUBE_MAP, null);
  }

  public use() {
    this._gl.activeTexture(this._gl.TEXTURE0);
    this._gl.bindTexture(this._gl.TEXTURE_CUBE_MAP, this._textureID);
  }
}
