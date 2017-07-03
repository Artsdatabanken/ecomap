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
      {props.species.map(tile =>
        <GridTile
          featured
          key={tile.id}
          title={tile.scientific_name}
          subtitle={tile.popular_name}
          actionIcon={
            <IconButton>
              <StarBorder color='white' />
            </IconButton>
          }
          cols={tile.featured ? 2 : 1}
          rows={tile.featured ? 2 : 1}
        >
          <img
            src={tile.image_url}
            title={tile.image_scientific_name + ' - ' + tile.image_attribution}
          />
        </GridTile>
      )}
    </GridList>
  </div>

export default SpeciesGridList
