import React from 'react';
import PropTypes from 'prop-types';
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
    products:PropTypes.shape({
        products:PropTypes.array,
        search:PropTypes.array,
      }),
    user:PropTypes.shape({
        info:PropTypes.object,
      }),
  };
  
  state={
    info:null,
    bigImg:0,
    content:0,
    n:0,
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
  }
 //  обработчик кнопки +
  inc=(EO)=>{
    let newState={...this.state.amount};
    let prod=this.props.products.products.filter(v=>v.code==Number(this.props.match.params.id))[0].stock.filter(v=>v.vol==parseInt(EO.target.id))[0];
    if(prod.in>newState[parseInt(EO.target.id)]){
      newState[parseInt(EO.target.id)]+=1;
    }
    this.setState({amount:newState}); 
  }
 
 
  setAmount=(EO)=>{
    let newState={...this.state.amount};
    newState[EO.target.id]=Number(EO.target.value);
    this.setState({amount:newState});
  }
  addToBusket=(EO)=>{
    if(EO.target.id>0){
        voteEvents.emit('AddBusket',EO);
    }
  }

  render() {
    return <div key={this.props.prod.code} className='this.props.product'>
        <h3>{this.props.prod.brand}</h3>
        <h2>{this.props.prod.name}</h2>
        {this.props.prod.img.length>1 ?
          <div>
            <img key={this.state.bigImg} className='big' src={this.props.prod.img.filter((v,i)=>i==this.state.bigImg)[0]}/>
            <div>{this.props.img}</div>
          </div> 
          :<img className='big' src={this.props.prod.img[0]}/>
        }                                                                                                         
        <div className="buy">
        {         //Форма покупки товара
          this.props.prod.stock.map((x,i)=>{return <div className="Variant">
          {(x.in!=0)?
          <div className="order">
            <input type="button" class="Get" id={x.vol} value="В корзину" onClick={this.addToBusket}/>
            <div class="buttons">
              <span id={x.vol+"-"} onClick={this.dec}>-</span>
              <input type="number" value={this.props.amount?this.props.amount[x.vol]:"1"} min={1} id={x.vol} onChange={this.setAmount}/>
              <span id={x.vol+"+"} onClick={this.inc}>+</span>
            </div>

          </div>
          :<input type="button" className="Message" value="Сообщить о наличии"/>
          }
          <img src={this.props.prod.img[0]}/>
          <h5>{this.props.prod.brand}</h5>
          <div className="descr">
            <span>{this.props.prod.name} {x.vol} мл </span>
            <span>{x.price} руб.</span>
          </div>
          </div>}) 
        }</div>
  </div>;
   
    

  }

}



export default Product;
