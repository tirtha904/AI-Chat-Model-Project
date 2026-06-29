import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/api':{
        target:'https://ai-chat-model-project-1.onrender.com/api/v1',
        changeOrigin:true,
        secure:false,
      }
    }
  }
})
