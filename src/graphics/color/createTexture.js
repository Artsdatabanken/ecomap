
const map = ColorRamp.createColorTexture(this.refs.colorbar, (i) =>
  ColorRamp.map(this.props.steps, i))

function createColorTexture (canvas, colorFunction = () => 'transparent') {
  //  const canvas = document.createElement('canvas')
  // const canvas = ReactDOM.findDOMNode(canvas)
  const context = canvas.getContext('2d')
  canvas.width = 256
  canvas.height = 16

  for (let i = 0; i < canvas.width; i++) {
    context.fillStyle = colorFunction(i)
    context.fillRect(i, 0, 1, canvas.height)
  }

  return context.getImageData(0, 0, canvas.width, canvas.height)
}

function map (steps, i) {
  const offset = i / 255 * (steps.length - 1.0)
  const base = Math.trunc(offset)
  let color = ColorRamp.mix(steps[base], steps[base + 1], offset - base)

  return 'rgba(' + color.values.rgb.toString() + ', 1.0)'
}
