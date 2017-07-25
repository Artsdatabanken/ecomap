import React from 'react'
import DeckGL, {ArcLayer} from 'deck.gl'

const data = [
{'start': [2, 44.2638, 11582.4], 'end': [10.6875, 54.2501, 11582.4], 'name': 'SAS52H'},
{'start': [2.4383, 50.8144, 10972.8], 'end': [8.7149, 40.8265, 10972.8], 'name': 'GWI7PT'}
]

const flights = new ArcLayer({
  id: 'flights',
  getSourcePosition: (x) => x.start,
  getTargetPosition: (x) => x.end,
//  getColor: (x) => [255, 0, 255, 255],
  data: data
})

const viewport = {
  width: 500,
  height: 500,
  longitude: 5,
  latitude: 48,
  zoom: 4,
  pitch: 40,
  bearing: 0
}

export default ArcStory =>
  <DeckGL
    layers={[flights]}
    onWebGLInitialized={(gl) => {
      gl.enable(gl.DEPTH_TEST)
      gl.depthFunc(gl.LEQUAL)
    }}
    {...viewport} />
