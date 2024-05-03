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
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^types$",
    "^@/types/(.*)$",
    "^@/config/(.*)$",
    "^@/lib/(.*)$",
    "^@/hooks/(.*)$",
    "^@/components/ui/(.*)$",
    "^@/components/(.*)$",
    "^@/app/(.*)$",
    "",
    "^[./]",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  tailwindConfig: "./tailwind.config.js",
  tailwindFunctions: ["clsx"],
  importOrderTypeScriptVersion: "5.0.0",
};
