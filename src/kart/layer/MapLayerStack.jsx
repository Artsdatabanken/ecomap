import React from 'react'
import PropTypes from 'prop-types'
import GeoJsonLayer from './GeoJsonLayer'
import RasterTileLayer from './RasterTileLayer'
import VectorTileLayer from './VectorTileLayer'

export default class MapLayerStack extends React.Component {
  static propTypes = {
    layers: PropTypes.object.isRequired
  }

  render () {
    const r = []
    for (const id in this.props.layers) {
      if (!Object.prototype.hasOwnProperty.call(this.props.layers, id)) continue
      const layer = this.props.layers[id]
      if (!layer.visible) continue

      r.push(<EcoMapLayer id={id} layer={layer} />)
    }
    return (
      <span>
        {r}
      </span>
    )
  }

  static createLayer (id, layer) {
    switch (layer.source) {
      case 'geojson':
        return <GeoJsonLayer key={id} url={layer.url} />
      default:
        if (layer.raster) { return <RasterTileLayer id={id} layer={layer} /> }
        return <VectorTileLayer id={id} layer={layer} />
    }
  }
}

const EcoMapLayer = ({id, layer}) => {
  switch (layer.source) {
    case 'geojson':
      return <GeoJsonLayer key={id} url={layer.url} />
    default:
      if (layer.raster) { return <RasterTileLayer id={id} layer={layer} /> }
      return <VectorTileLayer id={id} layer={layer} />
  }
}
