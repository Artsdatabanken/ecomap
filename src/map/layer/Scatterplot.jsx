import React, {Component} from 'react'
import DeckGL, {ScatterplotLayer} from 'deck.gl'
import {hexToArray} from '../../graphics/color/colorfunc'

export default class Scatterplot extends Component {
  defaultProps = {
    blendMode: 'multiply'
  }

  _initialize (gl) {
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
  }

  render () {
    const {data, viewport, radius, blendMode} = this.props
    const fillColor = hexToArray(this.props.fillColor, this.props.fillOpacity)
    if (!data) {
      return null
    }
    const layer = new ScatterplotLayer({
      id: 'scatter-plot',
      data,
//      radiusScale: radius * 60,
      radiusMinPixels: 1,
      getPosition: d => [d[0], d[1]],
      getColor: d => fillColor,
      getRadius: d => radius * 25000,
      updateTriggers: {
        getColor: {c1: fillColor},
        getRadius: {r1: radius}
      }
    })
    return (
      <DeckGL
        style={{mixBlendMode: blendMode}}
        {...viewport}
        layers={[layer]}
        onWebGLInitialized={this._initialize} />
    )
  }
}
