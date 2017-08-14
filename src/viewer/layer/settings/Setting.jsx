import React from 'react'
import Label from './Label'

const Setting = ({title, children}) =>
  <div>
    <div style={{display: 'inline-block'}}>
      <Label>
        {title}
      </Label>
      {children}
    </div>
  </div>

export default Setting
