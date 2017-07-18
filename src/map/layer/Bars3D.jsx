import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DeckGL, { HexagonLayer } from 'deck.gl'

const LIGHT_SETTINGS = {
  lightsPosition: [-0.144528, 49.739968, 8000, -3.807751, 54.104682, 8000],
  ambientRatio: 0.4,
  diffuseRatio: 0.6,
  specularRatio: 0.2,
  lightsStrength: [0.8, 0.0, 0.8, 0.0],
  numberOfLights: 2
}

const colorRange = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78]
]

const plasma = [[13, 8, 135],
[75, 3, 161],
[125, 3, 168],
[168, 34, 150],
[203, 70, 121],
[229, 107, 93],
[248, 148, 65],
[253, 195, 40],
[240, 249, 33]]

const elevationScale = { min: 1, max: 50 }

const defaultProps = {
  radius: 1000,
  upperPercentile: 100,
  coverage: 1,
  data: []
}

export default class Bars3D extends Component {
  static get defaultColorRange () {
    return colorRange
  }

  static contextTypes = {
    fetchJson: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.startAnimationTimer = null
    this.intervalTimer = null
    this._startAnimate = this._startAnimate.bind(this)
    this._animateHeight = this._animateHeight.bind(this)
  }

  state = {
    elevationScale: elevationScale.min
  }

  receiveData (json) {
    json.then((json) => {
      const acc = json.features.reduce((acc, feature) => {
        const geom = feature.geometry
        if (geom.type === 'Point') { acc.push(geom.coordinates) }
        return acc
      }, [])
      this.setState({ data: acc, isLoading: false })
      this._animate()
    })
  }

  componentDidMount () {
    this.context.fetchJson(this.props.title, this.props.dataUrl, json => this.receiveData(json))
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.data === null) {
      this._stopAnimate()
    }
    if (nextProps.data.length !== this.props.data.length) {
      this._animate()
    }
  }

  componentWillUnmount () {
    this._stopAnimate()
  }

  _animate () {
    this._stopAnimate()
    this.startAnimationTimer = window.setTimeout(this._startAnimate, 100)
  }

  _startAnimate () {
    this.intervalTimer = window.setInterval(this._animateHeight, 15)
  }

  _stopAnimate () {
    window.clearTimeout(this.startAnimationTimer)
    window.clearTimeout(this.intervalTimer)
  }

  _animateHeight () {
    if (this.state.elevationScale >= elevationScale.max) {
      this._stopAnimate()
    } else {
      this.setState(prevState => ({ elevationScale: prevState.elevationScale + 0.3 * Math.sqrt(elevationScale.max - prevState.elevationScale) }))
    }
  }

  _initialize (gl) {
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
  }

  render () {
    const { viewport, radius, coverage, upperPercentile, fillOpacity } = this.props
    const data = this.state.data
    if (!data) {
      return null
    }

    const layers = [
      new HexagonLayer({
        id: 'heatmap',
//        colorDomain: [0,1],
        colorRange: plasma,
        coverage,
        data,
        elevationRange: [0, 3000 * 25 * Math.pow(0.6, viewport.zoom)],
        elevationScale: this.state.elevationScale,
        extruded: true,
        getPosition: d => d,
        lightSettings: LIGHT_SETTINGS,
        onHover: this.props.onHover,
        opacity: fillOpacity,
        pickable: Boolean(this.props.onHover),
        radius,
        upperPercentile
      })
    ]

    return <DeckGL {...viewport} layers={layers} onWebGLInitialized={this._initialize} />
  }
}

Bars3D.displayName = 'Bars3D'
Bars3D.defaultProps = defaultProps
