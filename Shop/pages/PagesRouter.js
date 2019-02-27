import React from 'react';
import {connect} from 'react-redux';
import { Route,Switch } from 'react-router-dom';

import Page_Main from './Main/Page_Main';
import Page_News from './News/Page_News';
import Page_NewsInfo from './News/Page_NewsInfo';
import Page_Brands from './Brands/Page_Brands';
import Page_BrandInfo from './Brands/Page_BrandInfo';
import Page_About from './About/Page_About';
import Page_Catalog from './Catalog/Page_Catalog';
import Page_Product from './Catalog/Page_Product';
import Page_Registration from './Auth/Page_Registration';
import Page_Order from './Order/Page_Order';
import Page_Log from './Auth/Page_Log';
import Page_Account from './Auth/Page_Account';
import "./PagesRouter.css";

class PagesRouter extends React.Component {

  render() {
  
  return <div className="PagesRouter">
<Switch>
  <Route path="/" exact component={Page_Main} />

  <Route path="/catalog/:id" exact component={Page_Product} />
  <Route exact path="/catalog" exact component={Page_Catalog} />
  <Route exact path="/registration" exact component={Page_Registration} />
  <Route exact path="/brands" component={Page_Brands}/>
  <Route path="/brands/:name" component={Page_BrandInfo}/>
  <Route exact path="/news" exact component={Page_News} />
  <Route  path="/news/:id" exact component={Page_NewsInfo} />
  <Route path="/dicount" exact component={Page_Main} />
  <Route path="/about" exact component={Page_About} />
  <Route path="/order" exact component={Page_Order} />
  <Route path="/log" exact component={Page_Log} />
  <Route path="/account" exact component={Page_Account} />
</Switch>
  
 
</div>
  
    

  }

}

export default PagesRouter;
/* <Route path="/company" component={Page_Company} />
<Route path="/clients" component={Page_Clients} />
<Route path="/client/:clid" component={Page_Client} />*/