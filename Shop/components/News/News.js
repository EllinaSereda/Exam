import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './News.css';


class News extends React.PureComponent {

  static propTypes = {
    news:PropTypes.object,
  };
  

  createText=(text)=>{

    text.length>200?text=text.substr(0,200):text;
    var code=text.slice(0);
    code=code.split(/<.*?br.*?>/ig).map ((v,i,a) =>{
      if (i==a.length-1)
      v=v+'...'
      return v;
    });
    for(let i=1,j=0;i<code.length;i=i+2, j++){
      code.splice(i,0,<br key={j}/>);
    }

    
    return code;
  }



  render() {
      console.log(this.props.news);
    return <div className='News' key={this.props.news.code}>
    <div className="Name"><span>{this.props.news.name}</span></div>
    <NavLink to={"/news/"+this.props.news.code} exact className="PageLink" activeClassName="ActivePageLink">
    <img src={this.props.news.url}/></NavLink> 
    <p>{this.createText(this.props.news.info)}</p>
    <NavLink to={"/news/"+this.props.news.code} exact className="PageLink" activeClassName="ActivePageLink"><input type="button" value="Читать"/></NavLink>
    </div>

  }

}


export default News;
