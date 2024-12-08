
import { combineReducers } from "redux";
import userReducer from "./userReducer";
import dishesReducer from "./dishesReducer";

const rootReducer = combineReducers({
    user: userReducer,
    dishes: dishesReducer,
});

export default rootReducer;
