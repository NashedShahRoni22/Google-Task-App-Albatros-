import { Button, Input } from "@material-tailwind/react";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

const Login = () => {
  const { googleSignIn, loginUser, setLoader } =
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
        toast.success("Login Successfull!")
        navigate(from, { replace: true });
      })
      .catch((e) => {
        toast.error(e.message);
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
    <div className="my-20 h-[100vh]">
      <h1 className="font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-blue-400 to-pink-600 text-center">Login Now</h1>
      <form 
      onSubmit={handleLogin} 
      className="mt-8 flex flex-col gap-4 shadow-2xl p-8 rounded-3xl">
        <Input className="dark:text-blue-500" label="Email" type="email" name="email"/>
        <Input className="dark:text-blue-500" label="Password" type="password" name="password"/>
        <Button color="green" type="submit" className="bg-gradient-to-r from-blue-400 to-pink-600">Login</Button>
        <Button color="green" onClick={handleGoogleLogin} className="bg-gradient-to-r from-pink-400 to-blue-600">Google</Button>
      </form>
      <Link to="/register" className="mt-4 block text-center">
        New here? Please <span className="text-blue-400">Register!</span>
      </Link>
    </div>
  );
};

export default Login;
