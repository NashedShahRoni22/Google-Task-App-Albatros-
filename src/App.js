import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./Layouts/Main";
import AddTask from "./Pages/AddTask";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import { Toaster } from "react-hot-toast";
import MyTask from "./Pages/MyTask";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children: [
        {
          path: "/",
          element: <AddTask/>,
        },
        {
          path: "/login",
          element: <Login/>,
        },
        {
          path: "/register",
          element: <Register/>,
        },
        {
          path: "/myTask",
          element: <MyTask/>,
        },
      ],
    },
  ]);
  return (
    <main>
      <RouterProvider router={router} />
      <Toaster />
    </main>
  );
}

export default App;
