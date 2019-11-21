import React from 'react';
import './App.css';

import {Home} from "./components/Home";
import {Mill} from "./components/mill/Mill";
import {Harvest} from "./components/harvest/Harvest";

import {BrowserRouter,  Route, Switch} from "react-router-dom";
import {Navigation} from "./components/Navigation";
import {Farm} from "./components/farm/Farm";
import {Field} from "./components/field/Field";

function App() {
  return (
      <BrowserRouter>
        <div className="container" style={{height: '60vh'}}>
            <h3 className='m-3 d-flex justify-content-center'> Cyan-Agro Challenge</h3>
            <Navigation></Navigation>
            <Switch>
                <Route path='/' component={Home} exact/>
                <Route path='/mill' component={Mill} />
                <Route path='/harvest' component={Harvest}/>
                <Route path='/farm' component={Farm}/>
                <Route path='/field' component={Field}/>
            </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;
