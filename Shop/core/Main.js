import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import {connect} from 'react-redux';
import PagesRouter from '../pages/PagesRouter';
import { NavLink } from 'react-router-dom';
import { news_create } from '../redux/News';
import { products_create } from '../redux/Products';
import { brands_create } from '../redux/Brands';
import { about_create } from '../redux/About';
import { user_create } from '../redux/User';
import firebase from 'firebase';
import './reset.css';
import './Main.css';


 

class Main extends React.PureComponent {
  state={
    ready:null,
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
    

render() {
//firebase.auth().signOut();
console.log('Main_render')
let code=null;
this.state.ready?
code=<BrowserRouter>
      <div className="Main"> <div className="Head">
        <NavLink to="/" exact className="PageLink" activeClassName="ActivePageLink">
          <div className="Namecent">
	          <h2 className="name"><span class="l">Eau de</span><span class="r">Parfume</span>
            </h2>
          </div>
        </NavLink>
        <input type="text"></input>
        
        {this.props.user.info!==null?<NavLink to="/account" exact className="PageLink" activeClassName="ActivePageLink">Личный кабинет</NavLink>:<NavLink to="/registration" exact className="PageLink" activeClassName="ActivePageLink">Рег/Вход</NavLink>}
        <NavLink to="/order" exact className="PageLink" activeClassName="ActivePageLink"><input type="button" value="Корзина"/></NavLink>
       </div>
       <nav>
           <ul className="MainMenu">

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
               <li><NavLink to="/discont" exact className="PageLink" activeClassName="ActivePageLink">
               <span className="roll disc">
				          <span className="seen">Дисконтная <br/>программа</span>
				          <span className="hover">Дисконтная программа</span>
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
       <PagesRouter/>
       {<footer>
       <NavLink to="/" exact className="PageLink" activeClassName="ActivePageLink"><img className="logoFooter" src="../images/logo.png" alt="#"/></NavLink> 
       <ul className="FooterMenu">
               <li><NavLink to="/catalog" exact className="PageLink" activeClassName="ActivePageLink">Каталог</NavLink></li>
               <li><NavLink to="/brands" exact className="PageLink" activeClassName="ActivePageLink">Бренды</NavLink></li>
               <li><NavLink to="/news" exact className="PageLink" activeClassName="ActivePageLink">Новости</NavLink></li>
               <li><NavLink to="/discont" exact className="PageLink" activeClassName="ActivePageLink">Дисконтная программа</NavLink></li>
               <li><NavLink to="/about" exact className="PageLink" activeClassName="ActivePageLink">О нас</NavLink></li>
        </ul>
        <div className="thirdColomn">
            <p>ifoabout</p>
            <input type="button" value="inst"/>
            <input type="button" value="Vk"/>
            <input type="button" value="facebook"/>
        </div>
       </footer>}
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