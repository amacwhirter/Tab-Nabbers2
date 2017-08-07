import React from "react";

class D3Map extends React.Component {

    handleClick = () => {
        nodeOut();
        d3.select('#modal').style('display', 'none');
    };

    render() {
        return (
            <div className="container">
                <div className="view hm-black-strong" id = "dashboardCover">
                    <div className="full-bg-img flex-center">
                        <div className="d3container">
                            <div id="map"></div>
                            <div id="atlantaVis"></div>
                            <div id="modal">
                                <div id="content"></div><button id="modalClose" onClick={this.handleClick}>X</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default D3Map;
