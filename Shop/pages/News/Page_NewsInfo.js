import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';


class Page_NewsInfo extends React.PureComponent {

  static propTypes = {
    
  };
  state={
  }
  createText=(info,id)=>{
    let el=info.filter(v=>v.code==id)[0];
    let text=el.info.split(/<.*?br.*?>/ig).map ((v,i,a) =>v);
    console.log(text);
    for(let i=1,j=0;i<text.length;i=i+2, j++){
      text.splice(i,0,<br key={j}/>);
    }
    let codeNews=<div className='News' key={id}>
    <h1>{el.name}</h1>
    <img src={el.url}/>
    <p>{text}</p>
    </div>
    return codeNews;
  }

  render() {
    const id = this.props.match.params.id;
    console.log('Page_NewsInfo render');
    console.log((this.props.new.news));
    return <div className="PageNewsInfo">Новости
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