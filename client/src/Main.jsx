import { Route, Switch } from 'react-router-dom'
import App from './App';
import PostDetail from './PostDetail';
import React from 'react';

import Signin from './Signin';

import Header from './Header';
import Profile from './Profile';

class Main extends React.Component {
  render() {
    return (
      <div>
        <Header/>

        <Switch>
          <Route path="/detail/:postId" component={PostDetail}/>
          <Route path="/signin" component={Signin}/>
          <Route path="/profile/:profileId" component={Profile}/>
          <Route path="/" component={App}/>
        </Switch>
      </div>
    )
  }
}

export default Main;