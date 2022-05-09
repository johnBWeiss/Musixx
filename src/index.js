import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'
import { FavoritesContextProvider } from './store/Favorites-context';

ReactDOM.render(
  < div className="indexWrapper">
    <FavoritesContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FavoritesContextProvider></div>
  ,
  document.getElementById('root')
);


reportWebVitals();
