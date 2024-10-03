import React,{useState} from 'react'
import { Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import { alertMessage } from 'utils/alertUtils'
import { useAuthContext } from 'context/AuthContext'
const initialState = {email :"",oldpassword :"",changepassword :"",confirmpassword:""}
export default function ChangePassword() {
  const [state ,setState] = useState(initialState)
  const {usersArray,localDataUser,dispatch} = useAuthContext()
  const {email,oldpassword,changepassword,confirmpassword} = state 
   const navigate = useNavigate()
    const handleChange=(e)=>{
setState ({...state,[e.target.name]: e.target.value})
   } 
    const handleSubmit=(e)=>{
        e.preventDefault();
        if (!email.trim().length) {
          alertMessage("error","Enter your Email");
          return;
        }
        const user = usersArray.find((user)=>user.email === email)
        if(!user){
          alertMessage("error","Email not found enter email correctly")
          return
        }
        if(!oldpassword.trim().length){
          alertMessage("error","Enter Old password ") 
          return
        }
      
        if(user.password !== oldpassword){
          alertMessage("error","Old password is Not correct")  
        return
        }
        if(!changepassword.trim().length){
          alertMessage("error","Enter New password ") 
          return
        }
          if(changepassword.length < 8){
          alertMessage("error","New Password  must be at least 8 characters")
          return
          
        }
        if(!confirmpassword.trim().length){
          alertMessage("error","Enter Confirm password ") 
          return
        }
        if(confirmpassword.length < 8){
          alertMessage("error"," Confirm Password must be at least 8 characters")
          return
          
        }
        if(changepassword !== confirmpassword){
          alertMessage("error","Confirm password is not match with new password")
          return
        }

        const checkIndex =usersArray.findIndex((user)=>user.email=== email)
        const updatedUsers = [...usersArray]
        updatedUsers[checkIndex] = {...updatedUsers[checkIndex],password:changepassword}
        console.log(updatedUsers)
        localDataUser(updatedUsers)
        alertMessage("success","password changed successfully")
        setState(initialState)
        navigate("/auth/")
        dispatch("SET-LOGGED-OUT")
      }
    return (
        <main >
        <div className="container d-flex justify-content-center align-items-center vh-100">
          <div className="card" style={{ width: "100%", maxWidth: "550px" }}>
            <div className="card-body py-3">
              <div className="card-title text-center mb-3">
                <h2>Change Password</h2>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                  <label htmlFor="inputField3">Email</label>
                  <Input
                    type="email"
                    id="inputField3"
                    placeholder="Enter Your Email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                  ></Input>
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="inputField4">Old Password</label>
                  <Input.Password 
                  type='password'
                    placeholder="Enter Your old Password"
                   id="inputField4"
                   value={oldpassword}
                   name="oldpassword"                       
                   onChange={handleChange}
                  ></Input.Password>
                </div>
                <div className="row mb-2">
                  <div className="col-12 col-md-6">
                    <label htmlFor="inputField1">New Password</label>
                    <Input.Password
                      type="password"
                      value={changepassword}
                      id="inputField1"
                      placeholder="Enter Your New Password"
                      name="changepassword"
                      onChange={handleChange}
                    ></Input.Password>
                  </div>
                  <div className="col-12 col-md-6">
                    <label htmlFor="inputField2">Confirm Password</label>
                    <Input.Password
                      type="password"
                      id="inputField2"
                      value={confirmpassword}
                      placeholder="confirm New Password"
                      name="confirmpassword"
                      onChange={handleChange}
                    ></Input.Password>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6 offset-md-3 mt-2">
                    <button type="submit" className="btn btn-dark btn-outline-light w-100">
                      Submit Change
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    )
}
