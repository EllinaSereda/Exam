import React from 'react';
import PropTypes from 'prop-types';
import {voteEvents} from '../../events';
import {connect} from 'react-redux';
import firebase from 'firebase';
import { NavLink } from 'react-router-dom';
import {product_addtobusket} from '../../redux/UserAC';
import './Product.css';
class Product extends React.PureComponent {

  static propTypes = {
    brands:PropTypes.shape(
      {
        brands:PropTypes.array,
        brandsMain:PropTypes.array,
      }),
    amount:PropTypes.object,
  };
  
  state={
    info:null,
    bigImg:0,
    content:0,
    n:0,
    amount:null,
  }
  
  componentDidMount(){ 
    let hash={};
    this.props.prod.stock.forEach(v => {
        hash[v.vol]=1;
      });
      this.setState({amount:hash})
  }
  
  setBigImg=(EO)=>{             
  this.setState({bigImg:EO.target.alt})
  }

  setContent=(EO)=>{
    this.setState({content:Number(EO.target.id)})
  }
  //  обработчик кнопки -
  dec=(EO)=>{   
    let newState={...this.state.amount};
    if(0<newState[parseInt(EO.target.id)]){
      newState[parseInt(EO.target.id)]-=1;
    }
    this.setState({amount:newState}); 
    //voteEvents.emit('SetAm',newState);
  }
 //  обработчик кнопки +
  inc=(EO)=>{
    let newState={...this.state.amount};
    let product=this.props.prod.stock.filter(v=>v.vol==parseInt(EO.target.id))[0];
    if(product.in>newState[parseInt(EO.target.id)]){
      newState[parseInt(EO.target.id)]+=1;
    }
    this.setState({amount:newState}); 
    //voteEvents.emit('SetAm',newState);
  }
 
 
  setAmount=(EO)=>{
    let newState={...this.state.amount};
    newState[EO.target.id]=Number(EO.target.value);
    this.setState({amount:newState});
   // voteEvents.emit('SetAm',newState);
  }
  addToBusket=(EO)=>{
    if(EO.target.id>0){
        EO.amount=this.state.amount[EO.target.id];
        voteEvents.emit('AddBusket',EO);
    }
  }

  render() {
    let img=[];
    img.push(this.props.prod.img.map((v,i)=><img alt={i} key={i} className='small' onClick={this.setBigImg} src={v}/>));
    return <div key={this.props.prod.code} className='ProductComponent'>
        <h3>{this.props.prod.brand}</h3>
        <h2>{this.props.prod.name}</h2>
        {this.props.prod.img.length>1 ?
          <div key="img">
            <img key={this.state.bigImg} className='big' src={this.props.prod.img.filter((v,i)=>i==this.state.bigImg)[0]}/>
            <div>{img}</div>
          </div> 
          :<img className='big' src={this.props.prod.img[0]}/>
        }                                                                                                         
        <div key="buy" className="buy">
        {         //Форма покупки товара
          this.props.prod.stock.map((x,i)=>{return <div key={i} className="Variant">
          {(x.in!=0)?
          <div className="order">
            <input type="button" className="Get" id={x.vol} value="В корзину" onClick={this.addToBusket}/>
            <div className="buttons">
              <span id={x.vol+"-"} onClick={this.dec}>-</span>
              <input type="number" value={this.state.amount?this.state.amount[x.vol]:"1"} min={1} id={x.vol} onChange={this.setAmount}/>
              <span id={x.vol+"+"} onClick={this.inc}>+</span>
            </div>

          </div>
          :<input type="button" className="Message" value="Сообщить о наличии"/>
          }
          <img src={this.props.prod.img[0]}/>
          <h5>{this.props.prod.brand}</h5>
          <div key="descr" className="descr">
            <span>{this.props.prod.name} {x.vol} мл </span>
            <span>{x.price} руб.</span>
          </div>
          </div>}) 
        }</div>
  </div>;
   
    

  }

}



export default Product;
