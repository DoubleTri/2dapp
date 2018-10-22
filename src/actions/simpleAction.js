import { db } from "../firebase";

export const login = email => async dispatch => {
    dispatch({
        type: 'LOGIN_ACTION',
        payload: email
    })
};

export const add = color => async dispatch => {
    var arr = db.child('pastColor').push();
    arr.set(color);
    db.update({result: color});
};

export const completeToDo = completeToDoId => async dispatch => {
    db.remove();
};

export const simpleAction = (obj) => async dispatch => {
    db.once("value", snapshot => {
        dispatch({
            type: 'SIMPLE_ACTION',
            payload: {result: obj.result, pastColor: obj.pastColor}
        })
    })
}