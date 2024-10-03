import React, { createContext, useContext, useReducer, useEffect, useState } from 'react'
 const AuthContext = createContext()
const initialState = { isAuth: false, user: {} }
const reducer = (state, { type, payload }) => {
    switch (type) {
        case "SET-LOGGED-IN":
            return { ...state, isAuth: true, user: payload.user };
        case "SET-LOGGED-OUT":
            return initialState;
        default:
            return state; 
    }
};

export default function AuthContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [isLoading, setIsLoading] = useState(true)
const [usersArray,setUsersArray]= useState ([])
const [todosArray,setTodosArray]= useState ([])
    const localDataUser=(usersData)=>{
        localStorage.setItem('users', JSON.stringify(usersData));
        setUsersArray(usersData)
    }
    const localDataTodos = (todo)=>{

    }
  useEffect(()=>{
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsersArray(storedUsers)
    setTimeout(()=>{
            setIsLoading(false)
        },2000)
  },[])
    return (
        <AuthContext.Provider value={{ ...state, dispatch, isLoading,usersArray, localDataUser,localDataTodos}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuthContext = () => useContext(AuthContext)