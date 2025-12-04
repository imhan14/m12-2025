import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";

import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/routes.js';

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />,
);

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
