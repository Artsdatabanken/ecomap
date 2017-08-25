import React, {createElement, Children} from 'react'
import PropTypes from 'prop-types'
// import GeoJsonLayer from './GeoJsonLayer'
// import RasterTileLayer from './RasterTileLayer'
// import VectorTileLayer from './VectorTileLayer'
import EcoHexagonLayer from './EcoHexagonLayer'
import Scatterplot from './Scatterplot'
import HeatmapFromPoints from './HeatmapFromPoints'
import ArtskartDataSourceContainer from './ArtskartDataSourceContainer'
import ramp from '../../graphics/color/ramps/'
import DeckGL, { HexagonLayer } from 'deck.gl'

const ACon = ({layers, onData}) => {
  const r = []
  for (const id in layers) {
    const layer = layers[id]
    if (!layer.visible) continue
    r.push(
      <ArtskartDataSourceContainer
        key={id}
        id={id}
        title={layer.subTitle}
        dataUrl={layer.dataUrl}
        onData={onData} />
    )
  }
  return <span>{r}</span>
}

export default class MapLayerStack extends React.Component {
  static propTypes = {
    layers: PropTypes.object.isRequired
  }

  state = {layerdata: {}}

  render () {
    return (
      <span>
        <ACon
          layers={this.props.layers}
          onData={this.handleData} />
        <Decker viewport={this.props.viewport}
          layers={this.createGLLayers()}
          onWebGLInitialized={this._initialize} />
      </span>
    )
  }

  createGLLayers = (viewport) => {
    let layers = []
    for (const id in this.state.layerdata) {
      const data = this.state.layerdata[id]
      const layer = this.props.layers[id]
      layers.push(this.createEcoMapLayer({
        key: id,
        id: id,
        layer: layer,
        data: data,
        viewport: viewport,
        onHover: this.handleHover
      }))
    }
    return layers
  }

  handleHover = (a, b) => {
    console.log(a)
    console.log(b)
  }

  createEcoMapLayer = ({
    id,
    layer,
    data,
    viewport,
    onHover
  }) => {
    console.log('onHover: ', Boolean(onHover))
    const paint = layer.paint
    switch (paint.visualizationMode) {
      case 'heatmap':
        return (
          <HeatmapFromPoints
            key={'heat' + id}
            id={id}
            title={layer.title}
            data={data}
            viewport={viewport}
            {...paint}
        />
        )
      case 'scatterplot':
        return (
          <Scatterplot
            key={'scat' + id}
            id={id}
            title={layer.title}
            data={data}
            viewport={viewport}
            {...paint}
        />
        )
      case 'hexagon':
        return (
 /*         <Hexagon
            key={'hexa' + id}
            id={id}
            title={layer.title}
            colorRange={ramp.sliceInFours(ramp[paint.colorRamp])}
            opacity={paint.fillOpacity}
            data={data}
            radius={paint.radius}
            coverage={paint.coverage}
            elevationMin={paint.elevationMin}
            elevationMax={paint.elevationMax}
            colorDomainMin={paint.colorDomainMin}
            colorDomainMax={paint.colorDomainMax}
            lowerPercentile={paint.lowerPercentile}
            upperPercentile={paint.upperPercentile}
            blendMode={paint.blendMode}
            viewport={viewport}
*/
new EcoHexagonLayer({

  id: `${id}hexa`,
  colorRange: ramp.sliceInFours(ramp[paint.colorRamp]),
  colorDomain: [paint.colorDomainMin * 50, paint.colorDomainMax * 50],
  opacity: paint.fillOpacity,
  coverage: paint.coverage,
  data: data,
  elevationRange: [paint.elevationMin * 200000, paint.elevationMax * 500000],
  elevationScale: 1, // this.easeInOutQuart(this.state.elevationScale),
  extruded: paint.elevationMax > 0,
  getPosition: d => d,
  lightSettings: {
    lightsPosition: [-0.144528, 49.739968, 80000, -3.807751, 54.104682, 80000],
    ambientRatio: 0.5,
    diffuseRatio: 0.99,
    specularRatio: 0.50,
    lightsStrength: [0.8, 0.0, 0.8, 0.0],
    numberOfLights: 2
  },
  onHover: onHover,
  pickable: Boolean(onHover),
  radius: paint.radius * 50000,
  lowerPercentile: paint.lowerPercentile * 100,
  upperPercentile: paint.upperPercentile * 100
})
        )
      default:
        console.error('unknown visualization', layer.paint.visualizationMode)
        return null
    }
  }

  handleData = (id, data) => {
    this.setState((prevState) => {
      let layerdata = prevState.layerdata
      layerdata[id] = data
      return {layerdata: layerdata}
    })
  }
}

class Decker extends React.Component {
  render () {
    return <DeckGL
      layers={this.props.layers}
      style={{mixBlendMode: 'normal'}}
      {...this.props.viewport}
      onWebGLInitialized={this._initialize} />
  }

  _initialize (gl) {
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
  }
}
