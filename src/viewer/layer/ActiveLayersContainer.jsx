import React from 'react'

/*
function MergeRecursive (obj1, obj2) {
  for (var p in obj2) {
    try {
      // Property in destination object set; update its value.
      if (obj2[p].constructor === Object) {
        obj1[p] = MergeRecursive(obj1[p], obj2[p])
      } else {
        obj1[p] = obj2[p]
      }
    } catch (e) {
      // Property in destination object not set; create it and set its value.
      obj1[p] = obj2[p]
    }
  }

  return obj1
}
*/

export default class ActiveLayersContainer extends React.Component {
  state = {
    layers: {'31241': {'id': 31241,
      'title': 'Alces alces',
      'subTitle': 'elg',
      'imageUrl': 'https://farm5.staticflickr.com/4107/4839886016_d11b6d2cdf.jpg',
      'dataUrl': 'http://webtjenester.artsdatabanken.no/Artskart/api/listhelper/31241/observations?&fromYear=1981&toYear=2012&fromMonth=1&toMonth=12&type=all&region=all&scientificNameId=48103',
      'source': 'geojson',
      'visible': true,
      'raster': false,
      'paint': {'fillColor': '#ff0000', 'fillOpacity': 1, 'renderMethod': 'heatmap', 'blendMode': 'multiply'}}}
  }

  render () {
    console.log(JSON.stringify(this.state.layers))
    const props = {
      layers: this.state.layers,
      onAddLayer: this.handleAddLayer,
      onDeleteLayer: this.handleDeleteLayer,
      onUpdateLayerProp: this.handleUpdateLayerProp
    }
    const childrenWithProps = React.Children.map(this.props.children,
      (child) => {
        if (!child) return child // result of conditionals for example
        return React.cloneElement(child, props)
      })
    return <div>{childrenWithProps}</div>
  }

  handleAddLayer = (layer) => {
    console.log(layer)
    let newLayer = {
      id: layer.id,
      title: layer.scientificName,
      subTitle: layer.popularName,
      imageUrl: layer.imageUrl,
      dataUrl: `http://webtjenester.artsdatabanken.no/Artskart/api/listhelper/${layer.id}/observations?&fromYear=1981&toYear=2012&fromMonth=1&toMonth=12&type=all&region=all&scientificNameId=${layer.scientificNameId}`,
      source: 'geojson',
      visible: true,
      raster: false,
      paint: {
        heatmap: 'visible',
        fillColor: '#ff0000',
        fillOpacity: 1,
        renderMethod: 'fill',
        blendMode: 'multiply'
      }
    }
    this.setState(prevState => {
      prevState.layers[newLayer.id] = newLayer
      return prevState
    })
  }

  handleDeleteLayer = (layer) => {
    this.setState(prevState => {
      delete prevState[layer.id]
      return prevState
    })
  }

  handleUpdateLayerProp = (layer, key, value) => {
    console.log(layer.id, key, value)
    this.setState(prevState => {
      let layers = this.state.layers
      let _layer = prevState.layers[layer.id]
      _layer.paint[key] = value
      return layers
    })
  }
}
