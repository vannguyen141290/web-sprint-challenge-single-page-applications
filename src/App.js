import React from "react";
import './App.css';
import { Link, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Contact from './components/Contact';
import Form from './components/Form';


const App = () => {
  return (
    <div className='App'>
      <header>
        <Link to='/' className='nav'>Home</Link>
        <Link to='/contact' className='nav'>Contact</Link>
      </header>

      <div className='container'>
        <div className='top-content'>
          <Link to='/pizza' id='order-pizza'>Order here</Link>
        </div>

        <Switch>
        <Route exact path='/'>
          <Home />
        </Route>

        <Route path='/contact'>
          <Contact />
        </Route>

        <Route path='/pizza'>
          <Form />
        </Route>
      </Switch>
      </div>







    </div>

  );
};
export default App;
