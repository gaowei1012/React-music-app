import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import Header from '../../common/header/Header'
import Scroll from '../../common/scroll/Scroll'
import Loading from '../../common/loading/Loading'

import {getAlbumInfo} from '../../api/recommend'
import {CODE_SUCCESS} from '../../api/config'
import * as AlbumModel from '../../model/album'
import * as SongModel from '../../model/song'

import './album.styl'


class Album extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            album: {},
            songs: [],
            refreshScroll: false
        }

    }

    componentDidMount() {
        let albumBgDOM = ReactDOM.findDOMNode(this.refs.albumBg)
        let albumContainerDOM = ReactDOM.findDOMNode(this.refs.albumContainer)
        albumContainerDOM.style.top = albumBgDOM.offsetHeight + 'px'

        getAlbumInfo(this.props.match.params.id).then((res) => {
            console.log('获取专辑详情')
            if (res) {
                console.log(res)
                if (res.code === CODE_SUCCESS) {
                    let album = AlbumModel.createAlbumByDetail(res.data)
                    album.desc = res.data.desc

                    let songList = res.data.list
                    let songs = []
                    songList.forEach(item => {
                        let song = SongModel.createSong(item)
                        song.push(song)
                    })
                    this.setState({
                        loading: false,
                        album: album,
                        songs: songs
                    }, () => {
                        //刷新 scroll
                        this.setState({refreshScroll: true})
                    })
                }
            } 
        })
    }

    render() {
        return (
            <div className="music-album">album</div>
        );
    }
}

export default Album