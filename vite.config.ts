import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import cssOnly from 'rollup-plugin-css-only';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    {
      ...cssOnly({ output: 'style.css' }), // specify the output CSS file
      apply: 'build' // Apply only in the build phase
    }],
})
