export const fragmentShader = `#version 300 es
precision mediump float;

in vec2 texCoord;
uniform sampler2D uImage;
out vec4 color;

void main() {
    color = texture(uImage, texCoord) + vec4(vec3(0.1), 1.0);
}
`;
