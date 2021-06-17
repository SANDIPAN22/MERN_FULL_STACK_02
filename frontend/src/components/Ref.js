import React,{useRef} from 'react'
// import { BsFillBrightnessHighFill } from "react-icons/bs";
const Ref = () => {
    const box1 = useRef(null)
    return (
        <div>
           
            <form className="form-inline" onSubmit={(e)=>{ e.preventDefault(); console.log(box1.current.value);}}>
  <div className="form-group mb-2">
        
    <input type="text" readonly className="form-control-plaintext" id="staticEmail2" placeholder='WHAT IS YOUR NAME? '/>
  </div>
  <div className="form-group mx-sm-3 mb-2">
    <label htmlFor="inputPassword2" className="sr-only">ANSWER</label>
    <input type="text" className="form-control" id="inputPassword2" ref={box1} />
  </div>
  <button type="submit" className="btn btn-primary mb-2">Confirm identity</button>
</form>
            
        </div>
    )
}

export default Ref
