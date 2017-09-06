import { HexagonLayer } from 'deck.gl'
import ramp from '../../graphics/color/ramps/'
// import EasingFunctions from '../../graphics/bezier-easing'

const DEFAULT_LIGHT_SETTINGS = {
  lightsPosition: [-0.144528, 49.739968, 80000, -3.807751, 54.104682, 80000],
  ambientRatio: 0.5,
  diffuseRatio: 0.19,
  specularRatio: 0.50,
  lightsStrength: [0.8, 0.0, 0.8, 0.0],
  numberOfLights: 2
}

export default class EcoHexagonLayer extends HexagonLayer {
  constructor (options) {
    const defaults = {
      colorRange: ramp.sliceInFours(options.colorRamp),
      colorDomain: [0, 20],
      opacity: 1.0,
      coverage: 1.0,
      elevationRange: [0, 200000],
      elevationScale: 1.0, // () => Math.cos(new Date().getSeconds()),
      extruded: true,
      getPosition: d => d,
      xgetPosition: d => d,
      updateTriggers: {
        rampUp: new Date().getTime()
      },
      lowerPercentile: 0,
      upperPercentile: 100,
      lightSettings: DEFAULT_LIGHT_SETTINGS,
      radius: 9000
    }
    const merged = Object.assign(defaults, options)
    super(merged)
  }

  static rampUp (p) {
//    this.time += 0.01
//    debugger
    console.log('date', new Date().getSeconds())
    return p * Math.sin(new Date().getSeconds())
  }

  shouldUpdateState (updateParams) {
    console.log(updateParams)
    return true
  }

/*  static defaultProps = {
    radius: 1000,
    lowerPercentile: 0,
    upperPercentile: 1,
    coverage: 1,
    elevationMin: 0,
    elevationMax: 0,
    data: []
  }
/*
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
  */
}
