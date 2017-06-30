import React from 'react'
import LoadingIndicator from '../LoadingIndicator'

const LoadingHoc = propName => WrappedComponent => class Loader extends React.Component {
  static isEmpty (prop) {
    return (prop === null || prop === undefined ||
      (prop.constructor === Object.keys(prop).length === 0))
  }

  render () {
    if (LoadingHoc.isEmpty(this.props[propName])) {
      return (<LoadingIndicator />)
    }
    return (<WrappedComponent {...this.props} />)
  }
}

export default LoadingHoc
