const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process");

const app = express();

const launchFilename = "websocket.launch";
const packageName = "ros_control_center";

app.use(cors());

let zsh = null;

app.get("/init", (req, res) => {
  if (zsh) {
    return res.send("Already created");
  }
  zsh = spawn("zsh");
  zsh.on("spawn", () => {
    zsh.stdin.write(`roslaunch ${packageName} ${launchFilename}`);
    zsh.stdin.end();

    zsh.stdout.on("data", (data) => {
      console.log(data.toString());
    });
  });

  zsh.on("exit", () => {
    console.log("Exited");
  });
  zsh.stderr.on("data", (data) => {
    console.log(data.toString());
  });

  return res.status(200).send("DONE");
});

app.get("/disconnect", (req, res) => {
  zsh.stdin.write("\n~^C");

  res.status(200).send("Disconnected");
});

app.listen(5000, () => {
  console.log("ROS Server running.....");
});
