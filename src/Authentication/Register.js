import { Button, Input } from "@material-tailwind/react";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

const Register = () => {
  const { createUser, googleSignIn, setLoader } =
    useContext(AuthContext);
  //navigate user
  const navigate = useNavigate();
  // const location = useLocation();
  // const from = location.state?.from?.pathname || "/";
  const handleRegistration = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    createUser(email, password)
    .then(res =>{
        const user = res.user;
        console.log(user);
        toast.success("User created Successfully!")
        navigate('/login');
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
        navigate('/login');
    })
    .catch(e =>{
        console.error(e.message);
    })
  }
  return (
    <div className="my-20 h-[100vh]">
      <h1 className="text-3xl">Register Now</h1>
      <form
        onSubmit={handleRegistration}
        className="mt-8 flex flex-col gap-4 shadow-2xl p-8 rounded-3xl">
        <Input required color="blue" label="Email" type="email" name="email" />
        <Input required color="blue" label="Password" type="password" name="password" />
        <Button type="submit" className="bg-gradient-to-r from-blue-400 to-pink-600 ">
          REGISTER
        </Button>
        <Button className="bg-gradient-to-r from-pink-400 to-blue-600 " onClick={handleGoogleSignUp}>Google</Button>
      </form>
      <Link to="/login" className="mt-8 block">
        Already registered? Please login!
      </Link>
    </div>
  );
};

export default Register;
