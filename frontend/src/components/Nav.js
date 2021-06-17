import React,{useContext} from 'react'
import {userContext} from '../App'
import {NavLink} from 'react-router-dom'
const Nav = () => {
   const {state, dispatch}=useContext(userContext)
   console.log(`current state==> ${state}`)
   if (state===true || state==='true'){
    return (

        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <a className="navbar-brand" href="#"><span style={{color:'red'}}>DIS</span>COVER</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ml-auto">
      <li className="nav-item active">
        <NavLink className="nav-link" to="/home">Home <span className="sr-only">(current)</span></NavLink>
      </li>
      <li className="nav-item active">
        <NavLink className="nav-link" to="/about">About</NavLink>
      </li>

 
      <li className="nav-item active">
        <NavLink className="nav-link" to="/logout"><span style={{color:'red'}}>Logout</span></NavLink>
      </li>

     
      
    </ul>
   
  </div>
</nav>
        </div>
    )
    }
   else{
     return (

      <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
<a className="navbar-brand" href="#"><span style={{color:'red'}}>DIS</span>COVER</a>
<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
<span className="navbar-toggler-icon"></span>
</button>

<div className="collapse navbar-collapse" id="navbarSupportedContent">
<ul className="navbar-nav ml-auto">
<li className="nav-item active">
  <NavLink className="nav-link" to="/home">Home <span className="sr-only">(current)</span></NavLink>
</li>
<li className="nav-item active">
  <NavLink className="nav-link" to="/about">About</NavLink>
</li>

<li className="nav-item active">
  <NavLink className="nav-link" to="/login">Login</NavLink>
</li>

<li className="nav-item active">
  <NavLink className="nav-link" to="/Signup">Signup</NavLink>
</li>


</ul>

</div>
</nav>
  </div>
       
     )
   }
}

export default Nav
