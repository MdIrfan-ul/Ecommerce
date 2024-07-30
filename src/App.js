import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Nav } from './Components/Nav/Nav';
import { Home } from './Components/Home/Home';
import { ProductsForm } from './Components/ProductsForm/ProductsForm';
import { ProductDetails } from './Components/ProductsDetails/ProductsDetails';
import { Carts } from './Components/Carts/Carts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Page404 from './Components/page404/page404';

function App() {

  const router = createBrowserRouter([{
    path:'/',
    element:<Nav/>,
    errorElement:<Page404/>,
    children:[
      {index:true,element:<Home/>},
      {path:'/productDetails/:id',element:<ProductDetails/>},
      {path:'/addproducts',element:<ProductsForm/>},
      {path:'/cart',element:<Carts/>}
    ]
  }
 
]);
  
  return (
    <div className="App">
     <RouterProvider router={router}/>
     <ToastContainer/>
    </div>
  );
}

export default App;
