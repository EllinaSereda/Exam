import React from 'react';
import PropTypes from 'prop-types';
import './PageAbout.css';
import {connect} from 'react-redux';
import CityStores from '../../components/CityStores';
class Page_About extends React.PureComponent {

  static propTypes = {
    
  };
  state={
    checked:0,  //выбранный город
  }
  
  
  showAdress=(EO)=>{     //устанавливаем выбранный город
        this.setState({checked:EO.target.value})
  }

 
  render() {
  console.log('Page_About render')
  return <div className="PageAbout">
  <h2>О нас</h2>
    <div>
    <h3>ДИСКОНТНАЯ КАРТА</h3>
    <p>Получение ДИСКОНТНОЙ КАРТЫ может быть осуществлено следующими способами:</p>
    <ul>
      <li>путем единовременной покупки на любую сумму;</li>
      <li>при проведении рекламных акций (кампаний).</li>
   </ul> 
   <h3>НАКОПЛЕНИЯ НА ДИСКОНТНОЙ КАРТЕ</h3>
   <p>Каждый покупатель, совершающий покупку на любую сумму, становится участником дисконтной программы. Правило распространяется на покупку товаров уже продающихся со скидкой, уценкой, а также на товары, участвующие в рекламных акциях, распродажах и т.п.</p>
   <p>С этого момента каждая покупка фиксируется на дисконтной карте, и при достижении общей суммы покупок 80 рублей покупателю предоставляется скидка в размере 6% на каждую последующую покупку.</p>   
   <h3>АДРЕСА</h3>
      <div className="City">
      {this.props.about.about.shops.map((v)=>{   //Массив с городами
          return <div key={v.code}>
          <input onChange={this.showAdress}  checked={v.code==this.state.checked?true:false} type="radio" hidden value={v.code} id={v.name} name='store'/>
          <label htmlFor={v.name}>{v.name.trim()}</label>
          </div>
      })} 
      </div>
      <CityStores key={this.state.checked} info={this.props.about.about.shops[this.state.checked]}/>  
      </div> 
    </div>;

  }

}

const mapStateToProps = function (state) {
  return {
    about: state.about,  // Магазины
  };
};

export default connect(mapStateToProps)(Page_About);
//