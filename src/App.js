import logo from './logo.svg';
import './App.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import EditorContainer from "components/editor"
import { Dashboard, Login, Register } from "pages"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
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
  );
}

export default App;
