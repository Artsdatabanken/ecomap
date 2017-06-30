import React from 'react'
import { List } from 'material-ui/List'

import Kartlagelement from './Kartlagelement'

class KartlagListe extends React.Component {
  state = { kartlag: [] };

  render () {
    return (
      <List>
        {this.state.kartlag.map(x => (<Kartlagelement key={x.id} kartlag={x} />))}
      </List>)
  }
}

export default KartlagListe
