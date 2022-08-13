module.exports = {
    apps: [
        {
            name: 'Hopes-8005',
            script: 'index.js',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
           
        },
    ] 
};
