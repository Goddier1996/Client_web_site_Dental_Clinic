import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from 'react'
import Register from './Pages/Register.jsx'
import Home from './Pages/Home.jsx'
import Menu from './components/heater/Menu.jsx'
import Footer from "./components/footer/Footer.jsx";
import Location from './Pages/Location.jsx'
import OurWork from './Pages/OurWork.jsx'
import Service from './Pages/Service.jsx'
import Profile from './Pages/Profile.jsx'
import About from './Pages/About.jsx'
import DarkMode from "./components/tools/darkMode/DarkMode.jsx"
import NotFoundPage from "./components/tools/pageNotFound/NotFoundPage.jsx";



function App() {

  return (

    <BrowserRouter>

      {/*Dark mode or light */}
      {/* <DarkMode /> */}

      <Menu />

      <main className="mainStyle">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/About" exact component={About} />
          <Route path="/Register" exact component={Register} />
          <Route path="/Location" exact component={Location} />
          <Route path="/OurWork" exact component={OurWork} />
          <Route path="/Service" exact component={Service} />
          <Route path="/Profile/:id" exact component={Profile} />

          {/* page not found */}
          <Route path="*" exact component={NotFoundPage} />
        </Switch>
      </main>

      <Footer/>

    </BrowserRouter>
  );
}

export default App;