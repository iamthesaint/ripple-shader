export const simulationVertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `;

export const simulationFragmentShader = `
uniform sampler2D textureA;
uniform vec2 mouse;
uniform vec2 resolution;
uniform float time;
uniform int frame;
varying vec2 vUv;

const float delta = 1.4;

void main() {
  vec2 uv = vUv;

  if (frame == 0) {
    gl_FragColor = vec4(0.0);
    return;
  }

  vec4 data = texture2D(textureA, uv);
  float pressure = data.x;
  float pVel = data.y;

  vec2 texelSize = 1.0 / resolution;

  vec2 uvRight = clamp(uv + vec2(texelSize.x, 0.0), 0.0, 1.0);
  vec2 uvLeft  = clamp(uv - vec2(texelSize.x, 0.0), 0.0, 1.0);
  vec2 uvUp    = clamp(uv + vec2(0.0, texelSize.y), 0.0, 1.0);
  vec2 uvDown  = clamp(uv - vec2(0.0, texelSize.y), 0.0, 1.0);

  float p_right = texture2D(textureA, uvRight).x;
  float p_left  = texture2D(textureA, uvLeft).x;
  float p_up    = texture2D(textureA, uvUp).x;
  float p_down  = texture2D(textureA, uvDown).x;

  pVel += delta * (-2.0 * pressure + p_right + p_left) / 4.0;
  pVel += delta * (-2.0 * pressure + p_up + p_down) / 4.0;

  pressure += delta * pVel;
  pVel -= 0.003 * delta * pressure;
  pVel *= 1.0 - 0.002 * delta;
  pressure *= 0.999;

  vec2 mouseUV = mouse / resolution;
  if (mouse.x > 0.0) {
    float dist = distance(uv, mouseUV);
    if (dist <= 0.02) {
      pressure += 2.0 * (1.0 - dist / 0.02);
    }
  }

  gl_FragColor = vec4(
    pressure,
    pVel,
    (p_right - p_left) / 2.0,
    (p_up - p_down) / 2.0
  );
}

    `;

export const renderVertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const renderFragmentShader = `
uniform sampler2D textureA;
uniform sampler2D textureB;
varying vec2 vUv;

void main() {

    vec4 data = texture2D(textureA, vUv);

    vec2 distortion = 0.2 * data.zw;
    vec4 color = texture2D(textureB, vUv + distortion);

    vec3 normal = normalize(vec3(data.z * 2.0, 0.5, -data.w * 2.0));
    vec3 lightDir = normalize(vec3(-3.0, 8.0, 3.0));
    float specular = pow(max(0.0, dot(normal, lightDir)), 70.0) * 1.5;

    gl_FragColor = color + vec4(specular);
}
`;

