import './App.css';
import Cart from './pages/Cart';
import Home from './pages/Home/Home';
import Login from './pages/Login';
import ProductItem from './pages/ProductItem';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import Success from './pages/Success';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { useSelector } from 'react-redux';

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/products/:category">
          <ProductList />
        </Route>
        <Route path="/product/:id">
          <ProductItem />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/success">
          <Success />
        </Route>
        <Route path="/login">
          {user && user.token ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/register">
          {user && user.token ? <Redirect to="/" /> : <Register />}
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
