import React from 'react'

export default class ArtsdatabankSpeciesContainer extends React.Component {
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
      'http://artsdatabanken.no/api/Resource/?SubType=Image&ScientificNames,ScientificName=' +
      searchCriteria +
      '*'
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
    const sciName = s.ScientificNames[0]
    let r = {
      id: sciName.ScientificNameId,
      taxonGroup: 's.TaxonGroup',
      scientificName: sciName.ScientificName,
      scientificNameId: sciName.ScientificNameId,
      popularName: 'Popularname?',
      level: sciName.HigherClassification.length,
      featured: false, // sciName.HigherClassification.length < 0,
      imageUrl: s.Download,
      imageAttribution: 'Attribution?',
      imageScientificName: sciName.ScientificName
    }
    return r
  }
}
