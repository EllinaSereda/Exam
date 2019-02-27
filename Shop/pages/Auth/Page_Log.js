import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import firebase from 'firebase';
import {user_create,user_logout} from '../../redux/User';

class Page_Log extends React.PureComponent {

  static propTypes = {
    
  };
  state={
      email:null,
      password:null,
      info:null,
      log:0,
  }
  setEmail=(EO)=>{
    this.setState({email:EO.target.value});
  }
  setPas=(EO)=>{
    this.setState({password:EO.target.value});
  }
  logAccount=()=>{
      const auth=firebase.auth();
      console.log(this.state.email,this.state.password)
      const promise=auth.signInWithEmailAndPassword(this.state.email,this.state.password);
      promise
      .then(firebaseUser=>{
        if (firebaseUser){
          let user;
          console.log(firebaseUser.user.email);
          firebase.firestore().doc('Users/Users').get()
          .then (doc=> {  
          user=doc.data()[firebaseUser.user.email];  
          this.props.dispatch(user_create(user));
          this.props.history.push('/account');
          })
        }
        else{
            this.setState({log:0})
        }
      })
      .catch(e=>console.log(e.message));
  }
    

  render() {
console.log('Page_Log render')
    return <div className="Pageregistration">
    {
      <form method="#" action="#">
        <div class="sing">
        <label class="singemail" for="emaillog">Log in with email</label>
        </div>
        <input  class="singemail" type="email" onBlur={this.setEmail} name="emaillog" id="emaillog" placeholder="Enter email" required/>
        <br/>
        <input  class="singemail" type="password" onBlur={this.setPas} name="passwordem" id="passwordem" placeholder="Enter password" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" required/>
        <br/>
        <input class="su" type="button" value="sing in" onClick={this.logAccount}/>
        <div class="line"></div>
        </form>
    }
    
      </div>
    ;
    
   
    

  }

}

const mapStateToProps = function (state) {
  return {
     
  };
};

export default connect(mapStateToProps)(Page_Log);