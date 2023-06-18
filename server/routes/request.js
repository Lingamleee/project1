const {getRequests, addRequest, acceptRequest} = require("../controller/requestedController");

const {getOnGoing, setOnGoing} = require("../controller/adminController");

const {getPpt, getAllPpt, addPpt, deletePpt} = require("../controller/pptController");

const router = require("express").Router();

router.post("/addreq", addRequest);
router.get("/getreq", getRequests);
router.post("/setongoing", setOnGoing);
router.get("/getongoing", getOnGoing);
router.post("/acceptreq", acceptRequest);

router.post("/addppt", addPpt);
router.get("/getppt", getPpt);
router.get("/getallppt", getAllPpt);
router.delete("/deleteppt", deletePpt);

module.exports = router;

