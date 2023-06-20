const {getRequests, addRequest, acceptRequest, getAccepted} = require("../controller/requestedController");

const {getOnGoing, setOnGoing} = require("../controller/adminController");

const {getPpt, getAllPpt, addPpt, deletePpt} = require("../controller/pptController");

const {addTimeSlot, deleteTimeSlot, getAllTimeSlot, getFree, getTimeSlot, setFree, setTimeSlot, createDate} = require("../controller/timeController");

const router = require("express").Router();

router.post("/addreq", addRequest);
router.get("/getreq", getRequests);
router.post("/setongoing", setOnGoing);
router.get("/getongoing", getOnGoing);
router.post("/acceptreq", acceptRequest);
router.get("/getaccepted", getAccepted);

router.post("/addppt", addPpt);
router.get("/getppt", getPpt);
router.get("/getallppt", getAllPpt);
router.delete("/deleteppt", deletePpt);


router.post("/addtime", addTimeSlot);
router.post("/deletetime", deleteTimeSlot);
router.get("/gettime", getTimeSlot);
router.get("/getalltime", getAllTimeSlot);
router.post("/settime", setTimeSlot);
router.post("/setfree", setFree);
router.post("/getfree", getFree);
router.post("/createdate", createDate);


module.exports = router;

