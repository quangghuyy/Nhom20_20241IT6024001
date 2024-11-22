const express = require("express");
const bodyParser = require("body-parser");
const mqtt = require("mqtt");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static("public"));

// Kết nối MQTT Broker
const mqttClient = mqtt.connect("mqtt://broker.hivemq.com"); // Broker công cộng

mqttClient.on("connect", () => {
    console.log("Connected to MQTT broker");
});

// API điều khiển bóng đèn
app.post("/control-light", (req, res) => {
    const { state } = req.body;
    if (state === "ON" || state === "OFF") {
        mqttClient.publish("smart-home/light", state);
        res.status(200).send({ message: `Light turned ${state}` });
    } else {
        res.status(400).send({ error: "Invalid state" });
    }
});

// Khởi chạy server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
