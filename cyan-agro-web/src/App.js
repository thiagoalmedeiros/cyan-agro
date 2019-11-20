import React from 'react';
import './App.css';

import {Home} from "./components/Home";
import {Mill} from "./components/mill/Mill";
import {Harvest} from "./components/Harvest";

import {BrowserRouter,  Route, Switch} from "react-router-dom";
import {Navigation} from "./components/Navigation";

function App() {
  return (
      <BrowserRouter>
        <div className="container">
            <h3 className='m-3 d-flex justify-content-center'> React JS with Web api Demo</h3>
            <Navigation></Navigation>
            <Switch>
                <Route path='/' component={Home} exact/>
                <Route path='/mill' component={Mill} />
                <Route path='/harvest' component={Harvest}/>
            </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;
