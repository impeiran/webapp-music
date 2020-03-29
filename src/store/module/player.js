import { Base64 } from 'js-base64'
import { getVkey, getSongUrl, getLyric } from '@/service/base'
import localStore from '@/utils/localStore'

export const SET_PLAY_URL = 'SET_PLAY_URL'
export const SET_PLAYING = 'SET_PLAYING'
export const SET_FULLPAGE = 'SET_FULLPAGE'
export const SET_CURRENT_PLAY_INDEX = 'SET_CURRENT_PLAY_INDEX'
export const SET_CURRENT_PLAY_MODE = 'SET_CURRENT_PLAY_MODE'
export const SET_PLAY_LIST = 'SET_PLAY_LIST'
export const SET_HISTORY_PLAY_LIST = 'SET_HISTORY_PLAY_LIST'

const HISTORY_LIST_KEY = 'history_list'

export default {
  namespaced: true,

  state: {
    playUrl: '',

    playing: false,
    fullpage: false,

    currentPlayMode: 'normal',
    currentPlayIndex: -1,

    playList: [],
    historyPlayList: localStore.get(HISTORY_LIST_KEY) || []
  },

  getters: {
    playUrl: state => state.playUrl,
    playing: state => state.playing,
    fullpage: state => state.fullpage,
    currentPlayIndex: state => state.currentPlayIndex,
    currentPlayMode: state => state.currentPlayMode,
    currentPlaySong: state => state.playList[state.currentPlayIndex] || {},
    playList: state => state.playList,
    playListLength: state => state.playList.length || 0,
    historyPlayList: state => state.historyPlayList
  },

  mutations: {
    [SET_PLAY_URL] (state, url) {
      state.playUrl = url
    },

    [SET_PLAYING] (state, status) {
      state.playing = status
    },

    [SET_FULLPAGE] (state, status) {
      state.fullpage = status
    },

    [SET_CURRENT_PLAY_INDEX] (state, index) {
      state.currentPlayIndex = index
    },

    [SET_CURRENT_PLAY_MODE] (state, mode) {
      state.currentPlayMode = mode
    },
 
    [SET_PLAY_LIST] (state, list) {
      state.playList = list
    },

    [SET_HISTORY_PLAY_LIST] (state, list) {
      state.historyPlayList = list
    }
  },
  
  actions: {
    playSong ({ commit }, data) {
      const { index, list } = data

      commit(SET_PLAYING, true)
      commit(SET_FULLPAGE, true)
      commit(SET_CURRENT_PLAY_INDEX, index)
      commit(SET_PLAY_LIST, list)
    },

    // eslint-disable-next-line no-unused-vars
    getSongUrl ({ commit }, mid) {
      return getVkey(mid).then(vkey => {
        if (!vkey) return Promise.reject('该歌曲由于版权问题无法在网页提供播放')
        return getSongUrl(mid, vkey)
      }).catch(err => Promise.reject(err))
    },

    // eslint-disable-next-line no-unused-vars
    getSongLyric ({ commit }, mid) {
      return getLyric(mid).then(lyric => {
        return Base64.decode(lyric)
      }).catch(err => Promise.reject(err))
    },

    addHistorySong ({ commit, state }, song) {
      const currentList = state.historyPlayList.slice(0, 49)
      const songIndex = currentList.findIndex(item => item.songMid === song.songMid)
      if (songIndex !== -1) {
        currentList.unshift(currentList.splice(songIndex, 1)[0])
      } else {
        currentList.unshift(song)
      }

      commit(SET_HISTORY_PLAY_LIST, currentList)
      localStore.set(HISTORY_LIST_KEY, currentList)
    },

    removeHistorySong ({ commit, state }, song) {
      const currentList = state.historyPlayList.slice(0)
      const songIndex = currentList.findIndex(item => item.songMid === song.songMid)
      songIndex !== -1 && currentList.splice(songIndex, 1)
      commit(SET_HISTORY_PLAY_LIST, currentList)
      localStore.set(HISTORY_LIST_KEY, currentList)
    },

    clearHistorySong ({ commit }) {
      commit(SET_HISTORY_PLAY_LIST, [])
      localStore.set(HISTORY_LIST_KEY, [])
    },
  }
}