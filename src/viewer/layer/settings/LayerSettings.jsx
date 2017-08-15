import React from 'react'
import { FlatButton } from 'material-ui'
import CustomLayerSettings from './layer/CustomLayerSettings'
import CompositionBlendMode from './CompositionBlendMode'
import VisualizationMode from './VisualizationMode'

/* function getCheckBoard() {
var cv = document.getElementById('body');
var ctx = cv.getContext('2d');
const checkboard2 = getCheckboard('#000000', '#ffffff', 256, cv)
return checkboard2
}
*/

export default class LayerSettings extends React.Component {
  render () {
    console.log(this.props.visualizationMode)
    return (
      <div style={{ marginLeft: '24px', marginRight: '24px' }}>
        <div style={{position: 'relative', float: 'right'}}>
          <FlatButton label='Remove' onTouchTap={() => this.props.onDelete()} />
        </div>
        <VisualizationMode
          mode={this.props.visualizationMode}
          onChange={(event, index, value) =>
            this.props.onChange('visualizationMode', value)} />
        <CustomLayerSettings {...this.props} />
        <CompositionBlendMode
          blendMode={this.props.blendMode}
          handleBlendModeChange={(event, index, value) =>
            this.props.onChange('blendMode', value)}
        />
        <div style={{ }}>
          <FlatButton label='Put something descriptive here' onTouchTap={() => this.props.onAddLinkedLayer()} />
        </div>
      </div>
    )
  }
}
