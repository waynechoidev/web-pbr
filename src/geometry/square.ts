import Mesh from "../engine/mesh";
import { vec2, vec3 } from "../external/glmatrix/index";

export default class Square extends Mesh {
  constructor(gl: WebGL2RenderingContext) {
    super(gl);

    this._vertices.push({
      position: vec3.fromValues(-1, 1, 0),
      normal: vec3.fromValues(0, 0, -1),
      texCoord: vec2.fromValues(0, 1),
    });
    this._vertices.push({
      position: vec3.fromValues(-1, -1, 0),
      normal: vec3.fromValues(0, 0, -1),
      texCoord: vec2.fromValues(0, 0),
    });

    this._vertices.push({
      position: vec3.fromValues(1, -1, 0),
      normal: vec3.fromValues(0, 0, -1),
      texCoord: vec2.fromValues(1, 0),
    });
    this._vertices.push({
      position: vec3.fromValues(1, 1, 0),
      normal: vec3.fromValues(0, 0, -1),
      texCoord: vec2.fromValues(1, 1),
    });

    this._indices.push(0, 1, 2, 0, 2, 3);
  }
}
