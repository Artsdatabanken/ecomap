import React from 'react'

export default class ArtskartSpeciesContainer extends React.Component {
  constructor () {
    super()
    this.state = {
      species: [],
      isLoading: false
    }
  }

  componentWillReceiveProps (nextProps) {
    this.handleChange(nextProps.searchCriteria)
  }

  render () {
    var childrenWithProps = React.cloneElement(this.props.children, {
      species: this.state.species,
      isLoading: this.state.isLoading
    })
    return (
      <span>
        {childrenWithProps}
      </span>
    )
  }

  handleChange = searchCriteria => {
    if (searchCriteria.length < 3) return
    console.log('Searching for', searchCriteria)
    const url =
      'http://webtjenester.artsdatabanken.no/Artskart/api/taxon/?term=' +
      searchCriteria
    this.setState({ species: [], isLoading: true })
    fetch(url).then(response => response.json()).then(json => {
      console.log(json.length, 'species found')
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
      scientificNameId: s.ValidScientificNameId,
      popularName: s.PrefferedPopularname,
      level: s.TaxonIdHiarchy.length,
      featured: s.TaxonIdHiarchy.length < 5,
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
}
