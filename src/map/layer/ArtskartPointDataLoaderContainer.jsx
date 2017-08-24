import React from 'react'
import PropTypes from 'prop-types'
import readGeoJsonPoints from '../../translate/GeoJson.js'

export default class ArtskartPointDataLoaderContainer extends React.Component {
  static propTypes = {
    dataUrl: PropTypes.string.isRequired
  }

  static contextTypes = {
    fetchJson: PropTypes.func.isRequired
  }

  mapper (json) {
    console.log('mapper')
    const acc = json.features.reduce((acc, feature) => {
      const geom = feature.geometry
      if (geom.type === 'Point') { acc.push(geom.coordinates) }
      return acc
    }, [])
    return acc
  }

  receiveData (json) {
    console.log('receive')
    json.then((json) => {
      var data = readGeoJsonPoints(json)
      this.props.onLoaded(data)
    })
  }

  componentDidMount () {
    console.log('didmount')
    this.context.fetchJson(this.props.title, this.props.dataUrl,
      json => this.receiveData(json))
  }

  render () {
    console.log('render')
    return <span />
  }
}
