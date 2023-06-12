//Student list reducers
import { STAFF_LIST, STUDENT_LIST, CURRENT_USER, CURRENT_ACCESOR , ONGOING_PROCESS} from "../actions";

const initialState = {
    students: [],
    staffs: [],
    user: null,
    accesor: null,
    process: 0,
}


export default function Users(state = initialState, action) {
    switch (action.type) {
        case STUDENT_LIST:
            return {
                ...state,
                students: action.students
            }
        case STAFF_LIST:
            return {
                ...state,
                staffs: action.staffs
            }
        case CURRENT_USER:
            return {
                ...state,
                user: action.user
            }
        case CURRENT_ACCESOR:
            return {
                ...state,
                accesor: action.accesor
            }
        case ONGOING_PROCESS:
            return {
                ...state,
                process: action.process
            }
        default:
            return state
    }
}

