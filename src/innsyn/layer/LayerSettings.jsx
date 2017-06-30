import React from 'react'
import { ChromePicker } from 'react-color'
import { Subheader, Paper, DropDownMenu, MenuItem, ListItem, Divider, Avatar } from 'material-ui'
import ActionInfo from 'material-ui/svg-icons/action/info'
import ActionDelete from 'material-ui/svg-icons/action/delete-forever'
import ActionBuild from 'material-ui/svg-icons/action/build'
import checkboard from './checkerboard2.png'

/* function getCheckBoard() {
var cv = document.getElementById('body');
var ctx = cv.getContext('2d');
const checkboard2 = getCheckboard('#000000', '#ffffff', 256, cv)
return checkboard2
}
*/

class LayerSettings extends React.Component {
  constructor () {
    super()
    this.state = {
      layers: [
        {code: '6SO', renderMethod: 'fill', name: 'Bioklimatisk sone', sub: 'Regional økoklin', url: 'http://artsdatabanken.no/Pages/181384', image: 'http://docplayer.me/docs-images/57/41018892/images/36-0.png', fillColor: '#4080ff', fillOpacity: 0.9, blendMode: 'normal'},
        {code: '31168', renderMethod: 'heatmap', name: 'Ulv', sub: 'Canis Lupus', url: 'http://artsdatabanken.no/Taxon/31168', image: 'http://artsdatabanken.no/Media/F8613?mode=160x160', fillColor: '#ff0000', fillOpacity: 0.5, blendMode: 'normal'},
        {code: 'NiN NA-V2', renderMethod: 'fill', name: 'Myr- og sumpskogsmark', sub: 'Våtmarksystem', url: 'http://artsdatabanken.no/Pages/171964', image: 'http://artsdatabanken.no/Media/F1442?mode=160x160', fillColor: '#70af40', fillOpacity: 0.8, blendMode: 'normal'}
      ]}
  }

  render () {
    return (
      <Paper style={{width: 400}}>
        {this.state.layers.map(layer => <Layer key={layer.code}
          onUpdate={(key, value) => { console.log(key, value); this.handleUpdateLayerProp(layer, key, value) }}
          onUpdateColor={(color) => this.handleUpdateLayerProp(layer, 'color', color)} {...layer}
          onDelete={() => this.handleDelete(layer)}
          />)}
      </Paper>)
  }

  handleDelete (layer) {
    let layers = this.state.layers.filter(l => l !== layer)
    this.setState({layers})
  }

  handleUpdateLayerProp (layer, key, value) {
    console.log(layer.code, key, value)
    let layers = this.state.layers
    let _layer = layers.filter(l => l.code === layer.code)[0]
    _layer[key] = value
    this.setState({layers: layers})
  }
}

class Layer extends React.Component {
  constructor () {
    super()
    this.state = {renderMethod: 1, showColorDialog: false}
  }
  render () {
    return (
      <div>
        <LayerCollapsed {...this.props}
          onBuild={() => this.setState({expanded: !this.state.expanded})}
          onDelete={() => this.props.onDelete()}
          onColorSwatchClick={() => this.setState({showColorDialog: !this.state.showColorDialog})}
          />
        <Divider />
      </div>
    )
  }
}

class LayerCollapsed extends React.Component {
  constructor () {
    super()
    this.state = {expanded: true}
  }
  render () {
    return (
      <div>
        <ListItem
          primaryText={this.props.name}
          secondaryText={this.props.sub}
          leftAvatar={<Avatar src={this.props.image} />}
          rightIconButton={
            <PaintSwatch
              color={hexToRgbaString(this.props.fillColor, this.props.fillOpacity)}
              onClick={() => this.props.onColorSwatchClick()} />
        }
          onClick={() => this.setState({expanded: !this.state.expanded})}
         />
        {this.state.expanded &&
        <LayerExpanded {...this.props}
          onUpdate={(key, value) => this.props.onUpdate(key, value)}
          onColorSwatchClick={() => this.setState({showColorDialog: !this.state.showColorDialog})}
          />
        }
      </div>
    )
  }
}

class LayerExpanded extends React.Component {
  render () {
    return (<div>
      <Subheader>Stil</Subheader>
      <div style={{}}>
        <DropDownMenu value={this.props.renderMethod} onChange={(event, index, value) => this.props.onUpdate('renderMethod', value)}>
          <MenuItem value='fill' primaryText='Helfylt farge' />
          <MenuItem value='pattern' primaryText='Mønster' />
          <MenuItem value='extrude' primaryText='Ekstrudert' />
          <MenuItem value='gradient' primaryText='Fargeskala' />
          <MenuItem value='heatmap' primaryText='Heatmap' />
        </DropDownMenu>
      </div>
      <LayerRenderParameters {...this.props} />
      <Divider />
      <Subheader>Blandingsmodus
      <div style={{}}>
        <DropDownMenu value={this.props.blendMode} onChange={(event, index, value) => this.props.onUpdate('blendMode', value)}>
          <MenuItem value='normal' primaryText='Normal' />
          <MenuItem value='lighten' primaryText='Lys opp' />
          <MenuItem value='scren' primaryText='Skjerm' />
          <MenuItem value='dodge' primaryText='Dukke' />
          <MenuItem value='addition' primaryText='Addisjon' />
          <MenuItem value='darken' primaryText='Formørke' />
          <MenuItem value='multiply' primaryText='Multiplisere' />
          <MenuItem value='burn' primaryText='Brenne' />
          <MenuItem value='overlay' primaryText='Overlegg' />
          <MenuItem value='softlight' primaryText='Mykt lys' />
          <MenuItem value='hardlight' primaryText='Hardt lys' />
          <MenuItem value='difference' primaryText='Forskjell' />
          <MenuItem value='subtract' primaryText='Differanse' />
        </DropDownMenu>
      </div>
      </Subheader>
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
      case 'heatmap' : return <LayerRenderHeatMap {...props} />
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
            this.props.onUpdate('fillColor', e.hex)
            this.props.onUpdate('fillOpacity', e.rgb.a)
          }
        } color={rgba} />
      </div>)
  }
}

function hexToRgbaString (color, opacity) {
  console.log(color, opacity)
  let c = hexToRgba(color, opacity)
  const str = 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + c.a + ')'
  console.log(str)
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

class LayerRenderHeatMap extends React.Component {
  render () {
    return (<Paper>heatmap</Paper>)
  }
}

const PaintSwatch = ({color, onClick}) =>
  <div onClick={() => { onClick() }} style={{
    position: 'absolute',
    top: '8px',
    right: '14px',
    height: '40px',
    width: '40px',
    borderRadius: '50%',
    backgroundImage: 'linear-gradient(to bottom, ' + color + ', ' + color + '), url(' + checkboard + ')'
  }}>&nbsp;</div>

export default LayerSettings
