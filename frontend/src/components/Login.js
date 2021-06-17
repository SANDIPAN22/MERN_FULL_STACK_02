import React, {useState,useEffect, useContext} from 'react'
import {userContext} from '../App'
import {useHistory} from 'react-router-dom'
const Login = () => {

    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [collection, setCollection] = useState([])
    const [error, setError]= useState()
    const history=useHistory()
    const {state,dispatch} = useContext(userContext)

    const loginPushData= async ()=>{
        if (collection.length>0){
        const { email , password}=collection[collection.length-1]
        const res= await fetch('/login',{
            method:'POST',
            
             credentials: 'include',
            headers:{
                 Accept:"application/json",
                "Content-Type":"application/json"
            },
           
            
            body: JSON.stringify({email,password})
        })

        const data= await res.json()
        console.log(data.status)
        console.log(res)
        if ( res.status==400 )
        {
            console.log(data)
            setError(data)
        }
        else if(res.status==401)
        {
            setError(data)
            setMail('')
            setPassword('')
        }
        else{
            dispatch({type:'user', payload:true})
            alert("logged  in successfully :) ")
            history.push('/home')

        }
       
        }
    }

    useEffect(() => {
        loginPushData()
        
    }, [collection])

    const submit = (e)=> {

        e.preventDefault()
        if (mail && password)
        {
        var data={email: mail, password: password}
        setCollection([...collection,data])
        
        }else
        alert("FILL ALL THE FIELDS !")

    }

    return (
        <>
        <div className='row'>
        <div className=' col-md-6 mx-auto mt-5' style={{boxShadow: '0px 2px 5px black'}}>
            <form method='post' onSubmit={submit}>
  <div className="form-group ">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" name='email'className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={mail} onChange={(e)=> setMail(e.target.value)}/>
    <small id="emailHelp"  className="form-text text-muted">We'll never share your email with anyone else.</small>
 
    { error?error.email?<div className="alert alert-warning" role="alert" style={{boxShadow: '0px 2px 8px green'}}>
                            {JSON.stringify(error.email.msg)}
                    </div>
                    :
                    <div/>:<div/>
    

}
  </div>
  <div className="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" name='password' className="form-control" id="exampleInputPassword1" value={password} value={password} onChange={(e)=> setPassword(e.target.value)}/>
  </div>
  {
    console.log(error)}
   { error?error.password?<div className="alert alert-warning" role="alert" style={{boxShadow: '0px 2px 8px green'}}>
                            {JSON.stringify(error.password.msg)}
                    </div>
                    :
                    <div/>:<div/>
    

}
 
  <button type="submit" className="btn btn-primary">Submit</button>
  
</form>

</div>
        </div>
        
        
            { 
            
            error?error.error?<div className="alert alert-danger" role="alert" style={{boxShadow: '0px 2px 8px green'}}>
            {JSON.stringify(error.error)}
                </div>
                :
                <div/>:<div/>


        }

      
        </>
    )
}

export default Login
