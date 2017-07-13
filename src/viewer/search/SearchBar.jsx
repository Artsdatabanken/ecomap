import PropTypes from 'prop-types'
import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import Paper from 'material-ui/Paper'
import ActionSearch from 'material-ui/svg-icons/action/search'

import MainSearchBox from './MainSearchBox'

class SearchBar extends Component {
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  };

  static propTypes = {
    onLeftIconButtonTouchTap: PropTypes.func,
    onRightIconButtonTouchTap: PropTypes.func,
    onUpdateSearch: PropTypes.func.isRequired,
    zDepth: PropTypes.number
  };

  static defaultProps = {
    onLeftIconButtonTouchTap: undefined,
    onRightIconButtonTouchTap: undefined,
    zDepth: 2
  };

  handleTouchTapLeftIconButton = (event) => {
    if (this.props.onLeftIconButtonTouchTap) {
      this.props.onLeftIconButtonTouchTap(event)
    }
  };

  handleTouchTapRightIconButton = (event) => {
    if (this.props.onRightIconButtonTouchTap) {
      this.props.onRightIconButtonTouchTap(event)
    }
  };

  render () {
    const {
      onUpdateSearch,
      zDepth
    } = this.props

    const styles = {
      root: {
        position: 'relative',
        zIndex: this.context.muiTheme.zIndex.appBar,
        width: '100%',
        display: 'flex',
        paddingLeft: 0,
        paddingRight: 0
      }
    }

    const menuElementLeft = (
      <IconButton
        style={{ marginLeft: '4px', marginRight: '14px' }}
        onTouchTap={this.handleTouchTapLeftIconButton}
      >
        <NavigationMenu style={Object.assign({}, styles.iconButtonIconStyle)} />
      </IconButton>
    )

    const menuElementRight = (
      <IconButton
        style={{ marginRight: 0, marginLeft: 'auto' }}
        onTouchTap={this.handleTouchTapRightIconButton}
      >
        <ActionSearch color='#aaaaaa' hoverColor='#333333' />
      </IconButton>
    )

    return (
      <Paper
        rounded
        style={styles.root}
        zDepth={zDepth}
      >
        {menuElementLeft}
        <MainSearchBox onUpdateSearch={onUpdateSearch} />
        {menuElementRight}
      </Paper>
    )
  }
}

export default SearchBar
