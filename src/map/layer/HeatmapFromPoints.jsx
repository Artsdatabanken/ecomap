import React, { Component } from 'react'
import DeckGL from 'deck.gl'
import HeatmapFromPointsLayer from './webgl/heatmapFromPoints-layer/heatmapFromPoints-layer'
import ramp from '../../graphics/color/ramps/'
export default class HeatmapFromPoints extends Component {
  _initialize (gl) {
    gl.disable(gl.DEPTH_TEST)
    gl.enable(gl.BLEND)
  }

  render () {
    const { data, viewport, radius, blendMode, fillOpacity, height, colorRamp } = this.props
    if (!data) { return null }
    const layer = new HeatmapFromPointsLayer({
      id: 'heatmapfrompoints',
      data,
      colorRamp: ramp[colorRamp],
      height: Math.sqrt(height + 1, 2) - 1,
      radiusScale: radius * 2,
      fillOpacity,
      getPosition: d => [d[0], d[1]],
//      getColor: d => fillOpacity,
      getRadius: d => radius * 100000
/*      updateTriggers: {
        getColorRamp: { c1: colorRamp },
        getRadius: { r1: radius }
      } */
    })
    return (
      <DeckGL
        style={{ mixBlendMode: blendMode }}
        {...viewport}
        layers={[layer]}
      />
    )
  }
}
