import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     svgr(),
//   ],
// })

export default defineConfig(({ mode }) => {
  const isDev = mode !== "production";

  return {
    plugins: [
      // react(),
      svgr(),
      react({
        babel: {
          plugins: isDev ? ["check-prop-types"] : [],
        },
      }),
    ],
  };
});
