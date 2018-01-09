import {connect} from "react-redux";
import {showPlayer, changeSong, setSongs} from "../redux/actions";
import Album from "../compontents/album/Album";

const mapDispatchToProps = (dispatch) => ({
    showMusicPlayer: (status) => {
        dispatch(showPlayer(status));
    },
    changeCurrentSong: (song) => {
        dispatch(changeSong(song));
    },
    setSongs: (songs) => {
        dispatch(setSongs(songs));
    }
});

export default connect(null, mapDispatchToProps)(Album)