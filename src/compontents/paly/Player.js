import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Progress from './Progress'
import { Song } from '../../model/song'
import MiniPlayer from './MiniPlayer'

import './Player.styl'

class Player extends Component {

    constructor(props) {
        super(props)

        this.currentSong = new Song(0, "", "", "", 0, "", "")
        this.currentIndex = 0;
        this.isFirstPlay = true;
        this.dragProgress = 0;

        // 播放模式 ： List-列表， single-单曲 ， shuffle-随机
        this.playModes = ["list", "single", "shuffle"]

        this.state = {
            currentTime: 0,
            playProgress: 0,
            playStatus: false,
            currentPlayMode: 0
        }

    }

    componentDidUpdate() {
        // 兼容手机端canplay事件触发后第一次调用play()方法无法自动播放
        if (this.isFirstPlay === true) {
            this.audioDOM.play();
            this.isFirstPlay = false;
        }
    }


    componentDidMount() {
        this.audioDOM = ReactDOM.findDOMNode(this.refs.audio);
        this.singerDOM = ReactDOM.findDOMNode(this.refs.singer);
        this.playerDOM = ReactDOM.findDOMNode(this.refs.player);
        this.playerBgDOM = ReactDOM.findDOMNode(this.refs.playerBg);

        this.audioDOM.addEventListener('canplay', () => {
            this.audioDOM.play();
            this.startImgRotate();

            this.setState({
                playStatus: true
            })
        }, false);

        this.audioDOM.addEventListener('timeupdate', () => {
            if (this.state.playStatus === true) {
                this.setState({
                    playProgress: this.audioDOM.currentTime / this.audioDOM.duration,
                    currentTime: this.audioDOM.currentTime
                })
            }
        }, false);

        this.audioDOM.addEventListener('ended', () => {
            if (this.props.playSongs.lenght > 1) {
                    let currentIndex = this.currentIndex;
                if (this.state.currentPlayMode === 0) { // 列表播放
                    if (currentIndex === this.props.playSongs.lenght -1 ) {
                        currentIndex = 0;
                    } else {
                        currentIndex = currentIndex + 1;
                    }
                } else if (this.state.currentPlayMode === 1) { // 单曲循环
                    // 继续播放当前歌曲
                    this.audioDOM.play();
                } else { // 随机播放
                    let index = parseInt(Math.random() * this.props.playSongs.lenght, 10);
                    this.currentIndex = index;                    
                }

                this.props.changeCurrentSong(this.props.playSongs[currentIndex]);
                this.props.changeCurrentIndex(currentIndex)
            } else {
                if (this.state.currentPlayMode === 1) { //单曲循环
                    // 继续播放当前歌曲
                    this.audioDOM.play();
                } else {
                    // 暂停
                    this.audioDOM.pause();
                    this.stopImgRotate();

                    this.setState({
                        playSongs: 0,
                        currentIndex: 0,
                        playStatus: false
                    })
                }
            }
        }, false)

        this.audioDOM.addEventListener('error', () => {
            alert('加载歌曲时出错')
        }, false)
    }
    // 播放or暂停
    playOrPause = () => {
        if (this.audioDOM.paused) {
            this.audioDOM.play();
            this.startImgRotate();

            this.setState({
                playStatus: true
            });
        } else {
            this.audioDOM.pause();
            this.stopImgRotate();

            this.setState({
                playStatus: false
            });
        }
    }

    // 上一首
    previous = () => {
        if (this.props.playSongs.length > 0 && this.props.playSongs.length !== 1) {
            let currentIndex = this.currentIndex;
            if (this.state.currentPlayMode === 0) {  //列表播放
                if(currentIndex === 0){
                    currentIndex = this.props.playSongs.length - 1;
                }else{
                    currentIndex = currentIndex - 1;
                }
            } else if (this.state.currentPlayMode === 1) {  //单曲循环
                currentIndex = this.currentIndex;
            } else {  //随机播放
                let index = parseInt(Math.random() * this.props.playSongs.length, 10);
                currentIndex = index;
            }
            this.props.changeCurrentSong(this.props.playSongs[currentIndex]);
            //调用父组件修改当前歌曲位置
            this.props.changeCurrentIndex(currentIndex);
        }
    }

