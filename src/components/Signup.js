import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Signup = (props) => {

  const host = 'https://notespam.herokuapp.com';

  let navigate = useNavigate();

  const [creds, setCreds] = useState({ name: "", email: "", password: "", cpassword: "" })

  const onChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {

    if (creds.password === creds.cpassword) {
      props.setProgress(30);
      e.preventDefault();
      const { name, email, password } = creds
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });
      props.setProgress(40);
      const json = await response.json();
      props.setProgress(60);

      if (json.success) {
        //save the auth token and redirect 
        localStorage.setItem('token', json.authtoken);
        props.showAlert("success", "Account created succesfully");
        props.setProgress(100);
        navigate("/")

      } else {
        props.setProgress(100);
        setCreds({ name: creds.name, email: "", password: creds.password, cpassword: creds.cpassword });
        props.showAlert("danger", "Details badly formatted!");
      }


      // Get name of sign up user
      if (json.success) {
        const userresponse = await fetch(`${host}/api/auth/getuser`, {
          method: 'POST',
          headers: {
            "auth-token": localStorage.getItem('token'),
            "Content-Type": "application/json"
          },
        });
        let userName = await userresponse.json();
        localStorage.setItem("userName", userName.name);
      }
    }
    else {
      e.preventDefault();
      props.showAlert("danger", "Confirm password mismatch");
      setCreds({ name: creds.name, email: creds.email, password: "", cpassword: "" })
    }




  }

  return (
    <>
      <form className='mt-5' style={{ height: '78vh' }} onSubmit={handleSubmit}>
        <div className="d-flex justify-content-center">
          <h1 className='my-4 fontcss'>🔹Signup to Notespam</h1>
        </div>
        <div className="mb-3 mt-3">
          <div className="d-flex justify-content-center">
            <label htmlFor="name" className="form-label">Name</label>
          </div>
          <div className="d-flex justify-content-center">
            <i className="fa-solid fa-user fa-1x mx-2 d-flex align-items-center"></i>
            <input type="text" className="form-control css" id="name" placeholder='Enter your name' name='name' value={creds.name} onChange={onChange} />
          </div>
        </div>
        <div className="mb-3">
          <div className="d-flex justify-content-center">
            <label htmlFor="email" className="form-label">Email</label>
          </div>
          <div className="d-flex justify-content-center">
            <i className="fa-solid fa-envelope fa-1x mx-2 d-flex align-items-center"></i>
            <input type="text" className="form-control css" id="Email" placeholder='Email' name='email' value={creds.email} onChange={onChange} />
          </div>
        </div>
        <div className="mb-3">
          <div className="d-flex justify-content-center">
            <label htmlFor="Password" className="form-label">Password</label>
          </div>
          <div className="d-flex justify-content-center">
            <i className="fa-solid fa-key fa-1x mx-2 d-flex align-items-center"></i>
            <input type="password" className="form-control css" id="Password" placeholder='Password' name='password' value={creds.password} onChange={onChange} />
          </div>
        </div>
        <div className="mb-3">
          <div className="d-flex justify-content-center">
            <label htmlFor="cPassword" className="form-label">confirm Password</label>
          </div>
          <div className="d-flex justify-content-center">
            <i className="fa-solid fa-key fa-1x mx-2 d-flex align-items-center"></i>
            <input type="password" className="form-control css" id="cPassword" placeholder='Re-type Password' name='cpassword' value={creds.cpassword} onChange={onChange} />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-secondary my-3">Sign Up</button>
        </div>
      </form>
    </>
  )
}

export default Signup