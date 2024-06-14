# UDP Pinger
A UDP Pinger client and server written in Node.js core modules.

## Table of Contents
- [General Info](#general-info)
- [Technologies](#technologies)
- [Prerequisite](#prerequisite)
- [Setup](#setup)
- [Example](#example)

## General Info
This project includes a UDP client and server implementation in Node.js. To understand the behavior of UDP, including how packets might be lost during transmission, this server simulates packet loss.

## Technologies
- Node.js v20.13.1

## Prerequisite
You should install [Nodejs](https://nodejs.org/en/download/package-manager) and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) for running this project.
## Setup
To run this project, clone it using the following commands and then start the server:
```bash
$ git clone [URL above]
$ npm install  
$ node server.js
$ node client.js [server IP address]
```
## Example
```bash
$ node server.js
$ node client.js 127.0.0.1
Received from 127.0.0.1:3000: Ping 2 8:41:38:60
RTT: 0 ms
Request timed out for sequence 3
Request timed out for sequence 4
Received from 127.0.0.1:3000: Ping 5 8:41:38:60
RTT: 0 ms
Received from 127.0.0.1:3000: Ping 6 8:41:38:60
RTT: 0 ms
Request timed out for sequence 7
Received from 127.0.0.1:3000: Ping 8 8:41:38:60
RTT: 0 ms
Request timed out for sequence 9
Request timed out for sequence 10
$
```