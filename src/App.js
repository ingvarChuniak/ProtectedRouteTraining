import React from 'react';
import {
  BrowserRouter as Router,
  Route, 
  Link, 
  Redirect} from 'react-router-dom'

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
}

const Public = () => <h3>Public</h3>;
const Protected = () => <h3>Protected</h3>;

const PrivateRoute = ({component: Component, ...rest}) => {
  return <Route {...rest} render={(props) => {
      return fakeAuth.isAuthenticated ? <Component {...props}/> : <Redirect to="/login"/>
    }}/>
}

class Login extends React.Component {
  render() {
    return (
      <div>
        <h3>Login</h3>
      </div>
    )
  }
}

export default function AuthExample() {
  return (
    <Router>
      <div>
        <ul>
          <li><Link to="/public">Public Page</Link></li>
          <li><Link to="/protected">Protected Page</Link></li>
        </ul>
        <Route path="/public" component={Public}></Route>
        <Route path="/login" component={Login}></Route>
        <PrivateRoute path="/protected" component={Protected}/>
      </div>
    </Router>
  )
}