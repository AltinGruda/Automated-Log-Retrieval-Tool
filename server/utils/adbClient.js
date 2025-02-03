const adb = require("adbkit");
const client = adb.createClient({ host: "127.0.0.1", port: 5037 });

client
  .listDevices()
  .then((device) =>
    console.log(`Devices connected: ${device.map((dev) => dev.id).join(", ")}`)
  );
module.exports = client;
