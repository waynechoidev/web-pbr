export const fragmentShader = `#version 300 es
precision mediump float;

in vec2 texCoord;
in vec3 posWorld;
in vec3 normalWorld;

uniform sampler2D uImage;
uniform vec3 viewPosition;

out vec4 color;

struct Light {
    vec3 direction;
    vec3 strength;
};

struct Material {
    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
    float shininess;
};

float calcAttenuation(float d, float falloffStart, float falloffEnd)
{
    // Linear falloff
    return clamp((falloffEnd - d) / (falloffEnd - falloffStart), 0.0, 1.0);
}

vec3 blinnPhong(vec3 lightStrength, vec3 lightVec, vec3 normal, vec3 toEye, Material material)
{
    vec3 halfway = normalize(toEye + lightVec);
    float hdotn = dot(halfway, normal);
    vec3 specular = vec3(material.specular) * pow(max(hdotn, 0.0f), material.shininess);
    return material.ambient + (vec3(material.diffuse) + specular) * lightStrength;
}

vec3 computeDirectionalLight(vec3 normal, vec3 toEye, Light light, Material material)
{
    vec3 lightVec = -light.direction;
    
    float ndotl = max(dot(lightVec, normal), 0.0f);
    vec3 lightStrength = vec3(light.strength) * ndotl;
    
    return blinnPhong(lightStrength, lightVec, normal, toEye, material);
}

void main() {
    Light light;
    light.direction = vec3(-1.0, 0.0, -1.0);
    light.strength = vec3(0.6);

    Material material;
    material.ambient = vec3(0.1);
    material.diffuse = vec3(1.0);
    material.specular = vec3(1.0);
    material.shininess = 1.0;

	vec3 toEye = normalize(viewPosition - posWorld);

	vec3 res = vec3(0.0);

    res += computeDirectionalLight(normalWorld, toEye, light, material);
    
    color = vec4(res, 1.0) * texture(uImage, texCoord);
}
`;
