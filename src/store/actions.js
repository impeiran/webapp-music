export const selectPlay = function ({ commit }, { list, index }) {
  commit('SET_SEQUENCE_LIST', list)
  commit('SET_PLAYLIST', list)
  commit('SET_CURRENT_INDEX', index)
  commit('SET_FULL_SCREEN', true)
  commit('SET_PLAYING_STATE', true)
}
