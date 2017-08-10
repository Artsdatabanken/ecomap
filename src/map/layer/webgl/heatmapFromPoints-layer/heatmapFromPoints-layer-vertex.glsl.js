export default `\
#define SHADER_NAME heatmapFromPoints-layer-vertex-shader

attribute vec3 positions;

attribute vec3 instancePositions;
attribute float instanceRadius;

uniform float opacity;
uniform float radiusScale;
uniform float height;
uniform float fillOpacity;

varying vec2 unitPosition;

void main(void) {
  // Multiply out radius and clamp to limits
  float outerRadiusPixels = clamp(
    project_scale(radiusScale * instanceRadius),
    0., 123456789.
  );

  // position on the containing square in [-1, 1] space
  unitPosition = positions.xy;

  // Find the center of the point and add the current vertex
  vec3 center = project_position(instancePositions);
  vec3 vertex = positions * outerRadiusPixels;
  gl_Position = project_to_clipspace(vec4(center + vertex, 1.0));
}
`
