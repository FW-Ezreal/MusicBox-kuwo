export default {
  state: {
    list: []
  },
  mutations: {
    ADD(state,song) {
      const list = state.list;
      if (list.length > 0) {
        const index = list.findIndex((item, index) => {
          return item.rid === song.rid;
        });
        console.log('index: ', index);
        if (index > -1) {
          
          return;
          // state.list.unshift(song);
        }
      }
      state.list.unshift(song);
    },
    DEL(state, song) {
      const list = state.list;
      if (list.length > 0) {
        const index = list.findIndex((item, index) => {
          return item.rid === song.rid
        })
        if (index > -1) {
          state.list.splice(song, 1)
          return
        }
      }
      state.list.unshift(song)
    },
    CLEAR(state){
      state.list = [];
    },
    PLAY_ALL(state, musicList){
      state.list = musicList;
    }
  }
}
