module.exports = (client) => {
    process.on('unhandledRejection', (reason, promise) => {
        console.error('🚨 Unhandled Rejection at:', promise, 'reason:', reason);
    });

    process.on('uncaughtException', (err) => {
        console.error('🔥 Uncaught Exception:', err);
    });

    process.on('uncaughtExceptionMonitor', (err) => {
        console.error('⚠️ Uncaught Exception Monitor:', err);
    });

    client.on('error', (error) => {
        console.error('❌ Discord Client Error:', error);
    });

    console.log('✅ Anticrash module loaded!');
};
