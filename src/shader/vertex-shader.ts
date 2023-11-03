export const vertexShader = `#version 300 es
precision mediump float;

layout (location = 0) in vec3 pos;
layout (location = 1) in vec3 norm;
layout (location = 2) in vec2 tex;

uniform mat4 model;
uniform mat4 projection;
uniform mat4 view;

out vec2 texCoord;

void main () {
    gl_Position = projection * view * model * vec4(pos, 1.0);
    texCoord = tex;
}
`;
