import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Shared/Header";

const Main = () => {
  const [theme, setTheme] = useState('light')
  const [btn, setBtn] = useState(false);
  
  
  useEffect(() => {
    if(theme === 'dark'){
      document.documentElement.classList.add('dark')
    }
    else{
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const handleThemeSwitch = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
    setBtn(!btn)
  }

  return (
    <section className="bg-white dark:bg-black dark:text-white">
      <div className="mx-auto container">
        <Header handleThemeSwitch={handleThemeSwitch} btn={btn} />
        <Outlet />
      </div>
    </section>
  );
};

export default Main;
