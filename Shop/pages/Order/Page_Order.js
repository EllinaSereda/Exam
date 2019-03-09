import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {voteEvents} from '../../events';
import { NavLink } from 'react-router-dom';
import firebase from 'firebase';
import {make_order,product_update} from '../../redux/UserAC';
import Order from '../../components/Order/Order';
import './PageOrder.css';

class Page_Order extends React.PureComponent {

  static propTypes = {
    products:PropTypes.shape({
      products:PropTypes.array,
      search:PropTypes.array,
    }),
  user:PropTypes.shape({
      info:PropTypes.object,
    }),
  } 

  state={
    info:null,
    bigImg:0,
    content:0,
    upd:0,
    del:null,
  }
  

  componentDidMount(){
    voteEvents.addListener('Delete',this.deleteProd);  
    voteEvents.addListener('upd',this.upd);     
  }
  componentWillUnmount = () => {
    voteEvents.removeListener('Delete',this.deleteProd);
    voteEvents.removeListener('upd',this.upd);  
  };

  deleteProd=(prod)=>{
    
    this.setState({del:prod});
    if (this.props.user.info!==null){
        let order=this.props.user.info.order;
      delete order[prod[0]][prod[1]];
      let i=0;
      for (let key in order[prod[0]]){
        i++; 
      }
      if (i==0){
        delete order[prod[0]];
      }
 
      this.props.dispatch(product_update(order));
      firebase.firestore().doc('Users/Users').set({
        [this.props.user.info.email]:{...this.props.user.info,order:order},
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

    upd=(newState)=>{   
      firebase.firestore().doc('Users/Users').set({
        [this.props.user.info.email]:{...this.props.user.info,order:newState},
      })
      this.props.dispatch(product_update(newState));
    }
   
   
    setAmount=(EO)=>{
      let newState=this.props.user.info.order;
      let params=EO.target.id.split(' ');
      let prod=this.props.products.products.filter(v=>v.code==params[0])[0].stock.filter(v=>v.vol==params[1])[0];
      if(prod.in>=EO.target.value){
        newState={...newState,
            [params[0]]:{...newState[params[0]],
              [params[1]]:Number(EO.target.value),
            }
        }
      }
      this.props.dispatch(product_update(newState));
    }
    buy=()=>{
      firebase.firestore().doc('Users/Users').set({
        [this.props.user.info.email]:{...this.props.user.info,order:{},buy:[...this.props.user.info.buy,this.props.user.info.order]},
      })
      this.props.dispatch(make_order());
    }

  createProductsCode=()=>{
    let info=null;
    if (this.props.user.info!==null){
      info=this.props.user.info;
    }
    else if (localStorage.parfumShop_busket){
      info=JSON.parse(localStorage.parfumShop_busket);
    }
    return info;
  }
  
  
 

  render() {
    let presense=0;
    if (this.props.user.info){
      let i=0;
      for (let k in this.props.user.info.order ){
        i++;
      }
      i>0?presense=1:null;
    }
    return <div className="PageOrder">
    <h1>Корзина</h1>
    {this.createProductsCode()!==null?
    <Order user={this.createProductsCode()} products={this.props.products.products}></Order>:null}
    
    {presense?
     <input type="button" className="MakeOrder" onClick={this.buy} value="Оформить заказ"/>:
     null
    }
    </div>

  }

}

const mapStateToProps = function (state) {
  return {
    products: state.products,   //Товары
    user: state.user, //Юзер
  };
};

export default connect(mapStateToProps)(Page_Order);


