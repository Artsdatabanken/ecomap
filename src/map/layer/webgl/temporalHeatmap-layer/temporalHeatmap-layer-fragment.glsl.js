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

int mod32(int x)
{
  return x - x/32*32;
}

float isBitSet(int i, int b) {
  int div = int(pow(2.,float(b)));
  i = (i/div);
  int j = int(i/2)*2;
  return float(i-j);
}

float sample(in sampler2D temporalTexture, in vec2 texCoord )
{
  float fraction = time - floor(time);
  ivec4 cc = ivec4(texture2D(temporalTexture, texCoord)*255.);
//  int rgb = ((int(cc.a)*256 + int(cc.r)) *256 + int(cc.g)) * 256 + int(cc.b);
//int rgb = ((int(cc.a)*256 + int(cc.r)) *256 + int(cc.g)) * 256 + int(cc.b);
  int rgb = (cc.r * 256 + cc.g) * 256 + cc.b;
//  return float(cc.b)/255.;
//  return float(rgb-int(rgb/256)*256)/256.;
  int bitNo1 = mod32(int(time));
  int bitMask1 = int(pow(2.,float(bitNo1)));
  int bitNo2 = mod32(bitNo1+1);
  int bitMask2 = int(pow(2.,float(bitNo2)));
  float r = mix(
    isBitSet(rgb, bitMask1),
    isBitSet(rgb, bitMask2),
    fraction);
	return r;
}

void main(void) {
  vec2 texCoord = 0.5*unitPosition+vec2(0.5,0.5);
  float distToCenter = length(unitPosition);
  gl_FragColor = texture2D(temporalTexture, texCoord);
  float i = sample(temporalTexture, texCoord);
  gl_FragColor = vec4(i,i,1.,1.);
  if (distToCenter <= 0.1)
  {
    float intensity = exp(-pow(distToCenter*4., 2.0) * 20.0)*height;
    gl_FragColor = vec4(intensity, intensity, intensity, fillOpacity);
  }
//  else {
  //  discard;
//  }
}
`
