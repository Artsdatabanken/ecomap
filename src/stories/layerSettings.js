import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { muiTheme } from 'storybook-addon-material-ui'
import { Paper } from 'material-ui'
import ActiveLayers from '../viewer/layer/ActiveLayers'
import HexagonLayerSettings from '../viewer/layer/settings/layer/HexagonLayerSettings'
import ScatterplotLayerSettings from '../viewer/layer/settings/layer/ScatterplotLayerSettings'
import HeatmapLayerSettings from '../viewer/layer/settings/layer/HeatmapLayerSettings'

class ActiveLayersTest extends React.Component {
  state = {
    layers: {
      '31241': {
        id: 31241,
        title: 'Alces alces',
        subTitle: 'elk',
        imageUrl:
          'https://farm5.staticflickr.com/4107/4839886016_d11b6d2cdf.jpg',
        dataUrl:
          'http://webtjenester.artsdatabanken.no/Artskart/api/listhelper/31241/observations?&fromYear=1981&toYear=2012&fromMonth=1&toMonth=12&type=all&region=all&scientificNameId=48103',
        source: 'geojson',
        visible: true,
        raster: false,
        paint: {
          fillColor: '#ff0000',
          fillOpacity: 1,
          renderMethod: 'heatmap',
          blendMode: 'multiply'
        }
      }
    }
  };

  handleUpdateLayerProp = (o, key, value) => {
    const layers = this.state.layers
    layers[o.id].paint[key] = value
    this.setState({ layers })
  };

  handleDeleteLayer = (layer) => {
    const layers = this.state.layers
    delete layers[layer.id]
    this.setState({ layers })
  };

  render () {
    return (
      <ActiveLayers
        layers={this.state.layers}
        onUpdateLayerProp={this.handleUpdateLayerProp}
        onDeleteLayer={(layer) => this.handleDeleteLayer(layer)}
      />
    )
  }
}

const layerSettings = () =>
  storiesOf('Layer Settings', module)
    .addDecorator(muiTheme())
    .add('primary', () =>
      <NeutralBackground style={{ margin: '20px' }}>
        <ActiveLayersTest />
      </NeutralBackground>
    )
    .add('Heatmap', () => {
      let paint = {
        fillColor: '#ff0000',
        coverage: 0.95,
        fillOpacity: 1.0,
        radius: 1.0,
        renderMethod: 'hexagon',
        blendMode: 'multiply'
      }
      return (
        <GiftWrap>
          <HeatmapLayerSettings
            {...paint}
            onChange={action('onUpdateLayerProp')}
          />
        </GiftWrap>
      )
    })
    .add('Scatterplot', () => {
      let paint = {
        fillColor: '#ff0000',
        coverage: 0.95,
        fillOpacity: 1.0,
        radius: 1.0,
        renderMethod: 'hexagon',
        blendMode: 'multiply'
      }
      return (
        <GiftWrap>
          <ScatterplotLayerSettings
            {...paint}
            onChange={action('onUpdateLayerProp')}
          />
        </GiftWrap>
      )
    })
    .add('Hexagon', () => {
      let paint = {
        fillColor: '#ff0000',
        coverage: 0.95,
        fillOpacity: 1.0,
        radius: 1.0,
        renderMethod: 'hexagon',
        blendMode: 'multiply'
      }
      return (
        <GiftWrap>
          <HexagonLayerSettings
            {...paint}
            onChange={action('onUpdateLayerProp')}
          />
        </GiftWrap>
      )
    })

const GiftWrap = ({children}) =>
  <NeutralBackground>
    <div style={{ width: '400px', padding: '20px' }}>
      <Paper zDepth={4} style={{padding: '20px'}}>
        {children}
      </Paper>
    </div>
  </NeutralBackground>

const NeutralBackground = ({children}) =>
  <div style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: '#ccc'}}>
    {children}
  </div>

export default layerSettings
