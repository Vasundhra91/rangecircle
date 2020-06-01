import React,{Component} from 'react';
import homeImage from '../Images/AIRC01.jpg'
import SigninPage from './signin'
import { BrowserRouter as Router, Switch, Route , Redirect} from 'react-router-dom';
export default class signUp extends Component {
    // constructor(props) {
    //   super(props);
      
      state = {
        user_name: '',
        Password: '',
        conPwd:'',
        signup_status:false,
        checkusername:'',
        comparePasswordstate:''

    }
    validateForm() {
      return this.state.conPwd.length > 0 &&this.state.user_name.length > 0 && this.state.Password.length > 0;
    }
    comparePwd=(e) => 
    {
        e.preventDefault()
        if(this.state.Password!=this.state.conPwd)
        {

            this.setState({comparePasswordstate:"Password & ComparePassed is not matching!"})
          
        }
     
    }
    // }
    checkusername=(e) => 
    {
        e.preventDefault()
        
        fetch('/users/checkusername', {
            method: 'POST',
            body: JSON.stringify({user_name:this.state.user_name}),
            headers: {
                'Content-Type': 'application/json'
            }
          }).then(res => res.json())
         .then(response => this.setState({checkusername:response}))
          //.then(response => console.log('Success:', JSON.stringify(response)))
         
          


    }
    onChangeEvent=(e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    onSubmitEvent=(e) => {
        e.preventDefault()
        var data={
          user_name: this.state.user_name,
          Password: this.state.Password
        }
        fetch('/users/signUp', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .then(response => this.setState({signup_status:response}))
        
            e.target.reset();
    }

    render() { 
        console.log(this.state.checkusername)
        if(this.state.signup_status===true){
            return (
              <Router>
                <Switch>
                 <Route path="/" component={SigninPage} />
                  <Redirect to="/" />
                </Switch>
              </Router>
            )
          }else{
return (<div className="row">
<div className="col-lg-4 col-xl-4 col-md-4"  >
<img style={{width:"105%",height:"90%"}} src={homeImage}></img>
</div><div className="col-lg-8 col-xl-8 col-md-8">
        <div className="col-xl-6 col-md-6 col-lg-6 col-sm-12">
            <h3 align="center">Sign Up</h3>
            <form onSubmit={this.onSubmitEvent}>
         
                <div className="form-group">
                    <label>User Name:  </label>
                    <input 
                    id="user_name"
                      type="text" 
                      className="form-control" 
                     onChange={this.onChangeEvent}
                     onBlur={this.checkusername}
                      />
                </div>
                <div style={{color:"red"}}>{this.state.checkusername}</div>

        
                <div className="form-group">
                    <label>Password: </label>
                    <input type="Password" 
                      className="form-control"
                      id="Password"
                      onChange={this.onChangeEvent}
                      
                      />
                      
                </div>
                <div className="form-group">
                    <label>Confirm Password: </label>
                    <input type="Password" 
                      className="form-control" id="conPwd"
                      onChange={this.onChangeEvent}  
                      onBlur={this.comparePwd}                                    
                      />                      
                </div>
          <div style={{color:"red"}}>{this.state.comparePasswordstate}</div>
              
               
               <div className="form-group">
                    <input type="submit" 
                      value="Sign Up" 
                      name="btmSub"
                      disabled={!this.validateForm()}
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
</div>
</div>
)

    }
}

}