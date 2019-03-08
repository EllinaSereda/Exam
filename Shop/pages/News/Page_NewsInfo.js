import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import './PageNewsInfo.css';

class Page_NewsInfo extends React.PureComponent {

  static propTypes = {
    new:PropTypes.shape({
      news:PropTypes.array,
    }),
  }

  state={
  }
  createText=(info,id)=>{
    let el=info.filter(v=>v.code==id)[0];
    let text=el.info.split(/<.*?br.*?>/ig).map ((v,i,a) =>v);
    let code=[];
    for (let i=0;i<text.length;i++){
      code[i]=<p>{text[i]}</p>;
    }
    let codeNews=<div className='NewsInfo' key={id}>
    <div class="Name"><span>{el.name}</span></div>
    <img src={el.url}/>
    {code}
    </div>
    return codeNews;
  }

  render() {
    const id = this.props.match.params.id;
    console.log('Page_NewsInfo render');
    console.log((this.props.new.news));
    return <div className="PageNewsInfo">
    <h2>Новости</h2>
      {this.createText(this.props.new.news,id)}
    </div> ;

  }

}

const mapStateToProps = function (state) {
  return {
    new: state.news,
  };
};

export default connect(mapStateToProps)(Page_NewsInfo);

//