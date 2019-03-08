import React from 'react';
import PropTypes from 'prop-types';
import './PageCatalog.css';
import Form from'../../components/Form';
import Catalog from '../../components/Catalog/Catalog';
import {sort} from '../../modules/sort';
import {min} from '../../modules/min';
import {minvol} from '../../modules/minvol';
import {maxvol} from '../../modules/maxvol';
import {max} from '../../modules/max';
import {brand} from '../../modules/brand';
import {sex} from '../../modules/sex';
import {connect} from 'react-redux';
import {voteEvents} from '../../events';
import { NavLink } from 'react-router-dom';
class Page_Catalog extends React.PureComponent {

  static propTypes = {
    products:PropTypes.shape({
        products:PropTypes.array,
        search:PropTypes.array,
      }),
    savedFilter:PropTypes.array,
  };
  state={
    info:null,
    bigImg:0,
    prodNumber:3,
    prodTotal:null,
    startElem:0,
    sort:0,
    upd:0,
    updP:0,
  }

  componentDidMount = () => {
    voteEvents.addListener('EFilterSaved',this.setStartPage);  //Сохранение формы
  };

  componentWillUnmount = () => {
    voteEvents.removeListener('EFilterSaved',this.setStartPage);
  };


  //Устанавка  первой страницы после применения фильтров

  setStartPage=()=>{
    this.props.history.push('1');
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
    console.log(this.props.match.params);
    let result;
    typeP?
    result=this.props.products.search:
    result=this.props.products.products;
    result=brand(result, this.props.savedFilter.savedBrands);
    result=min(result, this.props.savedFilter.sminprice);
    result=max(result, this.props.savedFilter.smaxprice);
    result=minvol(result, this.props.savedFilter.sminvolume);
    result=maxvol(result, this.props.savedFilter.smaxvolume);
    result=sex(result, this.props.savedFilter.ssex);
    return result;
  }

  sortProducts=(prod)=>{
    return sort(prod,this.state.sort);
  }
  change=(EO)=>{
    this.setState({upd:EO.target.textContent});
  }
  changeP=(EO)=>{
 
    this.setState({updP:EO.target.textContent});

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
        pages[i]=<NavLink key={i} to={"/catalog/"+this.props.match.params.amount+"/"+i} exact className="PageLink" activeClassName="ActivePageLink"><span onClick={this.changeP} className={Number(this.props.match.params.page)==i?"active":null}>{i}</span></NavLink>
        }
    }  
    
    code=products.slice(Number(this.props.match.params.amount)*(Number(this.props.match.params.page)-1),Number(this.props.match.params.amount)*(Number(this.props.match.params.page)-1) + Number(this.props.match.params.amount));
  
    console.log(code);
    return  <div className='PageCatalog' >
    <Form brands={this.brands()}/>
    <div className="Show">
    <NavLink key={4} to={"/catalog/"+4+"/"+1} exact className="PageLink" activeClassName="ActivePageLink"><span onClick={this.change} className={Number(this.props.match.params.amount)==4?"active":null}>4</span></NavLink>
    <NavLink key={5} to={"/catalog/"+5+"/"+1} exact className="PageLink" activeClassName="ActivePageLink"><span onClick={this.change} className={Number(this.props.match.params.amount)==5?"active":null}>5</span></NavLink> 
    <NavLink key={10} to={"/catalog/"+10+"/"+1} exact className="PageLink" activeClassName="ActivePageLink"><span onClick={this.change} className={Number(this.props.match.params.amount)==10?"active":null}>10</span></NavLink> 
    <NavLink key="all" to={"/catalog/"+this.props.products.products.length+"/"+1} exact className="PageLink" activeClassName="ActivePageLink"><span onClick={this.change} className={Number(this.props.match.params.amount)==this.props.products.products.length?"active":null}>all</span></NavLink> 
    </div>
    {sortVariants}
    <Catalog  products={code}/>
    <div className='Pages'>
    {Number(this.props.match.params.page)>1?<NavLink key={"prev"} to={"/catalog/"+this.props.match.params.amount+"/"+(Number(this.props.match.params.page)-1)} exact className="PageLink" activeClassName="ActivePageLink"><span onClick={this.changeP}>Предыдущая</span></NavLink>:null}
     {pages}
   {Number(this.props.match.params.page)!=(Math.ceil(products.length/Number(this.props.match.params.amount)))?<NavLink key={"nexr"} to={"/catalog/"+this.props.match.params.amount+"/"+(Number(this.props.match.params.page)+1)} exact className="PageLink" activeClassName="ActivePageLink"><span onClick={this.changeP}>Следующая</span></NavLink>:null}
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
