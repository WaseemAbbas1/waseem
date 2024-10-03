import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from 'antd'
import { useAuthContext } from 'context/AuthContext'
import { alertMessage } from 'utils/alertUtils'
const initialValue = {email : "", password :""}
export default function Login() {
  const navigate = useNavigate()
  const {usersArray,dispatch} = useAuthContext()
  const [state ,setState ] = useState(initialValue)
  const {email,password} = state
  const handleChange = (e)=>{
setState((s)=>{return{...s, [e.target.name]: e.target.value}}) 
}
const handleSubmit = (e) => {
  e.preventDefault();

  if (!email.trim()) {
    alertMessage("error", "Enter your email");
    return;
  }

  const user = usersArray.find(user => user.email === email);

  if (!user) {
    alertMessage("error", "Your email is not registered. Register first.");
    return;
  }

  if (!password.trim()) {
    alertMessage("error", "Please enter your password");
    return;
  }if(user.password!== password){
    alertMessage("error","Your password is not Correct retry for login")
    return
  }
  dispatch({ type: "SET-LOGGED-IN", payload: { user } });
  alertMessage("success","Login successfully")
  setState(initialValue)
  navigate("/dashboard/addtodos")
};
  
  return (
     <main className='login' >
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card" style={{ width: "100%", maxWidth: "450px" }}>
          <div className="card-body py-3">
            <div className="card-title text-center mb-3">
              <h2>Login</h2>
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
                <label htmlFor="inputField4">Password</label>
                <Input.Password 
                type='password'
                  placeholder="Enter Your Password"
                 id="inputField4"
                 name="password"
                 value={password}                       
                 onChange={handleChange}
                ></Input.Password>
              </div>
              <div className="row">
                <div className="col-12 col-md-6 offset-md-3 mt-2">
                  <button type="submit" className="btn login text-white w-100">
                    Login
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
