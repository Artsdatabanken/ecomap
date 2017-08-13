import React from 'react'
import { ChromePicker } from 'react-color'
import { Paper, Divider, DropDownMenu, MenuItem, ListItem, Avatar } from 'material-ui'
import ActionInfo from 'material-ui/svg-icons/action/info'
import ActionDelete from 'material-ui/svg-icons/action/delete-forever'
import ActionBuild from 'material-ui/svg-icons/action/build'
import checkboard from './checkerboard2.png'
import Bars3DLayerSettings from './Bars3DLayerSettings'

/* function getCheckBoard() {
var cv = document.getElementById('body');
var ctx = cv.getContext('2d');
const checkboard2 = getCheckboard('#000000', '#ffffff', 256, cv)
return checkboard2
}
*/

export default class LayerSettings extends React.Component {
  state = {expanded: false}

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
              onClick={() => this.setState(prevState => ({expanded: !prevState.expanded}))} />
        }
          onClick={() => this.setState(prevState => ({expanded: !prevState.expanded}))}
         />
        {this.state.expanded &&
        <LayerExpanded {...paint} onChange={this.props.onChange}
          onColorSwatchClick={() => this.setState(prevState => ({showColorDialog: !prevState.showColorDialog}))}
          />
        }
      </div>
    )
  }
}

class LayerExpanded extends React.Component {
  render () {
    return (<div style={{}}>
      <Divider />
      <DropDownMenu value={this.props.renderMethod} onChange={(event, index, value) => this.props.onChange('renderMethod', value)}>
        <MenuItem value='fill' primaryText='Single color fill' />
        <MenuItem value='pattern' primaryText='Pattern' />
        <MenuItem value='extrude' primaryText='Extrude 3D' />
        <MenuItem value='gradient' primaryText='Gradient' />
        <MenuItem value='heatmap' primaryText='Heatmap' />
        <MenuItem value='bars3d' primaryText='Hexagonal binning' />
      </DropDownMenu>
      <Divider />
      <LayerRenderParameters {...this.props} />
      <Divider />
      <div>Color blend</div>
      <div style={{}}>
        <DropDownMenu value={this.props.blendMode} onChange={(event, index, value) => this.props.onChange('blendMode', value)}>
          <MenuItem value='normal' primaryText='Normal' />
          <MenuItem value='lighten' primaryText='Lighten' />
          <MenuItem value='scren' primaryText='Screen' />
          <MenuItem value='dodge' primaryText='Dodge' />
          <MenuItem value='addition' primaryText='Addition' />
          <MenuItem value='darken' primaryText='Darken' />
          <MenuItem value='multiply' primaryText='Multiply' />
          <MenuItem value='burn' primaryText='Burn' />
          <MenuItem value='overlay' primaryText='Overlay' />
          <MenuItem value='softlight' primaryText='Soft light' />
          <MenuItem value='hardlight' primaryText='Hard light' />
          <MenuItem value='difference' primaryText='Difference' />
          <MenuItem value='subtract' primaryText='Subtract' />
        </DropDownMenu>
      </div>
      <div style={{color: '#cdcdcd', position: 'relative', float: 'right'}}>
        <ActionInfo color='#666666' onClick={() => window.open(this.props.url)} />
        <ActionBuild color='#777777' onClick={() => this.props.onBuild()} />
        <ActionDelete color='#888888' onClick={() => this.props.onDelete()} />
      </div>
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
      case 'bars3d' : return <Bars3DLayerSettings {...props} />
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

function hexToRgbaString (color, opacity) {
  let c = hexToRgba(color, opacity)
  const str = 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + c.a + ')'
  return str
}

function hexToRgba (color, opacity) {
  let rgba = hexToRgb(color)
  rgba.a = opacity
  return rgba
}

function hexToRgb (hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b
  })

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
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
  <div onClick={() => { onClick() }} style={{
    position: 'absolute',
    top: '14px',
    right: '14px',
    height: '40px',
    width: '40px',
    borderRadius: '50%',
    backgroundImage: 'linear-gradient(to bottom, ' + color + ', ' + color + '), url(' + checkboard + ')'
  }}>&nbsp;</div>
