import React from 'react'
import PropTypes from 'prop-types'
// import GeoJsonLayer from './GeoJsonLayer'
// import RasterTileLayer from './RasterTileLayer'
// import VectorTileLayer from './VectorTileLayer'
import Heatmap3d from './Heatmap3d'

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
      r.push(<EcoMapLayer key={id} id={id} layer={layer}
        viewport={this.props.viewport}
        onUpdate={this.props.onUpdate}
        scalingFactor={128 * 5000} zoomFactor={2} />)
    }
    return <span>
      {r}
    </span>
  }
}

const EcoMapLayer = ({ id, layer, viewport, scalingFactor, zoomFactor, onUpdate }) => {
  const paint = layer.paint
  switch (paint.renderMethod) {
//    case 'fill': return <GeoJsonLayer dataUrl={layer.dataURl} />
    case 'heatmap':
      return <Heatmap3d title={layer.title} dataUrl={layer.dataUrl} viewport={viewport}
        //        radius={128*5000*Math.pow(0.5, 2*Math.round(viewport.zoom/2))}
        radius={scalingFactor * Math.pow(1.0 / 2,
        zoomFactor * Math.round(viewport.zoom / zoomFactor))}
        coverage={paint.coverage}
        upperPercentile={100}
        fillOpacity={layer.paint.fillOpacity}
        onUpdate={onUpdate}
       />
    default:
      console.warn('unknown renderMethod', layer.paint.renderMethod)
      return null
  }
}
