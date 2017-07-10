import React from 'react'
import LoadingHoc from '../../HigherOrder/LoadingHoc'
import SpeciesGridItemCard from './SpeciesGridItemCard'

const styles = {
  root: {
    columnCount: 3
  }
}

const SpeciesGridList = props =>
  <div style={styles.root}>
    {props.species.map(tile =>
      <SpeciesGridItemCard key={tile.id} tile={tile} onClick={tile => props.onClick(tile)} />
    )}
  </div>

export default LoadingHoc('isLoading', SpeciesGridList)

/*
      <GridList cols={3} style={styles.gridList}>
      </GridList>

    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexBasis: 'auto',
    padding: 1,
     flexDirection: 'column',
overflowY: 'scroll!important',
overflowX: 'hidden'

*/
