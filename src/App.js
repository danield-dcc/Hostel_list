import React from 'react'
import TituloNavBar from './components/TituloNavBar';
import ListagemHostels from './components/ListagemHostels';
import Avaliacao from './components/Avaliacao';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App = () => {
  return (
    <div>
      <Router>
        <TituloNavBar />
        <Switch>
          <Route path="/" exact>
          <ListagemHostels />
          </Route>
          <Route path="/avaliacao/:id">
            <Avaliacao />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;
