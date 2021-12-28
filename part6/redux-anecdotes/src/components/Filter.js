import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const style = {
    marginBottom: 10,
  }
  return (
    <div style={style}>
      filter
      <input name="filter" onChange={(e) => props.setFilter(e.target.value)} />
    </div>
  )
}

const ConnectedFilter = connect(null, { setFilter })(Filter)
export default ConnectedFilter
