import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './BrandDesk.css';


class BrandDesk extends React.PureComponent {

  static propTypes = {
    info:PropTypes.arrayOf(
      PropTypes.shape({
        code:PropTypes.number,
        info:PropTypes.String,
        name:PropTypes.String,
        imgURL:PropTypes.String,
      } )),
  };
  

  render() {
    console.log('BrandDesk Render');
    var code=this.props.info.map(v=>{
      let clicked=v.name;
      return <NavLink key={v.code} to={"/brands/"+clicked} exact className="PageLink" activeClassName="ActivePageLink"><img src={v.imgURL} /></NavLink> 
    })

    return <div className="BrandDesk">
    {code}
    </div> ;

  }

}

export default BrandDesk;
