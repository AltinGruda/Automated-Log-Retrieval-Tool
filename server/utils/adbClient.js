const adb = require('adbkit');
const client = adb.createClient();


const emulatorPort = 5555; // Default emulator port
const emulatorIp = '127.0.0.1';


client.connect(emulatorIp, emulatorPort)
  .then(() => console.log(`Connected to emulator at ${emulatorIp}:${emulatorPort}`))
  .catch(err => console.error('Failed to connect:', err));

client.listDevices().then(device => console.log(`Devices connected: ${device.map(dev => dev.id).join(', ')}`))


module.exports = client;
