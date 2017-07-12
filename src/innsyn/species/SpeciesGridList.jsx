import React from 'react'
import LoadingHoc from '../../HigherOrder/LoadingHoc'
import SpeciesGridItemCard from './SpeciesGridItemCard'

const styles = {
  root: {
    columnCount: 4
  }
}

const SpeciesGridList = props =>
  <div style={styles.root}>
    {props.species.map(tile =>
      <SpeciesGridItemCard key={tile.id} tile={tile} onClick={tile => props.onClick(tile)} />
    )}
  </div>

export default LoadingHoc('isLoading', SpeciesGridList)
