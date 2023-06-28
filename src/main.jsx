import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Template from './Template.jsx'
import Signup from './Signup.jsx'
import Login from './Login.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store.js'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Template />,
    children: [
      {
        path: '/',
        element: <App />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/login',
        element: <Login />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
