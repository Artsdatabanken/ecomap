import React from 'react'
import DeckGL from 'deck.gl'
import {Paper} from 'material-ui'
import TemporalHeatmapLayer from '../map/layer/webgl/temporalHeatmap-layer/temporalHeatmap-layer'
import sampleData from '../../data/sample/temporalAnimationSource.png'
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

export default TemporalHeatmapLayerStory => {
  let layer = new TemporalHeatmapLayer({
    id: 'temporalheatstory',
    colorRamp: ramp.magma,
    radiusScale: 11111.0,
    fillOpacity: 1.0,
    height: 1.0,
    data: [[14, 66, 0]],
    temporalData: sampleData
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
