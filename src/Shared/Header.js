import React, { useContext, useEffect, useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import { toast } from "react-hot-toast";
import logo from "../assests/nsrtask_logo.png";
import { BsFillSunFill, BsMoonStars } from "react-icons/bs";

const Header = ({ handleThemeSwitch, btn }) => {
  const [openNav, setOpenNav] = useState(false);
  const { user, signOutUser } = useContext(AuthContext);
  const handleLogOut = () => {
    signOutUser()
      .then(() => {
        toast.error("Sign Out Successfull!");
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 text-black dark:text-white">
      <Typography
        as="li"
        variant="small"
        
        className="p-1 font-normal"
      >
        <Link to="/" className="flex items-center">
          Add Task
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        
        className="p-1 font-normal"
      >
        <Link to="/myTask" className="flex items-center">
          My Task
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        
        className="p-1 font-normal"
      >
        <Link to="/cpmpletedTask" className="flex items-center">
          Completed Task
        </Link>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="py-2 px-4 lg:px-8 lg:py-4 dark:bg-black dark:border-blue-400">
      <div className="mx-auto flex items-center justify-between">
        <Typography
          as="a"
          variant="small"
          className="mr-4 cursor-pointer py-1.5 font-normal"
        >
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} className="w-8" alt="" />
            <span className="font-extrabold text-transparent text-xl bg-clip-text bg-gradient-to-r from-blue-400 to-pink-600 text-center">
              NSR TASK
            </span>
          </Link>
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <div className="flex gap-2 items-center">
          {user?.uid ? (
            <Button
              variant="gradient"
              size="sm"
              className="hidden lg:inline-block bg-gradient-to-r from-red-400 to-pink-600 "
              onClick={handleLogOut}
            >
              <span>Log Out</span>
            </Button>
          ) : (
            <Link to="login">
              <Button
                variant="gradient"
                size="sm"
                className="hidden lg:inline-block from-green-400 to-blue-600"
              >
                <span>Log In</span>
              </Button>
            </Link>
          )}
          {btn ? (
          <BsMoonStars
            onClick={handleThemeSwitch}
            className="text-3xl cursor-pointer text-blue-400 mt-2 md:hidden lg:block"
          />
        ) : (
          <BsFillSunFill
            className="text-3xl cursor-pointer text-yellow-800 mt-2 md:hidden lg:block"
            onClick={handleThemeSwitch}
          />
        )}
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit text-black dark:text-white hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        {navList}
        {user?.uid ? (
          <Button
            onClick={handleLogOut}
            variant="gradient"
            size="sm"
            fullWidth
            className="bg-gradient-to-r from-red-400 to-pink-600  "
          >
            <span>Log Out</span>
          </Button>
        ) : (
          <Link to="login">
            <Button
              variant="gradient"
              size="sm"
              fullWidth
              className="bg-gradient-to-l from-green-400 to-blue-600"
            >
              <span>Login</span>
            </Button>
          </Link>
        )}
        {btn ? (
          <BsMoonStars
            onClick={handleThemeSwitch}
            className="text-3xl cursor-pointer text-blue-600 mt-2"
          />
        ) : (
          <BsFillSunFill
            className="text-3xl cursor-pointer text-yellow-800 mt-2"
            onClick={handleThemeSwitch}
          />
        )}
      </MobileNav>
    </Navbar>
  );
};

export default Header;
