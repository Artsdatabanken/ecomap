export default `\
#define SHADER_NAME horizontalGaussian-fragment

#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D sourceTexture;
uniform vec2 iResolution;

const int blur_size = 10;

float gauss(float x, float e)
{
    return exp(-pow(x, 2.)/e);
}

// Vertical blurring
void main(void) {
   vec2 pos = gl_FragCoord.xy / iResolution;
   vec4 pixval = vec4(0.);
   float tot = 0.;

   const int nb = 2 * blur_size + 1;

   for (int x=0; x<nb; x++)
   {
       float x2 = float(x-blur_size);
       vec2 ipos = pos + vec2(x2/iResolution.x, 0);
       float g = gauss(x2, float(blur_size));
       pixval+= g*texture2D(sourceTexture, ipos);
       tot+= g;
   }
   gl_FragColor = pixval/tot;
   gl_FragColor = pixval;//vec4(pixval,0.,1.,1.);//pixval/tot;
}
`
