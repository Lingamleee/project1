//host
export const host = "http://localhost:5000"; 



//Admin
export const adminLogin = `${host}/api/auth/adlogin`;
export const adminRegister = `${host}/api/auth/adregister`;
export const adminLogout = `${host}/api/auth/adlogout`;

//Student
export const studentLogin = `${host}/api/auth/stlogin`;
export const studentRegister = `${host}/api/auth/stregister`;
export const studentLogout = `${host}/api/auth/stlogout`;
export const studentMultiRegister = `${host}/api/auth/stmultiregister`;
export const studentGetAll = `${host}/api/auth/getstudent`;
export const allStudents = `${host}/api/auth/getallstudents`;

//Staff
export const staffLogin = `${host}/api/auth/sflogin`;
export const staffRegister = `${host}/api/auth/sfregister`;
export const staffLogout = `${host}/api/auth/sflogout`;
export const staffGetAvail = `${host}/api/auth/getstaff`;
export const staffMultiRegister = `${host}/api/auth/sfmultiregister`;

//get all users:
export const allUsersRoute = `${host}/api/auth/allusers`;
export const getStudents = `${host}/api/auth/getstudents`;
export const getAdmins = `${host}/api/auth/getadmins`;
export const getStaffs = `${host}/api/auth/getstaffs`;


export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const recieveMessageRoute = `${host}/api/messages/getmsg`;

export const sendRequestRoute = `${host}/api/request/addreq`;
export const recieveRequestRoute = `${host}/api/request/getreq`;
export const acceptRequestRoute = `${host}/api/request/acceptreq`;
export const getAcceptedRoute = `${host}/api/request/getaccepted`;

export const setOnGoingRoute = `${host}/api/request/setongoing`;
export const getOnGoingRoute = `${host}/api/request/getongoing`;

//PPT
export const addPptRoute = `${host}/api/addppt`;
export const getPptRoute = `${host}/api/request/getppt`;
export const getAllPptRoute = `${host}/api/request/getallppt`;
export const deletePptRoute = `${host}/api/request/deleteppt`;

//time slot
export const addTimeSlotRoute = `${host}/api/request/addtime`;
export const deleteTimeSlotRoute = `${host}/api/request/deletetime`;
export const getTimeSlotRoute = `${host}/api/request/gettime`;
export const getAllTimeSlotRoute = `${host}/api/request/getalltime`;
export const setTimeSlotRoute = `${host}/api/request/settime`;
export const setFreeRoute = `${host}/api/request/setfree`;
export const getFreeRoute = `${host}/api/request/getfree`;
export const createDateRoute = `${host}/api/request/createdate`;


