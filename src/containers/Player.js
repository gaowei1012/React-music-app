import { connect } from 'react-redux'
import { showPlayer, changeSong } from '../redux/actions'
import Player from '../compontents/paly/Player'

// 映射到Redux全局的stats到组件的props上
const mapStateToProps = (state) => ({
    showPlayer: state.showPlayer,
    currentSong: state.song,
    playerSongs: state.songs
})

// 映射dispatch 到props上
const mapDispatchToProps = (dispatch) => ({
    showMusicPlayer: (status) => {
        dispatch(showPlayer(status))
    },
    changeCurrentSong: (song) => {
        dispatch(changeSong(song))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Player)