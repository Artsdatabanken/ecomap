import React from 'react'

export default class ActiveLayersContainer extends React.Component {
  state = {
    layers: {}
  }

  componentWillMount () {
    this.handleAddLayer(
      {
        id: 61840,
        scientificName: 'Primula stricta',
        popularName: 'smalnøkleblom',
        taxonGroup: 'Karplanter',
        imageUrl: 'https://farm8.staticflickr.com/7376/8859158303_ff6d08b320.jpg',
        dataUrl: 'http://webtjenester.artsdatabanken.no/Artskart/api/listhelper/61840/observations?&fromYear=1981&toYear=2012&fromMonth=1&toMonth=12&type=all&region=all&scientificNameId=101880',
        infoUrl: 'http://artsdatabanken.no/Taxon/61840'
      })
  }
  render () {
    const props = {
      layers: this.state.layers,
      onAddLayer: this.handleAddLayer,
      onDeleteLayer: this.handleDeleteLayer,
      onUpdateLayerProp: this.handleUpdateLayerProp
    }
    const childrenWithProps = React.Children.map(this.props.children, child => {
      if (!child) return child // result of conditionals for example
      return React.cloneElement(child, props)
    })
    return (
      <div>
        {childrenWithProps}
      </div>
    )
  }

  handleAddLayer = layer => {
    let newLayer = {
      id: layer.id,
      title: layer.scientificName,
      subTitle: layer.popularName + ' (' + layer.taxonGroup + ')',
      imageUrl: layer.imageUrl,
      dataUrl: `http://webtjenester.artsdatabanken.no/Artskart/api/listhelper/${layer.id}/observations?&fromYear=1981&toYear=2012&fromMonth=1&toMonth=12&type=all&region=all&scientificNameId=${layer.scientificNameId}`,
      infoUrl: `http://artsdatabanken.no/Taxon/${layer.id}`,
      source: 'geojson',
      visible: true,
      raster: false,
      'paint': {'fillColor': '#3A92E3',
        'fillOpacity': 1,
        'coverage': 1,
        'visualizationMode': 'heatmap',
        'colorRamp': 'inferno',
        'blendMode': 'multiply',
        'radiusScale': 0.19,
        'height': 0.35,
        'extruded': true,
        'elevationScale': 500,
        lowerPercentile: 0,
        'upperPercentile': 1,
        'elevationMin': 0,
        'elevationMax': 0.5,
        'colorDomainMin': 0,
        'colorDomainMax': 1}
    }

    this.setState(prevState => {
      prevState.layers[newLayer.id] = newLayer
      return prevState
    })
    console.log(newLayer)
  };

  handleDeleteLayer = layer => {
    this.setState(prevState => {
      delete prevState.layers[layer.id]
      return prevState
    })
  };

  handleUpdateLayerProp = (layer, key, value) => {
    console.log('Update layer #' + layer.id + ': ' + key + '=' + value)
    this.setState(prevState => {
      let layers = this.state.layers
      let _layer = prevState.layers[layer.id]
      console.log(JSON.stringify(_layer))
      _layer.paint[key] = value
      return layers
    })
  };
}
