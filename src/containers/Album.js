import React from "react";
import {connect} from "react-redux";
import Album from "../compontents/album"

import Header from "@common/header/Header";
import Scroll from "@common/scroll/Scroll";
import Loading from "@common/loading/Loading";

import {getAlbumInfo} from "@/api/recommend"
import {CODE_SUCCESS} from "@/api/config"
import * as AlbumModel from "@/model/album"
import * as SongModel from "@/model/song"

class Album extends React.Component {
    constructor(props) {
        super(props);

        this.state ={
            loading: true,
            album: {},
            songs: [],
            refreshScroll: false
        };
    }

    componentDidMount() {
        let albumBgDOM = ReactDOM.findDOMNode(this.refs.albumBg);
        let albumContainerDOM = ReactDOM.findDOMNode(this.refs.albumContainer);
        albumContainerDOM.style.top = albumBgDOM.offsetHeight + 'px';

        getAlbumInfo(this.props.match.params.id).then((res) => {
            console.log('获取专辑详情');
            if (res) {
                console.log(res);
                if (res.code && CODE_SUCCESS) {
                    let album = AlbumModel.createAlbumByDetail(res.data);
                    album.desc = res.data.desc;

                    let songList = res.data.list;
                    let songs = [];
                    songList.forEach(item => {
                        let song = SongModel.createSong(item);
                        songs.push(song);
                    });

                    this.setState({
                        loading: false,
                        album: album,
                        songs: songs
                    }, () => {
                        // 刷新scroll
                        this.setState({refreshScroll: true});
                    });
                }
            }
        });
    }

    render() {

        let album = this.state.album;
        let songs = this.state.songs.map((song) => {
            return (
                <div className="song" key={song.id}>
                    <div className="song-name">{song.name}</div>
                    <div className="song-singer">{song.songer}</div>
                </div>
            )
        });

        return (
            <div className="music-album">
                <Header title={album.name} ref="header"></Header>
                <div style={{position:"relative"}}>
                    <div ref="alnumBg" className="album-img" style={{backgroundImage: `url(${album.img})`}}></div>
                </div>
            </div>
        )
    }
}



export default connect(null, mapDispatchToProps)(Album)