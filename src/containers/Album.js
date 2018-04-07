import { connect } from 'react-redux'
import { showPlayer, changeSong, setSongs } from '../redux/actions' 
import Album from '../compontents/album/Album'


// 映射dispatch到props上
const mapDispatchToProps = (dispatch) => ({
    showPlayer: (status) => {
        dispatch(showPlayer(status))
    },
    changeCurrentSong: (song) => {
        dispatch(changeSong(song))
    },
    setSongs: (songs) => {
        dispatch(setSongs(songs))
    }
})

export default connect(null, mapDispatchToProps)(Album)