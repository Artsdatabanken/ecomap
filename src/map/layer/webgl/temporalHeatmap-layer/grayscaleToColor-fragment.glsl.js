export default `\
#define SHADER_NAME grayscaleToColor-fragment-shader

#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D colorRamp;
uniform sampler2D heatTexture;
uniform sampler2D temporalTexture;
uniform float fillOpacity;
uniform vec2 uRes;

void main(void) {
  vec2 p = gl_FragCoord.xy / uRes.xy;
  vec4 color = texture2D(heatTexture, p);
  float intensity = color.r; // TODO: Convert to single channel texture

  gl_FragColor = color;
  if(intensity < 0.) {
    gl_FragColor = texture2D(colorRamp, vec2(intensity, 0.5));
    gl_FragColor.a = smoothstep(intensity, 0., 0.05)*fillOpacity;
  }
//  else
  //  discard;

}
`
