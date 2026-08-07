import adapter from "@sveltejs/adapter-static";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import fs from "fs";
import path from "path";

export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync(
        path.resolve(import.meta.dirname, "cert/localhost-key.pem"),
        {
          encoding: "utf-8",
        }
      ),
      cert: fs.readFileSync(
        path.resolve(import.meta.dirname, "cert/localhost.pem"),
        {
          encoding: "utf-8",
        }
      ),
    },
  },
  plugins: [
    sveltekit({
      compilerOptions: {
        // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
        runes: ({ filename }) =>
          filename.split(/[/\\]/).includes("node_modules") ? undefined : true,
      },

      // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
      // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
      // See https://svelte.dev/docs/kit/adapters for more information about adapters.
      adapter: adapter({
        fallback: "index.html",
      }),
    }),
  ],
});
