import React,{useState} from "react";
import { Input } from "antd";
import { Typography } from "antd";
import { alertMessage } from "utils/alertUtils";
import { useAuthContext } from "context/AuthContext";
const {Title} = Typography
const {TextArea}= Input
const initialState = {title :"", location :"",description:""}
export default function AddTodos() {
  const [todo,setTodo] = useState(initialState)
  const  {title,location,description} = todo
  const {user,localDataTodos} = useAuthContext()
  const {uid}= user
  const handleChange=(e)=>{
setTodo({...todo,[e.target.name]:e.target.value})
}
const validate = () => {
  let isValid = true;

  if (!title.trim().length) {
    alertMessage("error","Please enter your Title.");
    isValid = false;
    return isValid;
  }else  if (title.trim().length< 3) {
    alertMessage("error","Title must be at least 3 characters.");
    isValid = false;
    return isValid;
  }
  if (!location) {
    alertMessage("error","Please enter your Location.");
    isValid = false;
    return isValid; 
  } 
  if (!description) {
    alertMessage("error","Please enter your description.");
    isValid = false;
    return isValid; 
  } else if (description.length < 8) {
    alertMessage("error","Descrition must be at least 8 characters.");
    isValid = false;
    return isValid; 
  }
  return isValid;
};
  const handleSubmit =(e)=>{
    e.preventDefault()
    console.log('uid', uid)
  // if(validate()){
  //   const uid = Math.random().toString(36).slice(2)
  //   const dateCreated = new Date()
  //   const getTodo ={...todo,uid,dateCreated}
  //   const storedTodos = JSON.parse(localStorage.getItem()) || [];
  //   const updatedTodos = [...storedTodos,getTodo]
  //   localDataTodos(updatedTodos,uid)
  // }

}
  return (
    <>
      <main >
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card" style={{ width: "100%", maxWidth: "550px" }}>
          <div className="card-body py-3">
            <div className="card-title text-center mb-3">
              <Title level={2}>Add Todo</Title>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="row mb-2">
                <div className="col">
              <label htmlFor="inputField2">Title</label>
                <Input type="text"
                id="inputField2"
                placeholder="Enter You Title "
                name="title"
                onChange={handleChange}
                ></Input>
                </div>
              </div>
              <div className="form-group mb-2">
                <label htmlFor="inputField3">Location</label>
                <Input
                  type="text"
                  id="inputField3"
                  placeholder="Enter Your Location"
                  name="location"
                  onChange={handleChange}
                ></Input>
              </div>
              <div className="form-group mb-2">
                <label htmlFor="inputField4">Description</label>
                <TextArea
                style={{resize :"none" }}
                rows={8}
                  placeholder="Enter Your Description"
                 id="inputField4"
                 name="description"                       
                 onChange={handleChange}
                 variant="filled"
                 status="warning"
                ></TextArea>
              </div>
              <div className="row">
                <div className="col-12 col-md-6 offset-md-3 mt-2">
                  <button type="submit" className="btn btn-dark btn-outline-light w-100">
                    Add Todo
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}