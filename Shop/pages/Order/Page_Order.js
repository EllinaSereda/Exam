import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import firebase from 'firebase';
import {product_delete} from '../../redux/User';

class Page_Order extends React.PureComponent {

  static propTypes = {
    
  };
  state={
    info:null,
    bigImg:0,
    content:0,
  }
  deleteProd=(EO)=>{
    let prod=EO.target.id.split(' ');
    if (this.props.user.info.length!=0){
    this.props.dispatch(product_delete(prod));
    console.log(this.props.user.info.order);
    firebase.firestore().doc('Users/Users').set({
      [this.props.user.info.email]:{...this.props.user.info,order:this.props.user.info.order},
    })
    }
  }
  createProductsCode=()=>{
    let prodCode=null;
    if (this.props.user.info.length!=0){
      prodCode=[];
      for (let key in this.props.user.info.order){
          let order=[];
          for (let k in this.props.user.info.order[key]){
             order.push({vol:k,amount:this.props.user.info.order[key][k]})
          }
          let prod=this.props.products.products.filter(v=>v.code==key)[0];
          
          prod=order.map((v)=>{
            prod.key=key+' '+v.vol;
            return <div key={prod.key}>
              <img src={prod.img[0]}/>
              <p>{prod.name}</p>
              <p>{v.vol} мл {prod.stock.filter(x=>x.vol==v.vol)[0].price}</p>
              <input type="button" id={prod.key} onClick={this.deleteProd} value="Удалить"/>
          </div>
          })
          prodCode.push(prod);
      }
    }
    else{

    }
    return  prodCode;
  }
  
  
 

  render() {
    console.log('Page_Order render');
    return <div className="PageOrder">
    <h1>Корзина</h1>
    {this.createProductsCode()}
    </div>

  }

}

const mapStateToProps = function (state) {
  return {
    brands: state.brands,  // Магазины
    products: state.products,   //Товары
    user: state.user, //Юзер
  };
};

export default connect(mapStateToProps)(Page_Order);
