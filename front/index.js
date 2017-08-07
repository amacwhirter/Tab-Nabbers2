/**
 * Created by esterlingaccime on 6/24/17.
 */
import React from "react";

import ReactDOM from "react-dom";

import Routes from "./routes/routes";

import {createStore} from "redux";


import reducers from "./reducers/index";



const store = createStore(reducers);

ReactDOM.render(<Routes store={store} />,

    document.getElementById("app"));


if(module.hot){
    module.hot.accept();
}