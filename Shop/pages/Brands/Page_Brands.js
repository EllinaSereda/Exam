import React from 'react';
import PropTypes from 'prop-types';
import BrandDesk from '../../components/BrandDesk';
import {connect} from 'react-redux';



class Page_Brands extends React.PureComponent {

  static propTypes = {
    brands:PropTypes.shape(
      {
        brands:PropTypes.array,
        brandsMain:PropTypes.array,
      }),
  };
  state={
    
  }

  render() {
    console.log('Page_Brands render');
    return <div className="PageBrands"><BrandDesk info={this.props.brands.brands}/></div>;
   
    

  }

}
const mapStateToProps = function (state) {
  return {
    brands: state.brands,  // Магазины
  };
};

export default connect(mapStateToProps)(Page_Brands);
