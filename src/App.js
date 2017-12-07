import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Pages from './Pages';
import PageEdit from './PageEdit';
import PageCreate from './PageCreate';

function App() {
  return (
    <div className="container">
      <header className="row">
        <div className="col-sm-8 offset-sm-2">
          <p className="lead">
            admin
            <a
              href="pages/create"
              className="btn btn-sm btn-secondary float-right"
            >
              Create
            </a>
          </p>
          <hr />
        </div>
      </header>
      <div className="row">
        <div className="col-sm-8 offset-sm-2">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Pages} />
              <Route path="/pages/:id/edit" component={PageEdit} />
              <Route path="/pages/create" component={PageCreate} />
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
