import React from 'react'
import { Source, Layer, GeoJSONLayer } from 'react-mapbox-gl'
// import elg from './elg.json'

const circleLayout = { visibility: 'visible' }
const linePaint = { 'line-color': '#000000',
'line-width':2,
'line-blur': 0,
'line-opacity': 0.4
}
const lineLayout = { visibility: 'visible' }
const circlePaint = { 'circle-color': '#ff0000',
'circle-radius':8,
'circle-blur': 0.75,
'circle-opacity': 0.7,
'circle-stroke-width': 1,
'circle-stroke-color': '#ffffff',
'circle-stroke-opacity': 0.2
}

class GeoJsonLayer extends React.Component {
  render() {
    return <GeoJSONLayer
      data={this.props.url}
      circleLayout={circleLayout}
      circlePaint={circlePaint}
      lineLayout={lineLayout}
      linePaint={linePaint}
    />
  }
}

export default GeoJsonLayer
