import { useAuthContext } from 'context/AuthContext'
import React from 'react'
import { Navigate } from 'react-router-dom'

export default function PrivateRoute({Compoent}) {
const {isAuth} = useAuthContext()
   
if(!isAuth){
<Navigate to="/auth/"/>
}
return (
    <Compoent/>
  )
}
