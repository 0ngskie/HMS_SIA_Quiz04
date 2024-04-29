const express = require("express");
const router = express.Router();

const admissionController = require("../controllers/admissionController");

router.get("/", admissionController.admissions);

// api/v1/patients/id
// api/v1/patients/661cd3a0e28300c6a3444b46
router.get("/:id", admissionController.admission);

//create
router.post("/create", admissionController.createAdmission);

router.delete("/delete/:admissionID", admissionController.deleteAdmission);

router.put("/update/:id", admissionController.updateAdmission);

module.exports = router;
