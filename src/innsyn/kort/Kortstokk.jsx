import PropTypes from 'prop-types'
import React from 'react'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import Paper from 'material-ui/Paper'

import Naturtypekort from './Naturtypekort'
import Kalkkort from './Kalkkort'

class Kortstokk extends React.Component {
  static propTypes = {
    features: PropTypes.any.isRequired
  };
  static titleCase (str) {
    const splitStr = str
      .toLowerCase()
      .split('_')
    for (let i = 0; i < splitStr.length; i += 1) {
      // You do not need to check if i is larger than splitStr length, as your for
      // does that for you Assign it back to the array
      splitStr[i] = splitStr[i]
        .charAt(0)
        .toUpperCase() + splitStr[i].substring(1)
    }
    // Directly return the joined string
    return splitStr.join(' ')
  }

  static listKort (features) {
    console.warn(features)
    return features.map((feature) => {
      const key = feature.layer.id
      console.log(key)
      if (key.startsWith('NIN KA')) {
        return <Kalkkort
          key={key}
          kode={key.substring(4)}
          properties={feature.properties} />
      }
      if (key.startsWith('NIN ')) {
        return (<Naturtypekort
          key={key}
          ninkode={key.substring(4)}
          properties={feature.properties}
        />)
      }
      return (
        <Card key={key}>
          <CardTitle
            style={{
              backgroundColor: feature.layer['fill-color']
            }}
            title={Kortstokk.titleCase(key)}
            showExpandableButton
            actAsExpander
          />
          <CardText expandable>
            Quaerat rem modi et corrupti laudantium vel quisquam. Rerum sequi voluptas vitae
            quos natus sint. Quisquam corporis doloremque omnis ut voluptate. Expedita
            repellendus non dolores et ducimus esse blanditiis cupiditate. Blanditiis
            molestiae asperiores eos sunt consectetur dolor tempora repellat. Ut tenetur sit
            dolor iure.
          </CardText>
        </Card>
      )
    })
  }

  render () {
    return (
      <Paper
        zDepth={4}
        style={{
          position: 'absolute',
          top: '12px',
          right: '24px',
          width: '350px'
        }}
      >
        {Kortstokk.listKort(this.props.features)}
      </Paper>
    )
  }
}

export default Kortstokk
