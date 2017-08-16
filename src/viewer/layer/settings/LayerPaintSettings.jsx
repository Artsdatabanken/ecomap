import React from 'react'
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

export default class LayerPaintSettings extends React.Component {
  render () {
    return (
      <span>
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
      </span>
    )
  }
}