import React, { useContext } from "react";
import { MdDelete, MdSettingsBackupRestore } from "react-icons/md";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import Lottie from "lottie-react";
import animation from "../Anim/task-completed.json";
import { Button, Input } from "@material-tailwind/react";
import { AuthContext } from "../Context/AuthProvider";

const style = {
  height: 400,
};

const CompletedTask = () => {
  const {user} = useContext(AuthContext);
  const url = `https://task-management-server-livid.vercel.app/completed?email=${user.email}`
  const { data: completedTask, refetch } = useQuery({
    queryKey: ["completedTask"],
    queryFn: () =>
      fetch(url).then((res) => res.json()),
  });
  const handleDelete = (ct) => {
    const sure = window.confirm(`Do want to delete ${ct.task}?`);
    if (sure) {
      fetch(`https://task-management-server-livid.vercel.app/task/${ct._id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast.error(`${ct.task} deleted successfully!`);
            refetch();
          }
        });
    }
  };
  const handleNotConfirm = (t) => {
    fetch(`https://task-management-server-livid.vercel.app/taskNotComplete/${t._id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          toast.success("Completed task successfully!");
          refetch();
        }
      });
  };
  const handleComment =(e)=>{
    e.preventDefault();
    const comment = e.target.comment.value;
    // const taskId = e.target.task_id.value;

    const c = {comment, email : user.email}
    fetch("https://task-management-server-livid.vercel.app/comment", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(c),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          e.target.reset();
          toast.success("Comment Added");
        }
      })
      .catch((e) => console.error(e));
  }
  return (
    <div className="mt-20 h-[100vh]">
      <h1 className="font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-blue-400 to-pink-600 text-center">
        Completed Task
      </h1>
      <div className="grid lg:grid-cols-2 gap-4 my-10">
        {completedTask?.map((ct) => (
          <section key={ct._id}>
            <div className="dark:bg-white dark:text-black w-full mt-4 shadow-2xl rounded-3xl flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <img src={ct.image} className="h-36 w-36 rounded-3xl" alt="" />
                <p>{ct.task}</p>
              </div>
              <div className="mr-8">
                <div className="flex items-center justify-end gap-4">
                  <MdSettingsBackupRestore
                    onClick={() => handleNotConfirm(ct)}
                    className="text-3xl cursor-pointer text-green-500"
                  />
                  <MdDelete
                    onClick={() => handleDelete(ct)}
                    className="text-3xl cursor-pointer text-red-500"
                  />
                </div>
                <form onSubmit={handleComment} className="mt-4 flex flex-col items-end">
                  <Input label="Comment" name="comment"></Input>
                  {/* <Input defaultValue={ct._id} className="hidden" name='task_id'></Input> */}
                  <Button type="submit" className="mt-2 w-fit bg-gradient-to-r from-blue-400 to-pink-600 " size="sm">
                    Comment
                  </Button>
                </form>
              </div>
            </div>
          </section>
        ))}
      </div>
      <div className="flex justify-end">
        <Lottie animationData={animation} style={style} />
      </div>
    </div>
  );
};

export default CompletedTask;
