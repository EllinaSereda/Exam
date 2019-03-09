import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { news_create } from '../redux/NewsAC';
import {voteEvents} from '../events';
import { products_create, products_search } from '../redux/ProductsAC';
import { brands_create } from '../redux/BrandsAC';
import { about_create } from '../redux/AboutAC';
import { user_create } from '../redux/UserAC';
import MainComponent from '../components/MainComponent/MainComponent'
import firebase from 'firebase';
import './reset.css';
import './Main.css';


 

class Main extends React.PureComponent {
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
    about:PropTypes.shape({
          about:PropTypes.object,
        }),
    news:PropTypes.shape({
          news:PropTypes.array,
        }),
  }

  state={
    ready:null,
  }

  componentDidMount(){
    voteEvents.addListener('Search',this.search);
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
    search=(EO)=>{
      this.props.dispatch(products_search(EO)); 
      
    }
componentWillUnmount = () => {
  voteEvents.removeListener('Search',this.search);
};

    

render() {
let code=null;
this.state.ready?
code=<MainComponent user={this.props.user} />
: code=<div className="Loading"><div className="lds-facebook"><div></div><div></div><div></div></div></div>;
return code;
       

  }

}
const mapStateToProps = function (state) {
    return {
     // весь раздел Redux state под именем counters будет доступен
      brands: state.brands,
      news: state.news,   //Файл с новостями 
      products: state.products,
      about: state.about,
      user: state.user,
    };
};
  
export default connect(mapStateToProps)(Main);