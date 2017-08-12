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
    gl_FragColor = vec4(25.,25.,155.,255.);
//    discard;
//  gl_FragColor = color;//vec4(intensity,255.-intensity,0.,255.);
//  gl_FragColor = texture2D(heatTexture, vec2(gl_FragCoord.x/1., gl_FragCoord.y/1.));
//gl_FragColor = vec4(gl_FragCoord.x*0.002, gl_FragCoord.y*0.002, 255.-gl_FragCoord.x, 255.);
//gl_FragColor = vec4(0.,0.,0.,25.);
//gl_FragColor = texture2D(colorRamp, p);
//gl_FragColor = texture2D(heatTexture, p);
}
`
