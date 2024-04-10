import { vec2, vec3, mat4 } from "../external/glmatrix/index";
import { toRadian } from "../external/glmatrix/common.js";

export default class Camera {
  private _position: vec3;
  private _center: vec3;
  private _up: vec3;
  private _rotate: vec2;

  constructor({
    position,
    center,
    up,
  }: {
    position: vec3;
    center: vec3;
    up: vec3;
  }) {
    this._position = position;
    this._center = center;
    this._up = up;
    this._rotate = vec2.fromValues(0, 0);
  }

  get position() {
    return this._position;
  }

  public rotate(rotate: vec2) {
    this._rotate = vec2.add(this._rotate, this._rotate, rotate);
  }

  public getViewMatrix() {
    const view = mat4.create();

    const viewRotationMatrix = mat4.create();
    mat4.rotateY(
      viewRotationMatrix,
      viewRotationMatrix,
      toRadian(this._rotate[1])
    );
    mat4.rotateX(
      viewRotationMatrix,
      viewRotationMatrix,
      toRadian(this._rotate[0])
    );

    const eye = vec3.create();
    const center = vec3.create();
    const up = vec3.create();
    vec3.transformMat4(eye, this._position, viewRotationMatrix);
    vec3.transformMat4(center, this._center, viewRotationMatrix);
    vec3.transformMat4(up, this._up, viewRotationMatrix);
    mat4.lookAt(view, eye, center, up);

    return view;
  }
}
