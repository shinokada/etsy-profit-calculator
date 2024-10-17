import type { Config } from 'tailwindcss';

export default { 
  content: [
    './src/**/*.{html,js,svelte,ts}', 
    './node_modules/svelte-5-ui-lib/**/*.{html,js,svelte,ts}', 
    './node_modules/flowbite-svelte-icons/**/*.{html,js,svelte,ts}'
  ], 
  darkMode: 'selector', 
  theme: {
    extend: {
      colors: {
				// indigo
				primary: { "50": "#eef2ff", "100": "#e0e7ff", "200": "#c7d2fe", "300": "#a5b4fc", "400": "#818cf8", "500": "#6366f1", "600": "#4f46e5", "700": "#4338ca", "800": "#3730a3", "900": "#312e81" },
				secondary: {"50":"#f0f9ff","100":"#e0f2fe","200":"#bae6fd","300":"#7dd3fc","400":"#38bdf8","500":"#0ea5e9","600":"#0284c7","700":"#0369a1","800":"#075985","900":"#0c4a6e"}
      }
    }
  },
} as Config;
