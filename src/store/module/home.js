import ure from 'ure'
import { getHomePage } from '@/service/home'
import feedback from '@/utils/feedback'

const { errAlert } = feedback

const SET_SONG_SHEETS = 'SET_SONG_SHEETS'
const SET_HOT_KEYS = 'SET_HOT_KEYS'

export default {
  namespaced: true,

  state: {
    songSheets: [],
    hotKeys: []
  },

  mutations: {
    [SET_SONG_SHEETS](state, sheets) {
      state.songSheets = sheets
    },

    [SET_HOT_KEYS](state, keys) {
      state.hotKeys = keys
    }
  },

  actions: {
    getHomePage({ commit }) {
      return getHomePage().then(res => {
        let { MusicHallHomePage, hotkey } = res
        if (hotkey.code == 0) {
          commit(SET_HOT_KEYS, ure.getValue(hotkey, 'data.vec_hotkey' || []))
        } else {
          errAlert('加载热搜失败')
        }

        if (MusicHallHomePage.code == 0) {
          commit(SET_SONG_SHEETS, ure.getValue(MusicHallHomePage, 'data.v_shelf') || [])
        } else {
          errAlert('加载首页失败')
        }
      }).catch(errAlert)
    }
  }
}
