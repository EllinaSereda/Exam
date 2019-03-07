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


  //Устанавка  первой страницы после применения фильтров

  setStartPage=()=>{
    console.log(this.props.history.push('1'));
    this.props.history.push('1')
  }
  

  setSort=(EO)=>{
    this.setState({sort:Number(EO.target.value)});
    this.setStartPage();
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
    let typeP=this.props.match.params.s;
    let result;
    typeP?
    result=this.props.products.search:
    result=this.props.products.products;
    console.log(typeP);
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
    let code;
    let products;
    products=this.filterProducts();
    products=this.sortProducts(products);
  //фильтрация по отмеченным брендам
    let sortVariants=<select defaultValue="null" onChange={this.setSort}>
      <option value="0">По популярности</option>
      <option value="1">Сортировка A-Я</option>
      <option value="2">Сортировка Я-А</option>
      <option value="3">Начинать с дешевых</option>
      <option value="4">Начинать с дорогих</option>
      <option value="5">Сортировка бренды А-Я</option>
      <option value="6">Сортировка бренды Я-А</option>
    </select>
    
    //Номера страниц
    let pages=[];  
    if (products.length/Number(this.props.match.params.amount)!=1){ 
        for(let i=1;i<=Math.ceil(products.length/Number(this.props.match.params.amount));i++){
        pages[i]=<NavLink key={i} to={"/catalog/"+this.props.match.params.amount+"/"+i} exact className="PageLink" activeClassName="ActivePageLink"><span className={Number(this.props.match.params.page)==i?"active":null}>{i}</span></NavLink>
        }
    }  
    
    code=products.slice(Number(this.props.match.params.amount)*(Number(this.props.match.params.page)-1),Number(this.props.match.params.amount)*(Number(this.props.match.params.page)-1) + Number(this.props.match.params.amount));
    code=code.map(v=>
      {return <div key={v.code} className='Product'>
        <NavLink key={v.code} to={"/catalog/product/"+v.code} exact className="PageLink" activeClassName="ActivePageLink"><img alt={0} key={0}  src={v.img[0]}/>
        <h3>{v.brand}</h3>
        <p>{v.name}</p>
        <div class="Volume">Объем, мл: {v.stock.sort((a,b)=>a.vol-b.vol).map(v=><span key={v.vol}>{v.vol} </span>)}
        <div class="Var">{v.stock.length} варианта</div></div>
        <div class="Price">{Math.min.apply(null,v.stock.map(v=>v.price))} - {Math.max.apply(null,v.stock.map(v=>v.price))} руб.</div>
        <input type="button" value="Выбрать" class="hidden"/>
        </NavLink>
      </div>})



    
    return  <div className='PageCatalog' >
    <Form brands={this.brands()}/>
    <div className="Show">
    <NavLink key={4} to={"/catalog/"+4+"/"+1} exact className="PageLink" activeClassName="ActivePageLink"><span className={Number(this.props.match.params.amount)==4?"active":null}>4</span></NavLink>
    <NavLink key={5} to={"/catalog/"+5+"/"+1} exact className="PageLink" activeClassName="ActivePageLink"><span className={Number(this.props.match.params.amount)==5?"active":null}>5</span></NavLink> 
    <NavLink key={10} to={"/catalog/"+10+"/"+1} exact className="PageLink" activeClassName="ActivePageLink"><span className={Number(this.props.match.params.amount)==10?"active":null}>10</span></NavLink> 
    <NavLink key="all" to={"/catalog/"+this.props.products.products.length+"/"+1} exact className="PageLink" activeClassName="ActivePageLink"><span className={Number(this.props.match.params.amount)==this.props.products.products.length?"active":null}>all</span></NavLink> 
    </div>
    {sortVariants}
    <div className="Prod">
    {code}
    </div>  
    <div className='Pages'>
    {Number(this.props.match.params.page)>1?<NavLink key={"prev"} to={"/catalog/"+this.props.match.params.amount+"/"+(Number(this.props.match.params.page)-1)} exact className="PageLink" activeClassName="ActivePageLink"><span>Предыдущая</span></NavLink>:null}
     {pages}
   {Number(this.props.match.params.page)!=(Math.ceil(products.length/Number(this.props.match.params.amount)))?<NavLink key={"nexr"} to={"/catalog/"+this.props.match.params.amount+"/"+(Number(this.props.match.params.page)+1)} exact className="PageLink" activeClassName="ActivePageLink"><span>Следующая</span></NavLink>:null}
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
/*// <span key={5} onClick={this.setItems}>5</span>
      <span key={10}  onClick={this.setItems}>10</span>
      <span key={'all'} onClick={this.showAll}>Показать все</span>*/