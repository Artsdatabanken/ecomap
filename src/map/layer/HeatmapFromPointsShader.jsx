import React, { Component } from 'react'
import DeckGL from 'deck.gl'
import {hexToArray} from '../../graphics/color/colorfunc'
import HeatmapFromPointsShaderLayer from './webgl/heatmapFromPoints-layer/heatmapFromPoints-layer'
import viridis from '../../graphics/color/ramps/viridis.json'

export default class HeatmapFromPointsShader extends Component {
  defaultProps = {
  };

  _initialize (gl) {
    gl.disable(gl.DEPTH_TEST)
    gl.enable(gl.BLEND)
  }

  render () {
    const { data, viewport, radius, blendMode, fillOpacity, height } = this.props
    const fillColor = hexToArray(this.props.fillColor, this.props.fillOpacity)
    if (!data) { return null }

    const layer = new HeatmapFromPointsShaderLayer({
      id: 'heatmapfrompointsshader',
      data,
      colorRamp: viridis,
      height: Math.sqrt(height + 1, 2) - 1,
      radiusScale: radius * 2,
      fillOpacity,
      getPosition: d => [d[0], d[1]],
//      getColor: d => fillOpacity,
      getRadius: d => radius * 100000,
      updateTriggers: {
        getColor: { c1: fillColor },
        getRadius: { r1: radius }
      }
    })
    return (
      <DeckGL
        style={{ mixBlendMode: blendMode }}
        {...viewport}
        layers={[layer]}
        onWebGLInitialized={this._initialize}
      />
    )
  }
}