var ros = new ROSLIB.Ros({
  url: "ws://localhost:9090",
});

ros.on("connection", () => {
  document.getElementById("status").innerHTML = "Connected";
});
ros.on("error", () => {
  document.getElementById("status").innerHTML = "Error";
});
ros.on("close", () => {
  document.getElementById("status").innerHTML = "Closed";
});

var txt_listener = new ROSLIB.Topic({
  ros: ros,
  name: "/txt_msg",
  messageType: "std_msgs/String",
});

txt_listener.subscribe((m) => {
  console.log("Got message", m);
  document.getElementById("msg").innerHTML = m.data;
});
