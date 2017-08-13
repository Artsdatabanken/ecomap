import React from 'react'
import ExperimentalShader from '../map/layer/ExperimentalShader'
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

export default ExperimentalShaderStory =>
  <ExperimentalShader
    data={points}
    fillColor='#400010'
    fillOpacity={0.919}
    radius={0.15}
    viewport={viewport} />
