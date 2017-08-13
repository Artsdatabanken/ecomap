import React from 'react'
import IconButton from 'material-ui/IconButton'
import LayersIcon from 'material-ui/svg-icons/maps/layers'
import Snackbar from 'material-ui/Snackbar'
import SearchBar from './search/SearchBar'
import LeftMenu from './menu/LeftMenu'
import Map from '../map/Map'
import CardStack from './layer/infocard/CardStack'
// import NinLayerStack from './NinLayerStack'
import CloseOnEscape from '../HigherOrder/CloseOnEscape'
import LoadingIndicator from '../LoadingIndicator'
import ActiveLayers from './layer/ActiveLayers'
import ActiveLayersContainer from './layer/ActiveLayersContainer'

export default class MainPage extends React.Component {
  state = {
    animate: false,
    venstreMenyÅpen: false,
    showAddLayersDialog: false,
    feature: {},
    layers: {
      'L1-1': { title: 'Grunn limnisk fastbunn', visible: false },
      T4: { title: 'Skogsmark', visible: false },
      T44: { title: 'Åker', visible: false },
      '6SE-1': {
        title: 'svakt oseanisk seksjon',
        visible: false,
        raster: true
      },
      '6SE-2': {
        title: 'klart oseanisk seksjon',
        visible: false,
        raster: true
      },
      '6SE-3': {
        title: 'sterkt oseanisk seksjon',
        visible: false,
        raster: true
      },
      '6SE-4': {
        title: 'svakt kontinental seksjon',
        visible: false,
        raster: true
      },
      '6SE-5': {
        title: 'klart kontinental seksjon',
        visible: false,
        raster: true
      },
      KA: {
        title: 'Kalkinnhold',
        visible: false,
        raster: false,
        filter: ['>', 'kalkinnhol', '2']
      }
      /*      Elg: {
        title: 'Alces Alces',
        visible: true,
        source: 'geojson',
        url: 'http://webtjenester.artsdatabanken.no/Artskart/api/listhelper/31241/observations?&fromYear=1981&toYear=2012&fromMonth=1&toMonth=12&type=all&region=all&scientificNameId=48103'
      } */
    },
    ninkode: ''
  }

  onClick = features => {
    console.log(features)
    this.setState({ features })
  }

  handleToggle = ninkode => {
    const l = this.state.layers
    l[ninkode].visible = !l[ninkode].visible
    this.setState({ layers: l, ninkode })
  }

  handleDrawerClose = () => {
    this.setState({ venstreMenyÅpen: false })
  }

  handleSearch = criteria => {
    criteria = criteria.toUpperCase()
    const comparison = ['<=', '<', '>=', '>', '<>', '=']
    let layers = this.state.layers
    let current = layers['KA']
    current.visible = false
    for (const compi in comparison) {
      let comp = comparison[compi]
      const index = criteria.indexOf(comp)
      const code = criteria.substring(0, index)
      const value = criteria.substring(index + comp.length)
      if (index < 0) continue

      if (code !== 'KA') continue
      if (comp === '=') comp = '=='
      if (value) {
        current.visible = true
        current.filter = [comp, 'kalkinnhol', value]
      }
    }
    layers['KA'] = current
    this.setState({ layers: layers })
  }

  render () {
    return (
      <div style={{ width: '100%' }}>
        {false &&
          <div
            style={{
              position: 'absolute',
              top: '8px',
              left: '8px',
              width: '600px'
            }}
          >
            {false && <SearchBar
              onUpdateSearch={e => this.handleSearch(e)}
              onLeftIconButtonTouchTap={() => {
                this.setState(prevState => ({
                  venstreMenyÅpen: !prevState.venstreMenyÅpen
                }))
              }}
            />
            }
            {false && <LeftMenu
              open={this.state.venstreMenyÅpen}
              onClose={() => this.handleDrawerClose()}
              onEscape={() => this.handleDrawerClose()}
              onToggle={ninkode => this.handleToggle(ninkode)}
              onAnimate={() =>
                  this.setState(prevState => ({ animate: !prevState.animate }))}
              layers={this.state.layers}
              animate={this.state.animate}
              />}
          </div>}
        <div style={{ position: 'absolute', bottom: '0px', right: '0px' }}>
          {!this.state.showLayersDialog &&
            <IconButton
              onTouchTap={() =>
                this.setState(prevState => ({showLayersDialog: true}))}
              style={{ width: 96,
                height: 96,
                padding: 24}}
              iconStyle={{
                color: 'rgba(0, 0, 0, 0.52)',
                width: 48,
                height: 48
              }}>
              <LayersIcon />
            </IconButton>
             }
        </div>
        {true &&
          this.state.features &&
          <CardStack features={this.state.features} />}

        <ActiveLayersContainer>
          {true && <Map
            animate={this.state.animate}
            layers={this.state.layers}
            onClick={features => this.onClick(features)}
          />}
          {this.state.showLayersDialog &&
          <CloseOnEscape onEscape={() => this.setState({ showLayersDialog: false })}>
            <ActiveLayers layers={this.state.layers} />
          </CloseOnEscape>
          }
        </ActiveLayersContainer>
        {this.props.isLoading && <div style={{ position: 'absolute', right: '50px', top: '50px' }}>
          <LoadingIndicator /></div>}
        {this.props.message &&
        <Snackbar open message={this.props.message} autoHideDuration={3000} />}
      </div>
    )
  }

  handleKeyDown = (e) => {
    if (!e.ctrl) return
    // TODO: only capture key strokes not handled elsewhere
    if (e.key === 'l') {
      this.setState(prevState => ({
        showLayersDialog: !prevState.showLayersDialog
      }))
      // e.stopPropagation()
    }
  }

  componentDidMount () {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeyDown)
  }
}
