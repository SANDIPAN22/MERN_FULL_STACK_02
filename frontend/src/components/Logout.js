import React, {useEffect, useContext} from 'react'
import {userContext} from '../App'
import {useHistory} from 'react-router-dom'
const Logout = () => {

    const {state, dispatch}=useContext(userContext)
    const history=useHistory()
    useEffect(()=>{
        fetch('/logout',{
            method:'GET',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            credentials:'include'

        })
        .then((res)=>{
            if (res.status==200)
            {
                dispatch({type:'user', payload:false})
                history.push('/login')
            }
            else
            {console.log('Some error occured while loogin out you !')}


        })
    },[])

    return (
        <div>
            <h2> YOU ARE NOT EVEN LOGGED IN. HOW THE HELL WILL WE LOG OUT YOU?? <br/> r u a jerk?? !</h2>
        </div>
    )
}

export default Logout
