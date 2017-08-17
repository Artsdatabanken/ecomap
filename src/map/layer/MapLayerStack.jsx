import React from 'react'
import PropTypes from 'prop-types'
// import GeoJsonLayer from './GeoJsonLayer'
// import RasterTileLayer from './RasterTileLayer'
// import VectorTileLayer from './VectorTileLayer'
import Hexagon from './Hexagon'
import Scatterplot from './Scatterplot'
import HeatmapFromPoints from './HeatmapFromPoints'
import ArtskartDataSourceContainer from './ArtskartDataSourceContainer'
import ramp from '../../graphics/color/ramps/'

export default class MapLayerStack extends React.Component {
  static propTypes = {
    layers: PropTypes.object.isRequired
  }
  render () {
    const r = []
    for (const id in this.props.layers) {
      if (!Object.prototype.hasOwnProperty.call(this.props.layers, id)) {
        continue
      }
      const layer = this.props.layers[id]
      if (!layer.visible) continue
      r.push(
        <PointBasedLayer
          key={id}
          id={id}
          layer={layer}
          viewport={this.props.viewport}
          onUpdate={this.props.onUpdate}
          zoomFactor={2}
        />
      )
    }
    return (
      <span>
        {r}
      </span>
    )
  }
}

const PointBasedLayer = ({ id, layer, viewport, onUpdate }) =>
  <ArtskartDataSourceContainer dataUrl={layer.dataUrl}>
    <EcoMapLayer
      key={id}
      id={id}
      layer={layer}
      viewport={viewport}
      onUpdate={onUpdate}
      zoomFactor={2}
    />
  </ArtskartDataSourceContainer>

const EcoMapLayer = ({
  id,
  layer,
  data,
  viewport,
  zoomFactor,
  onUpdate
}) => {
  const paint = layer.paint
  switch (paint.visualizationMode) {
    //    case 'fill': return <GeoJsonLayer dataUrl={layer.dataURl} />
    case 'heatmap':
      return (
        <HeatmapFromPoints
          title={layer.title}
          data={data}
          viewport={viewport}
          {...paint}
          onUpdate={onUpdate}
        />
      )
    case 'scatterplot':
      return (
        <Scatterplot
          title={layer.title}
          data={data}
          viewport={viewport}
          {...paint}
          onUpdate={onUpdate}
        />
      )
    case 'hexagon':
      return (
        <Hexagon
          title={layer.title}
          colorRange={ramp.sliceInFours(ramp[paint.colorRamp])}
          opacity={paint.fillOpacity}
          data={data}
          radius={paint.radius}
          coverage={paint.coverage}
          elevationMin={paint.elevationMin}
          elevationMax={paint.elevationMax}
          colorDomainMin={paint.colorDomainMin}
          colorDomainMax={paint.colorDomainMax}
          lowerPercentile={paint.lowerPercentile}
          upperPercentile={paint.upperPercentile}
          blendMode={paint.blendMode}
          viewport={viewport}
          onUpdate={onUpdate}
        />
      )
    default:
      console.warn('unknown visualizationMode', layer.paint.visualizationMode)
      return null
  }
}
