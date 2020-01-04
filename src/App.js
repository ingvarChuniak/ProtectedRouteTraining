import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";

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
};

const Public = () => <h3>Public</h3>;
const Protected = () => <h3>Protected</h3>;

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return fakeAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{pathname: "/login", state: {from: props.location}}} />
        );
      }}
    />
  );
};

class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {redirectToRefer: false}
    this.login = this.login.bind(this);
  }

  login() {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToRefer: true });
    });
  }

  render() {
    const { redirectToRefer } = this.state;
    const {from} = this.props.location.state || {from: {pathname: "/"}}

    if (redirectToRefer === true) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <p>You must log in to view the page</p>
        <button onClick={this.login}></button>
      </div>
    );
  }
}

export default function AuthExample() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/public">Public Page</Link>
          </li>
          <li>
            <Link to="/protected">Protected Page</Link>
          </li>
        </ul>
        <Route path="/public" component={Public}></Route>
        <Route path="/login" component={Login}></Route>
        <PrivateRoute path="/protected" component={Protected} />
      </div>
    </Router>
  );
}
