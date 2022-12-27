import { Button, Input } from "@material-tailwind/react";
import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

const Login = () => {
  const { googleSignIn, loginUser, loader, setLoader } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    loginUser(email, password)
      .then((res) => {
        const user = res.user;
        console.log(user);
        navigate(from, { replace: true });
      })
      .catch((e) => {
        console.log(e.message);
        setLoader(false);
      });
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((res) => {
        const user = res.user;
        console.log(user);
        navigate(from, { replace: true });
      })
      .catch((e) => {
        console.log(e.message);
        setLoader(false);
      });
  };
  return (
    <div className="my-20">
      <h1 className="text-3xl">Login Now</h1>
      <form 
      onSubmit={handleLogin} 
      className="mt-8 flex flex-col gap-4 shadow-2xl p-8 rounded-3xl">
        <Input color="blue" label="Email" type="email" name="email"/>
        <Input color="blue" label="Password" type="password" name="password"/>
        <Button color="green" type="submit">Login</Button>
        <Button color="green" onClick={handleGoogleLogin}>Google</Button>
      </form>
      <Link to="/register" className="mt-8 block">
        New here? Please register!
      </Link>
    </div>
  );
};

export default Login;
