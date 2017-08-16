import React from 'react'
import Hexagon from '../map/layer/Hexagon'
import alces from '../../data/sample/artskart_48103.json'
import readGeoJsonPoints from '../translate/GeoJson.js'
import ramp from '../graphics/ramps/'

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

export default HexagonStory =>
  <Hexagon
    data={points}
    colorRamp={ramp.magma}
    fillColor='#100060'
    fillOpacity={0.4}
    radius={0.5}
    viewport={viewport} />
