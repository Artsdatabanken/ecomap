import React from 'react'
import { Paper } from 'material-ui'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import SelectSpeciesDialog from './add/species/SelectSpeciesDialog'
import ActiveLayerStrip from './ActiveLayerStrip'

export default class Layers extends React.Component {
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
      <ActiveLayers
        layers={layers}
        onUpdateLayerProp={onUpdateLayerProp}
        onAdd={this.handleShowAddLayers}
        onDeleteLayer={onDeleteLayer}
      />
    )
  }

  handleShowAddLayers = () =>
    this.setState(prevState => ({ showAddLayersDialog: true }))

  handleHideAddLayers = () =>
    this.setState(prevState => ({ showAddLayersDialog: false }))
}

const ActiveLayers = ({ layers, onUpdateLayerProp, onAdd, onDeleteLayer }) =>
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
            onDelete={() => onDeleteLayer(layer)}
            {...layer}
          />
        )
      })}
      <FloatingActionButton style={{ margin: '12px' }} onTouchTap={onAdd}>
        <ContentAdd />
      </FloatingActionButton>
    </Paper>
  </div>
