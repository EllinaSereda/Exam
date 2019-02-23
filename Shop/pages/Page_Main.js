import React from 'react';
import PropTypes from 'prop-types';
import BrandDesk  from '../components/BrandDesk';
import Slider  from '../components/Slider'
import {connect} from 'react-redux';
import './PageMain.css';
class Page_Main extends React.PureComponent {

  static propTypes = {
    
  };
  state={
    slider:null,
    brands:null,
  }
      
    

  render() {
    console.log('Page_Main Render');
    console.log(this.props.slider.news);
    return <div className="PageMain">
    <p>dfdb</p>
    <Slider info={this.props.slider.news}/>
    <BrandDesk info={this.props.brands.brandsMain}/>
    </div>;

  }

}

const mapStateToProps = function (state) {
  return {
    brands: state.brands,  // Бренды
    slider: state.news,
  };
};

export default connect(mapStateToProps)(Page_Main);

