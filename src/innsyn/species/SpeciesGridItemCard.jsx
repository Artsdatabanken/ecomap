import React from 'react'
import classificationLevels from './classificationLevels.js'
import IconButton from 'material-ui/IconButton'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'
import { Card, CardMedia, CardTitle } from 'material-ui/Card'

class SpeciesGridItemCard extends React.Component {
  constructor () {
    super()
    this.state = {}
  }
  render () {
    const tile = this.props.tile
    return (
      <Card
        key={tile.id}
        onClick={() => this.props.onClick(tile)}
        actionIcon={
          <IconButton>
            <StarBorder color='white' />
          </IconButton>
        }
        style={{ width: '100%', marginBottom: 2 }}
        cols={tile.featured ? 2 : 1}
        rows={tile.featured ? 2 : 1}
      >
        <CardMedia
          overlay={<CardTitle
            title={tile.scientificName + ' (' + classificationLevels[tile.level] + ')'}
            subtitle={tile.popularName} />}
        >
          <span
          >
            <img src={tile.imageUrl} alt={'Photo of ' + tile.imageScientificName}
              title={tile.imageScientificName + ' - ' + tile.imageAttribution}
              onLoad={() => this.setState({ imageLoaded: true })}
              style={{
                width: '100%',
                minHeight: 132,
                maxHeight: this.state.imageLoaded ? 2300 : 400,
                opacity: this.state.imageLoaded ? 1 : 0,
                transition: 'opacity 0.5s, max-height 0.5s ease-in'
              }}
            />
          </span>
        </CardMedia>
      </Card>
    )
  }
}

export default SpeciesGridItemCard
