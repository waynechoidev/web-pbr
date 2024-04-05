export const background_frag = `#version 300 es
precision mediump float;

out vec4 FragColor;
in vec3 WorldPos;

uniform samplerCube envCubemap;

void main()
{		
    vec3 envColor = texture(envCubemap, WorldPos).rgb;
    
    FragColor = vec4(envColor, 1.0);
}
`;
