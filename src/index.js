import React from 'react';
import ReactDOM from 'react-dom/client';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import UserContextprovider, { UserContext } from './Context/UserContext.js';
import { QueryClient, QueryClientProvider } from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools'
import CartContextProvider from './Context/CartContext.js';
import WishContextProvider from './Context/WishContext.js';



let queryClinet = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <WishContextProvider>
    <CartContextProvider>
      <UserContextprovider>
        <QueryClientProvider client={queryClinet}>
          <App />
          <ReactQueryDevtools/>
        </QueryClientProvider>
      </UserContextprovider>
    </CartContextProvider>
    </WishContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
