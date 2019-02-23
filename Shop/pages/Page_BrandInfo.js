import React from 'react';
import PropTypes from 'prop-types';
import BrandInfo from '../components/BrandInfo';
import {connect} from 'react-redux';

class Page_BrandInfo extends React.PureComponent {

  static propTypes = {
    
  };
  state={
      info:null,
  }

    

  render() {
    console.log('Page_BrandsInfo render');
    const name = this.props.match.params.name;
    let brand=this.props.brands.brands.filter(v=>v.name==name)[0];
    return <BrandInfo info={brand} /> ;;
    
   
    

  }

}

const mapStateToProps = function (state) {
  return {
    brands: state.brands,  // Магазины
  };
};

export default connect(mapStateToProps)(Page_BrandInfo);