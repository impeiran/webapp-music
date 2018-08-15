const playMode = {
  sequence: 0,
  loop: 1
}

const state = {
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1
}

export default state
