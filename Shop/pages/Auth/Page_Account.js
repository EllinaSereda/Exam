import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import firebase from 'firebase';
import {user_logout} from '../../redux/User';

class Page_Account extends React.PureComponent {

  static propTypes = {
    
  };
  state={
      email:null,
      password:null,
      info:null,
      log:0,
  }
  logout=()=>{
    firebase.auth().signOut();
    this.props.dispatch(user_logout());
    this.props.history.push('/log');
         
  }
  

  render() {
console.log('Page_Account render')
    return <div className="PageAccount">
    {this.props.user.info.name}
    
    <input className="su" type="button" value="log out" onClick={this.logout}/>
    </div>
   
    

  }

}

const mapStateToProps = function (state) {
  return {
     user: state.user,
  };
};

export default connect(mapStateToProps)(Page_Account);