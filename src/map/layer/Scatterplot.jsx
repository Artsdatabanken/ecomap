import React, {Component} from 'react'
import PropTypes from 'prop-types'
import DeckGL, {ScatterplotLayer} from 'deck.gl'
import {hexToArray} from '../../viewer/layer/colorfunc'

export default class Scatterplot extends Component {
  static contextTypes = {
    fetchJson: PropTypes.func
  }

  state = {
  }

  receiveData (json) {
    json.then((json) => {
      const acc = json.features.reduce((acc, feature) => {
        const geom = feature.geometry
        if (geom.type === 'Point') {
          acc.push({position: [
            geom.coordinates[0],
            geom.coordinates[1]],
            radius: 2500}
          )
        }
        return acc
      }, [])
      this.setState({ data: acc, isLoading: false })
    })
  }

  componentDidMount () {
    this.context.fetchJson(this.props.title, this.props.dataUrl, json => this.receiveData(json))
  }

  render () {
    const {viewport, radius} = this.props
    const fillColor = hexToArray(this.props.fillColor, this.props.fillOpacity)
    const {data} = this.state
    if (!data) {
      return null
    }
    const layer = new ScatterplotLayer({
      id: 'scatter-plot',
      data,
//      radiusScale: radius * 60,
//      radiusMinPixels: 1,
      // getPosition: d => { const p = [d[0], d[1]]; console.log(p); return p }
//      getColor: d => { console.log(d[2]); return d[2] ? maleColor : femaleColor },
      getColor: d => fillColor,
      getRadius: d => radius * 15000,
      updateTriggers: {
        getColor: {c1: fillColor},
        getRadius: {r1: radius}
      }
    })
    return (
      <DeckGL {...viewport} layers={[layer]} />
    )
  }
}
