export default `\
#define SHADER_NAME heatmapFromPoints-layer-fragment-shader

#ifdef GL_ES
precision highp float;
#endif

varying vec4 vColor;
varying vec2 unitPosition;
uniform sampler2D colorRamp;

void main(void) {
  float distToCenter = length(unitPosition);
  float intensity = exp(-pow(distToCenter, 2.0) * 20.0)*0.08;
  if (distToCenter <= 1.0) {
    gl_FragColor = vec4(intensity, intensity, intensity, intensity*5.0);
//    gl_FragColor += vColor;
    //    gl_FragColor = texture2D(colorRamp, vec2(distToCenter, 1.0));

//    gl_FragColor.a = exp(-pow(distToCenter, 2.0) / 0.3);
  } else {
    discard;
  }
}
`
