const state = {
  curSong: {},
  curTime: 0,
  percent: 0,
  volumeNum: 0.3,
  playMode: 0
}

const mutations = {
  CHANGE_NOW_SONG(state, param) {
    // console.log('state: ', param);
    state.curSong = param;
  },
  CUR_TIME (state, curTime) {
    state.curTime = curTime
  },
  PERCENT(state, percent) {
    state.percent = percent;
  },
  CHANGE_VOLUME(state, volumeNum) {
    state.volumeNum = volumeNum;
  },
  CHANGE_MODE(state, mode) {
    state.playMode = mode
  }
}

const actions = {

}

export default {
  state,
  mutations,
  actions
}
