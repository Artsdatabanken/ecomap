import React from 'react'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import ActionSearch from 'material-ui/svg-icons/action/search'
import MenuItem from 'material-ui/MenuItem'
import DropDownMenu from 'material-ui/DropDownMenu'
import RaisedButton from 'material-ui/RaisedButton'
import AutoComplete from 'material-ui/AutoComplete'
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle
} from 'material-ui/Toolbar'

export default class ToolbarExamplesSimple extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: 3
    }
  }

  handleChange = (event, index, value) => this.setState({ value })

  render () {
    return (
      <Toolbar>
        <ToolbarGroup firstChild>
          <ActionSearch />
          <AutoComplete
            style={{paddingLeft: '100px', width: '40%'}}
            hintText='Søk...'
            filter={AutoComplete.fuzzyFilter}
            dataSource={[]}
            maxSearchResults={15}
            underlineShow={false}
            onUpdateInput={v => this.props.onChange(v)}
          />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}
