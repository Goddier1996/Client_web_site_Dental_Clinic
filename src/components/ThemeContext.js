

// INFO !

// here if we use useContext for change theme , but have problem every new page change them back.
// and we dont need this , we need show theme example dark in all pages



// import React, { createContext, useReducer } from "react";
// import "../App.css";



// export const ThemeContext = createContext();


// const initialState = {
//     darkMode: false,
// };


// const setDark = () => {
//     document.documentElement.setAttribute("data-theme", "dark");
// };



// const setLight = () => {
//     document.documentElement.setAttribute("data-theme", "light");
// };



// const themeReducer = (state, action) => {

//     switch (action.type) {

//         case "LIGHTMODE":
//             setLight()
//             return { darkMode: false };

//         case "DARKMODE":
//             setDark()
//             return { darkMode: true };

//         default:
//             return state;
//     }
// };


// export function ThemeProvider(props) {

//     const [state, dispatch] = useReducer(themeReducer, initialState);

//     return <ThemeContext.Provider value={{ state, dispatch }}>{props.children}</ThemeContext.Provider>;
// }
