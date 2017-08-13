import React, { Component } from 'react'
import DeckGL, { HexagonLayer } from 'deck.gl'
import {viridis} from '../../graphics/color/ramps.js'
import {hexToArray} from '../../graphics/color/colorfunc'

const viridisArray = viridis.map(c => hexToArray(c))

const LIGHT_SETTINGS = {
  lightsPosition: [-0.144528, 49.739968, 8000, -3.807751, 54.104682, 8000],
  ambientRatio: 0.4,
  diffuseRatio: 0.6,
  specularRatio: 0.2,
  lightsStrength: [0.8, 0.0, 0.8, 0.0],
  numberOfLights: 2
}

const elevationScale = { min: 1, max: 50 }

export default class Hexagon extends Component {
  static defaultProps = {
    radius: 1000,
    lowerPercentile: 0,
    upperPercentile: 1,
    coverage: 1,
    elevationMin: 0,
    elevationMax: 0,
    data: [],
    blendMode: 'multiply'
  }

  static displayName = 'Hexagon'

  static get defaultColorRange () {
    return viridisArray
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
    const { data, viewport, radius, coverage, elevationMin, elevationMax,
      lowerPercentile, upperPercentile, fillOpacity, blendMode } = this.props
    if (!data) { return null }

    const layers = [
      new HexagonLayer({
        id: 'heatmap',
//        colorDomain: [0, 10],
        colorRange: viridisArray,
        coverage,
        data,
        elevationRange: [elevationMin * 20000, elevationMax * 200000],
        extruded: elevationMax > 0,
        getPosition: d => d,
        lightSettings: LIGHT_SETTINGS,
        onHover: this.props.onHover,
        opacity: fillOpacity,
        pickable: Boolean(this.props.onHover),
        radius: radius * 20000,
        lowerPercentile: lowerPercentile * 100,
        upperPercentile: upperPercentile * 100
      })
    ]
    return <DeckGL
      style={{mixBlendMode: blendMode}}
      {...viewport}
      layers={layers}
      onWebGLInitialized={this._initialize} />
  }
}
