import React from 'react'
import {GridTile} from 'material-ui/GridList'
import classificationLevels from './classificationLevels.js'
import IconButton from 'material-ui/IconButton'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'

const SpeciesGridItem = ({ tile, onClick }) =>
  <GridTile
    key={tile.id}
    title={tile.scientificName + ' (' + classificationLevels[tile.level] + ')'}
    subtitle={tile.popularName}
    onClick={() => onClick(tile)}
    actionIcon={
      <IconButton>
        <StarBorder color='white' />
      </IconButton>
    }
    cols={tile.featured ? 2 : 1}
    rows={tile.featured ? 2 : 1}
  >
    <span
      style={{ opacity: tile.imageUrl ? 1 : 0, transition: 'opacity 0.4s' }}
    >
      <img
        src={tile.imageUrl}
        alt={'Photo of ' + tile.imageScientificName}
        title={tile.imageScientificName + ' - ' + tile.imageAttribution}
      />
    </span>
  </GridTile>

export default SpeciesGridItem
