import React from "react";
import "./header.styl";

class Header extends React.Component {

    handleClick() {
        // 返回
        window.history.back();
    }
    render() {
        return(
            <div className="music-header">
                <span className="header-back" onClick={this.handleClick}>
                    <i className="icon-back" />
                </span>
                <div className="header-title">
                   {this.props.title} 
                </div>
            </div>
        );
    }
}

export default Header