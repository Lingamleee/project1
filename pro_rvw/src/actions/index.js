//action for addStudents

// Path: src\actions\index.js

export const STUDENT_LIST = 'STUDENT_LIST';


export function addStudents(students){
    return {
        type: STUDENT_LIST,
        students
    }
}


export const STAFF_LIST = 'STAFF_LIST';

export function addStaffs(staffs){
    return {
        type: STAFF_LIST,
        staffs
    }
}

export const CURRENT_USER = 'CURRENT_USER';

export function setCurrentUser(user){
    console.log("user", user);
    //set user name where id 1
    return {
        type: CURRENT_USER,
        user
    }
}

export const CURRENT_ACCESOR = 'CURRENT_ACCESOR';

export function setCurrentAccesor(accesor){
    console.log("accesor", accesor);
    //set user name where id 1 
    return {
        type: CURRENT_ACCESOR,
        accesor
    }
}

export const ONGOING_PROCESS = 'ONGOING_PROCESS';

export function setOngoingProcess(process){
    console.log("process hii", process);
    
    //set user name where id 1
    return {
        type: ONGOING_PROCESS,
        process
    }
}



