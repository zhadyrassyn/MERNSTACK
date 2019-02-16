import { Route, Switch } from 'react-router-dom'
import App from './App';
import PostDetail from './PostDetail';
import React from 'react';



class Main extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/detail/:postId" component={PostDetail}/>
          <Route path="/" component={App}/>
        </Switch>
      </div>
    )
  }
}

export default Main;