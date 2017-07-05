import PropTypes from 'prop-types'
import React from 'react'
import { Source, Layer } from 'react-mapbox-gl'
import GeoJsonLayer from './GeoJsonLayer'

export default class NinLayerStack extends React.Component {
  static propTypes = {
    layers: PropTypes.object.isRequired
  }

  render () {
    const r = []
    for (const id in this.props.layers) {
      if (!Object.prototype.hasOwnProperty.call(this.props.layers, id)) continue
      const layer = this.props.layers[id]
      if (!layer.visible) continue

      r.push(NinLayerStack.createLayer(id, layer))
    }
    return (
      <div>
        {r}
      </div>
    )
  }

  static createLayer (id, layer) {
    switch (layer.source) {
      case 'geojson':
        return <GeoJsonLayer key={id} url={layer.url} />
      default:
        if (layer.raster) {
          return NinLayerStack.renderRaster(id, layer)
        } else {
          return NinLayerStack.renderVector(id, layer)
        }
    }
  }

  static renderVector (ninCode, layer) {
    console.log(layer)
    let r = []
    r.push(
      <Source
        key='skalk'
        id='skalk'
        tileJsonSource={{
          type: 'vector',
          tiles: [`http://localhost:8088/l1/{z}/{x}/{y}/tile.mvt`],
          tileSize: 512
        }}
      />
    )
    let layerOptions = {
      'source-layer': 'l1'
    }
    const filter = layer.filter
    if (filter) {
      layerOptions.filter = filter
    }
    r.push(
      <Layer
        key='l1'
        id={'l1'}
        type='fill-extrusion'
        sourceId='skalk'
        layerOptions={layerOptions}
        fillExtrusionColor='rgba(100,0,0,0.5)'
        fillExtrusioxnHeight='800'
        paint={{
          //              "fill-color": "rgba(0, 100, 222, 0.35)",
          'fill-extrusion-color': {
            property: 'kalkinnhol',
            stops: [
              [{ zoom: 0, value: '1' }, 'hsl(40,10%,50%)'],
              [{ zoom: 0, value: '2' }, 'hsl(30,30%,50%)'],
              [{ zoom: 0, value: '3' }, 'hsl(20,50%,50%)'],
              [{ zoom: 0, value: '4' }, 'hsl(10,70%,50%)'],
              [{ zoom: 0, value: '5' }, 'hsl(0,100%,50%)']
            ]
          },
          //                    "rgba(0,0,255,0.9)",
          'fill-extrusion-opacity': 0.7,
          'fill-extrusion-height': {
            property: 'kalkinnhol',
            stops: [
              [{ zoom: 0, value: '1' }, 0],
              [{ zoom: 0, value: '2' }, 4000],
              [{ zoom: 0, value: '3' }, 8000],
              [{ zoom: 0, value: '4' }, 16000],
              [{ zoom: 0, value: '5' }, 32000]
            ]
          }
        }}
      />
    )
    return r
  }

  static renderRaster (ninCode, layer) {
    const sourceOptions = {
      type: 'raster',
      tiles: [`http://localhost:8080/512/${ninCode}/{z}/{x}/{y}.png`],
      tileSize: 512
    }
    const sourceKey = `S${ninCode}`
    const layerKey = `L${ninCode}`
    return (
      <div>
        <Source key={sourceKey} id={ninCode} tileJsonSource={sourceOptions} />);
        <Layer
          key={layerKey}
          id={ninCode}
          type='vector'
          sourceId={ninCode}
          paint={{
            'raster-fade-duration': 300,
            'raster-opacity': 0.81
          }}
        />
      </div>
    )
  }
}
/*
const TiledRasterLayer = ({ ninCode }) =>
  <div>
    <Source
      key={`S${ninCode}`}
      id={ninCode}
      tileJsonSource={{
        type: 'raster',
        tiles: [`http://localhost:8080/512/${ninCode}/{z}/{x}/{y}.png`],
        tileSize: 512
      }}
    />);
    <Layer
      key={`L${ninCode}`}
      id={ninCode}
      type="vector"
      sourceId={ninCode}
      paint={{
        'raster-fade-duration': 300,
        'raster-opacity': 0.81
      }}
    />
  </div>
*/
