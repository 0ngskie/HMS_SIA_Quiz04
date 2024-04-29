require("dotenv").config();
const express = require("express");
const app = express();
const portNumber = 4000;

const mongoose = require("mongoose");

// Middleware

app.use(express.json());

// DB Connection
console.log(process.env.MONGO_URI);

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});

db.once("open", () => console.log("connected to MongoDB"));

// Routes
const doctorRoute = require("./routes/doctorRoute");
app.use("/api/v1/doctors", doctorRoute);

const admissionRoute = require("./routes/admissionRoute");
app.use("/api/v1/admissions", admissionRoute);

const patientRoute = require("./routes/patientRoute");
app.use("/api/v1/patients", patientRoute);

app.listen(portNumber, () => {
  console.log("new changee 1");
  console.log("new changee 2");

  console.log("new changee 3");

  console.log(`server is running on http://localhost:${portNumber}`);

  console.log("new changee 4");
});