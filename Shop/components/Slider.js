import React from 'react';
import PropTypes from 'prop-types';
import './Slider.css'

class Slider extends React.PureComponent {

  static propTypes = {
    info:PropTypes.arrayOf(
      PropTypes.shape({
        code:PropTypes.number,
        info:PropTypes.String,
        name:PropTypes.String,
        url:PropTypes.String,
      } )
    )
    
  };
  state={
    info:this.props.info,
    number:0,
  }
  inc=()=>{
    let newNumb;
    (this.state.number<this.state.info.length-1)?
    newNumb=this.state.number+1:newNumb=0;
    this.setState({number:newNumb});
  }
  componentDidMount(){
    this.timer=setInterval(this.inc,3000)
  }
  componentWillUnmount(){
    clearInterval(this.timer);
  }
  timer=null;
  render() {
   //console.log('Slider did Render');
    return <div className="Slider">
    <div className="img"><img src={this.state.info[this.state.number].url}/></div>
    </div>
 ;

  }

}

export default Slider;
