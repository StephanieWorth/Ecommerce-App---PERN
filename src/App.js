import React from 'react';
import './App.css';
import Home from './pages/Home/Home';
import Product from './pages/Product/Product';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import ProductList from './pages/ProductList/productList';
import NewProduct from './pages/NewProduct/NewProduct';
import User from './pages/User/User';
import UserList from './pages/UserList/UserList';
import NewUser from './pages/NewUser/NewUser';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/product">
          <Product />
        </Route>
        <Route path="/productList">
          <ProductList />
        </Route>
        <Route path="/newProduct">
          <NewProduct />
        </Route>
        <Route path="/user">
          <User />
        </Route>
        <Route path="/userList">
          <UserList />
        </Route>
        <Route path="/newUser">
          <NewUser />
        </Route>
      </Switch>
    </Router>

    
  );
}

export default App;
