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
    amount:null,
    n:0,
  }
  
  componentDidMount(){
    voteEvents.addListener('AddBusket',this.addToBusket);
    let hash={};
    console.log(this.props.products.products);
    this.props.products.products.filter(v=>v.code==this.props.match.params.id)[0].stock.forEach(v => {
      hash[v.vol]=1;
    });
    this.setState({amount:hash})
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
    if (this.props.user.info!==null){
      let product=this.props.user.info.order;

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
            storage[this.props.match.params.id][EO.target.id]+=this.state.amount[EO.target.id];
          }
          else{
            storage[this.props.match.params.id][EO.target.id]=this.state.amount[EO.target.id];
          }
        }
        else{
          storage[this.props.match.params.id]={[EO.target.id]:this.state.amount[EO.target.id]};
        }
 
        localStorage.setItem('parfumShop_busket',JSON.stringify(storage));
      }
      else{
        localStorage.setItem('parfumShop_busket',JSON.stringify({[this.props.match.params.id]:{[EO.target.id]:this.state.amount[EO.target.id]}}));
      }
      }
    }
  }

  render() {
    console.log('Page_Product render');

  //delete localStorage.parfumShop_busket;

    const id = Number(this.props.match.params.id);
    let product=this.props.products.products.filter(v=>v.code==id);

    return  <div className='PageProduct' >{product.map(v=>
      
      {
        let img=[];
        img.push(v.img.map((v,i)=><img alt={i} key={i} className='small' onClick={this.setBigImg} src={v}/>));
       
      return <div className='Product'>
        <Product amount={this.state.amount} img={img} prod={v}/>
        <div className="describe">
          <div className="Part">
            <span class={this.state.content==0?"title active":"title"} id="0" onClick={this.setContent}>Описание</span>
            <span class={this.state.content==1?"title active":"title"} id="1" onClick={this.setContent}>О бренде</span>
          </div>
          <div className="content">
          {
            this.state.content?
            <div>{this.props.brands.brands.filter(y=>y.name==v.brand).map(y=><p>{y.info}</p>)}</div>
            :
            <div><p key="name"><span class="bold">Полное наименование:</span> {v.name}</p>
            <p key="brand"><span class="bold">Бренд:</span> {v.brand}</p>
            <p key="info">{v.info }</p>
            </div>
          }
        </div>
      </div>
      {
        this.props.products.products.filter(v=>(product[0].brand==v.brand&&v.code!=product[0].code)).length!=0?
        <div class="ProdBrand">
         <h6>Другие товары фирмы {product[0].brand}</h6>
          <div>
          {
            this.props.products.products.filter(v=>(product[0].brand==v.brand&&v.code!=product[0].code)).map(v=>{
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
