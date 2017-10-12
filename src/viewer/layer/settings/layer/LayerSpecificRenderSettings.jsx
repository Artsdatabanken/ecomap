import React from 'react'
import HeatmapLayerSettings from './HeatmapLayerSettings'
import TemporalHeatmapLayerSettings from './TemporalHeatmapLayerSettings'
import HexagonLayerSettings from './HexagonLayerSettings'
import ScatterplotLayerSettings from './ScatterplotLayerSettings'

const LayerSpecificRenderSettings = (props) => {
  switch (props.visualizationMode) {
    case 'heatmap' : return <HeatmapLayerSettings {...props} />
    case 'temporal' : return <TemporalHeatmapLayerSettings {...props} />
    case 'scatterplot' : return <ScatterplotLayerSettings {...props} />
    case 'hexagon' : return <HexagonLayerSettings {...props} />
    default: return <div>{props.visualizationMode}</div>
  }
}

export default LayerSpecificRenderSettings
