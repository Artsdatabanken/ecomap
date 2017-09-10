import React from 'react'
import DeckGL from 'deck.gl'
import {Paper} from 'material-ui'
import TemporalHeatmapLayer from '../map/layer/webgl/temporalHeatmap-layer/temporalHeatmap-layer'
import sampleData from '../../data/sample/temporalAnimationSource.png'
import ramp from '../graphics/color/ramps/'
import FetchContainer from '../FetchContainer'
import PropTypes from 'prop-types'

const viewport = {
  width: 900,
  height: 800,
  longitude: 15,
  latitude: 64,
  zoom: 4.3,
  pitch: 30,
  bearing: -20
}

class TemporalHeatmapLayerStory extends React.Component {
  state = { time: 0.0 }

  _animate = () => {
    this.setState({time: this.state.time + 0.145})
  }

  componentWillMount () {
    this.animationTimer = window.setInterval(this._animate, 100)
  }

  render () {
    return (<div>Time: {this.state.time}
      <Paper style={{backgroundColor: '#ccc', width: viewport.width, height: viewport.height, margin: '10px'}}>
        <FetchContainer>
          <Loader title='adfas' dataUrl={sampleData}>
            <WebGlStuffs viewport={viewport} time={this.state.time} />
          </Loader>
        </FetchContainer>
      </Paper>
    </div>
    )
  }
}

const WebGlStuffs = ({viewport, time, temporalData}) => {
  if (!temporalData) return <div>Loading...</div>
  let layer = new TemporalHeatmapLayer({
    time: time,
    id: 'temporalheatstory',
    colorRamp: ramp.magma,
    radiusScale: 293210.0,
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
        Temporal source data:
        <canvas ref='canvas' width='802' height='640' />
      </div>)
  }

  static contextTypes = {
    fetchImage: PropTypes.func
  }
}
