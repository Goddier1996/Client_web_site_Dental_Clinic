import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from 'react'
import Register from './Pages/Register'
import Home from './Pages/Home'
import Menu from './components/menu'
import Fotter from './components/fotter'
import Location from './Pages/Location'
import OurWork from './Pages/OurWork'
import Service from './Pages/service'
import profile from './Pages/profile'
import About from './Pages/About'
import DarkMode from "./components/DarkMode"
import NotFoundPage from "./components/NotFoundPage";


function App() {

  return (
    <BrowserRouter>

      {/* active dark node or light */}
      <DarkMode />

      {/* active menu */}
      <Menu />

      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/About" exact component={About} />
        <Route path="/Register" exact component={Register} />
        <Route path="/Location" exact component={Location} />
        <Route path="/OurWork" exact component={OurWork} />
        <Route path="/Service" exact component={Service} />
        <Route path="/Profile/:id" exact component={profile} />
        {/* active page not found */}
        <Route path="*" exact component={NotFoundPage} />
      </Switch>

      <Fotter />

    </BrowserRouter>

  );
}

export default App;