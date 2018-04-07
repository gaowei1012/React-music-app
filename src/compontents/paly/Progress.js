import React, { Component } from 'react'
import PropType from 'prop-types'
import ReactDOM from 'react-dom'

import './progress.styl'


class Progress extends Component {
	constructor(props) {
		super(props)
	}

	componentDidUpdate() {

		// 组件更新后重新获取进度条总宽度
		if (!this.progressBarWithd) {
			this.progressBarWithd = ReactDOM.findDOMNode(this.refs.progressBar).offsetWidth
		}

	}

	componentDidMount() {
		// 获取元素DOM
		let progressBarDOM = ReactDOM.findDOMNode(this.refs.progressBar);
		let progressDOM = ReactDOM.findDOMNode(this.refs.progress);
		let progressBtnDOM = ReactDOM.findDOMNode(this.refs.progressBtn);
		this.progressBarWithd = progressBarDOM.offsetWidth;

		let { disableButton, disableDrag, onDragStart, OnDrag, onDragEnd } = this.props;
		if (disableButton !== true && disableDrag !== true) {
			// 触摸位置
			let downX = 0;
			// 按钮left值
			let buttonLeft = 0;

			progressBtnDOM.addEventListener('touchstart', (e) => {
				let touch = e.touch[0];
				downX = touch.clientX;
				buttonLeft = parseInt(touch.target.style.left, 10);

				if (onDragStart) {
					onDragStart();
				}
			})

			progressBtnDOM.addEventListener('touchmove', (e) => {
				// 阻止浏览器的默认行为
				e.preventDefault();

				let touch = e.touch[0];
				let diffx = touch.clientX - downX;

				let btnLeft = buttonLeft + diffx;
				if (btnLeft > progressBarDOM.offsetWidth) {
					btnLeft = this.progressBarDOM.offsetWidth;
				} else if (btnLeft < 0) {
					buttonLeft = 0;
				}
				// 设置按钮left值
				touch.target.style.left = btnLeft + 'px';
				// 设置进度width值
				progressDOM.style.width = buttonLeft / this.progressBarWidth * 100 + "%";

				if (OnDrag) {
					OnDrag(btnLeft / this.progressBarWidth)
				}
			})

			progressBarDOM.addEventListener('touchend', (e) => {
				if (onDragEnd) {
					onDragEnd();
				}
			})
		}
	}

	render() {
		// 进度范围 0--1
		let { progress, disableButton } = this.props
		if (!progress) progress = 0;

		// 按钮 left 值
		let progressButtonOffsetLeft = 0;
		if (this.progressBarWithd) {
			progressButtonOffsetLeft = progress * this.progressBarWithd
		}
		return (
			<div className="progress-bar" ref="progressBar">
				<div className="progress-load"></div>
				<div className="progress" style={{ width: `${progress * 100}%` }} ref="progress"></div>
				{
					disableButton === true ? "" :
						<div className="progress-button" style={{ left: progressButtonOffsetLeft }} ref="progressBtn"></div>
				}
			</div>
		);
	}
}

Progress.PropType = {
	progress: PropType.number.isRequired,
	disableButton: PropType.bool,
	disableDrag: PropType.bool,
	onDragStart: PropType.func,
	OnDrag: PropType.func,
	onDragEnd: PropType.func
};

export default Progress