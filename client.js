const UDP = require('dgram');
const client = UDP.createSocket('udp4');
const port = 3000;
const hostname = process.argv[2];

client.on('message', (mes, rInfo) => {
    const sentTime = mes.toString().split(' ')[2];
    const rtt = calculateTime(sentTime);
    max = Math.max(max, rtt);
    min = Math.min(min, rtt);
    sum += rtt;
    num_of_received_message++;
    console.log(`Received from ${rInfo.address}:${rInfo.port}`);
    console.log(`RTT: ${rtt} ms`);
});
let min = 1e9;
let max = -1;
let sum = 0;
let num_of_received_message = 0;
for (let i = 1; i <= 10; i++) {
    setTimeout(() => {
        const date = new Date();
        const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
        sendPing(i, time);
        client.once('message', () => {
            clearTimeout(timeoutId);
        });

        const timeoutId = setTimeout(() => {
            console.log(`Request timed out for sequence ${i}`);
        }, 1000);
    }, i * 1000);
}

setTimeout(() => {
    console.log(`rtt min/avg/max/rate: ${min}/${sum/num_of_received_message}/${max}/${(10-num_of_received_message)/10*100}%`);
    client.close();
}, 12000);

function sendPing(sequenceNumber, time) {
    const message = Buffer.from(`Ping ${sequenceNumber} ${time}`);
    client.send(message, 0, message.length, port, hostname, (err) => {
        if (err) {
            console.error(err);
            client.close();
        }
    });
}

function calculateTime(sentTime) {
    const timePart = sentTime.split(':');
    const time = parseInt(timePart[3]) + 1000*(parseInt(timePart[2]) + parseInt(timePart[1])*60 + parseInt(timePart[0])*60*60);
    const date = new Date();
    const curTime = date.getMilliseconds() + 1000*(date.getSeconds() + date.getMinutes()*60 + date.getHours()*60*60);
    return curTime - time;
}
