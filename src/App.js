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
import NotFoundPage from "./components/tools/pageNotFound/NotFoundPage.jsx";
import { setDark } from "../src/components/tools/darkMode/DarkModeFunc.js"
import ChatBotInfo from "./components/tools/chatBot/ChatBotInfo.jsx";


function App() {

  // here active dark mode,save to local storage first data to show color background website
  let storedTheme = localStorage.getItem("theme");
  const defaultDark = storedTheme === "dark" || storedTheme === null;

  if (defaultDark) {
    setDark();
  }


  return (
    <BrowserRouter>

      <Menu />
      <ChatBotInfo/>

      <main>
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

      <Footer />

    </BrowserRouter>
  );
}

export default App;