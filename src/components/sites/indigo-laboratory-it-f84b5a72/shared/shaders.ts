/**
 * GLSL shaders extracted verbatim from indigo-laboratory.it's Nuxt bundle.
 * Source of truth: docs/research/indigo-laboratory-it-f84b5a72/root-8a5edab2/shaders/
 * Do not "clean up" these - they are the site's exact programs.
 */

/* Program A - scroll-velocity plane deformation. Uniforms: uPlaneDeformation, uOpacity. */
export const planeDeformationVs = `
  precision mediump float;

  attribute vec3 aVertexPosition;
  attribute vec2 aTextureCoord;

  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;
  uniform mat4 planeTextureMatrix;

  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;

  uniform float uPlaneDeformation;

  void main() {
    vec3 vertexPosition = aVertexPosition;
    vertexPosition.y += sin(((vertexPosition.x + 1.0) / 2.0) * 3.141592) * (sin(uPlaneDeformation / 240.0));

    gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);

    vVertexPosition = vertexPosition;
    vTextureCoord = (planeTextureMatrix * vec4(aTextureCoord, 0.0, 1.0)).xy;
  }
`;

export const planeDeformationFs = `
  precision mediump float;

  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;

  uniform sampler2D planeTexture;
  uniform float uOpacity;

  void main() {
    vec4 color = texture2D(planeTexture, vTextureCoord);
    color.a *= uOpacity;
    gl_FragColor = color;
  }
`;

/* Program B - cursor ripple. Uniforms: uTime, uResolution, uMousePosition, uMouseMoveStrength. */
export const mouseRippleVs = `
  precision mediump float;

  attribute vec3 aVertexPosition;
  attribute vec2 aTextureCoord;

  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;
  uniform mat4 planeTextureMatrix;

  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMousePosition;
  uniform float uMouseMoveStrength;

  void main() {
    vec3 vertexPosition = aVertexPosition;

    float distanceFromMouse = distance(uMousePosition, vec2(vertexPosition.x, vertexPosition.y));
    float waveSinusoid = cos(5.0 * (distanceFromMouse - (uTime / 75.0)));
    float distanceStrength = (0.4 / (distanceFromMouse + 0.4));
    float distortionEffect = distanceStrength * waveSinusoid * uMouseMoveStrength;

    vertexPosition.z += distortionEffect / 100.0;
    vertexPosition.x += (distortionEffect / 100.0 * (uResolution.x / uResolution.y) * (uMousePosition.x - vertexPosition.x));
    vertexPosition.y += distortionEffect / 100.0 * (uMousePosition.y - vertexPosition.y);

    gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);

    vTextureCoord = (planeTextureMatrix * vec4(aTextureCoord, 0.0, 1.0)).xy;
    vVertexPosition = vertexPosition;
  }
`;

export const mouseRippleFs = `
  precision mediump float;

  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;

  uniform sampler2D planeTexture;

  void main() {
    vec4 finalColor = texture2D(planeTexture, vTextureCoord);

    finalColor.rgb -= clamp(-vVertexPosition.z, 0.0, 1.0);
    finalColor.rgb += clamp(vVertexPosition.z, 0.0, 1.0);

    finalColor = vec4(finalColor.rgb * finalColor.a, finalColor.a);

    gl_FragColor = finalColor;
  }
`;

/* Program C - transition ripple, peaks at the midpoint of uTransition 0->1. */
export const transitionRippleVs = `
  precision mediump float;

  attribute vec3 aVertexPosition;
  attribute vec2 aTextureCoord;

  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;
  uniform mat4 planeTextureMatrix;

  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;

  uniform vec2 uMousePosition;
  uniform float uTime;
  uniform float uTransition;

  void main() {
    vec3 vertexPosition = aVertexPosition;

    // convert uTransition from [0,1] to [0,1,0] for peak distortion at midpoint
    float transition = 1.0 - abs((uTransition * 2.0) - 1.0);

    float distanceFromMouse = distance(uMousePosition, vec2(vertexPosition.x, vertexPosition.y));
    float waveSinusoid = cos(5.0 * (distanceFromMouse - (uTime / 30.0)));
    float distanceStrength = (0.4 / (distanceFromMouse + 0.4));
    float distortionEffect = distanceStrength * waveSinusoid * 0.33;

    vertexPosition.z += distortionEffect * -transition;
    vertexPosition.x += (distortionEffect * transition * (uMousePosition.x - vertexPosition.x));
    vertexPosition.y += distortionEffect * transition * (uMousePosition.y - vertexPosition.y);

    gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);

    vVertexPosition = vertexPosition;
    vTextureCoord = (planeTextureMatrix * vec4(aTextureCoord, 0.0, 1.0)).xy;
  }
`;

export const transitionRippleFs = `
  precision mediump float;

  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;

  uniform sampler2D planeTexture;

  uniform float uOpacity;

  void main() {
    vec4 finalColor = texture2D(planeTexture, vTextureCoord);

    finalColor.rgb += clamp(vVertexPosition.z, -1.0, 0.0) * 0.75;
    finalColor.rgb += clamp(vVertexPosition.z, 0.0, 1.0) * 0.75;

    finalColor *= uOpacity;
    gl_FragColor = finalColor;
  }
`;
