import { Vertex } from "./common";

export default class Mesh {
  private _gl: WebGL2RenderingContext;

  private _VAO: WebGLVertexArrayObject | null;
  private _IBO: WebGLBuffer | null;
  private _VBO: WebGLBuffer | null;
  private _indexCount: number;

  protected _vertices: Vertex[];
  protected _indices: number[];

  constructor(gl: WebGL2RenderingContext) {
    this._gl = gl;
    this._VAO = null;
    this._IBO = null;
    this._VBO = null;
    this._indexCount = 0;
    this._vertices = [];
    this._indices = [];
  }
  public initialise() {
    this._indexCount = this._indices.length;
    const verticesData: number[] = [];
    for (let i = 0; i < this._vertices.length; i++) {
      const { position, normal, tangent, texCoord } = this._vertices[i];
      verticesData.push(...position, ...normal, ...tangent, ...texCoord);
    }

    this._VAO = this._gl.createVertexArray();
    this._gl.bindVertexArray(this._VAO);

    this._IBO = this._gl.createBuffer();
    this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._IBO);
    this._gl.bufferData(
      this._gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(this._indices),
      this._gl.STATIC_DRAW
    );

    this._VBO = this._gl.createBuffer();
    this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._VBO);
    this._gl.bufferData(
      this._gl.ARRAY_BUFFER,
      new Float32Array(verticesData),
      this._gl.STATIC_DRAW
    );

    this._gl.vertexAttribPointer(0, 3, this._gl.FLOAT, false, 4 * 11, 0);
    this._gl.enableVertexAttribArray(0);
    this._gl.vertexAttribPointer(1, 3, this._gl.FLOAT, false, 4 * 11, 4 * 3);
    this._gl.enableVertexAttribArray(1);
    this._gl.vertexAttribPointer(2, 3, this._gl.FLOAT, false, 4 * 11, 4 * 6);
    this._gl.enableVertexAttribArray(2);
    this._gl.vertexAttribPointer(3, 2, this._gl.FLOAT, false, 4 * 11, 4 * 9);
    this._gl.enableVertexAttribArray(3);

    this._gl.bindBuffer(this._gl.ARRAY_BUFFER, null);
    this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, null);

    this._gl.bindVertexArray(null);
  }

  public draw() {
    this._gl.bindVertexArray(this._VAO);
    this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._IBO);
    this._gl.drawElements(
      this._gl.TRIANGLES,
      this._indexCount,
      this._gl.UNSIGNED_SHORT,
      0
    );
    this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, null);
    this._gl.bindVertexArray(null);
  }
}
