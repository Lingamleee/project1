const {getRequests, addRequest, acceptRequest} = require("../controller/requestedController");

const {getOnGoing, setOnGoing} = require("../controller/adminController");

const router = require("express").Router();

router.post("/addreq", addRequest);
router.get("/getreq", getRequests);
router.post("/setongoing", setOnGoing);
router.get("/getongoing", getOnGoing);
router.post("/acceptreq", acceptRequest);

module.exports = router;

