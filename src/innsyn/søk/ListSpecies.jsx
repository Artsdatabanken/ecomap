import React from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'

class SpeciesSimpleList extends React.Component {
  render () {
    return (
      <Table onRowSelection={this.handleRowSelection}>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Takson</TableHeaderColumn>
            <TableHeaderColumn>Navn</TableHeaderColumn>
            <TableHeaderColumn>Gruppe</TableHeaderColumn>
            <TableHeaderColumn>Bilde</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {this.props.species.map(s =>
            <TableRow key={s.id}>
              <TableRowColumn>
                {s.id}
              </TableRowColumn>
              <TableRowColumn>
                {s.popularName &&
                  <div>
                    {s.popularName}
                    <br />
                  </div>}
                {s.scientificName}
              </TableRowColumn>
              <TableRowColumn>
                {s.taxonGroup}
              </TableRowColumn>
              <TableRowColumn>
                <img src={s.imageUrl} title={s.imageAttribution} />
              </TableRowColumn>
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
  }
}

export default SpeciesSimpleList
