import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/css/index.css'

import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

import Cabecera from './Cabecera.jsx';
import Pokemon from './Pokemon.jsx';
import Detalle from './Detalle.jsx';
import JuegoAdivinar from './JuegoAdivinar.jsx';
import Login from './Login.jsx';

const router = createBrowserRouter([
  {
    element: (
      <>
        <Cabecera /> 
        <Outlet />
      </>
    ),

    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/pokemon',
        element: <Pokemon />,
      },
      {
        path: '/pokemon/:id',
        element: <Detalle />,
      },
      {
        path: '/juegoAdivinar',
        element: <JuegoAdivinar />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router}/>
    <Outlet />
  </>,
)
