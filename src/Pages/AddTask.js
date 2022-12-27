import { Button, Input } from "@material-tailwind/react";
import React, { useContext } from "react";
import Lottie from "lottie-react";
import TaskAnim from "../Anim/man-with-task-list.json";
import { AuthContext } from "../Context/AuthProvider";
import { Link } from "react-router-dom";
const style = {
  height: 400,
};
const AddTask = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="my-20 h-[80vh] relative">
      <h1 className="text-3xl text-center">Add a new task</h1>
      <form className="mt-8 shadow-2xl p-8 rounded-3xl">
        <input
          type="file"
          class="block text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100 mb-4 cursor-pointer"
        />
        <Input label="Task" />
        {user?.uid ? (
          <Button className="mt-4 w-full">Add</Button>
        ) : (
          <Link to="/login">
            <Button className="mt-4 w-full">Please login to add a task</Button>
          </Link>
        )}
      </form>
      <Lottie
        className="absolute bottom-0 right-0"
        animationData={TaskAnim}
        style={style}
      />
    </div>
  );
};

export default AddTask;
