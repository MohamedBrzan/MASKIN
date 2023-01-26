import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import store from './store/store';
import MySpinner from './utils/MySpinner';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Suspense fallback={MySpinner}>
    <React.StrictMode>
      <HelmetProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path='/*'
              element={
                <Provider store={store}>
                  <App />
                </Provider>
              }
            />
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </React.StrictMode>
  </Suspense>
);
