import React from 'react'
import { FlatButton, SelectField, MenuItem } from 'material-ui'
import CustomLayerSettings from './layer/CustomLayerSettings'
import getNext from '../../../componentid'
/* function getCheckBoard() {
var cv = document.getElementById('body');
var ctx = cv.getContext('2d');
const checkboard2 = getCheckboard('#000000', '#ffffff', 256, cv)
return checkboard2
}
*/

export default class LayerSettings extends React.Component {
  handleRenderChange = (event, index, value) =>
    this.props.onChange('renderMethod', value);
  handleBlendModeChange = (event, index, value) =>
    this.props.onChange('blendMode', value);
  render () {
    return (
      <div style={{ marginLeft: '24px', marginRight: '24px' }}>
        <SelectField
          id={getNext()}
          floatingLabelText='Render'
          value={this.props.renderMethod}
          onChange={this.handleRenderChange}
        >
          {false &&
            <div>
              <MenuItem value='fill' primaryText='Single color fill' />
              <MenuItem value='pattern' primaryText='Pattern' />
              <MenuItem value='extrude' primaryText='Extrude 3D' />
              <MenuItem value='gradient' primaryText='Gradient' />
            </div>}
          <MenuItem value='heatmap' primaryText='Heatmap' />
          <MenuItem value='scatterplot' primaryText='Scatterplot' />
          <MenuItem value='hexagon' primaryText='Hexagonal binning' />
        </SelectField>
        <CustomLayerSettings {...this.props} />

        {true &&
          <div>
            <div style={{}}>
              <SelectField
                id={getNext()}
                floatingLabelText='Composition blend'
                value={this.props.blendMode}
                onChange={this.handleBlendModeChange}
              >
                <MenuItem value='color' primaryText='Color' />
                <MenuItem value='color-burn' primaryText='Color burn' />
                <MenuItem value='color-dodge' primaryText='Color dodge' />
                <MenuItem value='darken' primaryText='Darken' />
                <MenuItem value='difference' primaryText='Difference' />
                <MenuItem value='exclusion' primaryText='Exclusion' />
                <MenuItem value='hard-light' primaryText='Hard light' />
                <MenuItem value='hue' primaryText='Hue' />
                <MenuItem value='lighten' primaryText='Lighten' />
                <MenuItem value='luminosity' primaryText='Luminosity' />
                <MenuItem value='multiply' primaryText='Multiply' />
                <MenuItem value='normal' primaryText='Normal' />
                <MenuItem value='overlay' primaryText='Overlay' />
                <MenuItem value='saturation' primaryText='Saturation' />
                <MenuItem value='screen' primaryText='Screen' />
                <MenuItem value='soft-light' primaryText='Soft light' />
              </SelectField>
            </div>
            <div style={{ }}>
              <FlatButton label='Put something descriptive here' onTouchTap={() => this.props.onDelete()} />
              <FlatButton label='Remove' onTouchTap={() => this.props.onDelete()} />
            </div>
          </div>}
      </div>
    )
  }
}
