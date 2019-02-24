import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {voteEvents} from '../events';
import { sex_change, reset_create, brandSort_change,minPrice_change,maxPrice_change,minVol_change,maxVol_change, form_changeSave } from '../redux/FormSort';


class Form extends React.PureComponent {

  static propTypes = {
  
  };

  state={
    reset:null,
  }
  componentDidMount(){
    this.props.dispatch(reset_create() );
  }
  setBrands=(EO)=>{
    this.props.dispatch(brandSort_change(EO.target.value) );
    //this.setState({savedFilter:newBr});
  }
  setMinPr=(EO)=>{
    this.props.dispatch(minPrice_change(Number(EO.target.value)) );
  }
  setMaxPr=(EO)=>{
    this.props.dispatch(maxPrice_change(Number(EO.target.value)) );
  }
  setMinVol=(EO)=>{
    this.props.dispatch(minVol_change(Number(EO.target.value)) );
  }
  setMaxVol=(EO)=>{
    this.props.dispatch(maxVol_change(Number(EO.target.value)) );
  }

  setSex=(EO)=>{
    this.props.dispatch(sex_change(EO.target.value) );

  }
  resetChanges=()=>{
    this.props.dispatch(reset_create() );
    this.setState({
      reset:true,
    })
  }

  saveChanges=()=>{
    this.props.dispatch(form_changeSave(this.props.savedFilter.brands) );
    //this.setState({savedFilter:newBr});
    voteEvents.emit('EFilterSaved',0);
    this.setState({
      reset:null,
    })
  }
  
  

  render() {
let code;
code=<form>  
    <p>Цена</p>             
    <label htmlFor='minPr'>От</label><input id='minPr' onBlur={this.setMinPr} type='number'/>
    <label htmlFor='maxPr'>До</label><input id='maxPr' onBlur={this.setMaxPr} type='number'/>
    <fieldset>      
      <legend>Бренд</legend>    
      {this.props.brands.map((v,i)=>
      <div key={i}>
        <input type="checkbox" checked={this.props.savedFilter.brands.some(x=>x==v)} name="brand" id={v} value={v} onChange={this.setBrands}/>
        <label htmlFor={v}>{v}</label>
      </div>)} 
    </fieldset> 
    <fieldset>      
      <legend>Для кого</legend>    
      <div key={1}>
        <input type="checkbox" name="sex" id={1} value={'m'} checked={this.props.savedFilter.sex.some(x=>x=='m')} onChange={this.setSex}/>
        <label htmlFor={1}>Мужской</label>
      </div>
      <div key={2}>
        <input type="checkbox" name="sex" id={2} value={'w'} checked={this.props.savedFilter.sex.some(x=>x=='w')} onChange={this.setSex}/>
        <label htmlFor={2}>Женский</label>
      </div>
      <div key={3}>
        <input type="checkbox" name="sex" id={3} value={'u'} checked={this.props.savedFilter.sex.some(x=>x=='u')} onChange={this.setSex}/>
        <label htmlFor={3}>Унисекс</label>
      </div>
    </fieldset> 
    <p>Объем</p>             
    <label htmlFor='minVol'>От</label><input id='minVol' onChange={this.setMinVol} type='number'/>
    <label htmlFor='maxVol'>До</label><input id='maxVol' onChange={this.setMaxVol} type='number'/>

    <input type="button" onClick={this.saveChanges} value="Показать" />
    <input type="button" onClick={this.resetChanges} value="Сбросить фильтры" />


      
  </form>

    return <div className="FormDesk">
    {code}
    </div> ;

  }

}
const mapStateToProps = function (state) {
    return {
      // весь раздел Redux state под именем counters будет доступен
      // данному компоненту как this.props.counters
      savedFilter: state.formSort,
    };
  };
  export default connect(mapStateToProps)(Form);
