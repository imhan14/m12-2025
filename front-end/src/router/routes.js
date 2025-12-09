import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../components/Home/Home";
import Login from "@features/Auth/Login";
import Job1 from "@features/Departments/Department1/Job1";
import LoggedIn from "@features/Departments/LoggedIn";


const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path:"/home",
    Component:Home
  },
  {
    path:"/loggedin",
    Component:LoggedIn,
  },
  {
    path:"loggedin/job1",
    Component:Job1,
    // children:[
    //   {path:"inp", Component:Nhap}
    // ]
  },
]);

export default router