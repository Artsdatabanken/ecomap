import React from 'react'
import {Divider} from 'material-ui'

const Setting = ({children}) =>
  <div>
    <div style={{display: 'inline-block', marginTop: '8px', height: '58px'}}>
      {children}
    </div>
    <Divider />
  </div>

export default Setting
