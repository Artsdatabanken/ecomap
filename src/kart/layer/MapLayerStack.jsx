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

      r.push(<EcoMapLayer key={id} id={id} layer={layer} viewport={this.props.viewport} scalingFactor={128 * 5000} zoomFactor={2} />)
    }
    const { viewport } = this.props
    if (viewport === 42) {
      return <Heatmap3d
        title={'Alces alces'}
        url='http://webtjenester.artsdatabanken.no/Artskart/api/listhelper/31241/observations?&fromYear=1981&toYear=2012&fromMonth=1&toMonth=12&type=all&region=all&scientificNameId=48103'
        viewport={viewport} radius={5000} coverage={1} upperPercentile={100} />
    }
    return <span>
      {r}
    </span>
  }
}

const EcoMapLayer = ({ id, layer, viewport, scalingFactor, zoomFactor }) => {
  switch (layer.source) {
    case 'geojson':
      //      return <GeoJsonLayer key={id} url={layer.url} />
      return <Heatmap3d title={layer.title} url={layer.url} viewport={viewport}
//        radius={128*5000*Math.pow(0.5, 2*Math.round(viewport.zoom/2))}
        radius={scalingFactor * Math.pow(1.0 / 2, zoomFactor * Math.round(viewport.zoom / zoomFactor))}
        coverage={1} upperPercentile={100} opacity={0.6} />
    default:
      return <span />
    //      if (layer.raster) { return <RasterTileLayer id={id} layer={layer} /> }
    //      return <VectorTileLayer id={id} layer={layer} />
  }
}
