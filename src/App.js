import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./Layouts/Main";
import AddTask from "./Pages/AddTask";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import { Toaster } from "react-hot-toast";
import MyTask from "./Pages/MyTask";
import Update from "./Shared/Update";
import CompletedTask from "./Pages/CompletedTask";
import PrivateRoutes from "./Routes/PrivateRoutes";

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
          element: <PrivateRoutes><MyTask/></PrivateRoutes>,
        },
        {
          path: "/update/:id",
          element: <Update/>,
          loader: ({params})=> fetch(`http://localhost:8000/updateTask/${params.id}`)
        },
        {
          path: "/cpmpletedTask",
          element: <PrivateRoutes><CompletedTask/></PrivateRoutes>
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
