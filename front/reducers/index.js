/**
 * Created by ea375w on 7/19/2017.
 */


import React from "react";


// Using Combine Reducers to combine all the reducers together.
import {combineReducers} from "redux";


import Test from "./small";

const allReducers = combineReducers({
    test:Test
});


export default allReducers;