import React, { useState, useContext, useEffect } from 'react';
import homeImage from '../Images/aircraft.jpg'
import App from '../App';
import { BrowserRouter as Router, Switch, Route, Link , Redirect} from 'react-router-dom';
import  RahgeCircle  from '../layout/RangeCircleMain'
import { userContext } from './context';

export default function Home() 
{
  const [user_name, setuser_name] = useState("");
  const [Password, setPassword] = useState("");
  const [Userdetails, setsubmit] = useState(0);
  const {dispatch,user } = useContext(userContext)

useEffect(() => {
  if(Userdetails!="0")
  {
  if(Userdetails.Userdetails!="1")
  dispatch({type:'login',user:Userdetails})
  }
}, [Userdetails])

function validateForm() {
  return user_name.length > 0 && Password.length > 0;
}

function onSubmitEvent(e){
 // const {dispatch, user } = this.context
    e.preventDefault()//to avoid rerender the page
    var newdata={
      user_name: user_name,
      Password: Password
      }
      //Fetch is a promise-based API which returns a response object. So, we make use of the json() method to get the response object which is stored in data and used to update the state of users in our application
    fetch('/users/login', {//Call the API of Node[user]
        method: 'POST',
        body: JSON.stringify(newdata),
        headers: {
            'Content-Type': 'application/json'
        }
      }).then(res => res.json())
       .then(Userdetails => setsubmit({Userdetails}))
      //.then(submit =>dispatch({type:'login',user:submit}))    
        e.target.reset();
}

if (user[0]!== 0) {
    
  let obj = user;
  let keys = Object.keys(obj);
  let lat = obj[keys[0]].Userdetails;
        return (
          <Router>
            <Switch>
             <Route path="/rangeCircle" component={App} />
              <Redirect to="/rangeCircle" />
            </Switch>
          </Router>
        )
      }
      else {
return (
<div className="row">
  <div className="col-lg-4 col-xl-4 col-md-4"  >
  <img style={{width:"105%",height:"90%"}} src={homeImage}></img>
  </div>
  <div className="col-lg-8 col-xl-8 col-md-8">
 

<div>
    
    <form onSubmit={onSubmitEvent}>
    <div className="form-group  col-xl-6 col-md-6 col-lg-6 col-sm-12">
    <h3 align="center">Sign in</h3> </div>
        <div className="form-group  col-xl-6 col-md-6 col-lg-6 col-sm-12">
        <label>User Name:  </label>
            <input 
            id="user_name"
              type="text" 
              className="form-control" 
              onChange={e => setuser_name(e.target.value)}
              />
        </div>
        <div className="form-group  col-xl-6 col-md-6 col-lg-6 col-sm-12">
            <label>Password: </label>
            <input type="Password" 
              className="form-control"
              onChange={e => setPassword(e.target.value)}
              id="Password"
              />
        </div>
       <div className="form-group  col-xl-6 col-md-6 col-lg-6 col-sm-12">
            <input type="submit" 
              value="Sign in" 
              disabled={!validateForm()}
              className="btn btn-primary"/>
        </div>
    </form>
</div>
<div> 
  {/* <Link to={'/signUp'} className="nav-link">SignUp</Link> */}
        
</div>

  </div>
</div>
      
 )}
 }
   //}

