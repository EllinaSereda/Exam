import React from 'react';
import PropTypes from 'prop-types';
import './PageAbout.css';
import {connect} from 'react-redux';
import CityStores from '../components/CityStores';
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
  return <div className="PageAbout">О нас
    <div>
      <p>{this.props.about.about.info}</p>
      <div className="City">
      {this.props.about.about.shops.map((v)=>{   //Массив с городами
          return <div key={v.code}>
          <input onChange={this.showAdress} checked={v.code==this.state.checked?true:false} type="radio"  value={v.code} id={v.name} name='store'/>
          <label htmlFor={v.name}>{v.name}</label>
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