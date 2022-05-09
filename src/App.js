import './App.css';
import { Route, Switch } from 'react-router-dom'
import AllFavorites from './pages/AllFavorites/AllFavorites';
import Home from './pages/Home/Home';
import Blog from './pages/Blog/Blog';

function App() {

  return (<>
    <Switch>
      <Route path="/" exact={true}>
        <Home />
      </Route>
      <Route path="/AllFavorites" exact={true}>
        <AllFavorites />
      </Route>
      <Route path="/Blog" exact={true}>
        <Blog />
      </Route>
    </Switch>
  </>
  );
}

export default App;
