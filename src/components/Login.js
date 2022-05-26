import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {



  const host = 'https://notespam.herokuapp.com';


  let navigate = useNavigate();

  const [creds, setCreds] = useState({ email: "", password: "" })

  const handleSubmit = async (e) => {
    props.setProgress(30);
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(creds)

    });
    props.setProgress(40);

    const json = await response.json();

    props.setProgress(60);
    
    if (json.success) {
      //save the auth token and redirect 
      localStorage.setItem('token', json.authtoken)
      props.showAlert("success", "Logged in successfully")
      props.setProgress(100);
      navigate("/")
    }
    else {
      props.setProgress(100);
      props.showAlert("danger", "Invalid details, try again!")
    }


    //Get name of logged in user
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

  const onChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value })
  }

  const loginFun = () => {
    navigate('/signup');
  }


  return (
    <>
      <form className='mt-5' style={{ height: '78vh' }} onSubmit={handleSubmit}>
        <div className="d-flex justify-content-center">
          <h1 className='mt-5 fontcss'>🔹Login to Notespam</h1>
        </div>
        <div className="d-flex justify-content-center">

          <p className='mb-4'>Don't have an account? <button  style={{ cursor: 'pointer',border:'none',background:'none',textDecoration:'underline',color:'#0074ba',fontWeight:'bold' }} onClick={loginFun}>Signup</button></p>
        </div>
        <div className="mb-3 mt-3">
          <div className="d-flex justify-content-center">
            <label htmlFor="inputEmail3" className="form-label cssl">Email</label>
          </div>
          <div className="d-flex justify-content-center">
            <i className="fa-solid fa-user fa-1x mx-2 d-flex align-items-center"></i>
            <input type="email" className="form-control css" id="inputEmail3" placeholder='Email' name='email' value={creds.email} onChange={onChange} />
          </div>
        </div>
        <div className="mb-3">
          <div className="d-flex justify-content-center">
            <label htmlFor="inputPassword3" className="form-label cssl">Password</label>
          </div>
          <div className="d-flex justify-content-center">
            <i className="fa-solid fa-key fa-1x mx-2 d-flex align-items-center"></i>
            <input type="password" className="form-control css" id="inputPassword3" placeholder='Password' name='password' value={creds.password} onChange={onChange} />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-secondary my-3">Login</button>
        </div>
      </form>
    </>
  )
}


export default Login