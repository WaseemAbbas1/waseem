import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Frontend from './frontend'
import Dashboard from './dashboard'
import Auth from './auth'
import PageNot from './PageNot'
import { useAuthContext } from 'context/AuthContext'
// import PrivateRoute from './PrivateRoute'
export default function Index() {
  const {isAuth} = useAuthContext()
  console.log('isAuth', isAuth)
  return (
<Routes>
    <Route path='/*' element= {<Frontend/>}/>
    <Route path='/auth/*' element= {!isAuth ? <Auth/>: <Navigate to="/todos" />}/>
    <Route path='/dashboard/*' element= {isAuth ? <Dashboard/>: <Navigate to="/auth/" />}/>
    {/* <Route path='/dashboard/*' element= {<PrivateRoute Component = {Dashboard}/>}/> */}

    <Route path={"*"} element= {<PageNot/>}/>

</Routes>
  )
}
