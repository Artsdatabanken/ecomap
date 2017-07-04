import React from 'react'
import { GridList, GridTile } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'
import LoadingHoc from '../../HigherOrder/LoadingHoc'
import classificationLevels from './classificationLevels.js'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 1
  },
  gridList: {
    cols: 3,
    width: '100%',
    height: '100%',
    overflowY: 'auto'
  }
}

const SpeciesGridList = props =>
  <div style={styles.root}>
    <GridList cellHeight={200} cols={4} style={styles.gridList}>
      <Subheader>Subheader</Subheader>
      {props.species.map(tile => <SpeciesGridItem tile={tile} />)}
    </GridList>
  </div>

const SpeciesGridItem = ({ tile }) =>
  <GridTile
    key={tile.id}
    title={tile.scientificName + ' (' + classificationLevels[tile.level] + ')'}
    subtitle={tile.popularName}
    actionIcon={
      <IconButton>
        <StarBorder color='white' />
      </IconButton>
    }
    cols={tile.featured ? 2 : 1}
    rows={tile.featured ? 2 : 1}
  >
    <span style={{ opacity: tile.imageUrl ? 1 : 0, transition: 'opacity 0.4s' }}>
      <img src={tile.imageUrl}
        title={tile.imageScientificName + ' - ' + tile.imageAttribution}
    />
    </span>
  </GridTile>

export default LoadingHoc('isLoading', SpeciesGridList)
