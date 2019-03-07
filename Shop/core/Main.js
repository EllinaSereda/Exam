import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import {connect} from 'react-redux';
import PagesRouter from '../pages/PagesRouter';
import { NavLink } from 'react-router-dom';
import { news_create } from '../redux/NewsAC';
import { products_create, products_search } from '../redux/ProductsAC';
import { brands_create } from '../redux/BrandsAC';
import { about_create } from '../redux/AboutAC';
import { user_create } from '../redux/UserAC';
import firebase from 'firebase';
import './reset.css';
import './Main.css';


 

class Main extends React.PureComponent {
  state={
    ready:null,
    search:null,
    searchInput:null,
    open:0,
  }

  componentDidMount(){
  let promises=[];
   const newsRef = firebase.firestore().doc('MainPage/slider').get();
   promises.push(newsRef);
   const productsRef =firebase.firestore().doc('MainPage/catalog').get();
   promises.push(productsRef);
   const brandsRef =firebase.firestore().doc('MainPage/brands').get();
   promises.push(brandsRef);
   const aboutRef =firebase.firestore().doc('MainPage/about').get();
   promises.push(aboutRef);
 

   //ИНИЦИАЛИЗАЦИЯ ЮЗЕРА//
  firebase.auth().onAuthStateChanged((user)=> {
    if (user) {
  firebase.firestore().doc('Users/Users').get()
    .then ((doc)=>{
      if (doc){
        let log=doc.data()[user.email];
        console.log(log);
        this.props.dispatch(user_create(log)); 
      }
    })
    .catch(()=>{
      console.log('Error')
    })
    } 
  });

    Promise.all(promises)
    .then((values)=>{
        this.props.dispatch(news_create(values[0].data()) );
        this.props.dispatch(products_create(values[1].data()) );
        this.props.dispatch(brands_create(values[2].data()) );
        this.props.dispatch(about_create(values[3].data()) );
       
        this.setState({ready:1});
    })
    .catch(()=>{
        console.log('Error')
      })
    }
    /*firebase.firestore().doc('MainPage/slider').get()
    .then((doc)=>{
      this.props.dispatch(news_create(doc.data()) );
      return firebase.firestore().doc('MainPage/catalog').get();
    })
    .then((doc)=>{
      this.props.dispatch(products_create(doc.data()))
      
      //return 
    })
  }*/
  initUser=(account)=>{
    
  }
  search=()=>{
    let result=this.state.searchInput;
    this.props.dispatch(products_search(result)); 
    
  }
  setSearch=(EO)=>{
    this.setState({searchInput:EO.target.value})
    
    console.log('dsv');
  }
  open=()=>{
    let x=this.state.open;
    let res;
    x?res=0:res=1;
    this.setState({open:res});
  }
  close=()=>{
    this.setState({open:0});
  }

    

render() {
//firebase.auth().signOut();
console.log('Main_render')
let code=null;
this.state.ready?
code=<BrowserRouter>
      <div className="Main"> 
      <div className="Computer">
        <div className="Head">
          <div className="sideRight">
            <NavLink to={this.props.user.info!==null?"/account":"/registration"} exact className="PageLink" activeClassName="ActivePageLink"><img className="Icons" src="https://firebasestorage.googleapis.com/v0/b/finalproject-d5d17.appspot.com/o/fonts%2Fuser-shape.png?alt=media&token=8f6275a5-6fda-46bc-b881-5602ac16e9e5"/></NavLink>
            <NavLink to="/order" exact className="PageLink" activeClassName="ActivePageLink"><img className="Icons" src="https://firebasestorage.googleapis.com/v0/b/finalproject-d5d17.appspot.com/o/fonts%2Fshopping-cart-black-shape%20(3).png?alt=media&token=a7812a2b-bfc0-40fd-ac35-319abbf0d3ab"/></NavLink>
          </div>
          <NavLink to="/" exact className="PageLink" activeClassName="ActivePageLink">
            <div className="Namecent">
	            <h2 className="name"><span class="l">Eau de</span><span class="r">Parfume</span></h2>
            </div>
          </NavLink>
       </div>
       <nav>
           <ul className="MainMenu">
              <li><NavLink to="/" exact className="PageLink" activeClassName="ActivePageLink">
               <span className="roll">
				          <span className="seen">Главная</span>
				          <span className="hover">Главная</span>
			          </span>
               </NavLink></li>
               <li><NavLink to={"/catalog/"+5+"/"+1} exact className="PageLink" activeClassName="ActivePageLink">
                <span className="roll">
				          <span className="seen">Каталог</span>
				          <span className="hover">Каталог</span>
			          </span>
               </NavLink></li>
               <li><NavLink to="/brands" exact className="PageLink" activeClassName="ActivePageLink">
               <span className="roll">
				          <span className="seen">Бренды</span>
				          <span className="hover">Бренды</span>
			          </span>
               </NavLink></li>
               <li><NavLink to="/news" exact className="PageLink" activeClassName="ActivePageLink">
               <span className="roll">
				          <span className="seen">Новости</span>
				          <span className="hover">Новости</span>
			          </span>
               </NavLink></li>
               <li><NavLink to="/about" exact className="PageLink" activeClassName="ActivePageLink">
               <span className="roll">
				          <span className="seen">О нас</span>
				          <span className="hover">О нас</span>
			          </span>
               </NavLink></li>
           </ul>
       </nav>
       </div>
       
       <div className="Adaptive">
       <nav>
       <NavLink to="/order" exact className="PageLink" activeClassName="ActivePageLink"><img className="IconsBurg" src="https://firebasestorage.googleapis.com/v0/b/finalproject-d5d17.appspot.com/o/fonts%2Fshopping-cart-black-shape%20(3).png?alt=media&token=a7812a2b-bfc0-40fd-ac35-319abbf0d3ab"/></NavLink>
         <div className="burg" onClick={this.open}>b</div>
           <ul className={"AdaptMenu " + (this.state.open?"open":"close")}>
              <li><NavLink onClick={this.close} to="/" exact className="PageLink" activeClassName="ActivePageLink">
             Главная
               </NavLink></li>
               <li><NavLink onClick={this.close} to={"/catalog/"+5+"/"+1} exact className="PageLink" activeClassName="ActivePageLink">
                Каталог
               </NavLink></li>
               <li><NavLink onClick={this.close} to="/brands" exact className="PageLink" activeClassName="ActivePageLink">
               Бренды
               </NavLink></li>
               <li><NavLink onClick={this.close} to="/news" exact className="PageLink" activeClassName="ActivePageLink">
              Новости
               </NavLink></li>
               <li><NavLink onClick={this.close} to="/about" exact className="PageLink" activeClassName="ActivePageLink">
              О нас
               </NavLink></li>
               <li><NavLink onClick={this.close} to={this.props.user.info!==null?"/account":"/registration"} exact className="PageLink" activeClassName="ActivePageLink">
				          Личный кабинет
               </NavLink></li>
           </ul>
       </nav>
       </div>
       <div className="Search">
       <NavLink to={"/catalog/"+5+"/"+1+"/"+"s"} exact className="PageLink" activeClassName="ActivePageLink"><img className="SearchIcon" onClick={this.search} src="https://firebasestorage.googleapis.com/v0/b/finalproject-d5d17.appspot.com/o/fonts%2Fmagnifying-glass.png?alt=media&token=a847c8db-325c-48b9-b4c2-f0b1d348ff0a"/></NavLink> 
          <input type="text" onChange={this.setSearch} placeholder="Поиск"></input>
        </div>
       <PagesRouter/>
       <footer>
      <div className="ComputerFooter">
      <div className="logoFooter">
      <NavLink to="/" exact className="PageLink" activeClassName="ActivePageLink"><img  src="https://firebasestorage.googleapis.com/v0/b/finalproject-d5d17.appspot.com/o/footer.png?alt=media&token=461bc5ae-c096-4ac1-83c7-7a962079c41e" alt="#"/></NavLink> 
      </div>
      
       <ul className="FooterMenu">
              <li><NavLink to="/" exact className="PageLink" activeClassName="ActivePageLink">Главная</NavLink></li>
               <li><NavLink to={"/catalog/"+5+"/"+1} exact className="PageLink" activeClassName="ActivePageLink">Каталог</NavLink></li>
               <li><NavLink to="/brands" exact className="PageLink" activeClassName="ActivePageLink">Бренды</NavLink></li>
               <li><NavLink to="/news" exact className="PageLink" activeClassName="ActivePageLink">Новости</NavLink></li>
               <li><NavLink to="/about" exact className="PageLink" activeClassName="ActivePageLink">О нас</NavLink></li>
        </ul>
        <div className="thirdColomn">
            <p>СЛЕДИТЕ ЗА НАМИ</p>
            <a href="#"><img alt="vk" src="https://firebasestorage.googleapis.com/v0/b/finalproject-d5d17.appspot.com/o/fonts%2Fvk-social-network-logo.png?alt=media&token=a689c1c1-37ee-4add-9789-597c6a6b12bb"/></a> 
            <a href="#"><img alt="inst" src="https://firebasestorage.googleapis.com/v0/b/finalproject-d5d17.appspot.com/o/fonts%2Finstagram-social-network-logo-of-photo-camera.png?alt=media&token=920e206c-c6da-4e39-8e30-5ea4126ae0d5"/></a> 
            <a href="#"><img alt="tel" src="https://firebasestorage.googleapis.com/v0/b/finalproject-d5d17.appspot.com/o/fonts%2Ftelegram.png?alt=media&token=dd5a9b05-85ba-435e-a9da-73254e551450"/></a>    
        </div>
        </div>
        <div className="AdaptiveFooter">
        <span>СЛЕДИТЕ ЗА НАМИ</span>
            <a href="#"><img alt="vk" src="https://firebasestorage.googleapis.com/v0/b/finalproject-d5d17.appspot.com/o/fonts%2Fvk-social-network-logo.png?alt=media&token=a689c1c1-37ee-4add-9789-597c6a6b12bb"/></a> 
            <a href="#"><img alt="inst" src="https://firebasestorage.googleapis.com/v0/b/finalproject-d5d17.appspot.com/o/fonts%2Finstagram-social-network-logo-of-photo-camera.png?alt=media&token=920e206c-c6da-4e39-8e30-5ea4126ae0d5"/></a> 
            <a href="#"><img alt="tel" src="https://firebasestorage.googleapis.com/v0/b/finalproject-d5d17.appspot.com/o/fonts%2Ftelegram.png?alt=media&token=dd5a9b05-85ba-435e-a9da-73254e551450"/></a>
        </div>
       </footer>
       </div>
        </BrowserRouter>
      : code=<div className="Loading"><div className="lds-facebook"><div></div><div></div><div></div></div></div>;
      return code;
       

  }

}
const mapStateToProps = function (state) {
    return {
     // весь раздел Redux state под именем counters будет доступен
      // данному компоненту как this.props.counters
      brands: state.brands,
      news: state.news,   //Файл с новостями 
      products: state.products,
      about: state.about,
      user: state.user,
    };
};
  
export default connect(mapStateToProps)(Main);