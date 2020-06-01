import React, { useState, useContext, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { userContext } from './context'
import homeImage from '../Images/aircraft.jpg'
import AdminLayout from '../App'
import SignupPage from "./signUp";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      
        Your Website
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [user_name, setuser_name] = useState("");
  const [Password, setPassword] = useState("");
  const [Userdetails, setuserdetails] = useState(0);
  const [status, setstatus] = useState("");
  const [signup, setsignup] = useState(false);
  const {dispatch,user } = useContext(userContext)
  const [msg , setmsg]=useState("");
  useEffect(() => {
    if(Userdetails!="0")
    {
    if(Userdetails.Userdetails!="1")
    dispatch({type:'login',user:Userdetails})
    }
    if(Userdetails.Userdetails=="1")
    {
     setstatus("Invalid Login Id Or Password")
     setmsg("alert alert-danger")
    }
  }, [Userdetails])


  function validateForm() {
    return user_name.length > 0 && Password.length > 0;
  }
  function handleevent(event) {
    event.preventDefault();
    setsignup(true)
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newUser = {
      user_name: user_name,
      Password: Password
    }

    fetch('/users/login', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(Userdetails => setuserdetails({ Userdetails }))
      .catch(error => console.error('Error:', error))
      //.then(setstatus("Invalid Login Id Or Password"))
      
  }
  console.log(user.length)
  if (signup === true) {
    return (
      <Router>
        <Switch>
         <Route path="/SignupPage" component={SignupPage} />
          <Redirect to="/SignupPage" />
        </Switch>
      </Router>
    )
  }
  
  else if (user.length !== 0) {
    
    let obj = user;
    let keys = Object.keys(obj);
    let lat = obj[keys[0]].Userdetails;
    
    //if (String(lat.UserAdmin) === 'N') {
    // setmenuroute (route.filter(function (entry) { return entry.display === "user" || entry.display === "both" }))
    return (
      <Router>
        <Switch>
        <Route path="/rangeCircle" component={AdminLayout} />
          {/* <Route path="/admin" render={props => (<AdminLayout {...props} menuroute={lat.UserAdmin} />)} /> */}
          <Redirect to="/rangeCircle" />
        </Switch>
      </Router>
    )

    //}
    //   else if (String(lat.UserAdmin) === 'Y') {
    //     return <Redirect to={{
    //       pathname: '/admin/AdminPage'
    //       // ,state: { Name: lat }
    //         //   this.state.menuroute = route.filter(function (entry) { return entry.display === "admin" || entry.display === "both" });

    //   }}
    // />
    //   }
  }
  else {
    return (
      <div className="row">
      <div className="col-lg-4 col-xl-4 col-md-4"  >
      <img style={{width:"120%",height:"80%"}} src={homeImage}></img>
      </div>
      <div className="col-lg-8 col-xl-8 col-md-8">
     
    
    <div>
        <Container component="main" maxWidth="xs" style={{ background: "#cce6ff" }}>
          
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
        </Typography>
        <div className={msg}> {status}</div>
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="user_name"
                label="user name "
                name="user_name"
                autoComplete="user_name"
                autoFocus
                onChange={e => setuser_name(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="Password"
                label="Password"
                type="Password"
                id="Password"
                autoComplete="current-Password"
                onChange={e => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={!validateForm()}
              >
                Sign In
          </Button>
               </form>
               <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot Password?
              </Link>
                </Grid> */}
                <Grid item>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleevent}
              >
               Don't have an account? Sign Up
          </Button>
                  {/* <Link href="/admin/signup/" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link> */}
                </Grid>
              </Grid>
           
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      </div>
</div>
</div>
    );
  }
}