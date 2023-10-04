const PROXY_CONFIG = [
  {
    context: ['/proxy'],
    target: "https://fakestoreapi.com",
    secure: true,
    changeOrigin: true,
    logLevel: "debug",
    pathRewrite: {
      "^/proxy": ""
    }
  }
]

module.exports = PROXY_CONFIG;
