import React from 'react'
import PropTypes from 'prop-types'
import readGeoJsonPoints from '../../translate/GeoJson.js'

export default class ArtskartDataSourceContainer extends React.Component {
  static propTypes = {
    dataUrl: PropTypes.string.isRequired
  }

  static contextTypes = {
    fetchJson: PropTypes.func
  }

  state={}

  mapper (json) {
    const acc = json.features.reduce((acc, feature) => {
      const geom = feature.geometry
      if (geom.type === 'Point') { acc.push(geom.coordinates) }
      return acc
    }, [])
    return acc
  }

  receiveData (json) {
    json.then((json) => {
      var data = readGeoJsonPoints(json)
      this.setState({ data })
    })
  }

  componentDidMount () {
    this.context.fetchJson(this.props.title, this.props.dataUrl,
      json => this.receiveData(json))
  }

  render () {
    // Pass the loaded data to child components
    const props = {...this.props,
      data: this.state.data
    }
    const childrenWithProps = React.Children.map(this.props.children,
      (child) => {
        if (!child) return child // result of conditionals for example
        return React.cloneElement(child, props)
      })
    return <div>{childrenWithProps}</div>
  }
}
