import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

    const [credentials,setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
    let navigate = useNavigate();

    const handleSubmit =async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
              
            },
            body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password}),
          });
          const json =  await response.json();
          console.log(json);
          if(json.success){
            //save the authtoken and redirect
            localStorage.setItem('token',json.authtoken);
            navigate("/")
            props.ShowAlert("Account Created Successfully","success")

          }
          else{props.ShowAlert("Invalid Credentials","danger")}
    }



    const onChange=(e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div className='container mt-2'>
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
      <div className="my-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Name</label>
            <input type="text" className="form-control" onChange={onChange} id="name" name="name" value={credentials.name}/>
        </div>
        <div className="my-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">Signup with your valid email.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" onChange={onChange} id="password" name="password" value={credentials.password} minLength={5} required/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" onChange={onChange} id="cpassword" name="cpassword" value={credentials.cpassword} minLength={5} required/>
        </div>
        <button type="submit"  className="btn btn-primary">Submit</button>
     </form>
    </div>
  )
}

export default Signup
