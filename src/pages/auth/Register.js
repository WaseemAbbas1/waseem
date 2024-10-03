import React,{useState} from "react";
import { useNavigate } from 'react-router-dom';
import { Input } from "antd";
import { useAuthContext } from "context/AuthContext";
import { alertMessage } from "utils/alertUtils";
const initialValue = {firstName:"",lastName:"",email:"",password:""}
export default function Register() {
  const navigate = useNavigate();
  const {usersArray,localDataUser} = useAuthContext()
  const [formData,setFormData] = useState(initialValue)
  const {firstName,password,email,lastName} = formData
  const handleChange=(e)=>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const validate = () => {
    let isValid = true;
  
    if (firstName.trim().length < 3) {
      alertMessage("error","Please enter your First Name.");
      isValid = false;
      return isValid;
    }
  
    if (!email) {
      alertMessage("error","Please enter your Email.");
      isValid = false;
      return isValid; 
    } else if (!emailRegex.test(email)) {
      alertMessage("error","The provided email is not correct.");
      isValid = false;
      return isValid; 
    }
  
    if (!password) {
      alertMessage("error","Please enter your password.");
      isValid = false;
      return isValid; 
    } else if (password.length < 8) {
      alertMessage("error","Password must be at least 8 characters.");
      isValid = false;
      return isValid; 
    }
  
    return isValid;
  };
  const handleSubmit = (e)=>{
    e.preventDefault()
    if(validate()){
   const userExist = usersArray.find((user)=>user.email === email)
   if(userExist){
    alertMessage("error","A user with this email already exists.");
   } else{
    const uid = Math.random().toString(36).slice(2)
    const dateCreated = new Date()
    const user ={
      ...formData,uid,dateCreated,status:"active",fullName :firstName +" "+ lastName
    } 
    const updatedUsers = [...usersArray, user];
    localDataUser(updatedUsers);
    alertMessage("success","Registration successful!");
    setFormData(initialValue)
     navigate("/auth/")
   }   
  }
}
  return (
    <main >
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card" style={{ width: "100%", maxWidth: "550px" }}>
          <div className="card-body py-3">
            <div className="card-title text-center mb-3">
              <h2>Register</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="row mb-2">
                <div className="col-12 col-md-6">
                  <label htmlFor="inputField1">First Name</label>
                  <Input
                    type="text"
                    id="inputField1"
                    placeholder="Enter your First Name"
                    name="firstName"
                    value={firstName}
                    onChange={handleChange}
                  ></Input>
                </div>
                <div className="col-12 col-md-6">
                  <label htmlFor="inputField2">Last Name</label>
                  <Input
                    type="text"
                    id="inputField2"
                    placeholder="Enter your Last Name"
                    name="lastName"
                    value={lastName}
                    onChange={handleChange}
                  ></Input>
                </div>
              </div>
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
                <label htmlFor="inputField4">Password</label>
                <Input.Password 
                type="password"
                  placeholder="Enter Your Password"
                 id="inputField4"
                 name="password"                       
                 onChange={handleChange}
                 value={password}
                ></Input.Password>
              </div>
              <div className="row">
                <div className="col-12 col-md-6 offset-md-3 mt-2">
                  <button type="submit" className="btn btn-dark btn-outline-light w-100">
                    Register
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

