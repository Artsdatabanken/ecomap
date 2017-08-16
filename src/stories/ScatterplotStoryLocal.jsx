import React from 'react'
import Scatterplot from '../map/layer/Scatterplot'
import alces from '../../data/sample/artskart_48103.json'
import readGeoJsonPoints from '../translate/GeoJson.js'

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

export default ScatterplotStory =>
  <Scatterplot
    data={points}
    fillColor='#100060'
    fillOpacity={0.4}
    radius={0.5}
    viewport={viewport} />