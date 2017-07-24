import React from 'react'
import { BarChart, Tooltip, XAxis, YAxis, CartesianGrid, Legend, Bar } from 'recharts'

const BarDiagram = ({data}) =>
  <BarChart width={400} height={300} data={data} options={{}}>
    <XAxis dataKey='name' />
    <YAxis />
    <CartesianGrid strokeDasharray='6 3' />
    <Tooltip />
    <Legend />
    <Bar dataKey='pv' fill='#8884d8' />
  </BarChart>

export default BarDiagram
