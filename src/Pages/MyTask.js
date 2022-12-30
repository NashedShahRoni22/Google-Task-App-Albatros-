import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import SingleTask from "../Components/SingleTask";
import Lottie from "lottie-react";
import animation from "../Anim/man-with-task-list.json";
import { AuthContext } from "../Context/AuthProvider";

const style = {
  height: 400,
};

const MyTask = () => {
  const {user} = useContext(AuthContext);
  const url = `https://task-management-server-livid.vercel.app/alltask?email=${user.email}`
  const { data: alltask, refetch, isLoading } = useQuery({
    queryKey: ["alltask"],
    queryFn: () =>
      fetch(url).then((res) => res.json()),
  });
  
  if (isLoading) return 'Loading...'
  return (
    <div className="mt-20">
      <h1 className="font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-blue-400 to-pink-600 text-center">
        My Task
      </h1>
      <div className="grid lg:grid-cols-2 gap-4 my-10">
        {alltask?.map((t) => (
          <SingleTask t={t} key={t._id} refetch={refetch}></SingleTask>
        ))}
      </div>
      <div className="flex justify-end">
        <Lottie animationData={animation} style={style} />
      </div>
    </div>
  );
};

export default MyTask;
