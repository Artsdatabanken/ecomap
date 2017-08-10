export default `\
#define SHADER_NAME heatmapFromPoints-layer-fragment-shader

#ifdef GL_ES
precision highp float;
#endif

varying vec2 unitPosition;
uniform sampler2D colorRamp;
uniform float height;
uniform float fillOpacity;

void main(void) {
  float distToCenter = length(unitPosition);
  if (distToCenter <= 1.0) {
    float intensity = exp(-pow(distToCenter*0.5, 2.0) * 20.0)*height;
    gl_FragColor = vec4(intensity, intensity, intensity, fillOpacity);//clamp(intensity*55.0, 0.0, 1.0));
//    gl_FragColor = texture2D(colorRamp, vec2(1.0-distToCenter, 1.0));
  } else {
    discard;
  }
}
`
