import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import './PageBrandInfo.css';

class Page_BrandInfo extends React.PureComponent {

  static propTypes = {
    
  };
  state={
      info:null,
  }

    

  render() {
    console.log('Page_BrandInfo render');
    const name = this.props.match.params.name;
    let brand=this.props.brands.brands.filter(v=>v.name==name)[0];
    return <div className="PageBrandInfo"><div className="BrandInfo">
    <div class="line"><span>{brand.name}</span></div>
    <img class="brand" src={brand.imgURL}/>
    <p>{brand.info}</p>
    {
        <div class="ProdBrand">
         <div class="line"><span>Товары</span></div>
          <div class="pr">
          {
            this.props.products.products.filter(v=>(brand.name==v.brand)).map(v=>{
              return <div key={v.code} className='CatalogProduct'>
              <NavLink key={v.code} to={"/catalog/product/"+v.code} exact className="PageLink" activeClassName="ActivePageLink"><img alt={0} key={0}  src={v.img[0]}/>
              <h3>{v.brand}</h3>
              <p>{v.name}</p>
              <div class="Volume">Объем, мл: {v.stock.sort((a,b)=>a.vol-b.vol).map(v=><span key={v.vol}>{v.vol} </span>)}
              <div class="Var">{v.stock.length} варианта</div></div>
              <div class="Price">{Math.min.apply(null,v.stock.map(v=>v.price))} - {Math.max.apply(null,v.stock.map(v=>v.price))} руб.</div>
              <input type="button" value="Выбрать" class="hidden"/>
              </NavLink>
            </div>
          })
        }
        </div>
        </div>
      }
    </div> 
    </div>;
    
   
    

  }

}

const mapStateToProps = function (state) {
  return {
    brands: state.brands, 
    products:state.products, 
  };
};

export default connect(mapStateToProps)(Page_BrandInfo);