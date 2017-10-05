export default `\
#define SHADER_NAME temporalHeatmap-layer-vertex-shader

attribute vec3 positions;

uniform vec3 positionCenter;
uniform float latitude;
uniform float longitude;
uniform float aspect;
uniform float zoom;

varying vec2 unitPosition;

void main(void) {
  unitPosition = positions.xy;
  vec2 a = project_position(unitPosition * vec2(aspect*zoom,zoom) +
    vec2(longitude,latitude));
  gl_Position = project_to_clipspace(vec4(a, 0.0, 1));

  /*
  unitPosition = positions.xy;
  float aspect = 1.7;
  float yzoom = 7.7;
  vec2 a = project_position(unitPosition * vec2(aspect*yzoom,yzoom) +
    vec2(19.5,63.6));
  gl_Position = project_to_clipspace(vec4(a, 0.0, 1));
*/
}
`
