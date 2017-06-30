import PropTypes from 'prop-types'
import React, { Children } from 'react'

export default class CloseOnEscape extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  }

  componentDidMount () {
    document.addEventListener('keydown', this.onEscape)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.onEscape)
  }

  onEscape = (e) => {
    if (e.keyCode === 27) {
      this.props.onEscape()
    }
  }

  render () {
    return Children.only(this.props.children)
  }
}

CloseOnEscape.propTypes = {
  onEscape: PropTypes.func.isRequired
}
