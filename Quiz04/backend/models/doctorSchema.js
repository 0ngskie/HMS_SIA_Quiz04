const { Int32 } = require("mongodb");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const doctorDocument = new Schema({
  lastName: {
    type: String,
    required: [true, "last name is needed"],
  },

  firstName: {
    type: String,
    required: [true, "first name is needed"],
  },

  speciality: {
    type: String,
    required: [true, "Speciality is required"]
  },

  active: {
    type: Boolean,
    default: true,
  },
});

const Doctor = mongoose.model("doctors", doctorDocument);
module.exports = Doctor;
