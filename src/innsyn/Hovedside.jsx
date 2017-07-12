import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Snackbar from 'material-ui/Snackbar'
import SearchBar from './søk/SearchBar'
import VenstreMeny from './meny/VenstreMeny'
import Vektorkart from '../kart/Vektorkart'
import Kortstokk from './kort/Kortstokk'
// import NinLayerStack from './NinLayerStack'
import SelectSpeciesDialog from './species/SelectSpeciesDialog'
import CloseOnEscape from '../HigherOrder/CloseOnEscape'
import LoadingIndicator from '../LoadingIndicator'

export default class Hovedside extends React.Component {
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
            <SearchBar
              onUpdateSearch={e => this.handleSearch(e)}
              onLeftIconButtonTouchTap={() => {
                this.setState(prevState => ({
                  venstreMenyÅpen: !prevState.venstreMenyÅpen
                }))
              }}
            />
            {false &&
              <VenstreMeny
                open={this.state.venstreMenyÅpen}
                onClose={() => this.handleDrawerClose()}
                onEscape={() => this.handleDrawerClose()}
                onToggle={ninkode => this.handleToggle(ninkode)}
                onAnimate={() =>
                  this.setState({ animate: !this.state.animate })}
                layers={this.state.layers}
                animate={this.state.animate}
              />}
          </div>}
        {true &&
          <Vektorkart
            animate={this.state.animate}
            layers={this.state.layers}
            onClick={features => this.onClick(features)}
          />}

        {true &&
          this.state.features &&
          <Kortstokk features={this.state.features} />}
        <div style={{ position: 'absolute', bottom: '50px', right: '50px' }}>
          {!this.state.showAddLayersDialog &&
            <FloatingActionButton
              onTouchTap={() =>
                this.setState(prevState => ({
                  //                  venstreMenyÅpen: !prevState.venstreMenyÅpen
                  showAddLayersDialog: true
                }))}
            >
              <ContentAdd />
            </FloatingActionButton>}
        </div>
        {this.state.showAddLayersDialog &&
          <CloseOnEscape onEscape={() => this.setState({ showAddLayersDialog: false })}>
            <SelectSpeciesDialog
              open={this.state.showAddLayersDialog}
              onClick={layer => this.handleAddLayer(layer)}
            />
          </CloseOnEscape>
        }
        {this.props.isLoading && <div style={{ position: 'absolute', right: '50px', top: '50px' }}>
          <LoadingIndicator /></div>}
        {this.props.message && <Snackbar open
          message={this.props.message}
          autoHideDuration={3000} />}
      </div>
    )
  }

  handleAddLayer (layer) {
    let layers = this.state.layers
    layers[layer.id] = {
      title: layer.scientificName,
      url: `http://webtjenester.artsdatabanken.no/Artskart/api/listhelper/${layer.id}/observations?&fromYear=1981&toYear=2012&fromMonth=1&toMonth=12&type=all&region=all&scientificNameId=${layer.scientificNameId}`,
      source: 'geojson',
      visible: true,
      raster: false
    }
    console.log(layers[layer.id])
    this.setState({
      layers,
      showAddLayersDialog: false
    })
  }
}
