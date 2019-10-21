const state = {
  curSong: {},
  curTime: 0,
  percent: 0
}

const mutations = {
  NOW_SONG(state, param) {
    state.curSong = param;
    console.log('state: ', state);
  },
  CUR_TIME(state, curTime) {
    state.curTime = curTime;
  },
  PERCENT(state, percent) {
    state.percent = percent;
  }
}

const actions = {

}

export default {
  state,
  mutations,
  actions
}
