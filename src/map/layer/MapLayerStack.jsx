import React from 'react'
import PropTypes from 'prop-types'
import EcoHexagonLayer from './EcoHexagonLayer'
import HeatmapFromPointsLayer from './webgl/heatmapFromPoints-layer/heatmapFromPoints-layer'
import TemporalHeatmapLayer from './webgl/temporalHeatmap-layer/temporalHeatmap-layer'
import ArtskartDataSourceContainer from './ArtskartDataSourceContainer'
import ramp from '../../graphics/color/ramps/'
import DeckGL, { ScatterplotLayer } from 'deck.gl'
import { hexToArray } from '../../graphics/color/colorfunc'

const ACon = ({ layers, onData }) => {
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
        onData={onData}
      />
    )
  }
  return <span>{r}</span>
}

export default class MapLayerStack extends React.Component {
  static propTypes = {
    layers: PropTypes.object.isRequired,
    paint: PropTypes.object.isRequired
  }

  state = { layerdata: {} }

  render () {
    return (
      <span>
        <ACon layers={this.props.layers} onData={this.handleData} />
        <Decker
          viewport={this.props.viewport}
          layers={this.createGLLayers()}
          onWebGLInitialized={this._initialize}
          blendMode={this.props.paint.blendMode}
        />
      </span>
    )
  }

  createGLLayers = viewport => {
    let layers = []
    for (const id in this.state.layerdata) {
      const data = this.state.layerdata[id]
      const layer = this.props.layers[id]
      layers.push(
        this.createEcoMapLayer({
          key: id,
          id: id,
          layer: layer,
          data: data,
          viewport: viewport,
          onHover: this.handleHover
        })
      )
    }
    return layers
  }

  handleHover = (a, b) => {
    console.log(a)
    console.log(b)
  }

  createEcoMapLayer = ({ id, layer, data, onHover }) => {
    console.log('onHover: ', Boolean(onHover))
    const paint = layer.paint
    switch (paint.visualizationMode) {
      case 'temporal':
        return new TemporalHeatmapLayer({
          time: 0, // time,
          id: 'temporalheatstory',
          colorRamp: ramp,
          radiusScale: 593210.0,
          fillOpacity: 1.0,
          height: 1.0,
          data: [[14, 66, 0]],
          temporalData: temporalData
        })
/*
        return new TemporalHeatmapLayer({
          id: 'theat' + id,
          title: layer.title,
          temporalData: data,
          colorRamp: ramp[paint.colorRamp],
          fillOpacity: paint.fillOpacity,
          height: paint.height,
          radiusScale: paint.radiusScale * 20000
        }) */
      case 'heatmap':
        return new HeatmapFromPointsLayer({
          id: 'heat' + id,
          title: layer.title,
          data: data,
          colorRamp: ramp[paint.colorRamp],
          fillOpacity: paint.fillOpacity,
          height: paint.height,
          radiusScale: paint.radiusScale * 20000
        })
      case 'scatterplot':
        const fillColor = hexToArray(paint.fillColor, paint.fillOpacity)
        return new ScatterplotLayer({
          id: 'scat' + id,
          data,
          radiusMinPixels: 1,
          getPosition: d => [d[0], d[1]],
          getColor: d => fillColor,
          getRadius: d => paint.radiusScale * 25000,
          updateTriggers: {
            getColor: { c1: fillColor },
            getRadius: { r1: paint.radiusScale }
          }
        })
      case 'hexagon':
        return new EcoHexagonLayer({
          id: `${id}hexa`,
          colorRamp: ramp[paint.colorRamp],
          colorDomain: [paint.colorDomainMin * 50, paint.colorDomainMax * 50],
          opacity: paint.fillOpacity,
          coverage: paint.coverage,
          data: data,
          elevationRange: [
            paint.elevationMin * 200000,
            paint.elevationMax * 500000
          ],
          elevationScale: 1, // this.easeInOutQuart(this.state.elevationScale),
          extruded: paint.elevationMax > 0,
          getPosition: d => d,
          lightSettings: {
            lightsPosition: [
              -0.144528,
              49.739968,
              80000,
              -3.807751,
              54.104682,
              80000
            ],
            ambientRatio: 0.5,
            diffuseRatio: 0.99,
            specularRatio: 0.5,
            lightsStrength: [0.8, 0.0, 0.8, 0.0],
            numberOfLights: 2
          },
          onHover: onHover,
          pickable: Boolean(onHover),
          radius: paint.radiusScale * 50000,
          lowerPercentile: paint.lowerPercentile * 100,
          upperPercentile: paint.upperPercentile * 100
        })
      default:
        console.error('unknown visualization', layer.paint.visualizationMode)
        return null
    }
  }

  handleData = (id, data) => {
    this.setState(prevState => {
      let layerdata = prevState.layerdata
      layerdata[id] = data
      return { layerdata: layerdata }
    })
  }
}

class Decker extends React.Component {
  render () {
    return (
      <DeckGL
        layers={this.props.layers}
        style={{ mixBlendMode: this.props.blendMode }}
        {...this.props.viewport}
        onWebGLInitialized={this._initialize}
      />
    )
  }

  _initialize (gl) {
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
  }
}
