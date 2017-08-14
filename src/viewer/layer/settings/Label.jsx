import React from 'react'
import theme from '../../../theme'

const Label = ({ children }) =>
  <div
    style={{
      position: 'relative',
      fontSize: '12px',
      fontFamily: theme.fontFamily,
      color: theme.palette.disabledColor
    }}
  >
    {children}
  </div>

export default Label
