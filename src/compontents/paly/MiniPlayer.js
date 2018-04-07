import React, { Component } from 'react'
import Progress from './Progress'

import './miniplayer.styl'

class MiniPlayer extends Component {

    haldlePlayOrPause(e) {
        e.stopPropagation();
        if (this.props.song.url) {
            // 调用父组件的播放或暂停方法
            this.props.playOrPause();
        }
    }

    haldleNext = (e) => {
        e.stopPropagation();
        if (this.props.song.url) {
            // 调用父组件播放下一首方法
            this.props.next();
        }
    }

    render() {
        let song = this.props.song;

        let playerStyle = {};
        if (this.props.showStatus === true) {
            playerStyle = { dispaly: "none" }
        }
        if (!song.img) {
            song.img = require('@/assets/imgs/music.png')
        }

        let imgStyle = {};
        if (song.playStatus === true) {
            imgStyle["WebkitAnimationPlayState"] = "running";
            imgStyle["animationPlayState"] = "running";
        } else {
            imgStyle["WebkitAnimationPlayState"] = "paused";
            imgStyle["animationPlayState"] = "paused";
        }

        let playButtonClass = song.playStatus === true ? "icon-pause" : "icon-play";

        return (
            <div className="mini-player" style={playerStyle}>
                <div className="player-img rotate" style={imgStyle}>
                    <img src={song.img} alt={song.name} />
                </div>
                <div className="player-center">
                    <div className="progress-wrapper">
                        <Progress disableButton={true} progress={this.props.progress} />
                    </div>
                    <span className="song">
                        {song.name}
                    </span>
                    <span className="singer">
                        {song.singer}
                    </span>
                </div>
                <div className="player-right">
                    <i className={playButtonClass} onClick={this.haldlePlayOrPause}></i>
                    <i className="icon-next ml-10" onClick={this.haldleNext}></i>
                </div>
                <div className="filter"></div>
            </div>
        );
    }
}

export default MiniPlayer