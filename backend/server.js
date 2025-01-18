require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");

const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
const { logEvents } = require("./middleware/logger");




const router6 = require("./routes/authRoute.js");

const PORT = process.env.PORT || 3500;

console.log(process.env.NODE_ENV);

connectDB();

app.use(express.json());

app.use(cors());
app.use(cors(corsOptions));

app.use(logger);
app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));



app.use("/Jailors", require("./routes/JailorRoutes.js"));
app.use("/auth", router6);

// Change this line in server.js
app.use("/Doctors", require("./routes/doctorRoutes.js"));

//Add inmate details
app.use("/inmate", require("./routes/inmates.js"));

//Add appointment details
app.use("/appointment", require("./routes/appointments.js"));

//Add appointment details
app.use("/healthrecord", require("./routes/healthrecords.js"));

app.use(express.json());


//visitor management
app.use("/api/visitor", require("./routes/visitorRoutes"));
app.use("/api/visit", require("./routes/visitRoutes"));


//Security Staff and incident management
app.use("/api/securityStaff", require("./routes/securityStaffRoutes"));
app.use("/api/incident", require("./routes/incidentRoutes"));



app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.join({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});
app.use(errorHandler);
mongoose.connection.once("open", () => {
  console.log("Connected to mongoDB");
  app.listen(PORT, () => console.log(`server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}:${err.code}\t${err.syscall}\t{err.hostname}`,
    "mongoErrLog.log"
  );
});
