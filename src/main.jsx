import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Pokemon from './Pokemon.jsx'
import Navegacion from './Navegacion.jsx';
import Detalle from './Detalle.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: 
      <App></App> 
    ,
    errorElement: <h1>Ruta no válida</h1>
  },
  {
    path: "pokemon",
    element: <Pokemon />,
  },
  {
    path: "pokemon/:id",
    element: <Detalle />,
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
