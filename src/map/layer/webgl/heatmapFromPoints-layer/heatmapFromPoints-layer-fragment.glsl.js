export default `\
#define SHADER_NAME heatmapFromPoints-layer-fragment-shader

#ifdef GL_ES
precision highp float;
#endif

varying vec2 unitPosition;
uniform float height;
uniform float fillOpacity;

void main(void) {
  float distToCenter = length(unitPosition);
  if (distToCenter <= 1.0)
  {
    float intensity = exp(-pow(distToCenter*0.5, 2.0) * 20.0)*height;
    gl_FragColor = vec4(intensity, intensity, intensity, fillOpacity);//clamp(intensity*55.0, 0.0, 1.0));
  } else {
    discard;
  }
//  gl_FragColor = vec4(255.,55.,77.,255.);
//gl_FragColor = vec4(gl_FragCoord.x*0.002, gl_FragCoord.y*0.002, 255.-gl_FragCoord.x, 255.);
}
`
