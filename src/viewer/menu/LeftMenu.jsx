import PropTypes from 'prop-types'
import React from 'react'
import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import List from 'material-ui/List'
import ListItem from 'material-ui/List/ListItem'
import IconButton from 'material-ui/IconButton'
import { Link } from 'react-router-dom'
import Toggle from 'material-ui/Toggle'
import ActionInfo from 'material-ui/svg-icons/action/info'
import Subheader from 'material-ui/Subheader'

import ChevronDoubleLeft from './ChevronDoubleLeft'
import CloseOnEscape from '../../HigherOrder/CloseOnEscape'
import logo from './logo.png'

class LeftMenu extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
    onAnimate: PropTypes.func.isRequired,
    layers: PropTypes.any.isRequired,
    animate: PropTypes.bool.isRequired
  };

  static layerItems (layers, onClick) {
    return Object.keys(layers).map(ninkode => (
      <ListItem
        //        leftCheckbox={<Checkbox />}
        rightToggle={<Toggle toggled={layers[ninkode].visible} />}
        leftIcon={<ActionInfo />}
        key={ninkode}
        //        checked={layers[ninkode].visible}
        primaryText={layers[ninkode].title}
        secondaryText={ninkode}
        onClick={() => onClick(ninkode)}
      />
    ))
  }
  render () {
    return (
      <Drawer
        docked={false}
        width={400}
        open={this.props.open}
        onRequestChange={open => this.setState({ open })}
      >
        <List>
          <ListItem
            disabled
            leftAvatar={<Avatar src={logo} />}
            rightIconButton={
              <IconButton
                style={{ margin: 0 }}
                onTouchTap={() => { this.props.onClose() }}
              >
                <ChevronDoubleLeft />
              </IconButton>}
          >
            <span style={{ fontWeight: '500' }}>Artsdatabanken Naturtypekart</span>
          </ListItem>
          <Divider />
        </List>
        <List>
          <Subheader>Naturtyper</Subheader>
          {LeftMenu.layerItems(this.props.layers, this.props.onToggle)}
        </List>
        <Divider />
        <List>
          <ListItem
            rightToggle={<Toggle toggled={this.props.animate} />}
            leftIcon={<ActionInfo />}
            key='animer'
            primaryText='Lat som du lever'
            onClick={() => this.props.onAnimate()}
          />

          <ListItem>
            <Link to='/lastned/'>Last ned...</Link>
          </ListItem>
          <Divider />
          <ListItem>
            <Link to='/lastopp/'>Last opp...</Link>
          </ListItem>
          <ListItem>
            <Link to='/admin/'>Administrasjon</Link>
          </ListItem>
          <Divider />
        </List>
      </Drawer>
    )
  }
}

const LeftMenuWithEscape = ({ onEscape, ...props }) => (
  <CloseOnEscape onEscape={() => onEscape()}>
    <LeftMenu {...props} />
  </CloseOnEscape>
)

LeftMenuWithEscape.propTypes = {
  onEscape: PropTypes.func.isRequired
}

export default LeftMenuWithEscape
