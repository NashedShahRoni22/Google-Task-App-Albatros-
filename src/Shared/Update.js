import { Button, Textarea } from "@material-tailwind/react";
import React from "react";
import { toast } from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";

const Update = () => {
  const t = useLoaderData();
  const navigate = useNavigate();
  const handleUpdate = (e) => {
    e.preventDefault();
    const newTask = e.target.newTask.value;
    const ut = { newTask };
    fetch(`https://task-management-server-livid.vercel.app/update/${t._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ut),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Updated task successfully!");
          navigate("/myTask");
        }
      });
  };
  return (
    <div className="my-20">
      <h1 className="text-3xl text-center">Please Update:</h1>
      <form onSubmit={handleUpdate} className="my-10 shadow-2xl p-8">
        <Textarea label="New Task" defaultValue={t.task} name="newTask" />
        <Button className="mt-4" type="submit" color="green">
          Update
        </Button>
      </form>
    </div>
  );
};
export default Update;