    // 下一首
    next = () => {
        if (this.props.playSongs.lenght > 0 && this.props.playSongs.lenght !==1 ) {
            
            let currentIndex = this.currentIndex;
            if (this.state.currentPlayMode === 0) { // 列表循环
                if (currentIndex === this.props.playSongs.lenght -1 ) {
                    currentIndex = 0;
                } else {
                    currentIndex = currentIndex + 1;
                }
            } else if (this.state.currentPlayMode === 1) { //单曲循环
                currentIndex = this.currentIndex;
            } else { // 随机播放
                let index = parseInt(Math.random() * this.props.playSongs.lenght, 10);
                this.currentIndex = currentIndex;
            }

            this.props.changeCurrentSong(this.props.playSongs[currentIndex])
            this.currentIndex = currentIndex;
        }
    }

    // 开始拖拽
    handleDrag = (progress) => {
        if (this.audioDOM.duration > 0) {
            this.audioDOM.pause();
            this.stopImgRotate();

            this.setState({
                playStatus: false
            })
            this.dragProgress = progress;
        }
    }
    // 停止拖拽
    handleDragEnd = () => {
        if (this.audioDOM.duration > 0) {
            let currentTime = this.audioDOM.duration * this.dragProgress;

            this.setState({
                playProgress: this.dragProgress,
                currentTime: currentTime
            }, () => {
                this.audioDOM.currentTime = currentTime
                this.audioDOM.play();
                this.startImgRotate();

                this.setState({
                    playStatus: true
                })
                this.dragProgress = 0;
            })
        }
    }

    // 显示
    showPlayer = () => {
        this.props.showMusicPlayer(false);
    }
    // 隐藏
    hidePlayer = () => {
        this.props.showMusicPlayer(true);
    }

    render() {
        this.currentIndex = this.props.currentIndex
        // 从redux 中获取当前播放歌曲 
        if (this.props.currentSong && this.props.currentSong.url) {
            // 当前歌曲发生变化
            if (this.currentSong.id !== this.props.currentSong.id) {
                this.currentSong = this.props.currentSong;
                this.audioDOM.src = this.currentSong.url;
                // 加载资源  ios需要调用
                this.audioDOM.load();
            }
        }


        let song = this.currentSong;
        let playBg = song.img ? song.img : require("../../assets/imgs/play_bg.jpg")

        // 按钮样式
        let playButtonClass = this.state.playStatus === true ? "icon-pause" : "icon-play";

        song.playStatus = this.state.playStatus;
        return (
            <div className="player-container">
                <MiniPlayer song={song} progress={this.state.playProgress} 
                    playOrPause={this.playOrPause}
                    next={this.next}
                />
                <div className="palyer" ref="player" style={{ display: this.props.showStatus == true ? "block" : "none" }}>
                    <div className="singer-middle">
                        <div className="singer-img" ref="singerImg">
                            <img src={playBg} alt={song.name} onLoad={
                                (e) => {
                                    /*图片加载完成后设置背景，防止图片加载过慢导致没有背景*/
                                    this.playerBgDOM.style.backgroundImage = `url("${playBg}")`;
                                }
                            } />
                        </div>
                    </div>
                    <div className="singer-bottom">
                        <div className="controller-wrapper">
                            <div className="progress-wrapper">
                                <span className="current-time">{getTime(this.state.currentTime)}</span>
                                <div className="play-progress">
                                    <Progress progress={this.state.playProgress}
                                        onDrag={this.handleDrag}
                                        onDragEnd={this.handleDragEnd} />
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
            </div>
        );
    }
}

function getTime() {
    console.log('')
}

export default Player