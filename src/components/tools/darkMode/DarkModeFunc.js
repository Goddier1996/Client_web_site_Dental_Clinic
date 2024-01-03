const storedTheme = localStorage.getItem("theme");


export const setDark = () => {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
};


export const setLight = () => {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
};


export const defaultDark =
    storedTheme === "dark" || storedTheme === null;


export const toggleTheme = (e) => {

    window.location.reload(false);

    if (e.target.checked) {
        setDark();
    } else {
        setLight();
    }
};