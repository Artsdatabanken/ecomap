import React from 'react'
import DeckGL from 'deck.gl'
import {Paper} from 'material-ui'
import TemporalHeatmapLayer from '../map/layer/webgl/temporalHeatmap-layer/temporalHeatmap-layer'
// import sampleData from '../../data/sample/temporalAnimationSource.png'
import sampleData from '../../data/sample/yearofbirds.png'
import ramp from '../graphics/color/ramps/'
import FetchContainer from '../FetchContainer'
import PropTypes from 'prop-types'
import {rgbToHex} from '../graphics/color/colorfunc'

class TemporalHeatmapLayerStory extends React.Component {
  state = {
    viewport: {
      width: 900,
      height: 1100,
      longitude: 15, // --4 - 32  = 28
      latitude: 64, // -- 57 - 72 = 15
      zoom: 4.6,
      pitch: 0,
      bearing: 5
    },
    time: 0.0
  }

  _animate = () => {
    this.setState({time: (this.state.time + 0.055)})
  }

  componentWillMount () {
    this.animationTimer = window.setInterval(this._animate, 50)
  }

  render () {
    const time = (this.state.time % 24) / 24 * 52
    const viewport = this.state.viewport
    return (<div>Time: {time}
      <Paper style={{backgroundColor: '#ccc', width: viewport.width, height: viewport.height, margin: '10px'}}>
        <FetchContainer>
          <Loader title='adfas' dataUrl={sampleData}>
            <WebGlStuffs viewport={viewport} time={time} />
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
    colorRamp: ramp.gray,
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
/*
        for (var x = 0; x < 256; x++) {
          for (var y = 0; y < 256; y++) {
            var r = 255 - Math.trunc(Math.sqrt((Math.pow(128 - x, 2) + Math.pow(128 - y, 2))))
            this.ctx.fillStyle = rgbToHex(r, x, y)
            this.ctx.fillRect(x * 2, y * 2, 2, 2)
          }
        }
*/
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
        <canvas ref='canvas' width='1024' height='1024' />
      </div>)
  }

  static contextTypes = {
    fetchImage: PropTypes.func
  }
}
