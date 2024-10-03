import React,{useState} from 'react'
import { Input } from 'antd'
import { useAuthContext } from 'context/AuthContext'
import { alertMessage } from 'utils/alertUtils'
export default function ForgetPassword() {
  const {usersArray}= useAuthContext()
  const [email,setEmail] = useState("")
  const [message,setMessage] = useState("")
 const handleChange = (e)=>{
setEmail(e.target.value)
 } 
  const handleSubmit = (e) => {
    setEmail("")
    e.preventDefault();
    if (!email.trim()) {
      alertMessage("error", "Enter your email");
      setMessage("")
      return;
    }   
    const user = usersArray.find(user => user.email === email);
    if (user) {
      setMessage(user.password);
      setEmail("")
    } else {
      alertMessage("error",'Email not found.');
      setMessage("")
    }
    
  }
  return (
    <main  >
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card" style={{ width: "100%", maxWidth: "450px" }}>
        <div className="card-body py-3">
          <div className="card-title text-center mb-3">
            <h2>Forget Password</h2>
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
           
            <div className="row">
              <div className="col-12 col-md-6 offset-md-3 mt-2">
                <button type="submit" className="btn btn-dark btn-outline-light w-100">
                  Get Password
                </button>
              </div>
            </div>
          </form>
          {message && (
              <div className="mt-3 text-center">
                <p>Your password is: <b>{message}</b></p>
              </div>
            )}
        </div>
      </div>
    </div>
  </main>

  )
}
