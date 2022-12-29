import { useQuery } from "@tanstack/react-query";
import React from "react";
import SingleTask from "../Components/SingleTask";

const MyTask = () => {
  const { data: alltask, refetch } = useQuery({
    queryKey: ["alltask"],
    queryFn: () =>
      fetch("http://localhost:8000/alltask").then((res) => res.json()),
  });
  return (
    <div className="my-20">
      <h1 className="text-3xl text-center">My Task {alltask?.length}</h1>
      <div className="grid md:grid-cols-2 gap-4 my-10">
        {alltask?.map((t) => (
          <SingleTask t={t} key={t._id} refetch={refetch}></SingleTask>
        ))}
      </div>
    </div>
  );
};

export default MyTask;
