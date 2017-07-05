import React from 'react'
import { Source, Layer } from 'react-mapbox-gl'
//import elg from './elg.json'

class GeoJsonLayer extends React.Component {
  componentWillMount () {
    //  fetch(this.props.url).then(response => response.json()).then(json => {
    //  this.setState({geojson: json})
    // })
  }

  render () {
    const source = {
      type: 'geojson',
      data: this.props.url
    }
    console.log('render')
    return (
      <span>
        <Source id='source_id32' geoJsonSource={source} />
        <Layer
          type='symbol'
          layout={{ 'icon-image': 'circle-stroked-11' }}
          id='layer_id32'
          sourceId='source_id32'
        />
      </span>
    )
  }
}

export default GeoJsonLayer
