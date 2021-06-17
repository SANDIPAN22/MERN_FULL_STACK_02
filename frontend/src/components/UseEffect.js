import React , {useState, useEffect} from 'react'

const UseEffect = () => {

    

        const [count,setCount]=useState(0)
        useEffect(()=>{
            if (count>0)
           { document.title=`SANDIPAN (${count})`}
            else
           { document.title='SANDIPAN'}
        },[count])
    return (
        <div>
            <h1>{count}</h1>
            <button onClick={()=> setCount(count+1)}> CLICK ME </button>
            
        </div>
    )
}

export default UseEffect
