import React from 'react'
import TextField from 'material-ui/TextField'
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

// http://webtjenester.artsdatabanken.no/Artskart/api/taxon/?term=Aglaothamnion%20halliae
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
    const data = fetch(url).then(response => response.json()).then(json => {
      this.setState({
        species: json.map(x => this.mapSpecies(x))
      })
    })
  }
  mapSpecies (s) {
    let r = {
      id: s.TaxonId,
      taxon_group: s.TaxonGroup,
      scientific_name: s.ValidScientificName,
      popular_name: s.PrefferedPopularname,
      featured: s.TaxonId % 4 == 1
    }

    this.getCoverPhoto2(
      r.scientific_name,
      s.TaxonIdHiarchy.length > 1 ? s.TaxonIdHiarchy[1] : null
    ).then(photo => {
      this.attachPhoto(r.scientific_name, photo)
    })
    return r
  }

  getCoverPhoto2 (scientific_name, parent_taxon_id) {
    const that = this
    return new Promise(function (resolve, reject) {
      const photo = that
        .lookupCoverPhoto(scientific_name)
        .then(photo => {
          resolve(photo)
        })
        .catch(e => {
          console.warn(e)
          if (!parent_taxon_id) {
            reject('not found')
            return
          }
          const parent_url =
            'http://webtjenester.artsdatabanken.no/Artskart/api/taxon/' +
            parent_taxon_id
          const data = fetch(parent_url)
            .then(response => response.json())
            .then(json => {
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

  /*
<Genus>Elfvingia</Genus>
Lilje
<Id>39702</Id>
  */
  lookupCoverPhoto (scientific_name) {
    return new Promise(function (resolve, reject) {
      const url =
        'http://api.inaturalist.org/v1/taxa/autocomplete?q=' + scientific_name
      const data = fetch(url).then(response => response.json()).then(json => {
        if (json.total_results <= 0) {
          reject('No results for ' + scientific_name)
          return
        }
        const photo = json.results[0].default_photo
        if (photo === null) {
          reject('No photo for ' + scientific_name)
          return
        }
        photo.scientific_name = scientific_name
        resolve(photo)
      })
    })
  }

  attachPhoto (scientific_name, photo) {
    let species = this.state.species
    if (species === null) return
    if (photo === null) {
      console.info('No photo found for ' + scientific_name)
      return
    }
    const updatedSpecies = species.map(x => {
      if (x.scientific_name !== scientific_name) return x
      x.image_scientific_name = photo.scientific_name
      x.image_url = photo.medium_url
      x.image_attribution = photo.attribution
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
                    {s.popular_name}
                    <br />
                  </div>}
                {s.scientific_name}
              </TableRowColumn>
              <TableRowColumn>
                {s.taxon_group}
              </TableRowColumn>
              <TableRowColumn>
                <img src={s.image_url} title={s.image_attribution} />
              </TableRowColumn>
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
  }
}

// http://api.inaturalist.org/v1/taxa/autocomplete?q=syringa%20vulgaris
// http://eol.org/api/pages/1.0?id=1045608&details=true&licenses=public+domain&language=en&format=json
/*
CategoryValue:"genus"
Class:"Mammalia"
DateTimeUpdated:"2015-10-25T00:18:01.383597"
ExistsInCountry:false
Family:"Canidae"
Genus:"Vulpes"
Id:31173
IsDeleted:false
Kingdom:"Animalia"
Order:"Carnivora"
Phylum:"Chordata"
PopularNames:Array(0)
length:0
__proto__:Array(0)
PrefferedPopularname:null
scientific_nameIdHiarchy:Array(8)
scientific_names:Array(2)
Species:null
SubSpecies:null
TaxonGroup:"Pattedyr"
TaxonGroupId:23
TaxonId:31173
TaxonIdHiarchy:Array(8)
TaxonTags:Array(0)
Validscientific_name:"Vulpes"
Validscientific_nameAuthorship:"Frisch, 1775"
Validscientific_nameId:48030
*/
