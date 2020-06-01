import React,{Component} from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import rangeCircleMain from '../RangeCircleMain'
import SignUP from '../../components/signUp';
import Home from '../../components/Home';
import Button from '@material-ui/core/Button';
import homeimg from '../../Images/genpact.jpg'
import { userContext } from '../../components/context';
class Navbar extends Component {
  static contextType = userContext;
    render() {
      const {dispatch, user } = this.context
      function handlechange(event) {
        
        event.preventDefault();
            dispatch({type:'logout',user:""})
      }
      return (
        <Router>
          <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
             <img style={{height:"60px",width:"100px"}} src={homeimg}></img>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  {/* <li className="nav-item">
                    <Link to={'/'} className="nav-link">LogIn</Link>
                  </li> */}
                  <li className="nav-item">
                    <Link to={'/rangeCircle'} className="nav-link">RangeCircleMain</Link>
                  </li>
                  {/* <li className="nav-item">
                    <Link to={'/signUp'} className="nav-link">SignUp</Link>
                  </li> */}
                  <li className="nav-item" style={{paddingLeft:"700px"}}>
                  <Link  href="/signin/" onClick={handlechange} variant="body2" className="btn btn-primary">
                {"Logout"}
              </Link>
                  </li>
                </ul>
              </div>
            </nav> <br />
            <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/rangeCircle' component={rangeCircleMain} />
              <Route exact path='/signUp' component={SignUP} />
                          
            </Switch>
          </div>
        </Router>
      );
    }
  }
  export default Navbar