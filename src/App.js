import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { useEffect } from 'react'
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
import { DeleteYesterdaysTurnAutoInUser, NotActiveDays } from "./Api/LoadDataFromApi.js";
import ShowMessageUseCookie from "./components/tools/cookieConsent/ShowMessageUseCookie.jsx";


function App() {

  // here active dark mode,save to local storage first data to show color background website
  let storedTheme = localStorage.getItem("theme");
  const defaultDark = storedTheme === "dark" || storedTheme === null;

  if (defaultDark) {
    setDark();
  }


  useEffect(() => {

    // when open website, to do not active the previous days 
    // For example today Monday, now we not active day sunday!
    // and the end week we active all days, for users can save new turn
    NotActiveDays();

    // here delete all appointment was Yesterday,
    // because user NOT go to this appointment Yesterday,
    // active Hour and delete all info about appointment at user.
    DeleteYesterdaysTurnAutoInUser();
  }, []);


  return (
    <BrowserRouter>

      <Menu />
      <ChatBotInfo />
      <ShowMessageUseCookie />

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