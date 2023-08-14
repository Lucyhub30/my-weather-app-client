import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Homepage/App';
import AboutPage from './AboutPage/AboutPage';
import HistoryPage from './HistoryPage/HistoryPage';
import HelpPage from './HelpPage/HelpPage';
import Menu from './Menu';

import {
  createBrowserRouter,
  RouteProvider,
  Router,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "about",
    element: <AboutPage/>
  },
  {
    path: "history",
    element: <HistoryPage/>
  },
  {
    path: "help",
    element: <HelpPage/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div><Menu/><div className='content'><RouterProvider router={router}/></div></div>

);