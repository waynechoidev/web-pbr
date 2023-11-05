export default class Cubemap {
  private _gl: WebGL2RenderingContext;
  private _textureID: WebGLTexture | null;
  private _images: HTMLImageElement[] = [];

  constructor(gl: WebGL2RenderingContext) {
    this._gl = gl;
    this._textureID = gl.createTexture();
  }

  private async loadImageAsync(imgSrc: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = imgSrc;
    });
  }

  public async initialise(imgSrcs: string[]) {
    this._gl.bindTexture(this._gl.TEXTURE_CUBE_MAP, this._textureID);

    for (let i = 0; i < 6; i++) {
      try {
        const img = await this.loadImageAsync(imgSrcs[i]);
        this._images[i] = img;

        this._gl.texImage2D(
          this._gl.TEXTURE_CUBE_MAP_POSITIVE_X + i,
          0,
          this._gl.RGB,
          this._gl.RGB,
          this._gl.UNSIGNED_BYTE,
          img
        );
      } catch (error) {
        console.error("Failed to load image:", imgSrcs[i]);
      }
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
