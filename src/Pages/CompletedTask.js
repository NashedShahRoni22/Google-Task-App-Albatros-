import React from "react";
import { MdDelete, MdSettingsBackupRestore } from "react-icons/md";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const CompletedTask = () => {
    const { data: completedTask, refetch } = useQuery({
        queryKey: ["completedTask"],
        queryFn: () =>
          fetch("http://localhost:8000/completed").then((res) => res.json()),
      });
  const handleDelete = (ct) => {
    const sure = window.confirm(`Do want to delete ${ct.task}?`);
    if (sure) {
      fetch(`http://localhost:8000/task/${ct._id}`, {
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
    fetch(`http://localhost:8000/taskNotComplete/${t._id}`, {
      method: "PUT"
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          toast.success("Completed task successfully!");
          refetch();
        }
      });
  }
  return (
    <div className="my-20">
      <h1 className="text-3xl text-center">
        Completed Task {completedTask?.length}
      </h1>
      <div className="grid md:grid-cols-2 gap-4">
        {completedTask?.map((ct) => (
          <div className="w-full mt-4 shadow-2xl rounded-3xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={ct.image} className="h-36 w-36 rounded-3xl" alt="" />
              <p>{ct.task}</p>
            </div>
            <div className="flex items-center gap-4 mr-8">
              <MdSettingsBackupRestore
                onClick={() => handleNotConfirm(ct)}
                className="text-3xl cursor-pointer text-green-500"
              />
              <MdDelete
                onClick={() => handleDelete(ct)}
                className="text-3xl cursor-pointer text-red-500"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompletedTask;
