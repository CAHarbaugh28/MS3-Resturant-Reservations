import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Home from "./views/Home";
import Reserve from "./views/places/Reserve"
import BackendTester from "./components/backend-tester"
import Header from "./views/Default"


function App() {
  return (
    <Router>
    <div>
        <Header/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/reserve" component={Reserve} />
          <Route exact path="/tester" component={BackendTester} />
       </Switch>
    </div>
    </Router>
    )
}
  
export default App;
