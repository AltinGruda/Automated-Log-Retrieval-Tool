const express = require("express");
const router = express.Router();
const deviceController = require("../controllers/deviceController");

router.get("/devices", deviceController.getDevices);
router.get("/device/status/:id", deviceController.getDeviceStatus);
router.get("/device/logs/:id", deviceController.getDeviceLogcat);
router.post("/device/connect", deviceController.connectToDevice);

module.exports = router;
