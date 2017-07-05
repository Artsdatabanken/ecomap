import React from 'react'
import LoadingIndicator from '../LoadingIndicator'

const LoadingHoc = (loadingFlagPropName, WrappedComponent) =>
  class Loader extends React.Component {
    render () {
      const isLoading = this.props[loadingFlagPropName]
      if (isLoading) {
        return <LoadingIndicator />
      }
      return <WrappedComponent {...this.props} />
    }
  }

export default LoadingHoc
