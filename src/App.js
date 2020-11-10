import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import { Navbar } from './app/Navbar';
import { TaxList } from './features/tax/TaxList';
import { SalaryInputForm } from './features/salary/SalaryInputForm';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <SalaryInputForm />
                <TaxList />
              </React.Fragment>
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
