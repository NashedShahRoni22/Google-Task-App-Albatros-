import React from "react";
import { toast } from "react-hot-toast";
import { MdDelete, MdOutlineUpdate, MdOutlineCheck } from "react-icons/md";
import { Link } from "react-router-dom";

const SingleTask = ({ t, refetch }) => {
  const handleDelete = (t) => {
    const sure = window.confirm(`Do want to delete ${t.task}?`);
    if (sure) {
      fetch(`https://task-management-server-livid.vercel.app/task/${t._id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast.error(`${t.task} deleted successfully!`);
            refetch();
          }
        });
    }
  };
  const handleConfirm = (t) => {
    fetch(`https://task-management-server-livid.vercel.app/taskComplete/${t._id}`, {
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
  return (
    <div className="w-full mt-4 shadow-2xl rounded-3xl flex items-center justify-between dark:border-4 dark:border-blue-400 dark:text-white">
      <div className="flex items-center gap-4">
        <img src={t.image} className="h-36 w-36 rounded-3xl" alt="" />
        <p>{t.task}</p>
      </div>
      <div className="flex items-center gap-4 mr-8">
        <Link to={`/update/${t._id}`}>
          <MdOutlineUpdate className="text-4xl cursor-pointer text-blue-400 hover:bg-white hover:rounded-full"/>
        </Link>
        <MdOutlineCheck
          onClick={() => handleConfirm(t)}
          className="text-4xl cursor-pointer text-green-400 hover:bg-white hover:rounded-full"
        />
        <MdDelete
          onClick={() => handleDelete(t)}
          className="text-4xl cursor-pointer text-red-400 hover:bg-white hover:rounded-full"
        />
      </div>
    </div>
  );
};

export default SingleTask;
