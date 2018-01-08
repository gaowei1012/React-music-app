/**
 * 
 * 歌曲本地持久化
 * 
 */
let localStorage = {
    setCurrenSong(song) {
        window.localStorage.setItem("song", JSON.stringify(song));
    },
    getCurrenSong() {
        let song = window.localStorage.getItem("song");
        return song ? JSON.parse(song) : {};
    },
    setSongs(songs) {
        window.localStorage.setItem("songs", JSON.stringify(songs));
    },
    getSongs() {
        let songs = window.localStorage.getItem("songs");
        return songs ? JSON.parse(songs) : [];
    }
}

export default localStorage
