const path = require("path");

module.exports = {
  
  webpack: {
    alias: {
      // Allows importing from "@/..." instead of relative paths
      "@": path.resolve(__dirname, "src")
    }
  },

  devServer: {
    hot: true, 
    liveReload: true, 
  },

  style: {
    postcss: {
      plugins: [
        require("tailwindcss"),
        require("autoprefixer")
      ]
    }
  }
};