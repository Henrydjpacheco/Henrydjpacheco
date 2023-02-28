import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.stylecss';
import Init from './components/Init.jsx';
import Home from './components/Home.jsx';
import Detail from './components/Detail.jsx';
import Create from './components/Create.jsx'; 
import Opening from './components/Opening.jsx';
function App() {
  return (
    <BrowserRouter>
      <div className='App'>
      <Switch>
      <Route exact path={"/"}>
        <Opening/>
      </Route>
      <Route exact path={"/init"}>
        <Init/>
      </Route>
        <Route exact path={"/home"}>
          <Home/>
        </Route>
    <Route exact path={"/create"}>
        <Create/>
        </Route>
        
        <Route exact path={"/home/:id"}>
          <Detail/>
        </Route> 

      </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
