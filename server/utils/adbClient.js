const adb = require("adbkit");
const client = adb.createClient();

client
  .listDevices()
  .then((device) =>
    console.log(`Devices connected: ${device.map((dev) => dev.id).join(", ")}`)
  );
module.exports = client;
