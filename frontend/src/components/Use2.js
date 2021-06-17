import React , {useState, useEffect}from 'react'

const Use2 = () => {
    const [size, SetSize]=useState(window.innerWidth)
    const newSize=()=>{
        console.log(window.innerWidth)
        SetSize(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize',newSize)
        return () => {
           window.removeEventListener('resize',newSize)
        }
    },[size])

    return (
        <div className='mt-5' style={{textAlign:'center'}}>
            <h1>THE CURRENT ACTUAL WINDOW SIZE </h1>
            <h4>{size}</h4>
        </div>
    )
}

export default Use2
