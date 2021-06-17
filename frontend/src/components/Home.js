import React ,{useState, useEffect}from 'react'

const Home = () => {

    const [data, setData] = useState({})
    const getDataCall= async ()=>{
      try{
      const res= await fetch('/getData',{
        method:'GET'
      })
      const res_json=await res.json()
      setData(res_json)
    }
    catch(error)
    {
      console.log(`some error occured while fetching the data =>${error}`)
    }
    
    }

    useEffect(() => {
      getDataCall()
      
    }, [])

    return (

        <div>
            <div className="jumbotron jumbotron-fluid">
  <div className="container">
      <h4 className="display-8"> Welcome,</h4>
    <h1 className="display-4"> {data.name?data.name:'ANNONYMOUS USER'}</h1>
    <p className="lead">Let's <span style={{color:'red'}}>DIS</span>cover something new together!</p>
  </div>
</div>
        </div>
    )
}

export default Home
