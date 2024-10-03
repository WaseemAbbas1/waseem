import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './Home'
import Users from './Users'
import Todos from './Todos'

export default function Frontend() {
  return (
    <Routes>
        <Route index element={<Home/>}/>
        <Route path='users' element={<Users/>}/>
        <Route path='todos' element={<Todos/>}/>
    </Routes>
  )
}
