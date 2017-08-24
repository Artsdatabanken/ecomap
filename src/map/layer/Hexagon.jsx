import React, { Component } from 'react'
import { HexagonLayer } from 'deck.gl'
import ramp from '../../graphics/color/ramps/'

const LIGHT_SETTINGS = {
  lightsPosition: [-0.144528, 49.739968, 8000, -3.807751, 54.104682, 8000],
  ambientRatio: 0.4,
  diffuseRatio: 0.6,
  specularRatio: 0.2,
  lightsStrength: [0.8, 0.0, 0.8, 0.0],
  numberOfLights: 2
}

export default class Hexagon extends Component {
  static displayName = 'Hexagon'

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

  static get defaultColorRange () {
    return ramp.viridis
  }

  state = {
    elevationScale: 0
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.data === null) {
      this._stopAnimate()
    }
    if (nextProps.data.length !== this.props.data.length) {
  //    this._animate()
    }
  }

  componentWillMount () {
//    this._animate()
  }

  componentWillUnmount () {
    this._stopAnimate()
  }

  _stopAnimate = () => {
    window.clearTimeout(this.startAnimationTimer)
    window.clearTimeout(this.intervalTimer)
  }

  _animate () {
    this._stopAnimate()
    this.setState({elevationScale: 0})

    this.startAnimationTimer = window.setTimeout(this._startAnimate, 100)
  }

  _startAnimate = () => {
    this.intervalTimer = window.setInterval(this._animateHeight, 15)
  }

  easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
  easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  easeInOutQuart = (t) => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t

  _animateHeight = () => {
    if (this.state.elevationScale >= 1) {
      this._stopAnimate()
    } else {
      this.setState(prevState => ({
        elevationScale: prevState.elevationScale + 0.018}))
    }
  }

  render () {
    const { id, data, radius, coverage, elevationMin, elevationMax,
      lowerPercentile, upperPercentile, opacity, colorRange,
      colorDomainMin, colorDomainMax } = this.props
    if (!data) { return null }
    const layer =
      new HexagonLayer({
        id: 'heatmap',
        colorRange,
        colorDomain: [colorDomainMin * 50, colorDomainMax * 50],
        opacity,
        coverage,
        data,
        elevationRange: [elevationMin * 200000, elevationMax * 500000],
        elevationScale: this.easeInOutQuart(this.state.elevationScale),
        extruded: elevationMax > 0,
        getPosition: d => d,
        lightSettings: LIGHT_SETTINGS,
        onHover: this.props.onHover,
        pickable: Boolean(this.props.onHover),
        radius: radius * 50000,
        lowerPercentile: lowerPercentile * 100,
        upperPercentile: upperPercentile * 100
      })
    return layer
  }
}
