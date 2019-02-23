import React from 'react';
import {connect} from 'react-redux';
import { Route,Switch } from 'react-router-dom';

import Page_Main from './Page_Main';
import Page_News from './Page_News';
import Page_NewsInfo from './Page_NewsInfo';
import Page_Brands from './Page_Brands';
import Page_BrandInfo from './Page_BrandInfo';
import Page_About from './Page_About';
import Page_Catalog from './Page_Catalog';
import Page_Product from './Page_Product';

import "./PagesRouter.css";
class PagesRouter extends React.Component {

  render() {
  
  return <div className="PagesRouter">
<Switch>
  <Route path="/" exact component={Page_Main} />

  <Route path="/catalog/:id" exact component={Page_Product} />
  <Route exact path="/catalog" exact component={Page_Catalog} />
  
  <Route exact path="/brands" component={Page_Brands}/>
  <Route path="/brands/:name" component={Page_BrandInfo}/>
  <Route exact path="/news" exact component={Page_News} />
  <Route  path="/news/:id" exact component={Page_NewsInfo} />
  <Route path="/dicount" exact component={Page_Main} />
  <Route path="/about" exact component={Page_About} />
</Switch>
  
 
</div>
  
    

  }

}

export default PagesRouter;
/* <Route path="/company" component={Page_Company} />
<Route path="/clients" component={Page_Clients} />
<Route path="/client/:clid" component={Page_Client} />*/