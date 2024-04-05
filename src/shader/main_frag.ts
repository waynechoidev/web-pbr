export const main_frag = `#version 300 es
precision mediump float;

out vec4 FragColor;
in vec2 TexCoord;
in vec3 posWorld;
in vec3 normalWorld;
in vec3 tangentWorld;

uniform vec3 camPos;
uniform vec3 lightPos;

// prevent collision with sampler2D and samplerCube
uniform sampler2D dummy1;
uniform sampler2D dummy2;

uniform sampler2D albedoMap;
uniform sampler2D normalMap;
uniform sampler2D metallicMap;
uniform sampler2D roughnessMap;
uniform sampler2D aoMap;
uniform sampler2D brdfLUT;

uniform samplerCube envCubemap;
uniform samplerCube irradianceCubemap;

const float PI = 3.14159265359;

float DistributionGGX(vec3 N, vec3 H, float roughness)
{
    float a = roughness*roughness;
    float a2 = a*a;
    float NdotH = max(dot(N, H), 0.0);
    float NdotH2 = NdotH*NdotH;

    float nom   = a2;
    float denom = (NdotH2 * (a2 - 1.0) + 1.0);
    denom = PI * denom * denom;

    return nom / denom;
}

float GeometrySchlickGGX(float NdotV, float roughness)
{
    float r = (roughness + 1.0);
    float k = (r*r) / 8.0;

    float nom   = NdotV;
    float denom = NdotV * (1.0 - k) + k;

    return nom / denom;
}

float GeometrySmith(vec3 N, vec3 V, vec3 L, float roughness)
{
    float NdotV = max(dot(N, V), 0.0);
    float NdotL = max(dot(N, L), 0.0);
    float ggx2 = GeometrySchlickGGX(NdotV, roughness);
    float ggx1 = GeometrySchlickGGX(NdotL, roughness);

    return ggx1 * ggx2;
}

vec3 fresnelSchlick(float cosTheta, vec3 F0)
{
    return F0 + (1.0 - F0) * pow(clamp(1.0 - cosTheta, 0.0, 1.0), 5.0);
}

vec3 fresnelSchlickRoughness(float cosTheta, vec3 F0, float roughness)
{
    return F0 + (max(vec3(1.0 - roughness), F0) - F0) * pow(clamp(1.0 - cosTheta, 0.0, 1.0), 5.0);
}

void main()
{
    // Apply gamma correction to the sampled albedo texture to convert it from sRGB space to linear space
    vec3 albedo = pow(texture(albedoMap, TexCoord).rgb, vec3(2.2));
    float metallic  = texture(metallicMap, TexCoord).r;
    float roughness = texture(roughnessMap, TexCoord).r;
    float ao = texture(aoMap, TexCoord).r;

    vec3 N = normalize(normalWorld);
    // Adjust the tangent vector to ensure it is perpendicular to the surface
    // by removing the component parallel to the normal vector.
    vec3 T = normalize(tangentWorld - dot(tangentWorld, N) * N);
    vec3 B = cross(N, T);
    mat3 TBN = mat3(T, B, N);
    N = normalize(TBN * (texture(normalMap, TexCoord).xyz * 2.0 - 1.0));

    vec3 V = normalize(camPos - posWorld);
    vec3 R = reflect(-V, N);

    vec3 lightRadiances = vec3(10.0);

    vec3 F0 = vec3(0.04);
    F0 = mix(F0, albedo, metallic);

    // use camPos instead of lightPos
    vec3 L = normalize(camPos - posWorld);
    vec3 H = normalize(V + L);
    float distance = length(camPos - posWorld);
    float attenuation = 1.0 / (distance * distance);
    vec3 radiance = lightRadiances * attenuation;

    vec3 F = fresnelSchlick(max(dot(H, V), 0.0), F0);
    float G = GeometrySmith(N, V, L, roughness);
    float NDF = DistributionGGX(N, H, roughness);

    vec3 numerator = NDF * G * F;
    // + 0.0001 to prevent divide by zero
    float denominator = 4.0 * max(dot(N, V), 0.0) * max(dot(N, L), 0.0) + 0.0001;
    vec3 specular = numerator / denominator;

    vec3 kS = F;

    vec3 kD = vec3(1.0) - kS;
    kD *= 1.0 - metallic;

    // scale light by NdotL
    float NdotL = max(dot(N, L), 0.0);

    vec3 directLight = (kD * albedo / PI + specular) * radiance * NdotL;

    // ambient lighting (we now use IBL as the ambient term)
    F = fresnelSchlickRoughness(max(dot(N, V), 0.0), F0, roughness);

    kS = F;
    kD = 1.0 - kS;
    kD *= 1.0 - metallic;

    // Apply gamma correction to the sampled irradianceCubemap texture to convert it from sRGB space to linear space
    vec3 irradiance = pow(texture(irradianceCubemap, N).rgb, vec3(2.2));
    vec3 diffuse = irradiance * albedo;

    // sample both the pre-filter map and the BRDF lut and combine them together as per the Split-Sum approximation to get the IBL specular part.
    const float MAX_REFLECTION_LOD = 4.0;
    // Apply gamma correction to the sampled envCubemap texture to convert it from sRGB space to linear space
    vec3 prefilteredColor = pow(textureLod(envCubemap, R,  roughness * MAX_REFLECTION_LOD).rgb, vec3(2.2));
    vec2 brdf  = texture(brdfLUT, vec2(max(dot(N, V), 0.0), roughness)).rg;
    specular = prefilteredColor * (F * brdf.x + brdf.y);

    vec3 ambient = (kD * diffuse + specular) * ao;

    vec3 color = directLight + ambient;

    // HDR tonemapping
    color = color / (color + vec3(1.0));
    // gamma correct
    color = pow(color, vec3(1.0/2.2));

    FragColor = vec4(color, 1.0);
}
`;
