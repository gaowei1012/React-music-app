import React from "react"
import "./header.styl"

/**
 * 公用的header组件
 */
class MusicHeader extends React.Component {
    /**
	 *  返回上一级菜单
     */
	handleClick() {
		window.history.back();
	}
	render() {
		return (
			<div className="music-header">
				<span className="header-back" onClick={this.handleClick}>
					<i className="icon-back"></i>
				</span>
				<div className="header-title">
					{this.props.title}
				</div>
			</div>
		);
	}
}

export default MusicHeader