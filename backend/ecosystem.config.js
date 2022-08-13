module.exports = {
    apps: [
        {
            name: 'Hopes-8005',
            script: 'index.js',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                PORT: 8005,
                DATABASE: 'mongodb+srv://inmenzo-cl:kteUOuOgDa7olTAp@cluster0.jdf2z.mongodb.net/HopesNews?retryWrites=true&w=majority',
                SECRET: 'FHREJTYIKTJFtw54ojghbjkhgihhojjGGEhtrtthhMDRETY',
                KEY:'rigyerigbeihruvwrg5iu448t3lhjbvfdrguifsdcfkjo34tnbe',
            },
        },
    ] 
};