import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["src/index"],
  clean: true,
  declaration: false,
  sourcemap: false,
  outDir: "dist",
  rollup: { esbuild: { target: "node18", minify: true } },
});
