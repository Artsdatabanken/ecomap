import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

import SearchBar from './søk/SearchBar'
import VenstreMeny from './meny/VenstreMeny'
import Vektorkart from '../kart/Vektorkart'
import Kortstokk from './kort/Kortstokk'
// import NinLayerStack from './NinLayerStack'
import SelectSpeciesDialog from './species/SelectSpeciesDialog'

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

  render() {
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
          {true &&
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
          <SelectSpeciesDialog
            open={this.state.showAddLayersDialog}
            onAddLayer={layer => handleAddLayer(layer)}
          />}
      </div>
    )
  }

  handleAddLayer(layer) {
    let layers = this.state.layers
    layers[layer.id] = {
        title: layer.scientificName,
        visible: true,
        source: 'artskart',
        raster: false
    }
  }
}
