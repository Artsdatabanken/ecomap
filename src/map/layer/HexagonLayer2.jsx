import {HexagonLayer} from 'deck.gl'
import ramp from '../../graphics/color/ramps/'

const DEFAULT_LIGHT_SETTINGS = {
  lightsPosition: [-0.144528, 49.739968, 80000, -3.807751, 54.104682, 80000],
  ambientRatio: 0.5,
  diffuseRatio: 0.19,
  specularRatio: 0.50,
  lightsStrength: [0.8, 0.0, 0.8, 0.0],
  numberOfLights: 2
}

export default class HexagonLayer2 extends HexagonLayer {
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

  timerUpdate () {
    this.setState({
      elevationScale: this.state.elevationScale * 1.1})
  }
  initializeState () {
    super.initializeState()
    this.setState({timer: setInterval(() => { this.timerUpdate(this) }, 1260)})
//    this.state.elevationScale = 0.2
  }
/*
  _onGetSublayerColor (cell) {
    return super._onGetSublayerColor(cell)
  }
*/
  updateState ({oldProps, props, changeFlags}) {
    console.log('updateState', this)
//    this.state.elevationScale *= 1.03
//    this.setState({elevationScale: this.state.elevationScale * 1.1})
  //  console.log(this.state.elevationScale)
    this.props.updateTriggers.rampUp = new Date().getUTCMilliseconds()
//    this.props.elevationScale = this.props.elevationScale * 1.01
//    return true
    let newProps = {...props}
    Object.assign(this.state, {elevationScale: this.state.elevationScale})

    console.log(newProps.elevationScale)
    return super.updateState({oldProps, props: newProps, changeFlags})
  }

  renderLayers () {
    console.log(':__')
    debugger
    super.renderLayers()
  }
}

HexagonLayer2.layerName = 'Hexagon2'
