import React from 'react'
import { GridList, GridTile } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'

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
    <GridList cellHeight={220} cols={4} style={styles.gridList}>
      <Subheader>Subheader</Subheader>
      {props.species.map(tile => <SpeciesGridItem tile={tile} />)}
    </GridList>
  </div>

const SpeciesGridItem = ({tile}) =>
  <GridTile
    key={tile.id}
    title={tile.level + ' ' + tile.scientificName}
    subtitle={tile.popularName}
    actionIcon={
      <IconButton>
        <StarBorder color="white" />
      </IconButton>
    }
    cols={tile.featured ? 2 : 1}
    rows={tile.featured ? 2 : 1}
  >
    <img
      src={tile.imageUrl}
      title={tile.imageScientificName + ' - ' + tile.imageAttribution}
    />
  </GridTile>

export default SpeciesGridList
