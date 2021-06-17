import React,{useState,useEffect} from 'react'

const EmojiApi = () => {

    const[mail,setMail]=useState('technology')
    
    const[search,setSearch]=useState(0)
    const [collection, setCollection]=useState([])

    const hitApi= ()=>{
     fetch(`https://newsapi.org/v2/everything?q=${mail}&from=2021-05-09&sortBy=publishedAt&apiKey=6f5418b4beff4731ac7f4a3cfd11d9c5`)
       .then((response) => response.json())
      .then((data) => setCollection( data.articles));
      
       
        
    }
    useEffect(() => {
        hitApi()
        
    }, [search])

    return (
        <div>
            
            <div  className='mx-auto p-4'style={{boxShadow: '0px 2px 5px black', textAlign:'center',width:'500px'}}>
            <form method='post' onSubmit={(e)=>{e.preventDefault(); setSearch(search+1)}}>
  <div className="form-group ">
    <label for="exampleInputEmail1">Enter the TOPIC</label>
    <input type="text" name='email'className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={mail} onChange={(e)=> setMail(e.target.value)}/>
    <small id="emailHelp"  className="form-text text-muted">All articles about the ABOVE from the last month, sorted by recent first</small>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
  
  </form>
  </div>
  <div className='row'>
               {
                   collection.map((e)=>{
                       return(
                        <a href={e.url}>
                        <div className="card mx-5 mt-5 px-2" style={{width: '18rem'}}>
                        <img src={e.urlToImage} className="card-img-top" alt="img"/>
                        <p><b><u>AUTHOR: </u></b>{e.author}</p>
                        <div className="card-body">
                        <p className="card-text">{e.description}</p>
                        </div>
                        </div>
                        </a>

                       )
                   })

                   
                }
            </div>

        </div>
        
    )
}

export default EmojiApi
