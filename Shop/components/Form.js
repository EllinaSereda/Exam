import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {voteEvents} from '../events';
import { brandSort_create, brandSort_change,brandSort_changeSave } from '../redux/BrandSort';


class Form extends React.PureComponent {

  static propTypes = {
  
  };
  setBrands=(EO)=>{
    this.props.dispatch(brandSort_change(EO.target.value) );
    //this.setState({showBrands:newBr});
  }
  saveChanges=()=>{
    this.props.dispatch(brandSort_changeSave(this.props.showBrands.brands) );
    //this.setState({showBrands:newBr});
    voteEvents.emit('EFilterSaved',0);
  }
  
  

  render() {
let code;
code=this.props.brands?
    <form>                       
    <span>от</span><input type='number'/>
    <span>До</span><input type='number'/>
    <fieldset>      
      <legend>Brand</legend>    
      {this.props.brands.map((v,i)=>
      <div key={i}>
        <input type="checkbox" name="brand" id={v} value={v} onChange={this.setBrands}/>
        <label htmlFor={v}>{v}</label>
      </div>)}          
      <input type="button" onClick={this.saveChanges} value="Submit now" />      
  </fieldset> 
  </form>:null;

    return <div className="FormDesk">
    {code}
    </div> ;

  }

}
const mapStateToProps = function (state) {
    return {
      // весь раздел Redux state под именем counters будет доступен
      // данному компоненту как this.props.counters
      showBrands: state.brandsSort,
    };
  };
  export default connect(mapStateToProps)(Form);
