import React from 'react'
import HeatmapFromPointsLayer from '../map/layer/HeatmapFromPoints'
import alces from '../../data/sample/artskart_48103.json'
import readGeoJsonPoints from '../translate/GeoJson.js'
import viridis from '../../graphics/color/ramps/viridis.json'

const viewport = {
  width: 900,
  height: 800,
  longitude: 9,
  latitude: 64,
  zoom: 4,
  pitch: 0,
  bearing: 0
}

const points = readGeoJsonPoints(alces)

export default HeatmapFromPointsStory =>
  <div style={{ backgroundColor: '#cdcdcd' }}>
    <HeatmapFromPointsLayer
      data={points}
      colorRamp={viridis}
      fillOpacity={0.919}
      radius={0.35}
      width={1.0}
      height={0.18}
      viewport={viewport}
    />
  </div>
