import React, {useReducer} from 'react'

const Reduce = () => {

    const reducer =(state,action)=>{
        if (action.type==='inc')
            return state+1
        else if (action.type==='dec')
            return state-1

    }
    const [state, dispatch] = useReducer(reducer, 0)

    return (
        <div className="mx-auto mt-5">
            <h1>{state}</h1>
                <div className="btn-group btn-group-lg" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-secondary" onClick={()=>dispatch({type:'inc'})}>INCREMENT</button>
                    <button type="button" className="btn btn-secondary" onClick={()=>dispatch({type:'dec'})}>DECREMENT</button>
 
                </div>
        </div>
    )
}

export default Reduce
