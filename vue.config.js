const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    transpileDependencies: true,
    css: {
        loaderOptions: {
            postcss: {
                postcssOptions: {
                    plugins: [
                        require('tailwindcss'),
                        require('autoprefixer')
                    ]
                }
            }
        }
    },
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://dev2.rastreo.gs:9000',
                changeOrigin: true,
                secure: false,
            }
        },
        allowedHosts: 'all'
    }
})
