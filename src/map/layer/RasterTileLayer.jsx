import React from 'react'
import { Source, Layer } from 'react-mapbox-gl'

const RasterTileLayer = ({layerId, layer}) =>
  <span>
    <Source key={`S${layerId}`} id={layerId} tileJsonSource={{
      type: 'raster',
      tiles: [`http://localhost:8080/512/${layerId}/{z}/{x}/{y}.png`],
      tileSize: 512
    }}
    />
    <Layer
      key={`L${layerId}`}
      id={layerId}
      type='vector'
      sourceId={layerId}
      paint={{
        'raster-fade-duration': 300,
        'raster-opacity': 0.81
      }}
    />
  </span>

export default RasterTileLayer
