import React from 'react';
import PropTypes from 'prop-types';


class StoreInfo extends React.PureComponent {

  static propTypes = {
    info:PropTypes.shape(
        {
            adress:PropTypes.String,
            code:PropTypes.number,
            tel:PropTypes.array,
            time:PropTypes.array,
            img:PropTypes.String,
              
        } 
      )
  };



  render() {
    let time=this.props.info.time.map((v,i)=><p key={i}>{v}</p>);
    let tel=this.props.info.tel.map((v,i)=><p key={i}>{v}</p>);
    return <div className="StoreInfo">
     <img src={this.props.info.img}/>
     <div>Режим работы: {time}</div>
     <div>Телефон: {tel}</div>
    </div>

  }

}

export default StoreInfo;
