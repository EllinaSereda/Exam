import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './Order.css'
import { voteEvents } from '../../events';

class Order extends React.PureComponent {

  static propTypes = {
    products:PropTypes.array,
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
    voteEvents.emit('Delete',prod);
  }

    //  обработчик кнопки -
    dec=(EO)=>{   
      let newState=this.props.user.order;
      let params=EO.target.id.split(' ');
      let prod=this.props.products.filter(v=>v.code==params[0])[0].stock.filter(v=>v.vol==params[1])[0];
      if(1<newState[params[0]][params[1]]){
        newState={...newState,
            [params[0]]:{...newState[params[0]],
              [params[1]]:(newState[params[0]][params[1]]-1),
            }
        }
      }
      voteEvents.emit('upd',newState);
    }
   //  обработчик кнопки +
    inc=(EO)=>{
      let newState=this.props.user.order;
      let params=EO.target.id.split(' ');
      let prod=this.props.products.filter(v=>v.code==params[0])[0].stock.filter(v=>v.vol==params[1])[0];
      if(prod.in>newState[params[0]][params[1]]){
        newState={...newState,
            [params[0]]:{...newState[params[0]],
              [params[1]]:(newState[params[0]][params[1]]+1),
            }
        }
      }
      voteEvents.emit('upd',newState);
    }
   
   
    setAmount=(EO)=>{
      let newState=this.props.user.order;
      let params=EO.target.id.split(' ');
      let prod=this.props.products.filter(v=>v.code==params[0])[0].stock.filter(v=>v.vol==params[1])[0];
      if(prod.in>=EO.target.value){
        newState={...newState,
            [params[0]]:{...newState[params[0]],
              [params[1]]:Number(EO.target.value),
            }
        }
      }
      voteEvents.emit('upd',newState);
    }

  createProductsCode=()=>{
    let prodCode=null;
      prodCode=[];
      for (let key in this.props.user.order){
          let order=[];
          for (let k in this.props.user.order[key]){
             order.push({vol:k,amount:this.props.user.order[key][k]})
          }
          let prod=this.props.products.filter(v=>v.code==key)[0];
          
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
               <NavLink key={prod.code} to={"/product/"+prod.code} exact className="PageLink" activeClassName="ActivePageLink"><img src={prod.img[0]}/></NavLink>
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

    return  prodCode;
    
  }
  
  
 

  render() {
    let presense=0;
    if (this.props.user){
      let i=0;
      for (let k in this.props.user.order ){
        i++;
      }
      i>0?presense=1:null;
    }
    return <div className="Order">
    {this.createProductsCode()}
   
    </div>

  }

}



export default Order;


