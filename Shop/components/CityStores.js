import React from 'react';
import PropTypes from 'prop-types';
import StoreInfo from './StoreInfo';
import './CityStores.css'
class CityStores extends React.PureComponent {

  static propTypes = {
    info:PropTypes.shape(
        {
          code:PropTypes.number,
          name:PropTypes.String,
          shops:PropTypes.arrayOf(
            PropTypes.shape({
                adress:PropTypes.String,
                code:PropTypes.number,
                tel:PropTypes.array,
                time:PropTypes.array,
                img:PropTypes.String,})
              
          ),
        } 
      )
  }
  componentDidMount(){
      console.log('компонент построен')
  }

  state={
    checked:100, //выбранный адрес
  }

  show=(EO)=>{
    this.setState({checked:EO.target.value})
  }



  render() {
    console.log('CityStores did Render');
    let code=this.props.info.shops.map(v=>{ //массив с адресаними магазинов
    return <span key={v.code}><input  onChange={this.show} checked={v.code==this.state.checked?true:false} type="radio"  value={v.code} id={v.code} name='filial'/>
    <label htmlFor={v.code}>{v.adress}</label></span> 
    });


    return <div className="CityStores"> 
     <div >{code}</div>
     <StoreInfo info={this.props.info.shops.filter(v=>v.code==this.state.checked)[0]}/> 
    </div>  //Блок с инофрмацией о магазине: фото, режим работы

  }

}

export default CityStores;
