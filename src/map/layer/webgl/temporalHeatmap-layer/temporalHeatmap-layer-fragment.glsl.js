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

float fmod(float x, float modulus) {
  return floor((x/modulus - floor(x/modulus))*modulus);
}

float isBitSet(float i, float multiplier) {
  return fmod(i * multiplier, 2.);
}

float isBitSet(vec4 i, float b) {
  float multiplier = pow(0.5, b);
  float f = 0.0;
  f += isBitSet(i.b*256., multiplier);
  f += isBitSet(i.g*256.*256., multiplier);
  f += isBitSet(i.r*256.*256.*256., multiplier);
  f += isBitSet(i.a*256.*256.*256.*256., multiplier);
  return f;
}

vec4 sample(in sampler2D temporalTexture, in vec2 texCoord )
{
  float fraction = time - floor(time);
  vec4 cc = texture2D(temporalTexture, texCoord);
  float bitNo1 = fmod(floor(time),32.);
  float bitNo2 = fmod(bitNo1+1.,32.);
  float bit1 = isBitSet(cc, bitNo1);
  float bit2 = isBitSet(cc, bitNo2);
  float r = mix(bit1,bit2, fraction);
	return vec4(r,r,r,1.);
}

void main(void) {
  vec2 texCoord = 0.5*unitPosition+vec2(0.5,0.5);
  float distToCenter = length(unitPosition);
//  gl_FragColor = texture2D(temporalTexture, texCoord);
  gl_FragColor = sample(temporalTexture, texCoord);
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
