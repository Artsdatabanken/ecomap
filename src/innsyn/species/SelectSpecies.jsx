import React from 'react'
import SpeciesGridList from './SpeciesGridList'
import SearchBar from './SearchBar'
import Paper from 'material-ui/Paper'

export default class SelectSpecies extends React.Component {
  constructor () {
    super()
    this.state = { species: [] }
  }
  handleChange = searchCriteria => {
    console.log('Searching for', searchCriteria)
    if (searchCriteria.length < 3) return
    const url =
      'http://webtjenester.artsdatabanken.no/Artskart/api/taxon/?term=' +
      searchCriteria
    this.setState({ species: [], isLoading: true })
    fetch(url).then(response => response.json()).then(json => {
      let r = json.map(x => this.mapSpecies(x))
      this.setState({
        species: r.sort((a, b) => {
          if (a.level !== b.level) return a.level - b.level
          return b.scientificName - a.scientificName
        }),
        isLoading: false
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
      featured: s.TaxonIdHiarchy.length < 4,
      imageAttribution: '',
      imageScientificName: ''
    }

    this.getCoverPhoto2(s).then(photo => {
      this.attachPhoto(r.scientificName, photo)
    })
    return r
  }

  getCoverPhoto2 (sp) {
    const parentTaxonId =
      sp.TaxonIdHiarchy.length > 1 ? sp.TaxonIdHiarchy[1] : null
    const that = this
    return new Promise(function (resolve, reject) {
      that
        .lookupCoverPhoto(sp.ValidScientificName)
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
          console.log(parentUrl)
          fetch(parentUrl).then(response => response.json()).then(json => {
            that.getCoverPhoto2(json).then(photo => resolve(photo))
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
      <Paper zDepth={2} style={{ padding: 16 }}>
        <h1>Arter</h1>
        <SearchBar onChange={v => this.handleChange(v)} />
        <span>
          <span>
            <SpeciesGridList species={this.state.species} />
          </span>
        </span>
      </Paper>
    )
  }
}
