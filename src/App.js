import React from 'react';
import './App.css';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import User from './components/User';
import Todo from './components/Todo';
import PageNotFound from './components/PageNotFound';
import NavigationBar from './components/NavigationBar';

//Application's root component
function App() {
  return (
    <Provider store={store}>
      <Router>
        <PersistGate persistor={persistor}>

          <div className="App">
            <h1>Todos Users</h1>
            <NavigationBar />
            <Switch>
              <Route path="/todos">
                <Todo />
              </Route>
              <Route path="/users">
                <User />
              </Route>
              <Route path="/" exact>
                <Todo />
              </Route>
              <Route path="*">
                <PageNotFound />
              </Route>
            </Switch>
          </div>
        </PersistGate>
      </Router>
    </Provider>

  );
}

export default App;
