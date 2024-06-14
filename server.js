const UDP = require('dgram');
const server = UDP.createSocket('udp4');
const port = 3000;

server.on('listening', () => {
    const address = server.address();
    console.log(`Listening to address: ${address.address} with port: ${address.port}`);
})

server.on('message', (mes, rInfo) => {
    console.log(`message: ${mes.toString()}`);
    const rand = getRandomInt(1, 10);
    console.log(rand);
    if(rand >= 4) {
        server.send(mes, rInfo.port, rInfo.address, (err) => {
            if (err) {
                console.error('Failed to send response !!')
            } else {
                console.log('Response send Successfully')
            }
        });
    }

});

server.bind(port);

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}