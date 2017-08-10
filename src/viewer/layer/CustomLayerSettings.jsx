import React from 'react'
import HeatmapLayerSettings from './HeatmapLayerSettings'
import HexagonLayerSettings from './HexagonLayerSettings'
import ScatterplotLayerSettings from './ScatterplotLayerSettings'

const CustomLayerSettings = (props) => {
  switch (props.renderMethod) {
    case 'heatmap' : return <HeatmapLayerSettings {...props} />
    case 'scatterplot' : return <ScatterplotLayerSettings {...props} />
case 'hexagon' : return <HexagonLayerSettings {...props} />
    default: return <div>{this.props.renderMethod}</div>
  }
}

export default CustomLayerSettings
