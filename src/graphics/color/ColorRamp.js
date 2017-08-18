import React from 'react'
import {lookupColor} from '../../graphics/color/ramps'
import theme from '../../theme'

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
    canvas.height = 18

    for (let i = 0; i < canvas.width; i++) {
      context.fillStyle = colorFunction(i)
      context.fillRect(i, 0, 1, canvas.height)
    }

    return context.getImageData(0, 0, canvas.width, canvas.height)
  }

  componentDidMount () {
    const map = ColorRamp.createColorTexture(this.refs.colorbar, (i) => ColorRamp.map(this.props.steps, i))
    this.setState({map})
  }

  static map (steps, i) {
    const color = lookupColor(steps, i)
    return 'rgba(' + color.values.rgb.toString() + ', 1.0)'
  }

  render () {
    return <div style={{display: 'flex', border: '1px solid ' + theme.palette.borderColor}}>
      <canvas ref='colorbar' />
    </div>
  }
}

export default ColorRamp
