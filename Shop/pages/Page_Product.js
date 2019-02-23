import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './PageProduct.css';
class Page_Product extends React.PureComponent {

  static propTypes = {
    
  };
  state={
    info:null,
    bigImg:0,
  }
  
  
  setBigImg=(EO)=>{             
  console.log(EO.target.alt);
  this.setState({bigImg:EO.target.alt})
  }

  render() {
    console.log('Page_Product render');
    const id = this.props.match.params.id;
    let code;
    this.state.info?
    code=this.state.info.goods.filter(v=>v.code==id).map(v=>
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
      <div>Объем, мл:{v.stock.sort((a,b)=>a.vol-b.vol).map(v=><span>{v.vol}</span>)}
      <div>{v.stock.length} варианта</div></div>
      <div>{Math.min.apply(null,v.stock.map(v=>v.price))}-{Math.max.apply(null,v.stock.map(v=>v.price))}</div>
      </div>})
    : code=<div className='load'> Загрузка...</div> ;
    return  <div className='PageProduct' >{code}</div>;
   
    

  }

}

export default Page_Product;

   //ДЛЯ СТРАНИЦЫ ОПИСАНИЯ ТОВАРА