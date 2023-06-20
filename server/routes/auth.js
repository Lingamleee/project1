//Admin Routes
const {
    adlogin,
    adregister,
    adgetAllUsers,
    setAvatar,
    logOut,
  } = require("../controller/adminController");

//Student Routes
const{
    stlogin,
    stregister,
    stmultiregister,
    stgetAllUsers,
    stsetAvatar,
    stgetStudent,
    stlogOut,
    stgetAllStudents
} = require("../controller/studentController");

//Staff Routes
const{
    sflogin,
    sfregister,
    sfmultiregister,
    sfgetAllUsers,
    sfsetAvatar,
    sflogOut,
    sfgetAvail,
} = require("../controller/staffController");

  
const router = require("express").Router();

//Admin Routes
router.post("/adlogin", adlogin);
router.post("/adregister", adregister);
router.get("/getadmins", adgetAllUsers);
router.post("/setavatar/:id", setAvatar);
router.get("/logout/:id", logOut);

//Student Routes
router.post("/stlogin", stlogin);
router.post("/stregister", stregister);
router.post("/stmultiregister", stmultiregister);
router.get("/getstudent", stgetStudent);
router.get("/getstudents", stgetAllUsers);
router.get("/getallstudents", stgetAllStudents);
router.post("/setavatar/:id", stsetAvatar);
router.get("/logout/:id", stlogOut);

//Staff Routes
router.post("/sflogin", sflogin);
router.post("/sfregister", sfregister);
router.post("/sfmultiregister", sfmultiregister);
router.get("/getstaffs", sfgetAllUsers);
router.post("/setavatar/:id", sfsetAvatar);
router.get("/logout/:id", sflogOut);
router.get("/getstaff", sfgetAvail);



module.exports = router;
  