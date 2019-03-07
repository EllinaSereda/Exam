import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import './PageNews.css';


class Page_News extends React.PureComponent {

  static propTypes = {
    
  };
  

  createText=(text)=>{

    text.length>200?text=text.substr(0,200):text;
    var code=text.slice(0);
    console.log(text);
    code=code.split(/<.*?br.*?>/ig).map ((v,i,a) =>{
      if (i==a.length-1)
      v=v+'...'
      return v;
    });
    for(let i=1,j=0;i<code.length;i=i+2, j++){
      code.splice(i,0,<br key={j}/>);
    }
    console.log(text);

    
    return code;
  }



  render() {
  console.log('Page_News render')

    return <div className="PageNews">
    <h2>Новости</h2>
     {this.props.news.news.map(v=>{
      console.log(v);
    return <div className='News' key={v.code}>
    <div class="Name"><span>{v.name}</span></div>
    <NavLink key={v.code} to={"/news/"+v.code} exact className="PageLink" activeClassName="ActivePageLink">
    <img src={v.url}/></NavLink> 
    <p>{this.createText(v.info)}</p>
    <NavLink key={v.code} to={"/news/"+v.code} exact className="PageLink" activeClassName="ActivePageLink"><input type="button" value="Читать"/></NavLink>
    
    </div>})}
    </div> ;

  }

}

const mapStateToProps = function (state) {
  return {
    news: state.news,
  };
};

export default connect(mapStateToProps)(Page_News);
