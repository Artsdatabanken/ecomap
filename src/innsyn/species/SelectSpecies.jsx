import React from 'react'
import SpeciesGridList from './SpeciesGridList'
import SearchBar from './SearchBar'
// import SpeciesContainer from './ArtsdatabankSpeciesContainer'
import SpeciesContainer from './ArtskartSpeciesContainer'

class SelectSpecies extends React.Component {
  constructor () {
    super()
    this.state = {
      searchCriteria: ''
    }
  }

  render () {
    return (
      <span>
        <SearchBar onChange={v => this.handleChange(v)} />
        <div style={{ height: 32 }} />
        <SpeciesContainer searchCriteria={this.state.searchCriteria}>
          <SpeciesGridList onClick={tile => this.props.onClick(tile)} />
        </SpeciesContainer>
      </span>
    )
  }

  handleChange (criteria) {
    this.setState({ searchCriteria: criteria })
  }
}

export default SelectSpecies
