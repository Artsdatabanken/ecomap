export default `\
#define SHADER_NAME screenQuad-vertex-shader

attribute vec3 positions;

void main(void) {
  gl_Position = vec4(positions, 0);
}
`;