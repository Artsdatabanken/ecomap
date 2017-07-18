import React from 'react'
import LayerSettings from './LayerSettings'
import {Paper, Divider} from 'material-ui'

export default class ActiveLayers extends React.Component {
  render () {
    return (
      <div style={{width: '400px', position: 'absolute', left: '2%', top: '2%'}}>
        <Paper zDepth={3}>
          {Object.keys(this.props.layers).map(key => {
            const layer = this.props.layers[key]
            return <Layer key={layer.id}
              onChange={(key, value) => { this.props.onUpdateLayerProp(layer, key, value) }}
              onDelete={() => this.props.onDelete(layer)}
              {...layer}
          />
          })}
        </Paper>
      </div>)
  }
}

class Layer extends React.Component {
  render () {
    return (
      <div>
        <LayerSettings {...this.props} />
        <Divider inset />
      </div>
    )
  }
}
