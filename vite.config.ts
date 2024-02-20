import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import cssOnly from 'rollup-plugin-css-only';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
