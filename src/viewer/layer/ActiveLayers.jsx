import React from 'react'
import LayerSettings from './LayerSettings'
import {Paper, Divider} from 'material-ui'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import SelectSpeciesDialog from './add/species/SelectSpeciesDialog'

export default class Layers extends React.Component {
  state = {}
  render () {
    const {layers, onAddLayer, onUpdateLayerProp, onDelete} = this.props
    const {showAddLayersDialog} = this.state
    if (showAddLayersDialog) {
      return <SelectSpeciesDialog
        onClose={this.handleHideAddLayers}
        onAddLayer={onAddLayer} />
    }
    return <ActiveLayers
      layers={layers}
      onUpdateLayerProp={onUpdateLayerProp}
      onAdd={this.handleShowAddLayers}
      onDelete={onDelete} />
  }

  handleShowAddLayers = () =>
    this.setState(prevState => ({showAddLayersDialog: true}))

  handleHideAddLayers = () =>
    this.setState(prevState => ({showAddLayersDialog: false}))
 }

const ActiveLayers = ({layers, onUpdateLayerProp, onAdd, onDelete}) => (
  <div style={{width: '400px', position: 'absolute', left: '2%', top: '2%'}}>
    <Paper zDepth={3}>
      {Object.keys(layers).map(key => {
        const layer = layers[key]
        return <Layer key={layer.id}
          onChange={(key, value) => { onUpdateLayerProp(layer, key, value) }}
          onDelete={() => onDelete(layer)}
          {...layer}
          />
      })}
      <FloatingActionButton
        style={{margin: '12px'}}
        onTouchTap={onAdd}>
        <ContentAdd />
      </FloatingActionButton>
    </Paper>
  </div>
)

const Layer = (props) => (
  <div>
    <LayerSettings {...props} />
    <Divider />
  </div>
)
