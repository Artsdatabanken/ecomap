import React from 'react'
import ActionSearch from 'material-ui/svg-icons/action/search'
import AutoComplete from 'material-ui/AutoComplete'
import {
  Toolbar,
  ToolbarGroup
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
        <ToolbarGroup>
          <ActionSearch style={{position: 'relative', left: 140}} />
          <AutoComplete
            style={{width: '40%'}}
            hintText='Søk...'
            filter={AutoComplete.fuzzyFilter}
            dataSource={[]}
            maxSearchResults={15}
            underlineShow={false}
            onUpdateInput={v => this.props.onChange(v)}
          />
        </ToolbarGroup>
        <ToolbarGroup style={{width: '80%'}} />
      </Toolbar>
    )
  }
}
