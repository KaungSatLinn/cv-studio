import { bindings, defineConfig } from "cf/config";
import * as entrypoint from "./worker.js" with { type: "cf-worker" };

export default defineConfig({
  worker: {
    name: "cv-studio-generator",
    compatibilityDate: "2026-09-17",
    workersDev: true,
    entrypoint,
    assets: {
      notFoundHandling: "single-page-application",
    },
    env: {
      ASSETS: bindings.assets(),
    },
  },
});
