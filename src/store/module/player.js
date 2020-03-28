import { Base64 } from 'js-base64'
import { getVkey, getSongUrl, getLyric } from '@/service/base'

export const SET_PLAY_URL = 'SET_PLAY_URL'
export const SET_PLAYING = 'SET_PLAYING'
export const SET_FULLPAGE = 'SET_FULLPAGE'
export const SET_CURRENT_PLAY_INDEX = 'SET_CURRENT_PLAY_INDEX'
export const SET_CURRENT_PLAY_MODE = 'SET_CURRENT_PLAY_MODE'
export const SET_PLAY_LIST = 'SET_PLAY_LIST'

export default {
  namespaced: true,

  state: {
    playUrl: '',

    playing: false,
    fullpage: false,

    currentPlayMode: 'normal',
    currentPlayIndex: -1,

    playList: []
  },

  getters: {
    playUrl: state => state.playUrl,
    playing: state => state.playing,
    fullpage: state => state.fullpage,
    currentPlayIndex: state => state.currentPlayIndex,
    currentPlayMode: state => state.currentPlayMode,
    currentPlaySong: state => state.playList[state.currentPlayIndex] || {},
    playList: state => state.playList,
    playListLength: state => state.playList.length || 0
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
    }
  }
}