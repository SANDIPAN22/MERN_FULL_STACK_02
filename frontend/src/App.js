import React, {createContext, useReducer, useEffect} from 'react'
import './App.css';
import {Route, Switch} from "react-router-dom"
import Nav from './components/Nav'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import About from './components/About'
import Error from './components/Errorpage'
import UseEffect from './components/UseEffect'
import Us2 from './components/Use2'
import Emoji from './components/EmojiApi'
import Ref from './components/Ref'
import Reduce from './components/Reduce'
import Todo from './components/Todo'
import Logout from './components/Logout'

export const userContext=createContext()
const initialState=localStorage.getItem('login')

const reducer=(state,action)=>{
  console.log('reedduucerrrrrrS')
  if (action.type==='user')
  { 
    console.log('reduce function called!')
   
    return action.payload
  }
    
  return state
}




function App() {

  const [state, dispatch] = useReducer(reducer, initialState )
  
  useEffect(() => {
    localStorage.setItem('login',state)
    
  }, [state])


  return (

    <div >
       <userContext.Provider value={{state, dispatch}}>

      <Nav/>
     
<Switch>
      <Route exact path="/home">
      <Home/>
      </Route>

      <Route exact path="/about">
      <About/>
      </Route>

      <Route exact path="/login">
      <Login/>
      </Route>

      <Route exact path="/signup">
      <Signup/>
      </Route>

      <Route exact path="/us">
      <UseEffect/>
      </Route>

      <Route exact path="/us2">
      <Us2/>
      </Route>

      <Route exact path="/emoji">
      <Emoji/>
      </Route>

      <Route exact path="/ref">
      <Ref/>
      </Route>

      <Route exact path="/reduce">
      <Reduce/>
      </Route>
      
      <Route exact path="/todo">
      <Todo/>
      </Route>

      <Route exact path='/logout'>
        <Logout/>
        </Route>

      <Route >
        <Error/>
        </Route>
    </Switch>

    </userContext.Provider>

    </div>
  );
}

export default App;
