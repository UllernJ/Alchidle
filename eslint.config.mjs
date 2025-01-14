// eslint.config.mjs
import ESLint from "@eslint/js";
import Oxlint from "eslint-plugin-oxlint";
import pluginVue from "eslint-plugin-vue";
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from "@vue/eslint-config-typescript";
import eslintConfigPrettier from "eslint-config-prettier";

export default defineConfigWithVueTs(
  ESLint.configs.recommended,
  pluginVue.configs["flat/essential"],
  vueTsConfigs.recommendedTypeChecked,
  Oxlint.configs["flat/recommended"],
  eslintConfigPrettier,
);