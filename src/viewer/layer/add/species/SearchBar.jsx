import React from 'react'
import ActionSearch from 'material-ui/svg-icons/action/search'
import AutoComplete from 'material-ui/AutoComplete'

export default class ToolbarExamplesSimple extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: 3
    }
  }
  componentDidMount () {
    this.searchInput.focus()
  }
  handleChange = (event, index, value) => this.setState({ value })

  render () {
    return (
      <span>
        <ActionSearch style={{ position: 'relative', left: 16, top: 8 }} />
        <AutoComplete
          style={{ left: 32, width: '40%' }}
          hintText='Søk...'
          filter={AutoComplete.fuzzyFilter}
          dataSource={[]}
          maxSearchResults={15}
          underlineShow={false}
          ref={(input) => { this.searchInput = input }}
          onUpdateInput={v => this.props.onChange(v)}
        />
      </span>
    )
  }
}
