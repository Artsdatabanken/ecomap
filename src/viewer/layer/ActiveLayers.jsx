import React from 'react'
import LayerSettings from './LayerSettings'
import {Paper, Divider} from 'material-ui'

export default class ActiveLayers extends React.Component {
  state = {
    layers: [
        {code: '6SO', renderMethod: 'fill', name: 'Bioklimatisk sone', sub: 'Regional økoklin', url: 'http://artsdatabanken.no/Pages/181384', image: 'http://docplayer.me/docs-images/57/41018892/images/36-0.png', fillColor: '#4080ff', fillOpacity: 0.9, blendMode: 'normal'},
        {code: '31168', renderMethod: 'heatmap', name: 'Ulv', sub: 'Canis Lupus', url: 'http://artsdatabanken.no/Taxon/31168', image: 'http://artsdatabanken.no/Media/F8613?mode=160x160', fillColor: '#ff0000', fillOpacity: 0.5, blendMode: 'normal'},
        {code: 'NiN NA-V2', renderMethod: 'fill', name: 'Myr- og sumpskogsmark', sub: 'Våtmarksystem', url: 'http://artsdatabanken.no/Pages/171964', image: 'http://artsdatabanken.no/Media/F1442?mode=160x160', fillColor: '#70af40', fillOpacity: 0.8, blendMode: 'normal'}
    ]}

  render () {
    return (
      <div style={{position: 'absolute', left: '10%', top: '10%'}}>
        <Paper style={{width: 400}}>
          {this.state.layers.map(layer => <Layer key={layer.code}
            onUpdate={(key, value) => { console.log(key, value); this.handleUpdateLayerProp(layer, key, value) }}
            onUpdateColor={(color) => this.handleUpdateLayerProp(layer, 'color', color)} {...layer}
            onDelete={() => this.handleDelete(layer)}
          />)}
        </Paper>
      </div>)
  }

  handleDelete = (layer) => {
    let layers = this.state.layers.filter(l => l !== layer)
    this.setState({layers})
  }

  handleUpdateLayerProp = (layer, key, value) => {
    console.log(layer.code, key, value)
    let layers = this.state.layers
    let _layer = layers.filter(l => l.code === layer.code)[0]
    _layer[key] = value
    this.setState({layers: layers})
  }
}

class Layer extends React.Component {
  constructor () {
    super()
    this.state = {renderMethod: 1, showColorDialog: false}
  }
  render () {
    return (
      <div>
        <LayerSettings {...this.props}
          onBuild={() => this.setState(prevState => ({expanded: !prevState.expanded}))}
          onDelete={() => this.props.onDelete()}
          onColorSwatchClick={() => this.setState(prevState => ({showColorDialog: !prevState.showColorDialog}))}
          />
        <Divider />
      </div>
    )
  }
}
