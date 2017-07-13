import React, {Component} from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'

export default class Liste extends Component {
  state = {
    selected: [1]
  };

  isSelected = (index) => {
    return this.state.selected.indexOf(index) !== -1
  };

  handleRowSelection = (selectedRows) => {
    this.setState({
      selected: selectedRows
    })
  };

  render () {
    const data = [
      {id: 'T4', name: 'Skogsmark', image: 'http://artsdatabanken.no/Media/F1698?mode=480x480'},
      {id: 'T44', name: 'Åker', image: 'http://artsdatabanken.no/Media/F1493?mode=480x480'},
      {id: 'L2', name: 'Grunn limnisk sedimentbunn', image: 'http://artsdatabanken.no/Media/F1419?mode=480x480'},
      {id: 'V2', name: 'Myr og sumpskogsmark', image: 'http://artsdatabanken.no/Media/F1442?mode=480x480'}
    ]
    return (
      <Table onRowSelection={this.handleRowSelection}>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Id</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Status</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(r =>
            <TableRow key={r.id} selected={this.isSelected(0)}>
              <TableRowColumn>{r.id}</TableRowColumn>
              <TableRowColumn>{r.name}</TableRowColumn>
              <TableRowColumn><img src={r.image} /></TableRowColumn>
            </TableRow>
        )}
        </TableBody>
      </Table>
    )
  }
}
