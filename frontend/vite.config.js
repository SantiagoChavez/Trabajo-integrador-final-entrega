import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    port: 5176, // o el que prefieras
    strictPort: true, // da error si el puerto está ocupado, en lugar de cambiarlo
  },
});

