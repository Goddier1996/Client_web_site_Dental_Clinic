import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from 'react'
import Register from './Pages/Register'
import Home from './Pages/Home'
import Menu from './components/menu'
import Fotter from './components/fotter'
import Loction from './Pages/Loction'
import OurWork from './Pages/OurWork'
import Service from './Pages/service'
import profile from './Pages/profile'
import About from './Pages/About'



function App() {

  return (
    <BrowserRouter>

      <Menu />

      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/About" exact component={About} />
        <Route path="/Register" exact component={Register} />
        <Route path="/Loction" exact component={Loction} />
        <Route path="/OurWork" exact component={OurWork} />
        <Route path="/Service" exact component={Service} />
        <Route path="/Profile/:id" exact component={profile} />
      </Switch>

      <Fotter />

    </BrowserRouter>

  );
}

export default App;