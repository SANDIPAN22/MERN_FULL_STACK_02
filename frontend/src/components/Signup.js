import React from 'react'

const Signup = () => {
    return (
        <div className='row'>
        {/* <div className='col-md-4' />      */}
        <div className='col-md-6 mx-auto mt-5' style={{boxShadow:'0px 2px 5px black'}}>
            <form method='POST'>
  <div className="form-row" >
    <div className="form-group " >
      <label for="inputEmail4">Email</label>
      <input type="email" name='email' className="form-control" id="inputEmail4"/>
    </div>
    <div className="form-group col-md-6">
      <label for="inputPassword4">Password</label>
      <input type="password" name='password' className="form-control" id="inputPassword4"/>
    </div>
  </div>
  <div className="form-group">
    <label for="inputAddress">Name</label>
    <input type="text" className="form-control"  name='name' id="inputAddress" placeholder="Enter Your name"/>
  </div>
  <div className="form-group">
    <label for="inputAddress2">Phone Number</label>
    <input type="tel" className="form-control" name='phone' id="inputAddress2" placeholder="Enter Your Contact Number"/>
  </div>
 
  <button type="submit" className="btn btn-primary">Sign UP</button>
</form>
        </div>
        </div>
    )
}

export default Signup
