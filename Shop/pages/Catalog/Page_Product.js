import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import firebase from 'firebase';
import { NavLink } from 'react-router-dom';
import {voteEvents} from '../../events';
import {product_addtobusket} from '../../redux/UserAC';
import './PageProduct.css';
import Product from '../../components/Product/Product'
class Page_Product extends React.PureComponent {

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
  
  componentDidMount(){
    voteEvents.addListener('AddBusket',this.addToBusket);   
  }
  componentWillUnmount = () => {
    voteEvents.removeListener('AddBusket',this.addToBusket);
  };

  
  
  setBigImg=(EO)=>{             
  this.setState({bigImg:EO.target.alt})
  }

  setContent=(EO)=>{
    this.setState({content:Number(EO.target.id)})
  }


  addToBusket=(EO)=>{
    if(EO.target.id>0){
    if (this.props.user.info!==null){
      let product=this.props.user.info.order;

      if ([this.props.match.params.id] in product ){
        if ([EO.target.id] in product[this.props.match.params.id]){
          product[this.props.match.params.id][EO.target.id]+=EO.amount;
        }
        else{
          product[this.props.match.params.id][EO.target.id]=EO.amount;
        }
      }
      else{
        product[this.props.match.params.id]={[EO.target.id]:EO.amount};
      }
      
      this.props.dispatch(product_addtobusket(product));
      firebase.firestore().doc('Users/Users').set({
        [this.props.user.info.email]:{...this.props.user.info,order:product},
      })
    }
    else{
      if(localStorage.parfumShop_busket){

        let storage=JSON.parse(localStorage.parfumShop_busket);
        if ([this.props.match.params.id] in storage ){
          if ([EO.target.id] in storage[this.props.match.params.id]){
            storage[this.props.match.params.id][EO.target.id]+=EO.amount;
          }
          else{
            storage[this.props.match.params.id][EO.target.id]=EO.amount;
          }
        }
        else{
          storage[this.props.match.params.id]={[EO.target.id]:EO.amount};
        }
 
        localStorage.setItem('parfumShop_busket',JSON.stringify(storage));
      }
      else{
        localStorage.setItem('parfumShop_busket',JSON.stringify({[this.props.match.params.id]:{[EO.target.id]:EO.amount}}));
      }
      }
    }
  }

  render() {
    const id = Number(this.props.match.params.id);
    let product=this.props.products.products.filter(v=>v.code==id);

    return  <div className='PageProduct' >{product.map((v,i)=>
      
      {
      return <div key={i} className='Product'>
        <Product key="Product" prod={v}/>
        <div key="describe" className="describe">
          <div key="Part" className="Part">
            <span className={this.state.content==0?"title active":"title"} id="0" onClick={this.setContent}>Описание</span>
            <span className={this.state.content==1?"title active":"title"} id="1" onClick={this.setContent}>О бренде</span>
          </div>
          <div key="content" className="content">
          {
            this.state.content?
            <div key="aboutbrand">{this.props.brands.brands.filter(y=>y.name==v.brand).map((y,i)=><p key={i}>{y.info}</p>)}</div>
            :
            <div key="aboutprod"><p key="name"><span className="bold">Полное наименование:</span> {v.name}</p>
            <p key="brand"><span className="bold">Бренд:</span> {v.brand}</p>
            <p key="info">{v.info }</p>
            </div>
          }
        </div>
      </div>
      {
        this.props.products.products.filter(v=>(product[0].brand==v.brand&&v.code!=product[0].code)).length!=0?
        <div key="Brand" className="ProdBrand">
         <h6>Другие товары фирмы {product[0].brand}</h6>
          <div>
          {
            this.props.products.products.filter(v=>(product[0].brand==v.brand&&v.code!=product[0].code)).map(v=>{
              return <div key={v.code} className='CatalogProduct'>
              <NavLink key={v.code} to={"/product/"+v.code} exact className="PageLink" activeClassName="ActivePageLink"><img alt={0} key={0}  src={v.img[0]}/>
              <h3>{v.brand}</h3>
              <p>{v.name}</p>
              <div key="vol" className="Volume">Объем, мл: {v.stock.sort((a,b)=>a.vol-b.vol).map(v=><span key={v.vol}>{v.vol} </span>)}
              <div key="var" className="Var">{v.stock.length} варианта</div></div>
              <div key="price" className="Price">{Math.min.apply(null,v.stock.map(v=>v.price))} - {Math.max.apply(null,v.stock.map(v=>v.price))} руб.</div>
              <input type="button" value="Выбрать" className="hidden"/>
              </NavLink>
            </div>
          })
        }
        </div>
        </div>
        :
        null
      }
      
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
