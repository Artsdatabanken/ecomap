export default `\
#define SHADER_NAME temporalHeatmap-layer-fragment-shader

#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D temporalTexture;
varying vec2 unitPosition;
uniform float height;
uniform float time;
uniform float fillOpacity;

float sample(in vec2 texCoord )
{
  float fraction = time - floor(time);
  ivec4 cc = ivec4(texture2D(temporalTexture, texCoord)*255.);
  int rgb = cc.a << 24 | cc.r << 16 | cc.g << 8 | cc.b;

  int bitNo1 = int(time) % 32;
  int bitMask1 = int(pow(2.,float(bitNo1)));
  int bitNo2 = (bitNo1+1) % 32;
  int bitMask2 = int(pow(2.,float(bitNo2)));
  float r = mix(
    float((rgb & bitMask1) >> bitNo1),
    float((rgb & bitMask2) >> bitNo2),
    fraction);
	return r;
}

void main(void) {
  vec2 texCoord = 0.5*unitPosition+vec2(0.5,0.5);
  float distToCenter = length(unitPosition);
  gl_FragColor = texture2D(temporalTexture, texCoord);
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
