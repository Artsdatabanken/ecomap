import React, {Component} from 'react'
import DeckGL, {ScatterplotLayer} from 'deck.gl'
import {hexToArray} from '../../viewer/layer/colorfunc'

export default class Scatterplot extends Component {
  render () {
    const {data, viewport, radius} = this.props
    const fillColor = hexToArray(this.props.fillColor, this.props.fillOpacity)
    console.log(data)
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
      <DeckGL {...viewport} layers={[layer]} />
    )
  }
}
