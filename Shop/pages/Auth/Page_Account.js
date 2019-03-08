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
  /*fileUpload=(EO)=>{
    let file=EO.target.files[0];
    console.log(file);
    let storageRef=firebase.storage().ref('users/'+file.name);
    this.setState({url:storageRef});
    console.log(storageRef);
    let task=storageRef.put(file);
    storageRef.getDownloadURL().then((url) => { 
      this.setState({url: url });
      firebase.firestore().doc('Users/Users').set({
        [this.props.user.info.email]:{...this.props.user.info,picture:url},
      })
      this.props.dispatch(user_img(url));
      console.log(url);
    });
    task.on('state_changed',
    function progress(){
      
    },
    function error(err){
      console.log("Error");
    },
    function comlete(){
      
    }
    )
<input id="avatar"  type="file" onChange={this.fileUpload}/>
    <img src={this.props.user.info.picture||"https://firebasestorage.googleapis.com/v0/b/finalproject-d5d17.appspot.com/o/users%2Fuser-shape.png?alt=media&token=ff969d63-1c3b-4f3e-86f9-eb56f425cb84"}/>
  }*/
  createOrders=()=>{
    let html=this.props.user.info.buy.map((v,i)=>{
      {
        console.log(v);
        let code=[];
        for (let k in v){
          console.log(v[k]);
          for (let key in v[k]){
            console.log(v[k][key]);
            let i=this.props.products.products.filter(y=>y.code==k)[0];
            console.log(i);
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
        console.log(code);
        return <div key={i}>{code}</div>;
      }

  })
  return html;
}

  render() {
  
console.log('Page_Account render')
this.props.user.info?
console.log(this.props.user.info.picture):null;
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