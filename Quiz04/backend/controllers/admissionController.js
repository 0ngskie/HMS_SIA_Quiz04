const Admission = require("../models/admissionSchema");

const mongoose = require("mongoose");

module.exports.admissions = (req, res) => {
  Admission.find({  })
    .then((admission) => res.send(admission))
    .catch((error) => res.send(error));
};

module.exports.admission = (req, res) => {
  const admissionID = req.params.id;

  Admission.findById(admissionID)
    .then((admission) => res.send(admission))
    .catch((error) => res.send(error));
};

module.exports.createAdmission = (req, res) => {
  const { admissionDate, dischargeDate, diagnosis } = req.body;

  const newAdmission = new Admission({
    admissionDate,
    dischargeDate,
    diagnosis
  });

  try {
    const savedAdmission = newAdmission.save();
    res.status(201).json({ "new Admission": newAdmission });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

module.exports.deleteAdmission = (req, res) => {
  const admissionID = req.params.admissionID;
  console.log(admissionID);

  // Using findByIdAndDelete to remove the admission document from the database
  Admission.findByIdAndDelete(admissionID)
    .then(admission => {
      if (!admission) {
        // If no admission is found, send a 404 response
        return res.status(404).send({ message: 'Admission not found' });
      }
      // Send a success message along with the deleted admission document
      res.send({ message: 'Admission deleted successfully', admission });
    })
    .catch(error => {
      // Handle any errors during the operation
      res.status(500).send(error);
    });
};

module.exports.updateAdmission = (req, res) => {
  const { admissionDate, dischargeDate, diagnosis } = req.body;

  console.log(req.body);

  const admissionID = req.params.id;
  console.log(admissionID);

  const updatedFields = { admissionDate, dischargeDate, diagnosis };

  console.log(updatedFields);

  Admission.findByIdAndUpdate(admissionID, updatedFields, { new: true })
    .then((updatedAdmission) => {
      if (!updatedAdmission) {
        return res.status(404).json({ error: "patient not found" });
      }

      res.status(200).json(updatedAdmission);
    })

    .catch((error) => {
      res.status(500).json({ error: error.message || "Internal server error" });
    });
};
