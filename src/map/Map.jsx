import PropTypes from 'prop-types'
import * as React from 'react'
import MapGL from 'react-map-gl'
// import Color from 'color'
// import styles from './styles/style.json'
import MapLayerStack from './layer/MapLayerStack'

const MAPBOX_TOKEN = process.env.MapboxAccessToken; // eslint-disable-line

export default class Map extends React.Component {
  static propTypes = {
    layers: PropTypes.object.isRequired,
    animate: PropTypes.bool,
    onClick: PropTypes.func.isRequired
  }

  static defaultProps = {
    animate: false
  }

  state = {
    viewport: {
      latitude: 65,
      longitude: 11,
      zoom: 4.7,
      minZoom: 3,
      maxZoom: 15,
      pitch: 0, // 50,
      bearing: 0,
      width: window.innerWidth,
      height: window.innerHeight
    }
  }

  componentDidMount () {
    this.tick = 0
    //    this.timerId = setInterval(this.update, 60)
    this.alpha = 0

    window.addEventListener('resize', this._resize.bind(this))
    this._resize()
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

  _resize () {
    this._onViewportChange({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  _onViewportChange = (viewport) => {
    this.setState(prevState => ({
      viewport: { ...prevState.viewport, ...viewport }
    }))
  }

  render () {
    const { viewport } = this.state
    return (
      <MapGL
        {...viewport}
        mapStyle='mapbox://styles/bjreppen/cj06jt53u00gh2rl5r30vi8br'
        //        mapStyle='mapbox://styles/mapbox/dark-v9'
        onViewportChange={v => this._onViewportChange(v)}
        mapboxApiAccessToken={MAPBOX_TOKEN} >
        <MapLayerStack layers={this.props.layers} viewport={viewport} />
      </MapGL>
    )
  }
}

/*
  onStyleLoad={(s, t) => this.handleStyleLoad(s, t)}
  containerStyle={{
    height: '100vh',
    width: '100vw'
  }}
  onClick={(e, evt) => this.handleClick(e, evt)}
  onMouseEnter={(e, evt) => this.handleMouseMove(e, evt)}
  onMouseLeave={(e, evt) => this.handleMouseLeave(e, evt)}
*/
