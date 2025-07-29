// @ts-check
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(eslintPluginPrettierRecommended, {
  rules: {
    "@typescript-eslint/no-explicit-any": "warn",
  },
});
