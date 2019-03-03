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
    upd:0,
  }
  deleteProd=(EO)=>{
    let prod=EO.target.id.split(' ');
    if (this.props.user.info!==null){
    this.props.dispatch(product_delete(prod));
    console.log(this.props.user.info.order);
    firebase.firestore().doc('Users/Users').set({
      [this.props.user.info.email]:{...this.props.user.info,order:this.props.user.info.order},
    })
    }
    else if(localStorage.parfumShop_busket){
      let storage=JSON.parse(localStorage.parfumShop_busket);
    
        delete storage[prod[0]][prod[1]];
        let i=0;
        for (let key in storage[prod[0]]){
          i++;
        }
        if (i==0){
          delete storage[prod[0]];
        }
        localStorage.parfumShop_busket=JSON.stringify(storage);
        this.setState((prevState,CurrentState)=>{return {upd:prevState.upd+1}});
    }
  }
  createProductsCode=()=>{
    let prodCode=null;
    if (this.props.user.info!==null){
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
              <p>Количество:  {v.amount}</p>
              <p>{v.vol} мл {prod.stock.filter(x=>x.vol==v.vol)[0].price}</p>
              <input type="button" id={prod.key} onClick={this.deleteProd} value="Удалить"/>
          </div>
          })
          prodCode.push(prod);
      }
    }
    else if (localStorage.parfumShop_busket){
      prodCode=[];
      let storage=JSON.parse(localStorage.parfumShop_busket);
      for (let key in storage){
          let order=[];
          for (let k in storage[key]){
             order.push({vol:k,amount:storage[key][k]})
          }
          let prod=this.props.products.products.filter(v=>v.code==key)[0];
          
          prod=order.map((v)=>{
            prod.key=key+' '+v.vol;
            return <div key={prod.key}>
              <img src={prod.img[0]}/>
              <p>{prod.name}</p>
              <p>Количество:  {v.amount}</p>
              <p>{v.vol} мл {prod.stock.filter(x=>x.vol==v.vol)[0].price}</p>
              <input type="button" id={prod.key} onClick={this.deleteProd} value="Удалить"/>
          </div>
          })
          prodCode.push(prod);
        }
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
