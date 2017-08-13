import React from 'react'
import {Paper} from 'material-ui'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import SelectSpeciesDialog from './add/species/SelectSpeciesDialog'
import ActiveLayerSection from './ActiveLayerSection'

export default class Layers extends React.Component {
  state = {}
  render () {
    const {layers, onAddLayer, onUpdateLayerProp, onDeleteLayer} = this.props
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
      onDeleteLayer={onDeleteLayer} />
  }

  handleShowAddLayers = () =>
    this.setState(prevState => ({showAddLayersDialog: true}))

  handleHideAddLayers = () =>
    this.setState(prevState => ({showAddLayersDialog: false}))
 }

const ActiveLayers = ({layers, onUpdateLayerProp, onAddLayer, onDeleteLayer}) => (
  <div style={{width: '400px', position: 'absolute', left: '2%', top: '2%'}}>
    <Paper zDepth={3}>
      {Object.keys(layers).map(key => {
        const layer = layers[key]
        return <ActiveLayerSection key={layer.id}
          onChange={(key, value) => { onUpdateLayerProp(layer, key, value) }}
          onDelete={() => onDeleteLayer(layer)}
          {...layer}
          />
      })}
      <FloatingActionButton
        style={{margin: '12px'}}
        onTouchTap={onAddLayer}>
        <ContentAdd />
      </FloatingActionButton>
    </Paper>
  </div>
)
