const SET_PLAYING_STATE = 'SET_PLAYING_STATE'

const SET_FULL_SCREEN = 'SET_FULL_SCREEN'

const SET_PLAYLIST = 'SET_PLAYLIST'

const SET_SEQUENCE_LIST = 'SET_SEQUENCE_LIST'

const SET_PLAY_MODE = 'SET_PLAY_MODE'

const SET_CURRENT_INDEX = 'SET_CURRENT_INDEX'

const mutations = {
  [SET_PLAYING_STATE] (state, flag) {
    state.playing = flag
  },
  [SET_FULL_SCREEN] (state, flag) {
    state.fullScreen = flag
  },
  [SET_PLAYLIST] (state, list) {
    state.playlist = list
  },
  [SET_SEQUENCE_LIST] (state, list) {
    state.sequenceList = list
  },
  [SET_PLAY_MODE] (state, mode) {
    state.mode = mode
  },
  [SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index
  }
}

export default mutations
