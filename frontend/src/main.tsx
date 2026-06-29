import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createTheme,ThemeProvider } from '@mui/material';
import { BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx';
//go to mui.com for matrial ui

import {Toaster} from 'react-hot-toast'

import axios from "axios";
// set default base URL for axios
axios.defaults.baseURL = "https://ai-chat-model-project-1.onrender.com//api/v1"; //
axios.defaults.withCredentials = true; // helps to exchange the cookies
const theme= createTheme({ //theme for matrial ui
  typography:{
    fontFamily:"Roboto,sarif",
    allVariants:{color:'white'}
  }
})
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Toaster position='top-right'/>
      <App />
    </ThemeProvider>
    </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
