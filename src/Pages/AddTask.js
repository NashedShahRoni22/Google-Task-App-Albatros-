import { Button, Input } from "@material-tailwind/react";
import React, { useContext } from "react";
import Lottie from "lottie-react";
import TaskAnim from "../Anim/man-with-task-list.json";
import { AuthContext } from "../Context/AuthProvider";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
const style = {
  height: 400,
};
const AddTask = () => {
  const { user } = useContext(AuthContext);
  const handleAddTask =(e)=>{
    e.preventDefault();
    const form = e.target;
    const task = form.task.value;
    const image = form.image.files[0];
    console.log(task, image);

    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=7e02bcb75b861cc24bc21e5f016d85c0`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        const taskDetails = {
          task,
          image: imageData.data.display_url
        };
        addTaskToDb(taskDetails);
        form.reset();
      })
      .catch((e) => console.log(e));
  }
  const addTaskToDb = (taskDetails) => {
    fetch("http://localhost:8000/task", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(taskDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Task added successfully!");
        }
      });
  };
  return (
    <div className="my-20 h-[80vh] relative">
      <h1 className="text-3xl text-center">Add a new task</h1>
      <form onSubmit={handleAddTask} className="mt-8 shadow-2xl p-8 rounded-3xl">
        <input
          type="file"
          name="image"
          className="block text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100 mb-4 cursor-pointer"
        />
        <Input label="Task" name="task"/>
        {user?.uid ? (
          <Button className="mt-4 w-full" type="submit">Add</Button>
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
