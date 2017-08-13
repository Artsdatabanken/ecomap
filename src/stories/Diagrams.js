import React from 'react'
import { storiesOf } from '@storybook/react'
import LineDiagram from '../viewer/diagram/LineDiagram'
import BarDiagram from '../viewer/diagram/BarDiagram'

const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 }
]

const diagrams = () => storiesOf('Diagram', module)
.add('Bar', () =>
  <div>
    <h3>Bar chart</h3>
    <BarDiagram data={data} />
  </div>
)
.add('Line', () =>
  <div style={{ margin: '20px' }}>
    <LineDiagram data={data} />
  </div>
)

export default diagrams
