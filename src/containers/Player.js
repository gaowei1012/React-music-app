import { connect } from "react-dom";
import {showPlayer, changeSong} from "../redux/actions";

import Player from "../compontents/paly/Player";

/* 映射Redux到全局state到组件的props上 */
const mapStateToProps = (state) => ({
    showStatus: state.showStatus,
    currentSong: state.song,
    playSongs: state.songs
});

/* 映射dispatch到props上 */
const mapDispatchToProps = (dispatch) => ({
    showMusicPlayer: (status) => {
        dispatch(showPlayer(status));
    },
    changeCurrentSong: (song) => {
        dispatch(changeSong(song));
    }
});

/* 将UI组件包装到容器组件上 */
export default connect(mapStateToProps, mapDispatchToProps)(Player)