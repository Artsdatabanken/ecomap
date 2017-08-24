import React, {createElement, Children} from 'react'
import PropTypes from 'prop-types'
// import GeoJsonLayer from './GeoJsonLayer'
// import RasterTileLayer from './RasterTileLayer'
// import VectorTileLayer from './VectorTileLayer'
import Hexagon from './Hexagon'
import Scatterplot from './Scatterplot'
import HeatmapFromPoints from './HeatmapFromPoints'
import ArtskartDataSourceContainer from './ArtskartDataSourceContainer'
import ramp from '../../graphics/color/ramps/'
import DeckGL from 'deck.gl'
import { HexagonLayer } from 'deck.gl'

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
        viewport: viewport
      }))
    }
    return layers
  }

  createEcoMapLayer = ({
    id,
    layer,
    data,
    viewport
  }) => {
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
new HexagonLayer({

  id: 'heatmap',
  colorRange: ramp.sliceInFours(ramp[paint.colorRamp]),
  colorDomain: [paint.colorDomainMin * 50, paint.colorDomainMax * 50],
  opacity: paint.fillOpacity,
  coverage: paint.coverage,
  data: data,
  elevationRange: [paint.elevationMin * 200000, paint.elevationMax * 500000],
  elevationScale: 1, // this.easeInOutQuart(this.state.elevationScale),
  extruded: paint.elevationMax > 0,
  getPosition: d => d,
//  lightSettings: LIGHT_SETTINGS,
  onHover: this.props.onHover,
  pickable: Boolean(this.props.onHover),
  radius: paint.radius * 50000,
  lowerPercentile: paint.lowerPercentile * 100,
  upperPercentile: paint.upperPercentile * 100,
  blendMode: paint.blendMode
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
      console.log(layerdata)
      return {layerdata: layerdata}
    })
  }
}

class Decker extends React.Component {
  render () {
    return <DeckGL
      layers={this.props.layers}
      style={{mixBlendMode: 'multiply'}}
      {...this.props.viewport}
      onWebGLInitialized={this._initialize} />
  }

  _initialize (gl) {
  //  gl.disable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
  }
}
