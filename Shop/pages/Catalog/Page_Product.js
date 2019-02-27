import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import firebase from 'firebase';
import { NavLink } from 'react-router-dom';
import {product_addtobusket} from '../../redux/User';
import './PageProduct.css';
class Page_Product extends React.PureComponent {

  static propTypes = {
    
  };
  state={
    info:null,
    bigImg:0,
    content:0,
    amount:null,
  }
  
  componentDidMount(){
    let hash={};
    console.log(this.props.products.products);
    this.props.products.products.filter(v=>v.code==this.props.match.params.id)[0].stock.forEach(v => {
      hash[v.vol]=1;
    });
    console.log(hash);
    this.setState({amount:hash})
  }
  
  
  setBigImg=(EO)=>{             
  console.log(EO.target.alt);
  this.setState({bigImg:EO.target.alt})
  }

  setContent=(EO)=>{
    this.setState({content:Number(EO.target.id)})
  }
  setAmount=(EO)=>{
    console.log('sdv');
    let newState={...this.state.amount};
    newState[EO.target.id]=Number(EO.target.value);
    this.setState({amount:newState});
  }
  addToBusket=(EO)=>{
    if(EO.target.id>0){
    if (this.props.user.info.length!=0){
      let product=this.props.user.info.order;
      console.log(this.props.user.info);
      if ([this.props.match.params.id] in product ){
        if ([EO.target.id] in product[this.props.match.params.id]){
          product[this.props.match.params.id][EO.target.id]+=this.state.amount[EO.target.id];
        }
        else{
          product[this.props.match.params.id][EO.target.id]=this.state.amount[EO.target.id];
        }
      }
      else{
        product[this.props.match.params.id]={[EO.target.id]:this.state.amount[EO.target.id]};
      }
      
      console.log(product);
      this.props.dispatch(product_addtobusket(product));
      firebase.firestore().doc('Users/Users').set({
        [this.props.user.info.email]:{...this.props.user.info,order:product},
      })
    }
    else{
      console.log(localStorage.parfumShop_busket);
      if(localStorage.parfumShop_busket){
        let storage=JSON.parse(localStorage.parfumShop_busket);
        console.log(storage);
        storage.push({code:this.props.match.params.id,vol:EO.target.id,amount:this.state.amount[EO.target.id]});
        console.log(storage);
        localStorage.setItem('parfumShop_busket',JSON.stringify(storage));
        console.log(storage);
      }
      else{
        localStorage.setItem('parfumShop_busket',JSON.stringify([{code:this.props.match.params.id,vol:EO.target.id,amount:this.state.amount[EO.target.id]}]));
      }
      }
    }
  }

  render() {
    console.log('Page_Product render');
    console.log(this.props.user);
   //delete localStorage.parfumShop_busket;
    console.log(JSON.parse(localStorage.parfumShop_busket));
    const id = this.props.match.params.id;
    return  <div className='PageProduct' >{this.props.products.products.filter(v=>v.code==id).map(v=>
      {
        let img=[];
       img.push(v.img.map((v,i)=><img alt={i} key={i} className='small' onClick={this.setBigImg} src={v}/>));
       img.push(v.img.map((v,i)=>i==this.state.bigImg?<img key={i} className='big' src={v}/>:null));
  
      return <div key={v.code} className='Product'>
      {v.img.length>1 ?
      img 
      :
      <img className='big' src={v.img[0]}/>
      }                                                                                                         
      <h3>{v.brand}</h3>
      <p>{v.name}</p>
      {         //Форма покупки товара
        v.stock.map((x,i)=>{return <div>
        <img src={v.img[0]}/>
        <span>{v.name} {x.vol} мл</span>
        <span>{x.price}</span>
        {(x.stock!=0)?
        <div className="order">
        <input type="button" value="-"/>
        <input type="number" defaultValue={1} min={1} id={x.vol} onBlur={this.setAmount}/>
        <input type="button" value="+"/>
        <input type="button" id={x.vol} value="В корзину" onClick={this.addToBusket}/></div>
        :<input type="button" value="Сообщить о наличии"/>
        }
      </div>}) 
      }
      
      <div className="describe">
          <div id="0" onClick={this.setContent}>Описание</div>
          <div id="1" onClick={this.setContent}>О бренде</div>
          <div className="content">
          {
            this.state.content?
            <div>{this.props.brands.brands.filter(y=>y.name==v.brand).map(y=><p>{y.info}</p>)}</div>
            :
            <div><p key="name">Полное наименование: {v.name}</p>
            <p key="brand">Бренд: {v.brand}</p>
            <p key="info">{v.info }</p>
            </div>
          }
          </div>
      </div>
      </div>})}
  </div>;
   
    

  }

}

const mapStateToProps = function (state) {
  return {
    brands: state.brands,  // Магазины
    products: state.products,   //Товары
    user: state.user,
  };
};

export default connect(mapStateToProps)(Page_Product);
