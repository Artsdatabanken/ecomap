import React from 'react'

export default class ActiveLayersContainer extends React.Component {
  state = {
    layers: {
      '31241': {
        id: 31241,
        title: 'Alces alces',
        subTitle: 'elk',
        imageUrl:
          'https://farm5.staticflickr.com/4107/4839886016_d11b6d2cdf.jpg',
        dataUrl:
          'http://webtjenester.artsdatabanken.no/Artskart/api/listhelper/31241/observations?&fromYear=1981&toYear=2012&fromMonth=1&toMonth=12&type=all&region=all&scientificNameId=48103',
        infoUrl: 'http://artsdatabanken.no/Taxon/31241',
        source: 'geojson',
        visible: true,
        raster: false,
        paint: {
          fillColor: '#916446',
          fillOpacity: 0.86,
          colorRamp: 'viridis',
          coverage: 0.95,
          radius: 0.4,
          visualizationMode: 'heatmap',
          blendMode: 'multiply',
          lowerPercentile: 0,
          upperPercentile: 1.0,
          elevationMin: 0.0,
          elevationMax: 0.5,
          height: 0.3,
          width: 1.0
        }
      }
    }
  };

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
      paint: {
        fillColor: '#916446',
        fillOpacity: 0.86,
        coverage: 1.0,
        visualizationMode: 'hexagon',
        blendMode: 'multiply',
        radius: 1.0,
        height: 0.5,
        extruded: true,
        elevationScale: 500,
        upperPercentile: 1.0,
        elevationMin: 0,
        elevationMax: 0.5
      }
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
      _layer.paint[key] = value
      return layers
    })
  };
}
