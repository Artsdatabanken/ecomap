export default `\
#define SHADER_NAME temporalHeatmap-animation-fragment-shader

#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D temporalTexture;
varying vec2 unitPosition;
uniform float time;

float fmod(float x, float modulus) {
  return floor((x/modulus - floor(x/modulus))*modulus);
}

float isBitSet(float i, float multiplier) {
  return fmod(i * multiplier, 2.);
}

float isBitSet(vec4 i, float b) {
  float f = 0.0;
  f += isBitSet(i.b*256., pow(0.5, b));
  b-=8.;
  if(b<0.) return f;
  f += isBitSet(i.g*256., pow(0.5, b));
  b-=8.;
  if(b<0.) return f;
  f += isBitSet(i.r*256., pow(0.5, b));
  return f;
}

vec4 sample(in sampler2D temporalTexture, in vec2 texCoord )
{
  float fraction = time - floor(time);
  vec4 cc = texture2D(temporalTexture, texCoord);
  float bitNo1 = fmod(floor(time),24.);
  float bitNo2 = fmod(bitNo1+1.,24.);
  float bit1 = isBitSet(cc, bitNo1);
  float bit2 = isBitSet(cc, bitNo2);
  float r = mix(bit1,bit2, fraction);
//	return vec4(bit1,bit1,bit1,1.);
	return vec4(r,r,r,1.);
}

void main(void) {
  vec2 texCoord = 0.5*unitPosition+vec2(0.5,0.5);
  vec4 sample = sample(temporalTexture, texCoord);
  if(sample.r > 0.00001)
    gl_FragColor = sample;
  else
    discard;
}
`
