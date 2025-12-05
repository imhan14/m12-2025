import { createBrowserRouter } from "react-router";
import App from "../App";
import Login from "../Login/Login";
import Home from "../components/Home/Home";
import LoggedIn from "../components/LoggedIn/LoggedIn";
import Job1 from "../components/Jobs/Job1/Job1";
import Job2 from "../components/Jobs/Job2/Job2";
import Job3 from "../components/Jobs/Job3/Job3";
import Nhap from "../components/Input/Nhap";


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
  {path:"loggedin/job1/inp", Component:Nhap}
]);

export default router