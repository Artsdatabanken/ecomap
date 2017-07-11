import React from 'react'
import classificationLevels from './classificationLevels.js'
import { Card, CardText, CardMedia, CardTitle } from 'material-ui/Card'

class SpeciesGridItemCard extends React.Component {
  constructor () {
    super()
    this.state = { expanded: false }
  }
  render () {
    const tile = this.props.tile
    return (
      <Card
        key={tile.id}
        expanded={this.state.expanded}
        onClick={() => {
          this.props.onClick(tile)
          this.setState({ expanded: !this.state.expanded })
        }
        }

        style={{
          width: '100%',
          marginBottom: 2,
          pageBreakInside: 'avoid'
        }}
      >
        <CardMedia
          actAsExpander
          showExpandableButton
          overlay={<CardTitle
            title={tile.scientificName + ' (' + classificationLevels[tile.level] + ')'}
            subtitle={tile.popularName}
          />}
        >
          <span
          >
            <img src={tile.imageUrl} alt={'Photo of ' + tile.imageScientificName}
              title={tile.imageScientificName + ' - ' + tile.imageAttribution}
              onLoad={() => this.setState({ imageLoaded: true })}
              style={{
                width: '100%',
                minHeight: 132,
                maxHeight: this.state.imageLoaded ? 9900 : 400,
                opacity: this.state.imageLoaded ? 1 : 0,
                transition: 'opacity 0.5s, max-height 0.5s ease-in'
              }}
            />
          </span>
        </CardMedia>
        <CardText expandable style={{ overflowY: 'visible', height: 2000, padding: 0 }}>
          <object type='text/html'
            data={'http://artsdatabanken.no/Taxon/' + tile.id}
            style={{ width: '100%', height: '100%', overflowY: 'visible' }} >
            Species details
            </object>

        </CardText>
      </Card >
    )
  }
}

export default SpeciesGridItemCard
