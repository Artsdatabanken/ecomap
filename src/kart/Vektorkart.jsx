import PropTypes from 'prop-types'
import * as React from 'react'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl'
// import Color from 'color'

import styles from './styles/style.json'
import NinLayerStack from './NinLayerStack'

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiYmpyZXBwZW4iLCJhIjoiY2ltZGFkMW11MDAwdnZpbHVsamhsZzB1dSJ9.oZBI8rZR8YSsXoyIM0vLYg'
})

export default class Vektorkart extends React.Component {
  static propTypes = {
    layers: PropTypes.object.isRequired,
    animate: PropTypes.bool,
    onClick: PropTypes.func.isRequired
  }
  static defaultProps = {
    animate: false
  }

  state = { zoom: 10, bearing: 0, styles }

  componentDidMount () {
    this.tick = 0
    this.timerId = setInterval(this.update, 60)
    this.alpha = 0
  }

  componentWillReceiveProps (nextProps, nextState) {
    /*    const layers = nextProps.layers;
        const newStyles = this.map.getStyle();
        for (const key in layers) {
          if ({}.hasOwnProperty.call(layers, key)) {
            const ninKode = `NIN ${key}`;
            for (const lkey in newStyles.layers) {
              if ({}.hasOwnProperty.call(newStyles.layers, lkey)) {
                const ls = newStyles.layers[lkey];
                if (ls.id === ninKode) {
                  ls.layout.visibility = layers[key].visible ? 'visible' : 'none';
                }
              }
            }
          }
          this.map.setStyle(newStyles);
        } */
  }

  componentWillUnmount () {
    clearInterval(this.timerId)
  }

  update = () => {
    if (!this.map) return
    // if (!this.props.animate) return
    let newZoom = this.state.zoom * 1.0001
    if (newZoom > 18) {
      newZoom = 10
    }
    //    this.setState({})
    // this.map.bearing = 15*Math.sin(this.tick/150)+15
    // this.map.transform.angle = 5*Math.sin(this.tick/550)
    this.tick++

    // var color = Color.Color('#7743CE').alpha(0.5).lighten(0.5);
    // console.log(color.hsl().string());  // 'hsla(262, 59%, 81%, 0.5)'

    if (this.selectedLayerId) {
      this.map.setPaintProperty(
        this.selectedLayerId,
        'fill-color',
        'hsla(5, 100%, 69%, ' + Math.abs(this.alpha % 2 - 1) + ')'
      )
      this.alpha = this.alpha + 0.07
      //      console.log(Math.abs(this.alpha%2-1))
    }
  }

  handleMouseMove = (e, evt) => {
    console.log(e, evt)
    this.map.setFilter('state-fills-hover', [
      '==',
      'name',
      e.features[0].properties.name
    ])
  }

  handleMouseLeave = (e, evt) => {
    this.map.setFilter('state-fills-hover', ['==', 'name', ''])
  }
  queryOurRenderedFeatures (point) {
    const features = this.map.queryRenderedFeatures(point)
    console.log(features)
    return features.filter(x => x.layer.id.indexOf('NIN') === 0)
  }

  handleClick = (e, evt) => {
    const map = this.map
    if (map === null) return
    // this is no good on low zooms
    // if (map === null) return
    const features = this.queryOurRenderedFeatures(evt.point)
    console.log(features)
    if (features.length <= 0) {
      // || !features[0].layer.id.startsWith('NIN ')) {
      this.resetSelection()
      map.getCanvas().style.cursor = ''
      return
    }
    if (this.selectedLayerId === features[0].layer.id) return

    this.resetSelection()
    this.selectedLayerId = features[0].layer.id
    this.selectedOriginalPaint = map.getPaintProperty(
      this.selectedLayerId,
      'fill-color'
    )
    if (this.selectedOriginalPaint) {
      map.setPaintProperty(
        this.selectedLayerId,
        'fill-color',
        'hsla(52, 100%, 69%, 1)'
      )
    }
    this.props.onClick(features)
    map.getCanvas().style.cursor = 'pointer'
  }

  resetSelection () {
    if (!this.selectedLayerId) return
    if (this.selectedOriginalPaint) {
      this.map.setPaintProperty(
        this.selectedLayerId,
        'fill-color',
        this.selectedOriginalPaint
      )
    }
    this.selectedLayerId = null
  }

  handleStyleLoad = (e, t) => {
    this.map = e
    console.log(this.map)
  }

  findStyle (ninKode) {
    const newStyles = this.state.styles
    for (const lkey in newStyles.layers) {
      if ({}.hasOwnProperty.call(newStyles.layers, lkey)) {
        const ls = newStyles.layers[lkey]
        if (ls.id.indexOf(ninKode) === 0) {
          return ls
        }
      }
    }
    return {}
  }

  render () {
    return (
      <Map
        // eslint-disable-next-line react/style-prop-object
        style='mapbox://styles/bjreppen/cj06jt53u00gh2rl5r30vi8br'
        onStyleLoad={(s, t) => this.handleStyleLoad(s, t)}
        containerStyle={{
          height: '100vh',
          width: '100vw'
        }}
        logoPosition='top-right'
        movingMethod='easeTo'
        center={[10.33, 63.15]}
        zoom={[5]}
        pitch={0}
        onClick={(e, evt) => this.handleClick(e, evt)}
        onMouseEnter={(e, evt) => this.handleMouseMove(e, evt)}
        onMouseLeave={(e, evt) => this.handleMouseLeave(e, evt)}
      >
        <Layer
          type='symbol'
          id='marker'
          interactive
          onClick={e => console.warn('clicked the marker!')}
          layout={{ 'icon-image': 'marker-15' }}
        >
          <Feature coordinates={[10.45, 63.42]} />
        </Layer>
        <NinLayerStack layers={this.props.layers} />
      </Map>
    )
  }
}

/*
        zoom={[this.state.zoom]}
        bearing={this.state.bearing}
*/
