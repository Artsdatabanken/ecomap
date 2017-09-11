import React from 'react'
import DeckGL from 'deck.gl'
import TemporalHeatmapLayer from '../map/layer/webgl/temporalHeatmap-layer/temporalHeatmap-layer'
// import sampleData from '../../data/sample/temporalAnimationSource.png'
// import sampleData from '../../data/sample/yearofbirds.png'
// import sampleData from '../../data/sample/kortnebbgås.png'
import sampleData from '../../data/sample/yearoflovsanger.png'
import ramp from '../graphics/color/ramps/'
import FetchContainer from '../FetchContainer'
import PropTypes from 'prop-types'
import {rgbToHex} from '../graphics/color/colorfunc'
import SliderSetting from '../viewer/layer/settings/SliderSetting'
import ColorRampSelector from '../viewer/layer/settings/ColorRampSelector'

class TemporalHeatmapLayerStory extends React.Component {
  state = {
    ramp: 'plasma',
    time: 0.0,
    speedFactor: 0.1,
    viewport: {
      width: 700,
      height: 700,
      longitude: 10, // --4 - 32  = 28
      latitude: 66, // -- 57 - 72 = 15
      zoom: 4.4,
      pitch: 0,
      bearing: 0
    },
    time: 0.0
  }

  _animate = () => {
    this.state.time = (this.state.time + this.state.speedFactor * 0.5)
    this.state.viewport.pitch = 10 + Math.sin(this.state.time / 25) * 10
    this.state.viewport.bearing = -10 + Math.sin(this.state.time / 30) * 5
    this.setState(this.state)
  }

  componentDidMount () {
    this.animationTimer = window.setInterval(this._animate, 20)
  }

  componentWillUnmount () {
    window.clearInterval(this.animationTimer)
  }

  render () {
    const time = (this.state.time % 24)
    const week = time / 24 * 52
    const viewport = this.state.viewport
    const title = 'Willow warbler observations during week ' + Math.trunc(week + 1)
    return (<div>
      <div style={{float: 'left', backgroundColor: '#ddd'}}>
        <FetchContainer>
          <Loader dataUrl={sampleData}>
            <WebGlStuffs viewport={viewport}
              time={time} ramp={ramp[this.state.ramp]} />
          </Loader>
        </FetchContainer>
      </div>
      <div style={{float: 'left', margin: '20px'}}>
        <SliderSetting
          title={title} value={week / 52} />
        <SliderSetting
          title='Speed'
          value={this.state.speedFactor}
          onChange={(v) => this.setState({speedFactor: v})} />
        <ColorRampSelector
          value={this.state.ramp}
          onChange={(v) => this.setState({ramp: v})} />
      </div>
    </div>
    )
  }
}

const WebGlStuffs = ({viewport, time, temporalData, ramp}) => {
  if (!temporalData) return <div>Loading...</div>
  let layer = new TemporalHeatmapLayer({
    time: time,
    id: 'temporalheatstory',
    colorRamp: ramp,
    radiusScale: 593210.0,
    fillOpacity: 1.0,
    height: 1.0,
    data: [[14, 66, 0]],
    temporalData: temporalData
  })

  return <DeckGL
    {...viewport}
    layers={[layer]}
//    glOptions={{webgl2: true}}
    onWebGLInitialized={(gl) => {
      gl.enable(gl.DEPTH_TEST)
      gl.depthFunc(gl.LEQUAL)
    }}
/>
}

export default TemporalHeatmapLayerStory

class Loader extends React.Component {
  state = {}
  componentDidMount () {
    this.ctx = this.refs.canvas.getContext('2d')

    this.context.fetchImage(this.props.title, this.props.dataUrl,
      image => {
        this.ctx.drawImage(image, 0, 0)
        this.setState({temporalData: this.refs.canvas})
      })
  }

  render () {
    // Pass the loaded data to child components
    const props = {...this.props,
      temporalData: this.state.temporalData
    }
    const childrenWithProps = React.Children.map(this.props.children,
      (child) => {
        if (!child) return child // result of conditionals for example
        return React.cloneElement(child, props)
      })
    return (
      <div>
        <div>
          {childrenWithProps}
        </div>
        <p>
        Temporal source data:<br />
          <canvas ref='canvas' width='1024' height='1024' />
        </p>
      </div>)
  }

  static contextTypes = {
    fetchImage: PropTypes.func
  }
}
