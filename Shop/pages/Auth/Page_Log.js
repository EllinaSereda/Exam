import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import firebase from 'firebase';
import {user_create,user_logout} from '../../redux/UserAC';
import './PageLog.css';


class Page_Log extends React.PureComponent {

  static propTypes = {
    
  };
  state={
      email:null,
      password:null,
      info:null,
      log:0,
      error:0,
  }
  setEmail=(EO)=>{
    this.setState({email:EO.target.value});
  }
  setPas=(EO)=>{
    this.setState({password:EO.target.value});
  }
  logAccount=()=>{
      const auth=firebase.auth();
      let order=null;;
      console.log(this.state.email,this.state.password)
      if (localStorage.parfumShop_busket){
        order=JSON.parse(localStorage.parfumShop_busket);
        //user.order=order;
        console.log(order);
        delete localStorage.parfumShop_busket;
      }
      const promise=auth.signInWithEmailAndPassword(this.state.email,this.state.password);
      promise
      .then(firebaseUser=>{
        if (firebaseUser){
          let user;
          console.log(firebaseUser.user.email);
          firebase.firestore().doc('Users/Users').get()
          .then (doc=> {  
          user=doc.data()[firebaseUser.user.email]; 
          console.log(order);
          if (order!=null){
            for (let code in order){
              if (code in user.order){
                for (let vol in order[code]){
                  if (vol in user.order[code]){
                    user.order[code][vol]+=order[code][vol];
                  }
                  else{
                    user.order[code][vol]=order[code][vol];
                  }
                } 
              }
              else{
                user.order[code]=order[code];
              }
            }
            firebase.firestore().doc('Users/Users').set({
              ... doc.data(),
              [firebaseUser.user.email]:user
            })
            .then(()=>{
              this.props.dispatch(user_create(user));
              this.props.history.push('/account');
            })
          } 
          else{
            this.props.dispatch(user_create(user));
            this.props.history.push('/account');
          }
          
          })
        }
        else{
            this.setState({log:0})
        }
        this.setState({error:0});
      })
      .catch(e=>{
        console.log(e.message);
        this.setState({error:e.message});
      });
  }
    

  render() {
console.log('Page_Log render')
    return <div className="PageLog">
     <h2>Вход</h2>
      <form method="#" action="#">
      {this.state.error?<div>Неверный пароль или логин</div>:null}
        <input   type="email" onBlur={this.setEmail} name="emaillog" id="emaillog" placeholder="Введите email" required/>
        <br/>
        <input type="password" onBlur={this.setPas} name="passwordem" id="passwordem" placeholder="Введите пароль" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" required/>
        <br/>
        <input  type="button" value="Войти" onClick={this.logAccount}/>
        </form>

      </div>
  }

}

const mapStateToProps = function (state) {
  return {
     
  };
};

export default connect(mapStateToProps)(Page_Log);