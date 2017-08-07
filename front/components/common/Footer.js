import React from "react";
import css from "../../public/css/footer.scss";

class Footer extends React.Component {

    render() {
        return (
            <div className="footer">
                <div className="ui inverted vertical footer segment">
                    <div className="ui container">
                        <div className="ui stackable inverted divided equal height stackable grid">
                            <div className="four wide center aligned column">
                                <h4 className="ui inverted header">About BootCruit</h4>
                                    <p className="aboutDesc">BootCruit is a single-click staffing solution to connect recruiters and employers to current and recently graduated coding bootcamp students.</p>
                            </div>
                            <div className="eight wide center aligned column">
                                <h2 className="ui inverted header">Single-Click Staffing Solutions</h2>
                                <button className="ui blue inverted center aligned button">Sign Up</button>
                            </div>
                            <div className="four wide center aligned column">
                                <h4 className="ui inverted header">Useful Resources</h4>
                                <div className="ui inverted link list">
                                    <a href="/about" className="item">About</a>
                                    <a href="https://github.com/accimeesterlin/Tab-Nabbers2" className="item" target="_blank">BootCruit GitHub</a>
                                    <a href="http://www.reactd3.org/" className="item" target="_blank">React D3</a>
                                    <a href="#" className="item">Contact</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ui center aligned inverted container">© 2017 Copyright: <a href="/"> BootCruit.com </a>
                </div>
            </div>
        )
    }
}

export default Footer;
