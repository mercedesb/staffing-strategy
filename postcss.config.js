const tailwindcss = require("tailwindcss");
module.exports = {
  plugins: [
    tailwindcss("./src/tailwind.js"),
    require("autoprefixer"),
    // TODO: for production optimization
    // require("@fullhuman/postcss-purgecss")({
    //   content: ["./src/**/*.js", "./public/index.html"],
    //   defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
    // }),
  ],
};
