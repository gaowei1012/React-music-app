import React from "react";
import Progress from "./Progress";

import "./miniplayer.styl";

class MiniPlayer extends React.Component {

    constructor(props) {
        super(props);
        //  console.log(props); // {}
    }

    handlePlayOrPause = (e) => {
        e.stopPropagation();
        if (this.props.song.url) {
            // 调用父组件的播放或暂停方法
            this.props.playOrPause();
        }
    };

    handleNext = (e) => {
        e.stopPropagation();
        if (this.props.song.url) {
            // 调用父组件播放下一首方法
            this.props.next();
        }
    };

    render() {
        let song = this.props.song;
        console.log(song);

        let playerStyle = {};

        if (this.props.showStatus === true) {
            playerStyle = {display: "none"};
        }

        if (!song.img) {
            song.img = require("@/assets/imgs/music.png");
            console.log(song);
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
                <div className="player-img rotate">
                    <img src={song.img} alt={song.name}/>
                </div>
                <div className="player-center">
                    <div className="progress-wrapper">
                        <Progress displayButton={true}  progress={this.props.progress}/>
                    </div>
                    <span className="song">
                        {song.name}
                    </span>
                    <span className="singer">
                        {song.singer}
                    </span>
                </div>
                <div className="player-right">
                    <i className={playButtonClass} onClick={this.handlePlayOrPause}></i>
                    <i className="icon-next m1-10" onClick={this.handleNext}></i>
                </div>
                <div className="filter"></div>
            </div>
        )
    }
}

export default MiniPlayer;






