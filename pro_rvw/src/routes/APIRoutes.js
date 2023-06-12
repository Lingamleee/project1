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

export const setOnGoingRoute = `${host}/api/request/setongoing`;
export const getOnGoingRoute = `${host}/api/request/getongoing`;