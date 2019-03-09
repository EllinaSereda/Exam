import React from 'react';
import PropTypes from 'prop-types';
import './Catalog.css';
import { NavLink } from 'react-router-dom';
class Catalog extends React.PureComponent {

  static propTypes = {

    
  }



  //Устанавка  первой страницы после применения фильтров


  // Создаем массив брендов всех товаров


  render() {
    return <div className="Catalog">
    { this.props.products.map(v=> <div key={v.code} className='Product'>
        <NavLink key={v.code} to={"/product/"+v.code} exact className="PageLink" activeClassName="ActivePageLink"><img alt={0} key={0}  src={v.img[0]}/>
        <h3>{v.brand}</h3>
        <p>{v.name}</p>
        <div className="Volume">Объем, мл: {v.stock.sort((a,b)=>a.vol-b.vol).map(v=><span key={v.vol}>{v.vol} </span>)}
        <div className="Var">{v.stock.length} варианта</div></div>
        <div className="Price">{Math.min.apply(null,v.stock.map(v=>v.price))} - {Math.max.apply(null,v.stock.map(v=>v.price))} руб.</div>
        <input type="button" value="Выбрать" className="hidden"/>
        </NavLink>
    </div>)
    }
    </div>
   
    

  }

}




export default Catalog;
