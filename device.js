const mqtt = require("mqtt");

const mqttClient = mqtt.connect("mqtt://broker.hivemq.com");

mqttClient.on("connect", () => {
    console.log("Simulated device connected to MQTT broker");
    mqttClient.subscribe("smart-home/light", (err) => {
        if (!err) console.log("Subscribed to topic: smart-home/light");
    });
});

mqttClient.on("message", (topic, message) => {
    console.log(`Message received on topic ${topic}: ${message.toString()}`);
    if (message.toString() === "ON") {
        console.log("Simulated: Turning the light ON");
    } else if (message.toString() === "OFF") {
        console.log("Simulated: Turning the light OFF");
    }
});
