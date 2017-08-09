import React from 'react'
import Color from 'color'

class ColorRamp extends React.Component {
  constructor () {
    super()
    this.state = {map: []}
  }

  static createColorTexture (canvas, colorFunction = () => 'transparent') {
    //  const canvas = document.createElement('canvas')
    // const canvas = ReactDOM.findDOMNode(canvas)
    const context = canvas.getContext('2d')
    canvas.width = 256
    canvas.height = 1

    for (let i = 0; i < canvas.width; i++) {
      context.fillStyle = colorFunction(i)
      context.fillRect(i, 0, 1, canvas.height)
    }

    return context.getImageData(0, 0, canvas.width, canvas.height)
  }

  componentDidMount () {
    const map = ColorRamp.createColorTexture(this.refs.colorbar, (i) => ColorRamp.map(this.props.steps, i))
    var dataCopy = new Uint8ClampedArray(map.data);
    console.log((dataCopy.toString()))
    this.setState({map})
  }

  static mix (color1, color2, weight) {
    if (color2 === undefined) color2 = color1
    let c1 = new Color(color1)
    let c2 = new Color(color2)
    return c2.mix(c1, weight)
  }

  static map (steps, i) {
    const offset = i / 255 * (steps.length - 1.0)
    const base = Math.trunc(offset)
    let color = ColorRamp.mix(steps[base], steps[base + 1], offset - base)

    return 'rgba(' + color.values.rgb.toString() + ', 1.0)'
  }

  render () {
    return <div>
      <canvas ref='colorbar' />
    </div>
  }
}

export default ColorRamp
