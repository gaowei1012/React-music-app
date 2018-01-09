import React from "react";
import ReactDOM from "react-dom";
import {CSSTransition} from "react-transition-group";
import {Song} from "@/model/song";

import "./Player.styl";

class Player extends React.Component {
    constructor(props) {
        super(props);

        // 初始化当前各歌曲
        this.currentSong = new Song(0, "", "", "", 0, "", "");
        this.currentIndex = 0; // 初始化播放歌曲位置

        // 播放模式: list=列表, single-单曲, shuffle-随机
        this.PlayModes = ["list", "single", "shuffle"];

        // 初始值
        this.state = {
            currentTime: 0,
            playProgress: 0,
            playStatus: false,
            currentPlayMode: 0
        };
    }

    /* 生命周期钩子函数 */
    componentDidMount() {
        this.audioDOM = ReactDOM.findDOMNode(this.refs.audio);
        this.singerImgDOM = ReactDOM.findDOMNode(this.refs.singerImg);
        this.playerDOM = ReactDOM.findDOMNode(this.refs.player);
        this.playerBgDOM = ReactDOM.findDOMNode(this.refs.playerBg);
    }

    render() {
        let song = this.currentSong;
        // 播放背景
        let playBg = song.img ? song.img: require("@assets/imgs/play_bg.jpg");

        // 播放按钮样式
        let playButtonClass = this.state.playStatus === true ? "icon-pause" : "icon-play";

        song.playStatus = this.state.playStatus;

        return (
            <div className="player-container">
				<CSSTransition in={this.props.showStatus} timeout={300} classNames="player-rotate"
					onEnter={() => {
						this.playerDOM.style.display = "block";
					}}
					onExited={() => {
						this.playerDOM.style.display = "none";
					}}>
                    <div className="player" ref="player">
                        <div className="header">
                            <span className="header-back" onClick={this.hidePlayer}>
                                <i className="icon-back"></i>
                            </span>
                            <div className="header-title">
                                {song.name}
                            </div>
                        </div>
                        <div className="singer-top">
                            <div className="singer">
                                <div className="singer-name">{song.singer}</div>
                            </div>
                        </div>
                        <div className="singer-middle">
                            <div className="singer-img" ref="singerImg">
                                <img src={playBg} alt={song.name} onLoad={
                                    (e) => {
                                        /*图片加载完成后设置背景，防止图片加载过慢导致没有背景*/
                                        this.playerBgDOM.style.backgroundImage = `url("${playBg}")`;
                                    }
                                }/>
                            </div>
                        </div>
                        <div className="singer-bottom">
                            <div className="controller-wrapper">
                                <div className="progress-wrapper">
                                    <span className="current-time">{getTime(this.state.currentTime)}</span>
                                    <div className="play-progress">
                                        <Progress progress={this.state.playProgress}
                                        onDrag={this.handleDrag}
                                        onDragEnd={this.handleDragEnd}/>
                                    </div>
                                    <span className="total-time">{getTime(song.duration)}</span>
                                </div>
                                <div className="play-wrapper">
                                    <div className="play-model-button" onClick={this.changePlayMode}>
                                        <i className={"icon-" + this.playModes[this.state.currentPlayMode] + "-play"}></i>
                                    </div>
                                    <div className="previous-button" onClick={this.previous}>
                                        <i className="icon-previous"></i>
                                    </div>
                                    <div className="play-button" onClick={this.playOrPause}>
                                        <i className={playButtonClass}></i>
                                    </div>
                                    <div className="next-button" onClick={this.next}>
                                        <i className="icon-next"></i>
                                    </div>
                                    <div className="play-list-button" onClick={this.showPlayList}>
                                        <i className="icon-play-list"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="player-bg" ref="playerBg"></div>
                        <audio ref="audio"></audio>
                    </div>
				</CSSTransition>
				<MiniPlayer song={song} progress={this.state.playProgress} 
					playOrPause={this.playOrPause}
					next={this.next}
					showStatus={this.props.showStatus}
					showMiniPlayer={this.showPlayer}/>
			</div>
		);

    }
}

export default Player




