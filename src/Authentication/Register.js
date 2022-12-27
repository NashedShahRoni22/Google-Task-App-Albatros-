import { Button, Input } from "@material-tailwind/react";
import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

const Register = () => {
  const { createUser, googleSignIn, setLoader } =
    useContext(AuthContext);
  //navigate user
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const handleRegistration = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    createUser(email, password)
    .then(res =>{
        const user = res.user;
        console.log(user);
        navigate(from, { replace: true });
    })
    .catch(e =>{
        console.error(e.message);
        setLoader(false);
    })
  };
  const handleGoogleSignUp =()=>{
    googleSignIn()
    .then(res=>{
        const user = res.user;
        console.log(user);
        navigate(from, { replace: true });
    })
    .catch(e =>{
        console.error(e.message);
    })
  }
  return (
    <div className="my-20">
      <h1 className="text-3xl">Register Now</h1>
      <form
        onSubmit={handleRegistration}
        className="mt-8 flex flex-col gap-4 shadow-2xl p-8 rounded-3xl">
        <Input required color="blue" label="Email" type="email" name="email" />
        <Input required color="blue" label="Password" type="password" name="password" />
        <Button color="green" type="submit">
          REGISTER
        </Button>
        <Button color="green" onClick={handleGoogleSignUp}>Google</Button>
      </form>
      <Link to="/login" className="mt-8 block">
        Already registered? Please login!
      </Link>
    </div>
  );
};

export default Register;
