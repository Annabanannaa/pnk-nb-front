module.exports = {
    apps: [
        {
            name: 'Nuxt3App',
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs'
        }
    ]
};
