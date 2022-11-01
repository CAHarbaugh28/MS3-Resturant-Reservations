import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
  
import Home from "./views/Home";
import BasicGrid from "./components/reserve"
import Header from "./views/Default"

function App() {
  return (
    <Router>
    <div>
        <Header/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/reserve" component={BasicGrid} />
       </Switch>
    </div>
    </Router>
    )
}
  
export default App;








// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     {/* <Def/> */}
//     <Home/>
//     <Reserve/>
//   </React.StrictMode>
// );



// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
