export default `\
#define SHADER_NAME grayscaleToColor-fragment-shader

#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D colorRamp;
uniform sampler2D heatTexture;
uniform float fillOpacity;
uniform vec2 uRes;

void main(void) {
  vec2 p = gl_FragCoord.xy / uRes.xy;
  vec4 color = texture2D(heatTexture, p);
  float intensity = color.r/2.2;// + color.g + color.b;
  if(intensity > 0.)
    gl_FragColor = texture2D(colorRamp, vec2(intensity+0.5, 0.5));
  else
//    gl_FragColor = vec4(255.,0.,255.,255.);
    discard;
//gl_FragColor = texture2D(colorRamp, p);
//gl_FragColor = texture2D(heatTexture, p);
}
`
