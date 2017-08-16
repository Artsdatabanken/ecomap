import React from 'react'
import { FlatButton, Paper } from 'material-ui'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import SelectSpeciesDialog from './add/species/SelectSpeciesDialog'
import ActiveLayerStrip from './ActiveLayerStrip'

export default class ActiveLayers extends React.Component {
  state = {}
  render () {
    const { layers, onAddLayer, onUpdateLayerProp, onDeleteLayer } = this.props
    const { showAddLayersDialog } = this.state
    if (showAddLayersDialog) {
      return (
        <SelectSpeciesDialog
          onClose={this.handleHideAddLayers}
          onAddLayer={onAddLayer}
        />
      )
    }
    return (
      <Layers
        layers={layers}
        onUpdateLayerProp={onUpdateLayerProp}
        onAdd={this.handleShowAddLayers}
        onAddLinkedLayer={this.handleAddLinkedLayer}
        onDeleteLayer={onDeleteLayer}
      />
    )
  }

  handleAddLinkedLayer = () =>
    this.setState(prevState => ({ showAddLayersDialog: true, addingLinkedLayer: true }))
  handleShowAddLayers = () =>
    this.setState(prevState => ({ showAddLayersDialog: true }))
  handleHideAddLayers = () =>
    this.setState(prevState => ({ showAddLayersDialog: false, addingLinkedLayer: false }))
}

const Layers = ({
  layers, onUpdateLayerProp, onAdd, onAddLinkedLayer, onDeleteLayer }) =>
    <div
      style={{
        width: '400px',
        left: '20px',
        top: '20px',
        bottom: '20px',
        position: 'absolute',
        overflowY: 'auto'
      }}
  >
      <Paper zDepth={3}>
        {Object.keys(layers).map(key => {
          const layer = layers[key]
          return (
            <ActiveLayerStrip
              key={layer.id}
              onChange={(key, value) => {
                onUpdateLayerProp(layer, key, value)
              }}
              onAddLinkedLayer={() => onAddLinkedLayer(layer)}
              onDelete={() => onDeleteLayer(layer)}
              {...layer}
          />
          )
        })}
        <FlatButton label='Add' onTouchTap={onAdd} />
      </Paper>
    </div>
