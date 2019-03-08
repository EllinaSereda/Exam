import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import firebase from 'firebase';
import {make_order,product_update} from '../../redux/UserAC';
import './PageOrder.css'

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
  

  animateDelete=(EO)=>{
    this.setState({del:EO.target.id});
    setTimeout(this.deleteProd,300);
  }
  deleteProd=(EO)=>{
    let prod=this.state.del.split(' ');
    this.setState({del:prod});
    if (this.props.user.info!==null){
        console.log("Work")
        let order=this.props.user.info.order;
      delete order[prod[0]][prod[1]];
      let i=0;
      for (let key in order[prod[0]]){
        i++; 
      }
      console.log(i);
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

    //  обработчик кнопки -
    dec=(EO)=>{   
      let newState=this.props.user.info.order;
      let params=EO.target.id.split(' ');
      let prod=this.props.products.products.filter(v=>v.code==params[0])[0].stock.filter(v=>v.vol==params[1])[0];
      if(1<newState[params[0]][params[1]]){
        newState={...newState,
            [params[0]]:{...newState[params[0]],
              [params[1]]:(newState[params[0]][params[1]]-1),
            }
        }
      }
      firebase.firestore().doc('Users/Users').set({
        [this.props.user.info.email]:{...this.props.user.info,order:newState},
      })
      console.log(newState);
      this.props.dispatch(product_update(newState));
    }
   //  обработчик кнопки +
    inc=(EO)=>{
      let newState=this.props.user.info.order;
      let params=EO.target.id.split(' ');
      let prod=this.props.products.products.filter(v=>v.code==params[0])[0].stock.filter(v=>v.vol==params[1])[0];
      if(prod.in>newState[params[0]][params[1]]){
        newState={...newState,
            [params[0]]:{...newState[params[0]],
              [params[1]]:(newState[params[0]][params[1]]+1),
            }
        }
      }
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
      console.log(this.props.user.info.order);
      firebase.firestore().doc('Users/Users').set({
        [this.props.user.info.email]:{...this.props.user.info,order:{},buy:[...this.props.user.info.buy,this.props.user.info.order]},
      })
      this.props.dispatch(make_order());
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
            return <div key={prod.key} className={"Prod"+(this.state.del==prod.key?" del":"") }>
              {prod.stock.filter(y=>y.vol==Number(v.vol)).map((x,i)=>{
                return <div className="Variant">
                {(x.in!=0)?
                  <div className="order comp">
                  <input className="Delete" type="button" id={prod.key} onClick={this.animateDelete} value="Удалить"/>
                    <div className="buttons">
                      <span id={prod.key} onClick={this.dec}>-</span>
                      <input type="number" value={v.amount} min={1} id={prod.key} onChange={this.setAmount}/>
                      <span id={prod.key} onClick={this.inc}>+</span>
                    </div>
                  </div>
                  :<input type="button" className="Message" value="Сообщить о наличии"/>
                } 
              <img src={prod.img[0]}/>
              <p>{prod.name}</p>
              <p>{v.vol} мл {prod.stock.filter(x=>x.vol==v.vol)[0].price}</p>
              {(x.in!=0)?
               <div className="order adapt">
               <input className="Delete" type="button" id={prod.key} onClick={this.animateDelete} value="Удалить"/>
                 <div className="buttons">
                   <span id={prod.key} onClick={this.dec}>-</span>
                   <input type="number" value={v.amount} min={1} id={prod.key} onChange={this.setAmount}/>
                   <span id={prod.key} onClick={this.inc}>+</span>
                 </div>
               </div>
                :<input type="button" className="Message  adapt" value="Сообщить о наличии"/>
              } 
              </div>})}
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
            return <div key={prod.key} className="Prod">
            {prod.stock.filter(y=>y.vol==Number(v.vol)).map((x,i)=>{
              console.log(x.in);
              return <div className="Variant">
              {(x.in!=0)?
               <div className="order comp">
               <input className="Delete" type="button" id={prod.key} onClick={this.deleteProd} value="Удалить"/>
                 <div className="buttons">
                   <span id={prod.key} onClick={this.dec}>-</span>
                   <input type="number" value={v.amount} min={1} id={prod.key} onChange={this.setAmount}/>
                   <span id={prod.key} onClick={this.inc}>+</span>
                 </div>
               </div>
                :<input type="button" className="Message  comp" value="Сообщить о наличии"/>
              } 
              <img src={prod.img[0]}/>
              <p>{prod.name}</p>
              <p>{v.vol} мл {prod.stock.filter(x=>x.vol==v.vol)[0].price}</p>
              {(x.in!=0)?
               <div className="order adapt">
               <input className="Delete" type="button" id={prod.key} onClick={this.deleteProd} value="Удалить"/>
                 <div className="buttons">
                   <span id={prod.key} onClick={this.dec}>-</span>
                   <input type="number" value={v.amount} min={1} id={prod.key} onChange={this.setAmount}/>
                   <span id={prod.key} onClick={this.inc}>+</span>
                 </div>
               </div>
                :<input type="button" className="Message  adapt" value="Сообщить о наличии"/>
              } 
              </div>})}
          </div>
          })
          prodCode.push(prod);
        }
    }
    return  prodCode;
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
    console.log('Page_Order render');
    return <div className="PageOrder">
    <h1>Корзина</h1>
    {this.createProductsCode()}
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


