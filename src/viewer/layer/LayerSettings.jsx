import React from 'react'
import { ChromePicker } from 'react-color'
import { Divider, SelectField, MenuItem } from 'material-ui'
import ActionInfo from 'material-ui/svg-icons/action/info'
import ActionDelete from 'material-ui/svg-icons/action/delete-forever'
import ActionBuild from 'material-ui/svg-icons/action/build'
import {hexToRgba} from './colorfunc'
import CustomLayerSettings from './CustomLayerSettings'
import getNext from '../../componentid'
/* function getCheckBoard() {
var cv = document.getElementById('body');
var ctx = cv.getContext('2d');
const checkboard2 = getCheckboard('#000000', '#ffffff', 256, cv)
return checkboard2
}
*/

export default class LayerSettings extends React.Component {
  handleRenderChange = (event, index, value) => this.props.onChange('renderMethod', value)
  handleBlendModeChange = (event, index, value) => this.props.onChange('blendMode', value)
  render () {
    return (<div style={{marginLeft: '24px', marginRight: '24px'}}>
      <Divider />
      <SelectField id={getNext()}
        floatingLabelText='Render'
        value={this.props.renderMethod}
        onChange={this.handleRenderChange}>
        {false && <div>
          <MenuItem value='fill' primaryText='Single color fill' />
          <MenuItem value='pattern' primaryText='Pattern' />
          <MenuItem value='extrude' primaryText='Extrude 3D' />
          <MenuItem value='gradient' primaryText='Gradient' />
        </div>
        }
        <MenuItem value='heatmap' primaryText='Heatmap' />
        <MenuItem value='scatterplot' primaryText='Scatterplot' />
        <MenuItem value='hexagon' primaryText='Hexagonal binning' />
      </SelectField>
      <Divider />
      <CustomLayerSettings {...this.props} />
      <Divider />
      {this.props.showColorDialog && <div style={{position: 'relative', left: 64, margin: 10}}>
        <ChromePicker
          onChange={(e) => {
            this.props.onChange('fillColor', e.hex)
            this.props.onChange('fillOpacity', e.rgb.a)
          }} color={
            hexToRgba(this.props.fillColor, this.props.fillOpacity)} />
      </div>}

      {true && <div>
        <div style={{}}>
          <SelectField
            id={getNext()}
            floatingLabelText='Composition blend'
            value={this.props.blendMode}
            onChange={this.handleBlendModeChange}>
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
        <div style={{color: '#cdcdcd', position: 'relative', float: 'right'}}>
          <ActionInfo color='#666666' onClick={() => window.open(this.props.url)} />
          <ActionBuild color='#777777' onClick={() => this.props.onBuild()} />
          <ActionDelete color='#888888' onClick={() => this.props.onDelete()} />
        </div></div>}
    </div>)
  }
}
