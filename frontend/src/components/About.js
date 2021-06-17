import React, {useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'

const About = () => {

 
  const [user, setUser] = useState({})
  const histroy=useHistory()
  
  const aboutBackend= async ()=>{
    try{
     const userDetails= await fetch('/getData',{
       method: 'GET'
     }
     ) 

     const data=await userDetails.json()

     console.log(userDetails.status)
     if (userDetails.status==200)
     {
      setUser(data)
     }
     else{
      histroy.push('/login')
     }
    }
    catch(err)
    {
      console.log("some errror is happening!")
    }
      
     

  }
    useEffect(() => {
      
      aboutBackend()
     
    }, [])

    return (
        <div className='row'>
        <div className='col-md-6 mx-auto mt-5' style={{boxShadow:'0px 2px 5px black'}}>
            <div className="card text-center">
  <div className="card-header">
  
   
      </div>
  <div className="card-body">
    <h5 className="card-title">NAME:{user.name} </h5>
    <p className="card-text"></p>
    <a href="" className="btn btn-primary">Call:{user.phone} </a>
  </div>
  <div className="card-footer text-muted">
   {user.email}
  </div>
</div>
        </div>
        </div>

)
}

export default About
