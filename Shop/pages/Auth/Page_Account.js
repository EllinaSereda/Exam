import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import firebase from 'firebase';
import {user_logout, user_img} from '../../redux/UserAC';
import './PageAccount.css';

class Page_Account extends React.PureComponent {

  static propTypes = {
    products:PropTypes.shape({
        products:PropTypes.array,
        search:PropTypes.array,
    }),
    user:PropTypes.shape({
        info:PropTypes.object,
    }),
  };



  
  state={
      email:null,
      password:null,
      info:null,
      log:0,
      url: null,
  }
  logout=()=>{
    firebase.auth().signOut();
    this.props.dispatch(user_logout());
    this.props.history.push('/log');
         
  }

  createOrders=()=>{
    let html=this.props.user.info.buy.map((v,i)=>{
      {
        let code=[];
        for (let k in v){
          for (let key in v[k]){
            let i=this.props.products.products.filter(y=>y.code==k)[0];
            let itemCode=<div key={i+k+key} className="item">
              <img src={i.img[0]}/>
              <p>{i.brand}</p>
              <p>{i.name}</p>
              <p>Количество: {v[k][key]}</p>
              <p>Объем: {key}</p>
            </div>;
            code.push(itemCode);
          }
          
        }
        return <div key={i}>{code}</div>;
      }

  })
  return html;
}

  render() {
  

let code;
if (this.props.user.info){
  let deliv=this.createOrders();
  code=<div key="PageAccount" className="PageAccount">
  <h2>Личный кабинет</h2>
  <input className="LogOut" type="button" value="log out" onClick={this.logout}/>

  <p><span className="bold">Имя:</span> {this.props.user.info.name}</p>
  <p><span className="bold">Email:</span> {this.props.user.info.email}</p>
<div key="Deliveries" className="Deliveries">
<p className="bold">Заказы</p>
{deliv}

</div>

</div>
}

else code=null;
return code;
  }

}

const mapStateToProps = function (state) {
  return {
     user: state.user,
     products: state.products,
  };
};

export default connect(mapStateToProps)(Page_Account);