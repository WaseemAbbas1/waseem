import React from 'react'
import {Route,Routes} from "react-router-dom"
import AddTodos from './AddTodos'

export default function Dashboard() {
  return (
    <Routes>
        <Route path='addtodos' element ={<AddTodos/>}/>
    </Routes>
  )
}
