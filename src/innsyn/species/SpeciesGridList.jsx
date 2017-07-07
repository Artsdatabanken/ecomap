import React from 'react'
import { GridList } from 'material-ui/GridList'
import LoadingHoc from '../../HigherOrder/LoadingHoc'
import SpeciesGridItem from './SpeciesGridItem'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 1
//    width:'50%'
  },
  gridList: {}
}

const SpeciesGridList = props =>
  <div>
    Fant {props.species.length} resultater.
    <p />
    <div style={styles.root}>
      <GridList cellHeight={200} cols={3} style={styles.gridList}>
        {props.species.map(tile =>
          <SpeciesGridItem key={tile.id} tile={tile} onClick={tile => props.onClick(tile)} />
        )}
      </GridList>
    </div>
  </div>

export default LoadingHoc('isLoading', SpeciesGridList)
