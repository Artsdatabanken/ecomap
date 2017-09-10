export default `\
#define SHADER_NAME temporalHeatmap-layer-fragment-shader

#ifdef GL_ES
precision highp float;
#endif

varying vec2 unitPosition;
uniform float height;
uniform float fillOpacity;

void main(void) {
  float distToCenter = length(unitPosition);
  gl_FragColor = vec4(unitPosition.x, unitPosition.y,fillOpacity,  1.0);
//  gl_FragColor = vec4(fillOpacity, unitPosition.x, 1.0, 1.0);
  if (distToCenter <= 0.5)
  {
    float intensity = exp(-pow(distToCenter*0.5, 2.0) * 20.0)*height;
    gl_FragColor = vec4(intensity, intensity, intensity, fillOpacity);
  }
//  else {
  //  discard;
//  }
}
`
