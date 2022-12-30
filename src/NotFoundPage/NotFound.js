import { Button } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.scss";

const NotFound = () => {
  return (
    <section className="nfBg">
      <h1>404</h1>
      <p>Page Not Found</p>
      <Link to="/">
        <Button>Back to home</Button>
      </Link>
    </section>
  );
};

export default NotFound;
