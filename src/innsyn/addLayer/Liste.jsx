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
        {data.map(r =>
          <TableRow selected={this.isSelected(0)}>
            <TableRowColumn>{r.id}</TableRowColumn>
            <TableRowColumn>{r.name}</TableRowColumn>
            <TableRowColumn><img src={r.image} /></TableRowColumn>
          </TableRow>
        )}
        <TableBody>
          <TableRow selected={this.isSelected(0)}>
            <TableRowColumn>1</TableRowColumn>
            <TableRowColumn>John Smith</TableRowColumn>
            <TableRowColumn>Employed</TableRowColumn>
          </TableRow>
          <TableRow selected={this.isSelected(1)}>
            <TableRowColumn>2</TableRowColumn>
            <TableRowColumn>Randal White</TableRowColumn>
            <TableRowColumn>Unemployed</TableRowColumn>
          </TableRow>
          <TableRow selected={this.isSelected(2)}>
            <TableRowColumn>3</TableRowColumn>
            <TableRowColumn>Stephanie Sanders</TableRowColumn>
            <TableRowColumn>Employed</TableRowColumn>
          </TableRow>
          <TableRow selected={this.isSelected(3)}>
            <TableRowColumn>4</TableRowColumn>
            <TableRowColumn>Steve Brown</TableRowColumn>
            <TableRowColumn>Employed</TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    )
  }
}
