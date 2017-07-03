import React from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'
import SpeciesGridList from './SpeciesGridList'
import SearchBar from './SearchBar'
import Paper from 'material-ui/Paper'

export default class SelectSpecies extends React.Component {
  constructor () {
    super()
    this.state = {}
  }
  handleChange = searchCriteria => {
    console.log(searchCriteria)
    if (searchCriteria.length < 3) return
    const url =
      'http://webtjenester.artsdatabanken.no/Artskart/api/taxon/?term=' +
      searchCriteria
    fetch(url).then(response => response.json()).then(json => {
      let r = json.map(x => this.mapSpecies(x))
      this.setState({
        species: r.sort((a, b) => {
          if (a.level !== b.level) return a.level - b.level
          return b.scientificName - a.scientificName
        })
      })
    })
  }
  mapSpecies (s) {
    let r = {
      id: s.TaxonId,
      taxonGroup: s.TaxonGroup,
      scientificName: s.ValidScientificName,
      popularName: s.PrefferedPopularname,
      level: s.TaxonIdHiarchy.length,
      featured: s.TaxonId % 4 === 1
    }

    this.getCoverPhoto2(
      s.ValidScientificName,
      s.TaxonIdHiarchy.length > 1 ? s.TaxonIdHiarchy[1] : null
    ).then(photo => {
      this.attachPhoto(r.scientificName, photo)
    })
    return r
  }

  getCoverPhoto2 (scientificName, parentTaxonId) {
    const that = this
    return new Promise(function (resolve, reject) {
      that
        .lookupCoverPhoto(scientificName)
        .then(photo => {
          resolve(photo)
        })
        .catch(e => {
          console.warn(e)
          if (!parentTaxonId) {
            reject(new Error('not found'))
            return
          }
          const parentUrl =
            'http://webtjenester.artsdatabanken.no/Artskart/api/taxon/' +
            parentTaxonId
          fetch(parentUrl).then(response => response.json()).then(json => {
            that
              .getCoverPhoto2(
                json.ValidScientificName,
                json.TaxonIdHiarchy.length > 1 ? json.TaxonIdHiarchy[1] : null
              )
              .then(photo => resolve(photo))
          })
        })
    })
  }

  lookupCoverPhoto (scientificName) {
    return new Promise(function (resolve, reject) {
      const url =
        'http://api.inaturalist.org/v1/taxa/autocomplete?q=' + scientificName
      fetch(url).then(response => response.json()).then(json => {
        if (json.total_results <= 0) {
          reject(new Error('No results for ' + scientificName))
          return
        }
        const photo = json.results[0].default_photo
        if (photo === null) {
          reject(new Error('No photo for ' + scientificName))
          return
        }
        photo.scientificName = scientificName
        resolve(photo)
      })
    })
  }

  attachPhoto (scientificName, photo) {
    let species = this.state.species
    if (species === null) return
    if (photo === null) {
      console.info('No photo found for ' + scientificName)
      return
    }
    const updatedSpecies = species.map(x => {
      if (x.scientificName !== scientificName) return x
      x.imageScientificName = photo.scientificName
      x.imageUrl = photo.medium_url
      x.imageAttribution = photo.attribution
      return x
    })
    this.setState({
      species: updatedSpecies
    })
  }

  render () {
    return (
      <Paper zDepth={4} style={{ padding: 16 }}>
        <SearchBar onChange={v => this.handleChange(v)} />
        <h1>Arter</h1>
        {this.state.species &&
          <span>
            <SpeciesGridList species={this.state.species} />
            <SpeciesSimpleList species={this.state.species} />
          </span>}
      </Paper>
    )
  }
}

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
