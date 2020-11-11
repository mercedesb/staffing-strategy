const tailwindcss = require("tailwindcss");

let plugins = [tailwindcss("./src/tailwind.js"), require("autoprefixer")];

if (process.env.NODE_ENV === "production") {
  plugins.push(
    require("@fullhuman/postcss-purgecss")({
      content: ["./src/**/*.js", "./public/index.html"],
      defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
    })
  );
}

module.exports = {
  plugins,
};
