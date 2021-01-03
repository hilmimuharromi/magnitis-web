// import logo from './logo.svg';
import './App.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import EditorContainer from "components/editor"
import { Dashboard, Login, Register } from "pages"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { store, persistor } from './stores/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
const Loading = () => {
  return <p>Loading ....</p>
}
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/">
              <Dashboard />
            </Route>

          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
