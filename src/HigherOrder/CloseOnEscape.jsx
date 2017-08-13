import React from 'react'
import PropTypes from 'prop-types'

export default class CloseOnEscape extends React.Component {
  onEscape = (e) => {
    if (e.keyCode === 27) {
      this.props.onEscape()
//      e.stopPropagation()
    }
  }

  componentDidMount () {
    document.addEventListener('keydown', this.onEscape)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.onEscape)
  }

  render () {
    const childrenWithProps = React.Children.map(this.props.children,
      (child) => {
        if (!child) return child // empty result of conditionals for example
        return React.cloneElement(child, this.props)
      })
    return <div>{childrenWithProps}</div>
  }
}

CloseOnEscape.propTypes = {
  onEscape: PropTypes.func.isRequired
}
