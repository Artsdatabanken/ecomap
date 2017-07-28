export default `\
#define SHADER_NAME experimentalshader-layer-fragment-shader

#ifdef GL_ES
precision highp float;
#endif

varying vec4 vColor;
varying vec2 unitPosition;
varying float innerUnitRadius;

void main(void) {

  float distToCenter = length(unitPosition);

  if (distToCenter <= 1.0 && distToCenter >= innerUnitRadius) {
    gl_FragColor = vColor*(1.0-distToCenter);
  } else {
    discard;
  }
}
`
