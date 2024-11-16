import { StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom';
import { RouterProvider,createBrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import Login from './components/Login/Login.jsx'
import Signup from './components/Signup/Signup.jsx';
import ProductListPage from './components/ProductList/ProductListPage.jsx';
import ProductForm from './components/ProductList/ProductForm.jsx';
import ProductDetailPage from './components/ProductList/ProductDetailPage.jsx';


const router=createBrowserRouter([
  {
    path:"/login",
    element:<Login/>,   
  },{
    path:"/",
    element:<App/>,
  },
  ,{
    path:"/signup",
    element:<Signup/>,
  }
  ,{
    path:"/productlist",
    element:<ProductListPage/>,
  },
  {
    path:"/product-form",
    element:<ProductForm/>,
  },
  {
    path: "/product/:id",  
    element: <ProductDetailPage />,
  }
  
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>,
)
