const Doctor = require("../models/doctorSchema");

const mongoose = require("mongoose");

module.exports.doctors = (req, res) => {
  Doctor.find({ active: true })
    .then((doctors) => res.send(doctors))
    .catch((error) => res.send(error));
};

module.exports.doctor = (req, res) => {
  const doctorID = req.params.id;

  Doctor.findById(doctorID)
    .then((doctors) => res.send(doctors))
    .catch((error) => res.send(error));
};

module.exports.createDoctor = (req, res) => {
  const { lastName, firstName, speciality, active } = req.body;

  const newDoctor = new Doctor({
    lastName,
    firstName,
    speciality,
    active,
  });

  try {
    const savedDoctor = newDoctor.save();
    res.status(201).json({ "new patient": newDoctor });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

module.exports.deleteDoctor = (req, res) => {
    const doctorID = req.params.doctorID;
    console.log(doctorID);
  
    // Using findByIdAndDelete to remove the doctor document from the database
    Doctor.findByIdAndDelete(doctorID)
      .then(doctor => {
        if (!doctor) {
          return res.status(404).send({ message: 'Doctor not found' });
        }
        res.send({ message: 'Doctor deleted successfully', doctor });
      })
      .catch(error => res.status(500).send(error));
  };
  

module.exports.updateDoctor = (req, res) => {
  const { lastName, firstName, speciality, active } = req.body;

  console.log(req.body);

  const doctorID = req.params.id;
  console.log(doctorID);

  const updatedFields = { lastName, firstName, speciality, active };

  console.log(updatedFields);

  Doctor.findByIdAndUpdate(doctorID, updatedFields, { new: true })
    .then((updatedDoctor) => {
      if (!updatedDoctor) {
        return res.status(404).json({ error: "patient not found" });
      }

      res.status(200).json(updatedDoctor);
    })

    .catch((error) => {
      res.status(500).json({ error: error.message || "Internal server error" });
    });
};
