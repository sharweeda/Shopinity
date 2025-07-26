import { createBrowserRouter,  RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Error from './components/Error/Error';
import ProductDetails from './components/ProductDetails/ProductDetails';
import './App.css';
import UserContextProvider from './Context/UserContext';
import Dashboard from './Components/Dashboard/Dashboard';
import ProductContextProvider from './Context/ProductContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';

function App() {

  
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <ProtectedRoute><Home/></ProtectedRoute> },
        { path: "products", element: <ProtectedRoute><Products/></ProtectedRoute> },
        { path: "productDetails/:id", element: <ProtectedRoute><ProductDetails/></ProtectedRoute> },
        { path: "dashboard", element: <ProtectedRoute><Dashboard/></ProtectedRoute> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "*", element: <Error /> },
      ],
    },
  ]);

  return (
      <UserContextProvider>
        <ProductContextProvider>
          <RouterProvider router={routes} />
        </ProductContextProvider>
      </UserContextProvider>
    
    
    
      
    

    
  );
}

export default App;
