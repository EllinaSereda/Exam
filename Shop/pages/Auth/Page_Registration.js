import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import firebase from 'firebase';
import { NavLink } from 'react-router-dom';
import {user_create, user_logout} from '../../redux/User';

class Page_Registration extends React.PureComponent {

  static propTypes = {
    
  };
  state={
      email:null,
      password:null,
      name:null,
      info:null,
      log:0,
  }
  setName=(EO)=>{
    this.setState({name:EO.target.value});
  }
  setEmail=(EO)=>{
    this.setState({email:EO.target.value});
  }
  setPas=(EO)=>{
    this.setState({password:EO.target.value});
  }
  createAccount=()=>{
      const auth=firebase.auth();
      console.log(this.state.email,this.state.password)
      const promise=auth.createUserWithEmailAndPassword(this.state.email,this.state.password);
      promise
      .then(firebaseUser=>{
        if (firebaseUser){
          let user={name:this.state.name, email: firebaseUser.user.email ,order: {},
            buy: []};
          console.log(user);
          if (localStorage.parfumShop_busket){
            let order=JSON.parse(localStorage.parfumShop_busket);
            console.log(firebaseUser.user.email)
            user.order=order;
            delete localStorage.parfumShop_busket;
          }
          firebase.firestore().doc('Users/Users').get()
          .then((doc)=>{
            return firebase.firestore().doc('Users/Users').set({
              ... doc.data(),
              [firebaseUser.user.email]:user
            })
          })
          .then(()=>{
            this.props.dispatch(user_create(user));
            this.props.history.push('/account');
          })
          .catch(()=>{
            console.log('Error')
          })
          
          
        }
      })
      .catch(e=>console.log(e.message));
  }
    

  render() {
    console.log('Page_Registration render')
    return <div className="Pageregistration">
    {
      <form method="#" action="#">
      <div className="name">
        <label className="name" for="name">Регистрация</label>
        </div>
        <input  className="name" type="text" onBlur={this.setName} name="name" id="name" placeholder="Enter name" required/>
        <br/>
        <input  className="singemail" type="email" onBlur={this.setEmail} name="emaillog" id="emaillog" placeholder="Enter email" required/>
        <br/>
        <input  className="singemail" type="password" onBlur={this.setPas} name="passwordem" id="passwordem" placeholder="Enter password" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" required/>
        <br/>
        <input className="su" type="button" value="sing in" onClick={this.createAccount}/>
        <div className="line"></div>
        <NavLink to="/log" exact className="PageLink" activeClassName="ActivePageLink"><p className="dont">Already have an account? <span href="#">Sing up</span></p></NavLink>
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

export default connect(mapStateToProps)(Page_Registration);
