export const main_vert = `#version 300 es
precision mediump float;

layout (location = 0) in vec3 pos;
layout (location = 1) in vec3 norm;
layout (location = 2) in vec3 tangent;
layout (location = 3) in vec2 tex;

out vec3 posWorld;
out vec3 normalWorld;
out vec3 tangentWorld;
out vec2 TexCoord;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

uniform sampler2D heightMap;

void main()
{
    // ignore scale
	normalWorld = normalize(mat3(transpose(inverse(model))) * norm);
	tangentWorld = normalize(model * vec4(tangent, 1.0)).xyz;
	TexCoord = tex;
    
    float heightScale = 0.03;
	float height = texture(heightMap, tex).r;
	height = height * 2.0 - 1.0; // 0~1 -> -1~1
	vec3 newPos = pos + vec3(normalWorld * height * heightScale);


	gl_Position = projection * view * model * vec4(newPos, 1.0);

	posWorld = (model * vec4(newPos, 1.0)).xyz;
}
`;
