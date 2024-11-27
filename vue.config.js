const {    defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        allowedHosts: 'all'
    }
/*    devServer:{
      proxy:'http://yourBackEnd.com:9000'
    }
*/
})