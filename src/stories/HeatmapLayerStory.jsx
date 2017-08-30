import React from 'react'
import DeckGL from 'deck.gl'
import {Paper} from 'material-ui'
import HeatmapLayer from '../map/layer/webgl/heatmapFromPoints-layer/heatmapFromPoints-layer'
import alces from '../../data/sample/artskart_48103.json'
import readGeoJsonPoints from '../translate/GeoJson.js'
import ramp from '../graphics/color/ramps/'

const viewport = {
  width: 900,
  height: 800,
  longitude: 15,
  latitude: 64,
  zoom: 4.3,
  pitch: 30,
  bearing: -20
}

const points = readGeoJsonPoints(alces)

export default HeatmapLayerStory => {
  let layer = new HeatmapLayer({
    id: 'heatstory',
    colorRamp: ramp.magma,
    radiusScale: 11111.0,
    fillOpacity: 1.0,
    height: 1.0,
    data: points
  })

  return <Paper style={{backgroundColor: '#ccc', width: viewport.width, height: viewport.height, margin: '10px'}}>
    <DeckGL {...viewport} layers={[layer]}
      onWebGLInitialized={(gl) => {
        gl.enable(gl.DEPTH_TEST)
        gl.depthFunc(gl.LEQUAL)
      }}
    />
  </Paper>
}
