require.config({
    baseUrl: './scripts/',

    paths: {
        'socket.io': '//cdn.socket.io/socket.io-1.2.1'
    }
});

require([
    'socket-handler'
]);
