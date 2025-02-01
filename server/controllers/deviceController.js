const {
  filterByPriority,
  filterByTag,
  filterByPid,
  filterByKeyword,
  filterByTimeRange,
} = require("../helpers/helperFunctions");
const client = require("../utils/adbClient");

const getDevices = async (req, res) => {
  try {
    const devices = await client.listDevices();
    res.json(devices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDeviceStatus = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Device id is required" });
    }

    const deviceStatus = await client.getState(id);
    res.json({ status: deviceStatus });
  } catch (error) {
    console.error("Error fetching device status:", error.message);
    res.status(500).json({ error: "Failed to retrieve device status" });
  }
};

const getDeviceLogcat = async (req, res) => {
  try {
    const { id } = req.params;
    const { level, tag, pid, search, startTime, endTime } = req.query;

    if (!id) {
      return res.status(400).json({ error: "Device ID is required" });
    }

    console.log(`Fetching logcat for device: ${id}`);

    const logcat = await client.openLogcat(id);
    let logs = [];

    logcat.on("entry", (entry) => {
      logs.push({
        timestamp: entry.date.toISOString(),
        pid: entry.pid,
        tid: entry.tid,
        tag: entry.tag,
        priority: entry.priority,
        message: entry.message,
      });

      if (logs.length > 1000) logs.shift(); // Prevent memory overload
    });

    setTimeout(() => {
      if (level) logs = filterByPriority(logs, level);
      if (tag) logs = filterByTag(logs, tag);
      if (pid) logs = filterByPid(logs, pid);
      if (search) logs = filterByKeyword(logs, search);
      if (startTime || endTime)
        logs = filterByTimeRange(logs, startTime, endTime);

      if (logs.length === 0) {
        res.status(404).json({ message: "No logs found" });
      } else {
        res.json({ logs });
      }
      logcat.end();
    }, 3000);
  } catch (error) {
    console.error("Error fetching logcat:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to retrieve logcat logs" });
  }
};

module.exports = { getDevices, getDeviceStatus, getDeviceLogcat };
