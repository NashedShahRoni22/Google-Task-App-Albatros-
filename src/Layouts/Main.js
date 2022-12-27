import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Shared/Header";

const Main = () => {
  return (
    <section className="mx-auto max-w-screen-xl">
      <div className="mx-4">
        <Header />
        <Outlet />
      </div>
    </section>
  );
};

export default Main;
