import React from 'react';
import PropTypes from 'prop-types';
import './BrandInfo.css';
import firebase from 'firebase';
class BrandInfo extends React.PureComponent {

  static propTypes = {
    info:PropTypes.shape(
      {
        code:PropTypes.number,
        info:PropTypes.String,
        name:PropTypes.String,
        imgURL:PropTypes.String,
      } 
    )
  };

  render() {
    
    /*console.log('BrandDesk Render');
    var code=this.props.info.brands.map(v=>{
      return <img src={v.imgURL} key={v.code}/>
    })*/
    
    return <div className="BrandInfo">
    <h2>{this.props.info.name}</h2>
    <img src={this.props.info.imgURL}/>
    <p>{this.props.info.info}</p>
    </div> ;

  }

}

export default BrandInfo;
