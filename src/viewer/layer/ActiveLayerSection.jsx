import React from 'react'
import {Divider} from 'material-ui'
import ActiveLayerStrip from './ActiveLayerStrip'

const ActiveLayerSection = (props) => (
  <div>
    <ActiveLayerStrip {...props} />
    <Divider />
  </div>
  )

export default ActiveLayerSection
