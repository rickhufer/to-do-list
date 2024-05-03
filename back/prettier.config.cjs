// @ts-check

/** @type {import('prettier').Config} */
module.exports = {
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  jsxSingleQuote: true,
  quoteProps: "preserve",
  arrowParens: "always",
  useTabs: false,
  importOrder: [
    "^types$",
    "^@/types/(.*)$",
    "^@/config/(.*)$",
    "^@/lib/(.*)$",
    "",
    "^[./]",
  ],
  importOrderParserPlugins: ["typescript", "decorators-legacy"],
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  importOrderTypeScriptVersion: "5.0.0",
};
