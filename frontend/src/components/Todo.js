import React,{useState, useEffect} from 'react'
import './todo.css'
import UseEffect from './UseEffect'
const Todo = () => {
    const [input, setInput] = useState('')
    const[collection, setCollection]=useState(JSON.parse( localStorage.getItem('lists'))===null?[]:JSON.parse( localStorage.getItem('lists')))
    const [editid, setEditid] = useState('')
    const addItem=()=>{
        if(input && editid){
            collection.map((c)=>{
                if(c.id===editid)
                {
                    c.task=input
                }
            })

            setCollection(collection)
            setEditid('')
            setInput('')
        }
        else if(input)
        {
            var totalInput={id: new Date().getTime().toString(), task:input}
            setCollection([...collection,totalInput])
            setInput('')
            
        }
    }

    useEffect(() => {
        localStorage.setItem('lists',JSON.stringify(collection))
        
    }, [collection])

    const allDone=()=>{
        setCollection([])
    }
    const done=(id)=>{
      const newCollection= collection.filter((c)=>{ 
            return c.id!== id
        })
        setCollection(newCollection)
    }
    const edit=(e)=>{
        const data=collection.find((c)=>{
            return c.id==e

        })
        setInput(data.task)
        setEditid(data.id)

    }
    return (
        <div>
                <div class="parent">
                    <div class="child">
                        <h2 className='heading'> TODO List 🧿 </h2> <hr/>

                        <input className='inputbox'type='text' placeholder='NEW JOB 📝' value={input} onChange={(e)=> setInput(e.target.value)}/> 
                        {
                            editid? <button title='edit' onClick={addItem}>   ✍  </button>:<button title='add new job' onClick={addItem}> ➕ </button>
                        } 
                         <br/>
                         <br/>
                        {
                            collection.map((c)=>{return(

                                <div class="alert alert-danger displaybox" role="alert" key={c.id}>
                                
                                {c.task}
                                <span className='inlineButtons'>
                                <button title='edit' onClick={()=>edit(c.id)}>   ✍  </button>
                                <button title='done' onClick={()=>done(c.id)}> ✔ </button>
                                </span>
                            </div>



                            )})
                               
                            }
                        <button onClick={allDone}>ALL DONE</button>


                    </div>
                </div>
                        
        </div>
    )
}

export default Todo
