/**
 * Created by ea375w on 7/19/2017.
 */
import React from "react";

import {connect} from "react-redux";

class Home extends React.Component{


    render(){
        return(
            <div>
                <h1>Hello World!!</h1>
                <p>{this.props.data[0].firstname}</p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        data:user
    }
}

export default connect(mapStateToProps)(Home);