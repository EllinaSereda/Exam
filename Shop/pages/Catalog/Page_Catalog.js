import React from 'react';
import PropTypes from 'prop-types';
import './PageCatalog.css';
import Form from'../../components/Form';
import {connect} from 'react-redux';
import {voteEvents} from '../../events';
import { NavLink } from 'react-router-dom';
class Page_Catalog extends React.PureComponent {

  static propTypes = {
    
  };
  state={
    info:null,
    bigImg:0,
    prodNumber:3,
    prodTotal:null,
    startElem:0,
    sort:0,
  }

  componentDidMount = () => {
    voteEvents.addListener('EFilterSaved',this.setStartPage);  //Сохранение формы
    
    
  };

  componentWillUnmount = () => {
    voteEvents.removeListener('EFilterSaved',this.setStartPage);
  };


  //Устанавка числа отображающихся товаров

  setItems=(EO)=>{   
    this.setState({prodNumber:Number(EO.target.textContent)});
  }

  
  setStartPage=()=>{ //Уставливаем 1 страницу
    this.setState({
      startElem:0,
    })
  }

  // Изменение номера страницы

  changePage=(EO)=>{
    this.setState({
      startElem:Number((EO.target.textContent-1))*this.state.prodNumber
    })
  }

  // Показать все товары

  showAll=(EO)=>{
    this.setState({
      startElem:0,
      prodNumber:this.props.products.products.length,
    })
  }

  setSort=(EO)=>{
    this.setState({sort:Number(EO.target.value),startElem:0})
  }

  // Создаем массив брендов всех товаров

  brands=()=>{
    let brands=[];
    this.props.products.products.map(v=>{
      if (!brands.some(x=>x==v.brand)){
        brands.push(v.brand)
      }
    })
    return brands.sort((a,b)=>a-b);
  }

  filterProducts=()=>{
    let result=this.props.products.products;
    if (this.props.savedFilter.savedBrands.length!=0){    
     result=result.filter(v=>
        {return this.props.savedFilter.savedBrands.some(x=>x==v.brand)})
    }
    if (this.props.savedFilter.sminprice!==null){
      result=result.filter(v=>
          {return v.stock.some(x=>x.price>=this.props.savedFilter.sminprice)})
    }
    if (this.props.savedFilter.smaxprice!==null){
      result=result.filter(v=>
          {return v.stock.some(x=>x.price<=this.props.savedFilter.smaxprice)})
    }
    if (this.props.savedFilter.sminvolume!==null){
      result=result.filter(v=>
          {return v.stock.some(x=>x.vol>=this.props.savedFilter.sminvolume)})
    }
    if (this.props.savedFilter.smaxvolume!==null){
      result=result.filter(v=>
          {return v.stock.some(x=>x.vol<=this.props.savedFilter.smaxvolume)})
    }
    if (this.props.savedFilter.ssex.length!=0){
      result=result.filter(v=> this.props.savedFilter.ssex.some(x=>x==v.sex));
    }
    return result;
  }

  sortProducts=(prod)=>{
    switch (this.state.sort){
      case 0: 
      prod=prod.sort((a,b)=>  {
        return a.code-b.code;
      });
      break;
      case 1:
      prod=prod.sort((a,b)=>{
        if ( a.name<b.name )  return -1;
        if ( a.name>b.name )  return 1;
        return 0;});
      break;
      case 2:
      prod=prod.sort((a,b)=>{
        if ( a.name<b.name )  return 1;
        if ( a.name>b.name )  return -1;
        return 0;});
      break;
      case 3:
      prod=prod.sort((a,b)=>  {
        return Math.min.apply(null,a.stock.map(v=>v.price))-Math.min.apply(null,b.stock.map(v=>v.price));
      });
      break;
      case 4:
      prod=prod.sort((a,b)=>  {
        return Math.min.apply(null,b.stock.map(v=>v.price))-Math.min.apply(null,a.stock.map(v=>v.price));
      });
      break;
      case 5:
      prod=prod.sort((a,b)=>{
        if ( a.brand<b.brand )  return -1;
        if ( a.brand>b.brand )  return 1;
        return 0;});
      break;
      case 6:
      prod=prod.sort((a,b)=>{
        if ( a.brand<b.brand )  return 1;
        if ( a.brand>b.brand )  return -1;
        return 0;});
      break;
    }
    return prod;
  }





  render() {

    console.log('Page_Catalog render');
    console.log(this.props.savedFilter)
    let code;
    let products;
    let pages=[];
    products=this.filterProducts();
    products=this.sortProducts(products);
    console.log(products); //фильтрация по отмеченным брендам
    let sortVariants=<select defaultValue="null" onChange={this.setSort}>
      <option value="0">По популярности</option>
      <option value="1">Сортировка A-Я</option>
      <option value="2">Сортировка Я-А</option>
      <option value="3">Начинать с дешевых</option>
      <option value="4">Начинать с дорогих</option>
      <option value="5">Сортировка бренды А-Я</option>
      <option value="6">Сортировка бренды Я-А</option>
    </select>
    

    
  if (products.length/this.state.prodNumber!=1){ 
    //Номера страниц
  for(let i=1;i<=Math.ceil(products.length/this.state.prodNumber);i++){
  pages[i]=<span key={i} onClick={this.changePage}>{i}</span>
  }
}  
    
    code=products.slice(this.state.startElem,this.state.startElem + this.state.prodNumber);
    code=code.map(v=>
      {return <div key={v.code} className='Product'>
        <NavLink key={v.code} to={"/catalog/"+v.code} exact className="PageLink" activeClassName="ActivePageLink"><img alt={0} key={0}  src={v.img[0]}/></NavLink>
        <h3>{v.brand}</h3>
        <p>{v.name}</p>
        <div>Объем, мл:{v.stock.sort((a,b)=>a.vol-b.vol).map(v=><span key={v.vol}>{v.vol}</span>)}
        <div>{v.stock.length} варианта</div></div>
        <div>{Math.min.apply(null,v.stock.map(v=>v.price))}-{Math.max.apply(null,v.stock.map(v=>v.price))}</div>
      </div>})



    
    return  <div className='PageCatalog' >
    {sortVariants}
    <Form brands={this.brands()}/>
    <div>
      <span key={4} onClick={this.setItems}>4</span>
      <span key={5} onClick={this.setItems}>5</span>
      <span key={10}  onClick={this.setItems}>10</span>
      <span key={'all'} onClick={this.showAll}>Показать все</span>
    </div>
      
    {code}
    <div className='Pages'>
     {pages}
    </div>
    </div>;
   
    

  }

}


const mapStateToProps = function (state) {
  return {

    savedFilter: state.formSort,  //Бренды выбранные в формк
    products: state.products,   //Товары
  };
};

export default connect(mapStateToProps)(Page_Catalog);