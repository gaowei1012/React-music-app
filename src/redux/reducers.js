import { combineReducers } from 'redux'
import * as ActionTypes from "./actionTypes"
import localStorage from "../util/storage"

/**
 * reducer就是一个纯函数，接收旧的state和action，返回新的state
 */

 // 初始化数据状态
 const initState = {
	 showStatus: false, // 显示状态
	 song: {}, // 当前歌曲
	 songs: [] // 歌曲列表
 }


//合并Redux


//显示或隐藏播放状态
function showStatus(showStatus=initState.showStatus, action) {
	switch (action.type) {
		case ActionTypes.SHOW_PLAYER:
			return action.showStatus;
		default:
			return showStatus;	
	}
}


// 修改当前歌曲
function song(song=initState.song, action) {
	switch (action.type) {
		case ActionTypes.CHANGE_SONG:
			return action.song;
		default :
			return song;	
	}
}

// 添加或移除歌曲
function songs(songs=initState.songs, action) {
	switch (action.type) {
		case ActionTypes.SET_SONGS:
			return action.songs;
		case ActionTypes.REMOVE_SONG_FROM_LIST:
			return songs.filter(song => song.id !== action.id);
		default: 
			return songs;	
	}
}

// 合并Redux
const reducer = combineReducers({
	showStatus,
	song,
	songs
})

export default reducer