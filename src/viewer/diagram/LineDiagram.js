import React from 'react'
import { LineChart, Line } from 'recharts'

const LineDiagram = ({data}) =>
  <LineChart width={400} height={400} data={data}>
    <Line type='monotone' dataKey='uv' stroke='#8884d8' />
  </LineChart>

export default LineDiagram
