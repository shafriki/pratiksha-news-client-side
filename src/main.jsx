import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import { router } from './Routes/Routes';
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './proviers/AuthProvider';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <AuthProvider>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
        </AuthProvider>
  </React.StrictMode>,
)

// প্রতীক্ষা নিউজ
// ProtikshaNews
