import Mesh from "../engine/mesh";
import { vec2, vec3, mat4 } from "../external/glmatrix/index";

export default class Sphere extends Mesh {
  constructor(gl: WebGL2RenderingContext, radius: number) {
    super(gl);

    const numOfSlices = 20;
    const numOfStacks = 20;

    const dTheta = (-2 * Math.PI) / numOfSlices;
    const dPhi = (-1 * Math.PI) / numOfStacks;

    for (let j = 0; j <= numOfStacks; j++) {
      const rotationMatrix = mat4.create();
      mat4.rotate(
        rotationMatrix,
        mat4.create(),
        dPhi * j,
        vec3.fromValues(0, 0, 1)
      );

      const stackStartPoint = vec3.create();
      vec3.transformMat4(
        stackStartPoint,
        vec3.fromValues(0, -radius, 0),
        rotationMatrix
      );

      for (let i = 0; i <= numOfSlices; i++) {
        const rotationMatrix = mat4.create();
        mat4.rotate(
          rotationMatrix,
          mat4.create(),
          dTheta * i,
          vec3.fromValues(0, 1, 0)
        );

        const position = vec3.create();
        vec3.transformMat4(position, stackStartPoint, rotationMatrix);

        const normal = vec3.create();
        vec3.normalize(normal, position);

        const texCoord = vec2.fromValues(
          1 - i / numOfSlices,
          1 - j / numOfStacks
        );

        this._vertices.push({ position, normal, texCoord });
      }
    }

    for (let j = 0; j < numOfStacks; j++) {
      const offset = (numOfSlices + 1) * j;

      for (let i = 0; i < numOfSlices; i++) {
        this._indices.push(offset + i);
        this._indices.push(offset + i + numOfSlices + 1);
        this._indices.push(offset + i + 1 + numOfSlices + 1);

        this._indices.push(offset + i);
        this._indices.push(offset + i + 1 + numOfSlices + 1);
        this._indices.push(offset + i + 1);
      }
    }
  }
}
