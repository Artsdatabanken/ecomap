import React from 'react'
import { ChromePicker } from 'react-color'
import { Paper, Divider, SelectField, MenuItem, ListItem, Avatar } from 'material-ui'
import ActionInfo from 'material-ui/svg-icons/action/info'
import ActionDelete from 'material-ui/svg-icons/action/delete-forever'
import ActionBuild from 'material-ui/svg-icons/action/build'
import checkboard from './checkerboard2.png'
import HexagonLayerSettings from './HexagonLayerSettings'
import ScatterplotLayerSettings from './ScatterplotLayerSettings'
import {hexToRgbaString, hexToRgba} from './colorfunc'
/* function getCheckBoard() {
var cv = document.getElementById('body');
var ctx = cv.getContext('2d');
const checkboard2 = getCheckboard('#000000', '#ffffff', 256, cv)
return checkboard2
}
*/

export default class LayerSettings extends React.Component {
  state = {expanded: false, showColorDialog: true}

  render () {
    const paint = this.props.paint
    return (
      <div>
        <ListItem
          primaryText={this.props.title}
          secondaryText={this.props.subTitle}
          leftAvatar={<Avatar src={this.props.imageUrl} />}
          rightIconButton={
            <PaintSwatch
              color={hexToRgbaString(paint.fillColor, paint.fillOpacity)}
              onClick={(e) => {
                e.stopPropagation()
                this.setState(prevState => ({showColorDialog: !prevState.showColorDialog}))
              }
                } />
        }
          onClick={() => this.setState(prevState => ({expanded: !prevState.expanded}))}
         />
        {this.state.expanded &&
        <LayerExpanded
          {...paint}
          onChange={this.props.onChange}
          showColorDialog={this.state.showColorDialog}
        />
        }
      </div>
    )
  }
}

class LayerExpanded extends React.Component {
  handleRenderChange = (event, index, value) => this.props.onChange('renderMethod', value)
  handleBlendModeChange = (event, index, value) => this.props.onChange('blendMode', value)
  render () {
    return (<div style={{marginLeft: '24px', marginRight: '24px'}}>
      <Divider />
      <SelectField
        floatingLabelText='Render'
        value={this.props.renderMethod}
        onChange={this.handleRenderChange}>
        {false && <div>
          <MenuItem value='fill' primaryText='Single color fill' />
          <MenuItem value='pattern' primaryText='Pattern' />
          <MenuItem value='extrude' primaryText='Extrude 3D' />
          <MenuItem value='gradient' primaryText='Gradient' />
          <MenuItem value='heatmap' primaryText='Heatmap' />
        </div>
        }
        <MenuItem value='scatterplot' primaryText='Scatterplot' />
        <MenuItem value='hexagon' primaryText='Hexagon' />
      </SelectField>
      <Divider />
      <LayerRenderParameters {...this.props} />
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
            floatingLabelText='Color blend'
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

class LayerRenderParameters extends React.Component {
  render () {
    const props = this.props
    switch (this.props.renderMethod) {
      case 'fill' : return <LayerRenderFill {...props} />
      case 'pattern' : return <LayerRenderPattern {...props} />
      case 'extrude' : return <LayerRenderExtrude {...props} />
      case 'gradient' : return <LayerRenderGradient {...props} />
      case 'scatterplot' : return <ScatterplotLayerSettings {...props} />
      case 'hexagon' : return <HexagonLayerSettings {...props} />
      default: return <div>{this.props.renderMethod}</div>
    }
  }
}

class LayerRenderFill extends React.Component {
  render () {
    let rgba = hexToRgba(this.props.fillColor, this.props.fillOpacity)
    return (
      <div style={{position: 'relative', left: 64, margin: 10}}>
        <ChromePicker
          onChange={(e) => {
            this.props.onChange('fillColor', e.hex)
            this.props.onChange('fillOpacity', e.rgb.a)
          }
        } color={rgba} />
      </div>)
  }
}

class LayerRenderPattern extends React.Component {
  render () {
    return (<Paper>pattern</Paper>)
  }
}

class LayerRenderExtrude extends React.Component {
  render () {
    return (<Paper>extrude</Paper>)
  }
}

class LayerRenderGradient extends React.Component {
  render () {
    return (<Paper>gradient</Paper>)
  }
}

const PaintSwatch = ({color, onClick}) =>
  <div onClick={(e) => { onClick(e) }} style={{
    position: 'absolute',
    top: '14px',
    right: '14px',
    height: '40px',
    width: '40px',
    borderRadius: '50%',
    backgroundImage: 'linear-gradient(to bottom, ' + color + ', ' + color + '), url(' + checkboard + ')'
  }}>&nbsp;</div>
