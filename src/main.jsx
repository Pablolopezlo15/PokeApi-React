import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/css/index.css'

import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

import Cabecera from './Components/Cabecera.jsx';
import Pokemon from './Components/Pokemon.jsx';
import Detalle from './Components/Detalle.jsx';
import JuegoAdivinar from './Components/JuegoAdivinar.jsx';
import Login from './Components/Login.jsx';
import Leaderboard from './Components/Leaderboard.jsx';
import Footer from './Components/Footer.jsx';
import PrivateRoute from './Components/PrivateRoute.jsx';
import Error404 from './Components/Error404.jsx';


const router = createBrowserRouter([
  {
    element: (
      <>
        <Cabecera /> 
        <Outlet />
        <Footer />
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
        element: 
        <PrivateRoute Component={JuegoAdivinar} />
        ,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/leaderboard',
        element: <Leaderboard />,
      },
      {
        path: "*",
        element: <Error404 />,
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
