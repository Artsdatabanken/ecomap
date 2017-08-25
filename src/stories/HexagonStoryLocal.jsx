import React from 'react'
import DeckGL from 'deck.gl'
import EcoHexagonLayer from '../map/layer/EcoHexagonLayer'
import alces from '../../data/sample/artskart_48103.json'
import readGeoJsonPoints from '../translate/GeoJson.js'
import ramp from '../graphics/color/ramps/'

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

export default HexagonStoryLocal => {
  let layer = new EcoHexagonLayer({
    colorRange: ramp.sliceInFours(ramp.magma),
    colorDomain: [0, 20],
    opacity: 1.0,
    coverage: 1.0,
    elevationRange: [0, 500000],
    elevationScale: 1,
    extruded: true,
    getPosition: d => d,
    lowerPercentile: 0,
    upperPercentile: 100,
    lightSettings: {
      lightsPosition: [-0.144528, 49.739968, 80000, -3.807751, 54.104682, 80000],
      ambientRatio: 0.5,
      diffuseRatio: 0.99,
      specularRatio: 0.50,
      lightsStrength: [0.8, 0.0, 0.8, 0.0],
      numberOfLights: 2
    },
    data: points,
    fillColor: '#100060',
    fillOpacity: 0.4,
    radius: 15000,
    viewport: viewport
  })

  return <DeckGL
    {...viewport}
    mixBlendMode='multiply'
    layers={[layer]}
    onWebGLInitialized={(gl) => {
      gl.enable(gl.DEPTH_TEST)
      gl.depthFunc(gl.LEQUAL)
    }}
    />
}
