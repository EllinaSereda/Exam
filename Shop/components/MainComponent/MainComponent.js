import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import PagesRouter from '../../pages/PagesRouter';
import { NavLink } from 'react-router-dom';
import {voteEvents} from '../../events';
import './MainComponent.css';


 

class MainComponent extends React.PureComponent {
  static propTypes = {
    user:PropTypes.shape({
          info:PropTypes.object,
        }),
  }

  state={
    ready:null,
    search:null,
    searchInput:null,
    open:0,
  }

  
  
  search=()=>{
    let result=this.state.searchInput;
    voteEvents.emit('Search',result);

  }
  setSearch=(EO)=>{
    this.setState({searchInput:EO.target.value})
   
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
let presense=0;
  if (this.props.user.info){
    let i=0;
    for (let k in this.props.user.info.order ){
      for (let key in this.props.user.info.order[k] ){
        i+=this.props.user.info.order[k][key];
      }
    }
    i>0?presense=i:null;
  }

return <BrowserRouter>
  <div className="MainComponent"> 
      <div className="Computer">
        <div className="Head">
          <div className="sideRight">
            <NavLink to={this.props.user.info!==null?"/account":"/registration"} exact className="PageLink" activeClassName="ActivePageLink"><img className="Icons" src="https://firebasestorage.googleapis.com/v0/b/finalproject-d5d17.appspot.com/o/fonts%2Fuser-shape.png?alt=media&token=8f6275a5-6fda-46bc-b881-5602ac16e9e5"/></NavLink>
            <NavLink to="/order" exact className="PageLink" activeClassName="ActivePageLink"><img className="Icons" src="https://firebasestorage.googleapis.com/v0/b/finalproject-d5d17.appspot.com/o/fonts%2Fshopping-cart-black-shape%20(3).png?alt=media&token=a7812a2b-bfc0-40fd-ac35-319abbf0d3ab"/><span className={presense?"inBusket":null}>{presense?presense:null}</span></NavLink>
          </div>
          <NavLink to="/" exact className="PageLink" activeClassName="ActivePageLink">
            <div className="Namecent">
	            <h2 className="name"><span className="l">Eau de</span><span className="r">Parfume</span></h2>
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
               <li><NavLink to={"/catalog/"+5+"/"+1} aaa="bbb" exact className="PageLink" activeClassName="ActivePageLink">
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
       <NavLink to="/order" exact className="PageLink" activeClassName="ActivePageLink"><img className="IconsBurg" src="https://firebasestorage.googleapis.com/v0/b/finalproject-d5d17.appspot.com/o/fonts%2Fshopping-cart-black-shape%20(4).png?alt=media&token=139ed906-d1e3-4dda-978a-a8dd41705941"/><span className={presense?"inBusket":null}>{presense?presense:null}</span></NavLink>
         <div className="burg" onClick={this.open}><img src="https://firebasestorage.googleapis.com/v0/b/finalproject-d5d17.appspot.com/o/fonts%2Fmenu.png?alt=media&token=0674a144-2ccb-4128-9b00-fcf31006657c"/></div>
           <ul className={"AdaptMenu " + (this.state.open?"open":"close")}>
              <li><NavLink onClick={this.close} to="/" exact className="PageLink" activeClassName="ActivePageLink">
             Главная
               </NavLink></li>
               <li><NavLink onClick={this.close} to={"/catalog/"+10+"/"+1} exact className="PageLink" activeClassName="ActivePageLink">
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
       <NavLink to={"/catalog/"+10+"/"+1+"/"+"s"} exact className="PageLink" activeClassName="ActivePageLink"><img className="SearchIcon" onClick={this.search} src="https://firebasestorage.googleapis.com/v0/b/finalproject-d5d17.appspot.com/o/fonts%2Fmagnifying-glass.png?alt=media&token=a847c8db-325c-48b9-b4c2-f0b1d348ff0a"/></NavLink> 
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
               <li><NavLink to={"/catalog/"+10+"/"+1} exact className="PageLink" activeClassName="ActivePageLink">Каталог</NavLink></li>
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
       

  }

}

  
export default MainComponent;