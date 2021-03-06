import {FAILURE, LOGIN_REQUEST, LOGOUT_REQUEST, SUCCESS} from "./authTypes";

export const authenticateUser = (email, password) => {

    return dispatch =>{
        dispatch(loginRequest());
        if (email === email  && password === password) {
            dispatch(success(true));
        }else {
            dispatch(failure())
        }
    }
}


const loginRequest = () => {
    return {
        type: LOGIN_REQUEST
    };
};

export const logoutUser = () => {
    return dispatch => {
        dispatch(logoutRequest());
        dispatch(success(false));
    }
}

const logoutRequest = () => {
    return {
        type: LOGOUT_REQUEST
    };
};

const success = isLoggedIn => {
    return {
        type: SUCCESS,
        payload: isLoggedIn
    };
};

const failure = () => {
    return {
        type: FAILURE,
        payload: false
    };
};