import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Home from "./views/Home";
import Reserve from "./views/places/Reserve"
import Menu from "./views/places/Menu"
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
          <Route exact path="/menu" component={Menu} />
          <Route exact path="/tester" component={BackendTester} />
       </Switch>
    </div>
    </Router>
    )
}
  
export default App;
