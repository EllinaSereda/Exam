import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import News from '../../components/News/News';
import './PageNews.css';


class Page_News extends React.PureComponent {

  static propTypes = {
    news:PropTypes.shape({
      news:PropTypes.array,
    }),
  };




  render() {
    return <div className="PageNews">
    <h2>Новости</h2>
     {this.props.news.news.map(v=><News news={v}/>)}
    </div> ;

  }

}

const mapStateToProps = function (state) {
  return {
    news: state.news,
  };
};

export default connect(mapStateToProps)(Page_News);
